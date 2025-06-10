
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/products';
import { translations } from '@/lib/translations';

interface ProductGridProps {
  products: Product[];
  language: 'en' | 'es';
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  userDiscount: number;
}

const ProductGrid = ({ products, language, onAddToCart, onProductClick }: ProductGridProps) => {
  const t = translations[language];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        return (
          <div key={product.id} className="bg-white border border-gray-200 hover:border-green-300 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1">
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 md:h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.featured && (
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                    Featured
                  </span>
                )}
                {product.labTestFile && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                    Lab Tested
                  </span>
                )}
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
                  <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 text-lg md:text-xl group-hover:text-green-600 transition-colors leading-tight line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {product.categories.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium"
                  >
                    {category}
                  </span>
                ))}
                {product.categories.length > 2 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                    +{product.categories.length - 2}
                  </span>
                )}
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-2xl md:text-3xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => onProductClick(product)}
                    className="w-full text-blue-600 border-blue-500 hover:bg-blue-50 hover:text-blue-700 font-medium py-2 rounded-lg"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {t.viewDetails}
                  </Button>
                  
                  <Button
                    onClick={() => onAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg shadow-sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {language === 'en' ? 'Add to Cart' : 'Agregar'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
