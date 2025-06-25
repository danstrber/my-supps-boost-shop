
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  specifications: {
    dosePerCapsule: string;
    capsulesPerBottle: string;
    potencyLevel: string;
  };
  whatToExpect: string[];
  inStock?: boolean;
  featured?: boolean;
  labTested?: boolean;
}

export const products: Product[] = [
  {
    id: 'superdrol',
    name: 'Superdrol (Methasterone)',
    price: 25,
    image: '/lovable-uploads/cf6f4971-3016-4a39-96f5-59bf98d3246f.png',
    category: 'oral-steroids',
    description: 'Powerful oral anabolic compound for serious muscle building and strength gains.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '20 capsules',
      potencyLevel: 'Advanced'
    },
    whatToExpect: [
      'Rapid muscle mass increases',
      'Significant strength gains',
      'Enhanced muscle hardness',
      'Improved recovery'
    ],
    inStock: true,
    labTested: true
  },
  {
    id: 'rad-140',
    name: 'RAD-140 (Testolone)',
    price: 55,
    image: '/lovable-uploads/cd558275-4c3b-4625-b9b5-52790802195c.png',
    category: 'sarms',
    description: 'Highly selective androgen receptor modulator for lean muscle growth.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '50 capsules',
      potencyLevel: 'Intermediate'
    },
    whatToExpect: [
      'Lean muscle development',
      'Increased strength',
      'Enhanced endurance',
      'Fat loss support'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    price: 45,
    image: '/lovable-uploads/2ce4fc44-88d8-4db2-8bff-c02b79b18bd8.png',
    category: 'growth',
    description: 'Growth hormone secretagogue promoting natural GH production.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '50 capsules',
      potencyLevel: 'Beginner'
    },
    whatToExpect: [
      'Improved sleep quality',
      'Enhanced recovery',
      'Increased appetite',
      'Better skin and hair'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    category: 'fat-burners',
    description: 'Powerful thermogenic fat burner for cutting cycles.',
    specifications: {
      dosePerCapsule: '40mcg',
      capsulesPerBottle: '50 capsules',
      potencyLevel: 'Advanced'
    },
    whatToExpect: [
      'Rapid fat loss',
      'Increased metabolism',
      'Enhanced energy',
      'Preserved muscle mass'
    ],
    inStock: true,
    labTested: true
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene Citrate',
    price: 25,
    image: '/lovable-uploads/a49cd35f-62dc-449e-b143-2ebdc5fa0f61.png',
    category: 'pct',
    description: 'Selective estrogen receptor modulator for PCT and testosterone support.',
    specifications: {
      dosePerCapsule: '12.5mg',
      capsulesPerBottle: '25 capsules',
      potencyLevel: 'Intermediate'
    },
    whatToExpect: [
      'Natural testosterone boost',
      'Improved recovery',
      'Hormonal balance',
      'Enhanced libido'
    ],
    inStock: true
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25,
    image: '/lovable-uploads/ee8bd939-e3e1-4fd1-903f-ab76073f6624.png',
    category: 'pct',
    description: 'Aromatase inhibitor for estrogen control and hormonal balance.',
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: '10 capsules',
      potencyLevel: 'Advanced'
    },
    whatToExpect: [
      'Estrogen reduction',
      'Reduced water retention',
      'Enhanced muscle definition',
      'Hormonal optimization'
    ],
    inStock: true
  },
  {
    id: 'clomid',
    name: 'Clomid (Clomiphene)',
    price: 30,
    image: '',
    category: 'pct',
    description: 'Post cycle therapy compound for testosterone recovery.',
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: '50 capsules',
      potencyLevel: 'Beginner'
    },
    whatToExpect: [
      'Testosterone recovery',
      'PCT support',
      'Hormonal restoration',
      'Maintained gains'
    ],
    inStock: true
  },
  {
    id: 'accutane',
    name: 'Accutane (Isotretinoin)',
    price: 30,
    image: '',
    category: 'support',
    description: 'Powerful acne treatment for severe cases.',
    specifications: {
      dosePerCapsule: '20mg',
      capsulesPerBottle: '30 capsules',
      potencyLevel: 'Advanced'
    },
    whatToExpect: [
      'Clear skin',
      'Reduced oil production',
      'Acne elimination',
      'Long-term results'
    ],
    inStock: true
  }
];
