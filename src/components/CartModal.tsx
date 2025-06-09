
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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
              {language === 'en' ? 'Your Cart' : 'Tu Carrito'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">
              {language === 'en' ? 'Your cart is empty' : 'Tu carrito está vacío'}
            </p>
            <Button onClick={onClose}>
              {language === 'en' ? 'Continue Shopping' : 'Seguir Comprando'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const subtotal = cartItems.reduce((total, { product, quantity }) => total + (product.price * quantity), 0);
  const discountAmount = subtotal * (userDiscount / 100);
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  // Free shipping threshold: $100 for normal/referred users, $101 for referrers
  const isReferrer = userProfile && userProfile.referred_spending > 0;
  const freeShippingThreshold = isReferrer ? 101 : 100;
  const shippingFee = subtotalAfterDiscount >= freeShippingThreshold ? 0 : 12;
  const finalTotal = subtotalAfterDiscount + shippingFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert(language === 'en' ? 'Please log in to checkout' : 'Por favor inicia sesión para proceder');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Your Cart' : 'Tu Carrito'}
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
                userDiscount={userDiscount}
                language={language}
              />
            ))}

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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
              disabled={!isAuthenticated}
            >
              {!isAuthenticated 
                ? (language === 'en' ? 'Login to Checkout' : 'Inicia Sesión para Comprar')
                : (language === 'en' ? 'Proceed to Checkout' : 'Proceder al Pago')
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
        cartItems={cartItems}
      />
    </>
  );
};

export default CartModal;
