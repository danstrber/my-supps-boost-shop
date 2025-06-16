
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: {
    en: string;
    es: string;
  };
  categories: string[];
  featured?: boolean;
  labTested?: boolean;
  labTestFile?: string;
  inStock?: boolean;
  specifications: {
    en: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      typicalCycleDuration: string;
      potencyLevel: string;
    };
    es: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      typicalCycleDuration: string;
      potencyLevel: string;
    };
  };
  researchBackground?: {
    en: string;
    es: string;
  };
  benefits?: {
    en: string[];
    es: string[];
  };
  sideEffects?: {
    en: string[];
    es: string[];
  };
  effectsOnWomen?: {
    en: string;
    es: string;
  };
  howItWorks?: {
    en: string;
    es: string;
  };
  safetyInformation?: {
    en: string;
    es: string;
  };
  cycleInformation?: {
    en: string;
    es: string;
  };
  whatToExpected?: {
    en: string;
    es: string;
  };
  whatToExpect?: {
    en: string;
    es: string;
  };
  performanceRatings?: {
    anabolic: number;
    androgenic: number;
    hepatotoxicity: number;
    estrogenic: number;
  };
}

// Define the products array with only the original products
export const products: Product[] = [
  {
    id: "rad-140",
    name: "RAD-140",
    price: 39.99,
    image: "/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png",
    description: {
      en: "RAD-140 is one of the most potent SARMs for muscle growth and strength gains.",
      es: "RAD-140 es uno de los SARMs más potentes para el crecimiento muscular y ganancias de fuerza."
    },
    categories: ["sarms", "muscle-growth"],
    featured: true,
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-12 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-12 semanas",
        potencyLevel: "Alto"
      }
    }
  },
  {
    id: "ostarine",
    name: "Ostarine",
    price: 34.99,
    image: "/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png",
    description: {
      en: "Ostarine is perfect for beginners looking to build lean muscle mass with minimal side effects.",
      es: "Ostarine es perfecto para principiantes que buscan desarrollar masa muscular magra con efectos secundarios mínimos."
    },
    categories: ["sarms", "muscle-growth"],
    featured: true,
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-12 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-12 semanas",
        potencyLevel: "Moderado"
      }
    }
  },
  {
    id: "lgd-4033",
    name: "LGD-4033",
    price: 42.99,
    image: "/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png",
    description: {
      en: "LGD-4033 offers impressive muscle growth potential with excellent strength gains.",
      es: "LGD-4033 ofrece un potencial impresionante de crecimiento muscular con excelentes ganancias de fuerza."
    },
    categories: ["sarms", "muscle-growth"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-10 semanas",
        potencyLevel: "Alto"
      }
    }
  },
  {
    id: "superdrol",
    name: "Superdrol",
    price: 70.00,
    image: "/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png",
    description: {
      en: "Superdrol is an extremely potent oral steroid for serious muscle gains.",
      es: "Superdrol es un esteroide oral extremadamente potente para ganancias musculares serias."
    },
    categories: ["oral-steroids", "muscle-growth"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "20",
        typicalCycleDuration: "3-4 weeks",
        potencyLevel: "Very High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "20",
        typicalCycleDuration: "3-4 semanas",
        potencyLevel: "Muy Alto"
      }
    }
  }
];
