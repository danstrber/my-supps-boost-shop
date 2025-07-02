
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
  currentCartTotal?: number; // Add cart total prop for spending discount calculation
}

const ReferralSection = ({ 
  userProfile, 
  language, 
  referralCount, 
  onPageChange,
  currentCartTotal = 0 
}: ReferralSectionProps) => {
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

  // CORRECTED DISCOUNT CALCULATION
  // Each referral: 2.5%
  const referralDiscount = referralCount * 2.5;
  
  // If user has made referrals, they become a referrer and use referrer spending rules
  const isReferrer = referralCount > 0;
  
  // First time referral bonus = 10%
  const firstReferralBonus = userProfile.referred_by ? 10 : 0;
  
  // Spending discount based on CURRENT CART AMOUNT (not historical spending)
  // ALL users have $150 spending cap per purchase for personal spending discounts
  const cartSpendingCap = Math.min(currentCartTotal, 150); // Cap cart calculation at $150
  const spendingTiers = Math.ceil(cartSpendingCap / 50); // Round UP to nearest $50
  
  // Referrers get 5% per $50 of referred spending (based on total referred_spending)
  const referredSpendingDiscount = isReferrer
    ? Math.min(Math.floor(Math.ceil(userProfile.referred_spending || 0) / 50) * 5, 15) // Max 15% (3 tiers × 5%)
    : 0;
  
  // Personal spending discount based on CURRENT CART AMOUNT (capped at $150)
  let spendingDiscount = 0;
  if (isReferrer) {
    // Referrers: 5% per $50 in cart (max 15% at 3 tiers = $150)
    spendingDiscount = Math.min(spendingTiers * 5, 15);
  } else if (userProfile.referred_by) {
    // Referred users: 6.5% per $50 in cart (max 19.5% at 3 tiers = $150)
    spendingDiscount = Math.min(spendingTiers * 6.5, 19.5);
  } else {
    // Standard users: 2.5% per $50 in cart (max 7.5% at 3 tiers = $150)
    spendingDiscount = Math.min(spendingTiers * 2.5, 7.5);
  }
  
  // Get saved discount from previous purchases (NEW FEATURE)
  const savedDiscount = userProfile.saved_discount_percentage || 0;
  
  // Calculate total available discount (all sources)
  const totalEarnedDiscount = referralDiscount + spendingDiscount + referredSpendingDiscount + firstReferralBonus;
  const totalAvailableDiscount = Math.min(totalEarnedDiscount + savedDiscount, 32); // Cap at 32%

  // Free shipping at $100 for EVERYONE
  const freeShippingThreshold = 100;
  const freeShipping = currentCartTotal >= freeShippingThreshold;

  console.log('ReferralSection discount calculation:', {
    currentCartTotal,
    cartSpendingCap,
    spendingTiers,
    userType: isReferrer ? 'referrer' : (userProfile.referred_by ? 'referred' : 'standard'),
    spendingDiscount,
    referralDiscount,
    firstReferralBonus,
    savedDiscount,
    totalEarnedDiscount,
    totalAvailableDiscount
  });

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
          <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{totalAvailableDiscount.toFixed(1)}%</div>
          <div className="text-xs md:text-sm text-gray-600">
            {language === 'en' ? 'Total Available Discount (Max 32%)' : 'Descuento Total Disponible (Máx 32%)'}
          </div>
          
          {/* Show breakdown if there are saved discounts OR if user has active cart */}
          {(savedDiscount > 0 || currentCartTotal > 0) && (
            <div className="mt-2 text-xs text-blue-600 bg-blue-50 rounded-lg p-2">
              <div className="font-semibold mb-1">💰 {language === 'en' ? 'Discount Breakdown:' : 'Desglose de Descuentos:'}</div>
              {currentCartTotal > 0 && <div>Cart Spending ({userProfile.referred_by ? 'Referred' : 'Standard'}): {spendingDiscount.toFixed(1)}%</div>}
              {referralDiscount > 0 && <div>Referral Bonuses: {referralDiscount.toFixed(1)}%</div>}
              {firstReferralBonus > 0 && <div>First Referral Bonus: {firstReferralBonus.toFixed(1)}%</div>}
              {savedDiscount > 0 && <div>Saved from Previous: {savedDiscount.toFixed(1)}%</div>}
            </div>
          )}
          
          {freeShipping && (
            <div className="mt-2 text-sm font-semibold text-blue-600">
              🚚 {language === 'en' ? 'FREE SHIPPING!' : 'ENVÍO GRATIS!'}
            </div>
          )}
          {!freeShipping && currentCartTotal > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              {language === 'en' 
                ? `Add $${(freeShippingThreshold - currentCartTotal).toFixed(2)} more for free shipping!`
                : `¡Agrega $${(freeShippingThreshold - currentCartTotal).toFixed(2)} más para envío gratis!`
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
          <li>• {language === 'en' ? 'Personal spending: Based on current cart amount (max $150)' : 'Gastos personales: Basado en el monto actual del carrito (máx $150)'}</li>
          <li>• {language === 'en' ? 'Standard: 2.5% per $50 (max 7.5%) | Referred: 6.5% per $50 (max 19.5%) | Referrers: 5% per $50 (max 15%)' : 'Estándar: 2.5% por $50 (máx 7.5%) | Referidos: 6.5% por $50 (máx 19.5%) | Referidores: 5% por $50 (máx 15%)'}</li>
          <li>• {language === 'en' ? '💰 NEW: Unused discounts are saved for future purchases!' : '💰 NUEVO: ¡Los descuentos no utilizados se guardan para futuras compras!'}</li>
          <li>• {language === 'en' ? 'Free shipping at $100 for everyone' : 'Envío gratis a $100 para todos'}</li>
        </ul>
      </div>

      {showDetails && (
        <ReferralDetails
          language={language}
          referralDiscount={referralDiscount}
          spendingDiscount={spendingDiscount}
          referredSpendingDiscount={referredSpendingDiscount}
          totalDiscount={totalAvailableDiscount}
          freeShipping={freeShipping}
          freeShippingThreshold={freeShippingThreshold}
          isReferrer={isReferrer}
          firstReferralBonus={firstReferralBonus}
          savedDiscount={savedDiscount}
          currentCartTotal={currentCartTotal}
        />
      )}
    </div>
  );
};

export default ReferralSection;
