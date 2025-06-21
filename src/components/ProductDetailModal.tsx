
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X, FileText, Star, AlertTriangle, Users, Shield, Zap, Clock, BookOpen, Cycle } from 'lucide-react';
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
  language,
  userDiscount
}: ProductDetailModalProps) => {
  if (!product) return null;

  const getDescription = (desc: string | { en: string; es: string }) => {
    if (typeof desc === 'string') return desc;
    return desc[language] || desc.en;
  };

  const getSpecification = (spec: any, key: string) => {
    if (!spec || !spec[language]) return 'N/A';
    return spec[language][key] || 'N/A';
  };

  const getText = (text: any) => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text[language] || text.en || '';
  };

  const discountedPrice = userDiscount > 0 
    ? product.price * (1 - userDiscount / 100)
    : product.price;

  const sections = [
    {
      id: 'benefits',
      title: language === 'en' ? 'Benefits' : 'Beneficios',
      icon: Star,
      content: getText(product.benefits)
    },
    {
      id: 'sideEffects',
      title: language === 'en' ? 'Side Effects' : 'Efectos Secundarios',
      icon: AlertTriangle,
      content: getText(product.sideEffects)
    },
    {
      id: 'effectsOnWomen',
      title: language === 'en' ? 'Effects on Women' : 'Efectos en Mujeres',
      icon: Users,
      content: getText(product.effectsOnWomen)
    },
    {
      id: 'safetyInformation',
      title: language === 'en' ? 'Safety Information' : 'Información de Seguridad',
      icon: Shield,
      content: getText(product.safetyInformation)
    },
    {
      id: 'howItWorks',
      title: language === 'en' ? 'How It Works' : 'Cómo Funciona',
      icon: Zap,
      content: getText(product.howItWorks)
    },
    {
      id: 'whatToExpect',
      title: language === 'en' ? 'What to Expect' : 'Qué Esperar',
      icon: Clock,
      content: getText(product.whatToExpect)
    },
    {
      id: 'researchBackground',
      title: language === 'en' ? 'Research Background' : 'Antecedentes de Investigación',
      icon: BookOpen,
      content: getText(product.researchBackground)
    },
    {
      id: 'cycleInformation',
      title: language === 'en' ? 'Cycle Information' : 'Información del Ciclo',
      icon: Cycle,
      content: getText(product.cycleInformation)
    }
  ].filter(section => section.content);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold">{product.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.featured && (
                  <Badge variant="secondary" className="bg-orange-500 text-white">
                    {language === 'en' ? 'Featured' : 'Destacado'}
                  </Badge>
                )}
                {product.labTestFile && (
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    {language === 'en' ? 'Lab Tested' : 'Probado en Laboratorio'}
                  </Badge>
                )}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">
                  {language === 'en' ? 'Specifications' : 'Especificaciones'}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">
                      {language === 'en' ? 'Dose per Capsule:' : 'Dosis por Cápsula:'}
                    </span>
                    <div className="font-medium">{getSpecification(product.specifications, 'dosePerCapsule')}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === 'en' ? 'Capsules per Bottle:' : 'Cápsulas por Frasco:'}
                    </span>
                    <div className="font-medium">{getSpecification(product.specifications, 'capsulesPerBottle')}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === 'en' ? 'Cycle Length:' : 'Duración del Ciclo:'}
                    </span>
                    <div className="font-medium">{getSpecification(product.specifications, 'typicalCycleLength')}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">
                      {language === 'en' ? 'Potency Level:' : 'Nivel de Potencia:'}
                    </span>
                    <div className="font-medium">{getSpecification(product.specifications, 'potencyLevel')}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Ratings */}
            {product.performanceRatings && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">
                  {language === 'en' ? 'Performance Ratings' : 'Calificaciones de Rendimiento'}
                </h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(product.performanceRatings).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < value ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details and Purchase */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 leading-relaxed">
                {getDescription(product.description)}
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category.replace('-', ' ')}
                </Badge>
              ))}
            </div>

            {/* Price and Purchase */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  {userDiscount > 0 ? (
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {userDiscount}% {language === 'en' ? 'discount applied' : 'descuento aplicado'}
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => onAddToCart(product)}
                  disabled={product.inStock === false}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Add to Cart' : 'Agregar al Carrito'}
                </Button>
              </div>

              {product.labTestFile && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(product.labTestFile, '_blank')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'View Lab Test Results' : 'Ver Resultados de Laboratorio'}
                </Button>
              )}
            </div>

            {/* Additional Information Sections */}
            {sections.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Additional Information' : 'Información Adicional'}
                </h3>
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <div key={section.id} className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <IconComponent className="h-4 w-4 mr-2 text-green-600" />
                        <h4 className="font-medium">{section.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
