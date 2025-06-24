
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
    id: 'superdrol',
    name: 'Superdrol',
    price: 25,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    description: 'Powerful oral steroid for rapid muscle growth and strength gains.',
    category: 'oral-steroids',
    inStock: true,
    features: [
      'Rapid muscle growth',
      'Increased strength',
      'Enhanced performance',
      'Quick results'
    ]
  },
  {
    id: 'rad-140',
    name: 'RAD-140 (Testolone)',
    price: 55,
    image: '/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png',
    description: 'Selective Androgen Receptor Modulator for lean muscle mass and strength.',
    category: 'sarms',
    inStock: true,
    features: [
      'Lean muscle gains',
      'Increased strength',
      'Improved endurance',
      'Minimal side effects'
    ]
  },
  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    price: 45,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    description: 'Growth hormone secretagogue for muscle growth and recovery.',
    category: 'growth',
    inStock: true,
    features: [
      'Increased growth hormone',
      'Better recovery',
      'Improved sleep quality',
      'Enhanced muscle growth'
    ]
  },
  {
    id: 'clomid',
    name: 'Clomid (Clomiphene Citrate)',
    price: 30,
    image: '',
    description: 'PCT/Testosterone booster - Essential for post-cycle therapy to restore natural hormone production.',
    category: 'pct',
    inStock: true,
    features: [
      'Restores natural testosterone production',
      'Essential for PCT protocols',
      'Prevents estrogen rebound',
      'Maintains muscle gains post-cycle'
    ]
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene Citrate',
    price: 25,
    image: '/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png',
    description: 'Selective estrogen receptor modulator for natural testosterone support.',
    category: 'pct',
    inStock: true,
    features: [
      'Natural testosterone support',
      'Improved hormonal balance',
      'Fewer side effects than Clomid',
      'Effective PCT option'
    ]
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    description: 'Aromatase inhibitor for controlling estrogen levels during cycles.',
    category: 'pct',
    inStock: true,
    features: [
      'Powerful aromatase inhibitor',
      'Controls estrogen levels',
      'Prevents gynecomastia',
      'Suicidal inhibitor - no rebound'
    ]
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    description: 'Powerful fat burner and performance enhancer for cutting cycles.',
    category: 'fat-burners',
    inStock: true,
    features: [
      'Rapid fat loss',
      'Increased metabolism',
      'Preserved muscle mass',
      'Enhanced performance'
    ]
  },
  {
    id: 'accutane',
    name: 'Accutane (Isotretinoin)',
    price: 30,
    image: '/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png',
    description: 'Powerful acne treatment for severe cases and steroid-induced acne.',
    category: 'support',
    inStock: true,
    features: [
      'Treats severe acne',
      'Reduces oil production',
      'Long-lasting results',
      'Prevents scarring'
    ]
  }
];
