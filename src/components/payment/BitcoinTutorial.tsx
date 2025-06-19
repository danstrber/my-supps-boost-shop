
import React from 'react';
import { AlertCircle, CheckCircle, Shield, Clock } from 'lucide-react';

interface BitcoinTutorialProps {
  language: string;
}

const BitcoinTutorial = ({ language }: BitcoinTutorialProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <AlertCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">
          {language === 'en' ? 'Bitcoin Payment Guide' : 'Guía de Pago con Bitcoin'}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            {language === 'en' ? 'KYC vs Non-KYC Bitcoin Purchase' : 'Compra de Bitcoin KYC vs No-KYC'}
          </h4>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>{language === 'en' ? 'KYC Exchanges (Easier):' : 'Exchanges KYC (Más Fácil):'}</strong> {language === 'en' ? 'Coinbase, Binance, Kraken - require ID verification but offer easy purchasing with credit/debit cards.' : 'Coinbase, Binance, Kraken - requieren verificación de ID pero ofrecen compra fácil con tarjetas de crédito/débito.'}</p>
            <p><strong>{language === 'en' ? 'Non-KYC Options (More Private):' : 'Opciones No-KYC (Más Privado):'}</strong> {language === 'en' ? 'Bisq, LocalBitcoins, Bitcoin ATMs - more anonymous but may require cash or bank transfers.' : 'Bisq, LocalBitcoins, ATMs de Bitcoin - más anónimo pero puede requerir efectivo o transferencias bancarias.'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Step-by-Step Process' : 'Proceso Paso a Paso'}
          </h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>{language === 'en' ? 'Buy Bitcoin from your preferred exchange' : 'Compra Bitcoin en tu exchange preferido'}</li>
            <li>{language === 'en' ? 'Transfer Bitcoin to your personal wallet (recommended for privacy)' : 'Transfiere Bitcoin a tu billetera personal (recomendado para privacidad)'}</li>
            <li>{language === 'en' ? 'Copy our payment address exactly' : 'Copia nuestra dirección de pago exactamente'}</li>
            <li>{language === 'en' ? 'Send the exact Bitcoin amount shown' : 'Envía la cantidad exacta de Bitcoin mostrada'}</li>
            <li>{language === 'en' ? 'Copy the transaction ID from your wallet' : 'Copia el ID de transacción de tu billetera'}</li>
            <li>{language === 'en' ? 'Paste the transaction ID in the next step' : 'Pega el ID de transacción en el siguiente paso'}</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Important Notes' : 'Notas Importantes'}
          </h4>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>{language === 'en' ? 'Bitcoin transactions can take 10-60 minutes to confirm' : 'Las transacciones de Bitcoin pueden tomar 10-60 minutos en confirmarse'}</li>
            <li>{language === 'en' ? 'Send the EXACT amount shown - do not round up or down' : 'Envía la cantidad EXACTA mostrada - no redondees hacia arriba o abajo'}</li>
            <li>{language === 'en' ? 'Double-check the payment address before sending' : 'Verifica dos veces la dirección de pago antes de enviar'}</li>
            <li>{language === 'en' ? 'Keep your transaction ID - you\'ll need it for verification' : 'Guarda tu ID de transacción - lo necesitarás para verificación'}</li>
            <li>{language === 'en' ? 'We manually verify all Bitcoin payments within 24 hours' : 'Verificamos manualmente todos los pagos de Bitcoin dentro de 24 horas'}</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>{language === 'en' ? 'Security Tip:' : 'Consejo de Seguridad:'}</strong> {language === 'en' ? 'For maximum privacy, use a VPN and avoid linking your Bitcoin purchase to personal information.' : 'Para máxima privacidad, usa una VPN y evita vincular tu compra de Bitcoin con información personal.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BitcoinTutorial;
