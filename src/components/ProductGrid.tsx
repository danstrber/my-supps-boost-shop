
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Pill, User } from 'lucide-react';
import { Product } from '@/lib/products';
import { translations } from '@/lib/translations';

interface ProductGridProps {
  products: Product[];
  language: 'en' | 'es';
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  userDiscount: number;
  isAuthenticated?: boolean;
  onAuthAction?: (action: 'login' | 'signup') => void;
}

const ProductGrid = ({ 
  products, 
  language, 
  onAddToCart, 
  onProductClick, 
  userDiscount,
  isAuthenticated = false,
  onAuthAction
}: ProductGridProps) => {
  const t = translations[language];
  
  return (
    <div className="space-y-6">
      {/* Sign In Button for non-authenticated users */}
      {!isAuthenticated && onAuthAction && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 mb-3">
            {language === 'en' 
              ? 'Sign in to access exclusive discounts and track your orders!' 
              : '¡Inicia sesión para acceder a descuentos exclusivos y rastrear tus pedidos!'}
          </p>
          <Button
            onClick={() => onAuthAction('login')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <User className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Sign In' : 'Iniciar Sesión'}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          if (!product) return null;
          
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
                      {t.featured}
                    </span>
                  )}
                  {product.labTestFile && (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                      {t.labTested}
                    </span>
                  )}
                </div>
                {product.inStock === false && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
                    <span className="text-white font-bold text-lg">
                      {t.outOfStock}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-gray-800 text-lg md:text-xl group-hover:text-green-600 transition-colors leading-tight line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {product.description[language]}
                </p>

                {/* Dose and Capsule Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Pill className="h-3 w-3" />
                    <span>{product.specifications[language].dosePerCapsule}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <span>{product.specifications[language].capsulesPerBottle} caps</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {product.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {category.replace('-', ' ')}
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
                      disabled={product.inStock === false}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg shadow-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {t.addToCart}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
