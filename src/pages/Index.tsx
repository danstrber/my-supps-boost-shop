
import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { products, Product } from '@/lib/products';
import { translations } from '@/lib/translations';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { toast } = useToast();

  const t = translations[language];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.categories.includes(selectedCategory)
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default: // name-asc
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleViewDetails = (product: Product) => {
    // This would open a product detail modal
    console.log('View details for:', product);
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    // This would handle authentication actions
    console.log('Auth action:', action);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartItemCount={cartItemCount}
        isAuthenticated={!!user}
        onAuthAction={handleAuthAction}
        onCartOpen={() => console.log('Open cart')}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        <Sidebar
          language={language}
          isOpen={sidebarOpen}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
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
    </div>
  );
};

export default Index;
