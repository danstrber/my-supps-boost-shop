
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    price: 45,
    image: '/public/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    description: 'Growth hormone secretagogue for muscle growth and recovery - Ideal for bulking cycles.',
    category: 'Growth Hormone',
    inStock: true,
    features: [
      'Increases growth hormone levels',
      'Promotes lean muscle growth',
      'Enhances recovery',
      'Improves sleep quality'
    ]
  },
  {
    id: 'clomid',
    name: 'Clomid (Clomiphene Citrate)',
    price: 30,
    image: '',
    description: 'PCT/Testosterone booster - Essential for post-cycle therapy to restore natural hormone production.',
    category: 'PCT',
    inStock: true,
    features: [
      'Restores natural testosterone production',
      'Essential for PCT protocols',
      'Prevents estrogen rebound',
      'Maintains muscle gains post-cycle'
    ]
  },
  {
    id: 'arimidex',
    name: 'Arimidex (Anastrozole)',
    price: 35,
    image: '',
    description: 'Aromatase inhibitor for PCT - Controls estrogen levels during and after cycles.',
    category: 'PCT',
    inStock: true,
    features: [
      'Powerful aromatase inhibitor',
      'Controls estrogen levels',
      'Prevents gynecomastia',
      'Essential for PCT protocols'
    ]
  }
];
