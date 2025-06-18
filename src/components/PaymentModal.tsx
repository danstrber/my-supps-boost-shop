import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      // Use a different API that's more reliable
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      return { btc: { currentPrice: data.bitcoin.usd } };
    } catch (error) {
      console.error('Failed to fetch crypto price, using fallback');
      // Fallback price in case API fails
      return { btc: { currentPrice: 50000 } };
    }
  };

  const checkTransaction = async (txId: string, requiredSatoshis: number) => {
    console.log('🔍 Checking transaction:', txId);
    const url = `https://blockchain.info/rawtx/${txId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data || data.block_height === null) {
        console.error('❌ No transaction found or unconfirmed');
        return false;
      }
      const myOutput = data.out.find(
        (output: any) => output.addr === myAddress && output.value >= requiredSatoshis
      );
      console.log('🔎 Transaction check result:', !!myOutput);
      return !!myOutput;
    } catch (err) {
      console.error('❌ Failed to verify transaction:', err);
      return false;
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
  };

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Form submitted, processing...');
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
        window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
        toast({
          title: 'Telegram Payment',
          description: 'Please complete your order via Telegram.',
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

      const totalUSD = calculateTotalUSD();
      const { btc: { currentPrice } } = await fetchCryptoPrice();
      const requiredBTC = totalUSD / currentPrice;
      const requiredSatoshis = Math.ceil(requiredBTC * 1e8);

      if (!(await checkTransaction(txId, requiredSatoshis))) {
        throw new Error('Invalid or unconfirmed transaction');
      }

      const orderData = {
        user_id: userProfile?.auth_id,
        items: Object.entries(cart).map(([id, qty]) => {
          const p = products.find(p => p.id === id) || { name: 'Unknown', price: 0 };
          return { id, name: p.name, price: p.price, quantity: qty };
        }),
        original_total: calculateTotalUSD() - 7.5,
        discount_amount: userDiscount,
        shipping_fee: 7.5,
        payment_method: paymentMethod,
        payment_details: { ...formData, txId },
      };

      await createOrderInDatabase(orderData);
      await sendOrderEmail(orderData);
      onOrderSuccess();
      onClose();
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input 
                    id="fullName"
                    name="fullName"
                    type="text" 
                    value={formData.fullName} 
                    onChange={(e) => handleInputChange('fullName', e.target.value)} 
                    required 
                    autoComplete="name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)} 
                    required 
                    autoComplete="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input 
                  id="address"
                  name="address"
                  type="text" 
                  value={formData.address} 
                  onChange={(e) => handleInputChange('address', e.target.value)} 
                  required 
                  autoComplete="street-address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input 
                    id="city"
                    name="city"
                    type="text" 
                    value={formData.city} 
                    onChange={(e) => handleInputChange('city', e.target.value)} 
                    required 
                    autoComplete="address-level2"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input 
                    id="state"
                    name="state"
                    type="text" 
                    value={formData.state} 
                    onChange={(e) => handleInputChange('state', e.target.value)} 
                    required 
                    autoComplete="address-level1"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input 
                    id="zipCode"
                    name="zipCode"
                    type="text" 
                    value={formData.zipCode} 
                    onChange={(e) => handleInputChange('zipCode', e.target.value)} 
                    required 
                    autoComplete="postal-code"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input 
                    id="country"
                    name="country"
                    type="text" 
                    value={formData.country} 
                    onChange={(e) => handleInputChange('country', e.target.value)} 
                    required 
                    autoComplete="country-name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input 
                    id="phone"
                    name="phone"
                    type="tel" 
                    value={formData.phone} 
                    onChange={(e) => handleInputChange('phone', e.target.value)} 
                    required 
                    autoComplete="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      id="bitcoin"
                      name="paymentMethod"
                      type="radio" 
                      value="bitcoin" 
                      checked={paymentMethod === 'bitcoin'} 
                      onChange={() => setPaymentMethod('bitcoin')} 
                      className="w-4 h-4 text-blue-600"
                    /> 
                    <span className="text-gray-700 font-medium">Bitcoin (BTC)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      id="telegram"
                      name="paymentMethod"
                      type="radio" 
                      value="telegram" 
                      checked={paymentMethod === 'telegram'} 
                      onChange={() => setPaymentMethod('telegram')} 
                      className="w-4 h-4 text-blue-600"
                    /> 
                    <span className="text-gray-700 font-medium">Telegram</span>
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
            <div className="mb-6">
              <p className="text-gray-600">Send the exact amount below and enter your transaction ID to confirm payment.</p>
            </div>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                Enter the transaction ID from your Bitcoin wallet after sending the payment.
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
                disabled={isLoading} 
                className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Confirm Payment'}
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
