
import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  userDiscount: number;
  discountAmount: number;
  subtotalAfterDiscount: number;
  shippingFee: number;
  finalTotal: number;
  freeShippingThreshold: number;
}

const CartSummary = ({
  subtotal,
  userDiscount,
  discountAmount,
  subtotalAfterDiscount,
  shippingFee,
  finalTotal,
  freeShippingThreshold
}: CartSummaryProps) => {
  // Free shipping calculation based on original subtotal (before discount)
  const amountForFreeShipping = freeShippingThreshold - subtotal;
  const showFreeShippingMessage = subtotal < freeShippingThreshold;
  // Round up the display amount to encourage hitting free shipping threshold
  const displayAmountForFreeShipping = Math.ceil(amountForFreeShipping);

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      {userDiscount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount ({userDiscount}%):</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="flex justify-between">
        <span>Shipping:</span>
        <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
      </div>
      
      {showFreeShippingMessage && (
        <div className="text-center bg-blue-50 border border-blue-200 p-2 rounded text-blue-700 text-sm">
          Add ${displayAmountForFreeShipping.toFixed(2)} more for free shipping!
          <div className="text-xs text-blue-500 mt-1">
            *Free shipping at ${freeShippingThreshold}+ (before discount)
          </div>
        </div>
      )}
      
      <div className="border-t pt-3 flex justify-between text-lg font-bold">
        <span>Total:</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
