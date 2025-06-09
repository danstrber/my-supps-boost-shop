
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, CreditCard, FlaskConical, MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface StaticPageProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting') => void;
  sidebarOpen: boolean;
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
  sidebarOpen
}: StaticPageProps) => {
  const renderAboutContent = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'About MySupps' : 'Acerca de MySupps'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'MySupps is your trusted partner in health and fitness. We provide premium quality supplements to help you achieve your wellness goals.'
              : 'MySupps es tu socio de confianza en salud y fitness. Proporcionamos suplementos de calidad premium para ayudarte a lograr tus objetivos de bienestar.'}
          </p>
          <p className="text-gray-600">
            {language === 'en'
              ? 'All our products are carefully selected and we provide proof of content through product images and documentation.'
              : 'Todos nuestros productos son cuidadosamente seleccionados y proporcionamos prueba de contenido a través de imágenes de productos y documentación.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactContent = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Contact Information' : 'Información de Contacto'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold">Telegram</div>
                <a 
                  href="https://t.me/+fDDZObF0zjI2M2Y0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  https://t.me/+fDDZObF0zjI2M2Y0
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold">Email</div>
                <a 
                  href="mailto:christhomaso083@porton.me"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  christhomaso083@porton.me
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold">{language === 'en' ? 'Availability' : 'Disponibilidad'}</div>
                <div className="text-gray-600">{language === 'en' ? 'Almost 24/7' : 'Casi 24/7'}</div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'How to Contact Us' : 'Cómo Contactarnos'}
            </h3>
            <div className="text-gray-600 space-y-2">
              <div>• {language === 'en' ? 'For orders and general inquiries: Contact us through our Telegram channel' : 'Para pedidos e consultas generales: Contáctanos a través de nuestro canal de Telegram'}</div>
              <div>• {language === 'en' ? 'For payment assistance: Message us on Telegram or email' : 'Para asistencia con pagos: Envíanos un mensaje en Telegram o correo'}</div>
              <div>• {language === 'en' ? 'We respond quickly and are available almost 24/7' : 'Respondemos rápidamente y estamos disponibles casi 24/7'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDeliveryContent = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Shipping Policy' : 'Política de Envío'}
            </h3>
            <div className="space-y-3 text-gray-600">
              <div>• {language === 'en' ? 'We ship as soon as we receive your order' : 'Enviamos tan pronto como recibimos tu pedido'}</div>
              <div>• {language === 'en' ? 'Standard shipping available worldwide' : 'Envío estándar disponible en todo el mundo'}</div>
              <div>• {language === 'en' ? 'Processing time: 1-2 business days' : 'Tiempo de procesamiento: 1-2 días laborables'}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Free Shipping' : 'Envío Gratis'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Free shipping on orders over $100! Orders under $100 have standard shipping fees.'
                : '¡Envío gratis en pedidos superiores a $100! Los pedidos menores a $100 tienen tarifas de envío estándar.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Tracking' : 'Seguimiento'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Once your order ships, you will receive tracking information via Telegram.'
                : 'Una vez que tu pedido sea enviado, recibirás información de seguimiento a través de Telegram.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPaymentContent = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Payment Methods' : 'Métodos de Pago'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Cryptocurrency Payments' : 'Pagos con Criptomonedas'}
            </h3>
            <div className="text-gray-600 space-y-2">
              <div>• {language === 'en' ? 'We accept 100+ anonymous cryptocurrencies' : 'Aceptamos más de 100 criptomonedas anónimas'}</div>
              <div>• {language === 'en' ? 'Bitcoin, Ethereum, Litecoin, and many more' : 'Bitcoin, Ethereum, Litecoin, y muchas más'}</div>
              <div>• {language === 'en' ? 'Fast and secure transactions' : 'Transacciones rápidas y seguras'}</div>
              <div>• {language === 'en' ? 'Privacy-focused payment processing' : 'Procesamiento de pagos enfocado en la privacidad'}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Payment Process' : 'Proceso de Pago'}
            </h3>
            <div className="text-gray-600 space-y-2">
              <div>1. {language === 'en' ? 'Add items to your cart and proceed to checkout' : 'Agrega artículos a tu carrito y procede al checkout'}</div>
              <div>2. {language === 'en' ? 'Contact us through Telegram for payment instructions' : 'Contáctanos a través de Telegram para instrucciones de pago'}</div>
              <div>3. {language === 'en' ? 'Send payment using your preferred cryptocurrency' : 'Envía el pago usando tu criptomoneda preferida'}</div>
              <div>4. {language === 'en' ? 'We confirm payment and process your order' : 'Confirmamos el pago y procesamos tu pedido'}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Alternative Payment Options' : 'Opciones de Pago Alternativas'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'For other payment methods or if you need assistance, please contact us through our Telegram channel @mysupps_support'
                : 'Para otros métodos de pago o si necesitas asistencia, por favor contáctanos a través de nuestro canal de Telegram @mysupps_support'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLabTestingContent = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FlaskConical className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Product Verification' : 'Verificación de Productos'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Product Documentation' : 'Documentación de Productos'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'en'
                ? 'We provide proof of content for all our products through detailed product images and documentation.'
                : 'Proporcionamos prueba de contenido para todos nuestros productos a través de imágenes detalladas de productos y documentación.'}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'What We Provide' : 'Qué Proporcionamos'}
            </h3>
            <div className="space-y-2 text-gray-600">
              <div>• {language === 'en' ? 'High-quality product images' : 'Imágenes de productos de alta calidad'}</div>
              <div>• {language === 'en' ? 'Detailed ingredient lists' : 'Listas detalladas de ingredientes'}</div>
              <div>• {language === 'en' ? 'Product authenticity documentation' : 'Documentación de autenticidad del producto'}</div>
              <div>• {language === 'en' ? 'Expiration date verification' : 'Verificación de fecha de caducidad'}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Quality Assurance' : 'Aseguramiento de Calidad'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'All products are sourced from reputable suppliers and we ensure proper storage and handling to maintain product integrity.'
                : 'Todos los productos provienen de proveedores reconocidos y aseguramos el almacenamiento y manejo adecuados para mantener la integridad del producto.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getPageContent = () => {
    switch (currentPage) {
      case 'about':
        return renderAboutContent();
      case 'contact':
        return renderContactContent();
      case 'delivery':
        return renderDeliveryContent();
      case 'payment':
        return renderPaymentContent();
      case 'labtesting':
        return renderLabTestingContent();
      default:
        return <div>Page not found</div>;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'about':
        return language === 'en' ? 'About Us' : 'Acerca de Nosotros';
      case 'contact':
        return language === 'en' ? 'Contact Us' : 'Contáctanos';
      case 'delivery':
        return language === 'en' ? 'Shipping Information' : 'Información de Envío';
      case 'payment':
        return language === 'en' ? 'Payment Methods' : 'Métodos de Pago';
      case 'labtesting':
        return language === 'en' ? 'Product Verification' : 'Verificación de Productos';
      default:
        return 'Page';
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
      <div className="pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>
          {getPageContent()}
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
