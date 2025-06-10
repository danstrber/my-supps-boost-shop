
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, Shield, Truck, Clock, Eye, X, Pill, Timer, Zap, AlertTriangle, Info, Target, TrendingUp } from 'lucide-react';
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

  // Get translated product details
  const getTranslatedDetail = (key: string, value: string) => {
    if (language === 'es') {
      // Define Spanish translations for product details
      const spanishTranslations: Record<string, string> = {
        // Research translations
        "Superdrol (Methasterone) has been extensively studied for its potent anabolic properties and rapid muscle-building capabilities in research settings.": "Superdrol (Metasterona) ha sido extensivamente estudiado por sus potentes propiedades anabólicas y capacidades de construcción muscular rápida en entornos de investigación.",
        "MK-677 (Ibutamoren) is extensively researched as a growth hormone secretagogue that increases IGF-1 and growth hormone levels naturally.": "MK-677 (Ibutamoren) es extensivamente investigado como un secretagogo de hormona de crecimiento que aumenta los niveles de IGF-1 y hormona de crecimiento naturalmente.",
        "RAD-140 (Testolone) is one of the most potent SARMs with extensive research showing strong anabolic effects with reduced androgenic side effects.": "RAD-140 (Testolone) es uno de los SARMs más potentes con investigación extensa mostrando efectos anabólicos fuertes con efectos secundarios androgénicos reducidos.",
        "Extensively studied as a bronchodilator and thermogenic compound. Research shows significant fat loss and metabolic enhancement properties.": "Extensivamente estudiado como broncodilatador y compuesto termogénico. La investigación muestra propiedades significativas de pérdida de grasa y mejora metabólica.",
        "Enclomiphene is well-researched as a SERM for testosterone restoration and fertility enhancement. Studies show effective LH/FSH stimulation.": "Enclomifeno es bien investigado como SERM para restauración de testosterona y mejora de fertilidad. Los estudios muestran estimulación efectiva de LH/FSH.",
        "Aromasin (Exemestane) is extensively researched as a potent aromatase inhibitor that permanently binds to aromatase enzymes, preventing estrogen production.": "Aromasin (Exemestano) es extensivamente investigado como un inhibidor de aromatasa potente que se une permanentemente a las enzimas aromatasa, previniendo la producción de estrógenos.",
        
        // Benefits
        "Rapid muscle mass gains (8-15lbs in 4 weeks), dramatic strength increases, enhanced protein synthesis, improved nitrogen retention, minimal water retention.": "Ganancias rápidas de masa muscular (8-15 libras en 4 semanas), aumentos dramáticos de fuerza, síntesis de proteínas mejorada, retención de nitrógeno mejorada, retención mínima de agua.",
        "Increased growth hormone and IGF-1 levels, improved recovery, better sleep quality, enhanced skin and hair, gradual muscle gains, improved bone density.": "Niveles aumentados de hormona de crecimiento e IGF-1, recuperación mejorada, mejor calidad de sueño, piel y cabello mejorados, ganancias musculares graduales, densidad ósea mejorada.",
        "Rapid muscle growth, significant strength increases, enhanced endurance, improved recovery, minimal water retention, neuroprotective properties.": "Crecimiento muscular rápido, aumentos significativos de fuerza, resistencia mejorada, recuperación mejorada, retención mínima de agua, propiedades neuroprotectoras.",
        "Rapid fat loss, increased metabolic rate, improved cardiovascular performance, muscle preservation during calorie restriction, enhanced energy levels.": "Pérdida rápida de grasa, tasa metabólica aumentada, rendimiento cardiovascular mejorado, preservación muscular durante restricción calórica, niveles de energía mejorados.",
        "Restores natural testosterone production, prevents estrogen rebound, maintains muscle gains post-cycle, improves fertility markers, mood stabilization.": "Restaura la producción natural de testosterona, previene el rebote de estrógenos, mantiene las ganancias musculares post-ciclo, mejora marcadores de fertilidad, estabilización del estado de ánimo.",
        "Prevents gynecomastia, reduces water retention, prevents estrogen rebound, maintains muscle hardness, improves libido during cycles.": "Previene ginecomastia, reduce retención de agua, previene rebote de estrógenos, mantiene dureza muscular, mejora libido durante ciclos.",
        
        // Side Effects
        "Hepatotoxicity (liver stress), cardiovascular strain, blood pressure elevation, cholesterol imbalances, testosterone suppression, mood changes, potential hair loss, acne, joint pain, headaches, fatigue.": "Hepatotoxicidad (estrés hepático), tensión cardiovascular, elevación de presión arterial, desequilibrios de colesterol, supresión de testosterona, cambios de humor, posible pérdida de cabello, acné, dolor articular, dolores de cabeza, fatiga.",
        "Water retention, increased appetite, potential blood sugar fluctuations, temporary lethargy, tingling in hands/feet, possible increased prolactin levels, joint pain, vivid dreams.": "Retención de agua, aumento del apetito, posibles fluctuaciones de azúcar en sangre, letargo temporal, hormigueo en manos/pies, posibles niveles aumentados de prolactina, dolor articular, sueños vívidos.",
        "Testosterone suppression, mild aggression, possible hair loss in predisposed individuals, mood changes, potential liver stress, headaches, nausea, fatigue, joint pain, acne.": "Supresión de testosterona, agresión leve, posible pérdida de cabello en individuos predispuestos, cambios de humor, posible estrés hepático, dolores de cabeza, náuseas, fatiga, dolor articular, acné.",
        "Jitters and tremors, increased heart rate, excessive sweating, insomnia, muscle cramps, potential cardiac stress, anxiety, headaches, increased blood pressure, dehydration.": "Nerviosismo y temblores, frecuencia cardíaca aumentada, sudoración excesiva, insomnio, calambres musculares, posible estrés cardíaco, ansiedad, dolores de cabeza, presión arterial aumentada, deshidratación.",
        "Mild mood swings, potential vision changes (rare), hot flashes, temporary libido fluctuations, headaches, nausea, fatigue during adjustment, possible mild depression.": "Cambios de humor leves, posibles cambios de visión (raros), sofocos, fluctuaciones temporales de libido, dolores de cabeza, náuseas, fatiga durante ajuste, posible depresión leve.",
        "Joint pain and stiffness, reduced bone density with long-term use, mood changes, dry skin and hair, possible negative impact on cholesterol, fatigue, headaches, hot flashes.": "Dolor y rigidez articular, densidad ósea reducida con uso a largo plazo, cambios de humor, piel y cabello secos, posible impacto negativo en colesterol, fatiga, dolores de cabeza, sofocos.",
        
        // Effects on Women
        "NOT RECOMMENDED for women due to extremely high virilization risk. Can cause permanent masculine features, voice deepening, and severe hormonal disruption.": "NO RECOMENDADO para mujeres debido al riesgo de virilización extremadamente alto. Puede causar características masculinas permanentes, profundización de la voz y disrupción hormonal severa.",
        "Generally well-tolerated by women. May cause mild water retention and increased appetite. Start with lower doses (5-10mg).": "Generalmente bien tolerado por mujeres. Puede causar retención leve de agua y aumento del apetito. Comenzar con dosis menores (5-10mg).",
        "Well-tolerated by women and often preferred for cutting cycles. Women typically use 10-40mcg daily with good results.": "Bien tolerado por mujeres y a menudo preferido para ciclos de definición. Las mujeres típicamente usan 10-40mcg diariamente con buenos resultados.",
        "Can be used by women for fertility purposes under medical supervision. Not typically used for PCT as women don't suppress testosterone.": "Puede ser usado por mujeres para propósitos de fertilidad bajo supervisión médica. No típicamente usado para PCT ya que las mujeres no suprimen testosterona.",
        "NOT RECOMMENDED for women as it will severely suppress estrogen levels, causing bone loss, mood issues, and other serious health problems.": "NO RECOMENDADO para mujeres ya que suprimirá severamente los niveles de estrógenos, causando pérdida ósea, problemas de humor y otros problemas de salud serios.",
        
        // How It Works
        "Binds strongly to androgen receptors, promoting intense protein synthesis and muscle growth while minimizing estrogenic effects.": "Se une fuertemente a los receptores de andrógenos, promoviendo síntesis intensa de proteínas y crecimiento muscular mientras minimiza efectos estrogénicos.",
        "Mimics ghrelin and stimulates growth hormone release from the pituitary gland without affecting cortisol or other hormones.": "Imita la grelina y estimula la liberación de hormona de crecimiento de la glándula pituitaria sin afectar cortisol u otras hormonas.",
        "Selective androgen receptor modulator with high anabolic activity and reduced androgenic effects compared to traditional steroids.": "Modulador selectivo del receptor de andrógenos con alta actividad anabólica y efectos androgénicos reducidos comparado con esteroides tradicionales.",
        "Stimulates beta-2 receptors to increase metabolic rate, body temperature, and fat oxidation while preserving lean muscle tissue.": "Estimula receptores beta-2 para aumentar tasa metabólica, temperatura corporal y oxidación de grasa mientras preserva tejido muscular magro.",
        "Blocks estrogen receptors in the hypothalamus, stimulating natural LH and FSH production, which restores testosterone levels.": "Bloquea receptores de estrógenos en el hipotálamo, estimulando la producción natural de LH y FSH, lo que restaura los niveles de testosterona.",
        "Irreversibly binds to aromatase enzymes, permanently deactivating them and preventing testosterone conversion to estrogen.": "Se une irreversiblemente a las enzimas aromatasa, desactivándolas permanentemente y previniendo la conversión de testosterona a estrógenos.",
        
        // Safety
        "Requires liver support (NAC, TUDCA), regular blood work monitoring, and proper post-cycle therapy. Not for beginners.": "Requiere soporte hepático (NAC, TUDCA), monitoreo regular de análisis de sangre y terapia post-ciclo adecuada. No para principiantes.",
        "Generally safe with proper cycling. Monitor blood sugar levels. Can be used longer-term compared to other compounds.": "Generalmente seguro con ciclado apropiado. Monitorear niveles de azúcar en sangre. Puede usarse a largo plazo comparado con otros compuestos.",
        "Requires post-cycle therapy for cycles over 6 weeks. Regular blood work recommended to monitor testosterone levels.": "Requiere terapia post-ciclo para ciclos de más de 6 semanas. Análisis de sangre regulares recomendados para monitorear niveles de testosterona.",
        "Should be cycled properly with gradual dose increases. Monitor heart rate and blood pressure. Stay hydrated and supplement with taurine.": "Debe ciclarse apropiadamente con aumentos graduales de dosis. Monitorear frecuencia cardíaca y presión arterial. Mantenerse hidratado y suplementar con taurina.",
        "Generally safe when used properly for PCT protocols. Much safer than older SERMs with fewer side effects.": "Generalmente seguro cuando se usa apropiadamente para protocolos PCT. Mucho más seguro que SERMs antiguos con menos efectos secundarios.",
        "Should not be used without proper monitoring. Can crash estrogen levels if overdosed. Blood work essential to monitor estrogen levels.": "No debe usarse sin monitoreo apropiado. Puede colapsar niveles de estrógenos si se sobredosifica. Análisis de sangre esencial para monitorear niveles de estrógenos.",
        
        // Cycle
        "Typical cycles: 4-6 weeks maximum due to liver toxicity. Always followed by comprehensive PCT.": "Ciclos típicos: 4-6 semanas máximo debido a toxicidad hepática. Siempre seguido de PCT completo.",
        "Typically used for 8-16 weeks. Can be cycled continuously with breaks or used year-round at lower doses.": "Típicamente usado por 8-16 semanas. Puede ciclarse continuamente con descansos o usado todo el año en dosis menores.",
        "Typically used for 8-12 weeks followed by 4-8 week PCT depending on suppression level.": "Típicamente usado por 8-12 semanas seguido de PCT de 4-8 semanas dependiendo del nivel de supresión.",
        "Typically used in 2-week on/2-week off cycles or pyramid protocols starting low and increasing gradually.": "Típicamente usado en ciclos de 2 semanas sí/2 semanas no o protocolos piramidales empezando bajo y aumentando gradualmente.",
        "Used for 4-8 weeks after completing suppressive cycles. Can also be used for natural testosterone optimization.": "Usado por 4-8 semanas después de completar ciclos supresivos. También puede usarse para optimización natural de testosterona.",
        "Used during cycles with aromatizing compounds or as part of PCT protocol. Typically 12.5-25mg every other day.": "Usado durante ciclos con compuestos aromatizantes o como parte del protocolo PCT. Típicamente 12.5-25mg cada dos días.",
        
        // Expectations
        "Users typically gain 8-15 lbs of lean muscle in 4 weeks with significant strength increases. Results are dramatic but require proper PCT to maintain.": "Los usuarios típicamente ganan 8-15 libras de músculo magro en 4 semanas con aumentos significativos de fuerza. Los resultados son dramáticos pero requieren PCT apropiado para mantener.",
        "Gradual improvements in recovery, sleep, and body composition. 3-8 lbs of quality muscle over 12 weeks with better overall well-being.": "Mejoras graduales en recuperación, sueño y composición corporal. 3-8 libras de músculo de calidad en 12 semanas con mejor bienestar general.",
        "Users can expect 2-5% body fat reduction over 4-6 week cycles with proper diet. Rapid visible changes in definition and vascularity.": "Los usuarios pueden esperar reducción de 2-5% de grasa corporal en ciclos de 4-6 semanas con dieta apropiada. Cambios visuales rápidos en definición y vascularidad.",
        "Users can expect restored hormone levels within 4-6 weeks and maintained muscle gains from previous cycles.": "Los usuarios pueden esperar niveles hormonales restaurados en 4-6 semanas y ganancias musculares mantenidas de ciclos previos.",
        "Effective estrogen control, reduced water retention, prevention of estrogenic side effects. Must be dosed carefully.": "Control efectivo de estrógenos, retención reducida de agua, prevención de efectos secundarios estrogénicos. Debe dosificarse cuidadosamente."
      };
      
      return spanishTranslations[value] || value;
    }
    return value;
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
                      {language === 'en' ? 'Featured' : 'Destacado'}
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
                      <span className="font-semibold">{product.dose}</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <div className="h-4 w-4 bg-green-600 rounded-full" />
                    <div>
                      <span className="text-gray-600 text-xs block">{l.capsules}</span>
                      <span className="font-semibold">{product.capsules}</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <Timer className="h-4 w-4 text-purple-600" />
                    <div>
                      <span className="text-gray-600 text-xs block">{l.cycleLength}</span>
                      <span className="font-semibold text-xs">{product.details.cycleLength}</span>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    <div>
                      <span className="text-gray-600 text-xs block">{l.strength}</span>
                      <span className="font-semibold text-xs">{product.details.strength.slice(0, 15)}...</span>
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
                  disabled={!product.inStock}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {!product.inStock
                    ? (language === 'en' ? 'Out of Stock' : 'Agotado')
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
                <p className="text-blue-700 text-xs leading-relaxed">{getTranslatedDetail('research', product.details.research)}</p>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {l.benefits}
                </h4>
                <p className="text-green-700 text-xs leading-relaxed">{getTranslatedDetail('benefits', product.details.benefits)}</p>
              </div>

              {/* Side Effects */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {l.sideEffects}
                </h4>
                <p className="text-red-700 text-xs leading-relaxed">{getTranslatedDetail('sideEffects', product.details.sideEffects)}</p>
              </div>

              {/* Effects on Women */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-semibold text-yellow-800 mb-2">{l.effectsOnWomen}</h4>
                <p className="text-yellow-700 text-xs leading-relaxed">{getTranslatedDetail('effectsOnWomen', product.details.effectsOnWomen)}</p>
              </div>

              {/* How It Works */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h4 className="font-semibold text-purple-800 mb-2">{l.howItWorks}</h4>
                <p className="text-purple-700 text-xs leading-relaxed">{getTranslatedDetail('howItWorks', product.details.howItWorks)}</p>
              </div>

              {/* Safety */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <h4 className="font-semibold text-orange-800 mb-2">{l.safety}</h4>
                <p className="text-orange-700 text-xs leading-relaxed">{getTranslatedDetail('safety', product.details.safety)}</p>
              </div>

              {/* Cycle Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-2">{l.cycle}</h4>
                <p className="text-gray-700 text-xs leading-relaxed mb-2">{getTranslatedDetail('cycle', product.details.cycle)}</p>
                <div className="bg-white p-2 rounded border">
                  <h5 className="font-semibold text-gray-800 mb-1 text-xs">{l.expectations}</h5>
                  <p className="text-gray-700 text-xs">{getTranslatedDetail('expectations', product.details.expectations)}</p>
                </div>
              </div>

              {/* Performance Ratings */}
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-3">
                  {l.performanceRatings}
                </h4>
                <div className="space-y-2">
                  {Object.entries(product.details.ratings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">{key}</span>
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

              {/* Lab Test Results - Only for Superdrol and Clenbuterol */}
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
