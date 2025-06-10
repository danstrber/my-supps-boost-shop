
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
    </div>
  );
};

export default BitcoinTutorial;
