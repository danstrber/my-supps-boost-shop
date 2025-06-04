
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { products, Product } from '@/lib/products';
import { translations } from '@/lib/translations';
import { getCurrentUser, getUserDiscount, signOut, UserProfile } from '@/lib/auth';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
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
    console.log('View details for:', product);
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
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
        isAuthenticated={!!user}
        onAuthAction={handleAuthAction}
        onCartOpen={handleCartOpen}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        <Sidebar
          language={language}
          isOpen={sidebarOpen}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          userProfile={userProfile}
          referralCount={referralCount}
        />

        <main className="flex-1 p-6">
          {/* Promo Section */}
          <div className="bg-[#e8f5e9] border border-[#2e7d32] rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#2e7d32] mb-2">
              Premium Research Chemicals
            </h2>
            <p className="text-[#333] mb-4">
              {language === 'en' 
                ? 'Discover our high-quality research chemicals for laboratory use. All products are third-party tested for purity and potency.'
                : 'Descubre nuestros químicos de investigación de alta calidad para uso en laboratorio. Todos los productos están probados por terceros para pureza y potencia.'
              }
            </p>
            <div className="flex gap-4 text-sm">
              <span className="bg-white px-3 py-1 rounded-full text-[#2e7d32] font-medium">
                🚚 Free shipping over $100
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-[#2e7d32] font-medium">
                🔬 Lab tested
              </span>
              <span className="bg-white px-3 py-1 rounded-full text-[#2e7d32] font-medium">
                💎 Premium quality
              </span>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#333] mb-2">
                {selectedCategory === 'all' ? t.allProducts : t[selectedCategory as keyof typeof t]}
              </h3>
              <p className="text-sm text-[#666]">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#333]">{t.sortBy}</span>
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
    </div>
  );
};

export default Index;
