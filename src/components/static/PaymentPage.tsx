
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
        <img 
          src="/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png" 
          alt="Payment Methods"
          className="w-full max-w-3xl mx-auto mb-8 rounded-lg shadow-md"
        />
        
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
            ₿ {language === 'en' ? 'Cryptocurrency Payment' : 'Pago con Criptomonedas'}
          </h2>
          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
              <p className="text-blue-800 font-semibold text-lg mb-2">
                🔒 {language === 'en' ? 'We accept 100% anonymous cryptocurrency payments!' : '¡Aceptamos pagos con criptomonedas 100% anónimos!'}
              </p>
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Secure, fast, and completely anonymous transactions using various cryptocurrencies.'
                  : 'Transacciones seguras, rápidas y completamente anónimas usando varias criptomonedas.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Accepted Cryptocurrencies:' : 'Criptomonedas Aceptadas:'}
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Bitcoin (BTC)</li>
                  <li>Ethereum (ETH)</li>
                  <li>Litecoin (LTC)</li>
                  <li>Monero (XMR)</li>
                  <li>USDT (Tether)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Payment Benefits:' : 'Beneficios del Pago:'}
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>100% anonymous transactions</li>
                  <li>No chargebacks or payment disputes</li>
                  <li>Instant global payments</li>
                  <li>Lower transaction fees</li>
                  <li>Secure blockchain verification</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">
                💡 {language === 'en' ? 'Need Help?' : '¿Necesitas Ayuda?'}
              </h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'For other payment methods or if you need assistance, please contact us through our Telegram channel or email'
                  : 'Para otros métodos de pago o si necesitas asistencia, por favor contáctanos a través de nuestro canal de Telegram o correo electrónico'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
