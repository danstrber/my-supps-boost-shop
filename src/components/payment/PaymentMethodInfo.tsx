
import React from 'react';
import { translations } from '@/lib/translations';

interface PaymentMethodInfoProps {
  paymentMethod: 'telegram' | 'bitcoin';
  language: 'en' | 'es';
}

const PaymentMethodInfo = ({ paymentMethod, language }: PaymentMethodInfoProps) => {
  const t = translations[language];
  
  switch (paymentMethod) {
    case 'telegram':
      return (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            💬 {t.telegramOrdering}
          </h4>
          <p className="text-blue-700 text-sm mb-3">
            {t.telegramOrderDesc}
          </p>
          <ul className="text-blue-700 text-sm space-y-1 mb-3">
            <li>✅ {t.telegramEasyTracking}</li>
            <li>✅ {t.telegramAnonymous}</li>
            <li>✅ {t.telegramDirectComm}</li>
            <li>✅ {t.telegramExpertCoaching}</li>
            <li>✅ {t.telegramFastSupport}</li>
          </ul>
          <p className="text-blue-600 text-xs">
            {t.telegramJoinInfo}
          </p>
          
          {/* Telegram Benefits Section */}
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">
              {language === 'en' 
                ? '🚀 Why Choose Telegram?' 
                : '🚀 ¿Por Qué Elegir Telegram?'
              }
            </h5>
            <p className="text-blue-700 text-sm">
              {t.telegramEasierBuying}
            </p>
          </div>
        </div>
      );
    case 'bitcoin':
      return (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">
            ₿ {t.bitcoinPayment}
          </h4>
          <p className="text-orange-700 text-sm mb-2">
            {t.bitcoinPaymentDesc}
          </p>
          <p className="text-orange-600 text-xs">
            {t.bitcoinWalletInfo}
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentMethodInfo;
