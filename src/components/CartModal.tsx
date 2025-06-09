
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/products';
import { translations } from '@/lib/translations';
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

  // Transform cart items to match PaymentModal interface
  const cartItemsForPayment = cartItems.map(item => ({
    product: {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      category: item.product.categories[0] || 'supplements'
    },
    quantity: item.quantity
  }));

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const discountAmount = (subtotal * userDiscount) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  // Updated shipping logic: $12 fee, free shipping thresholds
  const freeShippingThreshold = userProfile && userProfile.referred_spending > 0 ? 101 : 100; // Referrers need $101, others $100
  const shippingFee = subtotalAfterDiscount >= freeShippingThreshold ? 0 : 12; // $12 shipping fee
  const finalTotal = subtotalAfterDiscount + shippingFee;

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
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
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onQuantityChange={onUpdateCart}
                  onRemove={(productId) => onUpdateCart(productId, 0)}
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
        cartItems={cartItemsForPayment}
      />
    </>
  );
};

export default CartModal;
