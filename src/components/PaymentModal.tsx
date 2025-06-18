
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
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();
    return { btc: { currentPrice: data.bpi.USD.rate_float } };
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

    // Test authentication first
    console.log('🧪 Testing authentication...');
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
    
    console.log('✅ Authentication verified');

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
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.country || !formData.phone) {
        throw new Error('All fields are required');
      }
      if (Object.keys(cart).length === 0) throw new Error('Cart is empty');
      if (!products || !Array.isArray(products)) throw new Error('Products not loaded');

      if (paymentMethod === 'bitcoin') {
        const totalUSD = calculateTotalUSD();
        const { btc: { currentPrice } } = await fetchCryptoPrice();
        const btcAmount = totalUSD / currentPrice;
        setBtcAmount(btcAmount);
        setStep(2);
      } else if (paymentMethod === 'telegram') {
        // Redirect to Telegram for payment
        window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
        toast({
          title: 'Telegram Payment',
          description: 'Please complete your order via Telegram.',
        });
        onClose();
      }
    } catch (err: any) {
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
      <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {step === 1 ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleProceed}>
              <div className="space-y-4">
                <label className="block">
                  Full Name: 
                  <input 
                    id="fullName"
                    name="fullName"
                    type="text" 
                    value={formData.fullName} 
                    onChange={(e) => handleInputChange('fullName', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <label className="block">
                  Email: 
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <label className="block">
                  Address: 
                  <input 
                    id="address"
                    name="address"
                    type="text" 
                    value={formData.address} 
                    onChange={(e) => handleInputChange('address', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <label className="block">
                  City: 
                  <input 
                    id="city"
                    name="city"
                    type="text" 
                    value={formData.city} 
                    onChange={(e) => handleInputChange('city', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <label className="block">
                  State: 
                  <input 
                    id="state"
                    name="state"
                    type="text" 
                    value={formData.state} 
                    onChange={(e) => handleInputChange('state', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <label className="block">
                  Zip Code: 
                  <input 
                    id="zipCode"
                    name="zipCode"
                    type="text" 
                    value={formData.zipCode} 
                    onChange={(e) => handleInputChange('zipCode', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <label className="block">
                  Country: 
                  <input 
                    id="country"
                    name="country"
                    type="text" 
                    value={formData.country} 
                    onChange={(e) => handleInputChange('country', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <label className="block">
                  Phone: 
                  <input 
                    id="phone"
                    name="phone"
                    type="text" 
                    value={formData.phone} 
                    onChange={(e) => handleInputChange('phone', e.target.value)} 
                    required 
                    className="w-full border rounded p-2 mt-1" 
                  />
                </label>
                <div className="space-y-2">
                  <label className="block">
                    <input 
                      id="bitcoin"
                      name="paymentMethod"
                      type="radio" 
                      value="bitcoin" 
                      checked={paymentMethod === 'bitcoin'} 
                      onChange={() => setPaymentMethod('bitcoin')} 
                      className="mr-2"
                    /> 
                    Bitcoin
                  </label>
                  <label className="block">
                    <input 
                      id="telegram"
                      name="paymentMethod"
                      type="radio" 
                      value="telegram" 
                      checked={paymentMethod === 'telegram'} 
                      onChange={() => setPaymentMethod('telegram')} 
                      className="mr-2"
                    /> 
                    Telegram
                  </label>
                </div>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mt-4 flex space-x-2">
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Payment'}
                </button>
                <button 
                  type="button" 
                  onClick={handleClose} 
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Confirm Bitcoin Payment</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded">
              <p className="mb-2">Send exactly <strong>{btcAmount.toFixed(8)} BTC</strong></p>
              <p className="mb-2">To address: <strong className="font-mono text-sm break-all">{myAddress}</strong></p>
              <p className="text-sm text-gray-600">Total: ${calculateTotalUSD().toFixed(2)} USD</p>
            </div>
            <input 
              id="txId"
              name="txId"
              type="text" 
              value={txId} 
              onChange={(e) => setTxId(e.target.value)} 
              placeholder="Enter Transaction ID after sending Bitcoin" 
              className="w-full border rounded p-2 mb-4" 
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex space-x-2">
              <button 
                onClick={handleConfirm} 
                disabled={isLoading} 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Confirm Payment'}
              </button>
              <button 
                onClick={() => setStep(1)} 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
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
