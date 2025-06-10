
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
        <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'How It Works' : 'Cómo Funciona'}:</h4>
        <ul className="space-y-1 text-gray-700">
          <li>• {language === 'en' ? 'Get 2.5% discount when someone signs up with your code' : 'Obtén 2.5% descuento cuando alguien se registre con tu código'}</li>
          <li>• {language === 'en' ? 'Referrer gets: 2% per $50 spent by referred users' : 'Referidor obtiene: 2% por cada $50 gastados por usuarios referidos'}</li>
          <li>• {language === 'en' ? 'Referrer gets: 1.75% per $50 spent personally' : 'Referidor obtiene: 1.75% por cada $50 gastados personalmente'}</li>
          <li>• {language === 'en' ? 'Normal users: 2% per $50 spent' : 'Usuarios normales: 2% por cada $50 gastados'}</li>
          <li>• {language === 'en' ? 'Referred users: 6% per $75 spent' : 'Usuarios referidos: 6% por cada $75 gastados'}</li>
          <li>• {language === 'en' ? 'Normal/Referred: FREE shipping at $100' : 'Normal/Referidos: ENVÍO GRATIS a $100'}</li>
          <li>• {language === 'en' ? 'Referrers: FREE shipping at $101' : 'Referidores: ENVÍO GRATIS a $101'}</li>
          <li>• {language === 'en' ? 'Shipping fee: $10' : 'Costo de envío: $10'}</li>
          <li><strong>• {language === 'en' ? 'All discounts STACK (cumulative up to 30% max)' : 'Todos los descuentos se ACUMULAN (acumulativo hasta 30% máximo)'}</strong></li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">📊 {language === 'en' ? 'Your Discount Breakdown' : 'Desglose de tus Descuentos'}:</h4>
        <div className="space-y-1 text-gray-700">
          <div>{language === 'en' ? 'Referral Signup Bonus' : 'Bono por Registro de Referido'}: <strong>{referralDiscount}%</strong></div>
          <div>{language === 'en' ? 'Personal Spending Discount' : 'Descuento por Gasto Personal'}: <strong>{spendingDiscount}%</strong></div>
          <div>{language === 'en' ? 'Referred Users Spending Discount' : 'Descuento por Gasto de Usuarios Referidos'}: <strong>{referredSpendingDiscount}%</strong></div>
          <div>{language === 'en' ? 'Personal Referrer Spending Bonus' : 'Bono Personal de Referidor'}: <strong>{personalReferrerDiscount.toFixed(2)}%</strong></div>
          <div className="pt-2 border-t"><strong>{language === 'en' ? 'Total Stacked Discount' : 'Descuento Total Acumulado'}: {totalDiscount}%</strong></div>
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
