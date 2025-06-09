
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Users, DollarSign, Gift, TrendingUp, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/auth';
import { translations } from '@/lib/translations';
import { generateReferralLink } from '@/lib/referral';

interface ReferralSectionProps {
  userProfile: UserProfile;
  language: 'en' | 'es';
  referralCount: number;
}

const ReferralSection = ({ userProfile, language, referralCount }: ReferralSectionProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  const t = translations[language];

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

  // Calculate discounts based on NEW corrected system math
  const referralDiscount = referralCount > 0 ? Math.min(10 + (referralCount - 1) * 4, 30) : 0;
  
  const spendingDiscount = userProfile.referred_by 
    ? Math.floor(userProfile.total_spending / 50) * 5  // 5% per $50 for referred users
    : Math.floor(userProfile.total_spending / 50) * 2.5; // 2.5% per $50 for normal users
  
  const referredSpendingDiscount = Math.floor(userProfile.referred_spending / 50) * 2; // 2% per $50 of referred spending
  
  // CUMULATIVE discounts (they stack) but cap at 30%
  const totalDiscount = Math.min(referralDiscount + spendingDiscount + referredSpendingDiscount, 30);

  // Free shipping calculation
  const freeShipping = userProfile.referred_by && userProfile.total_spending >= 100;

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

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
          <Users className="h-4 w-4 md:h-5 md:w-5 mx-auto mb-1 text-green-600" />
          <div className="text-base md:text-lg font-semibold text-gray-800">{referralCount}</div>
          <div className="text-xs text-gray-600">
            {language === 'en' ? 'Referrals' : 'Referidos'}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
          <TrendingUp className="h-4 w-4 md:h-5 md:w-5 mx-auto mb-1 text-green-600" />
          <div className="text-base md:text-lg font-semibold text-gray-800">{referralDiscount}%</div>
          <div className="text-xs text-gray-600">
            {language === 'en' ? 'Referral Bonus' : 'Bono de Referido'}
          </div>
        </div>
      </div>

      {/* Referral Code */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-green-800 mb-2">
          {t.referralCode}:
        </label>
        <div className="flex gap-2">
          <Input
            value={userProfile.referral_code}
            readOnly
            className="flex-1 bg-white border-green-300 text-sm font-mono"
          />
          <Button
            onClick={copyReferralCode}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white px-3"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-green-800 mb-2">
          {t.referralLink}:
        </label>
        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="flex-1 bg-white border-green-300 text-xs"
          />
          <Button
            onClick={copyReferralLink}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white px-3"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            onClick={shareReferralLink}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'How It Works' : 'Cómo Funciona'}:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• {language === 'en' ? 'First referral: 10% discount' : 'Primer referido: 10% descuento'}</li>
              <li>• {language === 'en' ? 'Each additional referral: +4% discount (max 30%)' : 'Cada referido adicional: +4% descuento (máx 30%)'}</li>
              <li>• {language === 'en' ? 'Referred users: 5% per $50 spent + FREE shipping after $100' : 'Usuarios referidos: 5% por cada $50 gastados + ENVÍO GRATIS después de $100'}</li>
              <li>• {language === 'en' ? 'Normal users: 2.5% per $50 spent (no free shipping)' : 'Usuarios normales: 2.5% por cada $50 gastados (sin envío gratis)'}</li>
              <li>• {language === 'en' ? 'Referrers: 2% per $50 of referred spending' : 'Referidores: 2% por cada $50 de gasto de referidos'}</li>
              <li><strong>• {language === 'en' ? 'All discounts STACK (cumulative up to 30% max)' : 'Todos los descuentos se ACUMULAN (acumulativo hasta 30% máximo)'}</strong></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">📊 {language === 'en' ? 'Your Discount Breakdown' : 'Desglose de tus Descuentos'}:</h4>
            <div className="space-y-1 text-gray-700">
              <div>{language === 'en' ? 'Referral Discount' : 'Descuento por Referidos'}: <strong>{referralDiscount}%</strong></div>
              <div>{language === 'en' ? 'Spending Discount' : 'Descuento por Gasto'}: <strong>{spendingDiscount}%</strong></div>
              <div>{language === 'en' ? 'Referred Spending Discount' : 'Descuento por Gasto de Referidos'}: <strong>{referredSpendingDiscount}%</strong></div>
              <div className="pt-2 border-t"><strong>{language === 'en' ? 'Total Stacked Discount' : 'Descuento Total Acumulado'}: {totalDiscount}%</strong></div>
              {freeShipping && <div className="text-blue-600"><strong>🚚 {language === 'en' ? 'FREE SHIPPING' : 'ENVÍO GRATIS'}</strong></div>}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">💡 {language === 'en' ? 'Examples' : 'Ejemplos'}:</h4>
            <div className="space-y-2 text-xs text-gray-700">
              <div><strong>{language === 'en' ? 'Normal User' : 'Usuario Normal'}:</strong> {language === 'en' ? '$150 spent = 7.5% discount + $10 shipping' : '$150 gastados = 7.5% descuento + $10 envío'}</div>
              <div><strong>{language === 'en' ? 'Referred User' : 'Usuario Referido'}:</strong> {language === 'en' ? '$150 spent = 15% discount + FREE shipping' : '$150 gastados = 15% descuento + envío GRATIS'}</div>
              <div><strong>{language === 'en' ? 'Referrer (3 refs)' : 'Referidor (3 refs)'}:</strong> {language === 'en' ? '18% referral + own spending + referred spending (stacked)' : '18% referido + gasto propio + gasto de referidos (acumulado)'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralSection;
