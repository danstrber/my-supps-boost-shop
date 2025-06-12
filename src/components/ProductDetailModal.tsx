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
      dose: 'Dose per capsule',
      capsules: 'Capsules per bottle',
      cycleLength: 'Typical cycle length',
      strength: 'Potency level',
      benefits: 'Benefits',
      sideEffects: 'Side Effects',
      effectsOnWomen: 'Effects on Women',
      safety: 'Safety Information',
      howItWorks: 'How It Works',
      expectations: 'What to Expect',
      research: 'Research Background',
      history: 'History & Development',
      labTestResults: 'Lab Test Results',
      cycle: 'Cycle Information',
      productSpecs: 'Product Specifications',
      performanceRatings: 'Performance Ratings',
      categories: 'Categories',
      clickToView: 'Click to view full lab test results'
    },
    es: {
      dose: 'Dosis por cápsula',
      capsules: 'Cápsulas por frasco',
      cycleLength: 'Duración típica del ciclo',
      strength: 'Nivel de potencia',
      benefits: 'Beneficios',
      sideEffects: 'Efectos Secundarios',
      effectsOnWomen: 'Efectos en Mujeres',
      safety: 'Información de Seguridad',
      howItWorks: 'Cómo Funciona',
      expectations: 'Qué Esperar',
      research: 'Antecedentes de Investigación',
      history: 'Historia y Desarrollo',
      labTestResults: 'Resultados de Laboratorio',
      cycle: 'Información del Ciclo',
      productSpecs: 'Especificaciones del Producto',
      performanceRatings: 'Calificaciones de Rendimiento',
      categories: 'Categorías',
      clickToView: 'Haz clic para ver los resultados completos del laboratorio'
    }
  };

  const l = labels[language];

  // Get localized ratings labels
  const ratingsLabels = {
    en: {
      'muscleGain': 'Muscle Gain',
      'strength': 'Strength',
      'fatLoss': 'Fat Loss',
      'sideEffects': 'Side Effects',
      'retention': 'Maintainability'
    },
    es: {
      'muscleGain': 'Ganancia Muscular',
      'strength': 'Fuerza',
      'fatLoss': 'Pérdida de Grasa',
      'sideEffects': 'Efectos Secundarios',
      'retention': 'Mantenimiento'
    }
  };

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
                  {product.featured && (
                    <Badge className="bg-orange-500 text-white text-xs">
                      {t.featured}
                    </Badge>
                  )}
                  {product.labTestFile && (
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
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-600" />
                    <div>
                      <span className="text-gray-600 text-xs block">{l.dose}</span>
                      <span className="font-semibold">{product.specifications[language].dosePerCapsule}</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <div className="h-4 w-4 bg-green-600 rounded-full" />
                    <div>
                      <span className="text-gray-600 text-xs block">{l.capsules}</span>
                      <span className="font-semibold">{product.specifications[language].capsulesPerBottle}</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <Timer className="h-4 w-4 text-purple-600" />
                    <div>
                      <span className="text-gray-600 text-xs block">{l.cycleLength}</span>
                      <span className="font-semibold text-xs">{product.specifications[language].typicalCycleLength}</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <div>
                      <span className="text-gray-600 text-xs block">{l.strength}</span>
                      <span className="font-semibold text-xs">{product.specifications[language].potencyLevel.slice(0, 15)}...</span>
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
                  disabled={product.inStock === false}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock === false
                    ? t.outOfStock
                    : t.addToCart
                  }
                </Button>
              </div>
            </div>

            {/* Right Side - Detailed Information */}
            <div className="space-y-4 text-sm">
              {/* Research */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  {l.research}
                </h4>
                <p className="text-blue-700 text-xs leading-relaxed">{product.researchBackground[language]}</p>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {l.benefits}
                </h4>
                <p className="text-green-700 text-xs leading-relaxed">{product.benefits[language]}</p>
              </div>

              {/* Side Effects */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {l.sideEffects}
                </h4>
                <p className="text-red-700 text-xs leading-relaxed">{product.sideEffects[language]}</p>
              </div>

              {/* Effects on Women */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-semibold text-yellow-800 mb-2">{l.effectsOnWomen}</h4>
                <p className="text-yellow-700 text-xs leading-relaxed">{product.effectsOnWomen[language]}</p>
              </div>

              {/* How It Works */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-800 mb-2">{l.howItWorks}</h4>
                <p className="text-purple-700 text-xs leading-relaxed">{product.howItWorks[language]}</p>
              </div>

              {/* Safety */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <h4 className="font-semibold text-orange-800 mb-2">{l.safety}</h4>
                <p className="text-orange-700 text-xs leading-relaxed">{product.safetyInformation[language]}</p>
              </div>

              {/* Cycle Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-2">{l.cycle}</h4>
                <p className="text-gray-700 text-xs leading-relaxed mb-2">{product.cycleInformation[language]}</p>
                <div className="bg-white p-2 rounded border">
                  <h5 className="font-semibold text-gray-800 mb-1 text-xs">{l.expectations}</h5>
                  <p className="text-gray-700 text-xs">{product.whatToExpect[language]}</p>
                </div>
              </div>

              {/* Performance Ratings */}
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-3">
                  {l.performanceRatings}
                </h4>
                <div className="space-y-2">
                  {Object.entries(product.performanceRatings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">{ratingsLabels[language][key as keyof typeof ratingsLabels.en] || key}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < value ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">{value}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
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

              {/* Lab Test Results - Only for products with lab test files */}
              {product.labTestFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {l.labTestResults}
                  </h4>
                  <img 
                    src={product.labTestFile} 
                    alt={`${product.name} Lab Test`}
                    className="w-full rounded border border-green-300 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(product.labTestFile, '_blank')}
                  />
                  <p className="text-green-700 text-xs mt-2">
                    {l.clickToView}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full-size Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="sm:max-w-4xl p-0 bg-black/95">
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
