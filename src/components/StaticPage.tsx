
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, CreditCard, FlaskConical, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

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
              ? 'All our products are lab-tested for purity and potency, ensuring you get the best value for your investment in health.'
              : 'Todos nuestros productos son probados en laboratorio para pureza y potencia, asegurando que obtengas el mejor valor por tu inversión en salud.'}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-gray-600">support@mysupps.com</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold">{language === 'en' ? 'Phone' : 'Teléfono'}</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-semibold">{language === 'en' ? 'Address' : 'Dirección'}</div>
                <div className="text-gray-600">123 Health St, Wellness City</div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Business Hours' : 'Horarios de Atención'}
            </h3>
            <div className="text-gray-600">
              <div>{language === 'en' ? 'Monday - Friday: 9:00 AM - 6:00 PM' : 'Lunes - Viernes: 9:00 AM - 6:00 PM'}</div>
              <div>{language === 'en' ? 'Saturday: 10:00 AM - 4:00 PM' : 'Sábado: 10:00 AM - 4:00 PM'}</div>
              <div>{language === 'en' ? 'Sunday: Closed' : 'Domingo: Cerrado'}</div>
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
            {language === 'en' ? 'Delivery Information' : 'Información de Entrega'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Shipping Options' : 'Opciones de Envío'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Standard Shipping (5-7 days)' : 'Envío Estándar (5-7 días)'}</span>
                <span className="font-semibold">$10.00</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Express Shipping (2-3 days)' : 'Envío Express (2-3 días)'}</span>
                <span className="font-semibold">$25.00</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Overnight Shipping' : 'Envío Nocturno'}</span>
                <span className="font-semibold">$45.00</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Free Shipping' : 'Envío Gratis'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Free standard shipping on orders over $75!'
                : '¡Envío estándar gratis en pedidos superiores a $75!'}
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
              {language === 'en' ? 'Accepted Cards' : 'Tarjetas Aceptadas'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">Visa</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">Mastercard</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">American Express</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">Discover</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Digital Payments' : 'Pagos Digitales'}
            </h3>
            <div className="space-y-2 text-gray-600">
              <div>• PayPal</div>
              <div>• Apple Pay</div>
              <div>• Google Pay</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Security' : 'Seguridad'}
            </h3>
            <p className="text-gray-600">
              {language === 'en'
                ? 'All payments are processed securely using SSL encryption. We never store your payment information.'
                : 'Todos los pagos se procesan de forma segura usando encriptación SSL. Nunca almacenamos tu información de pago.'}
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
            {language === 'en' ? 'Lab Testing & Quality Assurance' : 'Pruebas de Laboratorio y Aseguramiento de Calidad'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Third-Party Testing' : 'Pruebas de Terceros'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'en'
                ? 'All our supplements undergo rigorous third-party testing to ensure purity, potency, and safety.'
                : 'Todos nuestros suplementos pasan por rigurosas pruebas de terceros para asegurar pureza, potencia y seguridad.'}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'What We Test For' : 'Qué Probamos'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>• {language === 'en' ? 'Heavy Metals' : 'Metales Pesados'}</div>
                <div>• {language === 'en' ? 'Microorganisms' : 'Microorganismos'}</div>
                <div>• {language === 'en' ? 'Pesticides' : 'Pesticidas'}</div>
              </div>
              <div className="space-y-2">
                <div>• {language === 'en' ? 'Active Ingredient Potency' : 'Potencia del Ingrediente Activo'}</div>
                <div>• {language === 'en' ? 'Contaminants' : 'Contaminantes'}</div>
                <div>• {language === 'en' ? 'Label Accuracy' : 'Precisión de Etiquetado'}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'Certifications' : 'Certificaciones'}
            </h3>
            <div className="space-y-2 text-gray-600">
              <div>• GMP (Good Manufacturing Practices)</div>
              <div>• NSF Certified</div>
              <div>• FDA Registered Facility</div>
            </div>
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
        return language === 'en' ? 'Delivery Information' : 'Información de Entrega';
      case 'payment':
        return language === 'en' ? 'Payment Methods' : 'Métodos de Pago';
      case 'labtesting':
        return language === 'en' ? 'Lab Testing' : 'Pruebas de Laboratorio';
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
