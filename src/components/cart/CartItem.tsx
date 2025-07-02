
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '@/lib/products';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateCart: (productId: string, quantity: number) => void;
  userDiscount?: number;
}

const CartItem = ({ product, quantity, onUpdateCart, userDiscount = 0 }: CartItemProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onUpdateCart(product.id, 0);
    } else {
      onUpdateCart(product.id, newQuantity);
    }
  };

  const itemTotal = product.price * quantity;

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-16 h-16 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-sm">{product.name}</h3>
        <p className="text-gray-600 text-sm">${product.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(quantity - 1)}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center font-medium">{quantity}</span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onUpdateCart(product.id, 0)}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-right">
        <div className="font-medium">${itemTotal.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CartItem;
