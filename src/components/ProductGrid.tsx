
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/products';

interface ProductGridProps {
  products: Product[];
  language: 'en' | 'es';
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductGrid = ({ products, language, onAddToCart, onViewDetails }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white border border-[#ddd] rounded-lg p-4 hover:shadow-lg transition-shadow">
          <div className="relative mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            {product.featured && (
              <span className="absolute top-2 left-2 bg-[#2e7d32] text-white text-xs px-2 py-1 rounded">
                Featured
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white font-bold">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-[#333] text-lg">{product.name}</h3>
            
            <p className="text-[#666] text-sm line-clamp-2">{product.description}</p>
            
            <div className="flex flex-wrap gap-1">
              {product.categories.map((category) => (
                <span
                  key={category}
                  className="bg-[#e8f5e9] text-[#2e7d32] text-xs px-2 py-1 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-[#2e7d32]">
                ${product.price.toFixed(2)}
              </span>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(product)}
                  className="text-[#2196f3] border-[#2196f3] hover:bg-[#2196f3] hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="bg-[#2e7d32] hover:bg-[#1b5e20] disabled:bg-gray-400"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Add to Cart' : 'Agregar'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
