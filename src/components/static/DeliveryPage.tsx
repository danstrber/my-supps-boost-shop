
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
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Shipping & Delivery' : 'Envío y Entrega'}
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              {language === 'en' 
                ? 'We provide shipping within the USA and to select international locations. Processing and delivery times vary by location.'
                : 'Proporcionamos envío dentro de EE.UU. y a ubicaciones internacionales selectas. Los tiempos de procesamiento y entrega varían según la ubicación.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {language === 'en' ? 'Processing Time' : 'Tiempo de Procesamiento'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Orders are processed within 24-48 hours of confirmation.'
                  : 'Los pedidos se procesan dentro de 24-48 horas de confirmación.'}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {language === 'en' ? 'Delivery Time' : 'Tiempo de Entrega'}
              </h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-medium">
                  {language === 'en' ? 'USA Domestic:' : 'Nacional EE.UU.:'} 
                  <span className="font-normal ml-1">
                    {language === 'en' ? '3-7 business days' : '3-7 días hábiles'}
                  </span>
                </p>
                <p className="font-medium">
                  {language === 'en' ? 'International:' : 'Internacional:'} 
                  <span className="font-normal ml-1">
                    {language === 'en' ? '7-14 business days' : '7-14 días hábiles'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              {language === 'en' ? 'Shipping Costs' : 'Costos de Envío'}
            </h3>
            <div className="space-y-2 text-blue-700">
              <p>
                <strong>{language === 'en' ? 'USA Domestic:' : 'Nacional EE.UU.:'}</strong> 
                {language === 'en' 
                  ? ' $7.50 - Free shipping on orders over $100'
                  : ' $7.50 - Envío gratis en pedidos superiores a $100'}
              </p>
              <p>
                <strong>{language === 'en' ? 'International:' : 'Internacional:'}</strong> 
                {language === 'en' 
                  ? ' $17.50 - Free shipping on orders over $150'
                  : ' $17.50 - Envío gratis en pedidos superiores a $150'}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {language === 'en' ? 'Tracking & Support' : 'Seguimiento y Soporte'}
            </h3>
            <p className="text-gray-700 text-lg mb-4">
              {language === 'en' 
                ? 'Contact us via Telegram for shipping details and tracking information.'
                : 'Contáctanos via Telegram para detalles de envío e información de seguimiento.'}
            </p>
            <div className="text-center">
              <a 
                href="https://t.me/+fDDZObF0zjI2M2Y0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {language === 'en' ? 'Contact Support' : 'Contactar Soporte'}
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              {language === 'en' ? 'Important Legal Notice' : 'Aviso Legal Importante'}
            </h3>
            <p className="text-yellow-700 text-sm">
              {language === 'en' 
                ? 'These products are intended for research purposes only and are not for human consumption. Must be 18+ to purchase. Not intended to diagnose, treat, cure, or prevent any disease.'
                : 'Estos productos están destinados únicamente para fines de investigación y no son para consumo humano. Debe ser mayor de 18 años para comprar. No está destinado a diagnosticar, tratar, curar o prevenir ninguna enfermedad.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
