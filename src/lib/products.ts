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
}

export const products: Product[] = [
  {
    id: 'superdrol',
    name: 'Superdrol',
    price: 39.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    categories: ['oral-steroids'],
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
    id: 'anavar',
    name: 'Anavar',
    price: 39.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    categories: ['oral-steroids'],
    description: {
      en: 'Anavar (Oxandrolone) is a mild oral anabolic steroid known for promoting lean muscle gains and strength increases with relatively low side effects.',
      es: 'Anavar (Oxandrolona) es un esteroide anabólico oral suave conocido por promover ganancias de músculo magro y aumentos de fuerza con efectos secundarios relativamente bajos.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Moderate Anabolic Potency'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Potencia anabólica moderada'
      }
    },
    researchBackground: {
      en: 'Anavar (Oxandrolone) has been studied for its anabolic effects in various clinical settings, including muscle wasting diseases and recovery from burns.',
      es: 'Anavar (Oxandrolona) ha sido estudiado por sus efectos anabólicos en varios entornos clínicos, incluyendo enfermedades de desgaste muscular y recuperación de quemaduras.'
    },
    benefits: {
      en: 'Lean muscle gains, increased strength, enhanced fat loss, improved vascularity, minimal water retention.',
      es: 'Ganancias de músculo magro, aumento de fuerza, pérdida de grasa mejorada, vascularidad mejorada, retención mínima de agua.'
    },
    sideEffects: {
      en: 'Mild liver toxicity, cholesterol imbalances, testosterone suppression, possible hair loss, acne, virilization in women.',
      es: 'Toxicidad hepática leve, desequilibrios de colesterol, supresión de testosterona, posible pérdida de cabello, acné, virilización en mujeres.'
    },
    effectsOnWomen: {
      en: 'Can be used by women at low doses, but virilization is still a risk. Monitor for masculine side effects.',
      es: 'Puede ser utilizado por mujeres en dosis bajas, pero la virilización sigue siendo un riesgo. Monitorear los efectos secundarios masculinos.'
    },
    howItWorks: {
      en: 'Binds to androgen receptors, promoting protein synthesis and muscle growth while increasing nitrogen retention.',
      es: 'Se une a los receptores de andrógenos, promoviendo la síntesis de proteínas y el crecimiento muscular mientras aumenta la retención de nitrógeno.'
    },
    safetyInformation: {
      en: 'Requires liver support (NAC, TUDCA), regular blood work monitoring, and proper post-cycle therapy. Not for beginners.',
      es: 'Requiere apoyo hepático (NAC, TUDCA), monitoreo regular de análisis de sangre y terapia post-ciclo adecuada. No para principiantes.'
    },
    cycleInformation: {
      en: 'Typical cycles: 6-8 weeks. Always followed by comprehensive PCT.',
      es: 'Ciclos típicos: 6-8 semanas. Siempre seguido por PCT integral.'
    },
    whatToExpect: {
      en: 'Users typically gain 4-6 lbs of lean muscle in 6-8 weeks with noticeable strength increases. Results are maintainable with proper PCT.',
      es: 'Los usuarios típicamente ganan 4-6 lbs de músculo magro en 6-8 semanas con aumentos de fuerza notables. Los resultados son mantenibles con PCT adecuado.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 4,
      fatLoss: 4,
      sideEffects: 3,
      retention: 5
    }
  },
  {
    id: 'dianabol',
    name: 'Dianabol',
    price: 39.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    categories: ['oral-steroids'],
    description: {
      en: 'Dianabol (Methandrostenolone) is a potent oral anabolic steroid known for rapid muscle mass gains and significant strength increases.',
      es: 'Dianabol (Metandrostenolona) es un esteroide anabólico oral potente conocido por ganancias rápidas de masa muscular y aumentos significativos de fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'High Anabolic Potency'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Potencia anabólica alta'
      }
    },
    researchBackground: {
      en: 'Dianabol (Methandrostenolone) has been extensively studied for its anabolic effects and muscle-building capabilities in research settings.',
      es: 'Dianabol (Metandrostenolona) ha sido extensamente estudiado por sus efectos anabólicos y capacidades de construcción muscular en entornos de investigación.'
    },
    benefits: {
      en: 'Rapid muscle mass gains (10-15 lbs in 4 weeks), dramatic strength increases, enhanced protein synthesis, improved nitrogen retention, increased glycogenolysis.',
      es: 'Ganancias rápidas de masa muscular (10-15 lbs en 4 semanas), aumentos dramáticos de fuerza, síntesis proteica mejorada, retención de nitrógeno mejorada, aumento de la glucogenólisis.'
    },
    sideEffects: {
      en: 'Hepatotoxicity (liver stress), cardiovascular strain, elevated blood pressure, cholesterol imbalances, testosterone suppression, estrogenic effects (water retention, gynecomastia).',
      es: 'Hepatotoxicidad (estrés hepático), tensión cardiovascular, elevación de presión arterial, desequilibrios de colesterol, supresión de testosterona, efectos estrogénicos (retención de agua, ginecomastia).'
    },
    effectsOnWomen: {
      en: 'NOT RECOMMENDED for women due to high risk of virilization. May cause permanent masculine characteristics, voice deepening, and severe hormonal disruption.',
      es: 'NO RECOMENDADO para mujeres debido al alto riesgo de virilización. Puede causar características masculinas permanentes, profundización de la voz y disrupción hormonal severa.'
    },
    howItWorks: {
      en: 'Binds strongly to androgen receptors, promoting intense protein synthesis and muscle growth while increasing glycogenolysis.',
      es: 'Se une fuertemente a los receptores de andrógenos, promoviendo síntesis proteica intensa y crecimiento muscular mientras aumenta la glucogenólisis.'
    },
    safetyInformation: {
      en: 'Requires liver support (NAC, TUDCA), aromatase inhibitors (Arimidex, Aromasin), regular blood work monitoring, and proper post-cycle therapy. Not for beginners.',
      es: 'Requiere apoyo hepático (NAC, TUDCA), inhibidores de la aromatasa (Arimidex, Aromasin), monitoreo regular de análisis de sangre y terapia post-ciclo adecuada. No para principiantes.'
    },
    cycleInformation: {
      en: 'Typical cycles: 4-6 weeks. Always followed by comprehensive PCT.',
      es: 'Ciclos típicos: 4-6 semanas. Siempre seguido por PCT integral.'
    },
    whatToExpect: {
      en: 'Users typically gain 10-15 lbs of muscle mass in 4 weeks with significant strength increases. Results are dramatic but require proper PCT to maintain.',
      es: 'Los usuarios típicamente ganan 10-15 lbs de masa muscular en 4 semanas con aumentos significativos de fuerza. Los resultados son dramáticos pero requieren PCT adecuado para mantener.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 2,
      sideEffects: 2,
      retention: 3
    }
  },
    {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 39.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    categories: ['fat-burners'],
    description: {
      en: 'Clenbuterol is a powerful thermogenic stimulant known for its fat-burning and energy-boosting effects.',
      es: 'Clenbuterol es un estimulante termogénico potente conocido por sus efectos quemagrasas y energizantes.'
    },
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '60',
        typicalCycleLength: '2 weeks on, 2 weeks off',
        potencyLevel: 'High Thermogenic Potency'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '60',
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
    id: 'nolvadex',
    name: 'Nolvadex (Tamoxifen)',
    price: 39.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    categories: ['pct'],
    description: {
      en: 'Nolvadex (Tamoxifen) is a selective estrogen receptor modulator (SERM) used to prevent estrogenic side effects and restore natural testosterone production after anabolic cycles.',
      es: 'Nolvadex (Tamoxifeno) es un modulador selectivo del receptor de estrógeno (SERM) utilizado para prevenir los efectos secundarios estrogénicos y restaurar la producción natural de testosterona después de los ciclos anabólicos.'
    },
    specifications: {
      en: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Moderate Estrogen Modulation'
      },
      es: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Modulación de estrógeno moderada'
      }
    },
    researchBackground: {
      en: 'Nolvadex (Tamoxifen) has been extensively studied for its anti-estrogenic effects and its ability to prevent gynecomastia and other estrogen-related side effects.',
      es: 'Nolvadex (Tamoxifeno) ha sido extensamente estudiado por sus efectos antiestrogénicos y su capacidad para prevenir la ginecomastia y otros efectos secundarios relacionados con el estrógeno.'
    },
    benefits: {
      en: 'Prevents gynecomastia, restores natural testosterone production, reduces water retention, improves cholesterol levels.',
      es: 'Previene la ginecomastia, restaura la producción natural de testosterona, reduce la retención de agua, mejora los niveles de colesterol.'
    },
    sideEffects: {
      en: 'Hot flashes, mood changes, nausea, fatigue, possible blood clots.',
      es: 'Bochornos, cambios de humor, náuseas, fatiga, posibles coágulos de sangre.'
    },
    effectsOnWomen: {
      en: 'Used in women for breast cancer treatment. Not recommended for performance enhancement.',
      es: 'Utilizado en mujeres para el tratamiento del cáncer de mama. No recomendado para la mejora del rendimiento.'
    },
    howItWorks: {
      en: 'Selectively blocks estrogen receptors in breast tissue, preventing estrogenic effects.',
      es: 'Bloquea selectivamente los receptores de estrógeno en el tejido mamario, previniendo los efectos estrogénicos.'
    },
    safetyInformation: {
      en: 'Monitor for blood clot symptoms. Not for individuals with a history of blood clots.',
      es: 'Monitorear los síntomas de coágulos de sangre. No para personas con antecedentes de coágulos de sangre.'
    },
    cycleInformation: {
      en: 'Typical cycles: 4-6 weeks after anabolic cycles.',
      es: 'Ciclos típicos: 4-6 semanas después de los ciclos anabólicos.'
    },
    whatToExpect: {
      en: 'Prevention of estrogenic side effects and restoration of natural testosterone production.',
      es: 'Prevención de los efectos secundarios estrogénicos y restauración de la producción natural de testosterona.'
    },
    performanceRatings: {
      muscleGain: 0,
      strength: 0,
      fatLoss: 0,
      sideEffects: 4,
      retention: 5
    }
  },
  {
    id: 'mk-677',
    name: 'MK-677 (50 pills)',
    price: 39.99,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    categories: ['growth'],
    description: {
      en: 'MK-677 is a growth hormone secretagogue that stimulates natural growth hormone production.',
      es: 'MK-677 es un secretagogo de hormona de crecimiento que estimula la producción natural de hormona de crecimiento.'
    },
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '50',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High Growth Hormone Stimulation'
      },
      es: {
        dosePerCapsule: '25mg',
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
    name: 'RAD-140 (Testolone)',
    price: 39.99,
    image: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    categories: ['sarms'],
    description: {
      en: 'RAD-140 is a selective androgen receptor modulator (SARM) known for significant muscle and strength gains.',
      es: 'RAD-140 es un modulador selectivo del receptor de andrógenos (SARM) conocido por ganancias significativas de músculo y fuerza.'
    },
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High Anabolic Activity'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60',
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
  }
];
