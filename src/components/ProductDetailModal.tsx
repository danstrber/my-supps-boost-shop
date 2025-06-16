
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Shield, X, Pill, Timer, Zap, AlertTriangle, Info, Target, TrendingUp } from 'lucide-react';
import { Product } from '@/lib/products';
import { translations } from '@/lib/translations';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  language: 'en' | 'es';
  userDiscount: number;
}

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  language
}: ProductDetailModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const t = translations[language];

  const images = [product.image];

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  const labels = {
    en: {
      benefits: 'Benefits',
      categories: 'Categories',
      productSpecs: 'Product Specifications',
      clickToView: 'Click to view full lab test results'
    },
    es: {
      benefits: 'Beneficios',
      categories: 'Categorías',
      productSpecs: 'Especificaciones del Producto',
      clickToView: 'Haz clic para ver los resultados completos del laboratorio'
    }
  };

  const l = labels[language];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Side - Image and Basic Info */}
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {language === 'en' ? 'Detailed product information and specifications' : 'Información detallada del producto y especificaciones'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="relative group">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg border border-gray-200 cursor-pointer"
                  onClick={() => openImageModal(selectedImageIndex)}
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.labTested && (
                    <Badge className="bg-green-600 text-white text-xs">
                      {t.labTested}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Product Specs */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {l.productSpecs}
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-600" />
                    <div>
                      <span className="text-gray-600 text-xs block">Category</span>
                      <span className="font-semibold capitalize">{product.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="bg-white border rounded-lg p-4 text-center">
                <span className="text-3xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  onClick={handleAddToCart}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t.addToCart}
                </Button>
              </div>
            </div>

            {/* Right Side - Detailed Information */}
            <div className="space-y-4 text-sm">
              {/* Benefits */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {l.benefits}
                </h4>
                <ul className="text-green-700 text-xs leading-relaxed space-y-1">
                  {product.benefits[language].map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Description
                </h4>
                <p className="text-blue-700 text-xs leading-relaxed">{product.description[language]}</p>
              </div>

              {/* Categories */}
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {l.categories}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {product.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="capitalize text-xs">
                      {category.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-size Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="sm:max-w-4xl p-0 bg-black/95">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name} - Full Size Image</DialogTitle>
            <DialogDescription>Full size image view</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setImageModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetailModal;
