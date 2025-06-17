
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
import { Product } from '@/lib/products';
import { UserProfile } from '@/lib/auth';
import PaymentModal from './PaymentModal';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';

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
}

const CartModal = ({
  isOpen,
  onClose,
  cart = {},
  products = [],
  onUpdateCart,
  userDiscount,
  isAuthenticated,
  userProfile,
  onPageChange
}: CartModalProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Safety check for cart and products
  if (!cart || !products) {
    return null;
  }

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;
    return { product, quantity };
  }).filter(Boolean) as { product: Product; quantity: number }[];

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md" aria-describedby="empty-cart-description">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
            </DialogTitle>
            <DialogDescription id="empty-cart-description">
              Your shopping cart is currently empty.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Calculate totals - apply discount to subtotal, not individual items
  const subtotal = cartItems.reduce((total, { product, quantity }) => total + (product.price * quantity), 0);
  
  // Apply discount only if user is authenticated and has a discount
  const actualDiscount = isAuthenticated && userDiscount > 0 ? userDiscount : 0;
  
  // Cap discount based on order value
  const cappedDiscount = subtotal >= 150 ? actualDiscount : Math.min(actualDiscount, 25);
  
  // Apply discount to subtotal
  const discountAmount = subtotal * (cappedDiscount / 100);
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  // Updated shipping fee to $7.50, free shipping at $100
  const freeShippingThreshold = 100;
  const shippingFee = subtotalAfterDiscount >= freeShippingThreshold ? 0 : 7.5;
  const finalTotal = subtotalAfterDiscount + shippingFee;

  console.log('Cart calculation:', {
    subtotal,
    userDiscount,
    actualDiscount,
    cappedDiscount,
    discountAmount,
    subtotalAfterDiscount,
    shippingFee,
    finalTotal,
    isAuthenticated
  });

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please log in to checkout');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  // Convert cart items to the format expected by PaymentModal
  const paymentCartItems = cartItems.map(({ product, quantity }) => ({
    product: {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.categories[0] || 'general'
    },
    quantity
  }));

  const handleReferralClick = () => {
    if (onPageChange) {
      onPageChange('account');
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="cart-modal-description">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription id="cart-modal-description">
              Review your items and proceed to checkout when ready.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Referral Discount Notice */}
            <div 
              className="bg-green-50 border border-green-200 p-3 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors"
              onClick={handleReferralClick}
            >
              <p className="text-green-700 text-sm font-medium">
                Want cheaper? Get 10% off by referring a new user!
              </p>
            </div>

            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onUpdateCart={onUpdateCart}
                userDiscount={0} // Don't show discount on individual items
              />
            ))}

            <CartSummary
              subtotal={subtotal}
              userDiscount={cappedDiscount}
              discountAmount={discountAmount}
              subtotalAfterDiscount={subtotalAfterDiscount}
              shippingFee={shippingFee}
              finalTotal={finalTotal}
              freeShippingThreshold={freeShippingThreshold}
            />

            {/* Discount limitation notice */}
            {actualDiscount > 25 && subtotal < 150 && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center">
                <p className="text-yellow-700 text-sm">
                  Discounts over 25% are limited to orders $150+. Current discount: {cappedDiscount}%
                </p>
              </div>
            )}

            <Button 
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
              disabled={!isAuthenticated}
            >
              {!isAuthenticated 
                ? 'Login to Checkout'
                : 'Proceed to Checkout'
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderTotal={subtotal}
        discount={discountAmount}
        shippingFee={shippingFee}
        finalTotal={finalTotal}
        cart={cart}
        userProfile={userProfile}
        cartItems={paymentCartItems}
        language="en"
      />
    </>
  );
};

export default CartModal;
