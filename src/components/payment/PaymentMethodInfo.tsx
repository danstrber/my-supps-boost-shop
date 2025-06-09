
import React from 'react';

interface PaymentMethodInfoProps {
  paymentMethod: 'telegram' | 'bitcoin';
  language: 'en' | 'es';
}

const PaymentMethodInfo = ({ paymentMethod, language }: PaymentMethodInfoProps) => {
  switch (paymentMethod) {
    case 'telegram':
      return (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            💬 {language === 'en' ? 'Telegram Ordering' : 'Pedidos por Telegram'}
          </h4>
          <p className="text-blue-700 text-sm mb-3">
            {language === 'en' 
              ? 'Order through our Telegram group for the easiest experience:'
              : 'Ordena a través de nuestro grupo de Telegram para la experiencia más fácil:'
            }
          </p>
          <ul className="text-blue-700 text-sm space-y-1 mb-3">
            <li>✅ {language === 'en' ? 'Easy order tracking' : 'Seguimiento fácil de pedidos'}</li>
            <li>✅ {language === 'en' ? 'Anonymous ordering' : 'Pedidos anónimos'}</li>
            <li>✅ {language === 'en' ? 'Direct communication' : 'Comunicación directa'}</li>
            <li>✅ {language === 'en' ? 'Expert coaching available' : 'Coaching experto disponible'}</li>
            <li>✅ {language === 'en' ? 'Fast support' : 'Soporte rápido'}</li>
          </ul>
          <p className="text-blue-600 text-xs">
            {language === 'en'
              ? 'Click "Complete Order" to join our Telegram group and place your order there.'
              : 'Haz clic en "Completar Pedido" para unirte a nuestro grupo de Telegram y hacer tu pedido allí.'
            }
          </p>
        </div>
      );
    case 'bitcoin':
      return (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">
            ₿ {language === 'en' ? 'Bitcoin Payment' : 'Pago con Bitcoin'}
          </h4>
          <p className="text-orange-700 text-sm mb-2">
            {language === 'en'
              ? 'Pay with Bitcoin for maximum privacy and security.'
              : 'Paga con Bitcoin para máxima privacidad y seguridad.'
            }
          </p>
          <p className="text-orange-600 text-xs">
            {language === 'en'
              ? 'You will receive our wallet address and the exact amount to send after entering your shipping information.'
              : 'Recibirás nuestra dirección de billetera y la cantidad exacta a enviar después de ingresar tu información de envío.'
            }
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentMethodInfo;
