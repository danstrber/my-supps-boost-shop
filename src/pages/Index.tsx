
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { products, Product } from '@/lib/products';
import { translations } from '@/lib/translations';
import { getCurrentUser, getUserDiscount, signOut, UserProfile } from '@/lib/auth';
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
  const { toast } = useToast();

  const t = translations[language];

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

  // Auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { user: currentUser, profile } = await getCurrentUser();
        setUser(currentUser);
        setUserProfile(profile);
        
        if (currentUser) {
          const discount = await getUserDiscount(currentUser.id);
          setUserDiscount(discount);
          
          // Get referral count
          const { data: referrals } = await supabase
            .from('referrals')
            .select('id')
            .eq('referrer_id', profile?.id);
          setReferralCount(referrals?.length || 0);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setUserDiscount(0);
        setReferralCount(0);
      }
    });

    // Check for existing session
    getCurrentUser().then(({ user: currentUser, profile }) => {
      setUser(currentUser);
      setUserProfile(profile);
      
      if (currentUser) {
        getUserDiscount(currentUser.id).then(setUserDiscount);
        
        supabase
          .from('referrals')
          .select('id')
          .eq('referrer_id', profile?.id)
          .then(({ data }) => setReferralCount(data?.length || 0));
      }
    });

    return () => subscription.unsubscribe();
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
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }
    setCartModalOpen(true);
  };

  const cartItemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const renderAboutPage = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About MySupps</h1>
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p className="text-lg">
          Welcome to MySupps, your trusted source for premium research chemicals and performance enhancement compounds. 
          We specialize in providing laboratory-grade substances for research purposes, catering to fitness enthusiasts, 
          researchers, and professionals seeking cutting-edge performance solutions.
        </p>
        <p>
          Our mission is to bridge the gap between scientific innovation and practical application, offering products 
          that meet the highest standards of purity and potency. Every product in our catalog undergoes rigorous 
          third-party testing to ensure you receive exactly what you expect.
        </p>
        <p>
          Founded by researchers and fitness professionals, MySupps understands the unique needs of our community. 
          We're committed to providing not just products, but education and support to help you make informed decisions 
          about your research goals.
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
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <div className="space-y-6">
        <p className="text-gray-600 text-lg">
          We're here to help with any questions about our products, orders, or research guidance. 
          Reach out to us through any of the following channels:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📧 Email Support</h3>
            <p className="text-gray-600 mb-2">For general inquiries and support:</p>
            <a href="mailto:christhomaso083@proton.me" className="text-blue-600 font-semibold hover:underline">
              christhomaso083@proton.me
            </a>
            <p className="text-sm text-gray-500 mt-2">Response time: 24-48 hours</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📱 Telegram</h3>
            <p className="text-gray-600 mb-2">For quick questions and order updates:</p>
            <a href="https://t.me/DANSTRBER" className="text-green-600 font-semibold hover:underline">
              @DANSTRBER
            </a>
            <p className="text-sm text-gray-500 mt-2">Response time: 1-6 hours</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🕒 Support Hours</h3>
          <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
          <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM (EST)</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="text-yellow-800">
            <strong>Note:</strong> All products are sold for research purposes only. We do not provide medical advice. 
            Please consult with a healthcare professional before starting any research protocol.
          </p>
        </div>
      </div>
    </div>
  );

  const renderDeliveryPage = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Delivery Information</h1>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🚚 Shipping Policy</h3>
          <p className="text-gray-600 text-lg mb-4">
            We ship as soon as possible! Orders are typically processed and shipped within 2-3 business days.
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
            <p className="text-gray-600">Domestic (USA): 3-7 business days</p>
            <p className="text-gray-600">International: 7-21 business days</p>
            <p className="text-gray-600">Express options available upon request</p>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="text-red-800">
            <strong>Important:</strong> Delivery times may vary due to customs processing for international orders. 
            We are not responsible for customs delays or fees.
          </p>
        </div>
      </div>
    </div>
  );

  const renderPaymentPage = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Payment & Lab Testing</h1>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">💳 Payment Methods</h3>
          <p className="text-gray-600 mb-4">We accept the following secure payment methods:</p>
          <ul className="space-y-2 text-gray-600">
            <li>₿ Bitcoin (BTC) - Preferred method</li>
            <li>💳 PayPal - Fast and secure</li>
            <li>📱 Telegram Pay - Quick checkout</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🔬 Lab Testing</h3>
          <p className="text-gray-600 mb-4">
            All our products undergo rigorous third-party testing to ensure purity and potency. 
            Lab reports are available for products marked with the "Lab Tested" badge.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>✅ HPLC testing for purity verification</li>
            <li>✅ Heavy metals screening</li>
            <li>✅ Microbial contamination testing</li>
            <li>✅ Certificate of Analysis (COA) available</li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <p className="text-yellow-800">
            <strong>Security Notice:</strong> All payments are processed securely. We never store payment information 
            and use encrypted channels for all transactions.
          </p>
        </div>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <>
      {/* Features Section */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-8 mb-8 shadow-lg">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold text-gray-700 mb-3 text-lg">{t.freeShippingOver}</h3>
            <p className="text-gray-600">{t.shippingFee}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="font-bold text-gray-700 mb-3 text-lg">Lab Tested</h3>
            <p className="text-gray-600">Third-party tested for purity and potency</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="font-bold text-gray-700 mb-3 text-lg">Premium Quality</h3>
            <p className="text-gray-600">Research-grade compounds for optimal results</p>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedCategory === 'all' ? t.allProducts : t[selectedCategory as keyof typeof t]}
          </h3>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">{t.sortBy}</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-52 border-2 border-gray-300">
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

      {/* Hero Section - Moved to bottom */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-2xl p-10 mt-16 shadow-2xl border border-gray-600">
        <h1 className="text-5xl font-bold mb-6 text-center leading-tight">
          Unlock Your Potential with Science-Backed Performance Enhancers
        </h1>
        <p className="text-xl mb-8 opacity-90 text-center leading-relaxed">
          Are you striving for more — in the gym, in the mirror, or in life?
        </p>
        <p className="text-lg mb-8 opacity-85 text-center max-w-5xl mx-auto leading-relaxed">
          Whether you're chasing peak performance, accelerated recovery, or a sculpted physique, 
          advanced peptides and medically-guided anabolic support may offer the edge you've been looking for.
        </p>
        
        <div className="grid md:grid-cols-2 gap-10 mb-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Why Choose Our Products?</h3>
            <ul className="space-y-4 text-left">
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">💪</span> Build Lean Muscle Faster</li>
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">⚡</span> Enhance Strength and Boost Endurance</li>
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">🔄</span> Accelerate Recovery Between Workouts</li>
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">🧬</span> Support Healthy Aging with hormone-optimizing solutions</li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Additional Benefits</h3>
            <ul className="space-y-4 text-left">
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">✨</span> Fight Fatigue & Elevate Confidence</li>
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">🏆</span> Trusted by athletes, professionals, and wellness enthusiasts</li>
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">🔬</span> Today's treatments are tailored, safe, and built around your goals</li>
              <li className="flex items-center text-lg"><span className="mr-4 text-2xl">📊</span> Science meets performance. Results meet confidence.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
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
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <div className="flex pt-16">
        <Sidebar
          language={language}
          isOpen={sidebarOpen}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          userProfile={userProfile}
          referralCount={referralCount}
        />

        <main className="flex-1 p-8">
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
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
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
