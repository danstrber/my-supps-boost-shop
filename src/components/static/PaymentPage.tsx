
import React from 'react';

interface PaymentPageProps {
  language: 'en' | 'es';
}

const PaymentPage = ({ language }: PaymentPageProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {language === 'en' ? 'Payment Methods' : 'Métodos de Pago'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Telegram Payment */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
            💬 {language === 'en' ? 'Telegram Payment (Recommended)' : 'Pago por Telegram (Recomendado)'}
          </h2>
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              {language === 'en' 
                ? 'Join our Telegram group for the easiest and most secure payment experience.' 
                : 'Únete a nuestro grupo de Telegram para la experiencia de pago más fácil y segura.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <ul className="space-y-2">
                <li className="flex items-center text-green-700">
                  ✅ <span className="ml-2">Anonymous ordering possible</span>
                </li>
                <li className="flex items-center text-green-700">
                  ✅ <span className="ml-2">Direct communication with support</span>
                </li>
                <li className="flex items-center text-green-700">
                  ✅ <span className="ml-2">Real-time order tracking</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center text-green-700">
                  ✅ <span className="ml-2">Expert coaching available</span>
                </li>
                <li className="flex items-center text-green-700">
                  ✅ <span className="ml-2">Community support</span>
                </li>
                <li className="flex items-center text-green-700">
                  ✅ <span className="ml-2">Faster processing</span>
                </li>
              </ul>
            </div>
            <a 
              href="https://t.me/+fDDZObF0zjI2M2Y0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              {language === 'en' ? 'Join Telegram Group' : 'Unirse al Grupo de Telegram'}
            </a>
          </div>
        </div>

        {/* Cryptocurrency Payment */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center">
            ₿ {language === 'en' ? 'Bitcoin Payment' : 'Pago con Bitcoin'}
          </h2>
          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
              <p className="text-blue-800 font-semibold text-lg mb-2">
                🔒 {language === 'en' ? 'We accept 100% anonymous Bitcoin payments!' : '¡Aceptamos pagos con Bitcoin 100% anónimos!'}
              </p>
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Secure, fast, and completely anonymous transactions using Bitcoin.'
                  : 'Transacciones seguras, rápidas y completamente anónimas usando Bitcoin.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Why Bitcoin:' : 'Por Qué Bitcoin:'}
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>100% anonymous transactions</li>
                  <li>No chargebacks or payment disputes</li>
                  <li>Instant global payments</li>
                  <li>Lower transaction fees</li>
                  <li>Secure blockchain verification</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Payment Benefits:' : 'Beneficios del Pago:'}
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Complete privacy protection</li>
                  <li>No personal information required</li>
                  <li>Fast transaction processing</li>
                  <li>Worldwide accessibility</li>
                  <li>Decentralized security</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
