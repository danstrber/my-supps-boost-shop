import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import PaymentModal from '@/components/PaymentModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import { translations } from '@/lib/translations';
import { products } from '@/lib/products';
import { Product } from '@/lib/products';
import { getCurrentUser, signOut, getUserDiscount } from '@/lib/auth';
import { UserProfile } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting'>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userDiscount, setUserDiscount] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (session?.user) {
        console.log('User signed in:', session.user.id);
        setIsAuthenticated(true);
        
        setTimeout(async () => {
          try {
            const { profile } = await getCurrentUser();
            setUserProfile(profile);
            
            if (profile?.auth_id) {
              const discount = await getUserDiscount(profile.auth_id);
              setUserDiscount(discount);
              
              const { data: referrals } = await supabase
                .from('referrals')
                .select('*')
                .eq('referrer_id', profile.id);
              
              setReferralCount(referrals?.length || 0);
            }
          } catch (error) {
            console.error('Error loading user data:', error);
          }
        }, 1000);
      } else {
        console.log('User signed out or no session');
        setIsAuthenticated(false);
        setUserProfile(null);
        setUserDiscount(0);
        setReferralCount(0);
      }
    });

    const checkInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session check:', session);
        
        if (session?.user) {
          setIsAuthenticated(true);
          const { profile } = await getCurrentUser();
          setUserProfile(profile);
          
          if (profile?.auth_id) {
            const discount = await getUserDiscount(profile.auth_id);
            setUserDiscount(discount);
            
            const { data: referrals } = await supabase
              .from('referrals')
              .select('*')
              .eq('referrer_id', profile.id);
            
            setReferralCount(referrals?.length || 0);
          }
        }
      } catch (error) {
        console.error('Error checking initial session:', error);
      }
    };

    checkInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLanguageChange = (newLanguage: 'en' | 'es') => {
    setLanguage(newLanguage);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    
    toast({
      title: language === 'en' ? 'Added to Cart' : 'Agregado al Carrito',
      description: `${product.name} ${language === 'en' ? 'has been added to cart' : 'ha sido agregado al carrito'}`,
    });
  };

  const handleUpdateCart = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const handleAuthAction = async (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      try {
        await signOut();
        setUserProfile(null);
        setIsAuthenticated(false);
        setUserDiscount(0);
        setReferralCount(0);
        toast({
          title: "Signed out successfully",
          description: "You have been signed out.",
        });
      } catch (error) {
        console.error('Logout error:', error);
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setAuthMode(action);
      setIsAuthModalOpen(true);
    }
  };

  const handleMenuToggle = () => {
    console.log('Hamburger menu clicked - current state:', sidebarOpen);
    setSidebarOpen(prev => {
      const newState = !prev;
      console.log('Setting sidebar state to:', newState);
      return newState;
    });
  };

  const handleSignupSuccess = () => {
    toast({
      title: "Account created!",
      description: "Please check your email to verify your account before signing in.",
    });
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categories.includes(selectedCategory));

  const t = translations[language];

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{language === 'en' ? 'About Us' : 'Acerca de Nosotros'}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {language === 'en' 
                  ? 'Welcome to MySupps, your trusted partner in research compounds and performance enhancement. We are dedicated to providing the highest quality SARMs, peptides, and research chemicals for scientific and research purposes.'
                  : 'Bienvenido a MySupps, tu socio de confianza en compuestos de investigación y mejora del rendimiento. Estamos dedicados a proporcionar SARMs, péptidos y químicos de investigación de la más alta calidad para fines científicos y de investigación.'
                }
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {language === 'en'
                  ? 'Our mission is to advance scientific research by providing researchers with access to premium compounds that meet the strictest quality standards. All our products undergo rigorous testing and quality control procedures.'
                  : 'Nuestra misión es avanzar la investigación científica proporcionando a los investigadores acceso a compuestos premium que cumplen con los estándares de calidad más estrictos. Todos nuestros productos se someten a pruebas rigurosas y procedimientos de control de calidad.'
                }
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {language === 'en' ? 'Our Commitment' : 'Nuestro Compromiso'}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{language === 'en' ? 'Third-party laboratory testing for purity and potency' : 'Pruebas de laboratorio de terceros para pureza y potencia'}</li>
                <li>{language === 'en' ? 'Fast and secure worldwide shipping' : 'Envío mundial rápido y seguro'}</li>
                <li>{language === 'en' ? 'Excellent customer service and support' : 'Excelente servicio y soporte al cliente'}</li>
                <li>{language === 'en' ? 'Competitive pricing and bulk discounts' : 'Precios competitivos y descuentos por volumen'}</li>
              </ul>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{language === 'en' ? 'Contact Us' : 'Contáctanos'}</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'en' ? 'Customer Support' : 'Soporte al Cliente'}
                  </h3>
                  <p className="text-gray-600">support@mysupps.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'en' ? 'Business Hours' : 'Horario de Atención'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Monday - Friday: 9:00 AM - 6:00 PM EST'
                      : 'Lunes - Viernes: 9:00 AM - 6:00 PM EST'
                    }
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'en' ? 'Response Time' : 'Tiempo de Respuesta'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'We typically respond within 24 hours'
                      : 'Típicamente respondemos dentro de 24 horas'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'delivery':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">🚚 {language === 'en' ? 'Delivery Information' : 'Información de Entrega'}</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Shipping Methods' : 'Métodos de Envío'}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      {language === 'en' ? 'Standard Shipping (5-7 business days)' : 'Envío Estándar (5-7 días hábiles)'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      {language === 'en' ? 'Express Shipping (2-3 business days)' : 'Envío Express (2-3 días hábiles)'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      {language === 'en' ? 'Overnight Shipping (1 business day)' : 'Envío de la Noche a la Mañana (1 día hábil)'}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Shipping Regions' : 'Regiones de Envío'}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      {language === 'en' ? 'United States' : 'Estados Unidos'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      {language === 'en' ? 'Canada' : 'Canadá'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      {language === 'en' ? 'Europe' : 'Europa'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      {language === 'en' ? 'Australia' : 'Australia'}
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  📦 {language === 'en' ? 'Daily Shipping' : 'Envío Diario'}
                </h4>
                <p className="text-blue-800">
                  {language === 'en' 
                    ? 'We ship every day too! Orders placed before 2 PM EST are processed the same day.'
                    : '¡También enviamos todos los días! Los pedidos realizados antes de las 2 PM EST se procesan el mismo día.'
                  }
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'en' ? 'Packaging & Discretion' : 'Empaque y Discreción'}
                </h3>
                <p className="text-gray-700">
                  {language === 'en'
                    ? 'All orders are packaged discreetly with no indication of contents. We use plain packaging to ensure your privacy.'
                    : 'Todos los pedidos se empaquetan discretamente sin indicación del contenido. Usamos empaque simple para asegurar tu privacidad.'
                  }
                </p>
              </div>
            </div>
          </div>
        );

      case 'labtesting':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">🔬 {language === 'en' ? 'Lab Testing' : 'Pruebas de Laboratorio'}</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                {language === 'en'
                  ? 'At MySupps, quality and purity are our top priorities. Every batch of our products undergoes rigorous third-party laboratory testing to ensure the highest standards of quality and safety.'
                  : 'En MySupps, la calidad y pureza son nuestras principales prioridades. Cada lote de nuestros productos se somete a pruebas rigurosas de laboratorio de terceros para asegurar los más altos estándares de calidad y seguridad.'
                }
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === 'en' ? 'Our Testing Process' : 'Nuestro Proceso de Pruebas'}
              </h3>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  {language === 'en' ? 'HPLC (High Performance Liquid Chromatography) for purity analysis' : 'HPLC (Cromatografía Líquida de Alto Rendimiento) para análisis de pureza'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  {language === 'en' ? 'Mass spectrometry for molecular identification' : 'Espectrometría de masas para identificación molecular'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  {language === 'en' ? 'Heavy metals testing for safety' : 'Pruebas de metales pesados para seguridad'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  {language === 'en' ? 'Microbial testing for contamination' : 'Pruebas microbianas para contaminación'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  {language === 'en' ? 'Endotoxin testing for pharmaceutical grade quality' : 'Pruebas de endotoxinas para calidad de grado farmacéutico'}
                </li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  {language === 'en' ? 'Certificate of Analysis (COA)' : 'Certificado de Análisis (COA)'}
                </h4>
                <p className="text-green-800">
                  {language === 'en'
                    ? 'Every product comes with a Certificate of Analysis showing exact purity levels, test results, and batch information. COAs are available upon request for full transparency.'
                    : 'Cada producto viene con un Certificado de Análisis que muestra niveles exactos de pureza, resultados de pruebas e información del lote. Los COAs están disponibles bajo solicitud para total transparencia.'
                  }
                </p>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">💳 {language === 'en' ? 'Payment Methods' : 'Métodos de Pago'}</h1>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                {language === 'en'
                  ? 'We offer secure and convenient payment options to make your shopping experience as smooth as possible.'
                  : 'Ofrecemos opciones de pago seguras y convenientes para hacer tu experiencia de compra lo más fluida posible.'
                }
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Cryptocurrency' : 'Criptomonedas'}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <span className="mr-2">₿</span>
                      Bitcoin (BTC)
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">💎</span>
                      Ethereum (ETH)
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🔵</span>
                      Litecoin (LTC)
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {language === 'en' ? 'Digital Payments' : 'Pagos Digitales'}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <span className="mr-2">📱</span>
                      Zelle
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">💰</span>
                      CashApp
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">🏦</span>
                      Bank Transfer
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  {language === 'en' ? 'Secure Transactions' : 'Transacciones Seguras'}
                </h4>
                <p className="text-blue-800">
                  {language === 'en'
                    ? 'All payments are processed securely with encryption to protect your financial information.'
                    : 'Todos los pagos se procesan de forma segura con encriptación para proteger tu información financiera.'
                  }
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                  {language === 'en' ? 'Cryptocurrency Discounts' : 'Descuentos por Criptomonedas'}
                </h4>
                <p className="text-yellow-800">
                  {language === 'en'
                    ? 'Save 5% on all orders when paying with cryptocurrency!'
                    : '¡Ahorra 5% en todos los pedidos al pagar con criptomonedas!'
                  }
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <ProductGrid
              products={filteredProducts}
              language={language}
              onAddToCart={handleAddToCart}
              onProductClick={setSelectedProduct}
              userDiscount={userDiscount}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        cartItemCount={getTotalCartItems()}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthAction}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuToggle={handleMenuToggle}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sidebarOpen={sidebarOpen}
      />
      
      <Sidebar
        language={language}
        isOpen={sidebarOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setSidebarOpen(false); // Close sidebar on category select
        }}
        userProfile={userProfile}
        referralCount={referralCount}
      />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            console.log('Overlay clicked, closing sidebar');
            setSidebarOpen(false);
          }}
          aria-hidden="true"
        />
      )}
      
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''} pt-20 md:pt-24 px-4 md:px-6 lg:px-8 pb-6`}>
        {renderContent()}
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        onUpdateCart={handleUpdateCart}
        userDiscount={userDiscount}
        language={language}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onSignupSuccess={handleSignupSuccess}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderTotal={0}
        discount={0}
        shippingFee={0}
        finalTotal={0}
        cart={cart}
        userProfile={userProfile}
        cartItems={[]}
      />
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          language={language}
          userDiscount={userDiscount}
        />
      )}
    </div>
  );
};

export default Index;
