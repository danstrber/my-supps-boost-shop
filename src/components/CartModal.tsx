
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
}

const CartModal = ({
  isOpen,
  onClose,
  cart = {},
  products = [],
  onUpdateCart,
  userDiscount,
  isAuthenticated,
  userProfile
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
            </DialogTitle>
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

  // Calculate totals with rounded system amounts for referral system
  const subtotal = cartItems.reduce((total, { product, quantity }) => total + (product.price * quantity), 0);
  const systemSubtotal = Math.ceil(subtotal); // Round up for system calculations
  
  // NEW RULE: Over 25% discounts only on $135+ orders (changed from $150)
  const cappedDiscount = systemSubtotal >= 135 ? userDiscount : Math.min(userDiscount, 25);
  
  const discountAmount = systemSubtotal * (cappedDiscount / 100);
  const subtotalAfterDiscount = systemSubtotal - discountAmount;
  
  // Free shipping threshold: $100 for normal/referred users, $110 for referrers
  const isReferrer = userProfile && userProfile.referred_spending > 0;
  const freeShippingThreshold = isReferrer ? 110 : 100;
  const shippingFee = subtotalAfterDiscount >= freeShippingThreshold ? 0 : 10; // $10 shipping fee
  const finalTotal = subtotalAfterDiscount + shippingFee;

  // For display purposes, show rounded totals but calculate exact totals for BTC
  const displayFinalTotal = Math.ceil(finalTotal);

  // For display and BTC payment, use original amounts
  const displaySubtotal = subtotal;
  const displayDiscountAmount = displaySubtotal * (cappedDiscount / 100);
  const displaySubtotalAfterDiscount = displaySubtotal - displayDiscountAmount;
  const displayShippingFee = displaySubtotalAfterDiscount >= freeShippingThreshold ? 0 : 10;

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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
          </DialogHeader>

          <div className="space-y-4">
            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onUpdateCart={onUpdateCart}
                userDiscount={cappedDiscount}
              />
            ))}

            <CartSummary
              subtotal={displaySubtotal}
              userDiscount={cappedDiscount}
              discountAmount={displayDiscountAmount}
              subtotalAfterDiscount={displaySubtotalAfterDiscount}
              shippingFee={displayShippingFee}
              finalTotal={displayFinalTotal}
              freeShippingThreshold={freeShippingThreshold}
            />

            {/* Discount limitation notice - updated to $135 */}
            {userDiscount > 25 && systemSubtotal < 135 && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center">
                <p className="text-yellow-700 text-sm">
                  Discounts over 25% are limited to orders $135+. Current discount: {cappedDiscount}%
                </p>
              </div>
            )}

            <Button 
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
              disabled={!isAuthenticated}
            >
              {!isAuthenticated ? 'Login to Checkout' : 'Proceed to Checkout'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderTotal={displaySubtotal}
        discount={displayDiscountAmount}
        shippingFee={displayShippingFee}
        finalTotal={displayFinalTotal}
        cart={cart}
        userProfile={userProfile}
        cartItems={paymentCartItems}
      />
    </>
  );
};

export default CartModal;
