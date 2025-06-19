
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PaymentTimer from './payment/PaymentTimer';
import TelegramPaymentModal from './payment/TelegramPaymentModal';
import ShippingForm from './payment/ShippingForm';

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
  const [showTelegramModal, setShowTelegramModal] = useState(false);
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

  const createOrderInDatabase = async (orderData: any) => {
    console.log('📝 Starting order creation in Supabase');
    console.log('👤 User auth_id:', userProfile?.auth_id);

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('🧪 Auth check result:', { user: user?.id, authError });
    
    if (authError) {
      console.error('❌ Auth error:', authError);
      throw new Error(`Authentication error: ${authError.message}`);
    }
    
    if (!user) {
      console.error('❌ No authenticated user found');
      throw new Error('User not authenticated');
    }
    
    if (user.id !== userProfile?.auth_id) {
      console.error('❌ User ID mismatch:', { authenticated: user.id, profile: userProfile?.auth_id });
      throw new Error('User authentication mismatch');
    }

    try {
      console.log('🔄 Making Supabase insert request...');
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select('*')
        .single();
      
      console.log('📊 Supabase response received:', { data, error });

      if (error) {
        console.error('❌ Database error details:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      if (!data) {
        console.error('❌ No data returned from insert');
        throw new Error('No order data returned from database');
      }

      console.log('✅ Order created successfully with ID:', data.id);
      return data;
    } catch (err: any) {
      console.error('❌ Database error:', err);
      throw err;
    }
  };

  const sendOrderEmail = async (orderData: any) => {
    console.log('📧 Sending order email via Formspree...');
    const emailFormData = new URLSearchParams();
    emailFormData.append('customerEmail', orderData.payment_details.email);
    emailFormData.append('customerName', orderData.payment_details.fullName);
    emailFormData.append('items', JSON.stringify(orderData.items));
    emailFormData.append('originalTotal', orderData.original_total.toString());
    emailFormData.append('discountAmount', orderData.discount_amount.toString());
    emailFormData.append('shippingFee', orderData.shipping_fee.toString());
    emailFormData.append('finalTotal', (orderData.original_total - orderData.discount_amount + orderData.shipping_fee).toString());
    emailFormData.append('paymentMethod', orderData.payment_method);
    emailFormData.append('txId', orderData.payment_details.txId || '');
    emailFormData.append('address', `${orderData.payment_details.address}, ${orderData.payment_details.city}, ${orderData.payment_details.state} ${orderData.payment_details.zipCode}, ${orderData.payment_details.country}`);
    emailFormData.append('phone', orderData.payment_details.phone);
    emailFormData.append('_subject', `New Order from ${orderData.payment_details.fullName}`);
    emailFormData.append('_cc', 'christhomaso083@proton.me');

    const response = await fetch('https://formspree.io/f/mqaqvlye', {
      method: 'POST',
      body: emailFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    if (!response.ok) {
      throw new Error(`Email failed with status: ${response.status}`);
    }
    
    console.log('✅ Order email sent successfully');
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
        console.log('📱 Processing Telegram payment...');
        
        // Create order data for Telegram payment
        const orderData = {
          user_id: userProfile?.auth_id,
          items: Object.entries(cart).map(([id, qty]) => {
            const p = products.find(p => p.id === id) || { name: 'Unknown', price: 0 };
            return { id, name: p.name, price: p.price, quantity: qty };
          }),
          original_total: calculateTotalUSD() - 7.5,
          discount_amount: userDiscount,
          shipping_fee: 7.5,
          payment_method: 'telegram',
          payment_details: { ...formData },
          status: 'pending'
        };

        console.log('💾 Creating Telegram order in database...');
        const createdOrder = await createOrderInDatabase(orderData);
        
        console.log('📧 Sending Telegram order email...');
        await sendOrderEmail(orderData);
        
        console.log('✅ Telegram order processed successfully');
        setShowTelegramModal(true);
        
        // Show success message
        toast({
          title: 'Order Submitted!',
          description: 'Your order has been submitted. Please complete payment via Telegram.',
        });
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

      const orderData = {
        user_id: userProfile?.auth_id,
        items: Object.entries(cart).map(([id, qty]) => {
          const p = products.find(p => p.id === id) || { name: 'Unknown', price: 0 };
          return { id, name: p.name, price: p.price, quantity: qty };
        }),
        original_total: calculateTotalUSD() - 7.5,
        discount_amount: userDiscount,
        shipping_fee: 7.5,
        payment_method: 'bitcoin',
        payment_details: { ...formData, txId },
        status: 'pending'
      };

      console.log('💾 Creating Bitcoin order in database...');
      await createOrderInDatabase(orderData);
      
      console.log('📧 Sending Bitcoin order email...');
      await sendOrderEmail(orderData);
      
      onOrderSuccess();
      onClose();
      
      toast({
        title: 'Order Placed!',
        description: 'Your order has been submitted successfully. We will verify payment and process your order.',
      });
      
    } catch (err: any) {
      setError(err.message);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setError(null);
    setShowTelegramModal(false);
    onClose();
  };

  const handleTelegramModalClose = () => {
    setShowTelegramModal(false);
    onOrderSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
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
                      <span className="text-gray-700 font-medium">Bitcoin (BTC)</span>
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
                      <span className="text-gray-700 font-medium">Telegram (Recommended)</span>
                    </label>
                  </div>
                </div>

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
                    {isLoading ? 'Processing...' : 'Proceed to Payment'}
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
                  Transaction ID
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
                  {isLoading ? 'Processing...' : 'Submit Order'}
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

      <TelegramPaymentModal 
        isOpen={showTelegramModal}
        onClose={handleTelegramModalClose}
        language="en"
      />
    </>
  );
};

export default PaymentModal;
