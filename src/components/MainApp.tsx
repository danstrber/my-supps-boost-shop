
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import Header from '@/components/Header';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import Sidebar from '@/components/Sidebar';
import StaticPage from '@/components/StaticPage';
import Account from '@/pages/Account';
import Index from '@/pages/Index';
import { products } from '@/lib/products';
import { calculateUserDiscount } from '@/lib/referral';

const MainApp = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isAuthenticated, userProfile, logout } = useAuth();
  const { cart, cartItemCount, handleAddToCart, handleUpdateCart, clearCart } = useCart();

  // Calculate user discount
  const [userDiscount, setUserDiscount] = useState(0);

  useEffect(() => {
    const calculateDiscount = async () => {
      if (isAuthenticated && userProfile) {
        const cartValue = Object.entries(cart).reduce((total, [productId, quantity]) => {
          const product = products.find(p => p.id === productId);
          return total + (product ? product.price * quantity : 0);
        }, 0);
        
        const discount = await calculateUserDiscount(userProfile, cartValue);
        setUserDiscount(discount);
      } else {
        setUserDiscount(0);
      }
    };

    calculateDiscount();
  }, [isAuthenticated, userProfile, cart]);

  const handleLanguageChange = (lang: 'en' | 'es') => {
    setLanguage(lang);
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      logout();
    } else {
      setAuthModalState({ isOpen: true, mode: action });
    }
  };

  const handleCloseAuthModal = () => {
    setAuthModalState({ isOpen: false, mode: 'login' });
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Index
            language={language}
            onAddToCart={handleAddToCart}
            userDiscount={userDiscount}
            isAuthenticated={isAuthenticated}
            onAuthAction={handleAuthAction}
          />
        );
      case 'account':
        return <Account language={language} />;
      default:
        return (
          <StaticPage
            page={currentPage}
            language={language}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthAction}
        onCartOpen={handleCartOpen}
        onMenuToggle={handleMenuToggle}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        sidebarOpen={sidebarOpen}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        language={language}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthAction}
      />

      {renderCurrentPage()}

      <CartModal
        isOpen={isCartOpen}
        onClose={handleCartClose}
        cart={cart}
        products={products}
        onUpdateCart={handleUpdateCart}
        userDiscount={userDiscount}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
        onPageChange={handlePageChange}
      />

      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={handleCloseAuthModal}
        mode={authModalState.mode}
        language={language}
      />
    </div>
  );
};

export default MainApp;
