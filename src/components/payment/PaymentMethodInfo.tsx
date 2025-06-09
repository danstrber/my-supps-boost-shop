
import React from 'react';

interface PaymentMethodInfoProps {
  paymentMethod: 'telegram' | 'bitcoin' | 'solana' | 'email';
}

const PaymentMethodInfo = ({ paymentMethod }: PaymentMethodInfoProps) => {
  switch (paymentMethod) {
    case 'telegram':
      return (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💬 Telegram Ordering</h4>
          <p className="text-blue-700 text-sm mb-3">
            Order through our Telegram group for the easiest experience:
          </p>
          <ul className="text-blue-700 text-sm space-y-1 mb-3">
            <li>✅ Easy order tracking</li>
            <li>✅ Anonymous ordering</li>
            <li>✅ Direct communication</li>
            <li>✅ Fast support</li>
          </ul>
          <p className="text-blue-600 text-xs">
            Click "Complete Order" to join our Telegram group and place your order there.
          </p>
        </div>
      );
    case 'email':
      return (
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">📧 Email Payment</h4>
          <p className="text-green-700 text-sm mb-2">
            We'll send you payment instructions via email after you submit your order.
          </p>
          <p className="text-green-600 text-xs">
            You'll receive payment details and instructions in your email inbox.
          </p>
        </div>
      );
    case 'bitcoin':
      return (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">₿ Bitcoin Payment</h4>
          <p className="text-orange-700 text-sm mb-2">
            We'll send you Bitcoin wallet address and payment instructions via email.
          </p>
          <p className="text-orange-600 text-xs">
            After payment, please provide the transaction ID (TXID) for verification.
          </p>
        </div>
      );
    case 'solana':
      return (
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-2">◎ Solana Payment</h4>
          <p className="text-purple-700 text-sm mb-2">
            We'll send you Solana wallet address and payment instructions via email.
          </p>
          <p className="text-purple-600 text-xs">
            After payment, please provide the transaction ID (TXID) for verification.
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentMethodInfo;
