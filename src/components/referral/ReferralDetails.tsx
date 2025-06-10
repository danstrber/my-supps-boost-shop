
import React from 'react';

interface ReferralDetailsProps {
  language: 'en' | 'es';
  referralDiscount: number;
  spendingDiscount: number;
  referredSpendingDiscount: number;
  personalReferrerDiscount: number;
  totalDiscount: number;
  freeShipping: boolean;
  freeShippingThreshold: number;
}

const ReferralDetails = ({ 
  language, 
  referralDiscount, 
  spendingDiscount, 
  referredSpendingDiscount, 
  personalReferrerDiscount,
  totalDiscount, 
  freeShipping,
  freeShippingThreshold
}: ReferralDetailsProps) => {
  return (
    <div className="space-y-3 text-sm">
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'Simple Rules' : 'Reglas Simples'}:</h4>
        <ul className="space-y-1 text-gray-700">
          <li>• {language === 'en' ? 'First referral: 10% off, each extra: +2.25%' : 'Primer referido: 10% desc, cada extra: +2.25%'}</li>
          <li>• {language === 'en' ? 'Referrers earn 5% per $50 spent by their referrals' : 'Referidores ganan 5% por cada $50 de sus referidos'}</li>
          <li>• {language === 'en' ? 'Referrers earn 2.5% per $50 they spend personally' : 'Referidores ganan 2.5% por cada $50 personal'}</li>
          <li>• {language === 'en' ? 'Regular users: 2% per $50 spent' : 'Usuarios normales: 2% por cada $50'}</li>
          <li>• {language === 'en' ? 'Referred users: 6% per $75 spent' : 'Usuarios referidos: 6% por cada $75'}</li>
          <li>• {language === 'en' ? 'Free shipping at $100 (referrers: $101)' : 'Envío gratis a $100 (referidores: $101)'}</li>
          <li><strong>• {language === 'en' ? 'All discounts stack up to 30%' : 'Todos los descuentos se acumulan hasta 30%'}</strong></li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">📊 {language === 'en' ? 'Your Current Discounts' : 'Tus Descuentos Actuales'}:</h4>
        <div className="space-y-1 text-gray-700">
          <div>{language === 'en' ? 'Referral Bonuses' : 'Bonos de Referidos'}: <strong>{referralDiscount.toFixed(1)}%</strong></div>
          <div>{language === 'en' ? 'Your Spending Discount' : 'Descuento por tus Compras'}: <strong>{spendingDiscount}%</strong></div>
          <div>{language === 'en' ? 'Referrals Spending Bonus' : 'Bono por Compras de Referidos'}: <strong>{referredSpendingDiscount}%</strong></div>
          <div>{language === 'en' ? 'Personal Referrer Bonus' : 'Bono Personal de Referidor'}: <strong>{personalReferrerDiscount.toFixed(1)}%</strong></div>
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
