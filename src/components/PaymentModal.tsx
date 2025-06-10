
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';
import { createPendingPurchase } from '@/lib/purchase-tracking';
import { translations } from '@/lib/translations';
import OrderSummary from './payment/OrderSummary';
import PaymentMethodInfo from './payment/PaymentMethodInfo';
import ShippingForm from './payment/ShippingForm';
import BitcoinTutorial from './payment/BitcoinTutorial';
import BitcoinPaymentDetails from './payment/BitcoinPaymentDetails';

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
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: userProfile?.email || '',
    address: '',
    city: '',
    country: '',
    txid: ''
  });
  const [loading, setLoading] = useState(false);
  const [showBitcoinDetails, setShowBitcoinDetails] = useState(false);
  const { toast } = useToast();
  const t = translations[language];

  // Round up cart total for system calculations but keep original for BTC payment
  const systemTotal = Math.ceil(orderTotal);
  const systemFinalTotal = systemTotal + shippingFee;
  const btcPaymentAmount = finalTotal; // Keep original .99 pricing for BTC

  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'bitcoin' && !showBitcoinDetails) {
      // Validate shipping info first
      if (!customerInfo.fullName || !customerInfo.email || !customerInfo.address || !customerInfo.city || !customerInfo.country) {
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

    setLoading(true);

    try {
      if (paymentMethod === 'telegram') {
        window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
        toast({
          title: t.redirectedTelegram,
          description: t.completeTelegramOrder,
        });
        onClose();
        return;
      }

      // For Bitcoin payment, validate TXID
      if (!customerInfo.txid) {
        toast({
          title: t.missingTxid,
          description: t.enterTxid,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Create order in database with system total (rounded up)
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
        original_total: systemTotal, // Use rounded up total for system
        discount_amount: discount,
        shipping_fee: shippingFee,
        final_total: systemFinalTotal, // Use system total for tracking
        payment_method: paymentMethod,
        payment_details: {
          customer_info: customerInfo,
          btc_amount_sent: btcPaymentAmount, // Store actual BTC amount
          wallet_address: walletAddress,
          txid: customerInfo.txid
        },
        status: 'pending'
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      // Create pending purchase with system total for referral calculations
      createPendingPurchase(order.id, {
        userId: userProfile?.auth_id || '',
        amount: systemFinalTotal, // Use system total for referral calculations
        items: cartItems,
        referralCode: userProfile?.referred_by || undefined
      });

      // Send order confirmation email
      try {
        const { error: emailError } = await supabase.functions.invoke('send-order-email', {
          body: {
            customerEmail: customerInfo.email,
            customerName: customerInfo.fullName,
            adminEmail: 'einarstav4@gmail.com',
            items: cartItems.map(item => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity
            })),
            originalTotal: orderTotal,
            discountAmount: discount,
            shippingFee: shippingFee,
            finalTotal: btcPaymentAmount, // Use actual BTC amount in email
            systemTotal: systemFinalTotal, // Include system total for reference
            paymentMethod: paymentMethod,
            paymentDetails: customerInfo,
            orderId: order.id,
            walletAddress: walletAddress,
            txid: customerInfo.txid
          }
        });

        if (emailError) {
          console.error('Email sending failed:', emailError);
        }
      } catch (emailErr) {
        console.error('Email function error:', emailErr);
      }

      toast({
        title: t.orderPlacedSuccess,
        description: t.orderPlaced,
      });

      onClose();
      
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t.completeYourOrder}
          </DialogTitle>
        </DialogHeader>

        <OrderSummary
          cartItems={cartItems}
          orderTotal={orderTotal}
          discount={discount}
          shippingFee={shippingFee}
          finalTotal={finalTotal}
          language={language}
        />

        {/* Referral tip */}
        <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
          <p className="text-green-700 text-sm font-medium">
            {t.wantCheaper}
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <Label htmlFor="paymentMethod">
              {t.paymentMethod}
            </Label>
            <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telegram">💬 Telegram ({t.recommended})</SelectItem>
                <SelectItem value="bitcoin">₿ Bitcoin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <PaymentMethodInfo paymentMethod={paymentMethod} language={language} />

          {paymentMethod === 'bitcoin' && !showBitcoinDetails && (
            <BitcoinTutorial language={language} />
          )}

          <ShippingForm
            customerInfo={customerInfo}
            onInfoChange={setCustomerInfo}
            paymentMethod={paymentMethod}
            language={language}
          />

          {showBitcoinDetails && paymentMethod === 'bitcoin' && (
            <BitcoinPaymentDetails
              amount={btcPaymentAmount}
              walletAddress={walletAddress}
              customerInfo={customerInfo}
              onInfoChange={setCustomerInfo}
              language={language}
            />
          )}

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
            disabled={loading}
          >
            {loading ? t.processing : 
             paymentMethod === 'telegram' ? t.joinTelegram : 
             !showBitcoinDetails ? t.continueToPayment :
             t.completeOrder}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
