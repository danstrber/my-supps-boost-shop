
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, User, Star, Shield, Sparkles } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Sign In Button for non-authenticated users */}
      {!isAuthenticated && onAuthAction && (
        <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 border-2 border-blue-200 rounded-2xl p-6 text-center shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-blue-800 font-bold mb-1 text-lg">
                {language === 'en' 
                  ? '🎉 Unlock Exclusive Benefits!' 
                  : '🎉 ¡Desbloquea Beneficios Exclusivos!'}
              </p>
              <p className="text-blue-700 text-sm">
                {language === 'en' 
                  ? 'Sign in to access exclusive discounts and track your orders!' 
                  : '¡Inicia sesión para acceder a descuentos exclusivos y rastrear tus pedidos!'}
              </p>
            </div>
          </div>
          <Button
            onClick={() => onAuthAction('login')}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            <User className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Sign In Now' : 'Iniciar Sesión Ahora'}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => {
          if (!product) return null;
          
          return (
            <div key={product.id} className="bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 border-2 border-blue-200/50 hover:border-green-300 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-3 relative overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-green-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Featured Tag */}
              {product.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-2 rounded-full font-bold flex items-center shadow-lg animate-pulse">
                    <Star className="w-3 h-3 mr-1" />
                    {t.featured}
                  </span>
                </div>
              )}

              {/* Lab Tested Tag */}
              {product.labTested && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-2 rounded-full font-bold shadow-lg flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    {t.labTested}
                  </span>
                </div>
              )}

              <div className="relative mb-4 mt-8">
                {product.image ? (
                  <div className="relative group/image">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-xl blur opacity-75 group-hover/image:opacity-100 transition duration-300"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 border-2 border-white shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-gray-200 shadow-inner">
                    <span className="text-gray-500 text-sm font-medium">
                      {language === 'en' ? 'No Image' : 'Sin Imagen'}
                    </span>
                  </div>
                )}
                {product.inStock === false && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl">
                    <span className="text-white font-bold text-lg">
                      {t.outOfStock}
                    </span>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold border-2 border-green-200 shadow-sm">
                    {product.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 relative">
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Product Specifications */}
                <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-xl p-4 text-xs text-gray-700 space-y-2 border border-blue-200 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center"><Sparkles className="w-3 h-3 mr-1 text-blue-500" />{language === 'en' ? 'Dose:' : 'Dosis:'}</span>
                    <span className="font-bold text-blue-700">{product.specifications.dosePerCapsule}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'en' ? 'Capsules:' : 'Cápsulas:'}</span>
                    <span className="font-bold text-green-700">{product.specifications.capsulesPerBottle}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'en' ? 'Level:' : 'Nivel:'}</span>
                    <span className="font-bold text-purple-700">{product.specifications.potencyLevel}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => onProductClick(product)}
                      className="w-full text-blue-600 border-2 border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-blue-700 font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t.viewDetails}
                    </Button>
                    
                    <Button
                      onClick={() => onAddToCart(product)}
                      disabled={product.inStock === false}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
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
