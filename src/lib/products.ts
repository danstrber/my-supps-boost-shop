
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  features: string[];
  specifications: {
    dosePerCapsule: string;
    capsulesPerBottle: number;
    typicalCycleLength: string;
    potencyLevel: string;
  };
  detailedInfo: {
    researchBackground: string;
    benefits: string[];
    sideEffects: string[];
    effectsOnWomen: string;
    howItWorks: string;
    safetyInformation: string;
    cycleInformation: string;
    whatToExpect: string;
    performanceRatings: {
      muscleGain: number;
      strength: number;
      fatLoss: number;
      sideEffects: number;
      maintainability: number;
    };
  };
}

export const products: Product[] = [
  {
    id: 'superdrol',
    name: 'Superdrol',
    price: 25,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    description: 'Powerful oral steroid for rapid muscle growth and strength gains with exceptional potency.',
    category: 'oral-steroids',
    inStock: true,
    features: [
      'Rapid muscle growth',
      'Increased strength',
      'Enhanced performance',
      'Quick results'
    ],
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: 20,
      typicalCycleLength: '4-6 weeks',
      potencyLevel: 'Very High'
    },
    detailedInfo: {
      researchBackground: 'Superdrol has been extensively studied for its powerful anabolic effects and ability to promote rapid muscle growth and strength gains.',
      benefits: [
        'Rapid lean muscle mass gains',
        'Significant strength increases',
        'Enhanced muscle hardness and definition',
        'Improved nitrogen retention',
        'Increased protein synthesis'
      ],
      sideEffects: [
        'Liver toxicity with prolonged use',
        'Possible blood pressure elevation',
        'Cholesterol level changes',
        'Natural testosterone suppression',
        'Potential hair loss in predisposed individuals'
      ],
      effectsOnWomen: 'Not recommended for women due to high androgenic activity and risk of virilization effects.',
      howItWorks: 'Works by binding to androgen receptors, dramatically increasing protein synthesis and nitrogen retention for rapid muscle growth.',
      safetyInformation: 'Requires liver support and PCT. Monitor blood pressure and cholesterol levels. Not for beginners.',
      cycleInformation: 'Best used for 4-6 weeks maximum. Requires comprehensive post-cycle therapy and liver support throughout.',
      whatToExpect: 'Users report significant strength gains within 1 week, visible muscle growth within 2-3 weeks, and continued gains throughout the cycle.',
      performanceRatings: {
        muscleGain: 5,
        strength: 5,
        fatLoss: 3,
        sideEffects: 2,
        maintainability: 2
      }
    }
  },
  {
    id: 'rad-140',
    name: 'RAD-140 (Testolone)',
    price: 55,
    image: '/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png',
    description: 'Selective Androgen Receptor Modulator for lean muscle mass and strength with minimal side effects.',
    category: 'sarms',
    inStock: true,
    features: [
      'Lean muscle gains',
      'Increased strength',
      'Improved endurance',
      'Minimal side effects'
    ],
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: 50,
      typicalCycleLength: '8-12 weeks',
      potencyLevel: 'High'
    },
    detailedInfo: {
      researchBackground: 'RAD-140 has been extensively researched for its selective anabolic effects on muscle and bone tissue while minimizing androgenic side effects.',
      benefits: [
        'Lean muscle mass increase',
        'Enhanced strength and power',
        'Improved endurance and stamina',
        'Better recovery between workouts',
        'Increased bone density'
      ],
      sideEffects: [
        'Mild testosterone suppression',
        'Possible mild hair thinning',
        'Occasional aggression increase',
        'Potential sleep disruption',
        'Slight increase in body temperature'
      ],
      effectsOnWomen: 'Generally well tolerated by women at lower doses. Monitor for any signs of virilization and adjust dosage accordingly.',
      howItWorks: 'Selectively binds to androgen receptors in muscle and bone tissue, promoting anabolic effects while minimizing unwanted androgenic effects.',
      safetyInformation: 'Generally safer than traditional steroids. Light PCT may be required. Monitor liver function during extended use.',
      cycleInformation: 'Optimal cycle length is 8-12 weeks. Can be stacked with other SARMs. Mini PCT recommended after cycle.',
      whatToExpect: 'Users report increased strength within 2 weeks, noticeable muscle gains by week 4, and continued improvements throughout the cycle.',
      performanceRatings: {
        muscleGain: 4,
        strength: 4,
        fatLoss: 3,
        sideEffects: 4,
        maintainability: 4
      }
    }
  },
  {
    id: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    price: 45,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    description: 'Growth hormone secretagogue for muscle growth, recovery, and improved sleep quality.',
    category: 'growth',
    inStock: true,
    features: [
      'Increased growth hormone',
      'Better recovery',
      'Improved sleep quality',
      'Enhanced muscle growth'
    ],
    specifications: {
      dosePerCapsule: '10mg',
      capsulesPerBottle: 50,
      typicalCycleLength: '8-12 weeks',
      potencyLevel: 'High Growth Hormone'
    },
    detailedInfo: {
      researchBackground: 'MK-677 has been extensively studied for its ability to increase growth hormone levels, improve sleep quality, and enhance recovery.',
      benefits: [
        'Increased lean muscle mass',
        'Improved sleep quality',
        'Enhanced recovery',
        'Stronger bones',
        'Better skin and hair quality',
        'Increased appetite'
      ],
      sideEffects: [
        'May cause increased appetite',
        'Mild water retention',
        'Occasional fatigue',
        'Possible blood sugar variations',
        'Temporary joint sensations'
      ],
      effectsOnWomen: 'Generally well tolerated by women. May help with anti-aging benefits and improved recovery. Monitor for increased appetite.',
      howItWorks: 'Mimics ghrelin to stimulate growth hormone release from the pituitary gland, increasing IGF-1 levels naturally.',
      safetyInformation: 'Generally safe for long-term use. Monitor blood sugar levels. Take with food to reduce stomach upset.',
      cycleInformation: 'Can be used for extended periods (3-6 months). Best taken in the evening due to sleep benefits.',
      whatToExpect: 'Users report improved sleep within 1-2 weeks, increased appetite, and gradual muscle gains over 8-12 weeks.',
      performanceRatings: {
        muscleGain: 3,
        strength: 2,
        fatLoss: 2,
        sideEffects: 4,
        maintainability: 5
      }
    }
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
    ],
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: 50,
      typicalCycleLength: '4-6 weeks PCT',
      potencyLevel: 'High SERM'
    },
    detailedInfo: {
      researchBackground: 'Clomid has been extensively used in post-cycle therapy to restore natural testosterone production and prevent muscle loss after anabolic cycles.',
      benefits: [
        'Restores natural testosterone levels',
        'Prevents estrogen rebound effects',
        'Maintains muscle gains post-cycle',
        'Improves mood and energy levels',
        'Supports natural hormone recovery'
      ],
      sideEffects: [
        'Possible mood swings',
        'Occasional visual disturbances',
        'Potential hot flashes',
        'Mild nausea',
        'Temporary emotional sensitivity'
      ],
      effectsOnWomen: 'Used in fertility treatments for women. Can help regulate ovulation and hormonal balance under medical supervision.',
      howItWorks: 'Blocks estrogen receptors in the hypothalamus, triggering increased LH and FSH production, which stimulates natural testosterone production.',
      safetyInformation: 'Generally safe for short-term PCT use. Avoid prolonged use. Monitor vision during use.',
      cycleInformation: 'Typically used for 4-6 weeks post-cycle. Start 2 weeks after last injection or immediately after oral cycle.',
      whatToExpect: 'Users report improved energy and mood within 1-2 weeks, with testosterone levels gradually returning to normal over 4-6 weeks.',
      performanceRatings: {
        muscleGain: 1,
        strength: 1,
        fatLoss: 1,
        sideEffects: 3,
        maintainability: 5
      }
    }
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene Citrate',
    price: 25,
    image: '/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png',
    description: 'Selective estrogen receptor modulator for natural testosterone support with fewer side effects than Clomid.',
    category: 'pct',
    inStock: true,
    features: [
      'Natural testosterone support',
      'Improved hormonal balance',
      'Fewer side effects than Clomid',
      'Effective PCT option'
    ],
    specifications: {
      dosePerCapsule: '12.5mg',
      capsulesPerBottle: 25,
      typicalCycleLength: '4-8 weeks',
      potencyLevel: 'High SERM'
    },
    detailedInfo: {
      researchBackground: 'Enclomiphene is the active isomer of Clomid, providing superior testosterone boosting effects with reduced side effects.',
      benefits: [
        'Increases natural testosterone production',
        'Fewer side effects than traditional Clomid',
        'Improves energy and libido',
        'Better mood stability',
        'Effective for both PCT and TRT alternative'
      ],
      sideEffects: [
        'Minimal mood effects',
        'Rare visual disturbances',
        'Occasional mild headaches',
        'Possible slight nausea',
        'Generally well tolerated'
      ],
      effectsOnWomen: 'Can be used by women for fertility enhancement under medical guidance. Generally better tolerated than traditional Clomid.',
      howItWorks: 'Selectively blocks estrogen receptors, stimulating the release of LH and FSH, which naturally increases testosterone production.',
      safetyInformation: 'Safer profile than traditional Clomid. Monitor testosterone levels. Generally well tolerated for extended use.',
      cycleInformation: 'Can be used for 4-8 weeks for PCT or longer for testosterone optimization. More flexible dosing than Clomid.',
      whatToExpect: 'Users report improved energy within 1 week, better mood and libido within 2 weeks, and optimized testosterone levels within 4 weeks.',
      performanceRatings: {
        muscleGain: 2,
        strength: 2,
        fatLoss: 1,
        sideEffects: 5,
        maintainability: 5
      }
    }
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    description: 'Aromatase inhibitor for controlling estrogen levels during cycles with no rebound effect.',
    category: 'pct',
    inStock: true,
    features: [
      'Powerful aromatase inhibitor',
      'Controls estrogen levels',
      'Prevents gynecomastia',
      'Suicidal inhibitor - no rebound'
    ],
    specifications: {
      dosePerCapsule: '25mg',
      capsulesPerBottle: 10,
      typicalCycleLength: 'Cycle support',
      potencyLevel: 'High AI'
    },
    detailedInfo: {
      researchBackground: 'Aromasin has been extensively researched as a powerful aromatase inhibitor for controlling estrogen-related side effects during anabolic cycles.',
      benefits: [
        'Prevents estrogen-related side effects',
        'Reduces water retention',
        'Prevents gynecomastia development',
        'No estrogen rebound effect',
        'Maintains muscle hardness'
      ],
      sideEffects: [
        'Possible joint dryness',
        'Potential mood changes',
        'Possible cholesterol effects',
        'Risk of crashed estrogen if overdosed',
        'Potential bone density concerns with long-term use'
      ],
      effectsOnWomen: 'Used in breast cancer treatment for post-menopausal women. Not typically used by premenopausal women for performance purposes.',
      howItWorks: 'Irreversibly binds to and deactivates aromatase enzymes, preventing the conversion of testosterone to estrogen.',
      safetyInformation: 'Monitor estrogen levels to avoid crashing. Use only when necessary. Support joint health during use.',
      cycleInformation: 'Used as needed during cycle based on estrogen symptoms. Typical dosing is every other day or as symptoms arise.',
      whatToExpect: 'Users report reduced water retention within days, prevention of estrogen symptoms, and maintained muscle hardness throughout cycle.',
      performanceRatings: {
        muscleGain: 1,
        strength: 1,
        fatLoss: 2,
        sideEffects: 3,
        maintainability: 4
      }
    }
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    description: 'Powerful fat burner and performance enhancer for cutting cycles with thermogenic effects.',
    category: 'fat-burners',
    inStock: true,
    features: [
      'Rapid fat loss',
      'Increased metabolism',
      'Preserved muscle mass',
      'Enhanced performance'
    ],
    specifications: {
      dosePerCapsule: '40mcg',
      capsulesPerBottle: 50,
      typicalCycleLength: '2 weeks on/off',
      potencyLevel: 'Very High Fat Loss'
    },
    detailedInfo: {
      researchBackground: 'Clenbuterol has been extensively studied for its powerful thermogenic and fat-burning properties while preserving lean muscle mass.',
      benefits: [
        'Rapid fat loss and weight reduction',
        'Increased metabolic rate',
        'Preserved lean muscle mass during cuts',
        'Enhanced cardiovascular performance',
        'Improved muscle definition'
      ],
      sideEffects: [
        'Increased heart rate and blood pressure',
        'Possible jitters and anxiety',
        'Insomnia and sleep disturbances',
        'Excessive sweating',
        'Potential muscle cramps'
      ],
      effectsOnWomen: 'Generally well tolerated by women at lower doses. Effective for fat loss with minimal androgenic effects. Monitor cardiovascular responses.',
      howItWorks: 'Stimulates beta-2 receptors, increasing metabolic rate and thermogenesis while promoting fat oxidation and preserving muscle tissue.',
      safetyInformation: 'Monitor heart rate and blood pressure. Stay well hydrated. Supplement with taurine and potassium. Not suitable for those with heart conditions.',
      cycleInformation: 'Typically used in 2-week cycles followed by 2-week breaks. Start with low doses and gradually increase. Maximum 6-8 week total use.',
      whatToExpect: 'Users report increased energy and sweating within hours, noticeable fat loss within 1 week, and significant body composition changes over 2-4 weeks.',
      performanceRatings: {
        muscleGain: 1,
        strength: 2,
        fatLoss: 5,
        sideEffects: 2,
        maintainability: 3
      }
    }
  },
  {
    id: 'accutane',
    name: 'Accutane (Isotretinoin)',
    price: 30,
    image: '',
    description: 'Powerful acne treatment for severe cases and steroid-induced acne with long-lasting results.',
    category: 'support',
    inStock: true,
    features: [
      'Treats severe acne',
      'Reduces oil production',
      'Long-lasting results',
      'Prevents scarring'
    ],
    specifications: {
      dosePerCapsule: '20mg',
      capsulesPerBottle: 50,
      typicalCycleLength: '4-6 months',
      potencyLevel: 'High Acne Treatment'
    },
    detailedInfo: {
      researchBackground: 'Accutane has been extensively studied and proven to be the most effective treatment for severe acne and steroid-induced acne breakouts.',
      benefits: [
        'Eliminates severe acne',
        'Dramatically reduces oil production',
        'Prevents acne scarring',
        'Long-lasting or permanent results',
        'Effective against steroid-induced acne'
      ],
      sideEffects: [
        'Dry skin and lips',
        'Possible mood changes',
        'Increased sun sensitivity',
        'Potential joint pain',
        'Temporary hair thinning'
      ],
      effectsOnWomen: 'Highly effective for women but requires pregnancy prevention due to teratogenic effects. Regular monitoring recommended.',
      howItWorks: 'Reduces sebaceous gland size and oil production while normalizing skin cell turnover to prevent clogged pores.',
      safetyInformation: 'Requires regular blood monitoring. Use sun protection. Avoid pregnancy. Monitor liver function and cholesterol levels.',
      cycleInformation: 'Typically used for 4-6 months for complete treatment. Dosage based on body weight and severity of acne.',
      whatToExpect: 'Initial dryness within days, possible temporary worsening in first month, clear improvement by month 2-3, with long-lasting results.',
      performanceRatings: {
        muscleGain: 0,
        strength: 0,
        fatLoss: 0,
        sideEffects: 3,
        maintainability: 5
      }
    }
  }
];
