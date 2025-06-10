
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
        <img 
          src="/lovable-uploads/fd2ccebb-dc6a-47e5-96d7-e9ea40d4ecc5.png" 
          alt="Contact Us Information"
          className="w-full max-w-2xl mx-auto mb-8 rounded-lg shadow-md"
        />
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Join our Telegram' : 'Únete a nuestro Telegram'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? 'For fastest support and updates, join our Telegram channel.' 
              : 'Para soporte rápido y actualizaciones, únete a nuestro canal de Telegram.'}
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
        
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Email Support' : 'Soporte por Email'}
          </h3>
          <p className="text-gray-600 mb-2">
            {language === 'en' ? 'You can also reach us at:' : 'También puedes contactarnos en:'}
          </p>
          <a href="mailto:support@company.com" className="text-blue-600 hover:text-blue-800 font-medium">
            support@company.com
          </a>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ⏰ {language === 'en' ? 'We are open almost 24/7 for your convenience!' : '¡Estamos disponibles casi 24/7 para tu conveniencia!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
