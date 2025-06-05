
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
        <div key={product.id} className="bg-white border-2 border-gray-200 hover:border-gray-400 rounded-xl p-4 hover:shadow-xl transition-all duration-300 group">
          <div className="relative mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            {product.featured && (
              <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                Featured
              </span>
            )}
            {product.labTestFile && (
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                Lab Tested
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
                <span className="text-white font-bold text-lg">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 text-lg group-hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {product.categories.map((category) => (
                <span
                  key={category}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(product)}
                  className="text-blue-600 border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium"
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
