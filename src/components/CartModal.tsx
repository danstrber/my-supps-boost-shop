
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/products';
import { translations } from '@/lib/translations';
import { UserProfile } from '@/lib/auth';
import PaymentModal from './PaymentModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  products: Product[];
  onUpdateCart: (productId: string, quantity: number) => void;
  userDiscount: number;
  language: 'en' | 'es';
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
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
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const t = translations[language];

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    return product ? { product, quantity } : null;
  }).filter(Boolean) as { product: Product; quantity: number }[];

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const discountAmount = (subtotal * userDiscount) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const shippingFee = subtotalAfterDiscount >= 100 ? 0 : 10;
  const finalTotal = subtotalAfterDiscount + shippingFee;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onUpdateCart(productId, 0);
    } else {
      onUpdateCart(productId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // This should trigger auth modal in parent component
      return;
    }
    setPaymentModalOpen(true);
  };

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t.cart}
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add some products to get started!</p>
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t.cart} ({cartItems.length} items)
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">${product.price.toFixed(2)} each</p>
                    {product.labTested && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        🔬 Lab Tested
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(product.id, quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                      className="w-16 text-center h-8"
                    />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(product.id, quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onUpdateCart(product.id, 0)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-gray-900">Order Summary</h4>
                
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {userDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({userDiscount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {subtotalAfterDiscount < 100 && (
                  <p className="text-xs text-gray-600">
                    Add ${(100 - subtotalAfterDiscount).toFixed(2)} more for free shipping!
                  </p>
                )}
                
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-2">
              <Button 
                onClick={handleProceedToCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
              >
                {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              </Button>
              
              {!isAuthenticated && (
                <p className="text-xs text-center text-gray-600">
                  You need to sign in to complete your purchase
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        orderTotal={subtotal}
        discount={discountAmount}
        shippingFee={shippingFee}
        finalTotal={finalTotal}
        cart={cart}
        userProfile={userProfile}
      />
    </>
  );
};

export default CartModal;
