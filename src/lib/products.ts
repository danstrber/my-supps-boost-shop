export interface Product {
  id: string;
  name: string;
  price: number;
  categories: string[];
  description: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
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
    id: "mk677",
    name: "MK-677 (Ibutamoren)",
    price: 49.99,
    categories: ["muscle growth", "recovery"],
    description: "Growth hormone secretagogue for enhanced muscle growth and recovery. 50 pills @ 10mg.",
    image: "photos/mk677bottle.png",
    inStock: true,
    featured: true,
    details: {
      research: "MK-677 is researched for its growth hormone releasing properties.",
      effectsOnWomen: "Effective for muscle growth and recovery, possible water retention.",
      benefits: "Increases IGF-1 levels, improves sleep quality, enhances recovery.",
      sideEffects: "Water retention, increased appetite, possible joint pain.",
      history: "Developed by Reverse Pharmacology for treating growth hormone deficiency.",
      howItWorks: "Mimics ghrelin to stimulate growth hormone release from the pituitary gland.",
      safety: "Research compound only; long-term effects unknown.",
      cycle: "8-16 weeks at 10-25mg daily, preferably before bed.",
      expectations: "Improved recovery and sleep within 1-2 weeks, muscle gains over 8+ weeks.",
      ratings: {
        "Muscle Growth": 4,
        "Recovery": 5,
        "Safety": 3
      }
    }
  },
  {
    id: "rad140",
    name: "RAD-140 (Testolone)",
    price: 49.99,
    categories: ["sarms", "muscle growth"],
    description: "Selective androgen receptor modulator for lean muscle gains. 50 caps @ 10mg.",
    image: "photos/rad140bottle.png",
    inStock: true,
    featured: true,
    details: {
      research: "RAD-140 is researched for its selective androgen receptor modulation.",
      effectsOnWomen: "Effective for lean muscle gains, risk of virilization at higher doses.",
      benefits: "Promotes lean muscle mass, increases strength, minimal water retention.",
      sideEffects: "Testosterone suppression, possible hair loss, liver strain.",
      history: "Developed by Radius Health for treating muscle wasting and breast cancer.",
      howItWorks: "Selectively binds to androgen receptors in muscle and bone tissue.",
      safety: "Research compound only; requires PCT after cycle.",
      cycle: "8-12 weeks at 10-20mg daily with proper PCT.",
      expectations: "Strength gains within 2-3 weeks, lean muscle gains over 6-8 weeks.",
      ratings: {
        "Muscle Growth": 5,
        "Strength": 5,
        "Safety": 2
      }
    }
  },
  {
    id: "superdrol",
    name: "Superdrol",
    price: 35.00,
    categories: ["muscle growth", "testosterone support"],
    description: "Powerful prohormone for significant muscle and strength gains. 20 caps @ 10mg.",
    image: "photos/superdrolbottle.png",
    inStock: true,
    labTestFile: "photos/Test_Report_43554.png",
    details: {
      research: "Superdrol is researched for its potent anabolic properties.",
      effectsOnWomen: "Not recommended for women due to high virilization risk.",
      benefits: "Rapid muscle and strength gains, increased protein synthesis.",
      sideEffects: "Liver toxicity, blood pressure elevation, cholesterol issues.",
      history: "Originally marketed as a dietary supplement before being banned.",
      howItWorks: "Acts as a potent androgen receptor agonist without aromatization.",
      safety: "Hepatotoxic compound; liver support and monitoring essential.",
      cycle: "4-6 weeks at 10-20mg daily with extensive liver support.",
      expectations: "Significant strength gains within 1 week, muscle gains throughout cycle.",
      ratings: {
        "Muscle Growth": 5,
        "Strength": 5,
        "Safety": 1
      }
    }
  },
  {
    id: "enclomiphene",
    name: "Enclomiphene Citrate",
    price: 25.00,
    categories: ["pct ai", "testosterone support"],
    description: "SERM for post cycle therapy and testosterone support. 50 caps @ 12.5mg.",
    image: "photos/enclobox.png",
    inStock: true,
    details: {
      research: "Enclomiphene is researched for its selective estrogen receptor modulation.",
      effectsOnWomen: "May affect estrogen levels; consultation recommended.",
      benefits: "Restores natural testosterone, blocks estrogen receptors, minimal side effects.",
      sideEffects: "Possible mood changes, visual disturbances (rare), hot flashes.",
      history: "Developed as the active isomer of clomiphene for male hypogonadism.",
      howItWorks: "Blocks estrogen receptors in hypothalamus, stimulating LH and FSH release.",
      safety: "Generally well-tolerated; regular blood work recommended.",
      cycle: "4-6 weeks at 12.5-25mg daily for PCT or TRT alternative.",
      expectations: "Testosterone recovery within 2-4 weeks of consistent use.",
      ratings: {
        "Testosterone Support": 4,
        "PCT": 5,
        "Safety": 4
      }
    }
  },
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    price: 35.00,
    categories: ["fat loss"],
    description: "Beta-2 agonist for enhanced fat loss and metabolism. 50 tabs @ 40mcg.",
    image: "photos/clenbottle.png",
    inStock: true,
    labTestFile: "photos/test_report_41538.png",
    details: {
      research: "Clenbuterol is researched for its thermogenic properties.",
      effectsOnWomen: "Effective for fat loss, possible tremors.",
      benefits: "Promotes fat loss, preserves lean muscle.",
      sideEffects: "Tremors, increased heart rate.",
      history: "Developed for asthma treatment, later studied for fat loss.",
      howItWorks: "Stimulates beta-2 receptors to increase metabolism.",
      safety: "Not approved for human use; cardiac risks.",
      cycle: "2 weeks on, 2 weeks off at 20-80mcg daily.",
      expectations: "Fat loss visible within 1-2 weeks.",
      ratings: {
        "Fat Loss": 4,
        "Energy": 3,
        "Safety": 2
      }
    }
  },
  {
    id: "aromasin",
    name: "Aromasin (Exemestane)",
    price: 25.00,
    categories: ["pct ai"],
    description: "Aromatase inhibitor for estrogen control. 10 pills @ 25mg.",
    image: "photos/aromasinbox.png",
    inStock: true,
    details: {
      research: "Aromasin is researched for its aromatase inhibition properties.",
      effectsOnWomen: "Not recommended; can severely reduce estrogen levels.",
      benefits: "Controls estrogen levels, prevents gynecomastia, reduces water retention.",
      sideEffects: "Joint pain, reduced bone density, mood changes.",
      history: "Originally developed for breast cancer treatment in postmenopausal women.",
      howItWorks: "Irreversibly binds to aromatase enzyme, preventing estrogen synthesis.",
      safety: "Requires careful dosing; can crash estrogen levels if overused.",
      cycle: "12.5-25mg every other day during aromatizing compound cycles.",
      expectations: "Estrogen control within 3-5 days, reduced water retention.",
      ratings: {
        "Estrogen Control": 5,
        "PCT": 4,
        "Safety": 3
      }
    }
  }
];
