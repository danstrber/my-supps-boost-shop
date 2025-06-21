
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categories: string[];
  description: string | { en: string; es: string };
  labTestFile?: string;
  featured?: boolean;
  inStock?: boolean;
  specifications?: {
    en: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      typicalCycleLength: string;
      potencyLevel: string;
    };
    es: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      typicalCycleLength: string;
      potencyLevel: string;
    };
  };
  benefits?: { en: string; es: string };
  sideEffects?: { en: string; es: string };
  effectsOnWomen?: { en: string; es: string };
  safetyInformation?: { en: string; es: string };
  howItWorks?: { en: string; es: string };
  whatToExpect?: { en: string; es: string };
  researchBackground?: { en: string; es: string };
  cycleInformation?: { en: string; es: string };
  performanceRatings?: {
    muscleGain: number;
    strength: number;
    fatLoss: number;
    sideEffects: number;
    retention: number;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Clenbuterol',
    price: 45,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    categories: ['fat-loss'],
    description: 'Powerful fat burning compound that increases metabolic rate and preserves lean muscle mass during cutting cycles.',
    labTestFile: '/lab-test-clen.pdf'
  },
  {
    id: '2',
    name: 'Testosterone Enanthate',
    price: 60,
    image: '/lovable-uploads/testosterone-enanthate.png',
    categories: ['muscle-gain'],
    description: 'Popular anabolic steroid for muscle growth and strength.',
  },
  {
    id: '3',
    name: 'Anavar',
    price: 55,
    image: '/lovable-uploads/anavar.png',
    categories: ['fat-loss', 'muscle-gain'],
    description: 'Mild anabolic steroid used for cutting and lean muscle gains.',
  },
  {
    id: '4',
    name: 'Trenbolone Acetate',
    price: 70,
    image: '/lovable-uploads/trenbolone-acetate.png',
    categories: ['muscle-gain'],
    description: 'Powerful anabolic steroid for rapid muscle growth.',
  },
  {
    id: '5',
    name: 'Winstrol',
    price: 50,
    image: '/lovable-uploads/winstrol.png',
    categories: ['fat-loss'],
    description: 'Anabolic steroid used for cutting and enhancing athletic performance.',
  },
  {
    id: '6',
    name: 'Deca Durabolin',
    price: 65,
    image: '/lovable-uploads/deca-durabolin.png',
    categories: ['muscle-gain'],
    description: 'Popular steroid for muscle mass and joint relief.',
  },
  {
    id: '7',
    name: 'Primobolan',
    price: 60,
    image: '/lovable-uploads/primobolan.png',
    categories: ['muscle-gain', 'fat-loss'],
    description: 'Mild anabolic steroid for lean muscle gains.',
  },
  {
    id: '8',
    name: 'Dianabol',
    price: 55,
    image: '/lovable-uploads/dianabol.png',
    categories: ['muscle-gain'],
    description: 'Fast-acting oral steroid for muscle mass and strength.',
  },
  {
    id: '9',
    name: 'HGH',
    price: 120,
    image: '/lovable-uploads/hgh.png',
    categories: ['muscle-gain', 'fat-loss'],
    description: 'Human Growth Hormone for recovery and fat loss.',
  },
  {
    id: '10',
    name: 'Clomid',
    price: 40,
    image: '/lovable-uploads/clomid.png',
    categories: ['post-cycle'],
    description: 'Post cycle therapy drug to restore natural testosterone production.',
  },
  {
    id: '11',
    name: 'Accutane',
    price: 35,
    image: '/lovable-uploads/accutane.png',
    categories: ['skincare'],
    description: 'Powerful acne treatment for severe and persistent acne.',
  }
];
