
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categories: string[];
  description?: string;
  featured?: boolean;
  inStock?: boolean;
  labTestFile?: string;
  details: {
    research: string;
    effectsOnWomen: string;
    benefits: string;
    sideEffects: string;
    history: string;
    howItWorks: string;
    safety: string;
    cycle: string;
    expectations: string;
    ratings: {
      [key: string]: number;
    };
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Super Drol',
    price: 34.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'strength'],
    description: 'Powerful anabolic compound for serious muscle growth and strength gains.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png',
    details: {
      research: 'Superdrol has been extensively studied for its anabolic properties and muscle-building capabilities.',
      effectsOnWomen: 'Women should use with extreme caution due to virilization risks.',
      benefits: 'Rapid muscle mass gains, increased strength, enhanced performance.',
      sideEffects: 'Potential liver toxicity, cardiovascular strain, hormonal imbalances.',
      history: 'Originally developed in the 1950s, later reformulated for bodybuilding use.',
      howItWorks: 'Binds to androgen receptors to promote protein synthesis and muscle growth.',
      safety: 'Requires liver support and regular blood work monitoring.',
      cycle: 'Typical cycles range from 4-6 weeks with proper post-cycle therapy.',
      expectations: 'Users can expect 10-15 lbs of muscle gain in a 4-week cycle.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 3,
        'Side Effects': 2,
        'Keepability': 4
      }
    }
  },
  {
    id: '2',
    name: 'MK-677',
    price: 49.99,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    category: 'sarms',
    categories: ['sarms', 'growth'],
    description: 'Growth hormone secretagogue for enhanced recovery and muscle growth.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    details: {
      research: 'MK-677 is extensively researched as a growth hormone secretagogue.',
      effectsOnWomen: 'Generally well-tolerated by women with proper dosing.',
      benefits: 'Increased growth hormone, improved recovery, better sleep quality.',
      sideEffects: 'Mild water retention, increased appetite, potential blood sugar changes.',
      history: 'Developed for treating growth hormone deficiency and muscle wasting.',
      howItWorks: 'Stimulates growth hormone release through ghrelin receptor activation.',
      safety: 'Generally safe with proper cycling and monitoring.',
      cycle: 'Typically used for 8-12 weeks with breaks between cycles.',
      expectations: 'Users can expect improved recovery and gradual muscle gains.',
      ratings: {
        'Muscle Gain': 4,
        'Strength': 3,
        'Fat Loss': 3,
        'Side Effects': 4,
        'Keepability': 5
      }
    }
  },
  {
    id: '3',
    name: 'RAD-140',
    price: 59.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    category: 'sarms',
    categories: ['sarms', 'bulking'],
    description: 'Powerful SARM for significant muscle gains and strength enhancement.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    details: {
      research: 'RAD-140 is one of the most potent SARMs with extensive research backing.',
      effectsOnWomen: 'Not recommended for women due to strong androgenic effects.',
      benefits: 'Rapid muscle growth, increased strength, enhanced endurance.',
      sideEffects: 'Potential hormonal suppression, mild aggression, hair loss risk.',
      history: 'Developed as a safer alternative to anabolic steroids.',
      howItWorks: 'Selective androgen receptor modulator with high anabolic activity.',
      safety: 'Requires post-cycle therapy and regular monitoring.',
      cycle: 'Typically used for 8-12 weeks followed by PCT.',
      expectations: 'Users can expect 8-15 lbs of lean muscle gain.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 3,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  },
  {
    id: '4',
    name: 'Clenbuterol',
    price: 39.99,
    image: '/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png',
    category: 'fat-burners',
    categories: ['fat-burners', 'cutting'],
    description: 'Effective thermogenic agent for fat loss and enhanced energy levels.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    details: {
      research: 'Extensively studied as a bronchodilator and thermogenic compound.',
      effectsOnWomen: 'Well-tolerated by women, often preferred for cutting cycles.',
      benefits: 'Rapid fat loss, increased metabolism, improved cardiovascular performance.',
      sideEffects: 'Jitters, increased heart rate, sweating, potential cardiac stress.',
      history: 'Originally developed as an asthma medication, later used for fat loss.',
      howItWorks: 'Stimulates beta-2 receptors to increase metabolic rate and fat oxidation.',
      safety: 'Should be cycled properly with gradual dose increases and decreases.',
      cycle: 'Typically used in 2-week on/off cycles or pyramid protocols.',
      expectations: 'Users can expect 1-3% body fat reduction over 4-6 week cycles.',
      ratings: {
        'Muscle Gain': 1,
        'Strength': 2,
        'Fat Loss': 5,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  },
  {
    id: '5',
    name: 'Enclomiphene',
    price: 69.99,
    image: '/lovable-uploads/fc2fad1d-20dd-4b74-b5e3-07f81414d651.png',
    category: 'pct',
    categories: ['pct', 'hormones'],
    description: 'Selective estrogen receptor modulator for post-cycle therapy and hormone optimization.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    details: {
      research: 'Enclomiphene is well-researched as a SERM for testosterone restoration.',
      effectsOnWomen: 'Not typically used by women due to its effects on estrogen.',
      benefits: 'Restores natural testosterone, prevents estrogen rebound, maintains gains.',
      sideEffects: 'Mild mood swings, potential vision changes, hot flashes.',
      history: 'Developed as a fertility treatment, now used for hormone restoration.',
      howItWorks: 'Blocks estrogen receptors in the brain, stimulating natural testosterone production.',
      safety: 'Generally safe when used properly for PCT protocols.',
      cycle: 'Used for 4-6 weeks after completing a cycle of suppressive compounds.',
      expectations: 'Users can expect restored hormone levels and maintained gains.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 2,
        'Side Effects': 4,
        'Keepability': 5
      }
    }
  }
];

export const getProductById = (id: string) => products.find(product => product.id === id);

export const getProductsByCategory = (category: string) => products.filter(product => product.categories.includes(category));
