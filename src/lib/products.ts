
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string | { [key: string]: string };
  sideEffects: string;
  categories: string[];
  specifications: { [key: string]: string };
  featured: boolean;
  inStock: boolean;
  labTestFile?: string;
  researchBackground: string;
  benefits: string[];
  effectsOnWomen: string;
  howItWorks: string;
  safetyInformation: string;
  cycleInformation: string;
  whatToExpected: string[];
  performanceRatings: {
    strength: number;
    muscle: number;
    recovery: number;
    endurance: number;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Turkesterone',
    price: 59.99,
    images: ['/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png'],
    description: 'Natural ecdysteroid compound that may support muscle growth and recovery.',
    sideEffects: 'Generally well-tolerated. Some users may experience mild digestive discomfort when taken on an empty stomach.',
    categories: ['muscle-building', 'recovery'],
    specifications: {
      'Active Ingredient': 'Turkesterone Extract',
      'Strength': '500mg per capsule',
      'Serving Size': '2 capsules',
      'Servings Per Container': '30'
    },
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/turkesterone-test.pdf',
    researchBackground: 'Turkesterone is an ecdysteroid compound found in certain plants...',
    benefits: ['May support muscle protein synthesis', 'Could aid in recovery', 'May help with strength gains'],
    effectsOnWomen: 'Generally considered safe for women. May support lean muscle development without androgenic effects.',
    howItWorks: 'Works through non-androgenic pathways to potentially support muscle growth and recovery.',
    safetyInformation: 'Consult with healthcare provider before use. Not recommended for pregnant or nursing women.',
    cycleInformation: 'Can be used continuously. Some users cycle 8-12 weeks on, 2-4 weeks off.',
    whatToExpected: ['Gradual strength improvements', 'Enhanced recovery', 'Potential lean muscle gains'],
    performanceRatings: {
      strength: 4,
      muscle: 4,
      recovery: 5,
      endurance: 3
    }
  },
  {
    id: '2',
    name: 'MK-677 (Ibutamoren)',
    price: 79.99,
    images: ['/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png'],
    description: 'Growth hormone secretagogue that may support recovery and sleep quality.',
    sideEffects: 'Some users may experience increased appetite, mild water retention, or temporary changes in sleep patterns during initial use.',
    categories: ['recovery', 'sleep'],
    specifications: {
      'Active Ingredient': 'Ibutamoren (MK-677)',
      'Strength': '25mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/mk677-test.pdf',
    researchBackground: 'MK-677 is a growth hormone secretagogue that mimics the action of ghrelin...',
    benefits: ['May enhance recovery', 'Could improve sleep quality', 'May support lean mass'],
    effectsOnWomen: 'Generally well-tolerated by women. May support recovery and sleep quality.',
    howItWorks: 'Stimulates the release of growth hormone and IGF-1 through ghrelin receptor activation.',
    safetyInformation: 'Start with lower doses to assess tolerance. Monitor blood sugar levels if diabetic.',
    cycleInformation: 'Typically used for 3-6 month cycles with 1-2 month breaks.',
    whatToExpected: ['Improved sleep quality', 'Enhanced recovery', 'Increased appetite'],
    performanceRatings: {
      strength: 3,
      muscle: 4,
      recovery: 5,
      endurance: 3
    }
  },
  {
    id: 'rad140',
    name: 'RAD-140 (Testolone)',
    price: 89.99,
    images: ['/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png'],
    description: 'Selective androgen receptor modulator that may support muscle growth and strength.',
    sideEffects: 'May cause mild suppression of natural testosterone production. Some users report slight fatigue or mood changes.',
    categories: ['muscle-building', 'strength'],
    specifications: {
      'Active Ingredient': 'RAD-140',
      'Strength': '10mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/rad140-test.pdf',
    researchBackground: 'RAD-140 is a selective androgen receptor modulator (SARM)...',
    benefits: ['May support muscle growth', 'Could enhance strength', 'May improve bone density'],
    effectsOnWomen: 'Not typically recommended for women due to potential androgenic effects.',
    howItWorks: 'Selectively binds to androgen receptors in muscle and bone tissue.',
    safetyInformation: 'Post-cycle therapy may be recommended. Regular blood work advised.',
    cycleInformation: '8-12 week cycles with equal time off. PCT recommended.',
    whatToExpected: ['Strength gains', 'Muscle growth', 'Enhanced performance'],
    performanceRatings: {
      strength: 5,
      muscle: 5,
      recovery: 4,
      endurance: 3
    }
  },
  {
    id: 'lgd4033',
    name: 'LGD-4033 (Ligandrol)',
    price: 84.99,
    images: ['/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png'],
    description: 'Selective androgen receptor modulator designed for muscle building and strength enhancement.',
    sideEffects: 'May cause mild suppression of natural hormone production. Some users experience slight water retention or mood changes.',
    categories: ['muscle-building', 'strength'],
    specifications: {
      'Active Ingredient': 'LGD-4033',
      'Strength': '10mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/lgd4033-test.pdf',
    researchBackground: 'LGD-4033 is one of the most researched SARMs for muscle building...',
    benefits: ['May support lean muscle gains', 'Could enhance strength', 'May improve recovery'],
    effectsOnWomen: 'Generally not recommended for women due to potential androgenic effects.',
    howItWorks: 'Binds selectively to androgen receptors in muscle and bone tissue.',
    safetyInformation: 'Post-cycle therapy recommended. Monitor liver function during use.',
    cycleInformation: '8-12 week cycles with 4-6 weeks off. PCT advised.',
    whatToExpected: ['Lean muscle gains', 'Strength improvements', 'Enhanced recovery'],
    performanceRatings: {
      strength: 4,
      muscle: 5,
      recovery: 4,
      endurance: 3
    }
  },
  {
    id: 's4',
    name: 'S-4 (Andarine)',
    price: 79.99,
    images: ['/lovable-uploads/69119c43-3e9f-4f14-b797-534575c4976a.png'],
    description: 'Selective androgen receptor modulator known for its potential to enhance muscle mass and fat loss.',
    sideEffects: 'Some users have reported temporary vision changes at higher doses. May also cause mild suppression of natural hormone production.',
    categories: ['muscle-building', 'fat-loss'],
    specifications: {
      'Active Ingredient': 'S-4 (Andarine)',
      'Strength': '50mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/s4-test.pdf',
    researchBackground: 'S-4 is a SARM that has been studied for its effects on muscle and bone tissue...',
    benefits: ['May support muscle growth', 'Could aid in fat loss', 'May improve bone density'],
    effectsOnWomen: 'Not typically recommended for women due to potential androgenic effects.',
    howItWorks: 'Selectively targets androgen receptors in muscle and bone tissue.',
    safetyInformation: 'Start with lower doses to assess tolerance. Monitor vision if experiencing changes.',
    cycleInformation: '6-8 week cycles with 4-6 weeks off. PCT may be considered.',
    whatToExpected: ['Muscle gains', 'Fat loss', 'Improved definition'],
    performanceRatings: {
      strength: 4,
      muscle: 4,
      recovery: 3,
      endurance: 4
    }
  },
  {
    id: 'gw501516',
    name: 'GW-501516 (Cardarine)',
    price: 69.99,
    images: ['/lovable-uploads/939c0959-a369-497d-9443-a89859d3671e.png'],
    description: 'PPARδ receptor agonist that may enhance endurance and fat loss.',
    sideEffects: 'Generally well-tolerated, but long-term safety data is limited. Monitor overall health during use.',
    categories: ['endurance', 'fat-loss'],
    specifications: {
      'Active Ingredient': 'GW-501516',
      'Strength': '10mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/gw501516-test.pdf',
    researchBackground: 'GW-501516 is a PPARδ receptor agonist...',
    benefits: ['May improve endurance', 'Could support fat loss', 'May enhance cardiovascular performance'],
    effectsOnWomen: 'Generally considered safe for women. May support endurance and fat loss.',
    howItWorks: 'Activates the PPARδ receptor, influencing energy expenditure and fat metabolism.',
    safetyInformation: 'Monitor cardiovascular health. Not recommended for individuals with pre-existing heart conditions.',
    cycleInformation: '8-12 week cycles. Avoid long-term continuous use.',
    whatToExpected: ['Increased endurance', 'Fat loss', 'Improved stamina'],
    performanceRatings: {
      strength: 3,
      muscle: 3,
      recovery: 4,
      endurance: 5
    }
  },
  {
    id: 'sr9009',
    name: 'SR-9009 (Stenabolic)',
    price: 74.99,
    images: ['/lovable-uploads/04a9a29b-8991-41c7-8878-5af081732b59.png'],
    description: 'Rev-ErbA agonist that may enhance endurance and metabolic rate.',
    sideEffects: 'Generally well-tolerated. Some users report mild insomnia or changes in sleep patterns.',
    categories: ['endurance', 'metabolic'],
    specifications: {
      'Active Ingredient': 'SR-9009',
      'Strength': '20mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/sr9009-test.pdf',
    researchBackground: 'SR-9009 is a Rev-ErbA agonist...',
    benefits: ['May improve endurance', 'Could increase metabolic rate', 'May support fat loss'],
    effectsOnWomen: 'Generally considered safe for women. May support endurance and metabolic rate.',
    howItWorks: 'Binds to the Rev-ErbA protein, influencing metabolic processes and energy expenditure.',
    safetyInformation: 'Monitor sleep patterns. Not recommended for individuals with severe sleep disorders.',
    cycleInformation: '6-8 week cycles. Avoid long-term continuous use.',
    whatToExpected: ['Increased endurance', 'Improved metabolic rate', 'Potential fat loss'],
    performanceRatings: {
      strength: 3,
      muscle: 3,
      recovery: 4,
      endurance: 5
    }
  },
  {
    id: 'yk11',
    name: 'YK-11',
    price: 94.99,
    images: ['/lovable-uploads/04a9a29b-8991-41c7-8878-5af081732b59.png'],
    description: 'Potent Myostatin inhibitor that may promote significant muscle growth.',
    sideEffects: 'May cause suppression of natural hormone production. Androgenic effects are possible. Monitor overall health during use.',
    categories: ['muscle-building'],
    specifications: {
      'Active Ingredient': 'YK-11',
      'Strength': '5mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/yk11-test.pdf',
    researchBackground: 'YK-11 is a Myostatin inhibitor...',
    benefits: ['May support significant muscle growth', 'Could enhance strength'],
    effectsOnWomen: 'Not recommended for women due to potential androgenic effects.',
    howItWorks: 'Inhibits Myostatin, a protein that limits muscle growth.',
    safetyInformation: 'Post-cycle therapy recommended. Monitor liver function during use.',
    cycleInformation: '4-6 week cycles with 4-6 weeks off. PCT advised.',
    whatToExpected: ['Significant muscle gains', 'Strength improvements'],
    performanceRatings: {
      strength: 5,
      muscle: 5,
      recovery: 3,
      endurance: 3
    }
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene',
    price: 54.99,
    images: ['/lovable-uploads/04a9a29b-8991-41c7-8878-5af081732b59.png'],
    description: 'Estrogen receptor modulator that may help boost testosterone levels.',
    sideEffects: 'Generally well-tolerated. Some users may experience mild mood changes or visual disturbances.',
    categories: ['hormone-support', 'pct'],
    specifications: {
      'Active Ingredient': 'Enclomiphene Citrate',
      'Strength': '12.5mg per capsule',
      'Serving Size': '1 capsule',
      'Servings Per Container': '30'
    },
     featured: false,
    inStock: true,
    labTestFile: '/lab-tests/enclomiphene-test.pdf',
    researchBackground: 'Enclomiphene Citrate is an estrogen receptor modulator...',
    benefits: ['May support increased testosterone levels', 'Could improve sperm quality', 'May help restore hormonal balance'],
    effectsOnWomen: 'Not intended for use by women.',
    howItWorks: 'Blocks estrogen receptors in the pituitary gland, stimulating testosterone production.',
    safetyInformation: 'Consult with healthcare provider before use. Monitor hormone levels during use.',
    cycleInformation: 'Typically used as part of a post-cycle therapy (PCT) protocol.',
    whatToExpected: ['Increased testosterone levels', 'Improved hormonal balance'],
    performanceRatings: {
      strength: 3,
      muscle: 3,
      recovery: 4,
      endurance: 3
    }
  },
  {
    id: 'cistanche',
    name: 'Cistanche',
    price: 44.99,
    images: ['/lovable-uploads/04a9a29b-8991-41c7-8878-5af081732b59.png'],
    description: 'Herbal supplement traditionally used to support vitality and hormone health.',
    sideEffects: 'Generally well-tolerated. Some users may experience mild digestive discomfort.',
    categories: ['hormone-support', 'vitality'],
    specifications: {
      'Active Ingredient': 'Cistanche Extract',
      'Strength': '200mg per capsule',
      'Serving Size': '2 capsules',
      'Servings Per Container': '30'
    },
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/cistanche-test.pdf',
    researchBackground: 'Cistanche is a desert plant traditionally used in Chinese medicine...',
    benefits: ['May support vitality', 'Could enhance hormone health', 'May improve energy levels'],
    effectsOnWomen: 'Generally considered safe for women. May support vitality and energy levels.',
    howItWorks: 'Contains compounds that may influence hormone production and overall vitality.',
    safetyInformation: 'Consult with healthcare provider before use. Not recommended for pregnant or nursing women.',
    cycleInformation: 'Can be used continuously. Some users cycle 8-12 weeks on, 2-4 weeks off.',
    whatToExpected: ['Improved vitality', 'Enhanced energy levels', 'Potential hormone support'],
    performanceRatings: {
      strength: 3,
      muscle: 3,
      recovery: 4,
      endurance: 4
    }
  }
];
