import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';
import { createPendingPurchase } from '@/lib/purchase-tracking';

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
  cart,
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
        // For Telegram, just redirect to the group
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

  const renderPaymentMethodInfo = () => {
    switch (paymentMethod) {
      case 'telegram':
        return (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💬 Telegram Ordering</h4>
            <p className="text-blue-700 text-sm mb-3">
              Order through our Telegram group for the easiest experience:
            </p>
            <ul className="text-blue-700 text-sm space-y-1 mb-3">
              <li>✅ Easy order tracking</li>
              <li>✅ Anonymous ordering</li>
              <li>✅ Direct communication</li>
              <li>✅ Fast support</li>
            </ul>
            <p className="text-blue-600 text-xs">
              Click "Complete Order" to join our Telegram group and place your order there.
            </p>
          </div>
        );
      case 'email':
        return (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📧 Email Payment</h4>
            <p className="text-green-700 text-sm mb-2">
              We'll send you payment instructions via email after you submit your order.
            </p>
            <p className="text-green-600 text-xs">
              You'll receive payment details and instructions in your email inbox.
            </p>
          </div>
        );
      case 'bitcoin':
        return (
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">₿ Bitcoin Payment</h4>
            <p className="text-orange-700 text-sm mb-2">
              We'll send you Bitcoin wallet address and payment instructions via email.
            </p>
            <p className="text-orange-600 text-xs">
              After payment, please provide the transaction ID (TXID) for verification.
            </p>
          </div>
        );
      case 'solana':
        return (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">◎ Solana Payment</h4>
            <p className="text-purple-700 text-sm mb-2">
              We'll send you Solana wallet address and payment instructions via email.
            </p>
            <p className="text-purple-600 text-xs">
              After payment, please provide the transaction ID (TXID) for verification.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
          
          {/* Items */}
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>{item.product.name} x{item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-1">
              <span>Total:</span>
              <span className="text-green-600">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
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

          {/* Payment Method Information */}
          {renderPaymentMethodInfo()}

          {/* Shipping Information - Only for non-Telegram payments */}
          {paymentMethod !== 'telegram' && (
            <>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-4">Shipping Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={customerInfo.fullName}
                      onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      required
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                      required
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={customerInfo.country}
                      onChange={(e) => setCustomerInfo({...customerInfo, country: e.target.value})}
                      required
                      placeholder="Country"
                    />
                  </div>
                </div>
              </div>

              {/* Payment-specific fields */}
              {(paymentMethod === 'bitcoin' || paymentMethod === 'solana') && (
                <div>
                  <Label htmlFor="txid">Transaction ID (TXID) *</Label>
                  <Input
                    id="txid"
                    value={customerInfo.txid}
                    onChange={(e) => setCustomerInfo({...customerInfo, txid: e.target.value})}
                    required
                    placeholder="Enter transaction ID after payment"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    You can submit this after receiving payment instructions
                  </p>
                </div>
              )}
            </>
          )}

          {/* Submit Button */}
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
