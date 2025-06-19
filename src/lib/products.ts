export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: {
    en: string;
    es: string;
  };
  ingredients: string;
  dosage: string;
  capsules: number;
  featured?: boolean;
  labTestFile?: string;
  inStock?: boolean;
  categories: string[];
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
}

export const products: Product[] = [
  {
    id: 'enclo',
    name: 'Enclomiphene',
    price: 40.00,
    image: '/lovable-uploads/80ca5b8b-5b25-4266-a8fe-acffb838a696.png',
    description: {
      en: 'Premium Enclomiphene for natural testosterone support and PCT.',
      es: 'Enclomifeno premium para soporte natural de testosterona y PCT.'
    },
    ingredients: 'Enclomiphene Citrate 25mg per capsule',
    dosage: '25mg daily',
    capsules: 25,
    featured: true,
    labTestFile: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    inStock: true,
    categories: ['pct', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '25 capsules',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '25 cápsulas',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Enclomiphene is a selective estrogen receptor modulator that helps restore natural testosterone production.',
      es: 'El enclomifeno es un modulador selectivo de receptores de estrógeno que ayuda a restaurar la producción natural de testosterona.'
    },
    benefits: {
      en: 'Supports natural testosterone production, improves libido, and helps with post-cycle recovery.',
      es: 'Apoya la producción natural de testosterona, mejora la libido y ayuda con la recuperación post-ciclo.'
    },
    sideEffects: {
      en: 'Mild side effects may include mood changes and hot flashes.',
      es: 'Los efectos secundarios leves pueden incluir cambios de humor y sofocos.'
    },
    effectsOnWomen: {
      en: 'May be used for fertility support in women under medical supervision.',
      es: 'Puede usarse para apoyo de fertilidad en mujeres bajo supervisión médica.'
    },
    howItWorks: {
      en: 'Blocks estrogen receptors in the brain, stimulating natural testosterone production.',
      es: 'Bloquea los receptores de estrógeno en el cerebro, estimulando la producción natural de testosterona.'
    },
    safetyInformation: {
      en: 'Monitor hormone levels during use. Consult healthcare provider if pregnant or nursing.',
      es: 'Monitorear niveles hormonales durante el uso. Consultar proveedor de salud si está embarazada o amamantando.'
    },
    cycleInformation: {
      en: 'Typically used for 4-6 weeks as part of PCT protocol.',
      es: 'Típicamente usado por 4-6 semanas como parte del protocolo PCT.'
    },
    whatToExpect: {
      en: 'Gradual improvement in energy, mood, and libido as natural testosterone levels recover.',
      es: 'Mejora gradual en energía, estado de ánimo y libido mientras se recuperan los niveles naturales de testosterona.'
    },
    performanceRatings: {
      muscleGain: 2,
      strength: 2,
      fatLoss: 1,
      sideEffects: 1,
      retention: 4
    }
  },
  {
    id: 'rad140',
    name: 'RAD-140 (Testolone)',
    price: 55.00,
    image: '/lovable-uploads/6bf00b32-1fdf-426e-af4b-4eae2b29157c.png',
    description: {
      en: 'Powerful RAD-140 SARM for lean muscle gains and strength.',
      es: 'Potente SARM RAD-140 para ganancias de músculo magro y fuerza.'
    },
    ingredients: 'RAD-140 (Testolone) 10mg per capsule',
    dosage: '10-20mg daily',
    capsules: 50,
    featured: true,
    labTestFile: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    inStock: true,
    categories: ['sarms', 'bulking', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50 capsules',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50 cápsulas',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'RAD-140 is a selective androgen receptor modulator developed for muscle wasting conditions.',
      es: 'RAD-140 es un modulador selectivo de receptores androgénicos desarrollado para condiciones de desgaste muscular.'
    },
    benefits: {
      en: 'Increases lean muscle mass, strength, and endurance with minimal side effects.',
      es: 'Aumenta la masa muscular magra, fuerza y resistencia con efectos secundarios mínimos.'
    },
    sideEffects: {
      en: 'May cause mild testosterone suppression and fatigue.',
      es: 'Puede causar supresión leve de testosterona y fatiga.'
    },
    effectsOnWomen: {
      en: 'Generally well-tolerated by women at lower doses.',
      es: 'Generalmente bien tolerado por mujeres en dosis bajas.'
    },
    howItWorks: {
      en: 'Selectively binds to androgen receptors in muscle and bone tissue.',
      es: 'Se une selectivamente a receptores androgénicos en tejido muscular y óseo.'
    },
    safetyInformation: {
      en: 'Monitor liver enzymes and testosterone levels. PCT recommended.',
      es: 'Monitorear enzimas hepáticas y niveles de testosterona. PCT recomendado.'
    },
    cycleInformation: {
      en: 'Typically used for 8-12 weeks followed by PCT.',
      es: 'Típicamente usado por 8-12 semanas seguido de PCT.'
    },
    whatToExpect: {
      en: 'Significant muscle gains, increased strength, and improved recovery.',
      es: 'Ganancias musculares significativas, aumento de fuerza y mejor recuperación.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 3,
      sideEffects: 2,
      retention: 4
    }
  },
  {
    id: 'mk677',
    name: 'MK-677 (Ibutamoren)',
    price: 40.00,
    image: '/lovable-uploads/3a5b35d3-8bfd-47ec-acb5-94ef2faf5e92.png',
    description: {
      en: 'Premium MK-677 for enhanced growth hormone and recovery.',
      es: 'MK-677 premium para hormona de crecimiento mejorada y recuperación.'
    },
    ingredients: 'MK-677 (Ibutamoren) 10mg per capsule',
    dosage: '10-25mg daily',
    capsules: 50,
    featured: true,
    labTestFile: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    inStock: true,
    categories: ['sarms', 'recovery', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50 capsules',
        typicalCycleLength: '12-24 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50 cápsulas',
        typicalCycleLength: '12-24 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'MK-677 is a growth hormone secretagogue that increases IGF-1 and growth hormone levels.',
      es: 'MK-677 es un secretagogo de hormona de crecimiento que aumenta los niveles de IGF-1 y hormona de crecimiento.'
    },
    benefits: {
      en: 'Improves sleep quality, recovery, muscle growth, and bone density.',
      es: 'Mejora la calidad del sueño, recuperación, crecimiento muscular y densidad ósea.'
    },
    sideEffects: {
      en: 'May cause increased appetite, water retention, and drowsiness.',
      es: 'Puede causar aumento del apetito, retención de agua y somnolencia.'
    },
    effectsOnWomen: {
      en: 'Safe for women with no virilization risk.',
      es: 'Seguro para mujeres sin riesgo de virilización.'
    },
    howItWorks: {
      en: 'Mimics ghrelin to stimulate growth hormone release from the pituitary gland.',
      es: 'Imita la grelina para estimular la liberación de hormona de crecimiento de la glándula pituitaria.'
    },
    safetyInformation: {
      en: 'Monitor blood glucose levels. Take before bed to minimize side effects.',
      es: 'Monitorear niveles de glucosa en sangre. Tomar antes de dormir para minimizar efectos secundarios.'
    },
    cycleInformation: {
      en: 'Can be used for extended periods of 12-24 weeks.',
      es: 'Puede usarse por períodos extendidos de 12-24 semanas.'
    },
    whatToExpect: {
      en: 'Better sleep, improved recovery, gradual muscle gains, and increased appetite.',
      es: 'Mejor sueño, recuperación mejorada, ganancias musculares graduales y aumento del apetito.'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 2,
      sideEffects: 2,
      retention: 5
    }
  },
  {
    id: 'aromasin',
    name: 'Aromasin',
    price: 25.00,
    image: '/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png',
    description: {
      en: 'Essential Aromasin (Exemestane) for estrogen control during cycles.',
      es: 'Aromasin esencial (Exemestano) para control de estrógenos durante ciclos.'
    },
    ingredients: 'Exemestane 25mg per capsule',
    dosage: '12.5-25mg daily',
    capsules: 10,
    inStock: true,
    categories: ['aromatase-inhibitor', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10 capsules',
        typicalCycleLength: 'Throughout cycle',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10 cápsulas',
        typicalCycleLength: 'Durante todo el ciclo',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'Exemestane is a steroidal aromatase inhibitor used to reduce estrogen levels.',
      es: 'El exemestano es un inhibidor esteroidal de aromatasa usado para reducir niveles de estrógeno.'
    },
    benefits: {
      en: 'Prevents estrogen-related side effects such as gynecomastia and water retention.',
      es: 'Previene efectos secundarios relacionados con estrógeno como ginecomastia y retención de agua.'
    },
    sideEffects: {
      en: 'Possible joint pain, fatigue, and hormonal imbalances.',
      es: 'Posible dolor articular, fatiga y desequilibrios hormonales.'
    },
    effectsOnWomen: {
      en: 'Used in postmenopausal women for breast cancer treatment.',
      es: 'Usado en mujeres posmenopáusicas para tratamiento de cáncer de mama.'
    },
    howItWorks: {
      en: 'Irreversibly binds to aromatase enzyme, reducing estrogen synthesis.',
      es: 'Se une irreversiblemente a la enzima aromatasa, reduciendo la síntesis de estrógeno.'
    },
    safetyInformation: {
      en: 'Monitor bone density and hormone levels during use.',
      es: 'Monitorear densidad ósea y niveles hormonales durante el uso.'
    },
    cycleInformation: {
      en: 'Used throughout anabolic steroid cycles to control estrogen.',
      es: 'Usado durante ciclos de esteroides anabólicos para controlar estrógeno.'
    },
    whatToExpect: {
      en: 'Reduced estrogenic side effects and improved cycle results.',
      es: 'Reducción de efectos secundarios estrogénicos y mejora de resultados del ciclo.'
    },
    performanceRatings: {
      muscleGain: 0,
      strength: 0,
      fatLoss: 0,
      sideEffects: 1,
      retention: 0
    }
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35.00,
    image: '/lovable-uploads/b79007ea-2fd0-4498-b009-8e0d76ac325e.png',
    description: {
      en: 'Effective Clenbuterol for fat burning and improved cardiovascular performance.',
      es: 'Clenbuterol efectivo para quema de grasa y mejora del rendimiento cardiovascular.'
    },
    ingredients: 'Clenbuterol HCl 40mcg per capsule',
    dosage: '20-120mcg daily (pyramid dosing)',
    capsules: 50,
    featured: true,
    labTestFile: '/lovable-uploads/29f98aea-c8d6-4336-ac7d-521df4484c4a.png',
    inStock: true,
    categories: ['cutting', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50 capsules',
        typicalCycleLength: '2-4 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50 cápsulas',
        typicalCycleLength: '2-4 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'Clenbuterol is a bronchodilator with thermogenic properties used for fat loss.',
      es: 'El clenbuterol es un broncodilatador con propiedades termogénicas usado para pérdida de grasa.'
    },
    benefits: {
      en: 'Increases metabolic rate, fat oxidation, and improves aerobic capacity.',
      es: 'Aumenta la tasa metabólica, oxidación de grasas y mejora la capacidad aeróbica.'
    },
    sideEffects: {
      en: 'Possible jitters, increased heart rate, and muscle cramps.',
      es: 'Posibles nerviosismo, aumento de ritmo cardíaco y calambres musculares.'
    },
    effectsOnWomen: {
      en: 'Generally safe when used responsibly.',
      es: 'Generalmente seguro cuando se usa responsablemente.'
    },
    howItWorks: {
      en: 'Stimulates beta-2 adrenergic receptors to increase thermogenesis.',
      es: 'Estimula receptores beta-2 adrenérgicos para aumentar la termogénesis.'
    },
    safetyInformation: {
      en: 'Use in cycles with gradual dose increase; avoid long-term use.',
      es: 'Usar en ciclos con aumento gradual de dosis; evitar uso prolongado.'
    },
    cycleInformation: {
      en: 'Short cycles of 2-4 weeks recommended.',
      es: 'Ciclos cortos de 2-4 semanas recomendados.'
    },
    whatToExpect: {
      en: 'Increased fat loss and improved cardiovascular endurance.',
      es: 'Aumento de pérdida de grasa y mejora de resistencia cardiovascular.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 5,
      sideEffects: 3,
      retention: 1
    }
  },
  {
    id: 'superdrol',
    name: 'Superdrol',
    price: 25.00,
    image: '/lovable-uploads/71d351ff-45d9-4ad9-91bf-1e5572468693.png',
    description: {
      en: 'Powerful Superdrol for rapid muscle gains and strength.',
      es: 'Superdrol potente para ganancias rápidas de músculo y fuerza.'
    },
    ingredients: 'Methasterone 10mg per capsule',
    dosage: '10-20mg daily',
    capsules: 20,
    featured: true,
    labTestFile: '/lovable-uploads/fe9cf414-0d70-446e-8867-3150485e8cc2.png',
    inStock: true,
    categories: ['steroids', 'bulking', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '20 capsules',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '20 cápsulas',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Muy Alto'
      }
    },
    researchBackground: {
      en: 'Superdrol is a potent oral anabolic steroid known for rapid muscle gains.',
      es: 'Superdrol es un esteroide anabólico oral potente conocido por ganancias musculares rápidas.'
    },
    benefits: {
      en: 'Rapid muscle mass increase, strength gains, and improved nitrogen retention.',
      es: 'Aumento rápido de masa muscular, ganancias de fuerza y mejor retención de nitrógeno.'
    },
    sideEffects: {
      en: 'High liver toxicity, blood pressure elevation, and hormonal suppression.',
      es: 'Alta toxicidad hepática, elevación de presión arterial y supresión hormonal.'
    },
    effectsOnWomen: {
      en: 'Not recommended due to high virilization risk.',
      es: 'No recomendado debido al alto riesgo de virilización.'
    },
    howItWorks: {
      en: 'Enhances protein synthesis and nitrogen retention dramatically.',
      es: 'Mejora la síntesis de proteínas y la retención de nitrógeno dramáticamente.'
    },
    safetyInformation: {
      en: 'Requires liver support and regular blood work monitoring.',
      es: 'Requiere soporte hepático y monitoreo regular de análisis de sangre.'
    },
    cycleInformation: {
      en: 'Short cycles of 4-6 weeks maximum due to toxicity.',
      es: 'Ciclos cortos de 4-6 semanas máximo debido a toxicidad.'
    },
    whatToExpected: {
      en: 'Rapid muscle and strength gains with significant side effect potential.',
      es: 'Ganancias rápidas de músculo y fuerza con potencial significativo de efectos secundarios.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 2,
      sideEffects: 5,
      retention: 3
    }
  }
];
