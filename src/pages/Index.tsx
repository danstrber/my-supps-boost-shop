
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import CartModal from '@/components/CartModal';
import AuthModal from '@/components/AuthModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import StaticPage from '@/components/StaticPage';
import { products, Product } from '@/lib/products';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useSidebar } from '@/hooks/useSidebar';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting'>('home');
  const [referralCount, setReferralCount] = useState(0);

  // Custom hooks
  const { userProfile, isAuthenticated, userDiscount, loading, handleAuthAction } = useAuth();
  const { cart, cartItemCount, handleAddToCart, handleUpdateCart } = useCart();
  const { sidebarOpen, handleMenuToggle, handleSidebarClose } = useSidebar();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categories.includes(selectedCategory));

  const handleAuthModalAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      handleAuthAction(action);
    } else {
      setAuthMode(action);
      setIsAuthModalOpen(true);
    }
  };

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
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
