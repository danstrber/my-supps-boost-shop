
import React, { useState } from 'react';
import { Copy, Users, DollarSign, TrendingUp, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';

interface ReferralSectionProps {
  userProfile: UserProfile;
  language: 'en' | 'es';
  referralCount: number;
}

const ReferralSection = ({ userProfile, language, referralCount }: ReferralSectionProps) => {
  const { toast } = useToast();
  const [showStats, setShowStats] = useState(false);
  
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

  // Calculate current discount percentage (capped at 30%)
  const calculateDiscount = () => {
    let referralDiscount = 0;
    let spendingDiscount = 0;
    
    if (referralCount > 0) {
      referralDiscount = 10 + (referralCount - 1) * 4;
      referralDiscount = Math.min(referralDiscount, 25); // Cap at 25%
    }
    
    if (userProfile.referred_by) {
      // Referred user gets 6% per $50 spent
      spendingDiscount = Math.floor(userProfile.total_spending / 50) * 6;
    } else {
      // Referrer gets 2% per $50 of referred spending
      spendingDiscount = Math.floor(userProfile.referred_spending / 50) * 2;
    }
    
    return Math.min(referralDiscount + spendingDiscount, 30); // Total cap at 30%
  };

  const currentDiscount = calculateDiscount();

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 rounded-xl p-4 mt-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 flex items-center">
          <Gift className="h-5 w-5 mr-2" />
          {language === 'en' ? 'Referral Program' : 'Programa de Referidos'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowStats(!showStats)}
          className="text-gray-700 hover:bg-gray-200"
        >
          <TrendingUp className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white rounded-lg p-3 border border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Your Code:' : 'Tu Código:'}
            </span>
            <span className="font-mono bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold">
              {userProfile.referral_code}
            </span>
          </div>
          
          <Button
            onClick={copyInviteLink}
            variant="outline"
            size="sm"
            className="w-full border-gray-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Copy className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Copy Invite Link' : 'Copiar Enlace de Invitación'}
          </Button>
        </div>
        
        {showStats && (
          <div className="bg-white rounded-lg p-3 border border-gray-300 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Users className="h-4 w-4 text-gray-700 mr-1" />
                  <span className="text-xl font-bold text-gray-800">{referralCount}</span>
                </div>
                <span className="text-xs text-gray-700 font-medium">
                  {language === 'en' ? 'Referrals' : 'Referidos'}
                </span>
              </div>
              
              <div className="text-center bg-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <DollarSign className="h-4 w-4 text-gray-700 mr-1" />
                  <span className="text-xl font-bold text-gray-800">
                    ${userProfile.referred_spending.toFixed(0)}
                  </span>
                </div>
                <span className="text-xs text-gray-700 font-medium">
                  {language === 'en' ? 'Referred Spending' : 'Gasto Referido'}
                </span>
              </div>
            </div>
            
            <div className="text-center bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg p-3">
              <div className="text-2xl font-bold">{currentDiscount}%</div>
              <div className="text-sm opacity-90">
                {language === 'en' ? 'Current Discount (Max 30%)' : 'Descuento Actual (Máx 30%)'}
              </div>
            </div>
            
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              <strong>{language === 'en' ? 'How it works:' : 'Cómo funciona:'}</strong>
              <ul className="mt-1 space-y-1">
                <li>• {language === 'en' ? '10% for 1st referral, +4% each additional (max 25%)' : '10% por 1er referido, +4% cada adicional (máx 25%)'}</li>
                <li>• {language === 'en' ? '+6% per $50 you spend (if referred)' : '+6% por cada $50 gastados (si fuiste referido)'}</li>
                <li>• {language === 'en' ? '+2% per $50 your referrals spend' : '+2% por cada $50 que gasten tus referidos'}</li>
                <li>• {language === 'en' ? 'Maximum total discount: 30%' : 'Descuento máximo total: 30%'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralSection;
