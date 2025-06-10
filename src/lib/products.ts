
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  categories: string[];
  featured?: boolean;
  labTestFile?: string;
  inStock: boolean;
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
    ratings: {
      effectiveness: number;
      safety: number;
      value: number;
    };
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "RAD-140 (Testolone)",
    price: 34.99,
    image: "/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png",
    description: "Selective Androgen Receptor Modulator for lean muscle mass",
    categories: ["sarms", "muscle-growth"],
    featured: true,
    labTestFile: "/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png",
    inStock: true,
    details: {
      research: "RAD-140 is a potent SARM that selectively binds to androgen receptors in muscle and bone tissue, promoting anabolic activity without the side effects typically associated with anabolic steroids.",
      effectsOnWomen: "Women may experience virilization effects at higher doses. Lower doses (5-10mg) are recommended for female users.",
      benefits: [
        "Increased lean muscle mass",
        "Enhanced strength and power",
        "Improved bone density",
        "Fat loss while preserving muscle",
        "No liver toxicity"
      ],
      sideEffects: [
        "Mild testosterone suppression",
        "Potential hair loss in predisposed individuals",
        "Possible mood changes",
        "Temporary reduction in HDL cholesterol"
      ],
      history: "Developed by Radius Health for treating muscle wasting and breast cancer. Currently in Phase III clinical trials.",
      howItWorks: "RAD-140 binds to androgen receptors with high affinity and selectivity, activating anabolic pathways in muscle tissue while minimizing effects on the prostate and other organs.",
      safety: "Generally well-tolerated in clinical studies. Regular blood work recommended to monitor hormone levels and lipid profile.",
      cycle: "Typical cycle: 8-12 weeks at 10-20mg daily. PCT recommended for cycles longer than 8 weeks or doses above 15mg.",
      expectations: "Users typically report noticeable strength gains within 2-3 weeks, with lean muscle mass increases of 5-10 pounds over an 8-week cycle.",
      ratings: {
        effectiveness: 9,
        safety: 8,
        value: 8
      }
    }
  },
  {
    id: "2",
    name: "LGD-4033 (Ligandrol)",
    price: 32.99,
    image: "/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png",
    description: "Powerful SARM for muscle growth and strength gains",
    categories: ["sarms", "muscle-growth"],
    featured: false,
    labTestFile: "/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png",
    inStock: true,
    details: {
      research: "LGD-4033 is one of the most researched SARMs, originally developed for preventing muscle wasting in cancer patients and age-related muscle loss.",
      effectsOnWomen: "Generally well-tolerated by women at doses of 2.5-5mg daily. Higher doses may cause mild virilization.",
      benefits: [
        "Rapid muscle mass gains",
        "Significant strength increases",
        "Enhanced recovery",
        "Improved bone health",
        "Minimal side effects"
      ],
      sideEffects: [
        "Mild to moderate testosterone suppression",
        "Temporary water retention",
        "Possible headaches",
        "Slight decrease in HDL cholesterol"
      ],
      history: "Developed by Ligand Pharmaceuticals and later acquired by Viking Therapeutics. Multiple clinical trials have demonstrated its efficacy and safety profile.",
      howItWorks: "LGD-4033 selectively targets androgen receptors in muscle and bone tissue, promoting protein synthesis and nitrogen retention while avoiding unwanted effects on other organs.",
      safety: "Extensive clinical data shows good safety profile. Regular monitoring of liver enzymes and hormone levels recommended.",
      cycle: "Standard cycle: 6-8 weeks at 5-10mg daily. Longer cycles may require PCT.",
      expectations: "Users typically gain 6-12 pounds of lean muscle mass over an 8-week cycle, with strength increases of 15-30%.",
      ratings: {
        effectiveness: 9,
        safety: 9,
        value: 9
      }
    }
  },
  {
    id: "3",
    name: "MK-677 (Ibutamoren)",
    price: 39.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Growth hormone secretagogue for recovery and anti-aging",
    categories: ["recovery", "muscle-growth"],
    featured: true,
    inStock: true,
    details: {
      research: "MK-677 is a potent, orally active growth hormone secretagogue that mimics the action of ghrelin, stimulating the release of growth hormone and IGF-1.",
      effectsOnWomen: "Well-tolerated by women with no virilization risk. Same dosing as men (12.5-25mg daily).",
      benefits: [
        "Increased growth hormone levels",
        "Enhanced sleep quality",
        "Improved recovery",
        "Anti-aging effects",
        "Increased appetite",
        "Better skin and hair"
      ],
      sideEffects: [
        "Increased appetite",
        "Temporary water retention",
        "Possible drowsiness",
        "Slight increase in blood sugar"
      ],
      history: "Originally developed by Merck for treating growth hormone deficiency and muscle wasting conditions.",
      howItWorks: "MK-677 activates the ghrelin receptor, triggering the release of growth hormone from the pituitary gland, leading to increased IGF-1 levels.",
      safety: "Long-term studies show good safety profile. Monitor blood glucose levels with extended use.",
      cycle: "Can be used long-term (6+ months) at 12.5-25mg daily. Best taken before bed due to potential drowsiness.",
      expectations: "Effects on sleep and recovery noticed within days. Body composition changes become apparent after 2-3 months of consistent use.",
      ratings: {
        effectiveness: 8,
        safety: 9,
        value: 8
      }
    }
  },
  {
    id: "4",
    name: "Ostarine (MK-2866)",
    price: 29.99,
    image: "/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png",
    description: "Mild SARM perfect for beginners and cutting cycles",
    categories: ["sarms", "fat-loss"],
    featured: false,
    labTestFile: "/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png",
    inStock: true,
    details: {
      research: "Ostarine is the most studied SARM with extensive clinical trials demonstrating its ability to increase lean body mass and improve physical function.",
      effectsOnWomen: "Excellent choice for women due to its mild nature. Recommended dose: 6-12.5mg daily.",
      benefits: [
        "Lean muscle preservation during cuts",
        "Moderate muscle gains",
        "Joint healing properties",
        "Minimal side effects",
        "Good for beginners"
      ],
      sideEffects: [
        "Mild testosterone suppression",
        "Rare cases of hair shedding",
        "Possible temporary vision changes"
      ],
      history: "Developed by GTx Inc. for treating muscle wasting and osteoporosis. Most extensively researched SARM.",
      howItWorks: "Ostarine binds to androgen receptors with tissue selectivity, promoting anabolic effects in muscle while having minimal impact on other organs.",
      safety: "Excellent safety profile in clinical studies. Minimal suppression at therapeutic doses.",
      cycle: "Typical cycle: 8-12 weeks at 12.5-25mg daily. PCT usually not required for doses under 20mg.",
      expectations: "Gradual muscle gains of 3-6 pounds over 8 weeks, with excellent muscle preservation during caloric deficits.",
      ratings: {
        effectiveness: 7,
        safety: 10,
        value: 9
      }
    }
  },
  {
    id: "5",
    name: "Cardarine (GW-501516)",
    price: 34.99,
    image: "/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png",
    description: "PPAR delta agonist for endurance and fat loss",
    categories: ["fat-loss", "recovery"],
    featured: false,
    labTestFile: "/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png",
    inStock: true,
    details: {
      research: "Cardarine is a PPAR delta receptor agonist that enhances fatty acid oxidation and glucose metabolism, originally developed for metabolic disorders.",
      effectsOnWomen: "No hormonal effects, making it excellent for women. Same dosing as men (10-20mg daily).",
      benefits: [
        "Dramatic endurance improvements",
        "Enhanced fat oxidation",
        "Better cardiovascular health",
        "No hormonal suppression",
        "Improved recovery"
      ],
      sideEffects: [
        "Rare headaches",
        "Possible mood enhancement",
        "Very few reported side effects"
      ],
      history: "Developed by GlaxoSmithKline for treating dyslipidemia and diabetes. Research discontinued due to cancer concerns in rodent studies at extremely high doses.",
      howItWorks: "Activates PPAR delta receptors, switching the body's energy source preference to fatty acids and improving mitochondrial function.",
      safety: "Good safety profile in human studies. Rodent cancer studies used doses 100x higher than human equivalent doses.",
      cycle: "Typical cycle: 6-8 weeks at 10-20mg daily. Can be used longer due to lack of hormonal effects.",
      expectations: "Noticeable endurance improvements within days. Fat loss becomes apparent after 2-3 weeks of consistent use.",
      ratings: {
        effectiveness: 9,
        safety: 8,
        value: 8
      }
    }
  },
  {
    id: "6",
    name: "Superdrol",
    price: 34.99,
    image: "/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png",
    description: "Powerful prohormone for rapid muscle and strength gains",
    categories: ["muscle-growth", "testosterone-support"],
    featured: false,
    inStock: false,
    details: {
      research: "Superdrol (Methasterone) is a potent oral anabolic steroid that provides rapid muscle and strength gains with minimal estrogenic effects.",
      effectsOnWomen: "Not recommended for women due to high androgenic activity and virilization risk.",
      benefits: [
        "Rapid muscle mass gains",
        "Significant strength increases",
        "Minimal water retention",
        "No estrogenic side effects",
        "Dramatic physique changes"
      ],
      sideEffects: [
        "Liver toxicity",
        "Testosterone suppression",
        "Possible hair loss",
        "Increased blood pressure",
        "Cholesterol changes"
      ],
      history: "Originally developed as Methasterone, later marketed as a dietary supplement under the name Superdrol before being classified as a controlled substance.",
      howItWorks: "Acts as a potent androgen receptor agonist, promoting protein synthesis and nitrogen retention while blocking cortisol receptors.",
      safety: "Requires careful monitoring due to hepatotoxicity. Liver support supplements essential. Not for beginners.",
      cycle: "Short cycles only: 3-4 weeks at 10-20mg daily. Comprehensive PCT required. Regular blood work essential.",
      expectations: "Users report 8-15 pounds of lean muscle gain in 3-4 weeks, with strength increases of 20-40%.",
      ratings: {
        effectiveness: 10,
        safety: 5,
        value: 7
      }
    }
  }
];
