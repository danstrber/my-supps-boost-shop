
import { useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useCart = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const { userProfile } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Ensure all values are valid numbers and remove any invalid entries
        const validCart: Record<string, number> = {};
        Object.entries(parsedCart).forEach(([key, value]) => {
          if (typeof value === 'number' && value > 0 && !isNaN(value) && isFinite(value)) {
            validCart[key] = Math.max(1, Math.floor(value)); // Ensure positive integers
          }
        });
        console.log('📦 Loading cart from localStorage:', { savedCart, parsedCart, validCart });
        setCart(validCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted cart data
        localStorage.removeItem('cart');
        setCart({});
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('💾 Saving cart to localStorage:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate cart item count properly - only count valid positive quantities
  const cartItemCount = Object.values(cart).reduce((total, quantity) => {
    const validQuantity = typeof quantity === 'number' && quantity > 0 && !isNaN(quantity) && isFinite(quantity) ? Math.floor(quantity) : 0;
    return total + validQuantity;
  }, 0);

  console.log('🧮 Cart calculation debug:', { 
    cart, 
    cartItemCount, 
    values: Object.values(cart),
    entries: Object.entries(cart),
    validEntries: Object.entries(cart).filter(([_, qty]) => typeof qty === 'number' && qty > 0 && !isNaN(qty) && isFinite(qty))
  });

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const currentQuantity = prev[product.id] || 0;
      const newQuantity = currentQuantity + 1;
      console.log('➕ Adding to cart:', { productId: product.id, currentQuantity, newQuantity });
      
      const newCart = {
        ...prev,
        [product.id]: newQuantity
      };
      
      // Clean up any invalid entries while we're at it
      const cleanCart: Record<string, number> = {};
      Object.entries(newCart).forEach(([key, value]) => {
        if (typeof value === 'number' && value > 0 && !isNaN(value) && isFinite(value)) {
          cleanCart[key] = Math.floor(value);
        }
      });
      
      return cleanCart;
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateCart = (productId: string, quantity: number) => {
    console.log('🔄 Updating cart:', { productId, quantity });
    
    if (quantity <= 0 || !isFinite(quantity) || isNaN(quantity)) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[productId];
        console.log('🗑️ Removing from cart:', { productId, newCart });
        return newCart;
      });
    } else {
      setCart(prev => {
        const cleanQuantity = Math.max(1, Math.floor(quantity)); // Ensure positive integer
        const newCart = {
          ...prev,
          [productId]: cleanQuantity
        };
        console.log('📝 Updating cart quantity:', { productId, quantity, cleanQuantity, newCart });
        return newCart;
      });
    }
  };

  // Add a function to clear cart
  const clearCart = () => {
    console.log('🧹 Clearing cart');
    setCart({});
    localStorage.removeItem('cart');
  };

  return {
    cart,
    cartItemCount,
    handleAddToCart,
    handleUpdateCart,
    clearCart
  };
};
