
export interface Product {
  id: string;
  name: string;
  price: number;
  categories: string[];
  description: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "mk677",
    name: "MK-677 (Ibutamoren)",
    price: 89.99,
    categories: ["muscleGrowth", "recovery"],
    description: "Growth hormone secretagogue for enhanced muscle growth and recovery. 25mg capsules, 30 count.",
    image: "/placeholder.svg",
    inStock: true,
    featured: true
  },
  {
    id: "rad140",
    name: "RAD-140 (Testolone)",
    price: 79.99,
    categories: ["sarms", "muscleGrowth"],
    description: "Selective androgen receptor modulator for lean muscle gains. 10mg capsules, 30 count.",
    image: "/placeholder.svg",
    inStock: true,
    featured: true
  },
  {
    id: "superdrol",
    name: "Superdrol",
    price: 69.99,
    categories: ["muscleGrowth", "testosteroneSupport"],
    description: "Powerful prohormone for significant muscle and strength gains. 10mg capsules, 30 count.",
    image: "/placeholder.svg",
    inStock: true
  },
  {
    id: "enclomiphene",
    name: "Enclomiphene Citrate",
    price: 59.99,
    categories: ["pctAi", "testosteroneSupport"],
    description: "SERM for post cycle therapy and testosterone support. 25mg capsules, 30 count.",
    image: "/placeholder.svg",
    inStock: true
  },
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    price: 49.99,
    categories: ["fatLoss"],
    description: "Beta-2 agonist for enhanced fat loss and metabolism. 40mcg tablets, 50 count.",
    image: "/placeholder.svg",
    inStock: true
  },
  {
    id: "aromasin",
    name: "Aromasin (Exemestane)",
    price: 54.99,
    categories: ["pctAi"],
    description: "Aromatase inhibitor for estrogen control. 25mg capsules, 30 count.",
    image: "/placeholder.svg",
    inStock: true
  }
];
