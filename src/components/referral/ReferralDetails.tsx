
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
        <h4 className="font-semibold text-green-800 mb-2">💰 {language === 'en' ? 'Complete Referral Rules for Everyone' : 'Reglas Completas de Referidos para Todos'}</h4>
        
        {/* Basic Referral Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '🎁 Basic Referral Bonuses:' : '🎁 Bonos Básicos de Referidos:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• {language === 'en' ? 'Each successful referral: +2.5% discount' : 'Cada referido exitoso: +2.5% descuento'}</li>
            <li>• {language === 'en' ? 'No limit on number of referrals' : 'Sin límite en número de referidos'}</li>
            <li>• {language === 'en' ? 'Referral bonuses cap at 12.5% (5 referrals max effective)' : 'Bonos de referidos máximo 12.5% (5 referidos máximo efectivo)'}</li>
          </ul>
        </div>

        {/* Spending Discounts by User Type */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '💳 Spending Discounts by User Type:' : '💳 Descuentos por Gastos según Tipo de Usuario:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>{language === 'en' ? 'Normal Users:' : 'Usuarios Normales:'}</strong> {language === 'en' ? '2% per $50 spent (rounded up)' : '2% por $50 gastados (redondeado)'}</li>
            <li>• <strong>{language === 'en' ? 'Referred Users:' : 'Usuarios Referidos:'}</strong> {language === 'en' ? '6.5% per $50 spent (rounded up)' : '6.5% por $50 gastados (redondeado)'}</li>
            <li>• <strong>{language === 'en' ? 'Referrers (Personal):' : 'Referidores (Personal):'}</strong> {language === 'en' ? '2% per $50 spent personally (rounded up)' : '2% por $50 gastados personalmente (redondeado)'}</li>
            <li>• <strong>{language === 'en' ? 'Referrers (From Referrals):' : 'Referidores (De Referidos):'}</strong> {language === 'en' ? '5% per $50 of referral spending (max 19.5%)' : '5% por $50 de gastos de referidos (máx 19.5%)'}</li>
          </ul>
        </div>

        {/* Stacking Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '🔄 How Discounts Stack:' : '🔄 Cómo se Acumulan los Descuentos:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• <strong>{language === 'en' ? 'ALL discounts STACK together' : 'TODOS los descuentos se ACUMULAN'}</strong></li>
            <li>• {language === 'en' ? 'Maximum total discount: 32%' : 'Descuento total máximo: 32%'}</li>
            <li>• <strong>{language === 'en' ? 'Over 25% discounts only on orders $135+' : 'Descuentos sobre 25% solo en pedidos $135+'}</strong></li>
            <li>• {language === 'en' ? 'Example: 12.5% referral + 19.5% spending = 32% total' : 'Ejemplo: 12.5% referidos + 19.5% gastos = 32% total'}</li>
          </ul>
        </div>

        {/* Shipping Rules */}
        <div className="mb-3">
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '🚚 Free Shipping Rules:' : '🚚 Reglas de Envío Gratis:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• {language === 'en' ? 'Normal/Referred users: Free shipping at $100+' : 'Usuarios normales/referidos: Envío gratis a $100+'}</li>
            <li>• {language === 'en' ? 'Referrers: Free shipping at $110+' : 'Referidores: Envío gratis a $110+'}</li>
            <li>• {language === 'en' ? 'Otherwise: $10 shipping fee' : 'De lo contrario: $10 de envío'}</li>
          </ul>
        </div>

        {/* Special Rules */}
        <div>
          <h5 className="font-medium text-green-700 mb-1">{language === 'en' ? '⚠️ Special Rules:' : '⚠️ Reglas Especiales:'}</h5>
          <ul className="space-y-1 text-gray-700 ml-2">
            <li>• {language === 'en' ? 'Referred users reset to base discount after first purchase' : 'Usuarios referidos se reinician a descuento base después de primera compra'}</li>
            <li>• {language === 'en' ? 'All spending amounts are rounded UP to nearest dollar for calculations' : 'Todos los montos de gastos se redondean HACIA ARRIBA para cálculos'}</li>
            <li>• {language === 'en' ? 'Referrer bonuses from referral spending capped at 19.5%' : 'Bonos de referidores por gastos de referidos limitados a 19.5%'}</li>
            <li>• {language === 'en' ? 'Users keep their discount levels permanently once earned' : 'Los usuarios mantienen sus niveles de descuento permanentemente una vez obtenidos'}</li>
          </ul>
        </div>
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
