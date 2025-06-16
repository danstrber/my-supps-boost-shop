
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
        capsulesPerBottle: '20',
        typicalCycleLength: '4-6 weeks maximum',
        potencyLevel: 'Very High Anabolic Potency'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '20',
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
    id: 'mk677',
    name: 'MK-677 (Ibutamoren)',
    price: 39.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    categories: ['growth-hormone'],
    featured: true,
    labTestFile: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    inStock: true,
    description: {
      en: 'MK-677 is a growth hormone secretagogue that stimulates natural growth hormone and IGF-1 production.',
      es: 'MK-677 es un secretagogo de hormona del crecimiento que estimula la producción natural de hormona del crecimiento e IGF-1.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High Growth Hormone Release'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Alta liberación de hormona del crecimiento'
      }
    },
    researchBackground: {
      en: 'MK-677 has been extensively studied for its ability to increase growth hormone levels, improve sleep quality, and enhance recovery.',
      es: 'MK-677 ha sido extensamente estudiado por su capacidad de aumentar los niveles de hormona del crecimiento, mejorar la calidad del sueño y mejorar la recuperación.'
    },
    benefits: {
      en: 'Increased lean muscle mass, improved sleep quality, enhanced recovery, stronger bones, better skin and hair quality, increased appetite.',
      es: 'Aumento de masa muscular magra, mejor calidad del sueño, recuperación mejorada, huesos más fuertes, mejor calidad de piel y cabello, aumento del apetito.'
    },
    sideEffects: {
      en: 'Increased appetite, water retention, mild fatigue, possible blood sugar changes, temporary joint pain.',
      es: 'Aumento del apetito, retención de agua, fatiga leve, posibles cambios en el azúcar en sangre, dolor articular temporal.'
    },
    effectsOnWomen: {
      en: 'Generally well tolerated by women. May help with anti-aging benefits and improved recovery. Monitor for increased appetite.',
      es: 'Generalmente bien tolerado por mujeres. Puede ayudar con beneficios anti-envejecimiento y recuperación mejorada. Monitorear aumento del apetito.'
    },
    howItWorks: {
      en: 'Mimics ghrelin to stimulate growth hormone release from the pituitary gland, increasing IGF-1 levels naturally.',
      es: 'Imita la grelina para estimular la liberación de hormona del crecimiento de la glándula pituitaria, aumentando los niveles de IGF-1 naturalmente.'
    },
    safetyInformation: {
      en: 'Generally safe for long-term use. Monitor blood sugar levels. Take with food to reduce stomach upset.',
      es: 'Generalmente seguro para uso a largo plazo. Monitorear niveles de azúcar en sangre. Tomar con comida para reducir malestar estomacal.'
    },
    cycleInformation: {
      en: 'Can be used for extended periods (3-6 months). Best taken in the evening due to sleep benefits.',
      es: 'Puede usarse por períodos extendidos (3-6 meses). Mejor tomado por la noche debido a beneficios del sueño.'
    },
    whatToExpect: {
      en: 'Users report improved sleep within 1-2 weeks, increased appetite, and gradual muscle gains over 8-12 weeks.',
      es: 'Los usuarios reportan mejor sueño en 1-2 semanas, aumento del apetito y ganancias musculares graduales en 8-12 semanas.'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 2,
      sideEffects: 4,
      retention: 5
    }
  },
  {
    id: 'rad140',
    name: 'RAD-140 (Testolone)',
    price: 44.99,
    image: '/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png',
    categories: ['sarms'],
    featured: false,
    labTestFile: '/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png',
    inStock: true,
    description: {
      en: 'RAD-140 is considered one of the most powerful SARMs for muscle building and strength enhancement.',
      es: 'RAD-140 es considerado uno de los SARMs más potentes para construcción muscular y mejora de fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Very High Anabolic Activity'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Actividad anabólica muy alta'
      }
    },
    researchBackground: {
      en: 'RAD-140 was developed as a potential treatment for muscle wasting and breast cancer, showing strong anabolic effects.',
      es: 'RAD-140 fue desarrollado como un tratamiento potencial para el desgaste muscular y cáncer de mama, mostrando efectos anabólicos fuertes.'
    },
    benefits: {
      en: 'Rapid muscle gains, dramatic strength increases, enhanced endurance, improved recovery, minimal water retention.',
      es: 'Ganancias musculares rápidas, aumentos dramáticos de fuerza, resistencia mejorada, recuperación mejorada, retención mínima de agua.'
    },
    sideEffects: {
      en: 'Significant testosterone suppression, possible aggression, mild hair loss, temporary hormone imbalance.',
      es: 'Supresión significativa de testosterona, posible agresión, pérdida leve de cabello, desequilibrio hormonal temporal.'
    },
    effectsOnWomen: {
      en: 'NOT RECOMMENDED for women due to high risk of virilization and strong androgenic effects.',
      es: 'NO RECOMENDADO para mujeres debido al alto riesgo de virilización y efectos androgénicos fuertes.'
    },
    howItWorks: {
      en: 'Exhibits strong binding affinity to androgen receptors, promoting intense muscle growth and strength development.',
      es: 'Exhibe fuerte afinidad de unión a los receptores de andrógenos, promoviendo crecimiento muscular intenso y desarrollo de fuerza.'
    },
    safetyInformation: {
      en: 'Requires comprehensive PCT. Regular blood work essential. Only for experienced users.',
      es: 'Requiere PCT integral. Análisis de sangre regular esencial. Solo para usuarios experimentados.'
    },
    cycleInformation: {
      en: 'Typical cycles: 6-8 weeks maximum. Longer cycles increase suppression risk.',
      es: 'Ciclos típicos: 6-8 semanas máximo. Ciclos más largos aumentan el riesgo de supresión.'
    },
    whatToExpect: {
      en: 'Users report 8-15 lbs of lean muscle gain in 6-8 weeks with exceptional strength increases.',
      es: 'Los usuarios reportan 8-15 lbs de ganancia de músculo magro en 6-8 semanas con aumentos excepcionales de fuerza.'
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
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 49.99,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    categories: ['pct', 'ai'],
    featured: false,
    labTestFile: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    inStock: true,
    description: {
      en: 'Aromasin is a powerful aromatase inhibitor used for estrogen control during and after anabolic cycles.',
      es: 'Aromasin es un inhibidor de aromatasa potente usado para control de estrógeno durante y después de ciclos anabólicos.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: 'As needed during cycle',
        potencyLevel: 'High Estrogen Suppression'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: 'Según necesidad durante ciclo',
        potencyLevel: 'Alta supresión de estrógeno'
      }
    },
    researchBackground: {
      en: 'Aromasin is an FDA-approved aromatase inhibitor originally developed for breast cancer treatment, extensively studied for hormone regulation.',
      es: 'Aromasin es un inhibidor de aromatasa aprobado por FDA originalmente desarrollado para tratamiento de cáncer de mama, extensamente estudiado para regulación hormonal.'
    },
    benefits: {
      en: 'Prevents estrogen-related side effects, reduces water retention, prevents gynecomastia, maintains testosterone levels, improves muscle hardness.',
      es: 'Previene efectos secundarios relacionados con estrógeno, reduce retención de agua, previene ginecomastia, mantiene niveles de testosterona, mejora dureza muscular.'
    },
    sideEffects: {
      en: 'Joint pain, mood changes, fatigue, hot flashes, potential lipid changes, possible bone density reduction with long-term use.',
      es: 'Dolor articular, cambios de humor, fatiga, sofocos, posibles cambios lipídicos, posible reducción de densidad ósea con uso prolongado.'
    },
    effectsOnWomen: {
      en: 'Generally not recommended for women unless specifically needed for medical reasons under professional supervision.',
      es: 'Generalmente no recomendado para mujeres a menos que sea específicamente necesario por razones médicas bajo supervisión profesional.'
    },
    howItWorks: {
      en: 'Irreversibly binds to aromatase enzyme, preventing the conversion of androgens to estrogens.',
      es: 'Se une irreversiblemente a la enzima aromatasa, previniendo la conversión de andrógenos a estrógenos.'
    },
    safetyInformation: {
      en: 'Use only when needed. Monitor hormone levels regularly. Do not crash estrogen levels completely.',
      es: 'Usar solo cuando sea necesario. Monitorear niveles hormonales regularmente. No reducir completamente los niveles de estrógeno.'
    },
    cycleInformation: {
      en: 'Typically used at 12.5-25mg every other day during cycle and PCT as needed.',
      es: 'Típicamente usado a 12.5-25mg cada dos días durante ciclo y PCT según necesidad.'
    },
    whatToExpect: {
      en: 'Users report reduced water retention and prevention of estrogen-related side effects within days of use.',
      es: 'Los usuarios reportan reducción de retención de agua y prevención de efectos secundarios relacionados con estrógeno en días de uso.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 2,
      sideEffects: 3,
      retention: 5
    }
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene Citrate',
    price: 54.99,
    image: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    categories: ['pct', 'testosterone-booster'],
    featured: false,
    labTestFile: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    inStock: true,
    description: {
      en: 'Enclomiphene is a selective estrogen receptor modulator (SERM) used for post-cycle therapy and natural testosterone restoration.',
      es: 'Enclomifeno es un modulador selectivo del receptor de estrógeno (SERM) usado para terapia post-ciclo y restauración natural de testosterona.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '4-6 weeks PCT',
        potencyLevel: 'Moderate Testosterone Stimulation'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '4-6 semanas PCT',
        potencyLevel: 'Estimulación moderada de testosterona'
      }
    },
    researchBackground: {
      en: 'Enclomiphene is the active isomer of clomiphene, specifically developed for male hormone therapy with fewer side effects.',
      es: 'Enclomifeno es el isómero activo del clomifeno, específicamente desarrollado para terapia hormonal masculina con menos efectos secundarios.'
    },
    benefits: {
      en: 'Restores natural testosterone production, improves LH and FSH levels, maintains gains post-cycle, fewer side effects than clomid.',
      es: 'Restaura producción natural de testosterona, mejora niveles de LH y FSH, mantiene ganancias post-ciclo, menos efectos secundarios que clomid.'
    },
    sideEffects: {
      en: 'Mild mood changes, possible visual disturbances (rare), temporary testosterone fluctuations, mild headaches.',
      es: 'Cambios leves de humor, posibles disturbios visuales (raro), fluctuaciones temporales de testosterona, dolores de cabeza leves.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women. Designed specifically for male hormone restoration.',
      es: 'No recomendado para mujeres. Diseñado específicamente para restauración hormonal masculina.'
    },
    howItWorks: {
      en: 'Blocks estrogen receptors in the hypothalamus, stimulating LH and FSH release to restore natural testosterone production.',
      es: 'Bloquea receptores de estrógeno en el hipotálamo, estimulando la liberación de LH y FSH para restaurar la producción natural de testosterona.'
    },
    safetyInformation: {
      en: 'Generally well tolerated. Monitor hormone levels during PCT. Use as directed for post-cycle therapy.',
      es: 'Generalmente bien tolerado. Monitorear niveles hormonales durante PCT. Usar según indicado para terapia post-ciclo.'
    },
    cycleInformation: {
      en: 'Typical PCT: 25mg daily for 4-6 weeks starting immediately after cycle completion.',
      es: 'PCT típico: 25mg diario por 4-6 semanas comenzando inmediatamente después de completar el ciclo.'
    },
    whatToExpected: {
      en: 'Users report testosterone recovery within 2-4 weeks, maintained muscle gains, and improved energy levels.',
      es: 'Los usuarios reportan recuperación de testosterona en 2-4 semanas, ganancias musculares mantenidas y niveles de energía mejorados.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 1,
      sideEffects: 4,
      retention: 5
    }
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 34.99,
    image: '/lovable-uploads/fc2fad1d-20dd-4b74-b5e3-07f81414d651.png',
    categories: ['fat-burner'],
    featured: false,
    labTestFile: '/lovable-uploads/fb319341-a727-49e3-afa8-ce91bd70a788.png',
    inStock: true,
    description: {
      en: 'Clenbuterol is a powerful beta-2 agonist used for fat loss and improving cardiovascular performance.',
      es: 'Clenbuterol es un agonista beta-2 potente usado para pérdida de grasa y mejora del rendimiento cardiovascular.'
    },
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50',
        typicalCycleLength: '2 weeks on/off',
        potencyLevel: 'High Fat Burning Potency'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50',
        typicalCycleLength: '2 semanas sí/no',
        potencyLevel: 'Alta potencia quema-grasa'
      }
    },
    researchBackground: {
      en: 'Clenbuterol has been extensively studied for its thermogenic properties and ability to preserve lean muscle during caloric restriction.',
      es: 'Clenbuterol ha sido extensamente estudiado por sus propiedades termogénicas y capacidad de preservar músculo magro durante restricción calórica.'
    },
    benefits: {
      en: 'Rapid fat loss, preserved lean muscle, increased metabolic rate, improved cardiovascular endurance, appetite suppression.',
      es: 'Pérdida rápida de grasa, músculo magro preservado, tasa metabólica aumentada, resistencia cardiovascular mejorada, supresión del apetito.'
    },
    sideEffects: {
      en: 'Increased heart rate, jitters, sweating, insomnia, muscle cramps, elevated blood pressure, anxiety, headaches.',
      es: 'Frecuencia cardíaca aumentada, nerviosismo, sudoración, insomnio, calambres musculares, presión arterial elevada, ansiedad, dolores de cabeza.'
    },
    effectsOnWomen: {
      en: 'Generally well tolerated by women at lower doses (20-40mcg). Popular for female fat loss cycles.',
      es: 'Generalmente bien tolerado por mujeres en dosis más bajas (20-40mcg). Popular para ciclos femeninos de pérdida de grasa.'
    },
    howItWorks: {
      en: 'Stimulates beta-2 receptors, increasing thermogenesis and metabolic rate while preserving muscle tissue.',
      es: 'Estimula receptores beta-2, aumentando termogénesis y tasa metabólica mientras preserva tejido muscular.'
    },
    safetyInformation: {
      en: 'Start with low doses. Monitor heart rate and blood pressure. Not for those with heart conditions. Stay hydrated.',
      es: 'Comenzar con dosis bajas. Monitorear frecuencia cardíaca y presión arterial. No para personas con condiciones cardíacas. Mantenerse hidratado.'
    },
    cycleInformation: {
      en: 'Typical protocol: 2 weeks on, 2 weeks off. Start at 20mcg, increase gradually to tolerance.',
      es: 'Protocolo típico: 2 semanas sí, 2 semanas no. Comenzar a 20mcg, aumentar gradualmente según tolerancia.'
    },
    whatToExpect: {
      en: 'Users report noticeable fat loss within 1-2 weeks, increased energy, and improved muscle definition.',
      es: 'Los usuarios reportan pérdida notable de grasa en 1-2 semanas, energía aumentada y definición muscular mejorada.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 2,
      fatLoss: 5,
      sideEffects: 2,
      retention: 3
    }
  }
];
