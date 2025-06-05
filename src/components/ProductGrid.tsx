
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/products';
import { translations } from '@/lib/translations';

interface ProductGridProps {
  products: Product[];
  language: 'en' | 'es';
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductGrid = ({ products, language, onAddToCart, onViewDetails }: ProductGridProps) => {
  const t = translations[language];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white border-2 border-gray-200 hover:border-gray-400 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
          <div className="relative mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg"
            />
            {product.featured && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                Featured
              </span>
            )}
            {product.labTestFile && (
              <span className="absolute top-3 right-3 bg-green-600 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                Lab Tested
              </span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl">
                <span className="text-white font-bold text-xl">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-xl group-hover:text-gray-600 transition-colors leading-tight">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <span
                  key={category}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium border border-gray-300"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  onClick={() => onViewDetails(product)}
                  className="w-full text-blue-600 border-blue-500 hover:bg-blue-50 hover:text-blue-700 font-semibold py-2"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {t.viewDetails}
                </Button>
                
                <Button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-2"
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
