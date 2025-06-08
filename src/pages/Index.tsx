import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import { products, Product } from '@/lib/products';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfile, getUserDiscount, type UserProfile } from '@/lib/auth';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting'>('home');
  const [referralCount, setReferralCount] = useState(0);
  const [userDiscount, setUserDiscount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (session?.user) {
        setIsAuthenticated(true);
        try {
          const profile = await getUserProfile(session.user.id);
          setUserProfile(profile);
          console.log('User profile loaded:', profile);
          
          // Get user discount
          const discount = await getUserDiscount(session.user.id);
          setUserDiscount(discount);
          console.log('User discount:', discount);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
        setUserDiscount(0);
        console.log('User signed out or no session');
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id || 'null');
      if (session?.user) {
        setIsAuthenticated(true);
        getUserProfile(session.user.id).then(profile => {
          setUserProfile(profile);
          if (profile) {
            getUserDiscount(session.user.id).then(setUserDiscount).catch(console.error);
          }
        }).catch(console.error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categories.includes(selectedCategory));

  const cartItemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateCart = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      });
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } else {
      setAuthMode(action);
      setIsAuthModalOpen(true);
    }
  };

  const handleMenuToggle = () => {
    console.log('Hamburger menu clicked - current state:', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
    console.log('Setting sidebar state to:', !sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const sidebar = document.querySelector('[data-sidebar]');
      const hamburger = document.querySelector('[data-hamburger]');
      
      if (sidebarOpen && sidebar && !sidebar.contains(target) && !hamburger?.contains(target)) {
        console.log('Overlay clicked, closing sidebar');
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  if (currentPage !== 'home') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          cartItemCount={cartItemCount}
          isAuthenticated={isAuthenticated}
          onAuthAction={handleAuthAction}
          onCartOpen={() => setIsCartOpen(true)}
          onMenuToggle={handleMenuToggle}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          sidebarOpen={sidebarOpen}
        />
        <div className="pt-32 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
              {currentPage === 'about' && (language === 'en' ? 'About Us' : 'Acerca de Nosotros')}
              {currentPage === 'contact' && (language === 'en' ? 'Contact Us' : 'Contáctanos')}
              {currentPage === 'delivery' && (language === 'en' ? 'Delivery Information' : 'Información de Entrega')}
              {currentPage === 'payment' && (language === 'en' ? 'Payment Methods' : 'Métodos de Pago')}
              {currentPage === 'labtesting' && (language === 'en' ? 'Lab Testing' : 'Pruebas de Laboratorio')}
            </h1>
            <p className="text-gray-600">
              {language === 'en' ? 'This page is under construction.' : 'Esta página está en construcción.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
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
        onCategoryChange={setSelectedCategory}
        userProfile={userProfile}
        referralCount={referralCount}
        onClose={handleSidebarClose}
      />

      <main className="pt-32 px-4 transition-all duration-300">
        <ProductGrid
          products={filteredProducts}
          language={language}
          onProductClick={setSelectedProduct}
          onAddToCart={handleAddToCart}
          userDiscount={userDiscount}
        />
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
        language={language}
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
