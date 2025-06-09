
import React from 'react';
import { translations } from '@/lib/translations';

interface CartSummaryProps {
  subtotal: number;
  userDiscount: number;
  discountAmount: number;
  subtotalAfterDiscount: number;
  shippingFee: number;
  finalTotal: number;
  freeShippingThreshold?: number;
  language: 'en' | 'es';
}

const CartSummary = ({ 
  subtotal, 
  userDiscount, 
  discountAmount, 
  subtotalAfterDiscount, 
  shippingFee, 
  finalTotal,
  freeShippingThreshold = 100,
  language
}: CartSummaryProps) => {
  const t = translations[language];

  return (
    <div className="border-t pt-4">
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <h4 className="font-semibold text-gray-900">
          {language === 'en' ? 'Order Summary' : 'Resumen del Pedido'}
        </h4>
        
        <div className="flex justify-between text-sm">
          <span>{t.originalTotal}:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {userDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>{t.discount} ({userDiscount}%):</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span>{t.shipping}:</span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-green-600">{language === 'en' ? 'FREE' : 'GRATIS'}</span>
            ) : (
              `$${shippingFee.toFixed(2)}`
            )}
          </span>
        </div>
        
        {subtotalAfterDiscount < freeShippingThreshold && (
          <p className="text-xs text-gray-600">
            {language === 'en' 
              ? `Add $${(freeShippingThreshold - subtotalAfterDiscount).toFixed(2)} more for free shipping!`
              : `¡Agrega $${(freeShippingThreshold - subtotalAfterDiscount).toFixed(2)} más para envío gratis!`
            }
          </p>
        )}
        
        <div className="border-t pt-2 flex justify-between font-semibold text-lg">
          <span>{t.finalTotal}:</span>
          <span className="text-green-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
