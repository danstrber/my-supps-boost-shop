import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import StaticPage from '@/components/StaticPage';
import Account from './Account';
import { products, Product } from '@/lib/products';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useSidebar } from '@/hooks/useSidebar';
import { getReferralCodeFromUrl } from '@/lib/referral';

console.log('Index component loading...');

const Index = () => {
  console.log('Index component rendering...');
  
  // Initialize language from localStorage or default to English
  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'en' | 'es') || 'en';
    }
    return 'en';
  });
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account'>('home');
  const [referralCount, setReferralCount] = useState(0);
  const [detectedReferralCode, setDetectedReferralCode] = useState<string | null>(null);

  // Custom hooks
  const { userProfile, isAuthenticated, userDiscount, loading, handleAuthAction } = useAuth();
  const { cart, cartItemCount, handleAddToCart, handleUpdateCart } = useCart();
  const { sidebarOpen, handleMenuToggle, handleSidebarClose } = useSidebar();

  console.log('Index state initialized', { loading, isAuthenticated });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Check for referral code in URL on mount
  useEffect(() => {
    try {
      const referralCode = getReferralCodeFromUrl();
      if (referralCode) {
        console.log('Detected referral code from URL:', referralCode);
        setDetectedReferralCode(referralCode);
        // Auto-open signup modal if user is not authenticated
        if (!isAuthenticated) {
          setAuthMode('signup');
          setIsAuthModalOpen(true);
        }
      }
    } catch (error) {
      console.error('Error checking referral code:', error);
    }
  }, [isAuthenticated]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categories.includes(selectedCategory));

  const handleAuthModalAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      handleAuthAction(action);
      setCurrentPage('home'); // Redirect to home after logout
    } else {
      setAuthMode(action);
      setIsAuthModalOpen(true);
    }
  };

  // Show loading state while auth is initializing
  if (loading) {
    console.log('Showing loading state...');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  console.log('Index rendering main content', { currentPage });

  // Render account page
  if (currentPage === 'account') {
    return (
      <Account
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthModalAction}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuToggle={handleMenuToggle}
        onPageChange={setCurrentPage}
        sidebarOpen={sidebarOpen}
      />
    );
  }

  // Render static pages
  if (currentPage !== 'home') {
    return (
      <StaticPage
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthModalAction}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuToggle={handleMenuToggle}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sidebarOpen={sidebarOpen}
        onSidebarClose={handleSidebarClose}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthModalAction}
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
          userProfile={userProfile}
        />
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        onUpdateCart={handleUpdateCart}
        userDiscount={userDiscount}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        referralCode={detectedReferralCode}
        language={language}
        onSignupSuccess={() => {
          console.log('Signup successful, user should be created in database');
        }}
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

console.log('Index component defined');

export default Index;
