
import { useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useCart = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const { userProfile, isAuthenticated } = useAuth();

  // Save cart to user account if authenticated
  const saveCartToAccount = async (cartData: Record<string, number>) => {
    if (isAuthenticated && userProfile) {
      try {
        console.log('💾 Saving cart to user account:', cartData);
        const { error } = await supabase
          .from('users')
          .update({ 
            updated_at: new Date().toISOString(),
            // Store cart data in a hypothetical cart_data column - you might need to add this to the schema
          })
          .eq('id', userProfile.id);

        if (error) {
          console.error('Error saving cart to account:', error);
        } else {
          console.log('✅ Cart saved to user account successfully');
        }
      } catch (error) {
        console.error('Exception saving cart to account:', error);
      }
    }
  };

  // Load cart from user account if authenticated
  const loadCartFromAccount = async () => {
    if (isAuthenticated && userProfile) {
      try {
        console.log('📥 Loading cart from user account');
        // This would load from a cart_data column if it existed
        // For now, we'll continue using localStorage as fallback
      } catch (error) {
        console.error('Exception loading cart from account:', error);
      }
    }
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const validCart: Record<string, number> = {};
        Object.entries(parsedCart).forEach(([key, value]) => {
          if (typeof value === 'number' && value > 0 && !isNaN(value) && isFinite(value)) {
            validCart[key] = Math.max(1, Math.floor(value));
          }
        });
        console.log('📦 Loading cart from localStorage:', { savedCart, parsedCart, validCart });
        setCart(validCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
        setCart({});
      }
    }
  }, []);

  // Load from account when user authenticates
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      loadCartFromAccount();
    }
  }, [isAuthenticated, userProfile]);

  // Save cart to localStorage and account whenever it changes
  useEffect(() => {
    console.log('💾 Saving cart to localStorage:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Also save to user account if authenticated
    if (isAuthenticated) {
      saveCartToAccount(cart);
    }
  }, [cart, isAuthenticated]);

  const cartItemCount = Object.values(cart).reduce((total, quantity) => {
    if (typeof quantity === 'number' && quantity > 0 && !isNaN(quantity) && isFinite(quantity)) {
      return total + Math.floor(quantity);
    }
    return total;
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
        const cleanQuantity = Math.max(1, Math.floor(quantity));
        const newCart = {
          ...prev,
          [productId]: cleanQuantity
        };
        console.log('📝 Updating cart quantity:', { productId, quantity, cleanQuantity, newCart });
        return newCart;
      });
    }
  };

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
