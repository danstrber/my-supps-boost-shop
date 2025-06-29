
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Product } from '@/lib/products';
import { UserProfile } from '@/lib/auth';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import PaymentModal from '@/components/PaymentModal';

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
  onOrderSuccess: (orderDetails: any) => void;
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
  
  // Calculate shipping based on user's country
  const isUSA = userProfile?.country === 'USA' || userProfile?.country === 'United States';
  const freeShippingThreshold = isUSA ? 100 : 150;
  const shippingFee = subtotalAfterDiscount >= freeShippingThreshold 
    ? 0 
    : (isUSA ? 7.50 : 17.50);
  
  const finalTotal = subtotalAfterDiscount + shippingFee;

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

  const handleOrderSuccessWrapper = (orderDetails: any) => {
    setIsPaymentModalOpen(false);
    onClose();
    onOrderSuccess(orderDetails);
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
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
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

          <CartSummary
            subtotal={subtotal}
            userDiscount={userDiscount}
            discountAmount={discountAmount}
            subtotalAfterDiscount={subtotalAfterDiscount}
            shippingFee={shippingFee}
            finalTotal={finalTotal}
            freeShippingThreshold={freeShippingThreshold}
          />

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
