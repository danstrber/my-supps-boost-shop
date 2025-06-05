
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
        product.categories.includes(selectedCategory)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
        isAuthenticated={!!user}
        onAuthAction={handleAuthAction}
        onCartOpen={handleCartOpen}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
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

        <main className="flex-1 p-6">
          {/* Features Section */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold text-gray-700 mb-2">Free Shipping Over $100</h3>
                <p className="text-sm text-gray-600">Orders under $100 have a $7 shipping fee</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">🔬</div>
                <h3 className="font-semibold text-gray-700 mb-2">Lab Tested</h3>
                <p className="text-sm text-gray-600">Third-party tested for purity and potency</p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-semibold text-gray-700 mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-600">Research-grade compounds for optimal results</p>
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedCategory === 'all' ? t.allProducts : t[selectedCategory as keyof typeof t]}
              </h3>
              <p className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">{t.sortBy}</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
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
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl p-8 mt-12 shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Unlock Your Potential with Science-Backed Performance Enhancers
            </h1>
            <p className="text-lg mb-6 opacity-90 text-center">
              Are you striving for more — in the gym, in the mirror, or in life?
            </p>
            <p className="text-base mb-6 opacity-85 text-center max-w-4xl mx-auto">
              Whether you're chasing peak performance, accelerated recovery, or a sculpted physique, 
              advanced peptides and medically-guided anabolic support may offer the edge you've been looking for.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6 max-w-6xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Why Choose Our Products?</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center"><span className="mr-3 text-xl">💪</span> Build Lean Muscle Faster</li>
                  <li className="flex items-center"><span className="mr-3 text-xl">⚡</span> Enhance Strength and Boost Endurance</li>
                  <li className="flex items-center"><span className="mr-3 text-xl">🔄</span> Accelerate Recovery Between Workouts</li>
                  <li className="flex items-center"><span className="mr-3 text-xl">🧬</span> Support Healthy Aging with hormone-optimizing solutions</li>
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Additional Benefits</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center"><span className="mr-3 text-xl">✨</span> Fight Fatigue & Elevate Confidence</li>
                  <li className="flex items-center"><span className="mr-3 text-xl">🏆</span> Trusted by athletes, professionals, and wellness enthusiasts</li>
                  <li className="flex items-center"><span className="mr-3 text-xl">🔬</span> Today's treatments are tailored, safe, and built around your goals</li>
                  <li className="flex items-center"><span className="mr-3 text-xl">📊</span> Science meets performance. Results meet confidence.</li>
                </ul>
              </div>
            </div>
          </div>
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
