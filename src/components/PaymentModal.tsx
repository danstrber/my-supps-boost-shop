
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaymentTimer from './payment/PaymentTimer';
import ShippingForm from './payment/ShippingForm';
import BitcoinTutorial from './payment/BitcoinTutorial';

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
  const [error, setError] = useState<string | null>(null);
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

  const sendOrderEmail = async (orderData: any) => {
    console.log('📧 Sending order email via Formspree...');
    try {
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
          _subject: `New Bitcoin Order #${orderData.orderId} from ${orderData.customerName}`,
          _cc: 'christhomaso083@proton.me'
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Email failed with status: ${response.status}`);
      }
      
      console.log('✅ Order email sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw error;
    }
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
      if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.country || !formData.phone) {
        throw new Error('All fields are required');
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
        window.open('https://t.me/+YOUR_TELEGRAM_GROUP_LINK', '_blank');
        
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
    setError(null);

    try {
      if (!txId) throw new Error('Transaction ID is required');
      if (!products || !Array.isArray(products)) throw new Error('Products not loaded');

      console.log('📧 Creating Bitcoin order for Formspree...');

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
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
        phone: formData.phone,
        orderDate: new Date().toLocaleString()
      };

      console.log('📧 Sending Bitcoin order email via Formspree...');
      await sendOrderEmail(orderData);
      console.log('✅ Order email sent successfully via Formspree');
      
      // Clear cart and close modal
      onOrderSuccess();
      onClose();
      
      toast({
        title: '🎉 Order Submitted Successfully!',
        description: `Your order #${orderId} has been sent via email. We will verify your Bitcoin payment and process your order within 24 hours.`,
        duration: 8000,
      });
      
    } catch (err: any) {
      console.error('❌ Error in handleConfirm:', err);
      setError(err.message);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setError(null);
    setTxId('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {step === 1 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Complete Your Purchase</h2>
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

              <div className="bg-gray-50 p-6 rounded-lg">
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
                    <span className="text-gray-700 font-medium">Bitcoin (BTC) - Automated Processing</span>
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
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
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
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Bitcoin Payment</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-3xl font-light transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            
            <PaymentTimer onExpired={() => setStep(1)} language="en" />
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6 mt-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-orange-800 mb-2">₿ Payment Details</h3>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-gray-600 mb-2">Send exactly</p>
                  <p className="text-2xl font-bold text-orange-600 mb-4">{btcAmount.toFixed(8)} BTC</p>
                  <p className="text-sm text-gray-600 mb-2">To address:</p>
                  <p className="font-mono text-sm bg-gray-100 p-3 rounded border break-all">{myAddress}</p>
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
                Transaction ID (Required)
              </label>
              <input 
                id="txId"
                name="txId"
                type="text" 
                value={txId} 
                onChange={(e) => setTxId(e.target.value)} 
                placeholder="Enter Transaction ID after sending Bitcoin" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter the transaction ID from your Bitcoin wallet after sending the payment. We'll verify it manually.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button 
                onClick={handleConfirm} 
                disabled={isLoading || !txId} 
                className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Submitting Order...' : 'Submit Order'}
              </button>
              <button 
                onClick={() => setStep(1)} 
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
