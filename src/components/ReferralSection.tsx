
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
  onPageChange?: (page: string) => void;
}

const ReferralSection = ({ userProfile, language, referralCount, onPageChange }: ReferralSectionProps) => {
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

  // NEW REFERRAL RULES
  // Each referral: 2.5%
  const referralDiscount = referralCount * 2.5;
  
  // If user has made referrals, they become a referrer and use referrer spending rules
  const isReferrer = referralCount > 0;
  
  // NEW: First time referral bonus = 10%
  const firstReferralBonus = userProfile.referred_by ? 10 : 0;
  
  // Spending discount based on user type - ROUNDING UP RULE
  // NEW: Referrers get 5% per $50 of referred spending (max at $150 total discounts)
  const referredSpendingDiscount = isReferrer
    ? Math.min(Math.floor(Math.ceil(userProfile.referred_spending) / 50) * 5, Math.floor(150 / 50) * 5)  // Referrers: 5% per $50 of referred spending (max at $150)
    : 0;
  
  // NEW RULE: ALL users have $150 spending cap for personal spending discounts
  // Standard users get 2.5% per $50, Referred users get 6.5% per $50, Referrers get 5% per $50
  // ALL CAPPED AT $150 total spending
  const spendingDiscount = isReferrer
    ? Math.min(Math.floor(Math.ceil(userProfile.total_spending) / 50) * 5, Math.floor(150 / 50) * 5)  // Referrers: 5% per $50 spent personally (rounded up) MAX AT $150
    : userProfile.referred_by 
      ? Math.min(Math.floor(Math.ceil(userProfile.total_spending) / 50) * 6.5, Math.floor(150 / 50) * 6.5)  // Referred users: 6.5% per $50 (rounded up) MAX AT $150
      : Math.min(Math.floor(Math.ceil(userProfile.total_spending) / 50) * 2.5, Math.floor(150 / 50) * 2.5); // Standard users: 2.5% per $50 (rounded up) MAX AT $150
  
  // ALL discounts STACK but cap at 32%
  const totalDiscount = Math.min(referralDiscount + spendingDiscount + referredSpendingDiscount + firstReferralBonus, 32);

  // NEW: Free shipping at $100 for EVERYONE
  const freeShippingThreshold = 100;
  const freeShipping = userProfile.total_spending >= freeShippingThreshold;

  // Handle referral link click - just stay on same page since we're already on account
  const handleReferralClick = () => {
    // Do nothing since we're already on the account page
  };

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
          <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{totalDiscount.toFixed(1)}%</div>
          <div className="text-xs md:text-sm text-gray-600">
            {language === 'en' ? 'Total Discount (Max 32%)' : 'Descuento Total (Máx 32%)'}
          </div>
          {freeShipping && (
            <div className="mt-2 text-sm font-semibold text-blue-600">
              🚚 {language === 'en' ? 'FREE SHIPPING!' : 'ENVÍO GRATIS!'}
            </div>
          )}
          {!freeShipping && (
            <div className="mt-2 text-xs text-gray-500">
              {language === 'en' 
                ? `Spend $${(freeShippingThreshold - userProfile.total_spending).toFixed(2)} more for free shipping!`
                : `¡Gasta $${(freeShippingThreshold - userProfile.total_spending).toFixed(2)} más para envío gratis!`
              }
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

      {/* Updated Rules Display */}
      <div className="bg-white rounded-lg p-3 mb-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2 text-sm">
          📋 {language === 'en' ? 'Simple Rules' : 'Reglas Simples'}:
        </h4>
        <ul className="space-y-1 text-xs text-gray-700">
          <li>• {language === 'en' ? 'First referral signup: 10% discount' : 'Primer registro de referido: 10% descuento'}</li>
          <li>• {language === 'en' ? 'Each additional referral: 2.5% discount' : 'Cada referido adicional: 2.5% descuento'}</li>
          <li>• {language === 'en' ? 'Standard users: 2.5% per $50 spent (max $150 total)' : 'Usuarios estándar: 2.5% por cada $50 gastados (máx $150 total)'}</li>
          <li>• {language === 'en' ? 'Referred users: 6.5% per $50 spent (max $150 total)' : 'Usuarios referidos: 6.5% por cada $50 gastados (máx $150 total)'}</li>
          <li>• {language === 'en' ? 'Referrers: 5% per $50 spent + 5% per $50 referral spending (max $150 each)' : 'Referidores: 5% por $50 gastados + 5% por $50 de gastos de referidos (máx $150 cada uno)'}</li>
          <li>• {language === 'en' ? 'Spending discounts reset to 0% after each purchase' : 'Los descuentos por gastos se reinician a 0% después de cada compra'}</li>
          <li>• {language === 'en' ? 'Personal spending discount based on current cart amount' : 'Descuento por gastos personales basado en el monto actual del carrito'}</li>
          <li>• {language === 'en' ? 'Free shipping at $100 for everyone' : 'Envío gratis a $100 para todos'}</li>
        </ul>
      </div>

      {showDetails && (
        <ReferralDetails
          language={language}
          referralDiscount={referralDiscount}
          spendingDiscount={spendingDiscount}
          referredSpendingDiscount={referredSpendingDiscount}
          totalDiscount={totalDiscount}
          freeShipping={freeShipping}
          freeShippingThreshold={freeShippingThreshold}
          isReferrer={isReferrer}
          firstReferralBonus={firstReferralBonus}
        />
      )}
    </div>
  );
};

export default ReferralSection;
