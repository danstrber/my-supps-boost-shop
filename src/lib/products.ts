import accutaneImage from '@/assets/accutane.png';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  specifications: {
    dosePerCapsule: string;
    capsulesPerBottle: string;
    potencyLevel: string;
  };
  inStock?: boolean;
  saveAmount?: number;
}

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
  whatToExpected: string[];
  cycleInfo: {
    length: string;
    dosage: string;
    pctRequired: boolean;
  };
  sideEffects: string[];
  womenEffects?: string[];
  inStock?: boolean;
  featured?: boolean;
  labTested?: boolean;
  variants?: ProductVariant[];
}

export const products: Product[] = [
  {
    id: 'superdrol',
    name: 'Superdrol (Methasterone)',
    price: 55,
    image: '/lovable-uploads/14261a69-7ff7-4bed-890d-882e8294932f.png',
    category: 'oral-steroids',
    description: 'Powerful oral anabolic compound for serious muscle building and strength gains. Known for its exceptional ability to build lean muscle mass rapidly.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '50 capsules',
      potencyLevel: 'Advanced'
    },
    whatToExpected: [
      'Rapid muscle mass increases (5-10lbs in 2-3 weeks)',
      'Significant strength gains (20-30% increase)',
      'Enhanced muscle hardness and vascularity',
      'Improved recovery between workouts'
    ],
    cycleInfo: {
      length: '3-4 weeks maximum',
      dosage: '10-20mg daily',
      pctRequired: true
    },
    sideEffects: [
      'May affect liver function (hepatotoxic)',
      'Possible blood pressure elevation',
      'May impact cholesterol levels',
      'Can cause lethargy and fatigue',
      'May decrease appetite',
      'Potential hair thinning (if predisposed)'
    ],
    womenEffects: [
      'NOT recommended for women',
      'May cause virilization symptoms',
      'Voice changes (potentially irreversible)',
      'Increased body hair growth',
      'Other masculinizing effects'
    ],
    inStock: false,
    labTested: true
  },
  {
    id: 'rad-140',
    name: 'RAD-140 (Testolone)',
    price: 25,
    image: '/lovable-uploads/9ef9882b-55bd-4218-9d0e-21ae9c7d72f6.png',
    category: 'sarms',
    description: 'Highly selective androgen receptor modulator for lean muscle growth with fewer side effects than traditional steroids.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '30 capsules',
      potencyLevel: 'Intermediate'
    },
    whatToExpected: [
      'Lean muscle development (3-5lbs per month)',
      'Increased strength and power output',
      'Enhanced endurance and stamina',
      'Fat loss support while maintaining muscle'
    ],
    cycleInfo: {
      length: '8-12 weeks',
      dosage: '10-20mg daily',
      pctRequired: true
    },
    sideEffects: [
      'May cause mild testosterone suppression',
      'Possible mood changes',
      'Slight increase in aggression',
      'Potential hair thinning',
      'May elevate liver enzymes (rare)'
    ],
    womenEffects: [
      'Lower doses recommended (5-10mg)',
      'May cause virilization at higher doses',
      'Possible menstrual cycle disruption',
      'Voice changes at excessive doses'
    ],
    inStock: true,
    featured: true,
    variants: [
      {
        id: 'rad-140-10mg',
        name: '10mg - 30 Capsules',
        price: 25,
        image: '/lovable-uploads/9ef9882b-55bd-4218-9d0e-21ae9c7d72f6.png',
        specifications: {
          dosePerCapsule: '10mg',
          capsulesPerBottle: '30 capsules',
          potencyLevel: 'Intermediate'
        },
        inStock: true
      },
      {
        id: 'rad-140-20mg',
        name: '20mg - 50 Capsules',
        price: 100,
        originalPrice: 110,
        saveAmount: 10,
        image: '/lovable-uploads/4489ebbc-f4e6-457d-9811-070bde867b0e.png',
        specifications: {
          dosePerCapsule: '20mg',
          capsulesPerBottle: '50 capsules',
          potencyLevel: 'Advanced'
        },
        inStock: true
      }
    ]
  },
  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    price: 25,
    image: '/lovable-uploads/7dd6d68f-1f2e-4b5e-8d14-185c1e0ac68b.png',
    category: 'growth',
    description: 'Growth hormone secretagogue promoting natural GH production for enhanced recovery and anti-aging benefits.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '30 capsules',
      potencyLevel: 'Beginner'
    },
    whatToExpected: [
      'Improved sleep quality and deeper REM',
      'Enhanced recovery and reduced soreness',
      'Increased appetite and muscle fullness',
      'Better skin elasticity and hair quality'
    ],
    cycleInfo: {
      length: '3-6 months continuous',
      dosage: '10-25mg daily (before bed)',
      pctRequired: false
    },
    sideEffects: [
      'Increased appetite (may lead to weight gain)',
      'Water retention and bloating',
      'Possible lethargy in some users',
      'May affect insulin sensitivity with long-term use',
      'Possible elevation in prolactin levels (rare)'
    ],
    womenEffects: [
      'Generally well tolerated',
      'Improved skin and hair quality',
      'Enhanced sleep and recovery',
      'Monitor for excessive water retention'
    ],
    inStock: true,
    featured: true,
    variants: [
      {
        id: 'mk-677-10mg',
        name: '10mg - 30 Capsules',
        price: 25,
        image: '/lovable-uploads/7dd6d68f-1f2e-4b5e-8d14-185c1e0ac68b.png',
        specifications: {
          dosePerCapsule: '10mg',
          capsulesPerBottle: '30 capsules',
          potencyLevel: 'Beginner'
        },
        inStock: true
      },
      {
        id: 'mk-677-20mg',
        name: '20mg - 50 Capsules',
        price: 80,
        originalPrice: 90,
        saveAmount: 10,
        image: '/lovable-uploads/784cf1c3-343a-4324-97cc-305a4c3366d5.png',
        specifications: {
          dosePerCapsule: '20mg',
          capsulesPerBottle: '50 capsules',
          potencyLevel: 'Intermediate'
        },
        inStock: true
      }
    ]
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 40,
    image: '/lovable-uploads/b7c315ff-19a0-4e63-86b9-79c6dd31b20c.png',
    category: 'fat-burners',
    description: 'Powerful thermogenic fat burner for cutting cycles with muscle-preserving properties.',
    specifications: {
      dosePerCapsule: '60mcg',
      capsulesPerBottle: '50 tablets',
      potencyLevel: 'Advanced'
    },
    whatToExpected: [
      'Rapid fat loss (1-2lbs per week)',
      'Increased metabolism (up to 10%)',
      'Enhanced energy and focus',
      'Preserved muscle mass during cutting'
    ],
    cycleInfo: {
      length: '2 weeks on, 2 weeks off',
      dosage: '20-120mcg daily (pyramid up/down)',
      pctRequired: false
    },
    sideEffects: [
      'Hand tremors and shakiness',
      'Increased heart rate and palpitations',
      'May cause insomnia and sleep disturbances',
      'Excessive sweating',
      'Muscle cramps',
      'Anxiety and nervousness'
    ],
    womenEffects: [
      'Lower doses recommended (10-80mcg)',
      'Effective for fat loss',
      'Same side effects as men',
      'No virilization concerns'
    ],
    inStock: false,
    labTested: true
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene Citrate',
    price: 45,
    image: '/lovable-uploads/0f656d9e-afeb-45b0-8785-80029343c306.png',
    category: 'pct',
    description: 'Selective estrogen receptor modulator for PCT and natural testosterone support without estrogenic side effects.',
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: '25 capsules',
      potencyLevel: 'Intermediate'
    },
    whatToExpected: [
      'Natural testosterone boost (200-400ng/dL increase)',
      'Improved recovery post-cycle',
      'Hormonal balance restoration',
      'Enhanced libido and mood'
    ],
    cycleInfo: {
      length: '4-6 weeks PCT',
      dosage: '25-50mg daily',
      pctRequired: false
    },
    sideEffects: [
      'Mild mood swings',
      'Occasional hot flashes',
      'Slight vision disturbances (rare)',
      'Temporary decrease in IGF-1'
    ],
    womenEffects: [
      'NOT recommended for women',
      'May cause ovarian hyperstimulation',
      'Risk of multiple pregnancies',
      'Significant hormonal disruption'
    ],
    inStock: true
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 35,
    image: '/lovable-uploads/ca4cfeff-6c54-4cac-9d78-8514882ca7c9.png',
    category: 'pct',
    description: 'Aromatase inhibitor for estrogen control and hormonal balance during and after cycles.',
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: '25 tablets',
      potencyLevel: 'Advanced'
    },
    whatToExpected: [
      'Estrogen reduction (50-85% decrease)',
      'Reduced water retention and bloating',
      'Enhanced muscle definition',
      'Prevention of gynecomastia'
    ],
    cycleInfo: {
      length: 'As needed during cycle',
      dosage: '12.5-25mg every other day',
      pctRequired: false
    },
    sideEffects: [
      'Joint pain and stiffness',
      'May decrease bone density (long-term)',
      'Potential mood changes',
      'May reduce HDL cholesterol',
      'Fatigue and lethargy'
    ],
    womenEffects: [
      'Used in breast cancer treatment',
      'May cause significant estrogen depletion',
      'Bone health monitoring required',
      'Not for bodybuilding use in women'
    ],
    inStock: false
  },
  {
    id: 'clomid',
    name: 'Clomid (Clomiphene)',
    price: 35,
    image: '/lovable-uploads/b886abd5-d412-496a-b232-91477606b894.png',
    category: 'pct',
    description: 'Post cycle therapy compound for testosterone recovery and fertility restoration.',
    specifications: {
      dosePerCapsule: '50mg',
      capsulesPerBottle: '30 tablets',
      potencyLevel: 'Beginner'
    },
    whatToExpected: [
      'Testosterone recovery (150-300ng/dL increase)',
      'PCT support and hormonal restoration',
      'Improved sperm production',
      'Maintained muscle gains post-cycle'
    ],
    cycleInfo: {
      length: '4-6 weeks PCT',
      dosage: '25-50mg daily',
      pctRequired: false
    },
    sideEffects: [
      'Visual disturbances (blurred vision)',
      'Mood swings and emotional changes',
      'Hot flashes',
      'Nausea and stomach upset',
      'Headaches'
    ],
    womenEffects: [
      'Used for fertility treatment',
      'May cause ovarian hyperstimulation',
      'Multiple pregnancy risk',
      'Mood and emotional changes'
    ],
    inStock: false
  },
  {
    id: 'letrozole',
    name: 'Letrozole (Femara)',
    price: 30,
    image: '/lovable-uploads/b028f377-424f-4815-8dc0-9f52f6507861.png',
    category: 'pct',
    description: 'Highly potent aromatase inhibitor for complete estrogen suppression and PCT support.',
    specifications: {
      dosePerCapsule: '2.5mg',
      capsulesPerBottle: '25 tablets',
      potencyLevel: 'Advanced'
    },
    whatToExpected: [
      'Complete estrogen suppression (95%+ reduction)',
      'Enhanced muscle definition and hardness',
      'Elimination of water retention',
      'Prevention of gynecomastia'
    ],
    cycleInfo: {
      length: 'As needed during cycle',
      dosage: '0.5-2.5mg every other day',
      pctRequired: false
    },
    sideEffects: [
      'Severe joint pain and stiffness',
      'Significant bone density reduction (long-term)',
      'Mood changes and depression',
      'May severely impact cholesterol',
      'Extreme fatigue and weakness'
    ],
    womenEffects: [
      'Used in breast cancer treatment',
      'Causes complete estrogen depletion',
      'Severe bone health risks',
      'Not recommended for bodybuilding use'
    ],
    inStock: false,
    labTested: true
  },
  {
    id: 'testosterone-cypionate',
    name: 'Testosterone Cypionate',
    price: 35,
    image: '/lovable-uploads/a0651ae0-232a-4fc2-aad2-c2ca3e91a84d.png',
    category: 'injectable-steroids',
    description: 'Long-acting testosterone ester for hormone replacement therapy and muscle building cycles.',
    specifications: {
      dosePerCapsule: '250mg/mL',
      capsulesPerBottle: '10mL vial',
      potencyLevel: 'Intermediate'
    },
    whatToExpected: [
      'Increased muscle mass and strength',
      'Enhanced recovery and performance',
      'Improved libido and energy levels',
      'Better mood and well-being'
    ],
    cycleInfo: {
      length: '10-16 weeks',
      dosage: '250-500mg weekly',
      pctRequired: true
    },
    sideEffects: [
      'Possible estrogen-related side effects',
      'May cause acne and oily skin',
      'Hair loss (if predisposed)',
      'Testicular shutdown during cycle',
      'Possible mood changes'
    ],
    womenEffects: [
      'NOT recommended for women',
      'May cause severe virilization',
      'Voice changes (potentially permanent)',
      'Increased body hair growth',
      'Masculine physical changes'
    ],
    inStock: false,
    labTested: true
  },
  {
    id: 'testosterone-enanthate',
    name: 'Testosterone Enanthate',
    price: 35,
    image: '/lovable-uploads/2f754df1-d4d5-4097-b8bf-ebbba6ba2f15.png',
    category: 'injectable-steroids',
    description: 'Popular long-acting testosterone ester for hormone replacement therapy and muscle building cycles.',
    specifications: {
      dosePerCapsule: '250mg/mL',
      capsulesPerBottle: '10mL vial',
      potencyLevel: 'Intermediate'
    },
    whatToExpected: [
      'Increased muscle mass and strength',
      'Enhanced recovery and performance',
      'Improved libido and energy levels',
      'Better mood and well-being'
    ],
    cycleInfo: {
      length: '10-16 weeks',
      dosage: '250-500mg weekly',
      pctRequired: true
    },
    sideEffects: [
      'Possible estrogen-related side effects',
      'May cause acne and oily skin',
      'Hair loss (if predisposed)',
      'Testicular shutdown during cycle',
      'Possible mood changes'
    ],
    womenEffects: [
      'NOT recommended for women',
      'May cause severe virilization',
      'Voice changes (potentially permanent)',
      'Increased body hair growth',
      'Masculine physical changes'
    ],
    inStock: false,
    labTested: true
  },
  {
    id: 'accutane',
    name: 'Accutane (Isotretinoin)',
    price: 30,
    image: '/lovable-uploads/bac5a63b-e051-461e-8a6c-f87e42b10ad6.png',
    category: 'support',
    description: 'Powerful acne treatment medication for severe acne and skin conditions. Highly effective for hormonal acne often experienced during cycles.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '60 tablets',
      potencyLevel: 'Advanced'
    },
    whatToExpected: [
      'Significant acne reduction (80-90% improvement)',
      'Long-lasting skin clearing effects',
      'Reduced oil production and pore size',
      'Prevention of acne scarring'
    ],
    cycleInfo: {
      length: '4-6 months treatment',
      dosage: '10-20mg daily with food',
      pctRequired: false
    },
    sideEffects: [
      'Significant skin dryness and sensitivity',
      'Chapped lips and dry mouth',
      'Joint pain and muscle aches',
      'Potential mood changes',
      'Increased sun sensitivity',
      'May elevate liver enzymes (monitoring required)'
    ],
    womenEffects: [
      'STRICTLY NOT for pregnant women',
      'Requires pregnancy prevention program',
      'May cause severe birth defects',
      'Monthly pregnancy tests required',
      'Same side effects as men'
    ],
    inStock: true
  }
];
