
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CartItem extends Product {
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  products: Product[];
  onUpdateCart: (productId: string, quantity: number) => void;
  userDiscount: number;
  language: 'en' | 'es';
  isAuthenticated: boolean;
  userProfile: any;
}

const CartModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  products, 
  onUpdateCart, 
  userDiscount, 
  language,
  isAuthenticated,
  userProfile
}: CartModalProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean) as CartItem[];

  const originalTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (originalTotal * userDiscount) / 100;
  const shippingFee = 10;
  const finalTotal = originalTotal - discountAmount + shippingFee;

  const updateQuantity = (productId: string, change: number) => {
    const currentQuantity = cart[productId] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    onUpdateCart(productId, newQuantity);
  };

  const removeItem = (productId: string) => {
    onUpdateCart(productId, 0);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated || !userProfile) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to place an order",
        variant: "destructive"
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: "Select payment method",
        description: "Please select a payment method to continue",
        variant: "destructive"
      });
      return;
    }

    if ((paymentMethod === 'paypal' || paymentMethod === 'telegram') && !paymentDetails.trim()) {
      toast({
        title: "Payment details required",
        description: `Please enter your ${paymentMethod === 'paypal' ? 'PayPal name' : 'Telegram handle'}`,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        user_id: userProfile.id,
        items: cart,
        original_total: originalTotal,
        discount_amount: discountAmount,
        shipping_fee: shippingFee,
        final_total: finalTotal,
        payment_method: paymentMethod,
        payment_details: paymentMethod === 'bitcoin' ? null : { [paymentMethod]: paymentDetails },
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      // Create email body
      const itemsList = cartItems.map(item => 
        `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const emailBody = `
New Order #${data.id}

Customer: ${userProfile.name}
Email: ${userProfile.email}

Items:
${itemsList}

Original Total: $${originalTotal.toFixed(2)}
Discount (${userDiscount}%): -$${discountAmount.toFixed(2)}
Shipping: $${shippingFee.toFixed(2)}
Final Total: $${finalTotal.toFixed(2)}

Payment Method: ${paymentMethod.toUpperCase()}
${paymentMethod === 'paypal' ? `PayPal Name: ${paymentDetails}` : 
  paymentMethod === 'telegram' ? `Telegram Handle: ${paymentDetails}` :
  paymentMethod === 'bitcoin' ? 'Bitcoin Address: 3Arg9L1pN7P3fN7fNqSYw42SpendingL5q' : ''}

Order placed at: ${new Date().toLocaleString()}
      `.trim();

      // Open email client
      const mailtoUrl = `mailto:christhomaso083@proton.me?subject=New Order #${data.id}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoUrl);

      // Clear cart
      Object.keys(cart).forEach(productId => onUpdateCart(productId, 0));

      toast({
        title: "Order placed!",
        description: "Your order has been submitted. An email has been prepared for the seller.",
      });

      setShowCheckout(false);
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'en' ? 'Shopping Cart' : 'Carrito de Compras'}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-500">
              {language === 'en' ? 'Your cart is empty' : 'Tu carrito está vacío'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{language === 'en' ? 'Shopping Cart' : 'Carrito de Compras'}</DialogTitle>
        </DialogHeader>

        {!showCheckout ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center">{item.quantity}</span>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Subtotal:' : 'Subtotal:'}</span>
                <span>${originalTotal.toFixed(2)}</span>
              </div>
              
              {userDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{language === 'en' ? 'Discount:' : 'Descuento:'} ({userDiscount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Shipping:' : 'Envío:'}</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>{language === 'en' ? 'Total:' : 'Total:'}</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-[#2e7d32] hover:bg-[#1b5e20]"
              disabled={!isAuthenticated}
            >
              {!isAuthenticated 
                ? (language === 'en' ? 'Sign in to checkout' : 'Inicia sesión para comprar')
                : (language === 'en' ? 'Proceed to Checkout' : 'Proceder al Pago')
              }
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {language === 'en' ? 'Payment Method' : 'Método de Pago'}
            </h3>
            
            <div>
              <Label>{language === 'en' ? 'Select Payment Method' : 'Selecciona Método de Pago'}</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Choose payment method' : 'Elige método de pago'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bitcoin">Bitcoin</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === 'paypal' && (
              <div>
                <Label htmlFor="paypal-name">PayPal Name</Label>
                <Input
                  id="paypal-name"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="Enter your PayPal name"
                />
              </div>
            )}

            {paymentMethod === 'telegram' && (
              <div>
                <Label htmlFor="telegram-handle">Telegram Handle</Label>
                <Input
                  id="telegram-handle"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="@yourusername"
                />
              </div>
            )}

            {paymentMethod === 'bitcoin' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Bitcoin Payment Instructions</h4>
                <p className="text-sm mb-2">Send payment to:</p>
                <code className="bg-white px-2 py-1 rounded border block">
                  3Arg9L1pN7P3fN7fNqSYw42SpendingL5q
                </code>
                <p className="text-sm mt-2 text-gray-600">
                  Amount: ${finalTotal.toFixed(2)} USD equivalent in Bitcoin
                </p>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>{language === 'en' ? 'Total:' : 'Total:'}</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowCheckout(false)}
                className="flex-1"
              >
                {language === 'en' ? 'Back' : 'Atrás'}
              </Button>
              
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="flex-1 bg-[#2e7d32] hover:bg-[#1b5e20]"
              >
                {loading ? 'Processing...' : (language === 'en' ? 'Place Order' : 'Realizar Pedido')}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
