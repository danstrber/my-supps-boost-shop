
import React from 'react';
import { FormData } from './types';
import { translations } from './translations';

interface PaymentStepProps {
  cartItems: any[];
  originalTotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  bitcoinAmount: string;
  form: any;
  language: 'en' | 'es';
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  cartItems,
  originalTotal,
  discountAmount,
  shippingFee,
  finalTotal,
  bitcoinAmount,
  form,
  language
}) => {
  const l = translations[language];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{l.orderSummary}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">{l.subtotal}:</p>
          <p className="font-semibold">${originalTotal.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">{l.discount}:</p>
          <p className="font-semibold">-${discountAmount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">{l.shipping}:</p>
          <p className="font-semibold">${shippingFee.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">{l.total}:</p>
          <p className="font-semibold">${finalTotal.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">{l.bitcoinAmount}:</p>
          <p className="font-semibold">{bitcoinAmount} BTC</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold">{l.shippingTo}</h3>
      <div className="grid grid-cols-1 gap-2">
        <div>
          <p className="text-gray-600">{l.fullName}:</p>
          <p className="font-semibold">{form.getValues('fullName')}</p>
        </div>
        <div>
          <p className="text-gray-600">{l.email}:</p>
          <p className="font-semibold">{form.getValues('email')}</p>
        </div>
        <div>
          <p className="text-gray-600">{l.phone}:</p>
          <p className="font-semibold">{form.getValues('phone')}</p>
        </div>
        <div>
          <p className="text-gray-600">{l.address}:</p>
          <p className="font-semibold">{form.getValues('address')}, {form.getValues('city')}, {form.getValues('state')} {form.getValues('zipCode')}, {form.getValues('country')}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold">{l.items}</h3>
      <div className="grid grid-cols-1 gap-2">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between">
            <p className="text-gray-600">{item.name}</p>
            <p className="font-semibold">{item.quantity} x ${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStep;
