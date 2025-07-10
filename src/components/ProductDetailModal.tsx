
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, Star, Sparkles, Shield, AlertTriangle, Clock, Users, Target } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/products';
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
  language,
  userDiscount
}: ProductDetailModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants ? product.variants[0] : null
  );
  
  // Debug logging
  console.log('ProductDetailModal - Product:', product.name, 'Has variants:', !!product.variants, 'Variants count:', product.variants?.length);
  const t = translations[language];

  // Get current product data (either base product or selected variant)
  const currentProduct = selectedVariant || product;
  const currentImage = selectedVariant?.image || product.image;
  const currentPrice = selectedVariant?.price || product.price;
  const currentSpecs = selectedVariant?.specifications || product.specifications;

  const images = [currentImage].filter(Boolean);

  const handleAddToCart = () => {
    if (selectedVariant) {
      // Create a product object with variant data for cart
      const variantProduct = {
        ...product,
        id: selectedVariant.id,
        price: selectedVariant.price,
        image: selectedVariant.image,
        specifications: selectedVariant.specifications,
        inStock: selectedVariant.inStock
      };
      onAddToCart(variantProduct);
    } else {
      onAddToCart(product);
    }
    onClose();
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-green-50">
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
              
              {currentImage && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="relative w-full h-80 object-cover rounded-lg border-2 border-white shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    onClick={() => openImageModal(0)}
                  />
                </div>
              )}

              {/* Product Variants Selection - PROMINENT */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border-3 border-primary/30 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground border-primary/30 px-3 py-1 text-sm animate-pulse">
                      <Sparkles className="w-4 h-4 mr-1" />
                      {language === 'en' ? 'CHOOSE STRENGTH FIRST' : 'ELIGE FUERZA PRIMERO'}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-medium">
                      {language === 'en' ? 'Select before adding to cart' : 'Selecciona antes de agregar'}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-4 text-xl flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    {language === 'en' ? 'Available Strengths' : 'Fuerzas Disponibles'}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                          selectedVariant?.id === variant.id
                            ? 'border-primary bg-primary/10 ring-2 ring-primary/30 shadow-lg transform scale-[1.02]'
                            : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden border-2 border-primary/20">
                              {variant.image ? (
                                <img src={variant.image} alt={variant.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                  <span className="text-primary text-sm font-bold">
                                    {variant.specifications?.dosePerCapsule || variant.name.split(' ')[0]}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground text-lg">{variant.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {variant.specifications.dosePerCapsule} per capsule • {variant.specifications.capsulesPerBottle}
                              </p>
                              {index === 0 && (
                                <Badge variant="outline" className="mt-1 text-xs border-green-500 text-green-700">
                                  Most Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-foreground">
                              ${((variant.price * (100 - userDiscount)) / 100).toFixed(2)}
                            </p>
                            {userDiscount > 0 && (
                              <p className="text-sm text-muted-foreground line-through">
                                ${variant.price}
                              </p>
                            )}
                            {variant.saveAmount && (
                              <Badge className="bg-red-500 text-white text-xs mt-1">
                                Save ${variant.saveAmount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
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
                    <p className="text-blue-600 font-bold text-lg">{currentSpecs?.dosePerCapsule || product.specifications.dosePerCapsule}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100">
                    <span className="font-medium text-blue-700 block mb-1">
                      {language === 'en' ? 'Capsules per bottle:' : 'Cápsulas por frasco:'}
                    </span>
                    <p className="text-blue-600 font-bold text-lg">{currentSpecs?.capsulesPerBottle || product.specifications.capsulesPerBottle}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-100 col-span-2">
                    <span className="font-medium text-blue-700 block mb-1">
                      {language === 'en' ? 'Potency level:' : 'Nivel de potencia:'}
                    </span>
                    <p className="text-blue-600 font-bold text-lg">{currentSpecs?.potencyLevel || product.specifications.potencyLevel}</p>
                  </div>
                </div>
              </div>

              {/* Cycle Information */}
              <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 border-2 border-purple-200 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-purple-800 mb-4 text-xl flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Cycle Information' : 'Información del Ciclo'}
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-purple-100">
                    <span className="font-medium text-purple-700 block mb-1">
                      {language === 'en' ? 'Cycle Length:' : 'Duración del Ciclo:'}
                    </span>
                    <p className="text-purple-600 font-semibold">{product.cycleInfo.length}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100">
                    <span className="font-medium text-purple-700 block mb-1">
                      {language === 'en' ? 'Recommended Dosage:' : 'Dosis Recomendada:'}
                    </span>
                    <p className="text-purple-600 font-semibold">{product.cycleInfo.dosage}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100">
                    <span className="font-medium text-purple-700 block mb-1">
                      {language === 'en' ? 'PCT Required:' : 'PCT Requerido:'}
                    </span>
                    <p className={`font-semibold ${product.cycleInfo.pctRequired ? 'text-red-600' : 'text-green-600'}`}>
                      {product.cycleInfo.pctRequired ? 
                        (language === 'en' ? 'Yes' : 'Sí') : 
                        (language === 'en' ? 'No' : 'No')
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="bg-gradient-to-br from-green-50 via-white to-green-50 border-2 border-green-300 rounded-xl p-6 text-center shadow-lg">
                <div className="mb-4">
                  {selectedVariant?.originalPrice && (
                    <span className="text-2xl text-gray-400 line-through block">
                      ${selectedVariant.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
                    ${currentPrice.toFixed(2)}
                  </span>
                  {selectedVariant?.saveAmount && (
                    <Badge className="bg-red-500 text-white text-sm mt-2">
                      Save ${selectedVariant.saveAmount}
                    </Badge>
                  )}
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={selectedVariant ? selectedVariant.inStock === false : product.inStock === false}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg py-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {(selectedVariant ? selectedVariant.inStock === false : product.inStock === false)
                    ? t.outOfStock
                    : t.addToCart
                  }
                </Button>
              </div>
            </div>

            {/* Right Side - Effects and Details */}
            <div className="space-y-6">
              {/* What to Expect */}
              <div className="bg-gradient-to-br from-green-50 via-white to-green-50 border-2 border-green-200 rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-green-800 mb-4 text-xl flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'What to Expect' : 'Qué Esperar'}
                </h4>
                <ul className="space-y-3">
                  {product.whatToExpected.map((benefit, index) => (
                    <li key={index} className="bg-white rounded-lg p-3 border border-green-100 text-green-700 font-medium flex items-start shadow-sm">
                      <span className="text-green-600 mr-3 text-xl">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side Effects */}
              <div className="bg-gradient-to-br from-red-50 via-white to-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-red-800 mb-4 text-xl flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Potential Side Effects' : 'Posibles Efectos Secundarios'}
                </h4>
                <ul className="space-y-2">
                  {product.sideEffects.map((effect, index) => (
                    <li key={index} className="bg-white rounded-lg p-3 border border-red-100 text-red-700 font-medium flex items-start shadow-sm text-sm">
                      <span className="text-red-600 mr-3 text-lg">⚠</span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Women Effects */}
              {product.womenEffects && (
                <div className="bg-gradient-to-br from-pink-50 via-white to-pink-50 border-2 border-pink-200 rounded-xl p-6 shadow-lg">
                  <h4 className="font-bold text-pink-800 mb-4 text-xl flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Effects on Women' : 'Efectos en Mujeres'}
                  </h4>
                  <ul className="space-y-2">
                    {product.womenEffects.map((effect, index) => (
                      <li key={index} className="bg-white rounded-lg p-3 border border-pink-100 text-pink-700 font-medium flex items-start shadow-sm text-sm">
                        <span className="text-pink-600 mr-3 text-lg">♀</span>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Safety Notice */}
              <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 border-2 border-orange-200 rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-orange-800 mb-3 text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Important Notice' : 'Aviso Importante'}
                </h4>
                <p className="text-orange-700 text-sm leading-relaxed">
                  {language === 'en' 
                    ? 'This product is intended for research purposes only. Consult with a healthcare professional before use. Not for human consumption. Use at your own risk and responsibility.'
                    : 'Este producto está destinado únicamente para fines de investigación. Consulte con un profesional de la salud antes de usar. No para consumo humano. Use bajo su propio riesgo y responsabilidad.'
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
