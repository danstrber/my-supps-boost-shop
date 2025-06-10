
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X, ShoppingCart, FileText, Star } from 'lucide-react';
import { Product } from '@/lib/products';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
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
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');

  const discountedPrice = userDiscount > 0 
    ? product.price * (1 - userDiscount / 100) 
    : product.price;

  const savings = product.price - discountedPrice;

  // Only show lab test for Superdrol and Clenbuterol
  const hasLabTest = product.name === 'Super Drol' || product.name === 'Clenbuterol';

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    onClose();
  };

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Resumen' },
    { id: 'details', label: language === 'en' ? 'Details' : 'Detalles' },
    { id: 'reviews', label: language === 'en' ? 'Reviews' : 'Reseñas' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Category' : 'Categoría'}
                </h4>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {language === 'en' ? 'Stock Status' : 'Estado del Stock'}
                </h4>
                <Badge variant={product.inStock ? 'default' : 'destructive'}>
                  {product.inStock 
                    ? (language === 'en' ? 'In Stock' : 'En Stock')
                    : (language === 'en' ? 'Out of Stock' : 'Sin Stock')
                  }
                </Badge>
              </div>
            </div>

            {hasLabTest && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    {language === 'en' ? 'Lab Test Available' : 'Prueba de Laboratorio Disponible'}
                  </span>
                </div>
                <p className="text-green-700 text-sm mb-3">
                  {language === 'en' 
                    ? 'Third-party lab test results are available for this product.' 
                    : 'Los resultados de pruebas de laboratorio de terceros están disponibles para este producto.'}
                </p>
                {product.labTestFile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(product.labTestFile, '_blank')}
                    className="border-green-300 text-green-700 hover:bg-green-100"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'View Lab Test' : 'Ver Prueba de Laboratorio'}
                  </Button>
                )}
              </div>
            )}
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Research Applications' : 'Aplicaciones de Investigación'}
              </h4>
              <p className="text-gray-600 text-sm">{product.details.research}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Benefits' : 'Beneficios'}
              </h4>
              <p className="text-gray-600 text-sm">{product.details.benefits}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Side Effects' : 'Efectos Secundarios'}
              </h4>
              <p className="text-gray-600 text-sm">{product.details.sideEffects}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'How It Works' : 'Cómo Funciona'}
              </h4>
              <p className="text-gray-600 text-sm">{product.details.howItWorks}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Safety Information' : 'Información de Seguridad'}
              </h4>
              <p className="text-gray-600 text-sm">{product.details.safety}</p>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(product.details.ratings).map(([category, rating]) => (
                <div key={category} className="text-center">
                  <div className="font-semibold text-sm text-gray-800 mb-1">{category}</div>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{rating}/5</div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Ratings are based on research data and user feedback for informational purposes only.' 
                  : 'Las calificaciones se basan en datos de investigación y comentarios de usuarios solo con fines informativos.'}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-baseline space-x-2">
                  {userDiscount > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {userDiscount}% OFF
                      </Badge>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-800">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              {userDiscount > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  {language === 'en' ? 'You save' : 'Ahorras'} ${savings.toFixed(2)}
                </p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  {language === 'en' ? 'Quantity:' : 'Cantidad:'}
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock
                ? (language === 'en' ? 'Add to Cart' : 'Agregar al Carrito')
                : (language === 'en' ? 'Out of Stock' : 'Sin Stock')
              }
            </Button>

            <div className="text-xs text-gray-500 space-y-1">
              <p>{language === 'en' ? '• For research purposes only' : '• Solo para fines de investigación'}</p>
              <p>{language === 'en' ? '• Not for human consumption' : '• No para consumo humano'}</p>
              <p>{language === 'en' ? '• Third-party tested' : '• Probado por terceros'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-4">
            <Card>
              <CardContent className="p-6">
                {renderTabContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
