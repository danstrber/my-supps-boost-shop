
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
}

const ReferralDetails = ({ 
  language, 
  referralDiscount, 
  spendingDiscount, 
  referredSpendingDiscount, 
  totalDiscount, 
  freeShipping,
  freeShippingThreshold,
  isReferrer
}: ReferralDetailsProps) => {
  return (
    <div className="space-y-3 text-sm">
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'Detailed Rules' : 'Reglas Detalladas'}:</h4>
        <ul className="space-y-1 text-gray-700">
          <li>• {language === 'en' ? 'First referral signup: 10% discount' : 'Primer registro de referido: 10% descuento'}</li>
          <li>• {language === 'en' ? 'Each additional referral: +2.25%' : 'Cada referido adicional: +2.25%'}</li>
          <li>• {language === 'en' ? 'Referrers earn: 3% per $50 spent by referrals' : 'Referidores ganan: 3% por cada $50 de referidos'}</li>
          <li>• {language === 'en' ? 'Referrers earn: 4.25% per $50 spent personally' : 'Referidores ganan: 4.25% por cada $50 personal'}</li>
          <li>• {language === 'en' ? 'Normal users: 2% per $50 spent' : 'Usuarios normales: 2% por cada $50'}</li>
          <li>• {language === 'en' ? 'Referred users: 6.5% per $75 spent' : 'Usuarios referidos: 6.5% por cada $75'}</li>
          <li>• {language === 'en' ? 'Free shipping: $100 (referrers: $110)' : 'Envío gratis: $100 (referidores: $110)'}</li>
          <li><strong>• {language === 'en' ? 'All discounts STACK (max 30%)' : 'Todos los descuentos se ACUMULAN (máx 30%)'}</strong></li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">📊 {language === 'en' ? 'Your Current Discounts' : 'Tus Descuentos Actuales'}:</h4>
        <div className="space-y-1 text-gray-700">
          <div>{language === 'en' ? 'Referral Bonuses' : 'Bonos de Referidos'}: <strong>{referralDiscount.toFixed(1)}%</strong></div>
          <div>{language === 'en' ? 'Your Spending Discount' : 'Descuento por tus Compras'}: <strong>{spendingDiscount}%</strong></div>
          {isReferrer && (
            <div>{language === 'en' ? 'Referrals Spending Bonus' : 'Bono por Compras de Referidos'}: <strong>{referredSpendingDiscount}%</strong></div>
          )}
          <div className="pt-2 border-t"><strong>{language === 'en' ? 'Total Discount' : 'Descuento Total'}: {totalDiscount.toFixed(1)}%</strong></div>
          {freeShipping && <div className="text-blue-600"><strong>🚚 {language === 'en' ? 'FREE SHIPPING' : 'ENVÍO GRATIS'}</strong></div>}
          {!freeShipping && (
            <div className="text-orange-600">
              <strong>📦 {language === 'en' ? `Need $${freeShippingThreshold} for free shipping` : `Necesitas $${freeShippingThreshold} para envío gratis`}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralDetails;
