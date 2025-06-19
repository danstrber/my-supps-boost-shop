
import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  language: 'en' | 'es';
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderId,
  language
}) => {
  if (!isOpen) return null;

  const text = {
    en: {
      title: '🎉 Order Confirmed!',
      subtitle: 'Your order has been successfully submitted',
      orderNumber: 'Order Number',
      message: 'We have received your order and will verify your Bitcoin payment within 24 hours.',
      telegram: 'Join our Telegram group for faster replies and 1-on-1 communications:',
      telegramButton: 'Join Telegram Group',
      email: 'A confirmation email has been sent to your email address.',
      close: 'Close'
    },
    es: {
      title: '🎉 ¡Pedido Confirmado!',
      subtitle: 'Tu pedido ha sido enviado exitosamente',
      orderNumber: 'Número de Pedido',
      message: 'Hemos recibido tu pedido y verificaremos tu pago de Bitcoin en 24 horas.',
      telegram: 'Únete a nuestro grupo de Telegram para respuestas más rápidas y comunicaciones 1 a 1:',
      telegramButton: 'Unirse al Grupo de Telegram',
      email: 'Se ha enviado un email de confirmación a tu dirección de correo.',
      close: 'Cerrar'
    }
  };

  const t = text[language];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full mx-4 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
          <p className="text-green-100 text-lg">{t.subtitle}</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">{t.orderNumber}:</p>
            <p className="text-2xl font-bold text-gray-800 bg-gray-100 p-3 rounded-lg font-mono">
              #{orderId}
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700 text-center">{t.message}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm mb-3">{t.telegram}</p>
              <button
                onClick={() => window.open('https://t.me/DANSTRBER', '_blank')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t.telegramButton}
              </button>
            </div>
            
            <p className="text-green-700 text-sm text-center bg-green-50 p-3 rounded-lg">
              {t.email}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
