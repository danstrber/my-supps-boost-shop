
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
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'en' ? 'Get in Touch' : 'Ponte en Contacto'}
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              {language === 'en' 
                ? 'We are here to help with any questions about our research compounds or your orders.'
                : 'Estamos aquí para ayudar con cualquier pregunta sobre nuestros compuestos de investigación o tus pedidos.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                {language === 'en' ? 'Telegram Support' : 'Soporte por Telegram'}
              </h3>
              <p className="text-blue-700 mb-4">
                {language === 'en' 
                  ? 'Join our Telegram channel for immediate support and order assistance.'
                  : 'Únete a nuestro canal de Telegram para soporte inmediato y asistencia con pedidos.'}
              </p>
              <a 
                href="https://t.me/+fDDZObF0zjI2M2Y0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {language === 'en' ? 'Join Telegram' : 'Unirse a Telegram'}
              </a>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                {language === 'en' ? 'Email Support' : 'Soporte por Email'}
              </h3>
              <p className="text-green-700 mb-4">
                {language === 'en' 
                  ? 'Send us an email for detailed inquiries or technical questions.'
                  : 'Envíanos un email para consultas detalladas o preguntas técnicas.'}
              </p>
              <a 
                href="mailto:christhomaso083@proton.me"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {language === 'en' ? 'Send Email' : 'Enviar Email'}
              </a>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {language === 'en' ? 'Response Times' : 'Tiempos de Respuesta'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">●</span>
                <span className="text-gray-700">
                  {language === 'en' ? 'Telegram: Usually within 1 hour' : 'Telegram: Usualmente en 1 hora'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">●</span>
                <span className="text-gray-700">
                  {language === 'en' ? 'Email: Within 24 hours' : 'Email: En 24 horas'}
                </span>
              </div>
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

export default ContactPage;
