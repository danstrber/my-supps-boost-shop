
import React from 'react';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { translations } from '@/lib/translations';

interface ProductGridProps {
  products: Product[];
  language: 'en' | 'es';
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  language,
  onAddToCart,
  onViewDetails
}) => {
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="bg-white border border-[#ddd] hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
            <CardTitle className="text-[#333] text-lg">{product.name}</CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-[#333] text-sm mb-3 line-clamp-3">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#2e7d32]">
                ${product.price.toFixed(2)}
              </span>
              <span className={`text-sm px-2 py-1 rounded ${
                product.inStock 
                  ? 'bg-[#e8f5e9] text-[#2e7d32]' 
                  : 'bg-[#ffebee] text-[#d32f2f]'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(product)}
              className="flex-1 border-[#2196f3] text-[#2196f3] hover:bg-[#2196f3] hover:text-white"
            >
              {t.viewDetails}
            </Button>
            <Button
              size="sm"
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="flex-1 bg-[#2e7d32] hover:bg-[#1b5e20] disabled:opacity-50"
            >
              {t.addToCart}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
