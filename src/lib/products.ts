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
}

export const products: Product[] = [
  {
    id: 'superdrol',
    name: 'Superdrol (Methasterone)',
    price: 25,
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
      'Liver toxicity (hepatotoxic)',
      'Blood pressure elevation',
      'Cholesterol imbalance',
      'Lethargy and fatigue',
      'Appetite suppression',
      'Potential hair loss (if predisposed)'
    ],
    womenEffects: [
      'NOT recommended for women',
      'High risk of virilization',
      'Voice deepening (irreversible)',
      'Excessive body hair growth',
      'Clitoral enlargement'
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
    description: 'Highly selective androgen receptor modulator for lean muscle growth with fewer side effects than traditional steroids.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '50 capsules',
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
      'Mild testosterone suppression',
      'Potential mood changes',
      'Slight increase in aggression',
      'Possible hair thinning',
      'Elevated liver enzymes (rare)'
    ],
    womenEffects: [
      'Lower doses recommended (5-10mg)',
      'Risk of virilization at higher doses',
      'Menstrual cycle disruption possible',
      'Voice changes at excessive doses'
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
    description: 'Growth hormone secretagogue promoting natural GH production for enhanced recovery and anti-aging benefits.',
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: '50 capsules',
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
      'Increased appetite (can lead to weight gain)',
      'Water retention and bloating',
      'Lethargy in some users',
      'Possible insulin resistance with long-term use',
      'Elevated prolactin levels (rare)'
    ],
    womenEffects: [
      'Generally well tolerated',
      'Improved skin and hair quality',
      'Enhanced sleep and recovery',
      'Monitor for excessive water retention'
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35,
    image: '/lovable-uploads/b01486f8-e291-44df-920c-5ab7b48e4160.png',
    category: 'fat-burners',
    description: 'Powerful thermogenic fat burner for cutting cycles with muscle-preserving properties.',
    specifications: {
      dosePerCapsule: '40mcg',
      capsulesPerBottle: '50 capsules',
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
      'Insomnia and sleep disturbances',
      'Excessive sweating',
      'Muscle cramps',
      'Anxiety and nervousness'
    ],
    womenEffects: [
      'Lower doses recommended (10-80mcg)',
      'Effective for fat loss',
      'Same side effects as men',
      'No virilization risk'
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
      'Can cause ovarian hyperstimulation',
      'Risk of multiple pregnancies',
      'Severe hormonal disruption'
    ],
    inStock: true
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25,
    image: '/lovable-uploads/ee8bd939-e3e1-4fd1-903f-ab76073f6624.png',
    category: 'pct',
    description: 'Aromatase inhibitor for estrogen control and hormonal balance during and after cycles.',
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: '10 capsules',
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
      'Decreased bone density (long-term)',
      'Potential mood changes',
      'Reduced HDL cholesterol',
      'Fatigue and lethargy'
    ],
    womenEffects: [
      'Used in breast cancer treatment',
      'Can cause severe estrogen depletion',
      'Bone health monitoring required',
      'Not for bodybuilding use in women'
    ],
    inStock: true
  },
  {
    id: 'clomid',
    name: 'Clomid (Clomiphene)',
    price: 30,
    image: '/lovable-uploads/b95509ff-2fa9-495b-9eb3-7fd6d43bd4e8.png',
    category: 'pct',
    description: 'Post cycle therapy compound for testosterone recovery and fertility restoration.',
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: '40 capsules',
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
      'Can cause ovarian hyperstimulation',
      'Multiple pregnancy risk',
      'Mood and emotional changes'
    ],
    inStock: true
  },
  {
    id: 'accutane',
    name: 'Accutane (Isotretinoin)',
    price: 30,
    image: '/lovable-uploads/14261a69-7ff7-4bed-890d-882e8294932f.png',
    category: 'dermatology',
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
      'Severe skin dryness and sensitivity',
      'Chapped lips and dry mouth',
      'Joint pain and muscle aches',
      'Potential mood changes',
      'Increased sun sensitivity',
      'Elevated liver enzymes (monitor required)'
    ],
    womenEffects: [
      'STRICTLY NOT for pregnant women',
      'Requires pregnancy prevention program',
      'Can cause severe birth defects',
      'Monthly pregnancy tests required',
      'Same side effects as men'
    ],
    inStock: true,
    labTested: true
  }
];
