
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categories: string[];
  description: {
    en: string;
    es: string;
  };
  specifications: {
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
  researchBackground: {
    en: string;
    es: string;
  };
  benefits: {
    en: string;
    es: string;
  };
  sideEffects: {
    en: string;
    es: string;
  };
  effectsOnWomen: {
    en: string;
    es: string;
  };
  howItWorks: {
    en: string;
    es: string;
  };
  safetyInformation: {
    en: string;
    es: string;
  };
  cycleInformation: {
    en: string;
    es: string;
  };
  whatToExpect: {
    en: string;
    es: string;
  };
  performanceRatings: {
    muscleGain: number;
    strength: number;
    fatLoss: number;
    sideEffects: number;
    retention: number;
  };
  featured?: boolean;
  labTestFile?: string;
  inStock?: boolean;
  keyIngredients?: {
    en: string[];
    es: string[];
  };
  dosage?: {
    en: string;
    es: string;
  };
  usage?: {
    en: string;
    es: string;
  };
  warnings?: {
    en: string[];
    es: string[];
  };
}

// Simple product interface for backward compatibility
export interface SimpleProduct {
  id: string;
  name: string;
  description: string;
  dosage: string;
  quantity: string;
  price: number;
  imageUrl: string;
  tags: string[];
  effects: string[];
  sideEffects: string[];
  dosageInfo: string;
  whatToExpect: string;
  categories: string[];
}

