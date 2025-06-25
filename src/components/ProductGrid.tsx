
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, User, Star } from 'lucide-react';
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
  
  // Sort products to show featured ones first
  const sortedProducts = [...products].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
  
  return (
    <div className="space-y-6">
      {/* Sign In Button for non-authenticated users */}
      {!isAuthenticated && onAuthAction && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-green-800 font-semibold mb-1">
                {language === 'en' 
                  ? 'Unlock Exclusive Benefits!' 
                  : '¡Desbloquea Beneficios Exclusivos!'}
              </p>
              <p className="text-green-700 text-sm">
                {language === 'en' 
                  ? 'Sign in to access exclusive discounts and track your orders!' 
                  : '¡Inicia sesión para acceder a descuentos exclusivos y rastrear tus pedidos!'}
              </p>
            </div>
          </div>
          <Button
            onClick={() => onAuthAction('login')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2"
          >
            <User className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Sign In' : 'Iniciar Sesión'}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {sortedProducts.map((product) => {
          if (!product) return null;
          
          return (
            <div key={product.id} className="bg-white border border-gray-200 hover:border-green-300 rounded-xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2 relative">
              {/* Featured Tag */}
              {product.featured && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    {t.featured}
                  </span>
                </div>
              )}

              {/* Lab Tested Tag */}
              {product.labTested && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                    🧪 {t.labTested}
                  </span>
                </div>
              )}

              <div className="relative mb-4 mt-8">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 md:h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 border border-gray-100"
                  />
                ) : (
                  <div className="w-full h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-gray-400 text-sm font-medium">
                      {language === 'en' ? 'No Image' : 'Sin Imagen'}
                    </span>
                  </div>
                )}
                {product.inStock === false && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
                    <span className="text-white font-bold text-lg">
                      {t.outOfStock}
                    </span>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute bottom-2 right-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium border border-green-200">
                    {product.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-gray-800 text-lg md:text-xl group-hover:text-green-600 transition-colors leading-tight line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Product Specifications */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 text-xs text-gray-600 space-y-1 border border-gray-100">
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Dose per capsule:' : 'Dosis por cápsula:'}</span>
                    <span className="font-medium text-green-700">{product.specifications.dosePerCapsule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Capsules per bottle:' : 'Cápsulas por frasco:'}</span>
                    <span className="font-medium text-green-700">{product.specifications.capsulesPerBottle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'en' ? 'Potency level:' : 'Nivel de potencia:'}</span>
                    <span className="font-medium text-green-700">{product.specifications.potencyLevel}</span>
                  </div>
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
                      className="w-full text-blue-600 border-blue-500 hover:bg-blue-50 hover:text-blue-700 font-medium py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t.viewDetails}
                    </Button>
                    
                    <Button
                      onClick={() => onAddToCart(product)}
                      disabled={product.inStock === false}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-lg transform hover:scale-105"
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
