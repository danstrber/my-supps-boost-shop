
import { useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useCart = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const { user } = useAuth();

  // Load cart from database on user login
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      // Clear cart when user logs out
      setCart({});
    }
  }, [user]);

  // Save cart to database whenever it changes (if user is logged in)
  useEffect(() => {
    if (user && Object.keys(cart).length > 0) {
      saveCartToDatabase();
    }
  }, [cart, user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_carts')
        .select('cart_data')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data?.cart_data) {
        setCart(data.cart_data);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const saveCartToDatabase = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_carts')
        .upsert({
          user_id: user.id,
          cart_data: cart,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const cartItemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

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