export const products: SimpleProduct[] = [
  {
    id: '1',
    name: 'Testosterone Cypionate',
    description: 'Premium quality testosterone cypionate for enhanced performance and muscle growth.',
    dosage: '250mg/ml',
    quantity: '10ml vial',
    price: 45,
    imageUrl: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    tags: ['Popular', 'Injectable'],
    categories: ['Injectable', 'Testosterone'],
    effects: ['Muscle Growth', 'Strength Increase', 'Enhanced Recovery'],
    sideEffects: ['Acne', 'Hair Loss', 'Mood Changes'],
    dosageInfo: 'Recommended: 250-500mg per week',
    whatToExpect: 'Significant muscle mass and strength gains within 4-6 weeks of consistent use.'
  },
  {
    id: '2',
    name: 'Anavar (Oxandrolone)',
    description: 'Mild oral anabolic steroid perfect for cutting cycles and lean muscle preservation.',
    dosage: '10mg',
    quantity: '100 tablets',
    price: 75,
    imageUrl: '/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png',
    tags: ['Cutting', 'Oral', 'Beginner Friendly'],
    categories: ['Oral', 'Cutting'],
    effects: ['Fat Loss', 'Muscle Preservation', 'Increased Vascularity'],
    sideEffects: ['Mild Liver Stress', 'Cholesterol Changes'],
    dosageInfo: 'Men: 20-80mg daily, Women: 5-20mg daily',
    whatToExpect: 'Enhanced muscle definition and fat loss with minimal side effects.'
  },
  {
    id: '3',
    name: 'Deca-Durabolin (Nandrolone)',
    description: 'Long-acting injectable steroid known for joint health benefits and steady muscle gains.',
    dosage: '300mg/ml',
    quantity: '10ml vial',
    price: 55,
    imageUrl: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    tags: ['Bulking', 'Injectable', 'Joint Health'],
    categories: ['Injectable', 'Bulking'],
    effects: ['Muscle Growth', 'Joint Relief', 'Improved Recovery'],
    sideEffects: ['Water Retention', 'Possible Erectile Issues'],
    dosageInfo: 'Recommended: 300-600mg per week',
    whatToExpect: 'Steady muscle gains and improved joint comfort over 8-12 weeks.'
  },
  {
    id: '4',
    name: 'Dianabol (Methandrostenolone)',
    description: 'Classic oral bulking steroid for rapid muscle and strength gains.',
    dosage: '25mg',
    quantity: '100 tablets',
    price: 40,
    imageUrl: '/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png',
    tags: ['Bulking', 'Oral', 'Fast Acting'],
    categories: ['Oral', 'Bulking'],
    effects: ['Rapid Muscle Growth', 'Strength Increase', 'Improved Protein Synthesis'],
    sideEffects: ['Water Retention', 'Liver Stress', 'Gynecomastia Risk'],
    dosageInfo: 'Recommended: 25-50mg daily',
    whatToExpect: 'Quick muscle and strength gains within the first 2-3 weeks.'
  },
  {
    id: '5',
    name: 'Trenbolone Acetate',
    description: 'Powerful injectable steroid for advanced users seeking extreme muscle growth and fat loss.',
    dosage: '100mg/ml',
    quantity: '10ml vial',
    price: 80,
    imageUrl: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    tags: ['Advanced', 'Injectable', 'Cutting'],
    categories: ['Injectable', 'Advanced'],
    effects: ['Extreme Muscle Growth', 'Fat Loss', 'Increased Strength'],
    sideEffects: ['Night Sweats', 'Insomnia', 'Aggressive Behavior'],
    dosageInfo: 'Advanced users only: 200-400mg per week',
    whatToExpect: 'Dramatic physique changes with significant muscle growth and fat loss.'
  },
  {
    id: '6',
    name: 'Winstrol (Stanozolol)',
    description: 'Versatile steroid available in both oral and injectable forms, ideal for cutting and athletic performance.',
    dosage: '50mg',
    quantity: '60 tablets',
    price: 65,
    imageUrl: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    tags: ['Cutting', 'Oral', 'Athletic Performance'],
    categories: ['Oral', 'Cutting'],
    effects: ['Muscle Hardening', 'Fat Loss', 'Increased Speed'],
    sideEffects: ['Joint Dryness', 'Liver Stress', 'Cholesterol Changes'],
    dosageInfo: 'Men: 50-100mg daily, Women: 10-20mg daily',
    whatToExpect: 'Enhanced muscle definition and athletic performance within 2-4 weeks.'
  },
  {
    id: '7',
    name: 'Masteron (Drostanolone)',
    description: 'Premium cutting steroid that provides muscle hardness and anti-estrogenic effects.',
    dosage: '200mg/ml',
    quantity: '10ml vial',
    price: 70,
    imageUrl: '/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png',
    tags: ['Cutting', 'Injectable', 'Anti-Estrogen'],
    categories: ['Injectable', 'Cutting'],
    effects: ['Muscle Hardening', 'Fat Loss', 'Anti-Estrogenic'],
    sideEffects: ['Hair Loss', 'Acne', 'Mood Changes'],
    dosageInfo: 'Recommended: 400-600mg per week',
    whatToExpect: 'Enhanced muscle definition and hardness, particularly effective when body fat is already low.'
  },
  {
    id: '8',
    name: 'Primobolan (Methenolone)',
    description: 'Mild and safe steroid option, excellent for beginners and those prioritizing minimal side effects.',
    dosage: '100mg/ml',
    quantity: '10ml vial',
    price: 90,
    imageUrl: '/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png',
    tags: ['Beginner Friendly', 'Injectable', 'Mild'],
    categories: ['Injectable', 'Beginner'],
    effects: ['Lean Muscle Growth', 'Fat Loss', 'Muscle Preservation'],
    sideEffects: ['Minimal', 'Possible Hair Loss'],
    dosageInfo: 'Men: 400-800mg per week, Women: 50-100mg per week',
    whatToExpect: 'Slow but quality muscle gains with minimal side effects over 12-16 weeks.'
  },
  {
    id: '9',
    name: 'Anadrol (Oxymetholone)',
    description: 'Powerful oral steroid for massive strength and size gains in bulking cycles.',
    dosage: '50mg',
    quantity: '60 tablets',
    price: 60,
    imageUrl: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    tags: ['Bulking', 'Oral', 'Strength'],
    categories: ['Oral', 'Bulking'],
    effects: ['Massive Strength Gains', 'Rapid Weight Gain', 'Increased Appetite'],
    sideEffects: ['Liver Stress', 'Water Retention', 'High Blood Pressure'],
    dosageInfo: 'Recommended: 50-100mg daily for 4-6 weeks',
    whatToExpect: 'Rapid strength and size gains within the first week of use.'
  },
  {
    id: '10',
    name: 'Sustanon 250',
    description: 'Testosterone blend providing both fast-acting and long-lasting effects for sustained muscle growth.',
    dosage: '250mg/ml',
    quantity: '10ml vial',
    price: 50,
    imageUrl: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    tags: ['Testosterone Blend', 'Injectable', 'Versatile'],
    categories: ['Injectable', 'Testosterone'],
    effects: ['Muscle Growth', 'Strength Increase', 'Improved Recovery'],
    sideEffects: ['Acne', 'Hair Loss', 'Mood Changes'],
    dosageInfo: 'Recommended: 250-750mg per week',
    whatToExpect: 'Steady muscle and strength gains with consistent energy levels.'
  },
  {
    id: '11',
    name: 'Equipoise (Boldenone)',
    description: 'Versatile injectable steroid that promotes steady muscle growth and increased appetite.',
    dosage: '300mg/ml',
    quantity: '10ml vial',
    price: 65,
    imageUrl: '/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png',
    tags: ['Versatile', 'Injectable', 'Appetite'],
    categories: ['Injectable', 'Bulking'],
    effects: ['Steady Muscle Growth', 'Increased Appetite', 'Enhanced Endurance'],
    sideEffects: ['Increased Red Blood Cells', 'Anxiety', 'Hair Loss'],
    dosageInfo: 'Recommended: 400-600mg per week',
    whatToExpect: 'Gradual but consistent muscle gains with improved endurance over 12-16 weeks.'
  },
  {
    id: '12',
    name: 'Halotestin (Fluoxymesterone)',
    description: 'Extremely potent oral steroid for strength gains without significant weight increase.',
    dosage: '10mg',
    quantity: '50 tablets',
    price: 95,
    imageUrl: '/lovable-uploads/63f9d2b1-4c72-40c0-8434-8e48cade7de5.png',
    tags: ['Strength', 'Oral', 'Advanced'],
    categories: ['Oral', 'Advanced'],
    effects: ['Extreme Strength Gains', 'Aggression', 'No Water Retention'],
    sideEffects: ['Severe Liver Toxicity', 'Aggressive Behavior', 'Cardiovascular Stress'],
    dosageInfo: 'Advanced users only: 10-40mg daily for 2-4 weeks',
    whatToExpect: 'Incredible strength gains without weight gain, ideal for powerlifters and strength athletes.'
  },
  {
    id: '13',
    name: 'Turinabol (Chlorodehydromethyltestosterone)',
    description: 'Oral steroid providing quality muscle gains with minimal water retention and side effects.',
    dosage: '20mg',
    quantity: '100 tablets',
    price: 70,
    imageUrl: '/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png',
    tags: ['Quality Gains', 'Oral', 'Minimal Side Effects'],
    categories: ['Oral', 'Cutting'],
    effects: ['Quality Muscle Growth', 'Strength Increase', 'No Water Retention'],
    sideEffects: ['Mild Liver Stress', 'Cholesterol Changes'],
    dosageInfo: 'Recommended: 40-80mg daily',
    whatToExpect: 'Steady, quality muscle gains without bloating over 6-8 weeks.'
  },
  {
    id: '14',
    name: 'Proviron (Mesterolone)',
    description: 'Unique oral steroid that enhances the effects of other steroids while providing anti-estrogenic benefits.',
    dosage: '25mg',
    quantity: '100 tablets',
    price: 55,
    imageUrl: '/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png',
    tags: ['Anti-Estrogen', 'Oral', 'Stack Enhancer'],
    categories: ['Oral', 'Support'],
    effects: ['Enhanced Libido', 'Muscle Hardening', 'Anti-Estrogenic'],
    sideEffects: ['Hair Loss', 'Acne', 'Mood Changes'],
    dosageInfo: 'Recommended: 50-150mg daily',
    whatToExpect: 'Enhanced effects from other steroids, improved libido, and muscle hardness.'
  },
  {
    id: '15',
    name: 'Clenbuterol',
    description: 'Powerful fat burner and bronchodilator, excellent for cutting cycles and athletic performance.',
    dosage: '40mcg',
    quantity: '100 tablets',
    price: 50,
    imageUrl: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    tags: ['Fat Burner', 'Cutting', 'Performance', 'Lab Tested'],
    categories: ['Fat Burner', 'Cutting'],
    effects: ['Rapid Fat Loss', 'Increased Energy', 'Improved Endurance'],
    sideEffects: ['Hand Tremors', 'Increased Heart Rate', 'Insomnia'],
    dosageInfo: 'Start with 20mcg daily, increase gradually to 120-160mcg',
    whatToExpect: 'Significant fat loss and energy increase within the first week of use.'
  },
  {
    id: '16',
    name: 'T3 (Liothyronine)',
    description: 'Thyroid hormone that significantly boosts metabolism for accelerated fat loss.',
    dosage: '25mcg',
    quantity: '100 tablets',
    price: 45,
    imageUrl: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    tags: ['Fat Burner', 'Metabolism', 'Cutting'],
    categories: ['Fat Burner', 'Cutting'],
    effects: ['Accelerated Metabolism', 'Rapid Fat Loss', 'Increased Body Temperature'],
    sideEffects: ['Heart Palpitations', 'Excessive Sweating', 'Muscle Loss'],
    dosageInfo: 'Start with 25mcg daily, gradually increase to 75-100mcg',
    whatToExpect: 'Dramatic increase in metabolic rate and fat loss, requires careful monitoring.'
  },
  {
    id: '17',
    name: 'HGH (Human Growth Hormone)',
    description: 'Premium recombinant human growth hormone for anti-aging, fat loss, and muscle growth.',
    dosage: '10IU',
    quantity: '10 vials',
    price: 200,
    imageUrl: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    tags: ['Premium', 'Anti-Aging', 'Fat Loss'],
    categories: ['Premium', 'HGH'],
    effects: ['Anti-Aging', 'Fat Loss', 'Muscle Growth', 'Improved Sleep'],
    sideEffects: ['Joint Pain', 'Water Retention', 'Carpal Tunnel'],
    dosageInfo: 'Recommended: 2-6IU daily, preferably split into multiple doses',
    whatToExpect: 'Gradual improvements in body composition, skin quality, and overall well-being over 3-6 months.'
  },
  {
    id: '18',
    name: 'Insulin (Humalog)',
    description: 'Fast-acting insulin for advanced bodybuilders seeking extreme muscle growth and nutrient partitioning.',
    dosage: '100IU/ml',
    quantity: '10ml vial',
    price: 35,
    imageUrl: '/lovable-uploads/7eaf0b79-d90d-4ac9-a577-b5a57d1272f1.png',
    tags: ['Advanced Only', 'Muscle Growth', 'Nutrient Partitioning'],
    categories: ['Advanced', 'Insulin'],
    effects: ['Extreme Muscle Growth', 'Enhanced Nutrient Uptake', 'Rapid Recovery'],
    sideEffects: ['Hypoglycemia Risk', 'Fat Gain', 'Dependency Risk'],
    dosageInfo: 'ADVANCED USERS ONLY: 5-15IU post-workout with carbohydrates',
    whatToExpect: 'Extreme muscle growth potential but requires extensive knowledge and monitoring.'
  },
  {
    id: '19',
    name: 'IGF-1 LR3',
    description: 'Long-acting insulin-like growth factor for enhanced muscle growth and recovery.',
    dosage: '1mg',
    quantity: '1 vial',
    price: 120,
    imageUrl: '/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png',
    tags: ['Advanced', 'Recovery', 'Muscle Growth'],
    categories: ['Advanced', 'Growth Factor'],
    effects: ['Enhanced Muscle Growth', 'Improved Recovery', 'Cell Regeneration'],
    sideEffects: ['Injection Site Reactions', 'Possible Organ Growth'],
    dosageInfo: 'Recommended: 20-40mcg daily, split bilaterally',
    whatToExpect: 'Enhanced muscle fullness and recovery, particularly effective when combined with other compounds.'
  },
  {
    id: '20',
    name: 'Aromasin (Exemestane)',
    description: 'Powerful aromatase inhibitor for controlling estrogen levels during steroid cycles.',
    dosage: '10mg',
    quantity: '25 tablets',
    price: 25,
    imageUrl: '/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png',
    tags: ['AI', 'Cycle Support', 'Estrogen Control'],
    categories: ['Support', 'AI'],
    effects: ['Estrogen Control', 'Reduced Water Retention', 'Prevention of Gynecomastia'],
    sideEffects: ['Joint Dryness', 'Mood Changes', 'Reduced Bone Density'],
    dosageInfo: 'Recommended: 12.5-25mg every other day',
    whatToExpect: 'Effective estrogen control with reduced risk of estrogenic side effects.'
  },
  {
    id: '21',
    name: 'Nolvadex (Tamoxifen)',
    description: 'Selective estrogen receptor modulator (SERM) essential for post-cycle therapy and gynecomastia prevention.',
    dosage: '20mg',
    quantity: '100 tablets',
    price: 30,
    imageUrl: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    tags: ['PCT', 'SERM', 'Gyno Prevention'],
    categories: ['Support', 'PCT'],
    effects: ['Testosterone Recovery', 'Gynecomastia Prevention', 'Estrogen Blocking'],
    sideEffects: ['Hot Flashes', 'Mood Swings', 'Visual Disturbances'],
    dosageInfo: 'PCT: 40mg daily for 2 weeks, then 20mg daily for 2 weeks',
    whatToExpect: 'Essential for maintaining gains and restoring natural testosterone production after cycles.'
  },
  {
    id: '22',
    name: 'Clomid (Clomiphene)',
    description: 'Powerful SERM for post-cycle therapy, helping restore natural testosterone production.',
    dosage: '50mg',
    quantity: '50 tablets',
    price: 35,
    imageUrl: '/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png',
    tags: ['PCT', 'SERM', 'Testosterone Recovery'],
    categories: ['Support', 'PCT'],
    effects: ['Testosterone Recovery', 'LH/FSH Stimulation', 'Fertility Restoration'],
    sideEffects: ['Mood Swings', 'Visual Disturbances', 'Hot Flashes'],
    dosageInfo: 'PCT: 100mg daily for 1 week, then 50mg daily for 3 weeks',
    whatToExpect: 'Effective restoration of natural hormone production and maintenance of muscle gains post-cycle.'
  },
  {
    id: '23',
    name: 'HCG (Human Chorionic Gonadotropin)',
    description: 'Hormone therapy for maintaining testicular function and fertility during steroid cycles.',
    dosage: '5000IU',
    quantity: '1 vial',
    price: 40,
    imageUrl: '/lovable-uploads/9f4f9977-4f6c-4d53-ae01-a03204441df1.png',
    tags: ['Fertility', 'Testicular Function', 'Cycle Support'],
    categories: ['Support', 'HCG'],
    effects: ['Testicular Function Maintenance', 'Fertility Preservation', 'Enhanced Recovery'],
    sideEffects: ['Gynecomastia Risk', 'Water Retention', 'Mood Changes'],
    dosageInfo: 'During cycle: 250-500IU twice weekly, PCT: 2000-3000IU every other day',
    whatToExpect: 'Maintained testicular size and function during cycles, easier PCT transition.'
  },
  {
    id: '24',
    name: 'Cardarine (GW-501516)',
    description: 'PPAR agonist that dramatically improves endurance and promotes fat loss without stimulant effects.',
    dosage: '20mg',
    quantity: '60 capsules',
    price: 80,
    imageUrl: '/lovable-uploads/aea84c22-c0e6-477b-aed1-e323fa1bf550.png',
    tags: ['Endurance', 'Fat Loss', 'PPAR Agonist'],
    categories: ['SARM', 'Endurance'],
    effects: ['Extreme Endurance', 'Fat Loss', 'Improved Recovery'],
    sideEffects: ['Minimal Side Effects', 'Possible Long-term Concerns'],
    dosageInfo: 'Recommended: 10-20mg daily',
    whatToExpect: 'Dramatic improvement in cardiovascular endurance within days, enhanced fat oxidation.'
  },
  {
    id: '25',
    name: 'Ostarine (MK-2866)',
    description: 'Selective androgen receptor modulator (SARM) for lean muscle growth with minimal side effects.',
    dosage: '25mg',
    quantity: '60 capsules',
    price: 70,
    imageUrl: '/lovable-uploads/b43000ed-31b9-4d86-926f-1640e6f0aa3c.png',
    tags: ['SARM', 'Lean Gains', 'Minimal Side Effects'],
    categories: ['SARM', 'Beginner'],
    effects: ['Lean Muscle Growth', 'Strength Increase', 'Muscle Preservation'],
    sideEffects: ['Mild Testosterone Suppression', 'Possible Hair Thinning'],
    dosageInfo: 'Recommended: 20-30mg daily for 8-12 weeks',
    whatToExpect: 'Quality muscle gains with minimal side effects, ideal for beginners to PEDs.'
  },
  {
    id: '26',
    name: 'Ligandrol (LGD-4033)',
    description: 'Potent SARM for significant muscle mass and strength gains with reduced side effects compared to steroids.',
    dosage: '10mg',
    quantity: '60 capsules',
    price: 75,
    imageUrl: '/lovable-uploads/c13fb27e-2e08-4a90-a2a8-c8d6138e0c9a.png',
    tags: ['SARM', 'Mass Gainer', 'Strength'],
    categories: ['SARM', 'Bulking'],
    effects: ['Significant Muscle Growth', 'Strength Increase', 'Enhanced Recovery'],
    sideEffects: ['Testosterone Suppression', 'Water Retention', 'Mood Changes'],
    dosageInfo: 'Recommended: 5-10mg daily for 8-12 weeks',
    whatToExpect: 'Substantial muscle and strength gains similar to mild steroids but with fewer side effects.'
  },
  {
    id: '27',
    name: 'RAD-140 (Testolone)',
    description: 'Powerful SARM that provides steroid-like muscle growth and strength gains with improved safety profile.',
    dosage: '15mg',
    quantity: '60 capsules',
    price: 85,
    imageUrl: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    tags: ['SARM', 'Powerful', 'Muscle Growth'],
    categories: ['SARM', 'Advanced'],
    effects: ['Rapid Muscle Growth', 'Extreme Strength Gains', 'Enhanced Endurance'],
    sideEffects: ['Moderate Testosterone Suppression', 'Possible Hair Loss', 'Mood Changes'],
    dosageInfo: 'Recommended: 10-20mg daily for 8-10 weeks',
    whatToExpect: 'Steroid-like results in muscle growth and strength with reduced risk of severe side effects.'
  },
  {
    id: '28',
    name: 'Accutane (Isotretinoin)',
    description: 'Powerful oral medication for treating severe acne, commonly used by steroid users to manage acne side effects.',
    dosage: '20mg',
    quantity: '50 capsules',
    price: 30,
    imageUrl: '/placeholder.svg',
    tags: ['Acne Treatment', 'Oral', 'Side Effect Management'],
    categories: ['Support', 'Acne'],
    effects: ['Severe Acne Treatment', 'Long-lasting Results', 'Oil Production Reduction'],
    sideEffects: ['Dry Skin', 'Mood Changes', 'Birth Defects Risk', 'Liver Stress'],
    dosageInfo: 'Recommended: 0.5-1mg per kg of body weight daily',
    whatToExpect: 'Significant improvement in severe acne within 3-6 months, with long-lasting results after treatment completion.'
  }
];

export function getProductById(id: string): SimpleProduct | undefined {
  return products.find(product => product.id === id);
}
