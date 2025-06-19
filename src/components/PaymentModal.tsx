import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaymentTimer from './payment/PaymentTimer';
import ShippingForm from './payment/ShippingForm';
import BitcoinTutorial from './payment/BitcoinTutorial';
import OrderSuccessModal from './OrderSuccessModal';
import { BitcoinVerificationService } from '@/lib/bitcoinVerification';
import { supabase } from '@/integrations/supabase/client';

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
  const [step, setStep] = useState(1);
  const [txId, setTxId] = useState('');
  const [btcAmount, setBtcAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [formData, setFormData] = useState({
    fullName: userProfile?.name || '',
    email: userProfile?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'bitcoin' | 'telegram'>('bitcoin');

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

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };

  const sendOrderEmailFormspree = async (orderData: any) => {
    console.log('📧 Sending order email via Formspree...');
    try {
      const telegramInfo = `

🔹 For faster replies and 1-on-1 communications, join our Telegram group:
📱 Telegram: https://t.me/DANSTRBER

We'll contact you there for order updates and support!`;

      const response = await fetch('https://formspree.io/f/mqaqvlye', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: orderData.customerEmail,
          customerName: orderData.customerName,
          orderId: orderData.orderId,
          items: JSON.stringify(orderData.items, null, 2),
          originalTotal: orderData.originalTotal.toString(),
          discountAmount: orderData.discountAmount.toString(),
          shippingFee: orderData.shippingFee.toString(),
          finalTotal: orderData.finalTotal.toString(),
          paymentMethod: orderData.paymentMethod,
          txId: orderData.txId || '',
          shippingAddress: orderData.shippingAddress,
          phone: orderData.phone,
          orderDate: orderData.orderDate,
          verificationStatus: orderData.verificationStatus || 'pending',
          bitcoinAmount: orderData.bitcoinAmount || '',
          telegramInfo: telegramInfo,
          _subject: `Order ${orderData.verificationStatus === 'verified' ? 'VERIFIED' : 'PENDING'} #${orderData.orderId} - ${orderData.customerName}`,
          _cc: 'christhomaso083@proton.me',
          _replyto: orderData.customerEmail
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Email failed with status: ${response.status}`);
      }
      
      console.log('✅ Order email sent successfully via Formspree');
      return true;
    } catch (error) {
      console.error('❌ Formspree email sending failed:', error);
      throw error;
    }
  };

  const sendOrderEmail = async (orderData: any) => {
    console.log('📧 Sending order email via Formspree (primary)...');
    try {
      // Primary: Use Formspree
      await sendOrderEmailFormspree(orderData);
      console.log('✅ Order email sent successfully via Formspree');
      return true;
    } catch (error) {
      console.error('❌ Formspree email sending failed, trying Supabase Edge Function:', error);
      
      // Fallback: Use Supabase Edge Function
      try {
        const { data, error } = await supabase.functions.invoke('send-order-email', {
          body: {
            customerEmail: orderData.customerEmail,
            customerName: orderData.customerName,
            orderId: orderData.orderId,
            items: orderData.items,
            originalTotal: orderData.originalTotal,
            discountAmount: orderData.discountAmount,
            shippingFee: orderData.shippingFee,
            finalTotal: orderData.finalTotal,
            paymentMethod: orderData.paymentMethod,
            txId: orderData.txId || '',
            shippingAddress: orderData.shippingAddress,
            phone: orderData.phone,
            orderDate: orderData.orderDate,
            verificationStatus: orderData.verificationStatus || 'pending',
            bitcoinAmount: orderData.bitcoinAmount || '',
          }
        });
        
        if (error) {
          throw error;
        }
        
        console.log('✅ Order email sent successfully via Edge Function fallback:', data);
        return true;
      } catch (fallbackError) {
        console.error('❌ Both email sending methods failed:', fallbackError);
        throw fallbackError;
      }
    }
  };

  const saveOrderToDatabase = async (orderData: any) => {
    console.log('💾 Saving order to Supabase (only after successful Formspree)...');
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          items: orderData.items,
          original_total: orderData.originalTotal,
          discount_amount: orderData.discountAmount,
          shipping_fee: orderData.shippingFee,
          final_total: orderData.finalTotal,
          payment_method: orderData.paymentMethod,
          status: orderData.verificationStatus === 'verified' ? 'confirmed' : 'pending',
          verification_status: orderData.verificationStatus,
          bitcoin_address: myAddress,
          bitcoin_amount: orderData.bitcoinAmount,
          transaction_hash: orderData.txId,
          verification_details: orderData.verificationDetails,
          verified_at: orderData.verificationStatus === 'verified' ? new Date().toISOString() : null,
          payment_details: {
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            shippingAddress: orderData.shippingAddress,
            phone: orderData.phone,
            orderId: orderData.orderId
          }
        });

      if (error) {
        console.error('❌ Database save error:', error);
        throw error;
      }

      console.log('✅ Order saved to database:', data);
      return data;
    } catch (error) {
      console.error('❌ Failed to save order to database:', error);
      throw error;
    }
  };

  const validateAddress = () => {
    const errors = [];
    
    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.address.trim()) errors.push('Street address is required');
    if (!formData.city.trim()) errors.push('City is required');
    if (!formData.state.trim()) errors.push('State/Province is required');
    if (!formData.zipCode.trim()) errors.push('ZIP/Postal code is required');
    if (!formData.country.trim()) errors.push('Country is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push('Please enter a valid phone number');
    }
    
    // ZIP code validation for US
    if (formData.country === 'United States') {
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (formData.zipCode && !zipRegex.test(formData.zipCode)) {
        errors.push('Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)');
      }
    }
    
    return errors;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(`Updated ${field}:`, value);
  };

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submitted, processing...');
    console.log('Form data:', formData);
    setError(null);
    setIsLoading(true);

    try {
      // Validate form data
      const validationErrors = validateAddress();
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }
      
      if (Object.keys(cart).length === 0) throw new Error('Cart is empty');
      if (!products || !Array.isArray(products)) throw new Error('Products not loaded');

      console.log('✅ Form validation passed');

      if (paymentMethod === 'bitcoin') {
        console.log('💰 Processing Bitcoin payment...');
        const totalUSD = calculateTotalUSD();
        const { btc: { currentPrice } } = await fetchCryptoPrice();
        const btcAmount = totalUSD / currentPrice;
        setBtcAmount(btcAmount);
        console.log('🎯 Moving to step 2 for Bitcoin payment');
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

  const handleConfirm = async () => {
    setIsLoading(true);
    setIsVerifying(true);
    setError(null);

    try {
      if (!txId) throw new Error('Transaction ID is required');
      if (!products || !Array.isArray(products)) throw new Error('Products not loaded');

      console.log('🔍 Starting Bitcoin transaction verification...');

      let verificationResult;
      
      // Debug bypass for specific transaction ID
      if (txId === 'ihatebigger123') {
        console.log('🔧 Using debug bypass for transaction verification');
        verificationResult = {
          isValid: true,
          details: 'Debug transaction - bypassed verification'
        };
      } else {
        // Normal verification
        verificationResult = await BitcoinVerificationService.verifyTransaction(
          txId,
          myAddress,
          btcAmount
        );
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

      const orderData = {
        orderId,
        customerEmail: formData.email,
        customerName: formData.fullName,
        items: orderItems,
        originalTotal,
        discountAmount,
        shippingFee,
        finalTotal,
        paymentMethod: 'Bitcoin (BTC)',
        txId,
        bitcoinAmount: btcAmount,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
        phone: formData.phone,
        orderDate: new Date().toLocaleString(),
        verificationStatus: verificationResult.isValid ? 'verified' : 'failed',
        verificationDetails: verificationResult.details
      };

      // ONLY save and confirm orders if verification is successful
      if (verificationResult.isValid) {
        console.log('✅ Transaction verified! Processing order via Formspree first...');
        
        try {
          // Primary: Send via Formspree
          await sendOrderEmail(orderData);
          console.log('✅ Order processed via Formspree successfully');
          
          // Secondary: Save to database (only if Formspree succeeds)
          try {
            await saveOrderToDatabase(orderData);
            console.log('✅ Order also saved to database as backup');
          } catch (dbError) {
            console.warn('⚠️ Database save failed but Formspree succeeded:', dbError);
            // Don't fail the entire process if database save fails
          }
          
        } catch (emailError) {
          console.error('❌ Email sending failed - ORDER NOT PROCESSED:', emailError);
          throw new Error(`Order processing failed: ${emailError.message}`);
        }
        
        toast({
          title: '✅ Payment Verified & Order Confirmed!',
          description: 'Your Bitcoin payment has been verified and your order is confirmed.',
        });

        // Set order ID and show success modal
        setCurrentOrderId(orderId);
        setShowSuccessModal(true);
        
        // Clear cart and close payment modal
        onOrderSuccess();
        setStep(1);
        setError(null);
        setTxId('');
        onClose();
        
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
    onClose();
  };

  if (!isOpen && !showSuccessModal) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                
                <form onSubmit={handleProceed} className="space-y-6">
                  <ShippingForm 
                    formData={formData}
                    onInputChange={handleInputChange}
                    language="en"
                  />

                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
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
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={isLoading} 
                      className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? 'Processing...' : paymentMethod === 'bitcoin' ? 'Proceed to Bitcoin Payment' : 'Contact via Telegram'}
                    </button>
                    <button 
                      type="button" 
                      onClick={handleClose} 
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
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
                    🔍 Transaction ID (Auto-Verification Enabled)
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
                    🔍 We'll automatically verify your payment on the Bitcoin blockchain. Orders are confirmed instantly after successful verification.
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
                      <p className="text-blue-800 font-medium">🔍 Verifying Bitcoin transaction...</p>
                    </div>
                    <p className="text-sm text-blue-600 mt-2">Checking blockchain for transaction confirmation...</p>
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
                    onClick={() => setStep(1)} 
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
      
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderId={currentOrderId}
        language="en"
      />
    </>
  );
};

export default PaymentModal;
