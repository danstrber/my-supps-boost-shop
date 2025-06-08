import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, FileText, Star } from 'lucide-react';
import { Product } from '@/lib/products';
import { translations } from '@/lib/translations';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  language: 'en' | 'es';
  userDiscount: number;
}

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart, language, userDiscount }: ProductDetailModalProps) => {
  const t = translations[language];
  
  if (!product) return null;

  const discountedPrice = product.price * (1 - userDiscount / 100);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-gray-100">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-xl border-4 border-gray-200 shadow-xl"
              />
              {product.featured && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 text-sm">
                  Featured
                </Badge>
              )}
              {product.labTestFile && (
                <Badge className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-sm">
                  Lab Tested
                </Badge>
              )}
            </div>
            
            {/* Lab Test Section */}
            {product.labTestFile && (
              <div className="bg-white p-6 rounded-xl border-2 border-green-200 shadow-lg">
                <h4 className="font-bold text-green-700 mb-4 text-lg">🔬 Lab Test Results</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <img
                    src={product.image}
                    alt={`${product.name} bottle`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <img
                    src={product.labTestFile}
                    alt={`${product.name} lab test`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.open(product.labTestFile, '_blank')}
                  className="w-full border-green-500 text-green-600 hover:bg-green-50 font-semibold"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Lab Test Report
                </Button>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {userDiscount > 0 ? (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-4xl font-bold text-gray-800">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {userDiscount}% discount applied
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <Button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 text-lg font-semibold"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {language === 'en' ? 'Add to Cart' : 'Agregar al Carrito'}
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.research}</h4>
                <p className="text-gray-600">{product.details.research}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.effectsOnWomen}</h4>
                <p className="text-gray-600">{product.details.effectsOnWomen}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.benefits}</h4>
                <p className="text-gray-600">{product.details.benefits}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.sideEffects}</h4>
                <p className="text-red-600 font-medium">{product.details.sideEffects}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.history}</h4>
                <p className="text-gray-600">{product.details.history}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.howItWorks}</h4>
                <p className="text-gray-600">{product.details.howItWorks}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.safety}</h4>
                <p className="text-orange-600 font-medium">{product.details.safety}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.cycle}</h4>
                <p className="text-gray-600">{product.details.cycle}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-lg">{t.expectations}</h4>
                <p className="text-gray-600">{product.details.expectations}</p>
              </div>

              {/* Ratings */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">{t.ratings}</h4>
                <div className="space-y-3">
                  {Object.entries(product.details.ratings).map(([category, rating]) => (
                    <div key={category} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">{category}</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(rating)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
