
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
  savedDiscount?: number;
  currentCartTotal?: number;
}

const ReferralDetails = ({ 
  referralDiscount, 
  spendingDiscount, 
  referredSpendingDiscount, 
  totalDiscount, 
  freeShipping,
  freeShippingThreshold,
  isReferrer,
  firstReferralBonus,
  savedDiscount = 0,
  currentCartTotal = 0
}: ReferralDetailsProps) => {
  return (
    <div className="space-y-3 text-sm">
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">💰 Complete Referral Rules with Discount Banking</h4>
        
        {/* NEW: Discount Banking System */}
        <div className="mb-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
          <h5 className="font-medium text-purple-700 mb-1">🏦 NEW: Discount Banking System:</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>Save unused discounts:</strong> If you earn 60% but only use 32%, the remaining 28% is saved</li>
            <li>• <strong>Carry over to future purchases:</strong> Saved discounts can be used on any future order</li>
            <li>• <strong>No expiration:</strong> Your saved discounts never expire</li>
            <li>• <strong>Smart usage:</strong> System automatically applies best combination of current + saved discounts</li>
            <li>• <strong>Maximum still applies:</strong> Total discount still capped at 32% per purchase</li>
          </ul>
        </div>

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
            <li>• <strong>Standard Users:</strong> 2.5% per $50 in current cart (max $150 cart)</li>
            <li>• <strong>Referred Users:</strong> 6.5% per $50 in current cart (max $150 cart)</li>
            <li>• <strong>Referrers (Personal):</strong> 5% per $50 in current cart (max $150 cart)</li>
            <li>• <strong>Referrers (From Referrals):</strong> 5% per $50 of total referral spending</li>
          </ul>
        </div>

        {/* Stacking Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">🔄 How Discounts Stack:</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>ALL discounts STACK together</strong></li>
            <li>• Maximum total discount: 32% per purchase</li>
            <li>• <strong>ALL users have $150 spending cap per purchase</strong></li>
            <li>• Personal spending discounts based on CURRENT CART amount</li>
            <li>• <strong>NEW: Unused discount percentages are saved for future use</strong></li>
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
            <li>• <strong>Personal spending discounts are based on current cart amount, NOT historical spending</strong></li>
            <li>• <strong>ALL users have $150 spending cap per purchase for personal spending calculations</strong></li>
            <li>• All cart amounts are rounded UP to nearest dollar for calculations</li>
            <li>• Users keep their referral bonuses permanently once earned</li>
            <li>• When referred users start referring, they use referrer spending rules (5% per $50)</li>
            <li>• <strong>NEW: Unused discount percentages carry over to future purchases</strong></li>
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
          <div>Your Cart Spending Discount (${currentCartTotal}): <strong>{spendingDiscount}%</strong></div>
          {isReferrer && (
            <div>Referrals Spending Bonus: <strong>{referredSpendingDiscount}%</strong></div>
          )}
          {savedDiscount > 0 && (
            <div className="text-purple-600 bg-purple-50 p-2 rounded">
              💰 Saved from Previous Purchases: <strong>{savedDiscount.toFixed(1)}%</strong>
            </div>
          )}
          <div className="pt-2 border-t"><strong>Total Available Discount: {totalDiscount.toFixed(1)}%</strong></div>
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
