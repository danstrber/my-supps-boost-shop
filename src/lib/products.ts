
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  categories: string[];
  details: {
    research: string;
    effectsOnWomen: string;
    benefits: string[];
    sideEffects: string[];
    history: string;
    howItWorks: string;
    safety: string;
    cycle: string;
    expectations: string;
  };
  ratings: {
    effectiveness: number;
    sideEffects: number;
    value: number;
  };
}

export const products: Product[] = [
  {
    id: "mk677",
    name: "MK-677 (Ibutamoren)",
    price: 49.99,
    originalPrice: 79.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Growth hormone secretagogue for enhanced recovery and muscle growth",
    categories: ["sarms", "muscleGrowth", "recovery"],
    details: {
      research: "MK-677 is a potent, orally bioavailable growth hormone secretagogue that stimulates the release of growth hormone and IGF-1.",
      effectsOnWomen: "Women may experience enhanced recovery, improved skin quality, and potential water retention. Lower doses recommended.",
      benefits: [
        "Increased growth hormone levels",
        "Enhanced muscle growth and recovery", 
        "Improved sleep quality",
        "Better skin and hair health",
        "Increased bone density"
      ],
      sideEffects: [
        "Water retention",
        "Increased appetite",
        "Fatigue in some users",
        "Possible blood sugar elevation"
      ],
      history: "Developed by Reverse Pharmacology for treating growth hormone deficiency and muscle wasting conditions.",
      howItWorks: "Mimics ghrelin to stimulate growth hormone release from the pituitary gland.",
      safety: "Generally well-tolerated with proper dosing. Monitor blood glucose levels during use.",
      cycle: "8-12 weeks, 10-25mg daily. Can be run longer than traditional SARMs.",
      expectations: "Users typically see improved recovery within 1-2 weeks, with muscle growth effects becoming apparent after 4-6 weeks."
    },
    ratings: {
      effectiveness: 4.5,
      sideEffects: 4.0,
      value: 4.8
    }
  },
  {
    id: "ostarine",
    name: "Ostarine (MK-2866)",
    price: 59.99,
    originalPrice: 89.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Selective androgen receptor modulator for lean muscle gains",
    categories: ["sarms", "muscleGrowth", "fatLoss"],
    details: {
      research: "Ostarine is one of the most researched SARMs, originally developed for treating muscle wasting and osteoporosis.",
      effectsOnWomen: "Well-tolerated by women at lower doses. Minimal virilization risk with proper dosing.",
      benefits: [
        "Lean muscle growth",
        "Fat loss while preserving muscle",
        "Improved bone density",
        "Enhanced recovery",
        "Minimal side effects"
      ],
      sideEffects: [
        "Mild testosterone suppression",
        "Possible hair thinning",
        "Slight mood changes"
      ],
      history: "Developed by GTx Inc. for treating muscle wasting diseases and has undergone multiple clinical trials.",
      howItWorks: "Selectively binds to androgen receptors in muscle and bone tissue.",
      safety: "One of the safest SARMs available. PCT may be needed for cycles over 6 weeks.",
      cycle: "6-8 weeks, 10-25mg daily for men, 5-10mg for women.",
      expectations: "Noticeable strength gains within 2 weeks, visible muscle growth by week 4-6."
    },
    ratings: {
      effectiveness: 4.3,
      sideEffects: 4.7,
      value: 4.5
    }
  },
  {
    id: "cardarine",
    name: "Cardarine (GW-501516)",
    price: 69.99,
    originalPrice: 99.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "PPAR delta agonist for enhanced endurance and fat burning",
    categories: ["fatLoss", "recovery"],
    details: {
      research: "Cardarine is a PPAR delta receptor agonist that was initially developed for treating metabolic disorders.",
      effectsOnWomen: "Excellent choice for women due to no androgenic effects. Safe and effective for fat loss.",
      benefits: [
        "Dramatic endurance increase",
        "Accelerated fat burning",
        "Improved recovery",
        "Better lipid profile",
        "No androgenic side effects"
      ],
      sideEffects: [
        "Very minimal side effects",
        "Possible slight nausea initially"
      ],
      history: "Originally developed by Ligand Pharmaceuticals and GlaxoSmithKline for metabolic diseases.",
      howItWorks: "Activates PPAR delta receptors to increase fat oxidation and improve endurance.",
      safety: "Very safe with no suppression. Can be used by both men and women.",
      cycle: "8-12 weeks, 10-20mg daily. Can be stacked with other compounds.",
      expectations: "Endurance improvements within days, fat loss effects noticeable within 2-3 weeks."
    },
    ratings: {
      effectiveness: 4.6,
      sideEffects: 4.9,
      value: 4.4
    }
  },
  {
    id: "ligandrol",
    name: "Ligandrol (LGD-4033)",
    price: 64.99,
    originalPrice: 94.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Powerful SARM for serious muscle and strength gains",
    categories: ["sarms", "muscleGrowth"],
    details: {
      research: "LGD-4033 is one of the most potent SARMs for muscle growth, developed by Ligand Pharmaceuticals.",
      effectsOnWomen: "Potent compound - women should use very low doses (2.5-5mg) due to strong effects.",
      benefits: [
        "Rapid muscle growth",
        "Significant strength gains",
        "Improved bone density",
        "Enhanced recovery",
        "Dry, lean gains"
      ],
      sideEffects: [
        "Testosterone suppression",
        "Possible hair thinning",
        "Mild water retention",
        "Mood changes"
      ],
      history: "Developed for treating muscle wasting and osteoporosis. Highly researched compound.",
      howItWorks: "Highly selective binding to androgen receptors in muscle and bone tissue.",
      safety: "Requires PCT for cycles over 6 weeks. Monitor liver values.",
      cycle: "6-8 weeks, 5-10mg daily for men, 2.5-5mg for women.",
      expectations: "Strength gains within 1 week, visible muscle growth by week 3-4."
    },
    ratings: {
      effectiveness: 4.7,
      sideEffects: 3.8,
      value: 4.3
    }
  },
  {
    id: "rad140",
    name: "RAD-140 (Testolone)",
    price: 74.99,
    originalPrice: 109.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Most potent SARM for extreme muscle growth and strength",
    categories: ["sarms", "muscleGrowth", "testosteroneSupport"],
    details: {
      research: "RAD-140 is considered the most anabolic SARM available, developed by Radius Health.",
      effectsOnWomen: "Not recommended for women due to high potency and virilization risk.",
      benefits: [
        "Extreme muscle growth",
        "Massive strength gains",
        "Enhanced aggression/drive",
        "Improved bone density",
        "Neuroprotective effects"
      ],
      sideEffects: [
        "Significant testosterone suppression",
        "Possible hair loss",
        "Aggression increase",
        "Liver stress"
      ],
      history: "Developed as a testosterone replacement therapy alternative with fewer side effects.",
      howItWorks: "Highly selective androgen receptor modulator with strong anabolic effects.",
      safety: "PCT required. Regular blood work recommended. Not for beginners.",
      cycle: "8 weeks maximum, 10-20mg daily. Advanced users only.",
      expectations: "Rapid strength gains within days, significant muscle growth by week 2-3."
    },
    ratings: {
      effectiveness: 4.9,
      sideEffects: 3.2,
      value: 4.1
    }
  },
  {
    id: "sr9009",
    name: "SR-9009 (Stenabolic)",
    price: 54.99,
    originalPrice: 84.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Rev-erb agonist for enhanced metabolism and endurance",
    categories: ["fatLoss", "recovery"],
    details: {
      research: "SR-9009 is a Rev-erb agonist that regulates circadian rhythms and metabolism.",
      effectsOnWomen: "Excellent for women with no androgenic effects. Great for fat loss and endurance.",
      benefits: [
        "Increased metabolism",
        "Enhanced fat burning",
        "Improved endurance",
        "Better sleep quality",
        "Reduced inflammation"
      ],
      sideEffects: [
        "Minimal side effects",
        "Possible initial insomnia",
        "Rare digestive issues"
      ],
      history: "Developed by Professor Thomas Burris at Scripps Research Institute.",
      howItWorks: "Activates Rev-erb proteins to enhance metabolism and fat oxidation.",
      safety: "Very safe with no hormonal suppression. Suitable for both men and women.",
      cycle: "8-12 weeks, 20-30mg daily split into multiple doses.",
      expectations: "Immediate endurance boost, fat loss visible within 2-3 weeks."
    },
    ratings: {
      effectiveness: 4.2,
      sideEffects: 4.8,
      value: 4.0
    }
  },
  {
    id: "yk11",
    name: "YK-11",
    price: 79.99,
    originalPrice: 114.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Myostatin inhibitor for breakthrough muscle growth",
    categories: ["sarms", "muscleGrowth"],
    details: {
      research: "YK-11 is a unique compound that acts as both a SARM and myostatin inhibitor.",
      effectsOnWomen: "Not recommended for women due to DHT-like properties and virilization risk.",
      benefits: [
        "Myostatin inhibition",
        "Extreme muscle growth",
        "Increased follistatin",
        "Enhanced strength",
        "Improved muscle hardness"
      ],
      sideEffects: [
        "Testosterone suppression",
        "Possible liver stress",
        "Hair loss risk",
        "Aggressive behavior"
      ],
      history: "Discovered in 2011, unique mechanism makes it different from traditional SARMs.",
      howItWorks: "Inhibits myostatin while activating androgen receptors, allowing for greater muscle growth.",
      safety: "Requires PCT and liver support. Advanced users only.",
      cycle: "6-8 weeks, 5-10mg daily. Should not exceed 8 weeks.",
      expectations: "Rapid muscle hardening within 1-2 weeks, significant growth by week 4."
    },
    ratings: {
      effectiveness: 4.8,
      sideEffects: 3.0,
      value: 3.8
    }
  },
  {
    id: "s4",
    name: "S-4 (Andarine)",
    price: 49.99,
    originalPrice: 79.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Versatile SARM for cutting and lean muscle gains",
    categories: ["sarms", "fatLoss", "muscleGrowth"],
    details: {
      research: "S-4 was developed by GTx Inc. for treating muscle wasting and osteoporosis.",
      effectsOnWomen: "Suitable for women at lower doses (12.5-25mg). Monitor for virilization.",
      benefits: [
        "Lean muscle gains",
        "Fat loss while preserving muscle",
        "Increased vascularity",
        "Enhanced strength",
        "Improved bone density"
      ],
      sideEffects: [
        "Vision changes (yellow tint)",
        "Night vision issues",
        "Mild suppression",
        "Possible hair thinning"
      ],
      history: "One of the earlier SARMs developed, extensively studied for muscle wasting conditions.",
      howItWorks: "Selective androgen receptor binding with strong affinity for muscle and bone.",
      safety: "Monitor vision changes. PCT recommended for longer cycles.",
      cycle: "6-8 weeks, 25-50mg daily. 5 days on, 2 days off protocol recommended.",
      expectations: "Muscle hardening within 2 weeks, fat loss and strength gains by week 4."
    },
    ratings: {
      effectiveness: 4.1,
      sideEffects: 3.5,
      value: 4.2
    }
  }
];
