
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
    country: 'US',
    phoneNumber: '',
    postalCode: '',
    txid: ''
  });
  const [loading, setLoading] = useState(false);
  const [showBitcoinDetails, setShowBitcoinDetails] = useState(false);
  const { toast } = useToast();
  const t = translations[language];

  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const sendFormspreeEmail = async (orderData: any) => {
    try {
      const formData = {
        _subject: `NEW ORDER: ${customerInfo.fullName} - $${finalTotal.toFixed(2)}`,
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        customerAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.country}`,
        customerPhone: customerInfo.phoneNumber,
        customerPostalCode: customerInfo.postalCode,
        paymentMethod: paymentMethod,
        orderItems: cartItems.map(item => 
          `${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
        ).join('\n'),
        originalTotal: `$${orderTotal.toFixed(2)}`,
        discountAmount: discount > 0 ? `-$${discount.toFixed(2)}` : 'None',
        shippingFee: shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`,
        finalTotal: `$${finalTotal.toFixed(2)}`,
        walletAddress: walletAddress,
        txid: customerInfo.txid || 'N/A'
      };

      const response = await fetch('https://formspree.io/f/mqaqvlye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      console.log('Order notification sent successfully via Formspree');
    } catch (error) {
      console.error('Failed to send Formspree email:', error);
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'telegram') {
      handleTelegramRedirect();
      return;
    }

    if (paymentMethod === 'bitcoin' && !showBitcoinDetails) {
      if (!customerInfo.fullName || !customerInfo.email || !customerInfo.address || !customerInfo.city || !customerInfo.country || !customerInfo.phoneNumber || !customerInfo.postalCode) {
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

    // Removed TXID validation - can complete order without TXID
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
          customer_info: customerInfo,
          btc_amount_sent: finalTotal,
          wallet_address: walletAddress
        },
        status: 'pending'
      };

      console.log('Creating order with user_id:', userProfile?.auth_id);

      const { data: order, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Supabase order creation error:', error);
        throw error;
      }

      createPendingPurchase(order.id, {
        userId: userProfile?.auth_id || '',
        amount: finalTotal,
        items: cartItems,
        referralCode: userProfile?.referred_by || undefined
      });

      await sendFormspreeEmail(orderData);

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

  const handleReferralClick = () => {
    window.open('/referral-program', '_blank');
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

          <PaymentMethodInfo paymentMethod={paymentMethod} />

          {paymentMethod === 'bitcoin' && !showBitcoinDetails && (
            <BitcoinTutorial language={language} />
          )}

          {paymentMethod === 'bitcoin' && (
            <ShippingForm
              customerInfo={customerInfo}
              onInfoChange={setCustomerInfo}
              paymentMethod={paymentMethod}
              language={language}
            />
          )}

          {showBitcoinDetails && paymentMethod === 'bitcoin' && (
            <BitcoinPaymentDetails
              amount={finalTotal}
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
