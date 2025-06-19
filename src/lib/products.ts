
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
  keyIngredients?: {
    en: string[];
    es: string[];
  };
  dosage?: {
    en: string;
    es: string;
  };
  usage?: {
    en: string;
    es: string;
  };
  warnings?: {
    en: string[];
    es: string[];
  };
}

export const products: Product[] = [
  {
    id: 'superdrol',
    name: 'Superdrol',
    price: 25,
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
      en: 'May cause mild liver stress, temporary blood pressure changes, possible cholesterol fluctuations, natural testosterone reduction, occasional mood variations, minor hair thinning, temporary skin changes, mild joint discomfort.',
      es: 'Puede causar estrés hepático leve, cambios temporales de presión arterial, posibles fluctuaciones de colesterol, reducción de testosterona natural, variaciones ocasionales del humor, adelgazamiento menor del cabello, cambios temporales de la piel, molestias articulares leves.'
    },
    effectsOnWomen: {
      en: 'NOT RECOMMENDED for women due to high risk of masculinizing effects. May cause voice changes and other permanent characteristics.',
      es: 'NO RECOMENDADO para mujeres debido al alto riesgo de efectos masculinizantes. Puede causar cambios de voz y otras características permanentes.'
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
      en: 'Typical cycles: 4-6 weeks maximum due to liver considerations. Always followed by comprehensive PCT.',
      es: 'Ciclos típicos: 4-6 semanas máximo debido a consideraciones hepáticas. Siempre seguido por PCT integral.'
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
    price: 40,
    image: '/lovable-uploads/b43000ed-31b9-4d86-926f-1640e6f0aa3c.png',
    categories: ['growth-hormone'],
    featured: true,
    inStock: true,
    description: {
      en: 'MK-677 is a growth hormone secretagogue that stimulates natural growth hormone and IGF-1 production.',
      es: 'MK-677 es un secretagogo de hormona del crecimiento que estimula la producción natural de hormona del crecimiento e IGF-1.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High Growth Hormone Release'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
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
      en: 'May cause increased appetite, mild water retention, occasional fatigue, possible blood sugar variations, temporary joint sensations.',
      es: 'Puede causar aumento del apetito, retención leve de agua, fatiga ocasional, posibles variaciones de azúcar en sangre, sensaciones articulares temporales.'
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
    price: 55,
    image: '/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png',
    categories: ['sarms'],
    featured: false,
    inStock: true,
    description: {
      en: 'RAD-140 is considered one of the most powerful SARMs for muscle building and strength enhancement.',
      es: 'RAD-140 es considerado uno de los SARMs más potentes para construcción muscular y mejora de fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Very High Anabolic Activity'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '50',
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
      en: 'May cause natural testosterone reduction, occasional mood changes, mild hair sensitivity, temporary hormone fluctuations.',
      es: 'Puede causar reducción de testosterona natural, cambios ocasionales de humor, sensibilidad capilar leve, fluctuaciones hormonales temporales.'
    },
    effectsOnWomen: {
      en: 'NOT RECOMMENDED for women due to high risk of masculinizing effects and strong androgenic properties.',
      es: 'NO RECOMENDADO para mujeres debido al alto riesgo de efectos masculinizantes y propiedades androgénicas fuertes.'
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
    id: 'enclomiphene',
    name: 'Enclomiphene Citrate',
    price: 25,
    image: '/lovable-uploads/aea84c22-c0e6-477b-aed1-e323fa1bf550.png',
    categories: ['pct', 'testosterone-booster'],
    featured: false,
    inStock: true,
    description: {
      en: 'Enclomiphene is a selective estrogen receptor modulator (SERM) used for post-cycle therapy and natural testosterone restoration.',
      es: 'Enclomifeno es un modulador selectivo del receptor de estrógeno (SERM) usado para terapia post-ciclo y restauración natural de testosterona.'
    },
    specifications: {
      en: {
        dosePerCapsule: '12.5mg',
        capsulesPerBottle: '25',
        typicalCycleLength: '4-6 weeks PCT',
        potencyLevel: 'Moderate Testosterone Stimulation'
      },
      es: {
        dosePerCapsule: '12.5mg',
        capsulesPerBottle: '25',
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
      en: 'May cause mild mood variations, occasional visual sensitivity (rare), temporary hormone fluctuations, minor headaches.',
      es: 'Puede causar variaciones leves de humor, sensibilidad visual ocasional (raro), fluctuaciones hormonales temporales, dolores de cabeza menores.'
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
      en: 'Typical PCT: 12.5mg daily for 4-6 weeks starting immediately after cycle completion.',
      es: 'PCT típico: 12.5mg diario por 4-6 semanas comenzando inmediatamente después de completar el ciclo.'
    },
    whatToExpect: {
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
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25,
    image: '/lovable-uploads/aea84c22-c0e6-477b-aed1-e323fa1bf550.png',
    categories: ['pct', 'ai'],
    featured: false,
    inStock: true,
    description: {
      en: 'Aromasin (Exemestane) is a potent aromatase inhibitor (AI) used to control estrogen levels during and after anabolic steroid cycles.',
      es: 'Aromasin (Exemestano) es un potente inhibidor de aromatasa (AI) utilizado para controlar los niveles de estrógeno durante y después de los ciclos de esteroides anabólicos.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: '4-8 weeks',
        potencyLevel: 'High Aromatase Inhibition'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: '4-8 semanas',
        potencyLevel: 'Alta inhibición de aromatasa'
      }
    },
    researchBackground: {
      en: 'Aromasin (Exemestane) has been extensively studied as a third-generation aromatase inhibitor with irreversible binding properties.',
      es: 'Aromasin (Exemestano) ha sido extensamente estudiado como un inhibidor de aromatasa de tercera generación con propiedades de unión irreversible.'
    },
    benefits: {
      en: 'Powerful estrogen suppression, prevents gynecomastia, reduces water retention, supports lean muscle gains.',
      es: 'Supresión potente del estrógeno, previene la ginecomastia, reduce la retención de agua, apoya las ganancias de músculo magro.'
    },
    sideEffects: {
      en: 'May cause mild joint discomfort, temporary bone density changes, mood variations, occasional hot flashes, reduced libido.',
      es: 'Puede causar molestias articulares leves, cambios temporales de densidad ósea, variaciones de humor, sofocos ocasionales, libido reducida.'
    },
    effectsOnWomen: {
      en: 'NOT RECOMMENDED for women of reproductive age. May be used in postmenopausal women under medical supervision.',
      es: 'NO RECOMENDADO para mujeres en edad reproductiva. Puede usarse en mujeres postmenopáusicas bajo supervisión médica.'
    },
    howItWorks: {
      en: 'Irreversibly binds to and inactivates aromatase enzyme, preventing conversion of androgens to estrogens.',
      es: 'Se une irreversiblemente e inactiva la enzima aromatasa, previniendo la conversión de andrógenos a estrógenos.'
    },
    safetyInformation: {
      en: 'Regular blood work essential. Monitor estrogen levels and bone health. Use lowest effective dose.',
      es: 'Análisis de sangre regular esencial. Monitorear niveles de estrógeno y salud ósea. Usar la dosis efectiva más baja.'
    },
    cycleInformation: {
      en: 'Typical use: 12.5-25mg daily during cycle. Adjust based on estrogen levels and response.',
      es: 'Uso típico: 12.5-25mg diario durante el ciclo. Ajustar según niveles de estrógeno y respuesta.'
    },
    whatToExpect: {
      en: 'Users report effective estrogen control within 1-2 weeks, reduced water retention, and prevention of estrogen-related effects.',
      es: 'Los usuarios reportan control efectivo del estrógeno en 1-2 semanas, retención de agua reducida y prevención de efectos relacionados con el estrógeno.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 2,
      sideEffects: 3,
      retention: 4
    }
  }
];
