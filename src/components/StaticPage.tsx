
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
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {language === 'en' ? 'Join our Telegram' : 'Únete a nuestro Telegram'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === 'en' 
                    ? 'For fastest support and updates, join our Telegram channel.' 
                    : 'Para soporte rápido y actualizaciones, únete a nuestro canal de Telegram.'}
                </p>
                <a 
                  href="https://t.me/yourtelegram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  📱 {language === 'en' ? 'Join Telegram' : 'Unirse a Telegram'}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'en' ? 'Shipping Details' : 'Detalles de Envío'}
              </h2>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'We offer worldwide shipping with discrete packaging and tracking.' 
                  : 'Ofrecemos envío mundial con empaque discreto y seguimiento.'}
              </p>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'en' ? 'Cryptocurrency Payments' : 'Pagos con Criptomonedas'}
              </h2>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'We accept Bitcoin and other major cryptocurrencies for secure, anonymous transactions.' 
                  : 'Aceptamos Bitcoin y otras criptomonedas principales para transacciones seguras y anónimas.'}
              </p>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'en' ? 'Third-Party Testing' : 'Pruebas de Terceros'}
              </h2>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'All our products undergo rigorous third-party testing for purity and potency.' 
                  : 'Todos nuestros productos se someten a rigurosas pruebas de terceros para pureza y potencia.'}
              </p>
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
        onCategoryChange={() => {
          // When user clicks category on static page, go to home and show that category
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
