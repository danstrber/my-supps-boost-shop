
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
                <a href="mailto:support@mystore.com" className="text-blue-600 hover:text-blue-800 font-medium">
                  support@mystore.com
                </a>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'en' ? 'Fast & Secure Shipping' : 'Envío Rápido y Seguro'}
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {language === 'en' ? 'Delivery Times' : 'Tiempos de Entrega'}
                  </h3>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 font-semibold text-lg">🚚 Express Shipping</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li><strong>Domestic:</strong> 1-2 business days</li>
                      <li><strong>International:</strong> 3-7 business days</li>
                      <li><strong>Tracking:</strong> Full tracking provided</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-blue-600 font-semibold text-lg">📦 Standard Shipping</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li><strong>Domestic:</strong> 3-5 business days</li>
                      <li><strong>International:</strong> 7-14 business days</li>
                      <li><strong>Tracking:</strong> Basic tracking included</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {language === 'en' ? '100% Secure Packaging' : 'Empaque 100% Seguro'}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Discreet packaging:</strong> No company branding or product details visible</li>
                      <li><strong>Tamper-proof sealing:</strong> Multiple security layers</li>
                      <li><strong>Climate controlled:</strong> Temperature-sensitive products protected</li>
                      <li><strong>Insurance included:</strong> All orders automatically insured</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {language === 'en' ? 'Shipping Costs' : 'Costos de Envío'}
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-yellow-800 font-medium mb-2">
                      💰 {language === 'en' ? 'Free shipping on orders over $100!' : '¡Envío gratis en pedidos mayores a $100!'}
                    </p>
                    <p className="text-gray-700">
                      {language === 'en' 
                        ? 'Orders under $100 have a flat $12 shipping fee worldwide.' 
                        : 'Pedidos menores a $100 tienen una tarifa fija de $12 de envío mundial.'}
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
                  <p className="text-gray-700 mb-4">
                    {language === 'en' 
                      ? 'We accept Bitcoin and other major cryptocurrencies for maximum privacy and security.' 
                      : 'Aceptamos Bitcoin y otras criptomonedas principales para máxima privacidad y seguridad.'}
                  </p>
                  
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
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      🔒 {language === 'en' ? '100% Secure Process' : 'Proceso 100% Seguro'}
                    </h4>
                    <p className="text-green-700 text-sm">
                      {language === 'en' 
                        ? 'Payment instructions with wallet address and exact amount will be provided after order confirmation. All transactions are verified on the blockchain for maximum security.' 
                        : 'Las instrucciones de pago con la dirección de billetera y la cantidad exacta se proporcionarán después de la confirmación del pedido. Todas las transacciones se verifican en la blockchain para máxima seguridad.'}
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
              {language === 'en' ? 'Lab Testing & Verification' : 'Pruebas de Laboratorio y Verificación'}
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              
              {/* Main Lab Testing Info */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  🧪 {language === 'en' ? 'Third-Party Lab Testing' : 'Pruebas de Laboratorio de Terceros'}
                </h2>
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
                  <p className="text-green-800 font-semibold text-lg mb-2">
                    ✅ {language === 'en' ? '100% Independent Verification' : 'Verificación 100% Independiente'}
                  </p>
                  <p className="text-gray-700">
                    {language === 'en' 
                      ? 'All our products undergo rigorous third-party testing by certified laboratories for purity, potency, and safety verification.' 
                      : 'Todos nuestros productos se someten a rigurosas pruebas de terceros por laboratorios certificados para verificación de pureza, potencia y seguridad.'}
                  </p>
                </div>
              </div>

              {/* Testing Parameters */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'en' ? 'What We Test For:' : 'Qué Probamos:'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Purity Analysis</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Minimum 98% purity for most compounds</li>
                      <li>HPLC chromatography testing</li>
                      <li>Mass spectrometry verification</li>
                      <li>Impurity identification</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Safety Testing</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Heavy metals contamination</li>
                      <li>Microbial testing (bacteria, yeast, mold)</li>
                      <li>Solvent residues analysis</li>
                      <li>Endotoxin testing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lab Certificates */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'en' ? 'Lab Certificates Available' : 'Certificados de Laboratorio Disponibles'}
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-yellow-800 font-medium mb-2">
                    📋 {language === 'en' ? 'Certificate of Analysis (COA)' : 'Certificado de Análisis (COA)'}
                  </p>
                  <p className="text-gray-700 mb-3">
                    {language === 'en' 
                      ? 'Lab certificates are available for select premium products. Look for the "Lab Test" button on product pages.' 
                      : 'Los certificados de laboratorio están disponibles para productos premium selectos. Busca el botón "Lab Test" en las páginas de productos.'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'en' 
                      ? 'Currently available for: Super Drol, Clenbuterol, and other flagship products.' 
                      : 'Actualmente disponible para: Super Drol, Clenbuterol y otros productos insignia.'}
                  </p>
                </div>
              </div>

              {/* Testing Lab Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'en' ? 'Our Testing Partner' : 'Nuestro Socio de Pruebas'}
                </h3>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🏛️</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Certified Independent Laboratory</h4>
                      <p className="text-gray-600 text-sm">ISO 17025 Accredited Facility</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>FDA registered testing facility</li>
                    <li>GMP certified laboratory standards</li>
                    <li>International accreditation</li>
                    <li>Chain of custody documentation</li>
                  </ul>
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
