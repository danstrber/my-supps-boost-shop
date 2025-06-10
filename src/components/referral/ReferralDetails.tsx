
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
        <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'Current Detailed Rules (NEW!)' : 'Reglas Detalladas Actuales (¡NUEVO!)'}</h4>
        <ul className="space-y-1 text-gray-700">
          <li>• {language === 'en' ? 'Each referral: 2.5% discount' : 'Cada referido: 2.5% descuento'}</li>
          <li>• {language === 'en' ? 'Referrers earn: 5% per $50 of referral spending (max 19.5%)' : 'Referidores ganan: 5% por $50 de gastos de referidos (máx 19.5%)'}</li>
          <li>• {language === 'en' ? 'Referrers earn: 2% per $50 spent personally (rounded up)' : 'Referidores ganan: 2% por $50 personal (redondeado)'}</li>
          <li>• {language === 'en' ? 'Referred users: 6.5% per $50 spent (rounded up)' : 'Usuarios referidos: 6.5% por $50 (redondeado)'}</li>
          <li>• {language === 'en' ? 'Normal users: 2% per $50 spent (rounded up)' : 'Usuarios normales: 2% por $50 (redondeado)'}</li>
          <li>• {language === 'en' ? 'Free shipping: $100 (referrers: $110)' : 'Envío gratis: $100 (referidores: $110)'}</li>
          <li><strong>• {language === 'en' ? 'All discounts STACK (max 32%)' : 'Todos los descuentos se ACUMULAN (máx 32%)'}</strong></li>
          <li><strong>• {language === 'en' ? 'Over 25% discounts only on orders $135+' : 'Descuentos sobre 25% solo en pedidos $135+'}</strong></li>
          <li>• {language === 'en' ? 'Referred users reset to base discount after first purchase' : 'Usuarios referidos se reinician a descuento base después de primera compra'}</li>
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
