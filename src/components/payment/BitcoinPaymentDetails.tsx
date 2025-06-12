
import React, { useState, useEffect } from 'react';
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
  const [btcPrice, setBtcPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [priceError, setPriceError] = useState(false);

  // Fetch real-time BTC price with multiple fallbacks
  useEffect(() => {
    const fetchBtcPrice = async () => {
      setLoading(true);
      setPriceError(false);
      
      // Array of different Bitcoin price APIs to try
      const apiUrls = [
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
        'https://api.coindesk.com/v1/bpi/currentprice/USD.json',
        'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
      ];

      for (let i = 0; i < apiUrls.length; i++) {
        try {
          console.log(`Trying BTC price API ${i + 1}:`, apiUrls[i]);
          
          const response = await fetch(apiUrls[i]);
          const data = await response.json();
          
          let price = 0;
          
          // Handle different API response formats
          if (apiUrls[i].includes('coingecko') && data.bitcoin?.usd) {
            price = data.bitcoin.usd;
          } else if (apiUrls[i].includes('coindesk') && data.bpi?.USD?.rate_float) {
            price = data.bpi.USD.rate_float;
          } else if (apiUrls[i].includes('binance') && data.price) {
            price = parseFloat(data.price);
          }
          
          if (price > 0) {
            console.log(`BTC price fetched successfully: $${price}`);
            setBtcPrice(price);
            setLoading(false);
            return; // Success, exit the loop
          }
        } catch (error) {
          console.error(`Failed to fetch BTC price from API ${i + 1}:`, error);
        }
      }
      
      // If all APIs fail, use fallback price and show error
      console.warn('All BTC price APIs failed, using fallback price');
      setBtcPrice(65000); // Fallback price
      setPriceError(true);
      setLoading(false);
    };

    fetchBtcPrice();
    
    // Update price every 2 minutes instead of 5
    const interval = setInterval(fetchBtcPrice, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert USD to BTC with real-time price
  const btcAmount = btcPrice > 0 ? (amount / btcPrice).toFixed(8) : '0.00000000';

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
            <span className="text-lg font-bold text-orange-600">
              {loading ? 'Loading...' : `${btcAmount} BTC`}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(btcAmount, 'BTC Amount')}
              className="text-orange-600 hover:text-orange-800"
              disabled={loading || btcPrice === 0}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            (≈ ${amount.toFixed(0)} USD @ ${btcPrice.toLocaleString()}/BTC)
            {priceError && (
              <span className="text-red-500 ml-2">
                {language === 'en' ? '(Price may not be current)' : '(El precio puede no estar actualizado)'}
              </span>
            )}
          </p>
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
          <p className="text-xs text-gray-500 mt-1">
            {language === 'en' ? 'Bitcoin (BTC) wallet address' : 'Dirección de billetera Bitcoin (BTC)'}
          </p>
        </div>

        <div className="bg-white p-3 rounded border">
          <Label className="text-sm font-medium text-gray-700">
            {language === 'en' ? 'Transaction ID (Required)' : 'ID de Transacción (Requerido)'}
          </Label>
          <Input
            type="text"
            placeholder={language === 'en' ? 'Enter TX ID after sending Bitcoin' : 'Ingresa TX ID después de enviar Bitcoin'}
            value={customerInfo.txid}
            onChange={handleTxidChange}
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            {language === 'en' 
              ? 'Enter the transaction ID after sending Bitcoin to complete your order'
              : 'Ingresa el ID de transacción después de enviar Bitcoin para completar tu pedido'
            }
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
        <h5 className="font-medium text-blue-800 mb-2">
          {language === 'en' ? '📋 Payment Instructions' : '📋 Instrucciones de Pago'}
        </h5>
        <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
          <li>{language === 'en' ? 'Copy the exact BTC amount above' : 'Copia la cantidad exacta de BTC arriba'}</li>
          <li>{language === 'en' ? 'Copy the wallet address' : 'Copia la dirección de la billetera'}</li>
          <li>{language === 'en' ? 'Send Bitcoin from your wallet' : 'Envía Bitcoin desde tu billetera'}</li>
          <li>{language === 'en' ? 'Copy the transaction ID and paste it above' : 'Copia el ID de transacción y pégalo arriba'}</li>
          <li>{language === 'en' ? 'Click "Complete Order"' : 'Haz clic en "Completar Pedido"'}</li>
        </ol>
      </div>
    </div>
  );
};

export default BitcoinPaymentDetails;
