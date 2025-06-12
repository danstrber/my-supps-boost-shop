
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { products } from '@/lib/products';
import ProductDetailModal from './ProductDetailModal';
import CoachingModal from './CoachingModal';

interface ProductGridProps {
  userProfile: any;
}

const ProductGrid = ({ userProfile }: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showCoachingModal, setShowCoachingModal] = useState(false);
  const { handleAddToCart } = useCart();

  const categories = ['all', 'sarms', 'peptides', 'pct', 'bodybuilding'];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Add null check for product
      if (!product) return false;
      
      const productDescription = typeof product.description === 'string' 
        ? product.description 
        : product.description?.en || '';
      
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          productDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.categories?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleAddToCartClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    handleAddToCart(product);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          // Add safety checks for product and its properties
          if (!product || !product.id) return null;
          
          const productDescription = typeof product.description === 'string' 
            ? product.description 
            : product.description?.en || '';

          return (
            <Card 
              key={product.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative">
                <img 
                  src={product.image || '/placeholder.svg'} 
                  alt={product.name || 'Product'}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {(product.name?.toLowerCase().includes('clen') || product.name?.toLowerCase().includes('superdrol')) && (
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    Lab Tested
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name || 'Unknown Product'}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{productDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">${product.price || 0}</span>
                  <Button 
                    onClick={(e) => handleAddToCartClick(e, product)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        language="en"
        userDiscount={0}
      />

      <CoachingModal
        isOpen={showCoachingModal}
        onClose={() => setShowCoachingModal(false)}
      />
    </div>
  );
};

export default ProductGrid;
