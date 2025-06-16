
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
  const remainingForFreeShipping = freeShippingThreshold - subtotalAfterDiscount;

  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      {userDiscount > 0 && (
        <div className="flex justify-between text-green-600 font-medium">
          <span>Discount ({userDiscount}%):</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="flex justify-between text-gray-600">
        <span>Shipping:</span>
        <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
      </div>
      
      {remainingForFreeShipping > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center">
          <p className="text-blue-700 text-lg font-medium">
            Add ${remainingForFreeShipping.toFixed(2)} more for free shipping!
          </p>
        </div>
      )}
      
      <div className="flex justify-between text-xl font-bold border-t pt-3">
        <span>Total:</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
