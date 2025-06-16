
import React from 'react';

interface DeliveryPageProps {
  language: 'en' | 'es';
}

const DeliveryPage = ({ language }: DeliveryPageProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Processing Time' : 'Tiempo de Procesamiento'}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === 'en' 
                ? 'We will start shipping your order as soon as we receive it. Most orders are processed within 1-2 business days.'
                : 'Comenzaremos a enviar tu pedido tan pronto como lo recibamos. La mayoría de los pedidos se procesan dentro de 1-2 días hábiles.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Shipping Costs' : 'Costos de Envío'}
            </h2>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-lg font-medium text-green-800">
                    🚚 {language === 'en' ? 'FREE SHIPPING on orders $100 and above!' : '¡ENVÍO GRATIS en pedidos de $100 y más!'}
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              {language === 'en' 
                ? 'Standard shipping rates of $7.50 apply for orders under $100.'
                : 'Las tarifas de envío estándar de $7.50 se aplican para pedidos menores a $100.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Tracking' : 'Seguimiento'}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === 'en' 
                ? 'Once your order ships, you will receive tracking information via Telegram or email.'
                : 'Una vez que tu pedido sea enviado, recibirás información de seguimiento vía Telegram o email.'}
            </p>
          </section>

          <div className="mt-8 text-center bg-blue-50 p-6 rounded-lg">
            <p className="text-blue-700 text-lg font-medium mb-2">
              {language === 'en' ? 'Need Help?' : '¿Necesitas Ayuda?'}
            </p>
            <p className="text-blue-600">
              {language === 'en' 
                ? 'Contact us via Telegram for any shipping questions or concerns.'
                : 'Contáctanos via Telegram para cualquier pregunta o inquietud sobre envíos.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
