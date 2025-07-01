
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useOrderSuccess } from '@/hooks/useOrderSuccess';
import Header from '@/components/Header';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import Sidebar from '@/components/Sidebar';
import StaticPage from '@/components/StaticPage';
import Account from '@/pages/Account';
import Index from '@/pages/Index';
import { products } from '@/lib/products';

const MainApp = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isAuthenticated, userProfile, handleAuthAction } = useAuth();
  const { cart, cartItemCount, handleAddToCart, handleUpdateCart, clearCart } = useCart();
  const { orderSuccessModal, showOrderSuccess, closeOrderSuccess } = useOrderSuccess();

  // Calculate user discount
  const [userDiscount, setUserDiscount] = useState(0);

  useEffect(() => {
    const calculateDiscount = () => {
      if (isAuthenticated && userProfile) {
        const cartValue = Object.entries(cart).reduce((total, [productId, quantity]) => {
          const product = products.find(p => p.id === productId);
          return total + (product ? product.price * quantity : 0);
        }, 0);
        
        const discount = userProfile ? Math.min(
          (userProfile.referred_by ? 
            Math.floor(userProfile.total_spending / 50) * 6 : 
            Math.floor(userProfile.referred_spending / 50) * 2
          ), 30
        ) : 0;
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

  const handleAuthModalAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      handleAuthAction('logout');
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

  const handleOrderSuccess = () => {
    // Show order success without specific details since they come from PaymentModal
    showOrderSuccess({
      orderId: 'TEMP',
      total: 0,
      customerEmail: userProfile?.email || '',
      paymentMethod: 'Bitcoin'
    });
    clearCart(); // Clear cart after successful order
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
            onAuthAction={handleAuthModalAction}
          />
        );
      case 'account':
        return (
          <Account
            language={language}
            onLanguageChange={handleLanguageChange}
            cartItemCount={cartItemCount}
            isAuthenticated={isAuthenticated}
            onAuthAction={handleAuthModalAction}
            onCartOpen={handleCartOpen}
            onPageChange={handlePageChange}
          />
        );
      default:
        return (
          <StaticPage
            language={language}
            onLanguageChange={handleLanguageChange}
            cartItemCount={cartItemCount}
            isAuthenticated={isAuthenticated}
            onAuthAction={handleAuthModalAction}
            onCartOpen={handleCartOpen}
            currentPage={currentPage as 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account'}
            onPageChange={handlePageChange}
            
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
        onAuthAction={handleAuthModalAction}
        onCartOpen={handleCartOpen}
        
        currentPage={currentPage}
        onPageChange={handlePageChange}
        
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        language={language}
        selectedCategory="all"
        onCategoryChange={(category) => {
          handlePageChange('home');
          setSidebarOpen(false);
        }}
        userProfile={userProfile}
        referralCount={0}
      />

      <div className="pt-16 md:pt-20">
        {renderCurrentPage()}
      </div>

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
        onOrderSuccess={handleOrderSuccess}
      />

      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={handleCloseAuthModal}
        initialMode={authModalState.mode}
        language={language}
      />

      {orderSuccessModal.isOpen && orderSuccessModal.orderDetails && (
        <OrderSuccessModal
          isOpen={orderSuccessModal.isOpen}
          onClose={closeOrderSuccess}
          orderDetails={orderSuccessModal.orderDetails}
          language={language}
        />
      )}
    </div>
  );
};

export default MainApp;
