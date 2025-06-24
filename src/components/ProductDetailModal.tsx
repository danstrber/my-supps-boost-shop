
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Star } from 'lucide-react';
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

  const renderPerformanceRating = (rating: number, maxRating: number = 5) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}/{maxRating}</span>
      </div>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name} - Product Details</DialogTitle>
            <DialogDescription>
              {language === 'en' ? 'Detailed product information and specifications' : 'Información detallada del producto y especificaciones'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Image and Basic Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <Badge variant="secondary" className="mb-4 capitalize">
                  {product.category.replace('-', ' ')}
                </Badge>
                <p className="text-gray-600 text-lg">
                  {product.description}
                </p>
              </div>
              
              {product.image && (
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-lg border border-gray-200 cursor-pointer"
                    onClick={() => openImageModal(0)}
                  />
                </div>
              )}

              {/* Product Specifications */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-4 text-xl">
                  {language === 'en' ? 'Product Specifications' : 'Especificaciones del Producto'}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-700">
                      {language === 'en' ? 'Dose per capsule:' : 'Dosis por cápsula:'}
                    </span>
                    <p className="text-blue-600 font-semibold">{product.specifications.dosePerCapsule}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">
                      {language === 'en' ? 'Capsules per bottle:' : 'Cápsulas por frasco:'}
                    </span>
                    <p className="text-blue-600 font-semibold">{product.specifications.capsulesPerBottle}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">
                      {language === 'en' ? 'Typical cycle length:' : 'Duración típica del ciclo:'}
                    </span>
                    <p className="text-blue-600 font-semibold">{product.specifications.typicalCycleLength}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">
                      {language === 'en' ? 'Potency level:' : 'Nivel de potencia:'}
                    </span>
                    <p className="text-blue-600 font-semibold">{product.specifications.potencyLevel}</p>
                  </div>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="bg-white border-2 border-green-200 rounded-lg p-6 text-center">
                <span className="text-4xl font-bold text-green-600 block mb-4">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock === false
                    ? t.outOfStock
                    : t.addToCart
                  }
                </Button>
              </div>
            </div>

            {/* Right Side - Detailed Information */}
            <div className="space-y-6">
              {/* Research Background */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                  {language === 'en' ? 'Research Background' : 'Antecedentes de Investigación'}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.detailedInfo.researchBackground}
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3 text-lg">
                  {language === 'en' ? 'Benefits' : 'Beneficios'}
                </h4>
                <ul className="space-y-2">
                  {product.detailedInfo.benefits.map((benefit, index) => (
                    <li key={index} className="text-green-700 text-sm flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side Effects */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-3 text-lg">
                  {language === 'en' ? 'Side Effects' : 'Efectos Secundarios'}
                </h4>
                <ul className="space-y-2">
                  {product.detailedInfo.sideEffects.map((effect, index) => (
                    <li key={index} className="text-red-700 text-sm flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Effects on Women */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 mb-3 text-lg">
                  {language === 'en' ? 'Effects on Women' : 'Efectos en Mujeres'}
                </h4>
                <p className="text-purple-700 text-sm leading-relaxed">
                  {product.detailedInfo.effectsOnWomen}
                </p>
              </div>

              {/* How It Works */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h4 className="font-semibold text-indigo-800 mb-3 text-lg">
                  {language === 'en' ? 'How It Works' : 'Cómo Funciona'}
                </h4>
                <p className="text-indigo-700 text-sm leading-relaxed">
                  {product.detailedInfo.howItWorks}
                </p>
              </div>

              {/* Performance Ratings */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-4 text-lg">
                  {language === 'en' ? 'Performance Ratings' : 'Calificaciones de Rendimiento'}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 font-medium">
                      {language === 'en' ? 'Muscle Gain' : 'Ganancia Muscular'}
                    </span>
                    {renderPerformanceRating(product.detailedInfo.performanceRatings.muscleGain)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 font-medium">
                      {language === 'en' ? 'Strength' : 'Fuerza'}
                    </span>
                    {renderPerformanceRating(product.detailedInfo.performanceRatings.strength)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 font-medium">
                      {language === 'en' ? 'Fat Loss' : 'Pérdida de Grasa'}
                    </span>
                    {renderPerformanceRating(product.detailedInfo.performanceRatings.fatLoss)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 font-medium">
                      {language === 'en' ? 'Side Effects' : 'Efectos Secundarios'}
                    </span>
                    {renderPerformanceRating(product.detailedInfo.performanceRatings.sideEffects)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 font-medium">
                      {language === 'en' ? 'Maintainability' : 'Mantenibilidad'}
                    </span>
                    {renderPerformanceRating(product.detailedInfo.performanceRatings.maintainability)}
                  </div>
                </div>
              </div>

              {/* Safety Information */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h4 className="font-semibold text-orange-800 mb-3 text-lg">
                  {language === 'en' ? 'Safety Information' : 'Información de Seguridad'}
                </h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  {product.detailedInfo.safetyInformation}
                </p>
              </div>

              {/* What to Expect */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h4 className="font-semibold text-teal-800 mb-3 text-lg">
                  {language === 'en' ? 'What to Expect' : 'Qué Esperar'}
                </h4>
                <p className="text-teal-700 text-sm leading-relaxed">
                  {product.detailedInfo.whatToExpect}
                </p>
              </div>
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
