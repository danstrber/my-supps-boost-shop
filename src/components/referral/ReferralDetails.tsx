
import React from 'react';

interface ReferralDetailsProps {
  language: 'en' | 'es';
  referralDiscount: number;
  spendingDiscount: number;
  referredSpendingDiscount: number;
  totalDiscount: number;
  freeShipping: boolean;
  freeShippingThreshold: number;
  isReferrer: boolean;
  firstReferralBonus: number;
}

const ReferralDetails = ({ 
  referralDiscount, 
  spendingDiscount, 
  referredSpendingDiscount, 
  totalDiscount, 
  freeShipping,
  freeShippingThreshold,
  isReferrer,
  firstReferralBonus
}: ReferralDetailsProps) => {
  return (
    <div className="space-y-3 text-sm">
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">💰 Complete Referral Rules for Everyone</h4>
        
        {/* Basic Referral Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">🎁 Basic Referral Bonuses:</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• First referral signup: +10% discount</li>
            <li>• Each additional referral: +2.5% discount</li>
            <li>• No limit on number of referrals</li>
          </ul>
        </div>

        {/* Spending Discounts by User Type */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">💳 Spending Discounts by User Type:</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>Standard Users:</strong> 2.5% per $50 spent (rounded up)</li>
            <li>• <strong>Referred Users:</strong> 6.5% per $50 spent (max at $150 total spending)</li>
            <li>• <strong>Referrers (Personal):</strong> 5% per $50 spent personally (rounded up)</li>
            <li>• <strong>Referrers (From Referrals):</strong> 5% per $50 of referral spending</li>
          </ul>
        </div>

        {/* Stacking Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">🔄 How Discounts Stack:</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>ALL discounts STACK together</strong></li>
            <li>• Maximum total discount: 32%</li>
            <li>• <strong>Referred users max out at $150 total spending</strong></li>
            <li>• After $150, referred users only get personal referral bonuses</li>
          </ul>
        </div>

        {/* Shipping Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">🚚 Free Shipping Rules:</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• Free shipping at $100+ for EVERYONE</li>
            <li>• Otherwise: $10 shipping fee</li>
          </ul>
        </div>

        {/* Special Rules */}
        <div>
          <h5 className="font-medium text-green-700 mb-1">⚠️ Special Rules:</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• Referred users spending discounts cap at $150 total spending</li>
            <li>• All spending amounts are rounded UP to nearest dollar for calculations</li>
            <li>• Users keep their discount levels permanently once earned</li>
            <li>• When referred users start referring, they use referrer spending rules (5% per $50)</li>
            <li>• Standard users who haven't been referred get 2.5% per $50 spent</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">📊 Your Current Discounts:</h4>
        <div className="space-y-1 text-gray-700">
          {firstReferralBonus > 0 && (
            <div>First Referral Bonus: <strong>{firstReferralBonus.toFixed(1)}%</strong></div>
          )}
          <div>Referral Bonuses: <strong>{referralDiscount.toFixed(1)}%</strong></div>
          <div>Your Spending Discount: <strong>{spendingDiscount}%</strong></div>
          {isReferrer && (
            <div>Referrals Spending Bonus: <strong>{referredSpendingDiscount}%</strong></div>
          )}
          <div className="pt-2 border-t"><strong>Total Discount: {totalDiscount.toFixed(1)}%</strong></div>
          {freeShipping && <div className="text-blue-600"><strong>🚚 FREE SHIPPING</strong></div>}
          {!freeShipping && (
            <div className="text-orange-600">
              <strong>📦 Need ${freeShippingThreshold} for free shipping</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralDetails;
