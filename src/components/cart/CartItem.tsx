
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '@/lib/products';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateCart: (productId: string, quantity: number) => void;
  userDiscount: number;
}

const CartItem = ({ product, quantity, onUpdateCart, userDiscount }: CartItemProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onUpdateCart(product.id, 0);
    } else {
      onUpdateCart(product.id, newQuantity);
    }
  };

  const itemTotal = product.price * quantity;
  const discountAmount = itemTotal * (userDiscount / 100);
  const finalPrice = itemTotal - discountAmount;

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{product.name}</h4>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)} each</p>
        <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
          🔬 Lab Tested
        </span>
        {userDiscount > 0 && (
          <p className="text-xs text-green-600 mt-1">
            {userDiscount}% discount applied
          </p>
        )}
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
        
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          className="w-16 text-center h-8"
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onUpdateCart(product.id, 0)}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-right">
        {userDiscount > 0 ? (
          <div>
            <p className="text-sm text-gray-500 line-through">${itemTotal.toFixed(2)}</p>
            <p className="font-medium text-green-600">${finalPrice.toFixed(2)}</p>
          </div>
        ) : (
          <p className="font-medium">${itemTotal.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
