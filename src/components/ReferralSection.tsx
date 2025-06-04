
import React from 'react';
import { Copy, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/auth';

interface ReferralSectionProps {
  userProfile: UserProfile;
  language: 'en' | 'es';
  referralCount: number;
}

const ReferralSection = ({ userProfile, language, referralCount }: ReferralSectionProps) => {
  const { toast } = useToast();
  
  const inviteLink = `${window.location.origin}?ref=${userProfile.referral_code}`;
  
  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast({
        title: language === 'en' ? "Link copied!" : "¡Enlace copiado!",
        description: language === 'en' ? "Invite link copied to clipboard" : "Enlace de invitación copiado al portapapeles",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-[#f9f9f9] border border-[#ddd] rounded-lg p-4 mt-4">
      <h3 className="font-semibold text-[#2e7d32] mb-3">
        {language === 'en' ? 'Referral Program' : 'Programa de Referidos'}
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#666]">
            {language === 'en' ? 'Your Code:' : 'Tu Código:'}
          </span>
          <span className="font-mono bg-white px-2 py-1 rounded border">
            {userProfile.referral_code}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-[#2e7d32] mr-1" />
              <span className="text-lg font-semibold text-[#2e7d32]">{referralCount}</span>
            </div>
            <span className="text-xs text-[#666]">
              {language === 'en' ? 'Referrals' : 'Referidos'}
            </span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-[#2e7d32] mr-1" />
              <span className="text-lg font-semibold text-[#2e7d32]">
                ${userProfile.referred_spending.toFixed(2)}
              </span>
            </div>
            <span className="text-xs text-[#666]">
              {language === 'en' ? 'Referred Spending' : 'Gasto Referido'}
            </span>
          </div>
        </div>
        
        <Button
          onClick={copyInviteLink}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Copy className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Copy Invite Link' : 'Copiar Enlace de Invitación'}
        </Button>
      </div>
    </div>
  );
};

export default ReferralSection;
