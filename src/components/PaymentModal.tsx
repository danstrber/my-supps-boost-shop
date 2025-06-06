
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Bitcoin, CreditCard, MessageCircle, Copy, Check, Banknote } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'bitcoin' | 'solana' | 'telegram'>('telegram');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: userProfile?.name || '',
    email: userProfile?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    paypalName: '',
    txid: ''
  });
  const [processing, setProcessing] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const bitcoinAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
  const solanaAddress = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";
  const paypalLink = "https://www.paypal.me/mkbooster";
  const telegramServer = "https://t.me/+fDDZObF0zjI2M2Y0";

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

    // Validate payment-specific fields
    if ((paymentMethod === 'paypal') && !customerInfo.paypalName) {
      toast({
        title: "Missing PayPal Name",
        description: "Please enter your PayPal account name",
        variant: "destructive"
      });
      return false;
    }

    if ((paymentMethod === 'bitcoin' || paymentMethod === 'solana') && !customerInfo.txid) {
      toast({
        title: "Missing Transaction ID",
        description: "Please enter your transaction ID (TXID)",
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
          ...(paymentMethod === 'bitcoin' && { 
            bitcoin_address: bitcoinAddress,
            txid: customerInfo.txid 
          }),
          ...(paymentMethod === 'solana' && { 
            solana_address: solanaAddress,
            txid: customerInfo.txid 
          }),
          ...(paymentMethod === 'paypal' && { 
            paypal_link: paypalLink,
            paypal_name: customerInfo.paypalName 
          }),
          ...(paymentMethod === 'telegram' && { telegram_server: telegramServer })
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

      // Send notifications only for non-telegram orders
      if (paymentMethod !== 'telegram') {
        await sendOrderNotifications(data.id, orderData);
      }

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
      await supabase.functions.invoke('send-order-email', {
        body: { orderId, orderData }
      });

      await supabase.functions.invoke('send-telegram-notification', {
        body: { orderId, orderData }
      });
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  };

  const renderPaymentSpecificFields = () => {
    if (orderCreated) return null;

    switch (paymentMethod) {
      case 'paypal':
        return (
          <div>
            <Label htmlFor="paypalName">PayPal Account Name *</Label>
            <Input
              id="paypalName"
              value={customerInfo.paypalName}
              onChange={(e) => handleInputChange('paypalName', e.target.value)}
              placeholder="Enter your PayPal account name"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This helps us confirm your payment
            </p>
          </div>
        );

      case 'bitcoin':
      case 'solana':
        return (
          <div>
            <Label htmlFor="txid">Transaction ID (TXID) *</Label>
            <Input
              id="txid"
              value={customerInfo.txid}
              onChange={(e) => handleInputChange('txid', e.target.value)}
              placeholder="Enter your transaction ID"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Required to verify your {paymentMethod} payment
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPaymentInstructions = () => {
    if (!orderCreated) return null;

    switch (paymentMethod) {
      case 'telegram':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold text-green-800 mb-4">🚀 Telegram Payment Instructions</h4>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-green-100">
                <h5 className="font-medium text-green-700 mb-2">Why Choose Telegram?</h5>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>✅ Faster order processing</li>
                  <li>✅ Real-time order tracking</li>
                  <li>✅ Anonymous and secure</li>
                  <li>✅ Direct communication with our team</li>
                  <li>✅ Instant support and updates</li>
                </ul>
              </div>
              
              <p className="text-green-700 font-medium">
                Amount to pay: ${finalTotal.toFixed(2)}
              </p>
              
              <Button 
                onClick={() => window.open(telegramServer, '_blank')} 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-4"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Our Telegram Server
              </Button>
              
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                <p className="text-yellow-800 text-sm">
                  <strong>Next Steps:</strong> Join our server and mention order #{orderId?.slice(0, 8)} 
                  to complete your purchase. Our team will guide you through the payment process.
                </p>
              </div>
            </div>
          </div>
        );

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
              Your PayPal name "{customerInfo.paypalName}" and order #{orderId?.slice(0, 8)} have been recorded.
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
              Your TXID "{customerInfo.txid}" and order #{orderId?.slice(0, 8)} have been recorded for verification.
            </p>
          </div>
        );

      case 'solana':
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Solana Payment Instructions</h4>
            <p className="text-purple-700 mb-3">
              Send the equivalent of ${finalTotal.toFixed(2)} in SOL to:
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Input value={solanaAddress} readOnly className="flex-1 font-mono text-sm" />
              <Button onClick={() => copyToClipboard(solanaAddress)} size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-purple-600">
              Your TXID "{customerInfo.txid}" and order #{orderId?.slice(0, 8)} have been recorded for verification.
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
                <SelectItem value="telegram">
                  <div className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium">Telegram</div>
                      <div className="text-xs text-gray-500">Recommended - Fast & Anonymous</div>
                    </div>
                  </div>
                </SelectItem>
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
                <SelectItem value="solana">
                  <div className="flex items-center">
                    <Banknote className="mr-2 h-4 w-4" />
                    Solana (SOL)
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

            {/* Payment-specific fields */}
            {renderPaymentSpecificFields()}
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
