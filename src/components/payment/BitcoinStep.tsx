
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { translations } from './translations';

interface BitcoinStepProps {
  bitcoinAmount: string;
  language: 'en' | 'es';
}

const BitcoinStep: React.FC<BitcoinStepProps> = ({ bitcoinAmount, language }) => {
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const { toast } = useToast();
  const l = translations[language];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translations.en.btcAddressValue)
      .then(() => {
        setIsAddressCopied(true);
        setTimeout(() => setIsAddressCopied(false), 2000);
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
        toast({
          title: language === 'en' ? "Copy Failed" : "Copia Fallida",
          description: language === 'en' ? "Could not copy the address to clipboard." : "No se pudo copiar la dirección al portapapeles.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{l.confirmOrder}</h3>
      <p>{l.pleaseSend} <strong>{bitcoinAmount} BTC</strong> {l.toThisAddress}:</p>
      <div className="relative">
        <Input
          type="text"
          value={translations.en.btcAddressValue}
          readOnly
          className="font-mono text-sm"
        />
        <Button
          onClick={copyToClipboard}
          className="absolute top-1 right-1 bg-blue-500 text-white rounded-md px-3 py-1 text-sm hover:bg-blue-600 transition-colors"
          disabled={isAddressCopied}
        >
          {isAddressCopied ? l.copied : l.copyAddress}
        </Button>
      </div>
      <p className="text-green-600">{l.pendingConfirmation}</p>
    </div>
  );
};

export default BitcoinStep;
