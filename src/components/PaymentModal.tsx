import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Bitcoin, MessageCircle, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { UserProfile } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { translations } from '@/lib/translations';
import BitcoinPaymentDetails from './payment/BitcoinPaymentDetails';
import BitcoinTutorial from './payment/BitcoinTutorial';
import ShippingForm from './payment/ShippingForm';
import OrderSummary from './payment/OrderSummary';
import TermsOfService from './TermsOfService';

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
  const { toast } = useToast();
  const t = translations[language];

  const walletAddress = "3Arg9L1LwJjXd7fN7P3huZSYw42SfRFsBR";

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sendOrderEmails = async (orderData: any) => {
    try {
      // Send via Supabase edge function
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
          paymentDetails: orderData.payment_details
        }
      });

      if (error) {
        console.error('Supabase email error:', error);
        throw error;
      }

      console.log('Order emails sent successfully via Supabase');
    } catch (error) {
      console.error('Failed to send order emails:', error);
      // Continue with order creation even if email fails
    }
  };

  const handleTelegramRedirect = () => {
    window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
    toast({
      title: t.redirectedTelegram,
      description: t.completeTelegramOrder,
    });
    onClose();
  };

  const handlePaymentExpired = () => {
    setPaymentExpired(true);
    toast({
      title: language === 'en' ? 'Payment Expired' : 'Pago Expirado',
      description: language === 'en' ? 'Payment time has expired. Please try again.' : 'El tiempo de pago ha expirado. Por favor, inténtalo de nuevo.',
      variant: "destructive"
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'telegram') {
      handleTelegramRedirect();
      return;
    }

    if (paymentMethod === 'bitcoin' && !showBitcoinDetails) {
      if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.country || !formData.phone || !formData.zipCode) {
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

    // Validate TXID for Bitcoin payments
    if (paymentMethod === 'bitcoin' && !txid.trim()) {
      toast({
        title: language === 'en' ? 'Transaction ID Required' : 'ID de Transacción Requerido',
        description: language === 'en' ? 'Please enter the Bitcoin transaction ID to complete your order.' : 'Por favor, ingresa el ID de transacción de Bitcoin para completar tu pedido.',
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        user_id: userProfile?.auth_id,
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
          txid: txid
        },
        status: 'pending'
      };

      console.log('Creating order with data:', orderData);

      const { data: order, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Supabase order creation error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Order created successfully:', order);

      // Create pending purchase for tracking
      createPendingPurchase(order.id, {
        userId: userProfile?.auth_id || '',
        amount: finalTotal,
        items: cartItems,
        referralCode: userProfile?.referred_by || undefined
      });

      // Send order confirmation emails
      await sendOrderEmails(orderData);

      setOrderCreated(order.id);

      toast({
        title: t.orderPlacedSuccess,
        description: `${t.orderPlaced} Order ID: ${order.id.slice(0, 8)}`,
      });

      // Clear cart from localStorage
      localStorage.removeItem('cart');
      
      // Close modal after short delay to show success
      setTimeout(() => {
        onClose();
        // Reload page to update cart state
        window.location.reload();
      }, 3000);
      
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast({
        title: t.orderFailed,
        description: error.message || t.orderError,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReferralClick = () => {
    // Navigate to account page instead of non-existent referral page
    onClose();
    window.location.hash = '#account';
    window.location.reload();
  };

  // Reset states when modal closes
  const handleModalClose = () => {
    setShowBitcoinDetails(false);
    setOrderCreated(null);
    setPaymentExpired(false);
    setTxid('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="payment-dialog-description">
        <DialogHeader>
          <DialogTitle>
            {orderCreated ? 
              (language === 'en' ? '✅ Order Confirmed!' : '✅ ¡Pedido Confirmado!') : 
              t.completeYourOrder
            }
          </DialogTitle>
          <DialogDescription id="payment-dialog-description">
            {orderCreated ? 
              (language === 'en' ? 'Your order has been successfully placed and will be processed within 24 hours.' : 'Tu pedido ha sido realizado exitosamente y será procesado en 24 horas.') :
              (language === 'en' ? 'Review your order details and select your preferred payment method below.' : 'Revisa los detalles de tu pedido y selecciona tu método de pago preferido.')
            }
          </DialogDescription>
        </DialogHeader>

        {orderCreated ? (
          <div className="space-y-4 text-center">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {language === 'en' ? 'Thank you for your order!' : '¡Gracias por tu pedido!'}
              </h3>
              <p className="text-green-700 mb-4">
                {language === 'en' ? 'Order ID:' : 'ID del Pedido:'} <strong>{orderCreated.slice(0, 8)}</strong>
              </p>
              <p className="text-sm text-green-600 mb-4">
                {language === 'en' ? 
                  'You will receive a confirmation email shortly. Our team will process your order within 24 hours.' :
                  'Recibirás un email de confirmación pronto. Nuestro equipo procesará tu pedido en 24 horas.'
                }
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>{language === 'en' ? 'Support:' : 'Soporte:'}</strong></p>
                <p>Email: christhomaso083@proton.me</p>
                <p>Telegram: <a href="https://t.me/DANSTRBER" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@DANSTRBER</a></p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <OrderSummary
              cartItems={cartItems}
              orderTotal={orderTotal}
              discount={discount}
              shippingFee={shippingFee}
              finalTotal={finalTotal}
            />

            <div 
              className="bg-green-50 border border-green-200 p-3 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors"
              onClick={handleReferralClick}
            >
              <p className="text-green-700 text-sm font-medium">
                {t.wantCheaper}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <Label htmlFor="payment-method-group" className="text-base font-semibold text-gray-800 mb-3 block">
                  {t.paymentMethod}
                </Label>
                <div className="space-y-3" role="radiogroup" aria-labelledby="payment-method-group">
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
                          aria-describedby="telegram-description"
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
                          aria-describedby="bitcoin-description"
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
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
