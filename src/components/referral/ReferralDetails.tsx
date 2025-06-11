
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
  language, 
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
        <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'Complete Referral Rules for Everyone' : 'Reglas Completas de Referidos para Todos'}</h4>
        
        {/* Basic Referral Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '🎁 Basic Referral Bonuses:' : '🎁 Bonos Básicos de Referidos:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• {language === 'en' ? 'First referral signup: +10% discount' : 'Primer registro de referido: +10% descuento'}</li>
            <li>• {language === 'en' ? 'Each additional referral: +2.5% discount' : 'Cada referido adicional: +2.5% descuento'}</li>
            <li>• {language === 'en' ? 'No limit on number of referrals' : 'Sin límite en número de referidos'}</li>
          </ul>
        </div>

        {/* Spending Discounts by User Type */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '💳 Spending Discounts by User Type:' : '💳 Descuentos por Gastos según Tipo de Usuario:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>{language === 'en' ? 'Normal Users:' : 'Usuarios Normales:'}</strong> {language === 'en' ? '2% per $50 spent (rounded up)' : '2% por $50 gastados (redondeado)'}</li>
            <li>• <strong>{language === 'en' ? 'Referred Users:' : 'Usuarios Referidos:'}</strong> {language === 'en' ? '6.5% per $50 spent (max at $150 total spending)' : '6.5% por $50 gastados (máx en $150 gasto total)'}</li>
            <li>• <strong>{language === 'en' ? 'Referrers (Personal):' : 'Referidores (Personal):'}</strong> {language === 'en' ? '5% per $50 spent personally (rounded up)' : '5% por $50 gastados personalmente (redondeado)'}</li>
            <li>• <strong>{language === 'en' ? 'Referrers (From Referrals):' : 'Referidores (De Referidos):'}</strong> {language === 'en' ? '5% per $50 of referral spending' : '5% por $50 de gastos de referidos'}</li>
          </ul>
        </div>

        {/* Stacking Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '🔄 How Discounts Stack:' : '🔄 Cómo se Acumulan los Descuentos:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>{language === 'en' ? 'ALL discounts STACK together' : 'TODOS los descuentos se ACUMULAN'}</strong></li>
            <li>• {language === 'en' ? 'Maximum total discount: 32%' : 'Descuento total máximo: 32%'}</li>
            <li>• <strong>{language === 'en' ? 'Referred users max out at $150 total spending' : 'Usuarios referidos máximo en $150 gasto total'}</strong></li>
            <li>• {language === 'en' ? 'After $150, referred users only get personal referral bonuses' : 'Después de $150, usuarios referidos solo obtienen bonos de referidos personales'}</li>
          </ul>
        </div>

        {/* Shipping Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '🚚 Free Shipping Rules:' : '🚚 Reglas de Envío Gratis:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• {language === 'en' ? 'Free shipping at $100+ for EVERYONE' : 'Envío gratis a $100+ para TODOS'}</li>
            <li>• {language === 'en' ? 'Otherwise: $10 shipping fee' : 'De lo contrario: $10 de envío'}</li>
          </ul>
        </div>

        {/* Special Rules */}
        <div>
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '⚠️ Special Rules:' : '⚠️ Reglas Especiales:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• {language === 'en' ? 'Referred users spending discounts cap at $150 total spending' : 'Descuentos por gastos de usuarios referidos se limitan a $150 gasto total'}</li>
            <li>• {language === 'en' ? 'All spending amounts are rounded UP to nearest dollar for calculations' : 'Todos los montos de gastos se redondean HACIA ARRIBA para cálculos'}</li>
            <li>• {language === 'en' ? 'Users keep their discount levels permanently once earned' : 'Los usuarios mantienen sus niveles de descuento permanentemente una vez obtenidos'}</li>
            <li>• {language === 'en' ? 'When referred users start referring, they use referrer spending rules (5% per $50)' : 'Cuando usuarios referidos empiezan a referir, usan reglas de referidores (5% por $50)'}</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">📊 {language === 'en' ? 'Your Current Discounts' : 'Tus Descuentos Actuales'}:</h4>
        <div className="space-y-1 text-gray-700">
          {firstReferralBonus > 0 && (
            <div>{language === 'en' ? 'First Referral Bonus' : 'Bono Primer Referido'}: <strong>{firstReferralBonus.toFixed(1)}%</strong></div>
          )}
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
