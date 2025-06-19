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
    id: 'anavar',
    name: 'Anavar',
    price: 89.99,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    description: {
      en: 'Premium Anavar for lean muscle gains and strength enhancement.',
      es: 'Anavar premium para ganancias de músculo magro y mejora de fuerza.'
    },
    ingredients: 'Oxandrolone 20mg per capsule',
    dosage: '20-40mg daily',
    capsules: 100,
    featured: true,
    labTestFile: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    inStock: true,
    categories: ['cutting', 'beginner-friendly', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '100 capsules',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '100 cápsulas',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Oxandrolone was first synthesized in 1962 and has been extensively studied for its anabolic properties with minimal androgenic effects.',
      es: 'La oxandrolona fue sintetizada por primera vez en 1962 y ha sido ampliamente estudiada por sus propiedades anabólicas con efectos androgénicos mínimos.'
    },
    benefits: {
      en: 'Promotes lean muscle growth, increases strength, enhances fat burning, improves muscle definition.',
      es: 'Promueve el crecimiento de músculo magro, aumenta la fuerza, mejora la quema de grasa, mejora la definición muscular.'
    },
    sideEffects: {
      en: 'Mild side effects may include liver stress, cholesterol changes, and natural testosterone suppression.',
      es: 'Los efectos secundarios leves pueden incluir estrés hepático, cambios en el colesterol y supresión de testosterona natural.'
    },
    effectsOnWomen: {
      en: 'Generally well-tolerated by women with lower risk of virilization at proper dosages.',
      es: 'Generalmente bien tolerado por las mujeres con menor riesgo de virilización en dosis adecuadas.'
    },
    howItWorks: {
      en: 'Increases protein synthesis and nitrogen retention while promoting fat oxidation.',
      es: 'Aumenta la síntesis de proteínas y la retención de nitrógeno mientras promueve la oxidación de grasas.'
    },
    safetyInformation: {
      en: 'Regular blood work recommended. Use liver support supplements during cycle.',
      es: 'Se recomienda análisis de sangre regulares. Usar suplementos de apoyo hepático durante el ciclo.'
    },
    cycleInformation: {
      en: 'Typically used for 6-8 weeks. Can be stacked with other compounds for enhanced results.',
      es: 'Típicamente usado por 6-8 semanas. Puede combinarse con otros compuestos para resultados mejorados.'
    },
    whatToExpect: {
      en: 'Gradual lean muscle gains, increased strength, improved muscle hardness, and enhanced fat loss.',
      es: 'Ganancias graduales de músculo magro, aumento de fuerza, mejor dureza muscular y pérdida de grasa mejorada.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 4,
      fatLoss: 4,
      sideEffects: 2,
      retention: 4
    }
  },
  {
    id: 'testosterone',
    name: 'Testosterone Enanthate',
    price: 79.99,
    image: '/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png',
    description: {
      en: 'High-quality Testosterone Enanthate for muscle building and hormone optimization.',
      es: 'Enantato de testosterona de alta calidad para construcción muscular y optimización hormonal.'
    },
    ingredients: 'Testosterone Enanthate 250mg/ml',
    dosage: '250-500mg weekly',
    capsules: 10,
    featured: true,
    inStock: true,
    categories: ['bulking', 'beginner-friendly', 'injectable'],
    specifications: {
      en: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '10-12 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '10-12 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'Testosterone is the primary male hormone and has been used in hormone replacement therapy since the 1930s.',
      es: 'La testosterona es la hormona masculina primaria y se ha usado en terapia de reemplazo hormonal desde los años 1930.'
    },
    benefits: {
      en: 'Increases muscle mass, strength, bone density, and overall well-being.',
      es: 'Aumenta la masa muscular, fuerza, densidad ósea y bienestar general.'
    },
    sideEffects: {
      en: 'May cause water retention, acne, hair loss, and estrogen-related effects.',
      es: 'Puede causar retención de agua, acné, pérdida de cabello y efectos relacionados con estrógeno.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to high risk of virilization.',
      es: 'No recomendado para mujeres debido al alto riesgo de virilización.'
    },
    howItWorks: {
      en: 'Replaces and supplements natural testosterone production, enhancing anabolic processes.',
      es: 'Reemplaza y suplementa la producción natural de testosterona, mejorando los procesos anabólicos.'
    },
    safetyInformation: {
      en: 'Requires post-cycle therapy. Regular monitoring of blood markers recommended.',
      es: 'Requiere terapia post-ciclo. Se recomienda monitoreo regular de marcadores sanguíneos.'
    },
    cycleInformation: {
      en: 'Foundation compound for most cycles. Typically used for 10-12 weeks.',
      es: 'Compuesto fundamental para la mayoría de ciclos. Típicamente usado por 10-12 semanas.'
    },
    whatToExpect: {
      en: 'Significant muscle growth, increased strength, improved recovery, and enhanced libido.',
      es: 'Crecimiento muscular significativo, aumento de fuerza, mejor recuperación y libido mejorada.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 3,
      sideEffects: 3,
      retention: 4
    }
  },
  {
    id: 'winstrol',
    name: 'Winstrol',
    price: 69.99,
    image: '/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png',
    description: {
      en: 'Powerful Winstrol for cutting cycles and athletic performance.',
      es: 'Winstrol potente para ciclos de corte y rendimiento atlético.'
    },
    ingredients: 'Stanozolol 25mg per capsule',
    dosage: '25-50mg daily',
    capsules: 100,
    inStock: true,
    categories: ['cutting', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100 capsules',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100 cápsulas',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Stanozolol is a synthetic anabolic steroid derived from dihydrotestosterone, used for cutting and performance enhancement.',
      es: 'El stanozolol es un esteroide anabólico sintético derivado de la dihidrotestosterona, usado para corte y mejora del rendimiento.'
    },
    benefits: {
      en: 'Enhances muscle hardness, reduces water retention, improves strength and speed.',
      es: 'Mejora la dureza muscular, reduce la retención de agua, mejora la fuerza y velocidad.'
    },
    sideEffects: {
      en: 'Potential liver toxicity, joint pain, and cholesterol changes.',
      es: 'Posible toxicidad hepática, dolor articular y cambios en el colesterol.'
    },
    effectsOnWomen: {
      en: 'Lower virilization risk but should be used cautiously.',
      es: 'Menor riesgo de virilización pero debe usarse con precaución.'
    },
    howItWorks: {
      en: 'Increases protein synthesis and red blood cell production.',
      es: 'Aumenta la síntesis de proteínas y la producción de glóbulos rojos.'
    },
    safetyInformation: {
      en: 'Avoid alcohol and monitor liver enzymes during use.',
      es: 'Evitar alcohol y monitorear enzimas hepáticas durante el uso.'
    },
    cycleInformation: {
      en: 'Commonly used for 6-8 weeks in cutting cycles.',
      es: 'Comúnmente usado por 6-8 semanas en ciclos de corte.'
    },
    whatToExpect: {
      en: 'Improved muscle definition, strength, and endurance.',
      es: 'Mejora en definición muscular, fuerza y resistencia.'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 4,
      fatLoss: 4,
      sideEffects: 3,
      retention: 3
    }
  },
  {
    id: 'dbol',
    name: 'Dianabol',
    price: 59.99,
    image: '/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png',
    description: {
      en: 'Classic Dianabol for rapid muscle mass and strength gains.',
      es: 'Dianabol clásico para ganancias rápidas de masa muscular y fuerza.'
    },
    ingredients: 'Methandrostenolone 25mg per capsule',
    dosage: '25-50mg daily',
    capsules: 100,
    inStock: true,
    categories: ['bulking', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100 capsules',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100 cápsulas',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'Methandrostenolone was developed in the 1950s and is known for its potent anabolic effects.',
      es: 'La metandrostenolona fue desarrollada en los años 50 y es conocida por sus potentes efectos anabólicos.'
    },
    benefits: {
      en: 'Rapid muscle mass increase, strength gains, and improved nitrogen retention.',
      es: 'Aumento rápido de masa muscular, ganancias de fuerza y mejor retención de nitrógeno.'
    },
    sideEffects: {
      en: 'Water retention, high blood pressure, liver toxicity, and estrogenic effects.',
      es: 'Retención de agua, presión arterial alta, toxicidad hepática y efectos estrogénicos.'
    },
    effectsOnWomen: {
      en: 'High risk of virilization; generally not recommended.',
      es: 'Alto riesgo de virilización; generalmente no recomendado.'
    },
    howItWorks: {
      en: 'Enhances protein synthesis and glycogenolysis.',
      es: 'Mejora la síntesis de proteínas y la glucogenólisis.'
    },
    safetyInformation: {
      en: 'Use liver support and monitor blood pressure regularly.',
      es: 'Usar soporte hepático y monitorear la presión arterial regularmente.'
    },
    cycleInformation: {
      en: 'Short cycles of 4-6 weeks recommended due to toxicity.',
      es: 'Ciclos cortos de 4-6 semanas recomendados debido a toxicidad.'
    },
    whatToExpect: {
      en: 'Fast muscle and strength gains with possible water retention.',
      es: 'Ganancias rápidas de músculo y fuerza con posible retención de agua.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 2,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: 'trenbolone',
    name: 'Trenbolone Acetate',
    price: 99.99,
    image: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    description: {
      en: 'Potent Trenbolone Acetate for advanced users seeking maximum results.',
      es: 'Potente acetato de trenbolona para usuarios avanzados que buscan resultados máximos.'
    },
    ingredients: 'Trenbolone Acetate 100mg/ml',
    dosage: '100-300mg weekly',
    capsules: 10,
    inStock: true,
    categories: ['bulking', 'advanced', 'injectable'],
    specifications: {
      en: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Muy Alto'
      }
    },
    researchBackground: {
      en: 'Trenbolone is a powerful anabolic steroid originally developed for veterinary use.',
      es: 'La trenbolona es un esteroide anabólico potente desarrollado originalmente para uso veterinario.'
    },
    benefits: {
      en: 'Increases muscle mass, strength, and nitrogen retention with fat burning properties.',
      es: 'Aumenta masa muscular, fuerza y retención de nitrógeno con propiedades de quema de grasa.'
    },
    sideEffects: {
      en: 'Severe androgenic effects, night sweats, insomnia, and cardiovascular strain.',
      es: 'Efectos androgénicos severos, sudores nocturnos, insomnio y tensión cardiovascular.'
    },
    effectsOnWomen: {
      en: 'Not recommended due to high virilization risk.',
      es: 'No recomendado debido al alto riesgo de virilización.'
    },
    howItWorks: {
      en: 'Binds strongly to androgen receptors, enhancing anabolic activity.',
      es: 'Se une fuertemente a receptores androgénicos, mejorando la actividad anabólica.'
    },
    safetyInformation: {
      en: 'Use with caution; monitor cardiovascular health and mental well-being.',
      es: 'Usar con precaución; monitorear salud cardiovascular y bienestar mental.'
    },
    cycleInformation: {
      en: 'Used in advanced cycles of 8-12 weeks.',
      es: 'Usado en ciclos avanzados de 8-12 semanas.'
    },
    whatToExpect: {
      en: 'Rapid muscle gains, increased strength, and fat loss with possible side effects.',
      es: 'Ganancias rápidas de músculo, aumento de fuerza y pérdida de grasa con posibles efectos secundarios.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 5,
      sideEffects: 5,
      retention: 5
    }
  },
  {
    id: 'deca',
    name: 'Deca Durabolin',
    price: 84.99,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    description: {
      en: 'Premium Deca Durabolin for joint health and steady muscle gains.',
      es: 'Deca Durabolin premium para salud articular y ganancias musculares constantes.'
    },
    ingredients: 'Nandrolone Decanoate 250mg/ml',
    dosage: '200-400mg weekly',
    capsules: 10,
    inStock: true,
    categories: ['bulking', 'injectable'],
    specifications: {
      en: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '10-12 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '10-12 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Nandrolone Decanoate is known for its anabolic effects and joint relief properties.',
      es: 'El decanoato de nandrolona es conocido por sus efectos anabólicos y propiedades para aliviar las articulaciones.'
    },
    benefits: {
      en: 'Supports muscle growth, improves collagen synthesis, and reduces joint pain.',
      es: 'Apoya el crecimiento muscular, mejora la síntesis de colágeno y reduce el dolor articular.'
    },
    sideEffects: {
      en: 'Possible water retention, hormonal suppression, and cardiovascular effects.',
      es: 'Posible retención de agua, supresión hormonal y efectos cardiovasculares.'
    },
    effectsOnWomen: {
      en: 'Lower androgenic effects but caution advised.',
      es: 'Menores efectos androgénicos pero se recomienda precaución.'
    },
    howItWorks: {
      en: 'Enhances protein synthesis and nitrogen retention with mild androgenic activity.',
      es: 'Mejora la síntesis de proteínas y la retención de nitrógeno con actividad androgénica leve.'
    },
    safetyInformation: {
      en: 'Monitor blood pressure and hormone levels during use.',
      es: 'Monitorear presión arterial y niveles hormonales durante el uso.'
    },
    cycleInformation: {
      en: 'Typically used for 10-12 weeks in bulking cycles.',
      es: 'Típicamente usado por 10-12 semanas en ciclos de volumen.'
    },
    whatToExpect: {
      en: 'Steady muscle gains, improved joint comfort, and enhanced recovery.',
      es: 'Ganancias musculares constantes, mejor comodidad articular y recuperación mejorada.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 4,
      fatLoss: 2,
      sideEffects: 3,
      retention: 4
    }
  },
  {
    id: 'anadrol',
    name: 'Anadrol',
    price: 74.99,
    image: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    description: {
      en: 'Powerful Anadrol for explosive strength and mass gains.',
      es: 'Anadrol potente para fuerza explosiva y ganancias de masa.'
    },
    ingredients: 'Oxymetholone 50mg per capsule',
    dosage: '50-100mg daily',
    capsules: 100,
    inStock: true,
    categories: ['bulking', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '50mg',
        capsulesPerBottle: '100 capsules',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '50mg',
        capsulesPerBottle: '100 cápsulas',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Muy Alto'
      }
    },
    researchBackground: {
      en: 'Oxymetholone is a potent oral anabolic steroid used for rapid mass gains.',
      es: 'El oxymetolona es un esteroide anabólico oral potente usado para ganancias rápidas de masa.'
    },
    benefits: {
      en: 'Increases red blood cell production, strength, and muscle mass quickly.',
      es: 'Aumenta la producción de glóbulos rojos, fuerza y masa muscular rápidamente.'
    },
    sideEffects: {
      en: 'High liver toxicity, water retention, and estrogenic side effects.',
      es: 'Alta toxicidad hepática, retención de agua y efectos estrogénicos.'
    },
    effectsOnWomen: {
      en: 'Not recommended due to severe virilization risk.',
      es: 'No recomendado debido a alto riesgo de virilización severa.'
    },
    howItWorks: {
      en: 'Enhances protein synthesis and erythropoiesis.',
      es: 'Mejora la síntesis de proteínas y la eritropoyesis.'
    },
    safetyInformation: {
      en: 'Use liver support and limit cycle length to reduce toxicity.',
      es: 'Usar soporte hepático y limitar la duración del ciclo para reducir toxicidad.'
    },
    cycleInformation: {
      en: 'Short cycles of 4-6 weeks recommended.',
      es: 'Ciclos cortos de 4-6 semanas recomendados.'
    },
    whatToExpect: {
      en: 'Rapid strength and mass gains with possible water retention.',
      es: 'Ganancias rápidas de fuerza y masa con posible retención de agua.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 1,
      sideEffects: 5,
      retention: 3
    }
  },
  {
    id: 'masteron',
    name: 'Masteron',
    price: 94.99,
    image: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    description: {
      en: 'Quality Masteron for cutting cycles and muscle hardening.',
      es: 'Masteron de calidad para ciclos de corte y endurecimiento muscular.'
    },
    ingredients: 'Drostanolone Propionate 100mg/ml',
    dosage: '300-500mg weekly',
    capsules: 10,
    inStock: true,
    categories: ['cutting', 'injectable'],
    specifications: {
      en: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Drostanolone is a DHT derivative used for its anti-estrogenic and hardening effects.',
      es: 'La drostanolona es un derivado de DHT usado por sus efectos antiestrogénicos y de endurecimiento.'
    },
    benefits: {
      en: 'Improves muscle hardness, reduces water retention, and enhances fat loss.',
      es: 'Mejora la dureza muscular, reduce la retención de agua y mejora la pérdida de grasa.'
    },
    sideEffects: {
      en: 'Mild androgenic effects, possible hair loss, and libido changes.',
      es: 'Efectos androgénicos leves, posible pérdida de cabello y cambios en la libido.'
    },
    effectsOnWomen: {
      en: 'Lower virilization risk but caution advised.',
      es: 'Menor riesgo de virilización pero se recomienda precaución.'
    },
    howItWorks: {
      en: 'Binds androgen receptors and inhibits estrogen conversion.',
      es: 'Se une a receptores androgénicos e inhibe la conversión a estrógeno.'
    },
    safetyInformation: {
      en: 'Monitor hormone levels and avoid prolonged use.',
      es: 'Monitorear niveles hormonales y evitar uso prolongado.'
    },
    cycleInformation: {
      en: 'Used in cutting cycles of 6-8 weeks.',
      es: 'Usado en ciclos de corte de 6-8 semanas.'
    },
    whatToExpect: {
      en: 'Harder, leaner muscles with reduced water retention.',
      es: 'Músculos más duros y magros con menor retención de agua.'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 3,
      fatLoss: 4,
      sideEffects: 2,
      retention: 4
    }
  },
  {
    id: 'primobolan',
    name: 'Primobolan',
    price: 109.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    description: {
      en: 'Premium Primobolan for lean gains and quality muscle development.',
      es: 'Primobolan premium para ganancias magras y desarrollo muscular de calidad.'
    },
    ingredients: 'Methenolone Enanthate 100mg/ml',
    dosage: '400-600mg weekly',
    capsules: 10,
    inStock: true,
    categories: ['cutting', 'injectable'],
    specifications: {
      en: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Methenolone is known for its mild anabolic effects and low androgenicity.',
      es: 'La metenolona es conocida por sus efectos anabólicos suaves y baja androgenicidad.'
    },
    benefits: {
      en: 'Promotes lean muscle growth, fat loss, and preserves muscle during cutting.',
      es: 'Promueve crecimiento muscular magro, pérdida de grasa y preserva músculo durante corte.'
    },
    sideEffects: {
      en: 'Minimal side effects, low liver toxicity, and mild androgenic effects.',
      es: 'Efectos secundarios mínimos, baja toxicidad hepática y efectos androgénicos leves.'
    },
    effectsOnWomen: {
      en: 'Generally safe for women at low doses.',
      es: 'Generalmente seguro para mujeres en dosis bajas.'
    },
    howItWorks: {
      en: 'Enhances protein synthesis and nitrogen retention.',
      es: 'Mejora la síntesis de proteínas y la retención de nitrógeno.'
    },
    safetyInformation: {
      en: 'Monitor hormone levels and avoid high doses.',
      es: 'Monitorear niveles hormonales y evitar dosis altas.'
    },
    cycleInformation: {
      en: 'Used in cutting cycles of 8-12 weeks.',
      es: 'Usado en ciclos de corte de 8-12 semanas.'
    },
    whatToExpect: {
      en: 'Lean muscle gains with minimal side effects.',
      es: 'Ganancias musculares magras con efectos secundarios mínimos.'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 3,
      fatLoss: 4,
      sideEffects: 1,
      retention: 4
    }
  },
  {
    id: 'equipoise',
    name: 'Equipoise',
    price: 89.99,
    image: '/lovable-uploads/fb319341-a727-49e3-afa8-ce91bd70a788.png',
    description: {
      en: 'High-grade Equipoise for steady gains and enhanced appetite.',
      es: 'Equipoise de alta calidad para ganancias constantes y aumento del apetito.'
    },
    ingredients: 'Boldenone Undecylenate 250mg/ml',
    dosage: '400-600mg weekly',
    capsules: 10,
    inStock: true,
    categories: ['bulking', 'injectable'],
    specifications: {
      en: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '10-12 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml vial',
        typicalCycleLength: '10-12 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Boldenone is an anabolic steroid originally developed for veterinary use.',
      es: 'La boldenona es un esteroide anabólico desarrollado originalmente para uso veterinario.'
    },
    benefits: {
      en: 'Increases nitrogen retention, red blood cell production, and appetite.',
      es: 'Aumenta la retención de nitrógeno, producción de glóbulos rojos y apetito.'
    },
    sideEffects: {
      en: 'Mild androgenic effects, possible acne, and increased aggression.',
      es: 'Efectos androgénicos leves, posible acné y aumento de agresividad.'
    },
    effectsOnWomen: {
      en: 'Not recommended due to virilization risk.',
      es: 'No recomendado debido al riesgo de virilización.'
    },
    howItWorks: {
      en: 'Enhances protein synthesis and erythropoiesis.',
      es: 'Mejora la síntesis de proteínas y la eritropoyesis.'
    },
    safetyInformation: {
      en: 'Monitor blood pressure and hormone levels.',
      es: 'Monitorear presión arterial y niveles hormonales.'
    },
    cycleInformation: {
      en: 'Used in bulking cycles of 10-12 weeks.',
      es: 'Usado en ciclos de volumen de 10-12 semanas.'
    },
    whatToExpect: {
      en: 'Steady muscle gains and improved appetite.',
      es: 'Ganancias musculares constantes y mejora del apetito.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 4,
      fatLoss: 2,
      sideEffects: 3,
      retention: 4
    }
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 49.99,
    image: '/lovable-uploads/eba9e12b-46c3-4087-b249-0766d5bd34bb.png',
    description: {
      en: 'Effective Clenbuterol for fat burning and improved cardiovascular performance.',
      es: 'Clenbuterol efectivo para quema de grasa y mejora del rendimiento cardiovascular.'
    },
    ingredients: 'Clenbuterol HCl 40mcg per capsule',
    dosage: '20-120mcg daily (pyramid dosing)',
    capsules: 50,
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
      en: 'Clenbuterol is a bronchodilator with thermogenic properties used off-label for fat loss.',
      es: 'El clenbuterol es un broncodilatador con propiedades termogénicas usado off-label para pérdida de grasa.'
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
    id: 'aromasin',
    name: 'Aromasin',
    price: 39.99,
    image: '',
    description: {
      en: 'Essential Aromasin (Exemestane) for estrogen control during cycles.',
      es: 'Aromasin esencial (Exemestano) para control de estrógenos durante ciclos.'
    },
    ingredients: 'Exemestane 25mg per capsule',
    dosage: '12.5-25mg daily',
    capsules: 100,
    inStock: true,
    categories: ['aromatase-inhibitor', 'oral'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100 capsules',
        typicalCycleLength: 'Throughout cycle',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100 cápsulas',
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
  }
];
