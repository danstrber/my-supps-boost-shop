
import React from 'react';

interface PaymentMethodInfoProps {
  paymentMethod: 'telegram' | 'bitcoin';
}

const PaymentMethodInfo = ({ paymentMethod }: PaymentMethodInfoProps) => {
  switch (paymentMethod) {
    case 'telegram':
      return (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3 text-lg flex items-center">
            💬 Telegram Ordering (Recommended)
          </h4>
          <p className="text-blue-700 mb-4">
            Order directly through our secure Telegram channel for the fastest and most convenient experience.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <ul className="text-blue-700 text-sm space-y-2">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                Easy order tracking
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                Anonymous ordering
              </li>
            </ul>
            <ul className="text-blue-700 text-sm space-y-2">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                Direct communication
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                24/7 fast support
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg text-center">
            <p className="text-blue-800 font-semibold mb-3">
              🚀 Why Choose Telegram?
            </p>
            <p className="text-blue-700 text-sm mb-4">
              Telegram makes buying easier with instant communication, order tracking, and expert guidance all in one place.
            </p>
            <a 
              href="https://t.me/+fDDZObF0zjI2M2Y0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              💬 Join Telegram Channel
            </a>
          </div>
        </div>
      );
    case 'bitcoin':
      return (
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-3 text-lg flex items-center">
            ₿ Bitcoin Payment
          </h4>
          <p className="text-orange-700 mb-4">
            Pay securely and anonymously with Bitcoin. Fast, private, and reliable.
          </p>
          <div className="bg-orange-100 border border-orange-300 p-4 rounded-lg mb-4">
            <p className="text-orange-800 font-medium mb-3">Benefits:</p>
            <div className="grid grid-cols-2 gap-2">
              <ul className="text-orange-700 text-sm space-y-2">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  100% anonymous transactions
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  No personal ID verification
                </li>
              </ul>
              <ul className="text-orange-700 text-sm space-y-2">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Secure blockchain verification
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  Global accessibility
                </li>
              </ul>
            </div>
          </div>
          <p className="text-orange-600 text-sm font-medium">
            Complete privacy protection - no personal information required for Bitcoin payments.
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentMethodInfo;
