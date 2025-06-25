
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Star, Sparkles, Shield } from 'lucide-react';
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

  const images = [product.image].filter(Boolean);

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-green-50">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name} - Product Details</DialogTitle>
            <DialogDescription>
              {language === 'en' ? 'Detailed product information and specifications' : 'Información detallada del producto y especificaciones'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-8 p-2">
            {/* Left Side - Image and Basic Info */}
            <div className="space-y-6">
              <div className="relative">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="capitalize bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 border-blue-200">
                    {product.category.replace('-', ' ')}
                  </Badge>
                  {product.featured && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {t.featured}
                    </Badge>
                  )}
                  {product.labTested && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      {t.labTested}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {product.image && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative w-full h-80 object-cover rounded-lg border-2 border-white shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    onClick={() => openImageModal(0)}
                  />
                </div>
              )}

              {/* Product Specifications */}
              <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-blue-800 mb-4 text-xl flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Product Specifications' : 'Especificaciones del Producto'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <span className="font-medium text-blue-700 block mb-1">
                      {language === 'en' ? 'Dose per capsule:' : 'Dosis por cápsula:'}
                    </span>
                    <p className="text-blue-600 font-bold text-lg">{product.specifications.dosePerCapsule}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <span className="font-medium text-blue-700 block mb-1">
                      {language === 'en' ? 'Capsules per bottle:' : 'Cápsulas por frasco:'}
                    </span>
                    <p className="text-blue-600 font-bold text-lg">{product.specifications.capsulesPerBottle}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100 col-span-2">
                    <span className="font-medium text-blue-700 block mb-1">
                      {language === 'en' ? 'Potency level:' : 'Nivel de potencia:'}
                    </span>
                    <p className="text-blue-600 font-bold text-lg">{product.specifications.potencyLevel}</p>
                  </div>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="bg-gradient-to-br from-green-50 via-white to-green-50 border-2 border-green-300 rounded-xl p-6 text-center shadow-lg">
                <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block mb-4">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock === false
                    ? t.outOfStock
                    : t.addToCart
                  }
                </Button>
              </div>
            </div>

            {/* Right Side - What to Expect */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 via-white to-green-50 border-2 border-green-200 rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-green-800 mb-4 text-xl flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'What to Expect' : 'Qué Esperar'}
                </h4>
                <ul className="space-y-3">
                  {product.whatToExpect.map((benefit, index) => (
                    <li key={index} className="bg-white rounded-lg p-3 border border-green-100 text-green-700 font-medium flex items-start shadow-sm">
                      <span className="text-green-600 mr-3 text-xl">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Notice */}
              <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 border-2 border-orange-200 rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-orange-800 mb-3 text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Important Notice' : 'Aviso Importante'}
                </h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  {language === 'en' 
                    ? 'This product is intended for research purposes only. Please consult with a healthcare professional before use. Not for human consumption.'
                    : 'Este producto está destinado únicamente para fines de investigación. Consulte con un profesional de la salud antes de usar. No para consumo humano.'
                  }
                </p>
              </div>

              {/* Lab Testing Badge */}
              {product.labTested && (
                <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 border-2 border-purple-200 rounded-xl p-6 shadow-lg text-center">
                  <div className="text-4xl mb-2">🧪</div>
                  <h4 className="font-bold text-purple-800 mb-2">
                    {language === 'en' ? 'Lab Tested Quality' : 'Calidad Probada en Laboratorio'}
                  </h4>
                  <p className="text-purple-700 text-sm">
                    {language === 'en' 
                      ? 'Third-party tested for purity and potency'
                      : 'Probado por terceros para pureza y potencia'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-size Image Modal */}
      {images.length > 0 && (
        <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
          <DialogContent className="sm:max-w-4xl p-0 bg-black/95">
            <DialogHeader className="sr-only">
              <DialogTitle>{product.name} - Full Size Image</DialogTitle>
              <DialogDescription>Full size image view of {product.name}</DialogDescription>
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
      )}
    </>
  );
};

export default ProductDetailModal;
