
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Product } from '@/lib/products';
import { UserProfile } from '@/lib/auth';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import PaymentModal from '@/components/PaymentModal';
import { getShippingCost, isUSCountry } from '@/lib/shipping';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  products: Product[];
  onUpdateCart: (productId: string, quantity: number) => void;
  userDiscount: number;
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  onPageChange?: (page: string) => void;
  onOrderSuccess: () => void;
}

const CartModal = ({
  isOpen,
  onClose,
  cart,
  products,
  onUpdateCart,
  userDiscount,
  isAuthenticated,
  userProfile,
  onPageChange,
  onOrderSuccess
}: CartModalProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const cartItems = Object.entries(cart)
    .filter(([_, quantity]) => quantity > 0)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return product ? { product, quantity } : null;
    })
    .filter(Boolean) as Array<{ product: Product; quantity: number }>;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = (subtotal * userDiscount) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  // Use the shipping utility to calculate shipping cost
  const userCountry = userProfile?.country || 'USA';
  const shippingFee = getShippingCost(userCountry, subtotalAfterDiscount);
  
  const finalTotal = subtotalAfterDiscount + shippingFee;

  // Calculate how much more is needed for free shipping
  const isUS = isUSCountry(userCountry);
  const freeShippingThreshold = isUS ? 100 : 125;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotalAfterDiscount);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onPageChange?.('login');
      onClose();
      return;
    }

    if (cartItems.length === 0) return;

    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const handleOrderSuccessWrapper = () => {
    setIsPaymentModalOpen(false);
    onClose();
    onOrderSuccess();
  };

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Your Cart
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Your shopping cart is currently empty.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Review your items before checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-60 overflow-y-auto">
            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onUpdateCart={onUpdateCart}
                userDiscount={userDiscount}
              />
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {userDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({userDiscount.toFixed(1)}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            {amountNeededForFreeShipping > 0 && (
              <div className="text-blue-600 text-sm text-center p-2 bg-blue-50 rounded">
                Add ${amountNeededForFreeShipping.toFixed(2)} more for free shipping!
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span className="text-green-600">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
          </Button>
        </DialogContent>
      </Dialog>

      {isPaymentModalOpen && userProfile && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handlePaymentModalClose}
          cart={cart}
          products={products}
          userDiscount={userDiscount}
          userProfile={userProfile}
          onOrderSuccess={handleOrderSuccessWrapper}
        />
      )}
    </>
  );
};

export default CartModal;
