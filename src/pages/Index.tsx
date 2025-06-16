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
  const { userProfile, isAuthenticated, loading, handleAuthAction } = useAuth();
  const { cart, cartItemCount, handleAddToCart, handleUpdateCart } = useCart();
  const { sidebarOpen, handleMenuToggle, handleSidebarClose } = useSidebar();

  console.log('Index state initialized', { loading, isAuthenticated });

  // Calculate user discount with updated rates: 3% for normal users, 7% for referred users
  const calculateUserDiscount = () => {
    if (!userProfile) return 0;
    
    // Check if user has made referrals
    const isReferrer = referralCount > 0;
    
    // First referral bonus
    const firstReferralBonus = userProfile.referred_by ? 10 : 0;
    
    // Referral discount: 2.5% per referral
    const referralDiscount = referralCount * 2.5;
    
    // Calculate spending discount based on current cart value for better UX
    const cartItems = Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      if (!product) return null;
      return { product, quantity };
    }).filter(Boolean) as { product: Product; quantity: number }[];
    
    const currentCartValue = cartItems.reduce((total, { product, quantity }) => total + (product.price * quantity), 0);
    const totalSpendingForDiscount = userProfile.total_spending + currentCartValue;
    
    // NEW: Updated spending discount rates - 3% for normal users, 7% for referred users
    const spendingDiscount = isReferrer
      ? Math.floor(totalSpendingForDiscount / 50) * 5  // Referrers: 5% per $50
      : userProfile.referred_by 
        ? Math.min(Math.floor(totalSpendingForDiscount / 50) * 7, Math.floor(150 / 50) * 7)  // Referred users: 7% per $50 (max at $150)
        : Math.floor(totalSpendingForDiscount / 50) * 3; // Standard users: 3% per $50
    
    // Referred spending discount for referrers
    const referredSpendingDiscount = isReferrer
      ? Math.min(Math.floor(Math.ceil(userProfile.referred_spending) / 50) * 5, Math.floor(150 / 50) * 5)
      : 0;
    
    const totalDiscount = referralDiscount + spendingDiscount + referredSpendingDiscount + firstReferralBonus;
    
    console.log('Discount calculation:', {
      userProfile,
      currentCartValue,
      totalSpendingForDiscount,
      isReferrer,
      firstReferralBonus,
      referralDiscount,
      spendingDiscount,
      referredSpendingDiscount,
      totalDiscount
    });
    
    // Total discount capped at 32%
    return Math.min(totalDiscount, 32);
  };

  const userDiscount = calculateUserDiscount();

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

  const handlePageChange = (page: string) => {
    setCurrentPage(page as 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account');
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
      <>
        <Account
          language={language}
          onLanguageChange={setLanguage}
          cartItemCount={cartItemCount}
          isAuthenticated={isAuthenticated}
          onAuthAction={handleAuthModalAction}
          onCartOpen={() => setIsCartOpen(true)}
          onMenuToggle={handleMenuToggle}
          onPageChange={handlePageChange}
          sidebarOpen={sidebarOpen}
        />

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          products={products}
          onUpdateCart={handleUpdateCart}
          userDiscount={userDiscount}
          isAuthenticated={isAuthenticated}
          userProfile={userProfile}
          onPageChange={handlePageChange}
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
      </>
    );
  }

  // Render static pages
  if (currentPage !== 'home') {
    return (
      <>
        <StaticPage
          language={language}
          onLanguageChange={setLanguage}
          cartItemCount={cartItemCount}
          isAuthenticated={isAuthenticated}
          onAuthAction={handleAuthModalAction}
          onCartOpen={() => setIsCartOpen(true)}
          onMenuToggle={handleMenuToggle}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          sidebarOpen={sidebarOpen}
          onSidebarClose={handleSidebarClose}
        />

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          products={products}
          onUpdateCart={handleUpdateCart}
          userDiscount={userDiscount}
          isAuthenticated={isAuthenticated}
          userProfile={userProfile}
          onPageChange={handlePageChange}
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
      </>
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
        onPageChange={handlePageChange}
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
          isAuthenticated={isAuthenticated}
          onAuthAction={handleAuthModalAction}
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
        onPageChange={handlePageChange}
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
