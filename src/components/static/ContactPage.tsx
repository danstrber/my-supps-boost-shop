
import React from 'react';

interface ContactPageProps {
  language: 'en' | 'es';
}

const ContactPage = ({ language }: ContactPageProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {language === 'en' ? 'Contact Us' : 'Contáctanos'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {language === 'en' ? 'Get in Touch' : 'Ponte en Contacto'}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {language === 'en' 
              ? 'For the fastest support and to place orders, join our Telegram channel. Our team is available 24/7 to help with your questions and orders.'
              : 'Para el soporte más rápido y realizar pedidos, únete a nuestro canal de Telegram. Nuestro equipo está disponible 24/7 para ayudar con tus preguntas y pedidos.'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              {language === 'en' ? 'Telegram Support' : 'Soporte por Telegram'}
            </h3>
            <ul className="text-blue-700 space-y-2 mb-4">
              <li>✅ {language === 'en' ? 'Instant responses' : 'Respuestas instantáneas'}</li>
              <li>✅ {language === 'en' ? 'Direct ordering' : 'Pedidos directos'}</li>
              <li>✅ {language === 'en' ? 'Order tracking' : 'Seguimiento de pedidos'}</li>
              <li>✅ {language === 'en' ? 'Expert guidance' : 'Orientación experta'}</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              {language === 'en' ? 'Why Choose Telegram?' : '¿Por qué elegir Telegram?'}
            </h3>
            <ul className="text-green-700 space-y-2">
              <li>🔒 {language === 'en' ? 'Secure messaging' : 'Mensajería segura'}</li>
              <li>🚀 {language === 'en' ? 'Fast communication' : 'Comunicación rápida'}</li>
              <li>💬 {language === 'en' ? 'Direct chat with experts' : 'Chat directo con expertos'}</li>
              <li>📱 {language === 'en' ? 'Mobile & desktop access' : 'Acceso móvil y de escritorio'}</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Join our Telegram' : 'Únete a nuestro Telegram'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? 'Click the button below to join our Telegram channel and start chatting with our team immediately.'
              : 'Haz clic en el botón de abajo para unirte a nuestro canal de Telegram y comenzar a chatear con nuestro equipo inmediatamente.'
            }
          </p>
          <a 
            href="https://t.me/+fDDZObF0zjI2M2Y0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {language === 'en' ? 'Join Telegram' : 'Unirse a Telegram'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
