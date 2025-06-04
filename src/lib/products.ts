
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
}

export const products: Product[] = [
  {
    id: "mk677",
    name: "MK-677 (Ibutamoren)",
    price: 50.00,
    categories: ["muscleGrowth", "recovery"],
    description: "Growth hormone secretagogue for enhanced muscle growth and recovery. 10mg pills, 50 count.",
    image: "photos/mk677bottle.png",
    inStock: true,
    featured: true
  },
  {
    id: "rad140",
    name: "RAD-140 (Testolone)",
    price: 49.99,
    categories: ["sarms", "muscleGrowth"],
    description: "Selective androgen receptor modulator for lean muscle gains. 10mg capsules, 50 count.",
    image: "photos/rad140bottle.png",
    inStock: true,
    featured: true
  },
  {
    id: "superdrol",
    name: "Superdrol",
    price: 35.00,
    categories: ["muscleGrowth", "testosteroneSupport"],
    description: "Powerful prohormone for significant muscle and strength gains. 10mg capsules, 20 count.",
    image: "photos/superdrolbottle.png",
    inStock: true,
    labTestFile: "photos/Test_Report_43554.png"
  },
  {
    id: "enclomiphene",
    name: "Enclomiphene Citrate",
    price: 25.00,
    categories: ["pctAi", "testosteroneSupport"],
    description: "SERM for post cycle therapy and testosterone support. 12.5mg capsules, 50 count.",
    image: "photos/enclobox.png",
    inStock: true
  },
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    price: 35.00,
    categories: ["fatLoss"],
    description: "Beta-2 agonist for enhanced fat loss and metabolism. 40mcg tablets, 50 count.",
    image: "photos/clenbottle.png",
    inStock: true,
    labTestFile: "photos/test_report_41538.png"
  },
  {
    id: "aromasin",
    name: "Aromasin (Exemestane)",
    price: 25.00,
    categories: ["pctAi"],
    description: "Aromatase inhibitor for estrogen control. 25mg pills, 10 count.",
    image: "photos/aromasinbox.png",
    inStock: true
  }
];
