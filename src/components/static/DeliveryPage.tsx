
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
        <img 
          src="/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png" 
          alt="Shipping Information"
          className="w-full max-w-3xl mx-auto mb-8 rounded-lg shadow-md"
        />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {language === 'en' ? 'Fast & Secure Shipping' : 'Envío Rápido y Seguro'}
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Processing Time' : 'Tiempo de Procesamiento'}
            </h3>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'We will start shipping your order as soon as we receive it. Most orders are processed within 1-2 business days.'
                  : 'Comenzaremos a enviar tu pedido tan pronto como lo recibamos. La mayoría de los pedidos se procesan dentro de 1-2 días hábiles.'}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Shipping Costs' : 'Costos de Envío'}
            </h3>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">💳</span>
                <span className="text-green-800 font-semibold text-lg">
                  {language === 'en' ? 'FREE SHIPPING on orders $100 and above!' : '¡ENVÍO GRATIS en pedidos de $100 y más!'}
                </span>
              </div>
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Standard shipping rates apply for orders under $100.'
                  : 'Las tarifas de envío estándar se aplican para pedidos menores a $100.'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Tracking' : 'Seguimiento'}
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Once your order ships, you will receive tracking information via Telegram or email.'
                  : 'Una vez que tu pedido sea enviado, recibirás información de seguimiento por Telegram o correo electrónico.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
