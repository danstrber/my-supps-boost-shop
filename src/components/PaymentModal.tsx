
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { createOrder, updateUserSpending } from '@/lib/purchase-tracking';
import OrderSummary from '@/components/payment/OrderSummary';
import ShippingForm from '@/components/payment/ShippingForm';
import PaymentMethodInfo from '@/components/payment/PaymentMethodInfo';
import BitcoinPaymentDetails from '@/components/payment/BitcoinPaymentDetails';
import PaymentTimer from '@/components/payment/PaymentTimer';
import TelegramPaymentModal from '@/components/payment/TelegramPaymentModal';
import BitcoinTutorial from '@/components/payment/BitcoinTutorial';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  onPaymentSuccess: () => void;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  subtotal, 
  discount, 
  shippingFee, 
  total,
  onPaymentSuccess 
}: PaymentModalProps) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'bitcoin' | 'processing'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'telegram' | 'bitcoin' | null>(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    telegram: ''
  });
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [bitcoinAmount, setBitcoinAmount] = useState(0);
  const [txid, setTxid] = useState('');
  const [paymentTimer, setPaymentTimer] = useState(30 * 60);
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout>();

  // Use correct BTC address
  const BITCOIN_ADDRESS = "3Arg9L1LwJjXd7fN7P3huZSYw42SfRFsBR";

  useEffect(() => {
    if (step === 'bitcoin' && paymentTimer > 0) {
      timerRef.current = setInterval(() => {
        setPaymentTimer(prev => {
          if (prev <= 1) {
            handlePaymentTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [step, paymentTimer]);

  const generateBitcoinPayment = async () => {
    try {
      const usdToBtc = 0.000023; // Mock rate
      const btcAmount = total * usdToBtc;

      setBitcoinAddress(BITCOIN_ADDRESS);
      setBitcoinAmount(btcAmount);
      setPaymentTimer(30 * 60);
      setStep('bitcoin');

      console.log('Bitcoin payment generated:', {
        address: BITCOIN_ADDRESS,
        amount: btcAmount,
        totalUsd: total
      });
    } catch (error) {
      console.error('Error generating Bitcoin payment:', error);
      toast({
        title: "Error",
        description: "Failed to generate Bitcoin payment details",
        variant: "destructive"
      });
    }
  };

  const handlePaymentMethodSelect = async (method: 'telegram' | 'bitcoin') => {
    setPaymentMethod(method);
    
    if (method === 'telegram') {
      setTelegramModalOpen(true);
    } else if (method === 'bitcoin') {
      await generateBitcoinPayment();
    }
  };

  const handlePaymentComplete = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to complete payment",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === 'bitcoin' && !txid.trim()) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your Bitcoin transaction ID to complete the payment",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    console.log('Processing payment completion...');

    try {
      const orderData = {
        user_id: user.id,
        items: {
          products: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          }))
        },
        original_total: subtotal,
        discount_amount: discount,
        shipping_fee: shippingFee,
        final_total: total,
        payment_method: paymentMethod,
        payment_details: {
          customer_info: customerInfo,
          shipping_info: shippingInfo,
          ...(paymentMethod === 'bitcoin' && {
            bitcoin_address: bitcoinAddress,
            bitcoin_amount: bitcoinAmount,
            transaction_id: txid
          })
        },
        status: 'pending'
      };

      console.log('Creating order with data:', orderData);
      const order = await createOrder(orderData);
      
      console.log('Order created successfully:', order);

      // Send order to Formspree
      if (paymentMethod === 'bitcoin' && txid.trim()) {
        try {
          const formData = new FormData();
          formData.append('order_id', order.id);
          formData.append('user_email', user.email || '');
          formData.append('payment_method', 'Bitcoin');
          formData.append('total_amount', total.toString());
          formData.append('transaction_id', txid);
          formData.append('bitcoin_address', bitcoinAddress);
          formData.append('order_details', JSON.stringify(cartItems));
          formData.append('shipping_info', JSON.stringify(shippingInfo));

          await fetch('https://formspree.io/f/mqaqvlye', {
            method: 'POST',
            body: formData
          });

          console.log('Order sent to Formspree successfully');
        } catch (formspreeError) {
          console.error('Error sending to Formspree:', formspreeError);
        }
      }

      // Update user spending
      await updateUserSpending(user.id, total);

      toast({
        title: "Order Placed Successfully!",
        description: `Order #${order.id.slice(0, 8)} has been submitted. You will receive confirmation shortly.`,
      });

      onPaymentSuccess();
      onClose();
    } catch (error: any) {
      console.error('Payment completion error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentTimeout = () => {
    console.log('Payment timeout reached');
    toast({
      title: "Payment Expired",
      description: "The payment window has expired. Please try again.",
      variant: "destructive"
    });
    setStep('payment');
    setPaymentMethod(null);
    setBitcoinAddress('');
    setBitcoinAmount(0);
    setTxid('');
  };

  const handleShippingSubmit = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingFormSubmit = () => {
    setCustomerInfo({
      fullName: shippingInfo.fullName,
      email: shippingInfo.email,
      telegram: ''
    });
    setStep('payment');
  };

  const handleTelegramComplete = (telegramInfo: { telegram: string }) => {
    console.log('Telegram info completed:', telegramInfo);
    setCustomerInfo(prev => ({
      ...prev,
      telegram: telegramInfo.telegram
    }));
    setTelegramModalOpen(false);
    handlePaymentComplete();
  };

  const handleClose = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setStep('shipping');
    setPaymentMethod(null);
    setBitcoinAddress('');
    setBitcoinAmount(0);
    setTxid('');
    setPaymentTimer(30 * 60);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {step === 'shipping' && 'Shipping Information'}
              {step === 'payment' && 'Choose Payment Method'}
              {step === 'bitcoin' && 'Bitcoin Payment'}
              {step === 'processing' && 'Processing Payment'}
            </DialogTitle>
            <DialogDescription>
              {step === 'shipping' && 'Please provide your shipping details'}
              {step === 'payment' && 'Select your preferred payment method'}
              {step === 'bitcoin' && 'Complete your Bitcoin payment'}
              {step === 'processing' && 'Please wait while we process your order'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {step === 'shipping' && (
                <div className="space-y-6">
                  <ShippingForm 
                    formData={shippingInfo}
                    onInputChange={handleShippingSubmit}
                    language="en"
                  />
                  <Button onClick={handleShippingFormSubmit} className="w-full py-3 text-lg">
                    Continue to Payment →
                  </Button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <PaymentMethodInfo paymentMethod="telegram" />
                    <PaymentMethodInfo paymentMethod="bitcoin" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => handlePaymentMethodSelect('telegram')}
                      className="py-6 text-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-3"
                      size="lg"
                    >
                      <span className="text-2xl">💬</span>
                      <span>Pay with Telegram</span>
                    </Button>
                    <Button 
                      onClick={() => handlePaymentMethodSelect('bitcoin')}
                      className="py-6 text-lg bg-orange-600 hover:bg-orange-700 flex items-center justify-center space-x-3"
                      size="lg"
                    >
                      <span className="text-2xl">₿</span>
                      <span>Pay with Bitcoin</span>
                    </Button>
                  </div>
                </div>
              )}

              {step === 'bitcoin' && (
                <div className="space-y-6">
                  <PaymentTimer 
                    onExpired={handlePaymentTimeout}
                    language="en"
                  />
                  
                  <BitcoinTutorial language="en" />
                  
                  <BitcoinPaymentDetails 
                    amount={total}
                    walletAddress={bitcoinAddress}
                    txid={txid}
                    onTxidChange={setTxid}
                    language="en"
                  />
                  
                  <Button 
                    onClick={handlePaymentComplete}
                    className="w-full py-4 text-lg bg-green-600 hover:bg-green-700"
                    disabled={processing || !txid.trim()}
                  >
                    {processing ? 'Processing...' : 'Complete Bitcoin Payment'}
                  </Button>
                </div>
              )}

              {step === 'processing' && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
                  <h3 className="text-2xl font-semibold mb-4">Processing your payment...</h3>
                  <p className="text-gray-600">Please don't close this window while we process your order.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <OrderSummary 
                  cartItems={cartItems.map(item => ({
                    product: {
                      id: item.id,
                      name: item.name,
                      price: item.price
                    },
                    quantity: item.quantity
                  }))}
                  orderTotal={subtotal}
                  discount={discount}
                  shippingFee={shippingFee}
                  finalTotal={total}
                />
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6 border-t">
            {step === 'payment' && (
              <Button variant="outline" onClick={() => setStep('shipping')} className="px-6">
                ← Back to Shipping
              </Button>
            )}

            {step === 'bitcoin' && (
              <Button variant="outline" onClick={() => setStep('payment')} className="px-6">
                ← Back to Payment
              </Button>
            )}
            
            <div className="flex-1"></div>
          </div>
        </DialogContent>
      </Dialog>

      <TelegramPaymentModal
        isOpen={telegramModalOpen}
        onClose={() => setTelegramModalOpen(false)}
        language="en"
        orderTotal={total}
        onComplete={handleTelegramComplete}
      />
    </>
  );
};

export default PaymentModal;
