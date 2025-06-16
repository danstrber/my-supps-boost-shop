
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categories: string[];
  description: {
    en: string;
    es: string;
  };
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
  // Additional properties needed by components
  featured?: boolean;
  labTestFile?: string;
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: 'superdrol',
    name: 'Superdrol',
    price: 24.99,
    image: '/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png',
    categories: ['oral-steroids'],
    featured: true,
    labTestFile: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    inStock: true,
    description: {
      en: 'Superdrol (Metasterone) is a powerful oral anabolic compound known for rapid muscle gains and strength increases.',
      es: 'Superdrol (Metasterona) es un compuesto anabólico oral potente conocido por ganancias rápidas de músculo y aumentos de fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '4-6 weeks maximum',
        potencyLevel: 'Very High Anabolic Potency'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '4-6 semanas máximo',
        potencyLevel: 'Potencia anabólica muy alta'
      }
    },
    researchBackground: {
      en: 'Superdrol (Metasterone) has been extensively studied for its potent anabolic properties and rapid muscle-building capabilities in research settings.',
      es: 'Superdrol (Metasterona) ha sido extensamente estudiado por sus propiedades anabólicas potentes y capacidades rápidas de construcción muscular en entornos de investigación.'
    },
    benefits: {
      en: 'Rapid muscle mass gains (8-15 lbs in 4 weeks), dramatic strength increases, enhanced protein synthesis, improved nitrogen retention, minimal water retention.',
      es: 'Ganancias rápidas de masa muscular (8-15 lbs en 4 semanas), aumentos dramáticos de fuerza, síntesis proteica mejorada, retención de nitrógeno mejorada, retención mínima de agua.'
    },
    sideEffects: {
      en: 'Hepatotoxicity (liver stress), cardiovascular strain, elevated blood pressure, cholesterol imbalances, testosterone suppression, mood changes, possible hair loss, acne, joint pain, headaches, fatigue.',
      es: 'Hepatotoxicidad (estrés hepático), tensión cardiovascular, elevación de presión arterial, desequilibrios de colesterol, supresión de testosterona, cambios de humor, posible pérdida de cabello, acné, dolor articular, dolores de cabeza, fatiga.'
    },
    effectsOnWomen: {
      en: 'NOT RECOMMENDED for women due to extremely high risk of virilization. May cause permanent masculine characteristics, voice deepening, and severe hormonal disruption.',
      es: 'NO RECOMENDADO para mujeres debido al riesgo extremadamente alto de virilización. Puede causar características masculinas permanentes, profundización de la voz y disrupción hormonal severa.'
    },
    howItWorks: {
      en: 'Binds strongly to androgen receptors, promoting intense protein synthesis and muscle growth while minimizing estrogenic effects.',
      es: 'Se une fuertemente a los receptores de andrógenos, promoviendo síntesis proteica intensa y crecimiento muscular mientras minimiza efectos estrogénicos.'
    },
    safetyInformation: {
      en: 'Requires liver support (NAC, TUDCA), regular blood work monitoring, and proper post-cycle therapy. Not for beginners.',
      es: 'Requiere apoyo hepático (NAC, TUDCA), monitoreo regular de análisis de sangre y terapia post-ciclo adecuada. No para principiantes.'
    },
    cycleInformation: {
      en: 'Typical cycles: 4-6 weeks maximum due to liver toxicity. Always followed by comprehensive PCT.',
      es: 'Ciclos típicos: 4-6 semanas máximo debido a toxicidad hepática. Siempre seguido por PCT integral.'
    },
    whatToExpect: {
      en: 'Users typically gain 8-15 lbs of lean muscle in 4 weeks with significant strength increases. Results are dramatic but require proper PCT to maintain.',
      es: 'Los usuarios típicamente ganan 8-15 lbs de músculo magro en 4 semanas con aumentos significativos de fuerza. Los resultados son dramáticos pero requieren PCT adecuado para mantener.'
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
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35.00,
    image: '/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png',
    categories: ['fat-burners'],
    featured: true,
    labTestFile: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    inStock: true,
    description: {
      en: 'Clenbuterol is a powerful thermogenic stimulant known for its fat-burning and energy-boosting effects.',
      es: 'Clenbuterol es un estimulante termogénico potente conocido por sus efectos quemagrasas y energizantes.'
    },
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50',
        typicalCycleLength: '2 weeks on, 2 weeks off',
        potencyLevel: 'High Thermogenic Potency'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50',
        typicalCycleLength: '2 semanas sí, 2 semanas no',
        potencyLevel: 'Potencia termogénica alta'
      }
    },
    researchBackground: {
      en: 'Clenbuterol has been studied for its bronchodilator and thermogenic effects, leading to its use in fat loss and performance enhancement.',
      es: 'Clenbuterol ha sido estudiado por sus efectos broncodilatadores y termogénicos, lo que ha llevado a su uso en la pérdida de grasa y la mejora del rendimiento.'
    },
    benefits: {
      en: 'Rapid fat loss, increased energy, enhanced metabolism, improved cardiovascular performance, appetite suppression.',
      es: 'Pérdida rápida de grasa, aumento de energía, metabolismo mejorado, rendimiento cardiovascular mejorado, supresión del apetito.'
    },
    sideEffects: {
      en: 'Anxiety, insomnia, tremors, increased heart rate, elevated blood pressure, sweating, muscle cramps.',
      es: 'Ansiedad, insomnio, temblores, aumento de la frecuencia cardíaca, elevación de la presión arterial, sudoración, calambres musculares.'
    },
    effectsOnWomen: {
      en: 'Generally safe for women, but side effects may be more pronounced. Start with low doses.',
      es: 'Generalmente seguro para las mujeres, pero los efectos secundarios pueden ser más pronunciados. Comience con dosis bajas.'
    },
    howItWorks: {
      en: 'Stimulates beta-2 adrenergic receptors, increasing cAMP levels and promoting lipolysis (fat breakdown).',
      es: 'Estimula los receptores adrenérgicos beta-2, aumentando los niveles de cAMP y promoviendo la lipólisis (descomposición de grasas).'
    },
    safetyInformation: {
      en: 'Start with low doses, monitor cardiovascular health, and use electrolytes to prevent muscle cramps. Not for individuals with heart conditions.',
      es: 'Comience con dosis bajas, controle la salud cardiovascular y use electrolitos para prevenir los calambres musculares. No para personas con afecciones cardíacas.'
    },
    cycleInformation: {
      en: 'Typical cycles: 2 weeks on, 2 weeks off to prevent receptor downregulation.',
      es: 'Ciclos típicos: 2 semanas sí, 2 semanas no para prevenir la regulación negativa de los receptores.'
    },
    whatToExpect: {
      en: 'Noticeable fat loss within 2 weeks, increased energy levels, and improved endurance.',
      es: 'Pérdida de grasa notable en 2 semanas, aumento de los niveles de energía y mejora de la resistencia.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 2,
      fatLoss: 5,
      sideEffects: 3,
      retention: 5
    }
  },
  {
    id: 'mk-677',
    name: 'MK-677',
    price: 39.99,
    image: '/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png',
    categories: ['growth'],
    featured: false,
    inStock: true,
    description: {
      en: 'MK-677 is a growth hormone secretagogue that stimulates natural growth hormone production.',
      es: 'MK-677 es un secretagogo de hormona de crecimiento que estimula la producción natural de hormona de crecimiento.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High Growth Hormone Stimulation'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Alta estimulación de hormona de crecimiento'
      }
    },
    researchBackground: {
      en: 'MK-677 has been studied for its ability to increase growth hormone levels, improve sleep quality, and enhance recovery.',
      es: 'MK-677 ha sido estudiado por su capacidad de aumentar los niveles de hormona de crecimiento, mejorar la calidad del sueño y mejorar la recuperación.'
    },
    benefits: {
      en: 'Increased growth hormone levels, improved sleep quality, enhanced recovery, increased muscle mass, improved bone density.',
      es: 'Niveles aumentados de hormona de crecimiento, calidad de sueño mejorada, recuperación mejorada, masa muscular aumentada, densidad ósea mejorada.'
    },
    sideEffects: {
      en: 'Increased appetite, water retention, mild fatigue, possible blood sugar changes.',
      es: 'Apetito aumentado, retención de agua, fatiga leve, posibles cambios en el azúcar en sangre.'
    },
    effectsOnWomen: {
      en: 'Generally well-tolerated by women with minimal virilization risk.',
      es: 'Generalmente bien tolerado por mujeres con riesgo mínimo de virilización.'
    },
    howItWorks: {
      en: 'Mimics ghrelin action, stimulating growth hormone release from the pituitary gland.',
      es: 'Imita la acción de la grelina, estimulando la liberación de hormona de crecimiento de la glándula pituitaria.'
    },
    safetyInformation: {
      en: 'Monitor blood glucose levels. Use with caution if diabetic.',
      es: 'Monitorear los niveles de glucosa en sangre. Usar con precaución si es diabético.'
    },
    cycleInformation: {
      en: 'Can be used for extended periods (3-6 months) with monitoring.',
      es: 'Puede ser usado por períodos extendidos (3-6 meses) con monitoreo.'
    },
    whatToExpect: {
      en: 'Improved sleep, increased appetite, gradual muscle gains, better recovery.',
      es: 'Sueño mejorado, apetito aumentado, ganancias musculares graduales, mejor recuperación.'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 2,
      sideEffects: 4,
      retention: 4
    }
  },
  {
    id: 'rad-140',
    name: 'RAD-140',
    price: 39.99,
    image: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    categories: ['sarms'],
    featured: false,
    inStock: true,
    description: {
      en: 'RAD-140 is a selective androgen receptor modulator (SARM) known for significant muscle and strength gains.',
      es: 'RAD-140 es un modulador selectivo del receptor de andrógenos (SARM) conocido por ganancias significativas de músculo y fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High Anabolic Activity'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Alta actividad anabólica'
      }
    },
    researchBackground: {
      en: 'RAD-140 has been researched for its muscle-building properties with reduced side effects compared to traditional anabolic steroids.',
      es: 'RAD-140 ha sido investigado por sus propiedades de construcción muscular con efectos secundarios reducidos comparado con esteroides anabólicos tradicionales.'
    },
    benefits: {
      en: 'Significant muscle mass increases, enhanced strength, improved endurance, minimal water retention, selective androgen receptor activation.',
      es: 'Aumentos significativos de masa muscular, fuerza mejorada, resistencia mejorada, retención mínima de agua, activación selectiva del receptor de andrógenos.'
    },
    sideEffects: {
      en: 'Mild testosterone suppression, possible hair loss, mild acne, potential liver stress at high doses.',
      es: 'Supresión leve de testosterona, posible pérdida de cabello, acné leve, posible estrés hepático en dosis altas.'
    },
    effectsOnWomen: {
      en: 'Should be used with caution by women due to potential virilization effects.',
      es: 'Debe ser usado con precaución por mujeres debido a posibles efectos de virilización.'
    },
    howItWorks: {
      en: 'Selectively binds to androgen receptors in muscle and bone tissue, promoting anabolic effects.',
      es: 'Se une selectivamente a los receptores de andrógenos en tejido muscular y óseo, promoviendo efectos anabólicos.'
    },
    safetyInformation: {
      en: 'Consider PCT for cycles longer than 8 weeks. Monitor liver function.',
      es: 'Considerar PCT para ciclos más largos de 8 semanas. Monitorear función hepática.'
    },
    cycleInformation: {
      en: 'Typical cycles: 8-12 weeks, PCT recommended for longer cycles.',
      es: 'Ciclos típicos: 8-12 semanas, PCT recomendado para ciclos más largos.'
    },
    whatToExpect: {
      en: 'Noticeable muscle gains within 2-3 weeks, increased strength, improved recovery.',
      es: 'Ganancias musculares notables dentro de 2-3 semanas, fuerza aumentada, recuperación mejorada.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 4,
      fatLoss: 3,
      sideEffects: 3,
      retention: 4
    }
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25.00,
    image: '',
    categories: ['pct'],
    featured: false,
    inStock: true,
    description: {
      en: 'Aromasin (Exemestane) is an aromatase inhibitor used to prevent estrogenic side effects during anabolic cycles.',
      es: 'Aromasin (Exemestano) es un inhibidor de la aromatasa utilizado para prevenir los efectos secundarios estrogénicos durante los ciclos anabólicos.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: 'As needed',
        potencyLevel: 'High Estrogen Inhibition'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: 'Según sea necesario',
        potencyLevel: 'Alta inhibición de estrógeno'
      }
    },
    researchBackground: {
      en: 'Aromasin has been extensively studied for its ability to irreversibly inhibit aromatase enzyme, preventing estrogen formation.',
      es: 'Aromasin ha sido extensamente estudiado por su capacidad de inhibir irreversiblemente la enzima aromatasa, previniendo la formación de estrógeno.'
    },
    benefits: {
      en: 'Prevents gynecomastia, reduces water retention, maintains testosterone levels, improves muscle definition.',
      es: 'Previene la ginecomastia, reduce la retención de agua, mantiene los niveles de testosterona, mejora la definición muscular.'
    },
    sideEffects: {
      en: 'Joint pain, reduced bone density, mood changes, possible cholesterol effects.',
      es: 'Dolor articular, densidad ósea reducida, cambios de humor, posibles efectos en el colesterol.'
    },
    effectsOnWomen: {
      en: 'Used in postmenopausal women for breast cancer treatment. Not for performance enhancement.',
      es: 'Utilizado en mujeres posmenopáusicas para el tratamiento del cáncer de mama. No para la mejora del rendimiento.'
    },
    howItWorks: {
      en: 'Irreversibly binds to aromatase enzyme, preventing testosterone conversion to estrogen.',
      es: 'Se une irreversiblemente a la enzima aromatasa, previniendo la conversión de testosterona a estrógeno.'
    },
    safetyInformation: {
      en: 'Monitor bone health with long-term use. Use lowest effective dose.',
      es: 'Monitorear la salud ósea con uso a largo plazo. Usar la dosis efectiva más baja.'
    },
    cycleInformation: {
      en: 'Used as needed during aromatizing cycles. Typically 12.5-25mg every other day.',
      es: 'Usado según sea necesario durante ciclos aromatizantes. Típicamente 12.5-25mg cada dos días.'
    },
    whatToExpect: {
      en: 'Prevention of estrogenic side effects, improved muscle hardness, reduced water retention.',
      es: 'Prevención de efectos secundarios estrogénicos, dureza muscular mejorada, retención de agua reducida.'
    },
    performanceRatings: {
      muscleGain: 0,
      strength: 0,
      fatLoss: 1,
      sideEffects: 4,
      retention: 5
    }
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene',
    price: 25.00,
    image: '/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png',
    categories: ['pct'],
    featured: false,
    inStock: true,
    description: {
      en: 'Enclomiphene is a selective estrogen receptor modulator (SERM) used to restore natural testosterone production.',
      es: 'Enclomifeno es un modulador selectivo del receptor de estrógeno (SERM) utilizado para restaurar la producción natural de testosterona.'
    },
    specifications: {
      en: {
        dosePerCapsule: '12.5mg',
        capsulesPerBottle: '25',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Moderate Testosterone Stimulation'
      },
      es: {
        dosePerCapsule: '12.5mg',
        capsulesPerBottle: '25',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Estimulación moderada de testosterona'
      }
    },
    researchBackground: {
      en: 'Enclomiphene has been studied for its ability to stimulate natural testosterone production without estrogenic effects.',
      es: 'Enclomifeno ha sido estudiado por su capacidad de estimular la producción natural de testosterona sin efectos estrogénicos.'
    },
    benefits: {
      en: 'Restores natural testosterone, improves mood and energy, maintains muscle mass, fewer side effects than clomid.',
      es: 'Restaura la testosterona natural, mejora el estado de ánimo y la energía, mantiene la masa muscular, menos efectos secundarios que clomid.'
    },
    sideEffects: {
      en: 'Mild mood changes, possible visual disturbances, headaches.',
      es: 'Cambios leves de humor, posibles disturbios visuales, dolores de cabeza.'
    },
    effectsOnWomen: {
      en: 'Used for fertility treatment in women. Not recommended for performance enhancement.',
      es: 'Utilizado para el tratamiento de fertilidad en mujeres. No recomendado para la mejora del rendimiento.'
    },
    howItWorks: {
      en: 'Blocks estrogen receptors in the hypothalamus, stimulating LH and FSH production, which increases testosterone.',
      es: 'Bloquea los receptores de estrógeno en el hipotálamo, estimulando la producción de LH y FSH, lo que aumenta la testosterona.'
    },
    safetyInformation: {
      en: 'Monitor testosterone levels. Discontinue if visual changes occur.',
      es: 'Monitorear los niveles de testosterona. Discontinuar si ocurren cambios visuales.'
    },
    cycleInformation: {
      en: 'Typical PCT: 4-6 weeks at 12.5-25mg daily.',
      es: 'PCT típico: 4-6 semanas a 12.5-25mg diarios.'
    },
    whatToExpect: {
      en: 'Gradual restoration of natural testosterone, improved energy and mood, maintained muscle mass.',
      es: 'Restauración gradual de testosterona natural, energía y humor mejorados, masa muscular mantenida.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 0,
      sideEffects: 4,
      retention: 5
    }
  }
];
