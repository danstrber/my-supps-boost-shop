
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
      
      <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <p className="text-orange-700 text-sm font-medium">
          {language === 'en' ? '⚠️ Bitcoin payments only for now' : '⚠️ Solo pagos con Bitcoin por ahora'}
        </p>
      </div>
      
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
          <h5 className="font-medium text-purple-800 mb-2">
            🔒 {language === 'en' ? 'Anonymous Bitcoin Payment Tips' : 'Consejos de Pago Anónimo con Bitcoin'}
          </h5>
          <ul className="text-purple-700 text-xs space-y-1">
            <li>• {language === 'en' ? 'Use privacy wallets (Wasabi, Samourai)' : 'Usa billeteras de privacidad (Wasabi, Samourai)'}</li>
            <li>• {language === 'en' ? 'Send from fresh, unlinked addresses' : 'Envía desde direcciones nuevas no vinculadas'}</li>
            <li>• {language === 'en' ? 'No ID verification - completely anonymous' : 'Sin verificación de ID - completamente anónimo'}</li>
          </ul>
          <div className="mt-2 space-y-1">
            <a href="https://localcoinswap.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-xs underline block">• LocalCoinSwap.com</a>
            <a href="https://bisq.network" target="_blank" rel="noopener noreferrer" className="text-purple-600 text-xs underline block">• Bisq.network</a>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-700 text-sm">
          <strong>{language === 'en' ? 'Important:' : 'Importante:'}</strong> {language === 'en' ? 'After sending Bitcoin, paste your transaction ID below to verify payment. We only accept Bitcoin payments currently.' : 'Después de enviar Bitcoin, pega tu ID de transacción abajo para verificar el pago. Actualmente solo aceptamos pagos con Bitcoin.'}
        </p>
      </div>
    </div>
  );
};

export default BitcoinTutorial;
