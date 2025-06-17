
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
          if (typeof value === 'number' && value > 0) {
            validCart[key] = value;
          }
        });
        setCart(validCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCart({});
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate cart item count properly - only count valid positive quantities
  const cartItemCount = Object.values(cart).reduce((total, quantity) => {
    return total + (typeof quantity === 'number' && quantity > 0 ? quantity : 0);
  }, 0);

  const handleAddToCart = (product: Product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateCart = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      });
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  return {
    cart,
    cartItemCount,
    handleAddToCart,
    handleUpdateCart
  };
};
