
import React from 'react';
import { translations } from '@/lib/translations';

interface BitcoinTutorialProps {
  language: 'en' | 'es';
}

const BitcoinTutorial = ({ language }: BitcoinTutorialProps) => {
  const t = translations[language];

  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
      <h4 className="font-semibold text-gray-800 mb-3">{t.bitcoinTutorial}</h4>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <h5 className="font-medium text-blue-800 mb-2">{t.bitcoinEasy}</h5>
          <ul className="text-blue-700 text-xs space-y-1">
            {t.bitcoinEasySteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
          <div className="mt-2 space-y-1">
            <a href="https://coinbase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline block">• Coinbase.com</a>
            <a href="https://kraken.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline block">• Kraken.com</a>
            <a href="https://binance.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline block">• Binance.com</a>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
          <h5 className="font-medium text-purple-800 mb-2">{t.bitcoinAnonymous}</h5>
          <ul className="text-purple-700 text-xs space-y-1">
            {t.bitcoinAnonSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
          <div className="mt-2 space-y-1">
            <a href="https://localcoinswap.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-xs underline block">• LocalCoinSwap.com</a>
            <a href="https://bisq.network" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-xs underline block">• Bisq.network</a>
          </div>
        </div>
      </div>

      {/* Additional Anonymous Bitcoin Payment Tips */}
      <div className="mt-4 bg-orange-50 border border-orange-200 p-3 rounded-lg">
        <h5 className="font-medium text-orange-800 mb-2">
          🔒 {language === 'en' ? 'Anonymous Bitcoin Payment Tips' : 'Consejos de Pago Anónimo con Bitcoin'}
        </h5>
        <ul className="text-orange-700 text-xs space-y-1">
          <li>• {language === 'en' ? 'Use a privacy-focused wallet like Wasabi or Samourai' : 'Usa una billetera enfocada en privacidad como Wasabi o Samourai'}</li>
          <li>• {language === 'en' ? 'Consider using a Bitcoin mixer for extra privacy' : 'Considera usar un mezclador de Bitcoin para mayor privacidad'}</li>
          <li>• {language === 'en' ? 'Send from a fresh address not linked to your identity' : 'Envía desde una dirección nueva no vinculada a tu identidad'}</li>
          <li>• {language === 'en' ? 'Wait for multiple confirmations for maximum security' : 'Espera múltiples confirmaciones para máxima seguridad'}</li>
          <li>• {language === 'en' ? 'No ID verification required - completely anonymous' : 'No se requiere verificación de ID - completamente anónimo'}</li>
        </ul>
      </div>
    </div>
  );
};

export default BitcoinTutorial;
