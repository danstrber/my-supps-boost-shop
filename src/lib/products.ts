export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string | { en: string; es: string };
  category: string;
  categories: string[];
  inStock: boolean;
  tags?: string[];
  featured?: boolean;
  labTestFile?: string;
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
  researchBackground: { en: string; es: string };
  benefits: { en: string; es: string };
  sideEffects: { en: string; es: string };
  effectsOnWomen: { en: string; es: string };
  howItWorks: { en: string; es: string };
  safetyInformation: { en: string; es: string };
  cycleInformation: { en: string; es: string };
  whatToExpect: { en: string; es: string };
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
    id: '1',
    name: 'Anavar',
    price: 15,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    description: { en: 'Premium Anavar for lean muscle gains', es: 'Anavar premium para ganancias de músculo magro' },
    category: 'oral',
    categories: ['oral', 'cutting'],
    inStock: true,
    tags: ['lean muscle', 'cutting'],
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
    },
    researchBackground: {
      en: 'Oxandrolone was first synthesized in 1962 and has been extensively studied for its anabolic properties with minimal androgenic effects.',
      es: 'La oxandrolona fue sintetizada por primera vez en 1962 y ha sido estudiada extensivamente por sus propiedades anabólicas con efectos androgénicos mínimos.'
    },
    benefits: {
      en: 'Promotes lean muscle growth, enhances strength, improves nitrogen retention, and aids in fat loss without water retention.',
      es: 'Promueve el crecimiento de músculo magro, mejora la fuerza, mejora la retención de nitrógeno, y ayuda en la pérdida de grasa sin retención de agua.'
    },
    sideEffects: {
      en: 'Generally mild side effects including possible liver stress, cholesterol changes, and natural testosterone suppression.',
      es: 'Efectos secundarios generalmente leves incluyendo posible estrés hepático, cambios en el colesterol, y supresión de testosterona natural.'
    },
    effectsOnWomen: {
      en: 'One of the most female-friendly compounds with low virilization risk when used at appropriate doses.',
      es: 'Uno de los compuestos más amigables para mujeres con bajo riesgo de virilización cuando se usa en dosis apropiadas.'
    },
    howItWorks: {
      en: 'Binds to androgen receptors to promote protein synthesis and nitrogen retention while having minimal conversion to estrogen.',
      es: 'Se une a los receptores de andrógenos para promover la síntesis de proteínas y retención de nitrógeno mientras tiene conversión mínima a estrógeno.'
    },
    safetyInformation: {
      en: 'Regular blood work recommended. Avoid alcohol and hepatotoxic substances. Post-cycle therapy may be necessary.',
      es: 'Se recomienda análisis de sangre regulares. Evitar alcohol y sustancias hepatotóxicas. Puede ser necesaria terapia post-ciclo.'
    },
    cycleInformation: {
      en: 'Typically used in cutting cycles at 20-80mg daily. Can be stacked with other compounds for enhanced results.',
      es: 'Típicamente usado en ciclos de corte a 20-80mg diarios. Puede ser combinado con otros compuestos para resultados mejorados.'
    },
    whatToExpect: {
      en: 'Expect gradual lean muscle gains, improved strength, enhanced vascularity, and better muscle definition.',
      es: 'Esperar ganancias graduales de músculo magro, fuerza mejorada, vascularidad mejorada, y mejor definición muscular.'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 4,
      fatLoss: 4,
      sideEffects: 2,
      retention: 4
    }
  },
  {
    id: '2',
    name: 'Winstrol',
    price: 10,
    image: '/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png',
    description: { en: 'High-quality Winstrol for enhanced performance', es: 'Winstrol de alta calidad para rendimiento mejorado' },
    category: 'oral',
    categories: ['oral', 'cutting'],
    inStock: true,
    tags: ['performance', 'strength'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'Stanozolol was developed in the 1960s and is known for its ability to enhance athletic performance and muscle definition.',
      es: 'El estanozolol fue desarrollado en los años 1960 y es conocido por su capacidad para mejorar el rendimiento atlético y la definición muscular.'
    },
    benefits: {
      en: 'Enhances strength and speed, promotes lean muscle mass, improves muscle definition, and increases vascularity.',
      es: 'Mejora la fuerza y velocidad, promueve masa muscular magra, mejora la definición muscular, y aumenta la vascularidad.'
    },
    sideEffects: {
      en: 'Possible joint pain, liver stress, cholesterol changes, and hair loss in predisposed individuals.',
      es: 'Posible dolor articular, estrés hepático, cambios en el colesterol, y pérdida de cabello en individuos predispuestos.'
    },
    effectsOnWomen: {
      en: 'Can be used by women but with caution due to moderate virilization risk. Low doses recommended.',
      es: 'Puede ser usado por mujeres pero con precaución debido al riesgo moderado de virilización. Se recomiendan dosis bajas.'
    },
    howItWorks: {
      en: 'Increases protein synthesis and reduces SHBG, leading to more free testosterone and enhanced muscle hardness.',
      es: 'Aumenta la síntesis de proteínas y reduce SHBG, llevando a más testosterona libre y dureza muscular mejorada.'
    },
    safetyInformation: {
      en: 'Monitor liver function and cholesterol levels. Joint support supplements recommended. Avoid extended use.',
      es: 'Monitorear función hepática y niveles de colesterol. Se recomiendan suplementos de soporte articular. Evitar uso extendido.'
    },
    cycleInformation: {
      en: 'Commonly used in cutting cycles at 25-50mg daily. Excellent for pre-competition preparation.',
      es: 'Comúnmente usado en ciclos de corte a 25-50mg diarios. Excelente para preparación pre-competencia.'
    },
    whatToExpect: {
      en: 'Expect increased strength, muscle hardness, improved definition, and enhanced athletic performance.',
      es: 'Esperar fuerza aumentada, dureza muscular, definición mejorada, y rendimiento atlético mejorado.'
    },
    performanceRatings: {
      muscleGain: 2,
      strength: 5,
      fatLoss: 3,
      sideEffects: 3,
      retention: 3
    }
  },
  {
    id: '3',
    name: 'Dbol (Dianabol)',
    price: 20,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    description: { en: 'Powerful Dianabol for rapid mass gains', es: 'Dianabol potente para ganancias rápidas de masa' },
    category: 'oral',
    categories: ['oral', 'mass-gain'],
    inStock: true,
    tags: ['mass gains', 'strength'],
    specifications: {
      en: {
        dosePerCapsule: '30mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '30mg',
        capsulesPerBottle: '100',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'Methandrostenolone was developed in the 1950s and is known for its potent anabolic effects and rapid muscle gains.',
      es: 'El metandrostenolona fue desarrollado en los años 1950 y es conocido por sus potentes efectos anabólicos y ganancias rápidas de músculo.'
    },
    benefits: {
      en: 'Rapid muscle mass increase, enhanced strength, improved protein synthesis, and increased nitrogen retention.',
      es: 'Aumento rápido de masa muscular, fuerza mejorada, síntesis de proteínas mejorada, y retención de nitrógeno aumentada.'
    },
    sideEffects: {
      en: 'Possible water retention, liver toxicity, increased blood pressure, and estrogenic side effects.',
      es: 'Posible retención de agua, toxicidad hepática, aumento de la presión arterial, y efectos secundarios estrogénicos.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to high virilization risk.',
      es: 'No recomendado para mujeres debido al alto riesgo de virilización.'
    },
    howItWorks: {
      en: 'Enhances protein synthesis and glycogenolysis, leading to rapid muscle growth and strength gains.',
      es: 'Mejora la síntesis de proteínas y la glucogenólisis, llevando a un rápido crecimiento muscular y ganancias de fuerza.'
    },
    safetyInformation: {
      en: 'Use with caution. Regular liver function tests recommended. Avoid prolonged use.',
      es: 'Usar con precaución. Se recomiendan pruebas regulares de función hepática. Evitar uso prolongado.'
    },
    cycleInformation: {
      en: 'Typically used in bulking cycles at 20-50mg daily for 4-6 weeks.',
      es: 'Típicamente usado en ciclos de volumen a 20-50mg diarios por 4-6 semanas.'
    },
    whatToExpect: {
      en: 'Expect rapid size and strength gains, possible water retention, and increased appetite.',
      es: 'Esperar ganancias rápidas de tamaño y fuerza, posible retención de agua, y aumento del apetito.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 1,
      sideEffects: 4,
      retention: 2
    }
  },
  {
    id: '4',
    name: 'Tren Ace (Trenbolone)',
    price: 35,
    image: '/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png',
    description: { en: 'Premium Trenbolone Acetate for serious athletes', es: 'Trenbolona acetato premium para atletas serios' },
    category: 'injectable',
    categories: ['injectable', 'cutting', 'strength'],
    inStock: true,
    tags: ['advanced', 'strength', 'cutting'],
    specifications: {
      en: {
        dosePerCapsule: '75mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '75mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Muy Alto'
      }
    },
    researchBackground: {
      en: 'Trenbolone is a powerful anabolic steroid originally developed for veterinary use, now popular among bodybuilders.',
      es: 'La trenbolona es un esteroide anabólico potente desarrollado originalmente para uso veterinario, ahora popular entre culturistas.'
    },
    benefits: {
      en: 'Increases muscle hardness, strength, fat loss, and nitrogen retention with no estrogenic effects.',
      es: 'Aumenta la dureza muscular, fuerza, pérdida de grasa, y retención de nitrógeno sin efectos estrogénicos.'
    },
    sideEffects: {
      en: 'Possible night sweats, insomnia, increased aggression, and cardiovascular strain.',
      es: 'Posibles sudores nocturnos, insomnio, aumento de agresividad, y tensión cardiovascular.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to high virilization risk.',
      es: 'No recomendado para mujeres debido al alto riesgo de virilización.'
    },
    howItWorks: {
      en: 'Binds strongly to androgen receptors, promoting protein synthesis and muscle growth.',
      es: 'Se une fuertemente a los receptores de andrógenos, promoviendo la síntesis de proteínas y el crecimiento muscular.'
    },
    safetyInformation: {
      en: 'Use with caution. Monitor cardiovascular health and mental state.',
      es: 'Usar con precaución. Monitorear la salud cardiovascular y el estado mental.'
    },
    cycleInformation: {
      en: 'Commonly used in cutting cycles at 50-100mg every other day for 8-12 weeks.',
      es: 'Comúnmente usado en ciclos de corte a 50-100mg día por medio por 8-12 semanas.'
    },
    whatToExpect: {
      en: 'Expect increased muscle density, strength, and fat loss with possible side effects.',
      es: 'Esperar aumento de densidad muscular, fuerza, y pérdida de grasa con posibles efectos secundarios.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 5,
      sideEffects: 4,
      retention: 5
    }
  },
  {
    id: '5',
    name: 'Test E (Testosterone)',
    price: 30,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    description: { en: 'High-grade Testosterone Enanthate', es: 'Testosterona enantato de alta calidad' },
    category: 'injectable',
    categories: ['injectable', 'base compound'],
    inStock: true,
    tags: ['testosterone', 'base compound'],
    specifications: {
      en: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '10-12 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '250mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '10-12 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'Testosterone Enanthate is a long-acting testosterone ester widely used for hormone replacement and bodybuilding.',
      es: 'La testosterona enantato es un éster de testosterona de acción prolongada ampliamente usado para reemplazo hormonal y culturismo.'
    },
    benefits: {
      en: 'Promotes muscle growth, strength, libido, and overall well-being.',
      es: 'Promueve crecimiento muscular, fuerza, libido, y bienestar general.'
    },
    sideEffects: {
      en: 'Possible estrogenic side effects, acne, hair loss, and suppression of natural testosterone.',
      es: 'Posibles efectos estrogénicos, acné, pérdida de cabello, y supresión de testosterona natural.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to virilization risk.',
      es: 'No recomendado para mujeres debido al riesgo de virilización.'
    },
    howItWorks: {
      en: 'Acts as the primary male androgen hormone, binding to androgen receptors to promote anabolic effects.',
      es: 'Actúa como la principal hormona androgénica masculina, uniéndose a receptores androgénicos para promover efectos anabólicos.'
    },
    safetyInformation: {
      en: 'Use under medical supervision. Monitor estrogen levels and cardiovascular health.',
      es: 'Usar bajo supervisión médica. Monitorear niveles de estrógeno y salud cardiovascular.'
    },
    cycleInformation: {
      en: 'Typically used as a base compound in cycles at 250-500mg weekly.',
      es: 'Típicamente usado como compuesto base en ciclos a 250-500mg semanalmente.'
    },
    whatToExpect: {
      en: 'Expect steady muscle gains, improved strength, and enhanced recovery.',
      es: 'Esperar ganancias musculares constantes, fuerza mejorada, y recuperación aumentada.'
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
    id: '6',
    name: 'Primo (Primobolan)',
    price: 40,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    description: { en: 'Premium Primobolan for quality gains', es: 'Primobolan premium para ganancias de calidad' },
    category: 'injectable',
    categories: ['injectable', 'mild'],
    inStock: true,
    tags: ['quality gains', 'mild'],
    specifications: {
      en: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '100mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Methenolone is known for its mild anabolic effects and low androgenic activity, popular for cutting cycles.',
      es: 'La metenolona es conocida por sus efectos anabólicos suaves y baja actividad androgénica, popular para ciclos de corte.'
    },
    benefits: {
      en: 'Promotes lean muscle retention, fat loss, and improved muscle hardness with minimal side effects.',
      es: 'Promueve retención de músculo magro, pérdida de grasa, y dureza muscular mejorada con efectos secundarios mínimos.'
    },
    sideEffects: {
      en: 'Generally mild side effects, low risk of estrogenic or androgenic effects.',
      es: 'Efectos secundarios generalmente leves, bajo riesgo de efectos estrogénicos o androgénicos.'
    },
    effectsOnWomen: {
      en: 'Considered one of the safer steroids for women at low doses.',
      es: 'Considerado uno de los esteroides más seguros para mujeres en dosis bajas.'
    },
    howItWorks: {
      en: 'Binds to androgen receptors to promote protein synthesis and nitrogen retention.',
      es: 'Se une a receptores androgénicos para promover síntesis de proteínas y retención de nitrógeno.'
    },
    safetyInformation: {
      en: 'Use with caution. Monitor liver function and hormone levels.',
      es: 'Usar con precaución. Monitorear función hepática y niveles hormonales.'
    },
    cycleInformation: {
      en: 'Used in cutting cycles at 400-600mg weekly for 8-12 weeks.',
      es: 'Usado en ciclos de corte a 400-600mg semanalmente por 8-12 semanas.'
    },
    whatToExpect: {
      en: 'Expect lean muscle retention, improved muscle hardness, and fat loss.',
      es: 'Esperar retención de músculo magro, dureza muscular mejorada, y pérdida de grasa.'
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
    id: '7',
    name: 'EQ (Equipoise)',
    price: 25,
    image: '/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png',
    description: { en: 'Equipoise for steady, quality muscle growth', es: 'Equipoise para crecimiento muscular constante y de calidad' },
    category: 'injectable',
    categories: ['injectable', 'mass-gain'],
    inStock: true,
    tags: ['steady gains', 'appetite'],
    specifications: {
      en: {
        dosePerCapsule: '200mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '10-12 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '200mg/ml',
        capsulesPerBottle: '10ml',
        typicalCycleLength: '10-12 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'Boldenone was originally developed for veterinary use and is known for steady muscle gains and appetite stimulation.',
      es: 'La boldenona fue desarrollada originalmente para uso veterinario y es conocida por ganancias musculares constantes y estimulación del apetito.'
    },
    benefits: {
      en: 'Promotes lean muscle mass, increases appetite, and improves red blood cell production.',
      es: 'Promueve masa muscular magra, aumenta el apetito, y mejora la producción de glóbulos rojos.'
    },
    sideEffects: {
      en: 'Possible mild androgenic effects, increased blood pressure, and estrogenic side effects.',
      es: 'Posibles efectos androgénicos leves, aumento de la presión arterial, y efectos estrogénicos.'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to virilization risk.',
      es: 'No recomendado para mujeres debido al riesgo de virilización.'
    },
    howItWorks: {
      en: 'Binds to androgen receptors to promote anabolic effects and increase protein synthesis.',
      es: 'Se une a receptores androgénicos para promover efectos anabólicos y aumentar la síntesis de proteínas.'
    },
    safetyInformation: {
      en: 'Use with caution. Monitor blood pressure and estrogen levels.',
      es: 'Usar con precaución. Monitorear presión arterial y niveles de estrógeno.'
    },
    cycleInformation: {
      en: 'Used in bulking cycles at 300-600mg weekly for 10-12 weeks.',
      es: 'Usado en ciclos de volumen a 300-600mg semanalmente por 10-12 semanas.'
    },
    whatToExpect: {
      en: 'Expect steady muscle gains, increased appetite, and improved endurance.',
      es: 'Esperar ganancias musculares constantes, aumento del apetito, y mejora de la resistencia.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 3,
      fatLoss: 2,
      sideEffects: 3,
      retention: 4
    }
  },
  {
    id: '8',
    name: 'RAD-140 (Testolone)',
    price: 55,
    image: '/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png',
    description: { en: 'Powerful SARM for muscle building', es: 'SARM potente para construcción muscular' },
    category: 'sarms',
    categories: ['sarms', 'muscle-building'],
    inStock: true,
    tags: ['SARM', 'muscle building'],
    specifications: {
      en: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Muy Alto'
      }
    },
    researchBackground: {
      en: 'RAD-140 is a selective androgen receptor modulator known for its anabolic effects without androgenic side effects.',
      es: 'RAD-140 es un modulador selectivo del receptor androgénico conocido por sus efectos anabólicos sin efectos androgénicos.'
    },
    benefits: {
      en: 'Promotes lean muscle growth, strength, and fat loss with minimal side effects.',
      es: 'Promueve crecimiento muscular magro, fuerza, y pérdida de grasa con efectos secundarios mínimos.'
    },
    sideEffects: {
      en: 'Generally well tolerated, possible mild testosterone suppression.',
      es: 'Generalmente bien tolerado, posible supresión leve de testosterona.'
    },
    effectsOnWomen: {
      en: 'Limited data, use with caution.',
      es: 'Datos limitados, usar con precaución.'
    },
    howItWorks: {
      en: 'Binds selectively to androgen receptors in muscle and bone, promoting anabolic activity.',
      es: 'Se une selectivamente a receptores androgénicos en músculo y hueso, promoviendo actividad anabólica.'
    },
    safetyInformation: {
      en: 'Use responsibly. Monitor hormone levels.',
      es: 'Usar responsablemente. Monitorear niveles hormonales.'
    },
    cycleInformation: {
      en: 'Typical cycles last 8-12 weeks at 10-30mg daily.',
      es: 'Ciclos típicos duran 8-12 semanas a 10-30mg diarios.'
    },
    whatToExpect: {
      en: 'Expect lean muscle gains, improved strength, and fat loss.',
      es: 'Esperar ganancias musculares magras, fuerza mejorada, y pérdida de grasa.'
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 4,
      sideEffects: 1,
      retention: 5
    }
  },
  {
    id: '9',
    name: 'MK-677 (Ibutamoren)',
    price: 65,
    image: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    description: { en: 'Growth hormone secretagogue', es: 'Secretagogo de hormona de crecimiento' },
    category: 'sarms',
    categories: ['sarms', 'recovery'],
    inStock: true,
    tags: ['GH secretagogue', 'recovery'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Moderate'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Moderado'
      }
    },
    researchBackground: {
      en: 'MK-677 stimulates growth hormone release and is used for muscle growth and recovery.',
      es: 'MK-677 estimula la liberación de hormona de crecimiento y se usa para crecimiento muscular y recuperación.'
    },
    benefits: {
      en: 'Increases growth hormone and IGF-1 levels, promotes muscle growth and fat loss.',
      es: 'Aumenta niveles de hormona de crecimiento e IGF-1, promueve crecimiento muscular y pérdida de grasa.'
    },
    sideEffects: {
      en: 'Possible increased appetite, water retention, and mild fatigue.',
      es: 'Posible aumento del apetito, retención de agua, y fatiga leve.'
    },
    effectsOnWomen: {
      en: 'Limited data, use with caution.',
      es: 'Datos limitados, usar con precaución.'
    },
    howItWorks: {
      en: 'Mimics ghrelin and binds to growth hormone secretagogue receptor to stimulate GH release.',
      es: 'Imita la grelina y se une al receptor secretagogo de hormona de crecimiento para estimular la liberación de GH.'
    },
    safetyInformation: {
      en: 'Use responsibly. Monitor blood sugar and water retention.',
      es: 'Usar responsablemente. Monitorear azúcar en sangre y retención de agua.'
    },
    cycleInformation: {
      en: 'Typical cycles last 8-12 weeks at 10-25mg daily.',
      es: 'Ciclos típicos duran 8-12 semanas a 10-25mg diarios.'
    },
    whatToExpect: {
      en: 'Expect improved recovery, muscle growth, and better sleep.',
      es: 'Esperar mejor recuperación, crecimiento muscular, y mejor sueño.'
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 3,
      fatLoss: 3,
      sideEffects: 2,
      retention: 4
    }
  },
  {
    id: '10',
    name: 'LGD-4033 (Ligandrol)',
    price: 50,
    image: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    description: { en: 'Selective androgen receptor modulator', es: 'Modulador selectivo del receptor androgénico' },
    category: 'sarms',
    categories: ['sarms', 'strength'],
    inStock: true,
    tags: ['SARM', 'strength'],
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'High'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '30',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Alto'
      }
    },
    researchBackground: {
      en: 'LGD-4033 is a potent SARM that promotes muscle growth and strength without androgenic side effects.',
      es: 'LGD-4033 es un SARM potente que promueve crecimiento muscular y fuerza sin efectos androgénicos.'
    },
    benefits: {
      en: 'Increases lean muscle mass, strength, and bone density.',
      es: 'Aumenta masa muscular magra, fuerza, y densidad ósea.'
    },
    sideEffects: {
      en: 'Possible testosterone suppression, mild side effects.',
      es: 'Posible supresión de testosterona, efectos secundarios leves.'
    },
    effectsOnWomen: {
      en: 'Limited data, use with caution.',
      es: 'Datos limitados, usar con precaución.'
    },
    howItWorks: {
      en: 'Binds selectively to androgen receptors to promote anabolic activity.',
      es: 'Se une selectivamente a receptores androgénicos para promover actividad anabólica.'
    },
    safetyInformation: {
      en: 'Use responsibly. Monitor hormone levels.',
      es: 'Usar responsablemente. Monitorear niveles hormonales.'
    },
    cycleInformation: {
      en: 'Typical cycles last 8-12 weeks at 5-10mg daily.',
      es: 'Ciclos típicos duran 8-12 semanas a 5-10mg diarios.'
    },
    whatToExpect: {
      en: 'Expect lean muscle gains and improved strength.',
      es: 'Esperar ganancias musculares magras y fuerza mejorada.'
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
    id: '11',
    name: 'Clen (Clenbuterol)',
    price: 20,
    image: '/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png',
    description: { en: 'Premium Clenbuterol for fat burning', es: 'Clenbuterol premium para quemar grasa' },
    category: 'fat-burner',
    categories: ['fat-burner', 'cutting'],
    inStock: true,
    tags: ['fat burner', 'thermogenic', 'lab tested'],
    featured: true,
    labTestFile: '/lovable-uploads/clen-lab-test.pdf',
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '100',
        typicalCycleLength: '2 weeks on/off',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '100',
        typicalCycleLength: '2 semanas sí/no',
        potencyLevel: 'Muy Alto'
      }
    },
    researchBackground: {
      en: 'Clenbuterol is a beta-2 agonist originally developed for treating asthma, later found to have potent fat-burning properties.',
      es: 'El clenbuterol es un agonista beta-2 originalmente desarrollado para tratar asma, posteriormente se encontró que tiene propiedades potentes para quemar grasa.'
    },
    benefits: {
      en: 'Rapid fat loss, increased metabolic rate, appetite suppression, and preservation of lean muscle during cutting.',
      es: 'Pérdida rápida de grasa, tasa metabólica aumentada, supresión del apetito, y preservación de músculo magro durante el corte.'
    },
    sideEffects: {
      en: 'Possible tremors, increased heart rate, insomnia, anxiety, and electrolyte imbalances.',
      es: 'Posibles temblores, ritmo cardíaco aumentado, insomnio, ansiedad, y desequilibrios electrolíticos.'
    },
    effectsOnWomen: {
      en: 'Highly effective for women with no virilization risk, but cardiovascular effects should be monitored.',
      es: 'Altamente efectivo para mujeres sin riesgo de virilización, pero los efectos cardiovasculares deben ser monitoreados.'
    },
    howItWorks: {
      en: 'Stimulates beta-2 receptors to increase thermogenesis and metabolic rate, leading to enhanced fat oxidation.',
      es: 'Estimula los receptores beta-2 para aumentar la termogénesis y tasa metabólica, llevando a oxidación de grasa mejorada.'
    },
    safetyInformation: {
      en: 'Start with low doses and gradually increase. Monitor heart rate and blood pressure. Avoid stimulants.',
      es: 'Comenzar con dosis bajas y aumentar gradualmente. Monitorear ritmo cardíaco y presión arterial. Evitar estimulantes.'
    },
    cycleInformation: {
      en: 'Typically used in 2-week cycles starting at 20mcg and increasing to 120mcg maximum.',
      es: 'Típicamente usado en ciclos de 2 semanas comenzando en 20mcg y aumentando a 120mcg máximo.'
    },
    whatToExpect: {
      en: 'Expect rapid fat loss, increased energy, elevated body temperature, and improved muscle definition.',
      es: 'Esperar pérdida rápida de grasa, energía aumentada, temperatura corporal elevada, y definición muscular mejorada.'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 2,
      fatLoss: 5,
      sideEffects: 4,
      retention: 2
    }
  },
  {
    id: '30',
    name: 'Aormsim',
    price: 89,
    image: '/lovable-uploads/756705df-6c03-4a50-ac06-0882a2f0bda2.png',
    description: { en: 'Advanced research compound for enhanced performance', es: 'Compuesto de investigación avanzado para rendimiento mejorado' },
    category: 'research',
    categories: ['research', 'advanced'],
    inStock: true,
    tags: ['research compound', 'performance'],
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Very High'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '10',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Muy Alto'
      }
    },
    researchBackground: {
      en: 'Aromasin (Exemestane) is a third-generation aromatase inhibitor that permanently binds to aromatase enzymes.',
      es: 'Aromasin (Exemestano) es un inhibidor de aromatasa de tercera generación que se une permanentemente a las enzimas aromatasa.'
    },
    benefits: {
      en: 'Effectively reduces estrogen levels, prevents gynecomastia, and may increase natural testosterone production.',
      es: 'Reduce efectivamente los niveles de estrógeno, previene ginecomastia, y puede aumentar la producción natural de testosterona.'
    },
    sideEffects: {
      en: 'Possible joint pain, decreased bone density, mood changes, and reduced HDL cholesterol.',
      es: 'Posible dolor articular, densidad ósea disminuida, cambios de humor, y colesterol HDL reducido.'
    },
    effectsOnWomen: {
      en: 'Used in post-menopausal women for breast cancer treatment. Not recommended for premenopausal women.',
      es: 'Usado en mujeres postmenopáusicas para tratamiento de cáncer de mama. No recomendado para mujeres premenopáusicas.'
    },
    howItWorks: {
      en: 'Irreversibly binds to aromatase enzymes, preventing the conversion of androgens to estrogens.',
      es: 'Se une irreversiblemente a las enzimas aromatasa, previniendo la conversión de andrógenos a estrógenos.'
    },
    safetyInformation: {
      en: 'Monitor bone health and cholesterol levels. Regular blood work essential. Use only when necessary.',
      es: 'Monitorear salud ósea y niveles de colesterol. Análisis de sangre regulares esenciales. Usar solo cuando sea necesario.'
    },
    cycleInformation: {
      en: 'Typically used at 12.5-25mg every other day during and after steroid cycles.',
      es: 'Típicamente usado a 12.5-25mg cada dos días durante y después de ciclos de esteroides.'
    },
    whatToExpect: {
      en: 'Expect reduced estrogen-related side effects, prevention of gynecomastia, and potential testosterone boost.',
      es: 'Esperar efectos secundarios relacionados con estrógeno reducidos, prevención de ginecomastia, y potencial aumento de testosterona.'
    },
    performanceRatings: {
      muscleGain: 2,
      strength: 3,
      fatLoss: 2,
      sideEffects: 3,
      retention: 4
    }
  }
];
