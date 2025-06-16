
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
    id: 'ostarine',
    name: 'Ostarine (MK-2866)',
    price: 34.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    categories: ['sarms'],
    featured: true,
    labTestFile: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    inStock: true,
    description: {
      en: 'Ostarine is one of the most popular SARMs for lean muscle gain and fat loss with minimal side effects.',
      es: 'Ostarine es uno de los SARMs más populares para ganancia de músculo magro y pérdida de grasa con efectos secundarios mínimos.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Moderate Anabolic Activity'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Actividad anabólica moderada'
      }
    },
    researchBackground: {
      en: 'Ostarine was originally developed for treating muscle wasting and osteoporosis, showing excellent safety profile in clinical studies.',
      es: 'Ostarine fue originalmente desarrollado para tratar el desgaste muscular y la osteoporosis, mostrando un excelente perfil de seguridad en estudios clínicos.'
    },
    benefits: {
      en: 'Lean muscle gains, fat loss, improved bone density, faster recovery, joint healing, minimal water retention.',
      es: 'Ganancias de músculo magro, pérdida de grasa, densidad ósea mejorada, recuperación más rápida, curación articular, retención mínima de agua.'
    },
    sideEffects: {
      en: 'Mild testosterone suppression, possible mild acne, temporary decrease in natural hormone production.',
      es: 'Supresión leve de testosterona, posible acné leve, disminución temporal en la producción natural de hormonas.'
    },
    effectsOnWomen: {
      en: 'Generally well tolerated by women at lower doses (5-10mg). Low risk of virilization when used responsibly.',
      es: 'Generalmente bien tolerado por mujeres en dosis más bajas (5-10mg). Bajo riesgo de virilización cuando se usa responsablemente.'
    },
    howItWorks: {
      en: 'Selectively binds to androgen receptors in muscle and bone tissue, promoting anabolic activity without affecting other organs.',
      es: 'Se une selectivamente a los receptores de andrógenos en el tejido muscular y óseo, promoviendo actividad anabólica sin afectar otros órganos.'
    },
    safetyInformation: {
      en: 'Generally safe with proper dosing. Regular blood work recommended. PCT may be needed after longer cycles.',
      es: 'Generalmente seguro con dosificación adecuada. Se recomienda análisis de sangre regular. PCT puede ser necesario después de ciclos más largos.'
    },
    cycleInformation: {
      en: 'Typical cycles: 8-12 weeks. Can be stacked with other SARMs for enhanced results.',
      es: 'Ciclos típicos: 8-12 semanas. Puede combinarse con otros SARMs para resultados mejorados.'
    },
    whatToExpect: {
      en: 'Users report 4-8 lbs of lean muscle gain over 8 weeks with improved strength and fat loss.',
      es: 'Los usuarios reportan 4-8 lbs de ganancia de músculo magro en 8 semanas con fuerza mejorada y pérdida de grasa.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 4,
      fatLoss: 4,
      sideEffects: 4,
      retention: 4
    }
  },
  {
    id: 'lgd4033',
    name: 'LGD-4033 (Ligandrol)',
    price: 39.99,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    categories: ['sarms'],
    featured: false,
    labTestFile: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    inStock: true,
    description: {
      en: 'LGD-4033 is a powerful SARM known for significant muscle mass gains and strength increases.',
      es: 'LGD-4033 es un SARM potente conocido por ganancias significativas de masa muscular y aumentos de fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '5mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'High Anabolic Activity'
      },
      es: {
        dosePerCapsule: '5mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Alta actividad anabólica'
      }
    },
    researchBackground: {
      en: 'LGD-4033 has shown remarkable results in clinical trials for muscle building and bone strengthening.',
      es: 'LGD-4033 ha mostrado resultados notables en ensayos clínicos para construcción muscular y fortalecimiento óseo.'
    },
    benefits: {
      en: 'Significant muscle mass gains, increased strength, improved bone density, enhanced recovery, minimal water retention.',
      es: 'Ganancias significativas de masa muscular, fuerza aumentada, densidad ósea mejorada, recuperación mejorada, retención mínima de agua.'
    },
    sideEffects: {
      en: 'Moderate testosterone suppression, possible fatigue, mild water retention, temporary hormone fluctuations.',
      es: 'Supresión moderada de testosterona, posible fatiga, retención leve de agua, fluctuaciones hormonales temporales.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to higher risk of virilization compared to other SARMs.',
      es: 'No recomendado para mujeres debido al mayor riesgo de virilización comparado con otros SARMs.'
    },
    howItWorks: {
      en: 'Binds strongly to androgen receptors in muscle tissue, promoting rapid muscle growth and strength gains.',
      es: 'Se une fuertemente a los receptores de andrógenos en el tejido muscular, promoviendo crecimiento muscular rápido y ganancias de fuerza.'
    },
    safetyInformation: {
      en: 'Requires PCT after cycle. Regular blood work monitoring recommended. Not for beginners.',
      es: 'Requiere PCT después del ciclo. Se recomienda monitoreo regular de análisis de sangre. No para principiantes.'
    },
    cycleInformation: {
      en: 'Typical cycles: 6-8 weeks. Should not be cycled longer than 8 weeks without break.',
      es: 'Ciclos típicos: 6-8 semanas. No debe ciclarse más de 8 semanas sin descanso.'
    },
    whatToExpect: {
      en: 'Users typically gain 6-12 lbs of muscle in 6-8 weeks with significant strength increases.',
      es: 'Los usuarios típicamente ganan 6-12 lbs de músculo en 6-8 semanas con aumentos significativos de fuerza.'
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
    whatToExpected: {
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
  }
];
