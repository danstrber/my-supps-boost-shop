
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';
import { translations } from '@/lib/translations';
import OrderSummary from './payment/OrderSummary';
import PaymentMethodInfo from './payment/PaymentMethodInfo';
import ShippingForm from './payment/ShippingForm';
import BitcoinTutorial from './payment/BitcoinTutorial';
import BitcoinPaymentDetails from './payment/BitcoinPaymentDetails';
import PaymentTimer from './payment/PaymentTimer';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  quantity: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  cart: Record<string, number>;
  userProfile: UserProfile | null;
  cartItems: CartItem[];
  language: 'en' | 'es';
}

const PaymentModal = ({
  isOpen,
  onClose,
  orderTotal,
  discount,
  shippingFee,
  finalTotal,
  userProfile,
  cartItems,
  language = 'en'
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'telegram' | 'bitcoin'>('telegram');
  const [formData, setFormData] = useState({
    fullName: '',
    email: userProfile?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });
  const [txid, setTxid] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBitcoinDetails, setShowBitcoinDetails] = useState(false);
  const [orderCreated, setOrderCreated] = useState<string | null>(null);
  const [paymentExpired, setPaymentExpired] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string>('');
  const { toast } = useToast();
  const t = translations[language];

  const walletAddress = "3Arg9L1LwJjXd7fN7P3huZSYw42SfRFsBR";

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetModal = () => {
    setShowBitcoinDetails(false);
    setOrderCreated(null);
    setPaymentExpired(false);
    setTxid('');
    setLoading(false);
    setError(null);
    setCurrentStep('');
  };

  const createOrderInDatabase = async () => {
    console.log('📝 Creating order in Supabase database');
    
    if (!userProfile?.auth_id) {
      console.error('❌ No user auth_id found:', userProfile);
      throw new Error('User authentication required');
    }

    console.log('👤 User auth_id:', userProfile.auth_id);

    // Test Supabase connection first
    console.log('🧪 Testing Supabase connection...');
    console.log('🔗 Supabase URL:', supabase.supabaseUrl);
    console.log('🔗 Supabase Key (first 20 chars):', supabase.supabaseKey.substring(0, 20) + '...');
    
    // Test basic query to verify connection
    try {
      const { data: healthData, error: healthError } = await supabase
        .from('users')
        .select('id')
        .limit(1);
      console.log('🧪 Health check result:', { healthData, healthError });
      
      // Test auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      console.log('🧪 Auth check result:', { user: user?.id, authError });
      
      // Test orders table access
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id')
        .limit(1);
      console.log('🧪 Orders query result:', { ordersData, ordersError });
      
    } catch (testError) {
      console.error('🧪 Connection test failed:', testError);
    }

    // Prepare order data
    const orderData = {
      user_id: userProfile.auth_id,
      items: {
        products: cartItems.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          total: item.product.price * item.quantity
        }))
      },
      original_total: orderTotal,
      discount_amount: discount,
      shipping_fee: shippingFee,
      final_total: finalTotal,
      payment_method: paymentMethod,
      payment_details: {
        customer_info: formData,
        btc_amount_sent: finalTotal,
        wallet_address: walletAddress,
        txid: txid.trim() || null,
        timestamp: new Date().toISOString()
      },
      status: paymentMethod === 'telegram' ? 'pending_telegram' : 'pending_bitcoin'
    };

    console.log('📦 Inserting order data:', orderData);

    try {
      console.log('🔄 Making Supabase insert request...');
      
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();
      
      console.log('📊 Supabase response received:', { data, error });

      if (error) {
        console.error('❌ Database error details:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error details:', error.details);
        console.error('❌ Error hint:', error.hint);
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
      }

      if (!data) {
        console.error('❌ No data returned from insert');
        throw new Error('No order data returned from database');
      }

      console.log('✅ Order created successfully with ID:', data.id);
      return data;
    } catch (err: any) {
      console.error('💥 Insert operation failed:', err);
      console.error('💥 Error name:', err.name);
      console.error('💥 Error message:', err.message);
      console.error('💥 Error stack:', err.stack);
      throw err;
    }
  };

  const updateUserSpending = async () => {
    console.log('💰 Updating user spending records...');
    
    if (!userProfile?.auth_id) {
      console.log('⚠️ No user auth_id for spending update');
      return;
    }

    try {
      const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('total_spending')
        .eq('auth_id', userProfile.auth_id)
        .single();

      if (fetchError) {
        console.error('❌ Error fetching user data:', fetchError);
        return;
      }

      const newTotalSpending = (userData.total_spending || 0) + finalTotal;
      console.log('💰 Updating spending from', userData.total_spending, 'to', newTotalSpending);
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ total_spending: newTotalSpending })
        .eq('auth_id', userProfile.auth_id);

      if (updateError) {
        console.error('❌ Error updating user spending:', updateError);
        return;
      }

      console.log('✅ User spending updated successfully');
    } catch (error) {
      console.error('❌ Error in spending update:', error);
    }
  };

  const sendOrderNotifications = async (orderData: any) => {
    console.log('📧 Sending order notifications...');
    
    try {
      const { error } = await supabase.functions.invoke('send-order-email', {
        body: {
          customerEmail: formData.email,
          customerName: formData.fullName,
          items: cartItems.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
          })),
          originalTotal: orderTotal,
          discountAmount: discount,
          shippingFee: shippingFee,
          finalTotal: finalTotal,
          paymentMethod: paymentMethod,
          paymentDetails: orderData.payment_details,
          orderId: orderData.id
        }
      });

      if (error) {
        console.error('❌ Notification error:', error);
      } else {
        console.log('✅ Notifications sent successfully');
      }
    } catch (error) {
      console.error('❌ Notification sending failed:', error);
    }
  };

  const handleTelegramRedirect = async () => {
    console.log('🔵 Processing Telegram order...');
    setLoading(true);
    setError(null);

    try {
      const order = await createOrderInDatabase();
      console.log('✅ Telegram order created:', order.id);
      
      await updateUserSpending();
      await sendOrderNotifications(order);
      
      localStorage.removeItem('cart');
      setOrderCreated(order.id);
      
      toast({
        title: t.orderPlacedSuccess || 'Order Created Successfully!',
        description: `Order ID: ${order.id.slice(0, 8)}. Redirecting to Telegram...`,
      });

      setTimeout(() => {
        window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
      }, 1000);

    } catch (error: any) {
      console.error('❌ Telegram order failed:', error);
      setError(error.message);
      toast({
        title: 'Order Failed',
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBitcoinOrder = async () => {
    console.log('🟡 Processing Bitcoin order...');
    setLoading(true);
    setError(null);

    try {
      const order = await createOrderInDatabase();
      console.log('✅ Bitcoin order created:', order.id);
      
      await updateUserSpending();
      await sendOrderNotifications(order);
      
      localStorage.removeItem('cart');
      setOrderCreated(order.id);
      
      toast({
        title: t.orderPlacedSuccess || 'Order Placed Successfully!',
        description: `Order ID: ${order.id.slice(0, 8)}`,
      });

    } catch (error: any) {
      console.error('❌ Bitcoin order failed:', error);
      setError(error.message);
      toast({
        title: t.orderFailed || 'Order Failed',
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentExpired = () => {
    setPaymentExpired(true);
    toast({
      title: language === 'en' ? 'Payment Expired' : 'Pago Expirado',
      description: language === 'en' ? 'Please refresh and try again.' : 'Por favor, actualiza e inténtalo de nuevo.',
      variant: "destructive"
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted with method:', paymentMethod);
    
    setError(null);
    setCurrentStep('Validating form data...');
    
    if (paymentMethod === 'telegram') {
      setCurrentStep('Processing Telegram order...');
      await handleTelegramRedirect();
      return;
    }

    if (paymentMethod === 'bitcoin' && !showBitcoinDetails) {
      if (!formData.fullName || !formData.email || !formData.address || 
          !formData.city || !formData.country || !formData.phone || !formData.zipCode) {
        toast({
          title: t.missingInformation,
          description: t.fillAllFields,
          variant: "destructive"
        });
        return;
      }
      
      setShowBitcoinDetails(true);
      return;
    }

    if (paymentExpired) {
      toast({
        title: language === 'en' ? 'Payment Expired' : 'Pago Expirado',
        description: language === 'en' ? 'Please refresh and try again.' : 'Por favor, actualiza e inténtalo de nuevo.',
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === 'bitcoin' && !txid.trim()) {
      toast({
        title: language === 'en' ? 'Transaction ID Required' : 'ID de Transacción Requerido',
        description: language === 'en' ? 'Please enter the Bitcoin transaction ID to complete your order.' : 'Por favor, ingresa el ID de transacción de Bitcoin para completar tu pedido.',
        variant: "destructive"
      });
      return;
    }

    console.log('🟡 Processing Bitcoin order...');
    setLoading(true);
    setCurrentStep('Creating order in database...');

    try {
      console.log('🔄 Starting order creation process...');
      const order = await createOrderInDatabase();
      console.log('✅ Order creation completed:', order.id);
      
      setCurrentStep('Updating user spending...');
      await updateUserSpending();
      
      setCurrentStep('Sending notifications...');
      await sendOrderNotifications(order);
      
      setCurrentStep('Finalizing order...');
      localStorage.removeItem('cart');
      setOrderCreated(order.id);
      
      toast({
        title: t.orderPlacedSuccess || 'Order Placed Successfully!',
        description: `Order ID: ${order.id.slice(0, 8)}`,
      });

    } catch (error: any) {
      console.error('❌ Bitcoin order failed:', error);
      setError(error.message);
      setCurrentStep('Order failed');
      toast({
        title: t.orderFailed || 'Order Failed',
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setCurrentStep('');
    }
  };

  const handleModalClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
        aria-describedby="payment-modal-description"
      >
        <DialogHeader>
          <DialogTitle>
            {orderCreated ? 
              (language === 'en' ? '✅ Order Confirmed!' : '✅ ¡Pedido Confirmado!') : 
              t.completeYourOrder
            }
          </DialogTitle>
          <DialogDescription id="payment-modal-description">
            {orderCreated ? 
              (language === 'en' ? 'Your order has been successfully placed and confirmed.' : 'Tu pedido ha sido realizado y confirmado exitosamente.') :
              (language === 'en' ? 'Review your order and select your preferred payment method to complete your purchase.' : 'Revisa tu pedido y selecciona tu método de pago preferido para completar tu compra.')
            }
          </DialogDescription>
        </DialogHeader>

        <div>
          {orderCreated ? (
            <div className="space-y-4 text-center">
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {language === 'en' ? 'Order Successfully Placed!' : '¡Pedido Realizado Exitosamente!'}
                </h3>
                <p className="text-green-700 mb-4">
                  {language === 'en' ? 'Order ID:' : 'ID del Pedido:'} <strong>{orderCreated.slice(0, 8)}</strong>
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                  <p className="text-sm text-green-600 mb-3">
                    {language === 'en' ? 
                      '✅ Order saved to database\n✅ Email confirmation sent\n✅ Payment processing initiated' :
                      '✅ Pedido guardado en base de datos\n✅ Email de confirmación enviado\n✅ Procesamiento de pago iniciado'
                    }
                  </p>
                </div>
                <p className="text-sm text-green-600 mb-4">
                  {language === 'en' ? 
                    'You will receive a confirmation email shortly. Our team will process your order within 24 hours.' :
                    'Recibirás un email de confirmación pronto. Nuestro equipo procesará tu pedido en 24 horas.'
                  }
                </p>
                <div className="space-y-2 text-sm bg-blue-50 p-3 rounded-lg border">
                  <p><strong>{language === 'en' ? 'Support:' : 'Soporte:'}</strong></p>
                  <p>Email: christhomaso083@proton.me</p>
                  <p>Telegram: <a href="https://t.me/DANSTRBER" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@DANSTRBER</a></p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleModalClose}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {language === 'en' ? 'Continue Shopping' : 'Continuar Comprando'}
                  </button>
                  <button
                    onClick={() => {
                      handleModalClose();
                      window.location.hash = '#account';
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {language === 'en' ? 'View My Orders' : 'Ver Mis Pedidos'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">❌</span>
                    <h4 className="font-semibold text-red-800">Order Failed</h4>
                  </div>
                  <p className="text-red-700 text-sm mb-2">
                    <strong>Error:</strong> {error}
                  </p>
                  <p className="text-red-600 text-xs">
                    Please try again or contact support if the issue persists.
                  </p>
                </div>
              )}

              {loading && currentStep && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-blue-700 text-sm">
                      <strong>Processing:</strong> {currentStep}
                    </p>
                  </div>
                </div>
              )}

              <OrderSummary
                cartItems={cartItems}
                orderTotal={orderTotal}
                discount={discount}
                shippingFee={shippingFee}
                finalTotal={finalTotal}
              />

              <div 
                className="bg-green-50 border border-green-200 p-3 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors"
                onClick={() => {
                  handleModalClose();
                  window.location.hash = '#account';
                }}
              >
                <p className="text-green-700 text-sm font-medium">
                  {t.wantCheaper}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="text-base font-semibold text-gray-800 mb-3">
                    {t.paymentMethod}
                  </div>
                  <div className="space-y-3">
                    <div 
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                        paymentMethod === 'telegram' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setPaymentMethod('telegram')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            id="payment-telegram"
                            name="paymentMethod"
                            type="radio"
                            value="telegram"
                            checked={paymentMethod === 'telegram'}
                            onChange={() => setPaymentMethod('telegram')}
                            className="text-blue-600"
                          />
                          <label htmlFor="payment-telegram" className="font-medium cursor-pointer">💬 Telegram</label>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            {t.recommended}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                        paymentMethod === 'bitcoin' 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setPaymentMethod('bitcoin')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            id="payment-bitcoin"
                            name="paymentMethod"
                            type="radio"
                            value="bitcoin"
                            checked={paymentMethod === 'bitcoin'}
                            onChange={() => setPaymentMethod('bitcoin')}
                            className="text-orange-600"
                          />
                          <label htmlFor="payment-bitcoin" className="font-medium cursor-pointer">₿ Bitcoin</label>
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                            Anonymous
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <PaymentMethodInfo paymentMethod={paymentMethod} />

                {paymentMethod === 'bitcoin' && showBitcoinDetails && (
                  <PaymentTimer 
                    onExpired={handlePaymentExpired}
                    language={language}
                  />
                )}

                {paymentMethod === 'bitcoin' && !showBitcoinDetails && (
                  <BitcoinTutorial language={language} />
                )}

                {paymentMethod === 'bitcoin' && (
                  <ShippingForm
                    formData={formData}
                    onInputChange={handleInputChange}
                    language={language}
                  />
                )}

                {showBitcoinDetails && paymentMethod === 'bitcoin' && !paymentExpired && (
                  <BitcoinPaymentDetails
                    amount={finalTotal}
                    walletAddress={walletAddress}
                    txid={txid}
                    onTxidChange={setTxid}
                    language={language}
                  />
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
                  disabled={loading || paymentExpired}
                >
                  {loading ? (language === 'en' ? 'Processing...' : 'Procesando...') : 
                   paymentExpired ? (language === 'en' ? 'Payment Expired' : 'Pago Expirado') :
                   paymentMethod === 'telegram' ? t.joinTelegram : 
                   !showBitcoinDetails ? t.continueToPayment :
                   t.completeOrder}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
