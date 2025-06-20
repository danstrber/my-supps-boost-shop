
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
      en: 'May cause mild liver stress, temporary blood pressure changes, possible cholesterol fluctuations, natural testosterone reduction, occasional mood variations, minor hair sensitivity, temporary skin changes, mild joint discomfort.',
      es: 'Puede causar estrés hepático leve, cambios temporales de presión arterial, posibles fluctuaciones de colesterol, reducción de testosterona natural, variaciones ocasionales del humor, sensibilidad capilar menor, cambios temporales de la piel, molestias articulares leves.'
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
    price: 45,
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
    price: 35,
    image: '/lovable-uploads/9f4f9977-4f6c-4d53-ae01-a03204441df1.png',
    categories: ['fat-burner'],
    featured: false,
    labTestFile: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    inStock: true,
    description: {
      en: 'Clenbuterol is a powerful beta-2 agonist used primarily for fat loss and improved cardiovascular performance.',
      es: 'Clenbuterol es un potente agonista beta-2 utilizado principalmente para la pérdida de grasa y mejora del rendimiento cardiovascular.'
    },
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50',
        typicalCycleLength: '2-4 weeks',
        potencyLevel: 'High Fat Burning Potency'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '50',
        typicalCycleLength: '2-4 semanas',
        potencyLevel: 'Alta potencia quema grasa'
      }
    },
    researchBackground: {
      en: 'Clenbuterol has been extensively researched for its thermogenic properties and ability to preserve lean muscle during caloric restriction.',
      es: 'Clenbuterol ha sido extensamente investigado por sus propiedades termogénicas y capacidad de preservar músculo magro durante restricción calórica.'
    },
    benefits: {
      en: 'Rapid fat loss, increased metabolic rate, preserved muscle mass during cutting, enhanced cardiovascular performance, improved oxygen delivery.',
      es: 'Pérdida rápida de grasa, aumento de tasa metabólica, masa muscular preservada durante definición, rendimiento cardiovascular mejorado, entrega de oxígeno mejorada.'
    },
    sideEffects: {
      en: 'May cause mild tremors, occasional heart palpitations, increased sweating, temporary sleep disruption, mild anxiety, elevated heart rate.',
      es: 'Puede causar temblores leves, palpitaciones cardíacas ocasionales, aumento de sudoración, disrupción temporal del sueño, ansiedad leve, frecuencia cardíaca elevada.'
    },
    effectsOnWomen: {
      en: 'Generally well tolerated by women. Lower doses recommended. May help with fat loss without masculinizing effects.',
      es: 'Generalmente bien tolerado por mujeres. Dosis más bajas recomendadas. Puede ayudar con pérdida de grasa sin efectos masculinizantes.'
    },
    howItWorks: {
      en: 'Stimulates beta-2 receptors to increase thermogenesis and fat oxidation while preserving lean muscle tissue.',
      es: 'Estimula receptores beta-2 para aumentar termogénesis y oxidación de grasa mientras preserva tejido muscular magro.'
    },
    safetyInformation: {
      en: 'Monitor heart rate and blood pressure. Start with low doses. Cycle on/off to prevent tolerance. Stay hydrated.',
      es: 'Monitorear frecuencia cardíaca y presión arterial. Comenzar con dosis bajas. Ciclar para prevenir tolerancia. Mantenerse hidratado.'
    },
    cycleInformation: {
      en: 'Typical cycles: 2 weeks on, 2 weeks off. Start at 20mcg daily, gradually increase as tolerated.',
      es: 'Ciclos típicos: 2 semanas activo, 2 semanas descanso. Comenzar con 20mcg diario, aumentar gradualmente según tolerancia.'
    },
    whatToExpect: {
      en: 'Users report noticeable fat loss within 1-2 weeks, increased energy, and improved muscle definition.',
      es: 'Los usuarios reportan pérdida notable de grasa en 1-2 semanas, energía aumentada y definición muscular mejorada.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 2,
      fatLoss: 5,
      sideEffects: 3,
      retention: 3
    }
  },
  {
    id: 'aromasin',
    name: 'Aromasin (Exemestane)',
    price: 25,
    image: '/lovable-uploads/63f9d2b1-4c72-40c0-8434-8e48cade7de5.png',
    categories: ['pct'],
    featured: false,
    inStock: true,
    description: {
      en: 'Aromasin (Exemestane) is a potent aromatase inhibitor used in post cycle therapy.',
      es: 'Aromasin (Exemestane) es un potente inhibidor de aromatasa usado en terapia post ciclo.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: '4-6 weeks PCT',
        potencyLevel: 'High Aromatase Inhibition'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: '4-6 semanas PCT',
        potencyLevel: 'Alta inhibición de aromatasa'
      }
    },
    researchBackground: {
      en: 'Aromasin has been extensively studied as an aromatase inhibitor for controlling estrogen levels during and after anabolic cycles.',
      es: 'Aromasin ha sido extensamente estudiado como inhibidor de aromatasa para controlar niveles de estrógeno durante y después de ciclos anabólicos.'
    },
    benefits: {
      en: 'Blocks estrogen production, prevents gynecomastia, maintains testosterone levels, reduces water retention.',
      es: 'Bloquea producción de estrógeno, previene ginecomastia, mantiene niveles de testosterona, reduce retención de agua.'
    },
    sideEffects: {
      en: 'May cause joint pain, fatigue, hot flashes, decreased bone density.',
      es: 'Puede causar dolor articular, fatiga, sofocos, disminución de densidad ósea.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women as it can severely suppress estrogen levels.',
      es: 'No recomendado para mujeres ya que puede suprimir severamente los niveles de estrógeno.'
    },
    howItWorks: {
      en: 'Permanently binds to and inactivates aromatase enzyme, preventing conversion of testosterone to estrogen.',
      es: 'Se une permanentemente e inactiva la enzima aromatasa, previniendo la conversión de testosterona a estrógeno.'
    },
    safetyInformation: {
      en: 'Monitor estrogen levels regularly. Use only as needed to control estrogen-related side effects.',
      es: 'Monitorear niveles de estrógeno regularmente. Usar solo según necesario para controlar efectos secundarios relacionados con estrógeno.'
    },
    cycleInformation: {
      en: 'Typical use: 25mg every other day or as needed based on blood work.',
      es: 'Uso típico: 25mg cada dos días o según necesario basado en análisis de sangre.'
    },
    whatToExpect: {
      en: 'Users report reduced estrogen levels within days, prevention of estrogenic side effects, maintained muscle hardness, improved recovery.',
      es: 'Los usuarios reportan niveles de estrógeno reducidos en días, prevención de efectos secundarios estrogénicos, dureza muscular mantenida, recuperación mejorada.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 2,
      sideEffects: 3,
      retention: 4
    }
  },
  {
    id: 'accutane',
    name: 'Accutane (Isotretinoin)',
    price: 30,
    image: '/placeholder.svg',
    categories: ['skin-care'],
    featured: false,
    inStock: true,
    description: {
      en: 'Accutane (Isotretinoin) is a powerful oral medication used for severe acne treatment and prevention.',
      es: 'Accutane (Isotretinoína) es un medicamento oral potente utilizado para el tratamiento y prevención de acné severo.'
    },
    specifications: {
      en: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '16-24 weeks',
        potencyLevel: 'High Acne Treatment Efficacy'
      },
      es: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '16-24 semanas',
        potencyLevel: 'Alta eficacia para tratamiento de acné'
      }
    },
    researchBackground: {
      en: 'Accutane has been extensively studied for its ability to treat severe cystic acne and prevent scarring in clinical trials.',
      es: 'Accutane ha sido extensamente estudiado por su capacidad de tratar acné quístico severo y prevenir cicatrices en ensayos clínicos.'
    },
    benefits: {
      en: 'Dramatic acne reduction, prevents scarring, reduces oil production, long-lasting results, improves skin texture.',
      es: 'Reducción dramática del acné, previene cicatrices, reduce producción de grasa, resultados duraderos, mejora textura de la piel.'
    },
    sideEffects: {
      en: 'May cause dry skin, chapped lips, temporary skin irritation, possible mood changes, increased sun sensitivity, joint stiffness.',
      es: 'Puede causar piel seca, labios agrietados, irritación temporal de la piel, posibles cambios de humor, aumento de sensibilidad al sol, rigidez articular.'
    },
    effectsOnWomen: {
      en: 'Effective for women but requires careful monitoring. Must avoid pregnancy due to severe birth defect risks.',
      es: 'Efectivo para mujeres pero requiere monitoreo cuidadoso. Debe evitarse el embarazo debido a riesgos severos de defectos de nacimiento.'
    },
    howItWorks: {
      en: 'Reduces sebaceous gland size and oil production, normalizes skin cell turnover, and reduces inflammation.',
      es: 'Reduce el tamaño de las glándulas sebáceas y la producción de grasa, normaliza la renovación celular de la piel y reduce la inflamación.'
    },
    safetyInformation: {
      en: 'Requires regular blood work monitoring. Use effective contraception. Avoid vitamin A supplements. Stay hydrated.',
      es: 'Requiere monitoreo regular de análisis de sangre. Usar anticonceptivos efectivos. Evitar suplementos de vitamina A. Mantenerse hidratado.'
    },
    cycleInformation: {
      en: 'Typical treatment: 16-24 weeks at 0.5-1mg/kg daily. Taken with meals for better absorption.',
      es: 'Tratamiento típico: 16-24 semanas a 0.5-1mg/kg diario. Tomado con comidas para mejor absorción.'
    },
    whatToExpect: {
      en: 'Users report significant acne improvement within 8-12 weeks, with continued clearing throughout treatment. Results often permanent.',
      es: 'Los usuarios reportan mejora significativa del acné en 8-12 semanas, con aclaramiento continuo durante el tratamiento. Resultados a menudo permanentes.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 1,
      sideEffects: 3,
      retention: 5
    }
  }
];
