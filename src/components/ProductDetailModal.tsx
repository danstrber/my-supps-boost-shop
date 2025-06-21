import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimpleProduct } from '@/lib/products';

interface ProductDetailModalProps {
  product: SimpleProduct;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: SimpleProduct) => void;
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full rounded-lg"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="mb-4">
                  <span className="font-bold">
                    {language === 'en' ? 'Price:' : 'Precio:'}
                  </span>
                  {` $${product.price.toFixed(2)}`}
                  {userDiscount > 0 && (
                    <span className="text-green-600">
                      {` (${language === 'en' ? 'Discounted' : 'Descuento'}: ${userDiscount}%)`}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="font-bold">
                    {language === 'en' ? 'Dosage:' : 'Dosis:'}
                  </span>
                  {` ${product.dosage}`}
                </div>

                <div className="mb-4">
                  <span className="font-bold">
                    {language === 'en' ? 'Quantity:' : 'Cantidad:'}
                  </span>
                  {` ${product.quantity}`}
                </div>

                <Button
                  onClick={() => onAddToCart(product)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Add to Cart' : 'Añadir al Carrito'}
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? 'Effects:' : 'Efectos:'}
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.effects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? 'Side Effects:' : 'Efectos Secundarios:'}
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.sideEffects.map((sideEffect, index) => (
                  <li key={index}>{sideEffect}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? 'Dosage Info:' : 'Información de la Dosis:'}
              </h3>
              <p className="text-gray-600">{product.dosageInfo}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">
                {language === 'en' ? 'What to Expect:' : 'Qué Esperar:'}
              </h3>
              <p className="text-gray-600">{product.whatToExpect}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
