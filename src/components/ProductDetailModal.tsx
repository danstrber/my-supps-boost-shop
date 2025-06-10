
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Star, Shield, Truck, Clock, Eye, X, Pill, Timer, Zap } from 'lucide-react';
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

  const tabLabels = {
    en: {
      overview: 'Overview',
      research: 'Research',
      effects: 'Effects & Safety',
      cycle: 'Cycle Info',
      ratings: 'Ratings'
    },
    es: {
      overview: 'Resumen',
      research: 'Investigación',
      effects: 'Efectos y Seguridad',
      cycle: 'Info del Ciclo',
      ratings: 'Calificaciones'
    }
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
      expectations: 'What to Expect'
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
      expectations: 'Qué Esperar'
    }
  };

  const t = tabLabels[language];
  const l = labels[language];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold leading-tight">
              {product.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-80 md:h-96 object-cover rounded-xl border border-gray-200 cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => openImageModal(selectedImageIndex)}
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <Badge className="bg-orange-500 hover:bg-orange-600">
                      {language === 'en' ? 'Featured' : 'Destacado'}
                    </Badge>
                  )}
                  {product.labTestFile && (
                    <Badge className="bg-green-600 hover:bg-green-700">
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
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-lg">{language === 'en' ? 'Product Specifications' : 'Especificaciones del Producto'}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">{l.dose}:</span>
                    <span className="font-semibold">{product.dose}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-green-600 rounded-full" />
                    <span className="text-gray-600">{l.capsules}:</span>
                    <span className="font-semibold">{product.capsules}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-600">{l.cycleLength}:</span>
                    <span className="font-semibold">{product.details.cycleLength}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <span className="text-gray-600">{l.strength}:</span>
                    <span className="font-semibold text-xs">{product.details.strength}</span>
                  </div>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg text-lg"
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
                  {product.labTestFile && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{language === 'en' ? 'Lab Tested & Verified' : 'Probado y Verificado en Laboratorio'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="space-y-4">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
                  <TabsTrigger value="overview" className="text-xs">{t.overview}</TabsTrigger>
                  <TabsTrigger value="research" className="text-xs">{t.research}</TabsTrigger>
                  <TabsTrigger value="effects" className="text-xs">{t.effects}</TabsTrigger>
                  <TabsTrigger value="cycle" className="text-xs">{t.cycle}</TabsTrigger>
                  <TabsTrigger value="ratings" className="text-xs">{t.ratings}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">{l.benefits}</h4>
                        <p className="text-sm text-gray-600">{product.details.benefits}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">{l.expectations}</h4>
                        <p className="text-sm text-gray-600">{product.details.expectations}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="research" className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{language === 'en' ? 'Research Background' : 'Antecedentes de Investigación'}</h4>
                    <p className="text-sm text-gray-600 mb-4">{product.details.research}</p>
                    
                    <h4 className="font-semibold text-gray-800 mb-2">{l.howItWorks}</h4>
                    <p className="text-sm text-gray-600">{product.details.howItWorks}</p>
                  </div>
                </TabsContent>

                <TabsContent value="effects" className="space-y-4">
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">{l.effectsOnWomen}</h4>
                      <p className="text-sm text-red-700">{product.details.effectsOnWomen}</p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">{l.sideEffects}</h4>
                      <p className="text-sm text-yellow-700">{product.details.sideEffects}</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">{l.safety}</h4>
                      <p className="text-sm text-blue-700">{product.details.safety}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cycle" className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{language === 'en' ? 'Cycle Information' : 'Información del Ciclo'}</h4>
                    <p className="text-sm text-gray-600 mb-4">{product.details.cycle}</p>
                    
                    <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">{language === 'en' ? 'Recommended Length' : 'Duración Recomendada'}</h4>
                      <p className="text-sm text-purple-700">{product.details.cycleLength}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ratings" className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">{language === 'en' ? 'Performance Ratings' : 'Calificaciones de Rendimiento'}</h4>
                    <div className="space-y-3">
                      {Object.entries(product.details.ratings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{key}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < value ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">{value}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

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
