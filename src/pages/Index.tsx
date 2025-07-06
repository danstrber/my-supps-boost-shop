import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductGrid from '@/components/ProductGrid';
import ProductDetailModal from '@/components/ProductDetailModal';
import { products, Product } from '@/lib/products';
import { translations } from '@/lib/translations';
import CoachingModal from '@/components/CoachingModal';

interface IndexProps {
  language: 'en' | 'es';
  onAddToCart: (product: Product) => void;
  userDiscount: number;
  isAuthenticated?: boolean;
  onAuthAction?: (action: 'login' | 'signup') => void;
  onPageChange?: (page: string) => void;
}

const Index = ({ 
  language, 
  onAddToCart, 
  userDiscount, 
  isAuthenticated = false, 
  onAuthAction,
  onPageChange 
}: IndexProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [coachingModalOpen, setCoachingModalOpen] = useState(false);
  const t = translations[language];

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let tempProducts = products;

    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredProducts(tempProducts);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const handleResetCategory = () => {
      setSelectedCategory('all');
    };

    window.addEventListener('resetCategory', handleResetCategory);

    return () => {
      window.removeEventListener('resetCategory', handleResetCategory);
    };
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCoachingClick = () => {
    setCoachingModalOpen(true);
  };

  const handleShopNow = () => {
    // Scroll to products section
    const productsSection = document.querySelector('.grid');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    // Navigate to about page if onPageChange is available
    if (onPageChange) {
      onPageChange('about');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Coaching Banner */}
        <div className="mb-8">
          <div 
            onClick={handleCoachingClick}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl p-6 text-center text-white cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-2xl border border-blue-300"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl mr-3">💬</div>
              <h2 className="text-2xl font-bold">
                {language === 'en' ? 'Need Expert Guidance?' : '¿Necesitas Orientación Experta?'}
              </h2>
            </div>
            <p className="text-lg mb-4 opacity-95">
              {language === 'en' 
                ? 'Get personalized coaching, custom cycles, and 24/7 support from our experts!'
                : '¡Obtén coaching personalizado, ciclos personalizados y soporte 24/7 de nuestros expertos!'
              }
            </p>
            <div className="inline-flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-colors">
              <span className="text-lg font-semibold mr-2">💬</span>
              <span className="font-bold">
                {language === 'en' ? 'Get Coaching' : 'Obtener Coaching'}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t.heroSubtitle}
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold"
              onClick={handleShopNow}
            >
              {t.shopNow}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={handleLearnMore}
            >
              {t.learnMore}
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full md:w-1/2">
            <Input
              type="search"
              placeholder={t.searchProducts}
              className="w-full rounded-full py-3 pl-10 pr-4 border-gray-300 focus:ring-green-500 focus:border-green-500"
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <Button
            onClick={toggleFilter}
            className="md:hidden bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Filter Categories */}
        <div className={`flex flex-wrap gap-4 mb-8 ${isFilterOpen ? 'block' : 'hidden md:flex'}`}>
          <Button
            onClick={() => handleCategoryClick('all')}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'all' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            {t.allCategories}
          </Button>
          <Button
            onClick={() => handleCategoryClick('oral-steroids')}
            variant={selectedCategory === 'oral-steroids' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'oral-steroids' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            {t.oralSteroids}
          </Button>
          <Button
            onClick={() => handleCategoryClick('injectable-steroids')}
            variant={selectedCategory === 'injectable-steroids' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'injectable-steroids' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            {t.injectableSteroids}
          </Button>
          <Button
            onClick={() => handleCategoryClick('sarms')}
            variant={selectedCategory === 'sarms' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'sarms' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            SARMs
          </Button>
          <Button
            onClick={() => handleCategoryClick('growth')}
            variant={selectedCategory === 'growth' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'growth' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            {t.growthHormones}
          </Button>
          <Button
            onClick={() => handleCategoryClick('fat-burners')}
            variant={selectedCategory === 'fat-burners' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'fat-burners' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            {t.fatBurners}
          </Button>
          <Button
            onClick={() => handleCategoryClick('pct')}
            variant={selectedCategory === 'pct' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'pct' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            PCT
          </Button>
           <Button
            onClick={() => handleCategoryClick('support')}
            variant={selectedCategory === 'support' ? 'default' : 'outline'}
            className={`rounded-full ${selectedCategory === 'support' ? 'bg-green-600 text-white' : 'border-green-500 text-green-600 hover:bg-green-50'}`}
          >
            {t.support}
          </Button>
          {isFilterOpen && (
            <Button onClick={toggleFilter} className="md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 shadow">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          language={language}
          onAddToCart={onAddToCart}
          onProductClick={handleProductClick}
          userDiscount={userDiscount}
          isAuthenticated={isAuthenticated}
          onAuthAction={onAuthAction}
        />
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={onAddToCart}
          language={language}
          userDiscount={userDiscount}
        />
      )}
      
      <CoachingModal 
        isOpen={coachingModalOpen} 
        onClose={() => setCoachingModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
