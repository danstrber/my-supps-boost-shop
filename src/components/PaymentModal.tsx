
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Bitcoin, CreditCard, MessageCircle, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  cart: Record<string, number>;
  userProfile: UserProfile | null;
  cartItems: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
      category: string;
    };
    quantity: number;
  }>;
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
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'bitcoin' | 'telegram'>('paypal');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: userProfile?.name || '',
    email: userProfile?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  const [processing, setProcessing] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const bitcoinAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
  const paypalLink = "https://www.paypal.me/mkbooster";
  const telegramContact = "@DANSTRBER";

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the address manually",
        variant: "destructive"
      });
    }
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'address', 'city', 'postalCode', 'country'];
    for (const field of required) {
      if (!customerInfo[field as keyof typeof customerInfo]) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return false;
      }
    }
    
    if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const createOrder = async () => {
    if (!validateForm()) return;
    
    setProcessing(true);
    
    try {
      const orderData = {
        user_id: userProfile?.id,
        items: {
          cart: cart,
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
          payment_method: paymentMethod,
          ...(paymentMethod === 'bitcoin' && { bitcoin_address: bitcoinAddress }),
          ...(paymentMethod === 'paypal' && { paypal_link: paypalLink }),
          ...(paymentMethod === 'telegram' && { telegram_contact: telegramContact })
        },
        status: 'pending'
      };

      console.log('Creating order:', orderData);

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select('id')
        .single();

      if (error) {
        console.error('Order creation error:', error);
        throw error;
      }

      setOrderId(data.id);
      setOrderCreated(true);

      // Send order confirmation email and Telegram notification
      await sendOrderNotifications(data.id, orderData);

      console.log('Order created successfully:', data.id);
      
      toast({
        title: "Order Created!",
        description: `Order #${data.id.slice(0, 8)} has been created successfully.`,
      });

    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to create order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const sendOrderNotifications = async (orderId: string, orderData: any) => {
    try {
      // Send email notification
      await supabase.functions.invoke('send-order-email', {
        body: { orderId, orderData }
      });

      // Send Telegram notification
      await supabase.functions.invoke('send-telegram-notification', {
        body: { orderId, orderData }
      });
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  };

  const renderPaymentInstructions = () => {
    if (!orderCreated) return null;

    switch (paymentMethod) {
      case 'paypal':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">PayPal Payment Instructions</h4>
            <p className="text-blue-700 mb-3">
              Send ${finalTotal.toFixed(2)} to our PayPal account:
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Input value={paypalLink} readOnly className="flex-1" />
              <Button onClick={() => copyToClipboard(paypalLink)} size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button 
              onClick={() => window.open(paypalLink, '_blank')} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay with PayPal
            </Button>
            <p className="text-xs text-blue-600 mt-2">
              Please include order #{orderId?.slice(0, 8)} in the payment note.
            </p>
          </div>
        );

      case 'bitcoin':
        return (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2">Bitcoin Payment Instructions</h4>
            <p className="text-orange-700 mb-3">
              Send the equivalent of ${finalTotal.toFixed(2)} in Bitcoin to:
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Input value={bitcoinAddress} readOnly className="flex-1 font-mono text-sm" />
              <Button onClick={() => copyToClipboard(bitcoinAddress)} size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-orange-600">
              After sending, please contact us via Telegram with your transaction ID and order #{orderId?.slice(0, 8)}.
            </p>
          </div>
        );

      case 'telegram':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Telegram Payment Instructions</h4>
            <p className="text-green-700 mb-3">
              Contact us on Telegram to arrange payment for ${finalTotal.toFixed(2)}:
            </p>
            <Button 
              onClick={() => window.open(`https://t.me/DANSTRBER`, '_blank')} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact on Telegram
            </Button>
            <p className="text-xs text-green-600 mt-2">
              Please mention order #{orderId?.slice(0, 8)} when contacting us.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (orderCreated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600">Order Created Successfully!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono">#{orderId?.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">${finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="capitalize">{paymentMethod}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <h5 className="font-medium mb-2">Items Ordered:</h5>
                <div className="space-y-1 text-xs">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {renderPaymentInstructions()}

            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Order Summary</h4>
            <div className="text-sm space-y-1">
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
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-1 flex justify-between font-semibold">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <Label className="text-sm font-medium">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    PayPal
                  </div>
                </SelectItem>
                <SelectItem value="bitcoin">
                  <div className="flex items-center">
                    <Bitcoin className="mr-2 h-4 w-4" />
                    Bitcoin (BTC)
                  </div>
                </SelectItem>
                <SelectItem value="telegram">
                  <div className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Telegram Pay
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Information Form */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shipping Information</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={customerInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={customerInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={customerInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={customerInfo.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={customerInfo.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={createOrder} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={processing}
          >
            {processing ? 'Creating Order...' : `Create Order - $${finalTotal.toFixed(2)}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
