import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimpleProduct } from '@/lib/products';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [productId: string]: number };
  products: SimpleProduct[];
  onUpdateCart: (productId: string, quantity: number) => void;
  userDiscount: number;
  isAuthenticated: boolean;
  userProfile: any;
  onPageChange?: (page: string) => void;
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
  onPageChange
}: CartModalProps) => {
  const calculateDiscountedPrice = (price: number) => {
    const discountPercentage = userDiscount / 100;
    const discountedAmount = price * discountPercentage;
    return price - discountedAmount;
  };
  
  if (!isOpen) return null;

  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;
    return { product, quantity };
  }).filter(Boolean) as { product: SimpleProduct; quantity: number }[];

  const totalPrice = cartItems.reduce((total, { product, quantity }) => {
    const discountedPrice = calculateDiscountedPrice(product.price);
    return total + (discountedPrice * quantity);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            <ShoppingCart className="inline-block mr-2 align-middle h-5 w-5" />
            Your Cart
          </h2>
          <Button variant="ghost" onClick={onClose} className="hover:bg-gray-200 rounded-full h-8 w-8 p-1">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            <ul>
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <img src={product.imageUrl} alt={product.name} className="h-16 w-16 object-cover rounded-lg mr-4" />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateCart(product.id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onUpdateCart(product.id, quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Subtotal:</div>
            <div className="text-xl font-bold">${totalPrice.toFixed(2)}</div>
          </div>
          {isAuthenticated ? (
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-sm">
              Proceed to Checkout
            </Button>
          ) : (
            <Button onClick={() => onPageChange && onPageChange('account')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm">
              Login to Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
