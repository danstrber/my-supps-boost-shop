
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
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Join our Telegram' : 'Únete a nuestro Telegram'}
          </h2>
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
