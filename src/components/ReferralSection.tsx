
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Users, DollarSign, Gift, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/lib/auth';
import { translations } from '@/lib/translations';

interface ReferralSectionProps {
  userProfile: UserProfile;
  language: 'en' | 'es';
  referralCount: number;
}

const ReferralSection = ({ userProfile, language, referralCount }: ReferralSectionProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  const t = translations[language];

  const referralLink = `${window.location.origin}?ref=${userProfile.referral_code}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  // Calculate current discount
  const referralDiscount = referralCount > 0 ? Math.min(10 + (referralCount - 1) * 4, 25) : 0;
  const spendingDiscount = userProfile.referred_by 
    ? Math.floor(userProfile.total_spending / 50) * 8  // Increased from 6% to 8% per $50
    : Math.floor(userProfile.referred_spending / 50) * 2;
  const totalDiscount = Math.min(referralDiscount + spendingDiscount, 30);

  return (
    <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-green-800 flex items-center">
          <Gift className="h-6 w-6 mr-2" />
          Referral Program
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-green-700 hover:text-green-900"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </Button>
      </div>

      {/* Current Discount Display */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">{totalDiscount}%</div>
          <div className="text-sm text-gray-600">Current Total Discount</div>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
          <Users className="h-5 w-5 mx-auto mb-1 text-green-600" />
          <div className="text-lg font-semibold text-gray-800">{referralCount}</div>
          <div className="text-xs text-gray-600">Referrals</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-green-200 text-center">
          <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
          <div className="text-lg font-semibold text-gray-800">{referralDiscount}%</div>
          <div className="text-xs text-gray-600">Referral Bonus</div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-green-800 mb-2">
          Your Referral Link:
        </label>
        <div className="flex gap-2">
          <Input
            value={referralLink}
            readOnly
            className="flex-1 bg-white border-green-300 text-sm"
          />
          <Button
            onClick={copyReferralLink}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">💰 How It Works:</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• First referral: <strong>10% discount</strong></li>
              <li>• Each additional referral: <strong>+4% discount</strong></li>
              <li>• Referral discount cap: <strong>25%</strong></li>
              <li>• If you were referred: <strong>8% per $50 spent</strong></li>
              <li>• If you refer others: <strong>2% per $50 they spend</strong></li>
              <li>• Maximum total discount: <strong>30%</strong></li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">📊 Your Stats:</h4>
            <div className="space-y-1 text-gray-700">
              <div>Referral Code: <strong>{userProfile.referral_code}</strong></div>
              <div>Total Spending: <strong>${userProfile.total_spending.toFixed(2)}</strong></div>
              <div>Referred Spending: <strong>${userProfile.referred_spending.toFixed(2)}</strong></div>
              <div>Spending Discount: <strong>{spendingDiscount}%</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralSection;
