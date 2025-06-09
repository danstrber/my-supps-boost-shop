
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2 } from 'lucide-react';

interface ReferralInputsProps {
  referralCode: string;
  referralLink: string;
  onCopyCode: () => void;
  onCopyLink: () => void;
  onShareLink: () => void;
  language: 'en' | 'es';
}

const ReferralInputs = ({ 
  referralCode, 
  referralLink, 
  onCopyCode, 
  onCopyLink, 
  onShareLink,
  language 
}: ReferralInputsProps) => {
  const t = {
    en: { referralCode: 'Referral Code', referralLink: 'Referral Link' },
    es: { referralCode: 'Código de Referido', referralLink: 'Enlace de Referido' }
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-green-800 mb-2">
          {t[language].referralCode}:
        </label>
        <div className="flex gap-2">
          <Input
            value={referralCode}
            readOnly
            className="flex-1 bg-white border-green-300 text-sm font-mono"
          />
          <Button
            onClick={onCopyCode}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white px-3"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-green-800 mb-2">
          {t[language].referralLink}:
        </label>
        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="flex-1 bg-white border-green-300 text-xs"
          />
          <Button
            onClick={onCopyLink}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white px-3"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            onClick={onShareLink}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReferralInputs;
