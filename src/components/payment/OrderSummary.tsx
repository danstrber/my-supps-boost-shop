
import React from 'react';
import { translations } from '@/lib/translations';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  orderTotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  language: 'en' | 'es';
}

const OrderSummary = ({ 
  cartItems, 
  orderTotal, 
  discount, 
  shippingFee, 
  finalTotal,
  language 
}: OrderSummaryProps) => {
  const t = translations[language];

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h4 className="font-semibold text-gray-900 mb-3">
        {language === 'en' ? 'Order Summary' : 'Resumen del Pedido'}
      </h4>
      
      {/* Items */}
      <div className="space-y-2 mb-4">
        {cartItems.map(item => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span>{item.product.name} x{item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>{t.originalTotal}:</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>{t.discount}:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>{t.shipping}:</span>
          <span>{shippingFee === 0 ? (language === 'en' ? 'FREE' : 'GRATIS') : `$${shippingFee.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-1">
          <span>{t.finalTotal}:</span>
          <span className="text-green-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
