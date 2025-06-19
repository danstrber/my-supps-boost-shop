
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BitcoinPaymentDetailsProps {
  amount: number;
  walletAddress: string;
  txid: string;
  onTxidChange: (txid: string) => void;
  language: 'en' | 'es';
}

const BitcoinPaymentDetails = ({
  amount,
  walletAddress,
  txid,
  onTxidChange,
  language
}: BitcoinPaymentDetailsProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === 'en' ? 'Copied!' : '¡Copiado!',
        description: language === 'en' ? `${label} copied to clipboard` : `${label} copiado al portapapeles`,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openBlockExplorer = () => {
    window.open(`https://blockchair.com/bitcoin/address/${walletAddress}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">
          {language === 'en' ? '₿ Bitcoin Payment Details' : '₿ Detalles de Pago Bitcoin'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="btc-amount" className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Send Exact Amount' : 'Enviar Cantidad Exacta'}
            </Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="btc-amount"
                name="btc-amount"
                type="text"
                value={`$${amount.toFixed(2)} USD`}
                readOnly
                className="bg-gray-100"
                aria-describedby="btc-amount-description"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(`$${amount.toFixed(2)}`, 'Amount')}
                className="px-3"
                aria-label="Copy amount"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p id="btc-amount-description" className="text-xs text-gray-500 mt-1">
              {language === 'en' 
                ? 'Send the exact USD equivalent in Bitcoin to the address below'
                : 'Envía el equivalente exacto en USD en Bitcoin a la dirección de abajo'}
            </p>
          </div>

          <div>
            <Label htmlFor="wallet-address" className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'To Wallet Address' : 'A Dirección de Billetera'}
            </Label>
            <div className="flex items-center space-x-2 mt-1">
              <Input
                id="wallet-address"
                name="wallet-address"
                type="text"
                value={walletAddress}
                readOnly
                className="bg-gray-100 font-mono text-sm"
                aria-describedby="wallet-address-description"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(walletAddress, 'Address')}
                className="px-3"
                aria-label="Copy wallet address"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openBlockExplorer}
                className="px-3"
                aria-label="View on block explorer"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <p id="wallet-address-description" className="text-xs text-gray-500 mt-1">
              {language === 'en' 
                ? 'Bitcoin wallet address for payment'
                : 'Dirección de billetera Bitcoin para el pago'}
            </p>
          </div>

          <div>
            <Label htmlFor="transaction-id" className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Transaction ID (Required)' : 'ID de Transacción (Requerido)'}
            </Label>
            <Input
              id="transaction-id"
              name="transaction-id"
              type="text"
              value={txid}
              onChange={(e) => onTxidChange(e.target.value)}
              className="mt-1"
              placeholder={language === 'en' ? 'Enter TX ID after sending Bitcoin' : 'Ingresa TX ID después de enviar Bitcoin'}
              required
              aria-describedby="transaction-id-description"
            />
            <p id="transaction-id-description" className="text-xs text-gray-500 mt-1">
              {language === 'en' 
                ? 'Enter the transaction ID from your Bitcoin wallet after sending payment'
                : 'Ingresa el ID de transacción de tu billetera Bitcoin después de enviar el pago'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
        <p className="text-red-700 text-sm font-medium">
          {language === 'en' 
            ? '⚠️ Important: Send the exact amount in Bitcoin equivalent. Orders will be processed once payment is confirmed on the blockchain.'
            : '⚠️ Importante: Envía la cantidad exacta en equivalente Bitcoin. Los pedidos se procesarán una vez que el pago sea confirmado en la blockchain.'}
        </p>
      </div>
    </div>
  );
};

export default BitcoinPaymentDetails;
