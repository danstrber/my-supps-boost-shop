
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
    image: '/public/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    description: 'Powerful oral steroid for rapid muscle gains and strength increases.',
    category: 'oral-steroids',
    inStock: true,
    features: [
      'Rapid muscle growth',
      'Increased strength',
      'Enhanced protein synthesis',
      'No water retention'
    ]
  },
  {
    id: 'rad-140',
    name: 'RAD-140 (Testolone)',
    price: 55,
    image: '/public/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    description: 'Selective Androgen Receptor Modulator for lean muscle mass and strength.',
    category: 'sarms',
    inStock: true,
    features: [
      'Selective muscle targeting',
      'Increased lean mass',
      'Enhanced endurance',
      'Minimal side effects'
    ]
  },
  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    price: 45,
    image: '/public/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    description: 'Growth hormone secretagogue for muscle growth and recovery - Ideal for bulking cycles.',
    category: 'growth',
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
    image: '/public/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
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
    id: 'arimidex',
    name: 'Arimidex (Anastrozole)',
    price: 35,
    image: '/public/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    description: 'Aromatase inhibitor for PCT - Controls estrogen levels during and after cycles.',
    category: 'pct',
    inStock: true,
    features: [
      'Powerful aromatase inhibitor',
      'Controls estrogen levels',
      'Prevents gynecomastia',
      'Essential for PCT protocols'
    ]
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene Citrate',
    price: 25,
    image: '/public/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    description: 'Advanced PCT compound for testosterone recovery with fewer side effects than traditional options.',
    category: 'pct',
    inStock: true,
    features: [
      'Superior testosterone recovery',
      'Fewer side effects',
      'Enhanced libido restoration',
      'Improved mood support'
    ]
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25,
    image: '/public/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    description: 'Powerful aromatase inhibitor for estrogen control during and after cycles.',
    category: 'pct',
    inStock: true,
    features: [
      'Irreversible aromatase inhibition',
      'Long-lasting estrogen control',
      'Prevents estrogen rebound',
      'Suitable for sensitive users'
    ]
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35,
    image: '/public/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png',
    description: 'Powerful fat burner and bronchodilator for cutting cycles and weight loss.',
    category: 'fat-burners',
    inStock: true,
    features: [
      'Rapid fat loss',
      'Increased metabolic rate',
      'Muscle preservation',
      'Enhanced cardiovascular performance'
    ]
  },
  {
    id: 'accutane',
    name: 'Accutane (Isotretinoin)',
    price: 30,
    image: '/public/lovable-uploads/63f9d2b1-4c72-40c0-8434-8e48cade7de5.png',
    description: 'Powerful acne treatment for severe cases and steroid-induced acne.',
    category: 'oral-steroids',
    inStock: true,
    features: [
      'Treats severe acne',
      'Reduces oil production',
      'Long-lasting results',
      'Prevents scarring'
    ]
  }
];
