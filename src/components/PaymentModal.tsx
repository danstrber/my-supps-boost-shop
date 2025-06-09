
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';
import { createPendingPurchase } from '@/lib/purchase-tracking';
import OrderSummary from './payment/OrderSummary';
import PaymentMethodInfo from './payment/PaymentMethodInfo';
import ShippingForm from './payment/ShippingForm';

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
}

const PaymentModal = ({
  isOpen,
  onClose,
  orderTotal,
  discount,
  shippingFee,
  finalTotal,
  userProfile,
  cartItems
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'telegram' | 'bitcoin' | 'solana' | 'email'>('telegram');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: userProfile?.email || '',
    address: '',
    city: '',
    country: '',
    txid: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === 'telegram') {
        window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
        toast({
          title: "Redirected to Telegram",
          description: "Complete your order in our Telegram group for easy tracking and anonymous ordering.",
        });
        onClose();
        return;
      }

      // Validate required fields for other payment methods
      if (!customerInfo.fullName || !customerInfo.email || !customerInfo.address || !customerInfo.city || !customerInfo.country) {
        toast({
          title: "Missing Information",
          description: "Please fill in all shipping information fields.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      if ((paymentMethod === 'bitcoin' || paymentMethod === 'solana') && !customerInfo.txid) {
        toast({
          title: "Missing Transaction ID",
          description: "Please enter the transaction ID (TXID) for verification.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Create order in database
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
          ...((['bitcoin', 'solana'].includes(paymentMethod)) && { txid: customerInfo.txid })
        },
        status: 'pending'
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      console.log('Order created:', order);

      // Create pending purchase (NOT saved to user spending yet)
      createPendingPurchase(order.id, {
        userId: userProfile?.auth_id || '',
        amount: finalTotal,
        items: cartItems,
        referralCode: userProfile?.referred_by || undefined
      });

      // Send order confirmation email
      try {
        const { error: emailError } = await supabase.functions.invoke('send-order-email', {
          body: {
            orderId: order.id,
            orderData,
            customerEmail: customerInfo.email
          }
        });

        if (emailError) {
          console.error('Email sending failed:', emailError);
        } else {
          console.log('Order confirmation email sent');
        }
      } catch (emailErr) {
        console.error('Email function error:', emailErr);
      }

      toast({
        title: "Order Placed Successfully!",
        description: `Your order has been placed. Purchase will be tracked once confirmed by admin.`,
      });

      onClose();
      
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast({
        title: "Order Failed",
        description: error.message || "There was an error processing your order. Please try again.",
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
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>

        <OrderSummary
          cartItems={cartItems}
          orderTotal={orderTotal}
          discount={discount}
          shippingFee={shippingFee}
          finalTotal={finalTotal}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="telegram">💬 Telegram (Recommended)</SelectItem>
                <SelectItem value="email">📧 Email Instructions</SelectItem>
                <SelectItem value="bitcoin">₿ Bitcoin</SelectItem>
                <SelectItem value="solana">◎ Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <PaymentMethodInfo paymentMethod={paymentMethod} />

          <ShippingForm
            customerInfo={customerInfo}
            onInfoChange={setCustomerInfo}
            paymentMethod={paymentMethod}
          />

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
            disabled={loading}
          >
            {loading ? 'Processing...' : 
             paymentMethod === 'telegram' ? 'Join Telegram Group' : 'Complete Order'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
