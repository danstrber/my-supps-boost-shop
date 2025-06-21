
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categories: string[];
  description: string | { en: string; es: string };
  labTestFile?: string;
  featured?: boolean;
  inStock?: boolean;
  specifications?: {
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
  benefits?: { en: string; es: string };
  sideEffects?: { en: string; es: string };
  effectsOnWomen?: { en: string; es: string };
  safetyInformation?: { en: string; es: string };
  howItWorks?: { en: string; es: string };
  whatToExpected?: { en: string; es: string };
  researchBackground?: { en: string; es: string };
  cycleInformation?: { en: string; es: string };
  performanceRatings?: {
    muscleGain: number;
    strength: number;
    fatLoss: number;
    sideEffects: number;
    retention: number;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Clenbuterol',
    price: 45,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    categories: ['fat-loss'],
    description: {
      en: 'Powerful fat burning compound that increases metabolic rate and preserves lean muscle mass during cutting cycles.',
      es: 'Compuesto potente para quemar grasa que aumenta la tasa metabólica y preserva la masa muscular magra durante los ciclos de definición.'
    },
    labTestFile: '/lab-test-clen.pdf',
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '100',
        typicalCycleLength: '2 weeks on/off',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '100',
        typicalCycleLength: '2 semanas sí/no',
        potencyLevel: 'Alto'
      }
    }
  },
  {
    id: '2',
    name: 'Testosterone Enanthate',
    price: 60,
    image: '/lovable-uploads/testosterone-enanthate.png',
    categories: ['muscle-gain'],
    description: {
      en: 'Popular anabolic steroid for muscle growth and strength.',
      es: 'Esteroide anabólico popular para el crecimiento muscular y la fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '250mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '12-16 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '250mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '12-16 semanas',
        potencyLevel: 'Alto'
      }
    }
  },
  {
    id: '3',
    name: 'Anavar',
    price: 55,
    image: '/lovable-uploads/anavar.png',
    categories: ['fat-loss', 'muscle-gain'],
    description: {
      en: 'Mild anabolic steroid used for cutting and lean muscle gains.',
      es: 'Esteroide anabólico suave usado para definición y ganancias de músculo magro.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Moderado'
      }
    }
  },
  {
    id: '4',
    name: 'Trenbolone Acetate',
    price: 70,
    image: '/lovable-uploads/trenbolone-acetate.png',
    categories: ['muscle-gain'],
    description: {
      en: 'Powerful anabolic steroid for rapid muscle growth.',
      es: 'Esteroide anabólico potente para crecimiento muscular rápido.'
    },
    specifications: {
      en: {
        dosePerCapsule: '75mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '8-10 weeks',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '75mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '8-10 semanas',
        potencyLevel: 'Muy Alto'
      }
    }
  },
  {
    id: '5',
    name: 'Winstrol',
    price: 50,
    image: '/lovable-uploads/winstrol.png',
    categories: ['fat-loss'],
    description: {
      en: 'Anabolic steroid used for cutting and enhancing athletic performance.',
      es: 'Esteroide anabólico usado para definición y mejorar el rendimiento atlético.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Moderado'
      }
    }
  },
  {
    id: '6',
    name: 'Deca Durabolin',
    price: 65,
    image: '/lovable-uploads/deca-durabolin.png',
    categories: ['muscle-gain'],
    description: {
      en: 'Popular steroid for muscle mass and joint relief.',
      es: 'Esteroide popular para masa muscular y alivio articular.'
    },
    specifications: {
      en: {
        dosePerCapsule: '200mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '12-16 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '200mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '12-16 semanas',
        potencyLevel: 'Alto'
      }
    }
  },
  {
    id: '7',
    name: 'Primobolan',
    price: 60,
    image: '/lovable-uploads/primobolan.png',
    categories: ['muscle-gain', 'fat-loss'],
    description: {
      en: 'Mild anabolic steroid for lean muscle gains.',
      es: 'Esteroide anabólico suave para ganancias de músculo magro.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Moderado'
      }
    }
  },
  {
    id: '8',
    name: 'Dianabol',
    price: 55,
    image: '/lovable-uploads/dianabol.png',
    categories: ['muscle-gain'],
    description: {
      en: 'Fast-acting oral steroid for muscle mass and strength.',
      es: 'Esteroide oral de acción rápida para masa muscular y fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Alto'
      }
    }
  },
  {
    id: '9',
    name: 'HGH',
    price: 120,
    image: '/lovable-uploads/hgh.png',
    categories: ['muscle-gain', 'fat-loss'],
    description: {
      en: 'Human Growth Hormone for recovery and fat loss.',
      es: 'Hormona de Crecimiento Humano para recuperación y pérdida de grasa.'
    },
    specifications: {
      en: {
        dosePerCapsule: '2IU',
        capsulesPerBottle: '100',
        typicalCycleLength: '3-6 months',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '2IU',
        capsulesPerBottle: '100',
        typicalCycleLength: '3-6 meses',
        potencyLevel: 'Muy Alto'
      }
    }
  },
  {
    id: '10',
    name: 'Clomid',
    price: 40,
    image: '/lovable-uploads/clomid.png',
    categories: ['post-cycle'],
    description: {
      en: 'Post cycle therapy drug to restore natural testosterone production.',
      es: 'Medicamento de terapia post-ciclo para restaurar la producción natural de testosterona.'
    },
    specifications: {
      en: {
        dosePerCapsule: '50mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '4 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '50mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '4 semanas',
        potencyLevel: 'Moderado'
      }
    }
  },
  {
    id: '11',
    name: 'Accutane',
    price: 35,
    image: '/lovable-uploads/accutane.png',
    categories: ['skincare'],
    description: {
      en: 'Powerful acne treatment for severe and persistent acne.',
      es: 'Tratamiento potente para el acné severo y persistente.'
    },
    specifications: {
      en: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '4-6 months',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '4-6 meses',
        potencyLevel: 'Alto'
      }
    }
  }
];
