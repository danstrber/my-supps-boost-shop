
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, X } from 'lucide-react';
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name} - Product Details</DialogTitle>
            <DialogDescription>
              {language === 'en' ? 'Detailed product information and specifications' : 'Información detallada del producto y especificaciones'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Side - Image and Basic Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>
              
              <div className="relative group">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg border border-gray-200 cursor-pointer"
                  onClick={() => openImageModal(selectedImageIndex)}
                />
              </div>

              {/* Product Category */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Category' : 'Categoría'}
                </h3>
                <Badge variant="secondary" className="capitalize">
                  {product.category.replace('-', ' ')}
                </Badge>
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

            {/* Right Side - Features and Information */}
            <div className="space-y-4">
              {/* Features */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">
                  {language === 'en' ? 'Key Features' : 'Características Principales'}
                </h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-green-700 text-sm flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stock Status */}
              <div className={`border rounded-lg p-4 ${
                product.inStock 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <h4 className={`font-semibold mb-2 ${
                  product.inStock ? 'text-green-800' : 'text-red-800'
                }`}>
                  {language === 'en' ? 'Availability' : 'Disponibilidad'}
                </h4>
                <p className={`text-sm ${
                  product.inStock ? 'text-green-700' : 'text-red-700'
                }`}>
                  {product.inStock 
                    ? (language === 'en' ? 'In Stock' : 'En Stock')
                    : (language === 'en' ? 'Out of Stock' : 'Agotado')
                  }
                </p>
              </div>

              {/* Product Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === 'en' ? 'Product Information' : 'Información del Producto'}
                </h4>
                <div className="text-blue-700 text-sm space-y-2">
                  <p><strong>{language === 'en' ? 'Name:' : 'Nombre:'}</strong> {product.name}</p>
                  <p><strong>{language === 'en' ? 'Category:' : 'Categoría:'}</strong> {product.category.replace('-', ' ')}</p>
                  <p><strong>{language === 'en' ? 'Price:' : 'Precio:'}</strong> ${product.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  {language === 'en' ? 'Important Notice' : 'Aviso Importante'}
                </h4>
                <p className="text-yellow-700 text-sm">
                  {language === 'en' 
                    ? 'These products are for research purposes only. Not for human consumption. Consult with a healthcare professional before use.'
                    : 'Estos productos son solo para fines de investigación. No para consumo humano. Consulte con un profesional de la salud antes de usar.'
                  }
                </p>
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
    </>
  );
};

export default ProductDetailModal;
