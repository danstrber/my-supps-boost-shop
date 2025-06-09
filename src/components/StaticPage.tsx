
import React from 'react';
import Header from './Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StaticPageProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account') => void;
  sidebarOpen?: boolean;
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
  sidebarOpen = false
}: StaticPageProps) => {
  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {language === 'en' ? 'About MySupps' : 'Acerca de MySupps'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Our Mission' : 'Nuestra Misión'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'At MySupps, we are dedicated to providing high-quality supplements to help you achieve your fitness and health goals. Our products are carefully selected and tested to ensure maximum effectiveness and safety.'
                      : 'En MySupps, nos dedicamos a proporcionar suplementos de alta calidad para ayudarte a alcanzar tus objetivos de fitness y salud. Nuestros productos son cuidadosamente seleccionados y probados para garantizar máxima efectividad y seguridad.'}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Quality Assurance' : 'Garantía de Calidad'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'We partner with trusted manufacturers and conduct rigorous quality checks to ensure that every product meets our high standards.'
                      : 'Nos asociamos con fabricantes confiables y realizamos controles de calidad rigurosos para asegurar que cada producto cumpla con nuestros altos estándares.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {language === 'en' ? 'Contact Us' : 'Contáctanos'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'en' ? 'Telegram Channel' : 'Canal de Telegram'}
                    </h3>
                    <p className="text-blue-600 hover:text-blue-800">
                      <a href="https://t.me/+fDDZObF0zjI2M2Y0" target="_blank" rel="noopener noreferrer">
                        https://t.me/+fDDZObF0zjI2M2Y0
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'en' ? 'Email' : 'Correo Electrónico'}
                    </h3>
                    <p className="text-blue-600 hover:text-blue-800">
                      <a href="mailto:christhomaso083@porton.me">
                        christhomaso083@porton.me
                      </a>
                    </p>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-700 font-medium">
                      {language === 'en' 
                        ? '🕐 We are open almost 24/7 for your convenience!' 
                        : '🕐 ¡Estamos abiertos casi 24/7 para tu conveniencia!'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'delivery':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Processing Time' : 'Tiempo de Procesamiento'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'We will start shipping your order as soon as we receive it. Most orders are processed within 1-2 business days.'
                      : 'Comenzaremos a enviar tu pedido tan pronto como lo recibamos. La mayoría de los pedidos se procesan dentro de 1-2 días hábiles.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Shipping Costs' : 'Costos de Envío'}
                  </h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-700 font-medium">
                      {language === 'en'
                        ? '🆓 FREE SHIPPING on orders $100 and above!'
                        : '🆓 ¡ENVÍO GRATIS en pedidos de $100 y más!'}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2">
                    {language === 'en'
                      ? 'Standard shipping rates apply for orders under $100.'
                      : 'Se aplican tarifas de envío estándar para pedidos menores a $100.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Tracking' : 'Seguimiento'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'Once your order ships, you will receive tracking information via Telegram or email.'
                      : 'Una vez que tu pedido sea enviado, recibirás información de seguimiento a través de Telegram o correo.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {language === 'en' ? 'Payment Methods' : 'Métodos de Pago'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Cryptocurrency Payment' : 'Pago con Criptomonedas'}
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700 font-medium">
                      {language === 'en'
                        ? '💰 We accept 100% anonymous cryptocurrency payments!'
                        : '💰 ¡Aceptamos pagos 100% anónimos con criptomonedas!'}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2">
                    {language === 'en'
                      ? 'Secure, fast, and completely anonymous transactions using various cryptocurrencies.'
                      : 'Transacciones seguras, rápidas y completamente anónimas usando varias criptomonedas.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Need Help?' : '¿Necesitas Ayuda?'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'For other payment methods or if you need assistance, please contact us through our Telegram channel or email'
                      : 'Para otros métodos de pago o si necesitas asistencia, por favor contáctanos a través de nuestro canal de Telegram o correo'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'labtesting':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {language === 'en' ? 'Product Verification' : 'Verificación de Productos'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Product Authentication' : 'Autenticación de Productos'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'We provide proof of authenticity for all our products. You can verify the contents and quality of your supplements through our verification images.'
                      : 'Proporcionamos prueba de autenticidad para todos nuestros productos. Puedes verificar el contenido y calidad de tus suplementos a través de nuestras imágenes de verificación.'}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'en' ? 'Verification Images' : 'Imágenes de Verificación'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <img 
                        src="/lovable-uploads/a3f97e50-7073-4d49-9be4-a03b5b5b1b4c.png" 
                        alt="Product verification 1" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-500 text-center">
                        {language === 'en' ? 'Product Content Verification' : 'Verificación de Contenido del Producto'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <img 
                        src="/lovable-uploads/c5e4c93b-47ac-4c8b-8a22-47c5a8a8e5c5.png" 
                        alt="Product verification 2" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-500 text-center">
                        {language === 'en' ? 'Quality Assurance Documentation' : 'Documentación de Garantía de Calidad'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-700">
                    {language === 'en'
                      ? '📋 Contact us for additional product verification documentation or if you have specific questions about any product.'
                      : '📋 Contáctanos para documentación adicional de verificación de productos o si tienes preguntas específicas sobre algún producto.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
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

      <main className="pt-32 px-4 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default StaticPage;
