
import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  userDiscount: number;
  discountAmount: number;
  subtotalAfterDiscount: number;
  shippingFee: number;
  finalTotal: number;
  freeShippingThreshold?: number;
}

const CartSummary = ({ 
  subtotal, 
  userDiscount, 
  discountAmount, 
  subtotalAfterDiscount, 
  shippingFee, 
  finalTotal,
  freeShippingThreshold = 100
}: CartSummaryProps) => {
  return (
    <div className="border-t pt-4">
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <h4 className="font-semibold text-gray-900">
          Order Summary
        </h4>
        
        <div className="flex justify-between text-sm">
          <span>Original Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {userDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({userDiscount}%):</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `$${shippingFee.toFixed(2)}`
            )}
          </span>
        </div>
        
        {subtotalAfterDiscount < freeShippingThreshold && (
          <p className="text-xs text-gray-600">
            Add ${(freeShippingThreshold - subtotalAfterDiscount).toFixed(2)} more for free shipping!
          </p>
        )}
        
        <div className="border-t pt-2 flex justify-between font-semibold text-lg">
          <span>Final Total:</span>
          <span className="text-green-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
