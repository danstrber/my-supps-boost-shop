
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';

interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  postalCode: string;
  txid: string;
}

interface BitcoinPaymentDetailsProps {
  amount: number;
  walletAddress: string;
  customerInfo: CustomerInfo;
  onInfoChange: (info: CustomerInfo) => void;
  language: 'en' | 'es';
}

const BitcoinPaymentDetails = ({
  amount,
  walletAddress,
  customerInfo,
  onInfoChange,
  language
}: BitcoinPaymentDetailsProps) => {
  const { toast } = useToast();
  const t = translations[language];

  // Convert USD to BTC (this would normally be a real-time API call)
  const btcAmount = (amount / 65000).toFixed(8); // Example rate, replace with real API

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t.copied,
      description: `${label} ${t.copiedToClipboard}`,
    });
  };

  const handleTxidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInfoChange({...customerInfo, txid: value});
  };

  return (
    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg space-y-4">
      <h4 className="font-semibold text-orange-800 mb-3">
        ₿ {t.bitcoinPaymentDetails}
      </h4>

      <div className="space-y-3">
        <div className="bg-white p-3 rounded border">
          <Label className="text-sm font-medium text-gray-700">
            {t.sendExact}
          </Label>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-orange-600">{btcAmount} BTC</span>
            <button
              type="button"
              onClick={() => copyToClipboard(btcAmount, 'BTC Amount')}
              className="text-orange-600 hover:text-orange-800"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">(≈ ${amount.toFixed(0)} USD)</p>
        </div>

        <div className="bg-white p-3 rounded border">
          <Label className="text-sm font-medium text-gray-700">
            {t.toWallet}
          </Label>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-mono break-all mr-2">{walletAddress}</span>
            <button
              type="button"
              onClick={() => copyToClipboard(walletAddress, 'Wallet Address')}
              className="text-orange-600 hover:text-orange-800 flex-shrink-0"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tip Section */}
      <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors">
        <p className="text-green-700 text-sm font-medium">
          {t.wantCheaper}
        </p>
      </div>
    </div>
  );
};

export default BitcoinPaymentDetails;
