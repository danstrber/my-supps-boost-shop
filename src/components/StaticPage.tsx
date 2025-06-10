
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/hooks/useAuth';

interface StaticPageProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account') => void;
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

const StaticPage = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  onMenuToggle,
  currentPage,
  onPageChange,
  sidebarOpen,
  onSidebarClose
}: StaticPageProps) => {
  const { userProfile } = useAuth();

  const getPageContent = () => {
    switch (currentPage) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              {language === 'en' ? 'About Us' : 'Acerca de Nosotros'}
            </h1>
            <div className="prose prose-lg text-gray-600">
              <p>
                {language === 'en' 
                  ? 'We are dedicated to providing high-quality research compounds with complete transparency and testing.' 
                  : 'Nos dedicamos a proporcionar compuestos de investigación de alta calidad con total transparencia y pruebas.'}
              </p>
            </div>
          </div>
        );
      
      case 'contact':
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
                <a href="mailto:christhomaso083@porton.me" className="text-blue-600 hover:text-blue-800 font-medium">
                  christhomaso083@porton.me
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
      
      case 'delivery':
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
      
      case 'payment':
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
      
      case 'labtesting':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              {language === 'en' ? 'Product Verification' : 'Verificación de Productos'}
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <img 
                src="/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png" 
                alt="Product Verification"
                className="w-full max-w-3xl mx-auto mb-8 rounded-lg shadow-md"
              />
              
              {/* Main Lab Testing Info */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  🧪 {language === 'en' ? 'Product Authentication' : 'Autenticación de Productos'}
                </h2>
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
                  <p className="text-green-800 font-semibold text-lg mb-2">
                    ✅ {language === 'en' ? 'Proof of Authenticity for All Products' : 'Prueba de Autenticidad para Todos los Productos'}
                  </p>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? 'We provide proof of authenticity for all our products. You can verify the contents and quality of your supplements through our verification images.' 
                      : 'Proporcionamos prueba de autenticidad para todos nuestros productos. Puedes verificar el contenido y calidad de tus suplementos a través de nuestras imágenes de verificación.'}
                  </p>
                </div>
              </div>

              {/* Verification Images Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'en' ? 'Verification Images' : 'Imágenes de Verificación'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                    <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <span className="text-gray-500">Product verification 1</span>
                    </div>
                    <h4 className="font-semibold text-blue-800 mb-2">Product Content Verification</h4>
                    <p className="text-gray-700 text-sm">Detailed analysis of product composition and purity levels</p>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
                    <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <span className="text-gray-500">Product verification 2</span>
                    </div>
                    <h4 className="font-semibold text-purple-800 mb-2">Quality Assurance Documentation</h4>
                    <p className="text-gray-700 text-sm">Third-party testing results and safety certificates</p>
                  </div>
                </div>
              </div>

              {/* Contact for Additional Documentation */}
              <div className="mb-8">
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">📋</span>
                    <h4 className="font-semibold text-yellow-800 text-lg">
                      {language === 'en' ? 'Contact us for additional product verification documentation' : 'Contáctanos para documentación adicional de verificación de productos'}
                    </h4>
                  </div>
                  <p className="text-yellow-700">
                    {language === 'en' 
                      ? 'Contact us for additional product verification documentation or if you have specific questions about any product.'
                      : 'Contáctanos para documentación adicional de verificación de productos o si tienes preguntas específicas sobre algún producto.'}
                  </p>
                </div>
              </div>

              {/* Testing Standards */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'en' ? 'Our Testing Standards' : 'Nuestros Estándares de Prueba'}
                </h3>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Third-party laboratory testing</li>
                      <li>Purity verification (minimum 98%)</li>
                      <li>Heavy metals contamination testing</li>
                      <li>Microbial safety analysis</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>HPLC chromatography analysis</li>
                      <li>Mass spectrometry verification</li>
                      <li>Certificate of Analysis (COA) available</li>
                      <li>ISO certified laboratory standards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={onLanguageChange}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
        onCartOpen={onCartOpen}
        onMenuToggle={onMenuToggle}
        currentPage={currentPage}
        onPageChange={onPageChange}
        sidebarOpen={sidebarOpen}
      />

      <Sidebar
        language={language}
        isOpen={sidebarOpen}
        selectedCategory="all"
        onCategoryChange={(category) => {
          onPageChange('home');
          onSidebarClose();
        }}
        userProfile={userProfile}
        referralCount={0}
        onClose={onSidebarClose}
      />

      <main className="pt-32 px-4">
        <div className="container mx-auto py-8">
          {getPageContent()}
        </div>
      </main>
    </div>
  );
};

export default StaticPage;
