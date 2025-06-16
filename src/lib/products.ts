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

// Define the products array with type Product[]
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
    id: "cardarine",
    name: "Cardarine",
    price: 37.99,
    image: "/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png",
    description: {
      en: "Cardarine enhances endurance and promotes fat loss while preserving muscle mass.",
      es: "Cardarine mejora la resistencia y promueve la pérdida de grasa mientras preserva la masa muscular."
    },
    categories: ["sarms", "fat-loss"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-12 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-12 semanas",
        potencyLevel: "Moderado"
      }
    }
  },
  {
    id: "sr9009",
    name: "SR9009",
    price: 39.99,
    image: "/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png",
    description: {
      en: "SR9009 boosts metabolism and endurance while helping with fat loss.",
      es: "SR9009 aumenta el metabolismo y la resistencia mientras ayuda con la pérdida de grasa."
    },
    categories: ["sarms", "fat-loss"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-10 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-10 semanas",
        potencyLevel: "Moderado"
      }
    }
  },
  {
    id: "mk-677",
    name: "MK-677",
    price: 44.99,
    image: "/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png",
    description: {
      en: "MK-677 promotes growth hormone release for muscle growth and recovery.",
      es: "MK-677 promueve la liberación de hormona de crecimiento para el crecimiento muscular y la recuperación."
    },
    categories: ["sarms", "muscle-growth", "recovery"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-16 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-16 semanas",
        potencyLevel: "Alto"
      }
    }
  },
  {
    id: "yk-11",
    name: "YK-11",
    price: 49.99,
    image: "/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png",
    description: {
      en: "YK-11 is a potent myostatin inhibitor for serious muscle building.",
      es: "YK-11 es un potente inhibidor de miostatina para el desarrollo muscular serio."
    },
    categories: ["sarms", "muscle-growth"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "5mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "6-8 weeks",
        potencyLevel: "Very High"
      },
      es: {
        dosePerCapsule: "5mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "6-8 semanas",
        potencyLevel: "Muy Alto"
      }
    }
  },
  {
    id: "s4-andarine",
    name: "S4 Andarine",
    price: 36.99,
    image: "/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png",
    description: {
      en: "S4 Andarine helps with fat loss while maintaining muscle mass during cuts.",
      es: "S4 Andarine ayuda con la pérdida de grasa mientras mantiene la masa muscular durante las definiciones."
    },
    categories: ["sarms", "fat-loss"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-10 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "8-10 semanas",
        potencyLevel: "Moderado"
      }
    }
  },
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    price: 35.00,
    image: "/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png",
    description: {
      en: "Clenbuterol is a powerful fat burner that helps preserve muscle while cutting.",
      es: "Clenbuterol es un quemador de grasa potente que ayuda a preservar el músculo durante la definición."
    },
    categories: ["fat-loss"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "40mcg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "2-4 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "40mcg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "2-4 semanas",
        potencyLevel: "Alto"
      }
    }
  },
  {
    id: "anavar",
    name: "Anavar",
    price: 65.00,
    image: "/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png",
    description: {
      en: "Anavar is known for lean muscle gains with minimal side effects.",
      es: "Anavar es conocido por las ganancias de músculo magro con efectos secundarios mínimos."
    },
    categories: ["oral-steroids", "muscle-growth"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "6-8 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "6-8 semanas",
        potencyLevel: "Moderado"
      }
    }
  },
  {
    id: "winstrol",
    name: "Winstrol",
    price: 55.00,
    image: "/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png",
    description: {
      en: "Winstrol provides quality muscle gains and strength without water retention.",
      es: "Winstrol proporciona ganancias de músculo de calidad y fuerza sin retención de agua."
    },
    categories: ["oral-steroids", "muscle-growth"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "6-8 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "6-8 semanas",
        potencyLevel: "Alto"
      }
    }
  },
  {
    id: "dianabol",
    name: "Dianabol",
    price: 50.00,
    image: "/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png",
    description: {
      en: "Dianabol delivers rapid muscle mass and strength gains.",
      es: "Dianabol proporciona ganancias rápidas de masa muscular y fuerza."
    },
    categories: ["oral-steroids", "muscle-growth"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "4-6 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "100",
        typicalCycleDuration: "4-6 semanas",
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
  },
  {
    id: "arimidex",
    name: "Arimidex",
    price: 45.00,
    image: "/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png",
    description: {
      en: "Arimidex is an aromatase inhibitor used to control estrogen levels.",
      es: "Arimidex es un inhibidor de aromatasa usado para controlar los niveles de estrógeno."
    },
    categories: ["pct"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "1mg",
        capsulesPerBottle: "50",
        typicalCycleDuration: "As needed",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "1mg",
        capsulesPerBottle: "50",
        typicalCycleDuration: "Según sea necesario",
        potencyLevel: "Alto"
      }
    }
  },
  {
    id: "nolvadex",
    name: "Nolvadex",
    price: 40.00,
    image: "/lovable-uploads/7eaf0b79-d90d-4ac9-a577-b5a57d1272f1.png",
    description: {
      en: "Nolvadex is essential for post-cycle therapy to restore natural hormone production.",
      es: "Nolvadex es esencial para la terapia post-ciclo para restaurar la producción hormonal natural."
    },
    categories: ["pct"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "4-6 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "4-6 semanas",
        potencyLevel: "Moderado"
      }
    }
  },
  {
    id: "clomid",
    name: "Clomid",
    price: 38.00,
    image: "/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png",
    description: {
      en: "Clomid helps restore natural testosterone production after cycles.",
      es: "Clomid ayuda a restaurar la producción natural de testosterona después de los ciclos."
    },
    categories: ["pct"],
    labTested: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "50mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "4-6 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "50mg",
        capsulesPerBottle: "60",
        typicalCycleDuration: "4-6 semanas",
        potencyLevel: "Moderado"
      }
    }
  }
];
