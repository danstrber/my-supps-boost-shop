
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/auth';
import { generateReferralLink } from '@/lib/referral';
import ReferralStats from './referral/ReferralStats';
import ReferralInputs from './referral/ReferralInputs';
import ReferralDetails from './referral/ReferralDetails';

interface ReferralSectionProps {
  userProfile: UserProfile;
  language: 'en' | 'es';
  referralCount: number;
}

const ReferralSection = ({ userProfile, language, referralCount }: ReferralSectionProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  const referralLink = generateReferralLink(userProfile.referral_code);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(userProfile.referral_code);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join MySupps',
        text: 'Get exclusive discounts on premium supplements!',
        url: referralLink,
      });
    } else {
      copyReferralLink();
    }
  };

  // CORRECTED MATH per new requirements
  const referralDiscount = referralCount > 0 ? 10 : 0; // 10% for having referrals (signup bonus)
  
  const spendingDiscount = userProfile.referred_by 
    ? Math.floor(userProfile.total_spending / 75) * 6  // Referred users: 6% per $75
    : Math.floor(userProfile.total_spending / 50) * 2; // Normal users: 2% per $50
  
  const referredSpendingDiscount = Math.floor(userProfile.referred_spending / 50) * 5; // Referrer: 5% per $50 of referred spending
  const personalReferrerDiscount = referralCount > 0 ? Math.floor(userProfile.total_spending / 50) * 1.75 : 0; // Referrer: 1.75% per $50 personal spending
  
  // ALL discounts STACK but cap at 30%
  const totalDiscount = Math.min(referralDiscount + spendingDiscount + referredSpendingDiscount + personalReferrerDiscount, 30);

  // Free shipping at $100 for everyone
  const freeShipping = userProfile.total_spending >= 100;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 rounded-xl p-4 md:p-6 shadow-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-bold text-green-800 flex items-center">
          <Gift className="h-5 w-5 md:h-6 md:w-6 mr-2" />
          {language === 'en' ? 'Referral Program' : 'Programa de Referidos'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-green-700 hover:text-green-900 text-sm"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </Button>
      </div>

      {/* Current Discount Display */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{totalDiscount}%</div>
          <div className="text-xs md:text-sm text-gray-600">
            {language === 'en' ? 'Total Discount (Stacking)' : 'Descuento Total (Acumulativo)'}
          </div>
          {freeShipping && (
            <div className="mt-2 text-sm font-semibold text-blue-600">
              🚚 {language === 'en' ? 'FREE SHIPPING!' : 'ENVÍO GRATIS!'}
            </div>
          )}
        </div>
      </div>

      <ReferralStats 
        referralCount={referralCount}
        referralDiscount={referralDiscount}
        language={language}
      />

      <ReferralInputs
        referralCode={userProfile.referral_code}
        referralLink={referralLink}
        onCopyCode={copyReferralCode}
        onCopyLink={copyReferralLink}
        onShareLink={shareReferralLink}
        language={language}
      />

      {showDetails && (
        <ReferralDetails
          language={language}
          referralDiscount={referralDiscount}
          spendingDiscount={spendingDiscount}
          referredSpendingDiscount={referredSpendingDiscount}
          totalDiscount={totalDiscount}
          freeShipping={freeShipping}
        />
      )}
    </div>
  );
};

export default ReferralSection;
