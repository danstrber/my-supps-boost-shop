
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, FileText, Star } from 'lucide-react';
import { Product } from '@/lib/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  language: 'en' | 'es';
}

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart, language }: ProductDetailModalProps) => {
  if (!product) return null;

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg border-2 border-gray-200"
              />
              {product.featured && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  Featured
                </Badge>
              )}
              {product.labTestFile && (
                <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                  Lab Tested
                </Badge>
              )}
            </div>
            
            {product.labTestFile && (
              <Button
                variant="outline"
                onClick={() => window.open(product.labTestFile, '_blank')}
                className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Lab Test
              </Button>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                <Button
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  className="bg-gray-700 hover:bg-gray-800 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Add to Cart' : 'Agregar'}
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-gray-100 text-gray-700">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Research Information */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Research Purpose</h4>
                <p className="text-sm text-gray-600">{product.details.research}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Effects on Women</h4>
                <p className="text-sm text-gray-600">{product.details.effectsOnWomen}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Benefits</h4>
                <p className="text-sm text-gray-600">{product.details.benefits}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Side Effects</h4>
                <p className="text-sm text-red-600">{product.details.sideEffects}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">History</h4>
                <p className="text-sm text-gray-600">{product.details.history}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">How It Works</h4>
                <p className="text-sm text-gray-600">{product.details.howItWorks}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Safety</h4>
                <p className="text-sm text-orange-600">{product.details.safety}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Cycle</h4>
                <p className="text-sm text-gray-600">{product.details.cycle}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Expectations</h4>
                <p className="text-sm text-gray-600">{product.details.expectations}</p>
              </div>

              {/* Ratings */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Ratings</h4>
                <div className="space-y-2">
                  {Object.entries(product.details.ratings).map(([category, rating]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{category}</span>
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
