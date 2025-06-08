
import { useState } from 'react';
import { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';

export const useCart = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();

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
