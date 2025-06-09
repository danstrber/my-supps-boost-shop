
import React from 'react';
import { Users, TrendingUp } from 'lucide-react';

interface ReferralStatsProps {
  referralCount: number;
  referralDiscount: number;
  language: 'en' | 'es';
}

const ReferralStats = ({ referralCount, referralDiscount, language }: ReferralStatsProps) => {
  return (
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
  );
};

export default ReferralStats;
