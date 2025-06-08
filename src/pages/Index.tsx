
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { products, Product } from '@/lib/products';
import { translations } from '@/lib/translations';
import { getCurrentUser, getUserDiscount, signOut, UserProfile } from '@/lib/auth';
import { getReferralCodeFromUrl, clearReferralFromUrl } from '@/lib/referral';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import ProductDetailModal from '@/components/ProductDetailModal';
import AuthModal from '@/components/AuthModal';
import CartModal from '@/components/CartModal';
import ReferralSection from '@/components/ReferralSection';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userDiscount, setUserDiscount] = useState<number>(0);
  const [referralCount, setReferralCount] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'delivery' | 'payment'>('home');
  const [pendingReferralCode, setPendingReferralCode] = useState<string | null>(null);
  const { toast } = useToast();

  const t = translations[language];

  // Check for referral code in URL
  useEffect(() => {
    const referralCode = getReferralCodeFromUrl();
    if (referralCode) {
      setPendingReferralCode(referralCode);
      clearReferralFromUrl();
    }
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('mysupps_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('mysupps_cart', JSON.stringify(cart));
  }, [cart]);

  // Auth state listener with improved error handling
  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (session?.user) {
        try {
          const { user: currentUser, profile } = await getCurrentUser();
          setUser(currentUser);
          setUserProfile(profile);
          
          if (currentUser && profile) {
            console.log('Loading user data for:', currentUser.id);
            
            const discount = await getUserDiscount(currentUser.id);
            setUserDiscount(discount);
            
            // Get referral count
            const { data: referrals, error: referralError } = await supabase
              .from('referrals')
              .select('id')
              .eq('referrer_id', profile.id);
              
            if (referralError) {
              console.error('Error fetching referrals:', referralError);
            } else {
              setReferralCount(referrals?.length || 0);
              console.log('Referral count:', referrals?.length || 0);
            }
          }
        } catch (error) {
          console.error('Error in auth state change handler:', error);
        }
      } else {
        console.log('User signed out or no session');
        setUser(null);
        setUserProfile(null);
        setUserDiscount(0);
        setReferralCount(0);
      }
    });

    // Check for existing session
    getCurrentUser().then(({ user: currentUser, profile }) => {
      console.log('Initial session check:', currentUser?.id);
      setUser(currentUser);
      setUserProfile(profile);
      
      if (currentUser && profile) {
        getUserDiscount(currentUser.id).then(setUserDiscount);
        
        supabase
          .from('referrals')
          .select('id')
          .eq('referrer_id', profile.id)
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching initial referrals:', error);
            } else {
              setReferralCount(data?.length || 0);
            }
          });
      }
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.categories.some(category => 
          category.toLowerCase().replace(/\s+/g, '') === selectedCategory.toLowerCase().replace(/\s+/g, '')
        )
      );
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => ({
      ...prevCart,
      [product.id]: (prevCart[product.id] || 0) + 1
    }));

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateCart = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (quantity <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = quantity;
      }
      return newCart;
    });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setProductDetailModalOpen(true);
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      signOut().then(() => {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      });
    } else {
      setAuthModalMode(action);
      setAuthModalOpen(true);
    }
  };

  const handleCartOpen = () => {
    if (!user) {
      console.log('User not authenticated, showing auth modal');
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }
    console.log('Opening cart for authenticated user');
    setCartModalOpen(true);
  };

  const handleMenuToggle = () => {
    console.log('Menu toggle called, current sidebarOpen:', sidebarOpen);
    setSidebarOpen(prev => {
      const newState = !prev;
      console.log('Setting sidebar to:', newState);
      return newState;
    });
  };

  const cartItemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const renderAboutPage = () => (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {language === 'en' ? 'About MySupps' : 'Acerca de MySupps'}
      </h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p className="text-lg">
          {language === 'en' 
            ? 'Welcome to MySupps, your trusted source for premium research chemicals and performance enhancement compounds. We specialize in providing laboratory-grade substances for research purposes, catering to fitness enthusiasts, researchers, and professionals seeking cutting-edge performance solutions.'
            : 'Bienvenido a MySupps, tu fuente confiable de químicos de investigación premium y compuestos de mejora del rendimiento. Nos especializamos en proporcionar sustancias de grado laboratorio para propósitos de investigación, atendiendo a entusiastas del fitness, investigadores y profesionales que buscan soluciones de rendimiento de vanguardia.'
          }
        </p>
        <p>
          {language === 'en' 
            ? 'Our mission is to bridge the gap between scientific innovation and practical application, offering products that meet the highest standards of purity and potency. Every product in our catalog undergoes rigorous third-party testing to ensure you receive exactly what you expect.'
            : 'Nuestra misión es cerrar la brecha entre la innovación científica y la aplicación práctica, ofreciendo productos que cumplan con los estándares más altos de pureza y potencia. Cada producto en nuestro catálogo está sometido a un rigoroso testing de terceros para asegurarte de que recibas exactamente lo que esperas.'
          }
        </p>
        <p>
          {language === 'en' 
            ? 'Founded by researchers and fitness professionals, MySupps understands the unique needs of our community. We are committed to providing not just products, but education and support to help you make informed decisions about your research goals.'
            : 'Fundado por investigadores y profesionales del fitness, MySupps entiende las necesidades únicas de nuestra comunidad. Nos comprometemos a no solo ofrecer productos, sino a proporcionar educación y apoyo para ayudarte a tomar decisiones informadas sobre tus metas de investigación.'
          }
        </p>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment</h3>
          <ul className="space-y-2">
            <li>✅ Third-party lab testing for all products</li>
            <li>✅ Research-grade purity and potency</li>
            <li>✅ Transparent ingredients and dosages</li>
            <li>✅ Secure and discreet shipping</li>
            <li>✅ Expert customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {language === 'en' ? 'Contact Us' : 'Contáctanos'}
      </h1>
      <div className="space-y-6">
        <p className="text-gray-600 text-lg">
          {language === 'en' 
            ? 'We are here to help with any questions about our products, orders, or research guidance. Reach out to us through any of the following channels:'
            : 'Nosotros estamos aquí para ayudarte con cualquier pregunta sobre nuestros productos, órdenes o guía de investigación. Contáctanos a través de cualquiera de los siguientes canales:'
          }
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📧 Email Support</h3>
            <p className="text-gray-600 mb-2">
              {language === 'en' ? 'For general questions and assistance:' : 'Para preguntas generales y asistencia:'}
            </p>
            <a href="mailto:christhomaso083@proton.me" className="text-blue-600 font-semibold hover:underline">
              christhomaso083@proton.me
            </a>
            <p className="text-sm text-gray-500 mt-2">
              {language === 'en' ? 'Response time: 24-48 hours' : 'Tiempo de respuesta: 24-48 horas'}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📱 Telegram</h3>
            <p className="text-gray-600 mb-2">
              {language === 'en' ? 'For quick questions and order updates:' : 'Para preguntas rápidas y actualizaciones de órdenes:'}
            </p>
            <a href="https://t.me/DANSTRBER" className="text-green-600 font-semibold hover:underline">
              @DANSTRBER
            </a>
            <p className="text-sm text-gray-500 mt-2">
              {language === 'en' ? 'Response time: 1-6 hours' : 'Tiempo de respuesta: 1-6 horas'}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🕒 Support Hours</h3>
          <p className="text-gray-600">
            {language === 'en' ? 'Monday - Friday: 9:00 AM - 6:00 PM (EST)' : 'Lunes - Viernes: 9:00 AM - 6:00 PM (EST)'}
          </p>
          <p className="text-gray-600">
            {language === 'en' ? 'Saturday - Sunday: 10:00 AM - 4:00 PM (EST)' : 'Sábado - Domingo: 10:00 AM - 4:00 PM (EST)'}
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="text-yellow-800">
            <strong>{language === 'en' ? 'Note:' : 'Nota:'}</strong> {language === 'en' 
              ? 'All products are sold for research purposes only. We do not provide medical advice. Please consult with a healthcare professional before starting any research protocol.'
              : 'Todos los productos se venden solo para propósitos de investigación. No proporcionamos consejos médicos. Por favor consulta con un profesional de la salud antes de comenzar cualquier protocolo de investigación.'
            }
          </p>
        </div>
      </div>
    </div>
  );

  const renderDeliveryPage = () => (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {language === 'en' ? 'Delivery Information' : 'Información de Entrega'}
      </h1>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🚚 Shipping Policy</h3>
          <p className="text-gray-600 text-lg mb-4">
            {language === 'en' 
              ? 'We ship everyday! Orders are typically processed and shipped within 2-3 business days. We only ship within the USA unless you contact us on Telegram.'
              : '¡Enviamos todos los días! Las órdenes se procesan y envían típicamente en 2-3 días hábiles. Solo enviamos dentro de EE.UU. a menos que nos contactes por Telegram.'
            }
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>✅ Free shipping on orders over $100</li>
            <li>✅ $10 shipping fee for orders under $100</li>
            <li>✅ Secure and discreet packaging</li>
            <li>✅ Tracking provided for all orders</li>
          </ul>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📦 Processing Time</h3>
            <p className="text-gray-600">Orders are processed Monday through Friday</p>
            <p className="text-gray-600">Processing time: 1-3 business days</p>
            <p className="text-gray-600">Cut-off time: 2:00 PM EST for same-day processing</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">🌍 Delivery Timeframes</h3>
            <p className="text-gray-600">USA: 3-7 business days</p>
            <p className="text-gray-600">International: Contact us on Telegram</p>
            <p className="text-gray-600">Express options available upon request</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentPage = () => (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        {language === 'en' ? 'Lab Testing & Payment' : 'Pruebas de Laboratorio y Pago'}
      </h1>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🔬 Lab Testing</h3>
          <p className="text-gray-600 mb-4">
            {language === 'en' 
              ? 'All our products undergo rigorous third-party testing to ensure purity and potency. Lab reports are available for products marked with the "Lab Tested" badge.'
              : 'Todos nuestros productos están sometidos a un rigoroso testing de terceros para asegurar pureza y potencia. Los informes de laboratorio están disponibles para productos marcados con el "Lab Tested".'
            }
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>✅ HPLC testing for purity verification</li>
            <li>✅ Heavy metals screening</li>
            <li>✅ Microbial contamination testing</li>
            <li>✅ Certificate of Analysis (COA) available</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">💳 Payment Methods</h3>
          <p className="text-gray-600 mb-4">We accept the following secure payment methods:</p>
          <ul className="space-y-2 text-gray-600">
            <li>₿ Bitcoin (BTC) - Preferred method</li>
            <li>📱 Telegram Pay - Quick checkout</li>
            <li>💰 Other methods available upon request</li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Order information is automatically saved in our database and sent to our team for processing.
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="text-yellow-800">
            <strong>Security Notice:</strong> All payments are processed securely. We never store payment information and use encrypted channels for all transactions.
          </p>
        </div>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <div className="max-w-7xl mx-auto">
      {/* Why Choose Us Section - AT TOP AND SMALLER */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-xl p-4 mb-8 shadow-xl border border-gray-600">
        <h2 className="text-xl font-bold mb-3 text-center">
          {language === 'en' ? 'Why Choose MySupps?' : '¿Por qué elegir MySupps?'}
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><span className="mr-2">💪</span> Build Lean Muscle Faster</li>
              <li className="flex items-center"><span className="mr-2">⚡</span> Enhance Strength and Endurance</li>
              <li className="flex items-center"><span className="mr-2">🔄</span> Accelerate Recovery</li>
              <li className="flex items-center"><span className="mr-2">🧬</span> Support Healthy Aging</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><span className="mr-2">✨</span> Fight Fatigue & Elevate Confidence</li>
              <li className="flex items-center"><span className="mr-2">🏆</span> Trusted by Athletes</li>
              <li className="flex items-center"><span className="mr-2">🔬</span> Science-Backed Formulas</li>
              <li className="flex items-center"><span className="mr-2">📊</span> Lab Tested Quality</li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Referral Section */}
      {user && userProfile && (
        <ReferralSection
          userProfile={userProfile}
          language={language}
          referralCount={referralCount}
        />
      )}

      {/* Authentication CTA for non-logged in users */}
      {!user && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-200 rounded-2xl p-6 md:p-8 mb-8 shadow-lg text-center">
          {pendingReferralCode && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 font-semibold">
                🎉 {language === 'en' 
                  ? `You've been invited! Referral code: ${pendingReferralCode}`
                  : `¡Has sido invitado! Código de referido: ${pendingReferralCode}`
                }
              </p>
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
            {language === 'en' ? 'Join MySupps Today!' : '¡Únete a MySupps Hoy!'}
          </h3>
          <p className="text-green-700 mb-6 text-base md:text-lg">
            {language === 'en' 
              ? 'Sign up now to access exclusive discounts, referral rewards, and track your orders.'
              : 'Regístrate ahora para acceder a descuentos exclusivos, recompensas de referidos y rastrear tus pedidos.'
            }
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => handleAuthAction('signup')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3"
            >
              {language === 'en' ? 'Create Account' : 'Crear Cuenta'}
            </Button>
            <Button 
              onClick={() => handleAuthAction('login')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-6 md:px-8 py-3"
            >
              {language === 'en' ? 'Sign In' : 'Iniciar Sesión'}
            </Button>
          </div>
        </div>
      )}

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {selectedCategory === 'all' ? t.allProducts : t[selectedCategory as keyof typeof t]}
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            {language === 'en' 
              ? `${filteredProducts.length} products found`
              : `${filteredProducts.length} productos encontrados`
            }
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium text-sm md:text-base">{t.sortBy}</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 md:w-52 border-2 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">{t.nameAsc}</SelectItem>
              <SelectItem value="name-desc">{t.nameDesc}</SelectItem>
              <SelectItem value="price-asc">{t.priceAsc}</SelectItem>
              <SelectItem value="price-desc">{t.priceDesc}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        language={language}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
        isAuthenticated={!!user}
        onAuthAction={handleAuthAction}
        onCartOpen={handleCartOpen}
        onMenuToggle={handleMenuToggle}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex pt-28">
        <Sidebar
          language={language}
          isOpen={sidebarOpen}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setSidebarOpen(false); // Close sidebar after selection on mobile
          }}
          userProfile={userProfile}
          referralCount={referralCount}
        />

        <main className="flex-1 p-4 md:p-8">
          {currentPage === 'home' && renderHomePage()}
          {currentPage === 'about' && renderAboutPage()}
          {currentPage === 'contact' && renderContactPage()}
          {currentPage === 'delivery' && renderDeliveryPage()}
          {currentPage === 'payment' && renderPaymentPage()}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => {
            console.log('Overlay clicked, closing sidebar');
            setSidebarOpen(false);
          }}
        />
      )}

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        referralCode={pendingReferralCode}
        onSignupSuccess={() => setPendingReferralCode(null)}
      />

      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cart={cart}
        products={products}
        onUpdateCart={handleUpdateCart}
        userDiscount={userDiscount}
        language={language}
        isAuthenticated={!!user}
        userProfile={userProfile}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={productDetailModalOpen}
        onClose={() => setProductDetailModalOpen(false)}
        onAddToCart={handleAddToCart}
        language={language}
      />
    </div>
  );
};

export default Index;
