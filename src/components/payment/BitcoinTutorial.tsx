
import React from 'react';
import { AlertCircle, CheckCircle, Shield, Clock } from 'lucide-react';

interface BitcoinTutorialProps {
  language: string;
}

const BitcoinTutorial = ({ language }: BitcoinTutorialProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <AlertCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">Bitcoin Payment Guide</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            KYC vs Non-KYC Bitcoin Purchase
          </h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>KYC Exchanges (Easier):</strong> Coinbase, Binance, Kraken - require ID verification but offer easy purchasing with credit/debit cards.</p>
            <p><strong>Non-KYC Options (More Private):</strong> Bisq, LocalBitcoins, Bitcoin ATMs - more anonymous but may require cash or bank transfers.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Step-by-Step Process
          </h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Buy Bitcoin from your preferred exchange</li>
            <li>Transfer Bitcoin to your personal wallet (recommended for privacy)</li>
            <li>Copy our payment address exactly</li>
            <li>Send the exact Bitcoin amount shown</li>
            <li>Copy the transaction ID from your wallet</li>
            <li>Paste the transaction ID in the next step</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Important Notes
          </h4>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Bitcoin transactions can take 10-60 minutes to confirm</li>
            <li>Send the EXACT amount shown - do not round up or down</li>
            <li>Double-check the payment address before sending</li>
            <li>Keep your transaction ID - you'll need it for verification</li>
            <li>We manually verify all Bitcoin payments within 24 hours</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>Security Tip:</strong> For maximum privacy, use a VPN and avoid linking your Bitcoin purchase to personal information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BitcoinTutorial;
