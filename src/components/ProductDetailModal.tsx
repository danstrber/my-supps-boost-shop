
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, Shield, Truck, Clock, Eye, X } from 'lucide-react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const discountedPrice = product.price * (1 - userDiscount / 100);

  // Create array of images (main image plus any additional ones)
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

              {/* Thumbnail images if multiple */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                        selectedImageIndex === index ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Price Section */}
              <div className="space-y-2">
                {userDiscount > 0 ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-green-600">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      -{userDiscount}%
                    </Badge>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-3">
                  {language === 'en' ? 'Description' : 'Descripción'}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
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

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>{language === 'en' ? 'Secure & Safe Products' : 'Productos Seguros'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>{language === 'en' ? 'Fast Shipping' : 'Envío Rápido'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span>{language === 'en' ? 'Premium Quality' : 'Calidad Premium'}</span>
                </div>
                {product.labTestFile && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>{language === 'en' ? 'Lab Tested & Verified' : 'Probado y Verificado en Laboratorio'}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Add to Cart Button */}
              <div className="space-y-3">
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

                {!product.inStock && (
                  <p className="text-center text-sm text-gray-500">
                    {language === 'en' 
                      ? 'This item is currently out of stock' 
                      : 'Este artículo está actualmente agotado'}
                  </p>
                )}
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
