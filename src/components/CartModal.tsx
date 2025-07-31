
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Product } from '@/lib/products';
import { UserProfile } from '@/lib/auth';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { PaymentModal } from '@/components/PaymentModal';
import { getShippingCost, getFreeShippingThreshold } from '@/lib/shipping';

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
  userDiscount: providedDiscount,
  isAuthenticated,
  userProfile,
  onPageChange,
  onOrderSuccess
}: CartModalProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Helper function to find product or variant by ID
  const findProductOrVariant = (productId: string) => {
    // First try to find main product
    let product = products.find(p => p.id === productId);
    if (product) return product;
    
    // If not found, search in variants
    for (const mainProduct of products) {
      if (mainProduct.variants) {
        const variant = mainProduct.variants.find(v => v.id === productId);
        if (variant) {
          // Return variant as a product-like object with variant properties
          return {
            ...mainProduct,
            id: variant.id,
            name: `${mainProduct.name} - ${variant.name}`,
            price: variant.price,
            image: variant.image || mainProduct.image,
            specifications: variant.specifications || mainProduct.specifications
          };
        }
      }
    }
    return null;
  };

  const cartItems = Object.entries(cart)
    .filter(([_, quantity]) => quantity > 0)
    .map(([productId, quantity]) => {
      const product = findProductOrVariant(productId);
      return product ? { product, quantity } : null;
    })
    .filter(Boolean) as Array<{ product: Product; quantity: number }>;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // FIXED: Calculate discount based on cart subtotal with proper complete $50 tiers only
  const calculateCartDiscount = (cartSubtotal: number, profile: UserProfile | null) => {
    if (!profile) return 0;
    
    // First referral bonus: 10%
    const firstReferralBonus = profile.referred_by ? 10 : 0;
    
    // Get referral count - for now using 0 as placeholder
    // TODO: This should fetch actual referral count from database
    const referralCount = 0;
    const isReferrer = referralCount > 0;
    const referralDiscount = referralCount * 2.5;
    
    // FIXED: Spending discount based on cart amount (complete $50 tiers only)
    // ALL users have $150 spending cap per purchase for personal spending discounts
    const cartSpendingCap = Math.min(cartSubtotal, 150); // Cap cart calculation at $150
    const spendingTiers = Math.floor(cartSpendingCap / 50); // FIXED: Use Math.floor for complete $50 tiers only
    
    let spendingDiscount = 0;
    if (isReferrer) {
      // Referrers: 5% per complete $50 in cart (max 3 tiers at $150 = 15%)
      spendingDiscount = Math.min(spendingTiers * 5, 15);
    } else if (profile.referred_by) {
      // Referred users: 6.5% per complete $50 in cart (max 3 tiers at $150 = 19.5%)
      spendingDiscount = Math.min(spendingTiers * 6.5, 19.5);
    } else {
      // Standard users: 2.5% per complete $50 in cart (max 3 tiers at $150 = 7.5%)
      spendingDiscount = Math.min(spendingTiers * 2.5, 7.5);
    }
    
    // Get saved discount from discount banking
    const savedDiscount = profile.saved_discount_percentage || 0;
    
    // Total available discount (including saved), but cap at 32%
    const totalEarnedDiscount = firstReferralBonus + referralDiscount + spendingDiscount;
    const totalAvailableDiscount = Math.min(totalEarnedDiscount + savedDiscount, 32);
    
    console.log('Cart discount calculation:', {
      cartSubtotal,
      cartSpendingCap,
      spendingTiers,
      userType: isReferrer ? 'referrer' : (profile.referred_by ? 'referred' : 'standard'),
      firstReferralBonus,
      referralDiscount,
      spendingDiscount,
      savedDiscount,
      totalEarnedDiscount,
      totalAvailableDiscount
    });
    
    return totalAvailableDiscount;
  };
  
  const userDiscount = isAuthenticated ? calculateCartDiscount(subtotal, userProfile) : 0;
  const discountAmount = (subtotal * userDiscount) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  
  // IMPORTANT: Free shipping is based on original subtotal BEFORE discount
  const userCountry = userProfile?.country || 'USA';
  const shippingFee = getShippingCost(userCountry, subtotal); // Use original subtotal here
  
  const finalTotal = subtotalAfterDiscount + shippingFee;

  // Calculate how much more is needed for free shipping based on original subtotal
  const freeShippingThreshold = getFreeShippingThreshold(userCountry);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal); // Use original subtotal

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
        <DialogContent className="sm:max-w-md z-50">
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
      <Dialog open={isOpen && !isPaymentModalOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col z-50">
          <DialogHeader className="flex-shrink-0">
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

          {/* Scrollable cart items section */}
          <div className="flex-1 overflow-y-auto min-h-0 space-y-3 py-2">
            {cartItems.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onUpdateCart={onUpdateCart}
                userDiscount={0} // Don't show discount on individual items
              />
            ))}
          </div>

          {/* Fixed summary and checkout section at bottom */}
          <div className="flex-shrink-0 space-y-4 pt-4 border-t">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {userDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Total Discount ({userDiscount.toFixed(1)}%):</span>
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
                  <div className="text-xs text-blue-500 mt-1">
                    *Free shipping at ${freeShippingThreshold}+ (before discount)
                  </div>
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
          </div>
        </DialogContent>
      </Dialog>

      {isPaymentModalOpen && userProfile && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={handlePaymentModalClose}
          language="en"
        />
      )}
    </>
  );
};

export default CartModal;
