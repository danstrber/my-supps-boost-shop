
import React from 'react';

interface ReferralDetailsProps {
  language: 'en' | 'es';
  referralDiscount: number;
  spendingDiscount: number;
  referredSpendingDiscount: number;
  totalDiscount: number;
  freeShipping: boolean;
}

const ReferralDetails = ({ 
  language, 
  referralDiscount, 
  spendingDiscount, 
  referredSpendingDiscount, 
  totalDiscount, 
  freeShipping 
}: ReferralDetailsProps) => {
  return (
    <div className="space-y-3 text-sm">
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'How It Works' : 'Cómo Funciona'}:</h4>
        <ul className="space-y-1 text-gray-700">
          <li>• {language === 'en' ? 'First referral: 10% discount' : 'Primer referido: 10% descuento'}</li>
          <li>• {language === 'en' ? 'Referrer gets: 5% per $50 spent by referred users' : 'Referidor obtiene: 5% por cada $50 gastados por usuarios referidos'}</li>
          <li>• {language === 'en' ? 'Referrer gets: 1.75% per $50 spent personally' : 'Referidor obtiene: 1.75% por cada $50 gastados personalmente'}</li>
          <li>• {language === 'en' ? 'Normal users: 2% per $50 spent' : 'Usuarios normales: 2% por cada $50 gastados'}</li>
          <li>• {language === 'en' ? 'Referred users: 6% per $75 spent' : 'Usuarios referidos: 6% por cada $75 gastados'}</li>
          <li>• {language === 'en' ? 'Everyone: FREE shipping after $100' : 'Todos: ENVÍO GRATIS después de $100'}</li>
          <li><strong>• {language === 'en' ? 'All discounts STACK (cumulative up to 30% max)' : 'Todos los descuentos se ACUMULAN (acumulativo hasta 30% máximo)'}</strong></li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">📊 {language === 'en' ? 'Your Discount Breakdown' : 'Desglose de tus Descuentos'}:</h4>
        <div className="space-y-1 text-gray-700">
          <div>{language === 'en' ? 'Referral Discount' : 'Descuento por Referidos'}: <strong>{referralDiscount}%</strong></div>
          <div>{language === 'en' ? 'Spending Discount' : 'Descuento por Gasto'}: <strong>{spendingDiscount}%</strong></div>
          <div>{language === 'en' ? 'Referred Spending Discount' : 'Descuento por Gasto de Referidos'}: <strong>{referredSpendingDiscount.toFixed(2)}%</strong></div>
          <div className="pt-2 border-t"><strong>{language === 'en' ? 'Total Stacked Discount' : 'Descuento Total Acumulado'}: {totalDiscount}%</strong></div>
          {freeShipping && <div className="text-blue-600"><strong>🚚 {language === 'en' ? 'FREE SHIPPING' : 'ENVÍO GRATIS'}</strong></div>}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">💡 {language === 'en' ? 'Examples' : 'Ejemplos'}:</h4>
        <div className="space-y-2 text-xs text-gray-700">
          <div><strong>{language === 'en' ? 'Normal User' : 'Usuario Normal'}:</strong> {language === 'en' ? '$100 spent = 4% discount + FREE shipping' : '$100 gastados = 4% descuento + envío GRATIS'}</div>
          <div><strong>{language === 'en' ? 'Referred User' : 'Usuario Referido'}:</strong> {language === 'en' ? '$150 spent = 12% discount + FREE shipping' : '$150 gastados = 12% descuento + envío GRATIS'}</div>
          <div><strong>{language === 'en' ? 'Referrer (3 refs)' : 'Referidor (3 refs)'}:</strong> {language === 'en' ? '10% signup + personal spending + referred spending (stacked)' : '10% registro + gasto personal + gasto de referidos (acumulado)'}</div>
          <div><strong>{language === 'en' ? 'Power User' : 'Usuario Avanzado'}:</strong> {language === 'en' ? '5 referrals (10%) + $200 spent (7%) + $500 referred (17.5%) = 30% max' : '5 referidos (10%) + $200 gastados (7%) + $500 referidos (17.5%) = 30% máx'}</div>
        </div>
      </div>
    </div>
  );
};

export default ReferralDetails;
