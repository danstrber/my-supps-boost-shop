
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
        
        <div className="text-center">
          <p className="text-gray-700 text-lg">
            {language === 'en' 
              ? 'Contact us via Telegram for shipping details and tracking information.'
              : 'Contáctanos via Telegram para detalles de envío e información de seguimiento.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
