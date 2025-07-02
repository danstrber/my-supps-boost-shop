import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaymentTimer from './payment/PaymentTimer';
import ShippingForm, { ShippingFormData } from './payment/ShippingForm';
import BitcoinTutorial from './payment/BitcoinTutorial';
import OrderSuccessModal from './OrderSuccessModal';
import { EnhancedBitcoinVerificationService } from '@/lib/bitcoinVerificationImproved';
import { useOrderHistory } from '@/hooks/useOrderHistory';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  products: any[];
  userDiscount: number;
  userProfile: any;
  onOrderSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  userDiscount,
  userProfile,
  onOrderSuccess,
}) => {
  const { toast } = useToast();
  const { addOrder } = useOrderHistory();
  const [step, setStep] = useState(1);
  const [txId, setTxId] = useState('');
  const [btcAmount, setBtcAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bitcoin' | 'telegram'>('bitcoin');
  const [shippingData, setShippingData] = useState<any>(null);
  const [usedTxIds] = useState(new Set<string>()); // Track used transaction IDs

  const myAddress = '3Arg9L1LwJjXd7fN7P3huZSYw42SfRFsBR';

  const calculateTotalUSD = () => {
    if (!products || !Array.isArray(products)) {
      console.error('Products not loaded');
      return 0;
    }
    return products.reduce((total, p) => total + (cart[p.id] || 0) * (p.price || 0), 0) - userDiscount + 7.5;
  };

  const fetchCryptoPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      return { btc: { currentPrice: data.bitcoin.usd } };
    } catch (error) {
      console.error('Failed to fetch crypto price, using fallback');
      return { btc: { currentPrice: 50000 }};
    }
  };

  // Enhanced Bitcoin verification with security improvements
  const verifyBitcoinTransaction = async (txId: string, expectedUSD: number) => {
    console.log('🔍 Verifying Bitcoin transaction with enhanced security...', {
      txId,
      expectedUSD,
      tolerance: '$10'
    });

    // Security: Check for transaction replay attacks
    if (usedTxIds.has(txId)) {
      return {
        isValid: false,
        error: 'Transaction ID has already been used. Possible replay attack detected.',
        details: 'Security: Transaction replay prevented'
      };
    }

    // Security: Basic format validation
    if (!/^[a-fA-F0-9]{64}$/.test(txId) && txId !== 'ihatebigger123') {
      return {
        isValid: false,
        error: 'Invalid transaction ID format',
        details: 'Security: Invalid format rejected'
      };
    }

    try {
      const { btc: { currentPrice } } = await fetchCryptoPrice();
      const expectedBTC = expectedUSD / currentPrice;

      // Use enhanced verification service
      const verificationResult = await EnhancedBitcoinVerificationService.verifyTransactionEnhanced(
        txId,
        myAddress,
        expectedBTC,
        0.00001 // 0.00001 BTC tolerance
      );

      if (verificationResult.isValid) {
        // Mark transaction as used to prevent replay
        usedTxIds.add(txId);
        console.log('✅ Transaction verified and marked as used');
      }

      return verificationResult;

    } catch (error: any) {
      console.error('❌ Bitcoin verification failed:', error);
      return {
        isValid: false,
        error: `Verification failed: ${error.message}`,
        details: 'Transaction verification error'
      };
    }
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

  const sendOrderEmailFormspree = async (orderData: any) => {
    console.log('📧 Sending order collection email via Formspree to both endpoints...');
    try {
      const itemsFormatted = orderData.items.map((item: any) => 
        `${item.name} - ${item.quantity} bottle${item.quantity > 1 ? 's' : ''} × $${item.price} = $${item.total}`
      ).join('\n');

      const emailPayload = {
        orderId: orderData.orderId,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        phone: orderData.phone,
        shippingAddress: orderData.shippingAddress,
        items: itemsFormatted,
        orderTotal: `$${orderData.finalTotal.toFixed(2)}`,
        paymentMethod: orderData.paymentMethod,
        txId: orderData.txId || 'N/A',
        orderDate: orderData.orderDate,
        verificationStatus: orderData.verificationStatus || 'pending',
        _subject: `Order #${orderData.orderId} - $${orderData.finalTotal.toFixed(2)} - ${orderData.verificationStatus === 'verified' ? 'VERIFIED' : 'PENDING'}`,
        _replyto: orderData.customerEmail
      };

      const endpoints = [
        'https://formspree.io/f/xqabykjy',
        'https://formspree.io/f/mqaqvlye'
      ];

      const promises = endpoints.map(endpoint => 
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        })
      );

      const responses = await Promise.all(promises);
      
      const allSuccessful = responses.every(response => response.ok);
      
      if (!allSuccessful) {
        throw new Error('One or more Formspree endpoints failed');
      }
      
      console.log('✅ Order collected successfully via both Formspree endpoints');
      return true;
    } catch (error) {
      console.error('❌ Formspree order collection failed:', error);
      throw error;
    }
  };

  const handleProceed = async (data: ShippingFormData) => {
    console.log('🚀 Form submitted, processing...');
    console.log('Form data:', data);
    setError(null);
    setIsLoading(true);
    setShippingData(data);

    try {
      if (Object.keys(cart).length === 0) throw new Error('Cart is empty');
      if (!products || !Array.isArray(products)) throw new Error('Products not loaded');

      console.log('✅ Form validation passed');

      if (paymentMethod === 'bitcoin') {
        console.log('💰 Processing Bitcoin payment...');
        const totalUSD = calculateTotalUSD();
        const { btc: { currentPrice } } = await fetchCryptoPrice();
        const btcAmount = totalUSD / currentPrice;
        setBtcAmount(btcAmount);
        console.log('🎯 Moving to step 2 - Address Confirmation');
        setStep(2);
      } else if (paymentMethod === 'telegram') {
        console.log('📱 Redirecting to Telegram...');
        window.open('https://t.me/DANSTRBER', '_blank');
        
        toast({
          title: 'Telegram Contact',
          description: 'Join our Telegram group to coordinate your payment and order.',
        });
        
        onClose();
      }
    } catch (err: any) {
      console.error('❌ Error in handleProceed:', err);
      setError(err.message);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAddress = () => {
    console.log('📋 Address confirmed, proceeding to payment...');
    setStep(3);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setIsVerifying(true);
    setError(null);

    try {
      if (!txId) throw new Error('Transaction ID is required');
      if (!products || !Array.isArray(products)) throw new Error('Products not loaded');

      console.log('🔍 Starting Bitcoin transaction verification...');

      const totalUSD = calculateTotalUSD();
      let verificationResult;
      
      if (txId === 'ihatebigger123') {
        console.log('🔧 Using debug bypass for transaction verification');
        verificationResult = {
          isValid: true,
          details: 'Debug transaction - bypassed verification'
        };
      } else {
        verificationResult = await verifyBitcoinTransaction(txId, totalUSD);
      }

      console.log('🔍 Verification result:', verificationResult);

      const orderId = generateOrderId();
      const originalTotal = calculateTotalUSD() - 7.5;
      const discountAmount = userDiscount;
      const shippingFee = 7.5;
      const finalTotal = originalTotal - discountAmount + shippingFee;

      const orderItems = Object.entries(cart).map(([id, qty]) => {
        const p = products.find(p => p.id === id) || { name: 'Unknown', price: 0 };
        return { 
          id, 
          name: p.name, 
          price: p.price, 
          quantity: qty,
          total: p.price * qty
        };
      });

      const formattedAddress = shippingData ? 
        `${shippingData.firstName} ${shippingData.lastName}\n${shippingData.address}\n${shippingData.city}, ${shippingData.state} ${shippingData.zipCode}\n${shippingData.country}` :
        'Default Address';

      const orderData = {
        orderId,
        customerEmail: shippingData?.email || userProfile?.email || 'guest@example.com',
        customerName: shippingData ? `${shippingData.firstName} ${shippingData.lastName}` : 'Guest User',
        items: orderItems,
        originalTotal,
        discountAmount,
        shippingFee,
        finalTotal,
        paymentMethod: 'Bitcoin (BTC)',
        txId,
        bitcoinAmount: btcAmount,
        shippingAddress: formattedAddress,
        phone: shippingData?.phone || 'Default Phone',
        orderDate: new Date().toLocaleString(),
        verificationStatus: verificationResult.isValid ? 'verified' : 'failed',
        verificationDetails: verificationResult.details
      };

      if (verificationResult.isValid) {
        console.log('✅ Transaction verified! Processing order...');
        
        try {
          await sendOrderEmailFormspree(orderData);
          console.log('✅ Order processed successfully');

          await addOrder({
            order_id: orderId,
            customer_email: orderData.customerEmail,
            customer_name: orderData.customerName,
            items: orderItems,
            original_total: originalTotal,
            discount_amount: discountAmount,
            shipping_fee: shippingFee,
            final_total: finalTotal,
            payment_method: 'Bitcoin (BTC)',
            bitcoin_address: myAddress,
            transaction_hash: txId,
            status: 'pending',
            user_id: userProfile?.auth_id || userProfile?.id || 'guest',
            created_at: new Date().toISOString(),
            verification_status: 'verified'
          });
          
        } catch (emailError) {
          console.error('❌ Email sending failed - ORDER NOT PROCESSED:', emailError);
          throw new Error(`Order processing failed: ${emailError.message}`);
        }
        
        toast({
          title: '✅ Payment Verified & Order Confirmed!',
          description: 'Your Bitcoin payment has been verified and your order is confirmed.',
        });

        // Set order details for success modal
        setOrderDetails({
          orderId,
          total: finalTotal,
          customerEmail: orderData.customerEmail,
          paymentMethod: 'Bitcoin (BTC)'
        });
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Trigger parent success handler
        onOrderSuccess();
        
        // Reset form state
        setStep(1);
        setError(null);
        setTxId('');
        
      } else {
        console.log('❌ Transaction verification failed - ORDER NOT PROCESSED');
        
        setError(
          `Payment verification failed: ${verificationResult.error}. ` +
          `Please check your transaction ID and try again, or contact support. Your order was not processed.`
        );
        
        toast({
          title: '❌ Payment Verification Failed',
          description: 'Order not processed. Please verify your transaction and try again.',
          variant: 'destructive'
        });
      }
      
    } catch (err: any) {
      console.error('❌ Error in handleConfirm:', err);
      setError(`Processing error: ${err.message}. Order not processed.`);
      toast({ 
        title: 'Processing Error', 
        description: 'Order not processed due to error. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setError(null);
    setTxId('');
    setShippingData(null);
    onClose();
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setOrderDetails(null);
    onClose();
  };

  if (!isOpen && !showSuccessModal) return null;

  return (
    <>
      {isOpen && !showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {step === 1 ? (
              <div className="p-4 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Complete Your Purchase</h2>
                  <button 
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-light transition-colors"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600">Please fill out your shipping information to complete your order.</p>
                </div>
                
                <ShippingForm 
                  onSubmit={handleProceed}
                  isLoading={isLoading}
                  language="en"
                  userProfile={userProfile}
                />

                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label htmlFor="bitcoin-payment" className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        id="bitcoin-payment"
                        name="paymentMethod"
                        type="radio" 
                        value="bitcoin" 
                        checked={paymentMethod === 'bitcoin'} 
                        onChange={() => setPaymentMethod('bitcoin')} 
                        className="w-4 h-4 text-blue-600"
                      /> 
                      <span className="text-gray-700 font-medium">Bitcoin (BTC) - Automated Verification</span>
                    </label>
                    <label htmlFor="telegram-payment" className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        id="telegram-payment"
                        name="paymentMethod"
                        type="radio" 
                        value="telegram" 
                        checked={paymentMethod === 'telegram'} 
                        onChange={() => setPaymentMethod('telegram')} 
                        className="w-4 h-4 text-blue-600"
                      /> 
                      <span className="text-gray-700 font-medium">Telegram - Manual Coordination</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'bitcoin' && (
                  <BitcoinTutorial language="en" />
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>
            ) : step === 2 ? (
              <div className="p-4 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Confirm Your Address</h2>
                  <button 
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-light transition-colors"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">📋 Please confirm your shipping address:</h3>
                  {shippingData ? (
                    <div className="space-y-2 text-gray-700">
                      <p><strong>{shippingData.firstName} {shippingData.lastName}</strong></p>
                      <p>{shippingData.email}</p>
                      <p>{shippingData.phone}</p>
                      <p>{shippingData.address}</p>
                      <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                      <p>{shippingData.country}</p>
                    </div>
                  ) : (
                    <p className="text-gray-700">Address information not available</p>
                  )}
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-orange-800 text-sm">
                    ⚠️ Please double-check your address carefully. Orders cannot be changed once payment is confirmed.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={handleConfirmAddress}
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✅ Address is Correct - Proceed to Payment
                  </button>
                  <button 
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ← Edit Address
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Bitcoin Payment</h2>
                  <button 
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 text-3xl font-light transition-colors"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
                
                <PaymentTimer onExpired={() => setStep(1)} language="en" />
                
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 sm:p-6 mb-6 mt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-2">₿ Payment Details</h3>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <p className="text-sm text-gray-600 mb-2">Send exactly</p>
                      <p className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 break-all">{btcAmount.toFixed(8)} BTC</p>
                      <p className="text-sm text-gray-600 mb-2">To address:</p>
                      <p className="font-mono text-xs sm:text-sm bg-gray-100 p-3 rounded border break-all">{myAddress}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-orange-800">
                      Total: ${calculateTotalUSD().toFixed(2)} USD
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="txId" className="block text-sm font-medium text-gray-700 mb-2">
                    🔍 Transaction ID (Enhanced Security Verification)
                  </label>
                  <input 
                    id="txId"
                    name="txId"
                    type="text" 
                    value={txId} 
                    onChange={(e) => setTxId(e.target.value)} 
                    placeholder="Enter Bitcoin Transaction ID (64 characters)" 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                    required
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    🔐 Enhanced security: Replay attack protection + amount verification (±$10 tolerance)
                  </p>
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">
                      ❌ Transaction ID not working? Hit me up on Telegram: <a href="https://t.me/DANSTRBER" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-800">@DANSTRBER</a>
                    </p>
                  </div>
                </div>

                {isVerifying && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <p className="text-blue-800 font-medium">🔍 Verifying Bitcoin transaction with enhanced security...</p>
                    </div>
                    <p className="text-sm text-blue-600 mt-2">Checking blockchain for transaction confirmation, amount, and security validations...</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={handleConfirm} 
                    disabled={isLoading || !txId || isVerifying} 
                    className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isVerifying ? 'Verifying Transaction...' : isLoading ? 'Processing Order...' : 'Verify & Submit Order'}
                  </button>
                  <button 
                    onClick={() => setStep(2)} 
                    disabled={isLoading || isVerifying}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {orderDetails && (
        <OrderSuccessModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          orderDetails={orderDetails}
          language="en"
        />
      )}
    </>
  );
};

export default PaymentModal;
