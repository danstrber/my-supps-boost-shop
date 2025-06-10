
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, Shield, Truck, Clock, Eye, X, Pill, Timer, Zap, AlertTriangle, Info, Target, TrendingUp } from 'lucide-react';
import { Product } from '@/lib/products';

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
      labTestResults: 'Lab Test Results'
    },
    es: {
      dose: 'Dosis por cápsula',
      capsules: 'Cápsulas por botella',
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
      labTestResults: 'Resultados de Laboratorio'
    }
  };

  const l = labels[language];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Image and Basic Info */}
            <div className="p-6 bg-gray-50">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-3xl font-bold leading-tight text-gray-900">
                  {product.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="relative group">
                  <img
                    src={images[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-xl border border-gray-200 cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => openImageModal(selectedImageIndex)}
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.featured && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                        {language === 'en' ? 'Featured' : 'Destacado'}
                      </Badge>
                    )}
                    {product.labTestFile && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        {language === 'en' ? 'Lab Tested' : 'Probado en Lab'}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                    onClick={() => openImageModal(selectedImageIndex)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Specs */}
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">
                    {language === 'en' ? 'Product Specifications' : 'Especificaciones del Producto'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Pill className="h-5 w-5 text-blue-600" />
                      <div>
                        <span className="text-gray-600 block">{l.dose}</span>
                        <span className="font-semibold text-gray-800">{product.dose}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="h-5 w-5 bg-green-600 rounded-full" />
                      <div>
                        <span className="text-gray-600 block">{l.capsules}</span>
                        <span className="font-semibold text-gray-800">{product.capsules}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Timer className="h-5 w-5 text-purple-600" />
                      <div>
                        <span className="text-gray-600 block">{l.cycleLength}</span>
                        <span className="font-semibold text-gray-800">{product.details.cycleLength}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <div>
                        <span className="text-gray-600 block">{l.strength}</span>
                        <span className="font-semibold text-gray-800 text-xs">{product.details.strength}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg text-lg mb-4"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {!product.inStock
                      ? (language === 'en' ? 'Out of Stock' : 'Agotado')
                      : (language === 'en' ? 'Add to Cart' : 'Agregar al Carrito')
                    }
                  </Button>

                  {/* Features */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>{language === 'en' ? 'Secure & Safe Products' : 'Productos Seguros'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span>{language === 'en' ? 'Fast Shipping' : 'Envío Rápido'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <span>{language === 'en' ? 'Premium Quality' : 'Calidad Premium'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Detailed Information */}
            <div className="p-6 space-y-6">
              {/* Lab Test Results - Only for Superdrol and Clenbuterol */}
              {product.labTestFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {l.labTestResults}
                  </h3>
                  <img 
                    src={product.labTestFile} 
                    alt={`${product.name} Lab Test`}
                    className="w-full rounded-lg border border-green-300 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(product.labTestFile, '_blank')}
                  />
                  <p className="text-green-700 text-sm mt-2">
                    {language === 'en' ? 'Click to view full lab test results' : 'Haz clic para ver los resultados completos del laboratorio'}
                  </p>
                </div>
              )}

              {/* Overview */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  {language === 'en' ? 'Overview' : 'Resumen'}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {l.benefits}
                    </h4>
                    <p className="text-sm text-gray-600">{product.details.benefits}</p>
                  </div>
                </div>
              </div>

              {/* Research & How It Works */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  {l.research}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{product.details.research}</p>
                
                <h4 className="font-semibold text-purple-700 mb-2">{l.howItWorks}</h4>
                <p className="text-sm text-gray-600">{product.details.howItWorks}</p>
              </div>

              {/* Safety & Effects */}
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {l.effectsOnWomen}
                  </h4>
                  <p className="text-sm text-red-700">{product.details.effectsOnWomen}</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">{l.sideEffects}</h4>
                  <p className="text-sm text-yellow-700">{product.details.sideEffects}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">{l.safety}</h4>
                  <p className="text-sm text-blue-700">{product.details.safety}</p>
                </div>
              </div>

              {/* Cycle Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {language === 'en' ? 'Cycle Information' : 'Información del Ciclo'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{product.details.cycle}</p>
                
                <div className="bg-white p-3 rounded-lg border">
                  <h4 className="font-semibold text-gray-800 mb-2">{l.expectations}</h4>
                  <p className="text-sm text-gray-700">{product.details.expectations}</p>
                </div>
              </div>

              {/* Performance Ratings */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {language === 'en' ? 'Performance Ratings' : 'Calificaciones de Rendimiento'}
                </h3>
                <div className="space-y-3">
                  {Object.entries(product.details.ratings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{key}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < value ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 min-w-[2rem]">{value}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">
                  {language === 'en' ? 'Categories' : 'Categorías'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="capitalize">
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
