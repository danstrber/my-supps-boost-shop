
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
          <p className="text-blue-600 text-xs mb-3">
            {t.telegramJoinInfo}
          </p>
          
          {/* Telegram Benefits Section */}
          <div className="p-3 bg-blue-100 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">
              {language === 'en' 
                ? '🚀 Why Choose Telegram?' 
                : '🚀 ¿Por Qué Elegir Telegram?'
              }
            </h5>
            <p className="text-blue-700 text-sm mb-3">
              {t.telegramEasierBuying}
            </p>
            
            {/* Telegram Link Button */}
            <a 
              href="https://t.me/+fDDZObF0zjI2M2Y0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              {language === 'en' ? 'Join Our Telegram Group' : 'Únete a Nuestro Grupo de Telegram'}
            </a>
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
            {t.bitcoinPaymentDetails}
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
