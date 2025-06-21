
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 25,
    image: '/lovable-uploads/clenbuterol.jpg',
    tags: ['Fat Burner', 'Lab Tested'],
    description: {
      en: 'Powerful thermogenic fat burner for cutting cycles.',
      es: 'Potente quemador de grasa termogénico para ciclos de definición.'
    },
    categories: ['fat-burner', 'cutting'],
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/clenbuterol-lab-test.jpg',
    specifications: {
      en: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '100 capsules',
        typicalCycleLength: '2 weeks on, 2 weeks off',
        potencyLevel: 'High potency thermogenic'
      },
      es: {
        dosePerCapsule: '40mcg',
        capsulesPerBottle: '100 cápsulas',
        typicalCycleLength: '2 semanas sí, 2 semanas no',
        potencyLevel: 'Termogénico de alta potencia'
      }
    },
    benefits: {
      en: 'Rapid fat loss, increased metabolic rate, enhanced energy levels, appetite suppression',
      es: 'Pérdida rápida de grasa, aumento del metabolismo, mayor energía, supresión del apetito'
    },
    sideEffects: {
      en: 'Jitters, increased heart rate, sweating, insomnia, muscle cramps',
      es: 'Nerviosismo, aumento del ritmo cardíaco, sudoración, insomnio, calambres musculares'
    },
    effectsOnWomen: {
      en: 'Very effective for women, lower doses recommended (20-40mcg)',
      es: 'Muy efectivo para mujeres, se recomiendan dosis más bajas (20-40mcg)'
    },
    safetyInformation: {
      en: 'Start with low doses, monitor heart rate, avoid if you have heart conditions',
      es: 'Comenzar con dosis bajas, monitorear ritmo cardíaco, evitar si tiene problemas cardíacos'
    },
    howItWorks: {
      en: 'Stimulates beta-2 receptors, increases thermogenesis and metabolic rate',
      es: 'Estimula receptores beta-2, aumenta termogénesis y tasa metabólica'
    },
    whatToExpect: {
      en: 'Noticeable fat loss within 1-2 weeks, increased energy and focus',
      es: 'Pérdida de grasa notable en 1-2 semanas, mayor energía y concentración'
    },
    cycleInformation: {
      en: '2 weeks on, 2 weeks off to prevent receptor downregulation',
      es: '2 semanas sí, 2 semanas no para prevenir la regulación negativa de receptores'
    },
    researchBackground: {
      en: 'Originally developed as a bronchodilator, extensively studied for fat loss properties',
      es: 'Originalmente desarrollado como broncodilatador, ampliamente estudiado por propiedades quemagrasa'
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
    id: 'accutane',
    name: 'Accutane',
    price: 30,
    image: '/lovable-uploads/accutane.jpg',
    tags: ['Acne Treatment'],
    description: {
      en: 'Isotretinoin 20mg - 50 pills. Effective acne treatment.',
      es: 'Isotretinoína 20mg - 50 píldoras. Tratamiento efectivo para el acné.'
    },
    categories: ['acne-treatment', 'health'],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '50 pills',
        typicalCycleLength: '4-6 months',
        potencyLevel: 'Prescription strength'
      },
      es: {
        dosePerCapsule: '20mg',
        capsulesPerBottle: '50 píldoras',
        typicalCycleLength: '4-6 meses',
        potencyLevel: 'Fuerza de prescripción'
      }
    },
    benefits: {
      en: 'Clears severe acne, reduces oil production, prevents scarring',
      es: 'Elimina acné severo, reduce producción de grasa, previene cicatrices'
    },
    sideEffects: {
      en: 'Dry skin, chapped lips, mood changes, birth defects if pregnant',
      es: 'Piel seca, labios agrietados, cambios de humor, defectos de nacimiento si embarazada'
    },
    effectsOnWomen: {
      en: 'Highly effective but requires pregnancy prevention due to teratogenic effects',
      es: 'Muy efectivo pero requiere prevención del embarazo por efectos teratogénicos'
    },
    safetyInformation: {
      en: 'Regular blood tests required, avoid pregnancy, use moisturizers',
      es: 'Se requieren análisis de sangre regulares, evitar embarazo, usar humectantes'
    },
    howItWorks: {
      en: 'Reduces sebaceous gland size and oil production, normalizes skin cell turnover',
      es: 'Reduce tamaño de glándulas sebáceas y producción de grasa, normaliza renovación celular'
    },
    whatToExpect: {
      en: 'Initial flare-up possible, clear skin within 3-4 months',
      es: 'Posible brote inicial, piel clara en 3-4 meses'
    },
    cycleInformation: {
      en: 'Single course treatment, typically 4-6 months duration',
      es: 'Tratamiento de curso único, típicamente 4-6 meses de duración'
    },
    researchBackground: {
      en: 'FDA approved retinoid derivative, gold standard for severe acne treatment',
      es: 'Derivado de retinoide aprobado por FDA, estándar de oro para acné severo'
    },
    performanceRatings: {
      muscleGain: 0,
      strength: 0,
      fatLoss: 0,
      sideEffects: 3,
      retention: 5
    }
  },
  {
    id: 'anavar',
    name: 'Anavar',
    price: 60,
    image: '/lovable-uploads/anavar.jpg',
    tags: ['Cutting', 'Muscle Hardening'],
    description: {
      en: 'Boost strength and cut fat without water retention.',
      es: 'Aumenta fuerza y quema grasa sin retención de agua.'
    },
    categories: ['cutting', 'strength'],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60 capsules',
        typicalCycleLength: '6-8 weeks',
        potencyLevel: 'Mild to moderate'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '60 cápsulas',
        typicalCycleLength: '6-8 semanas',
        potencyLevel: 'Leve a moderado'
      }
    },
    benefits: {
      en: 'Lean muscle gains, fat loss, increased strength, minimal side effects',
      es: 'Ganancias musculares magras, pérdida de grasa, mayor fuerza, efectos secundarios mínimos'
    },
    sideEffects: {
      en: 'Mild liver stress, cholesterol changes, potential hair loss',
      es: 'Estrés hepático leve, cambios en colesterol, posible pérdida de cabello'
    },
    effectsOnWomen: {
      en: 'Very popular with women, low virilization risk at proper doses',
      es: 'Muy popular entre mujeres, bajo riesgo de virilización a dosis apropiadas'
    },
    safetyInformation: {
      en: 'Monitor liver function, use liver support, moderate doses recommended',
      es: 'Monitorear función hepática, usar soporte hepático, dosis moderadas recomendadas'
    },
    howItWorks: {
      en: 'Increases protein synthesis, enhances nitrogen retention, promotes fat oxidation',
      es: 'Aumenta síntesis de proteínas, mejora retención de nitrógeno, promueve oxidación de grasa'
    },
    whatToExpect: {
      en: 'Gradual strength gains, muscle hardening, fat loss over 4-6 weeks',
      es: 'Ganancias graduales de fuerza, endurecimiento muscular, pérdida de grasa en 4-6 semanas'
    },
    cycleInformation: {
      en: 'Typically 6-8 weeks, can be stacked with other compounds',
      es: 'Típicamente 6-8 semanas, puede combinarse con otros compuestos'
    },
    researchBackground: {
      en: 'Developed in the 1960s, extensively studied for muscle wasting conditions',
      es: 'Desarrollado en los años 60, ampliamente estudiado para condiciones de desgaste muscular'
    },
    performanceRatings: {
      muscleGain: 2,
      strength: 4,
      fatLoss: 4,
      sideEffects: 2,
      retention: 3
    }
  },
  {
    id: 'superdrol',
    name: 'Superdrol',
    price: 75,
    image: '/lovable-uploads/superdrol.jpg',
    tags: ['Muscle Builder', 'Strength', 'Lab Tested'],
    description: {
      en: 'Powerful muscle builder for serious gains in size and strength.',
      es: 'Constructor muscular potente para ganancias serias en tamaño y fuerza.'
    },
    categories: ['muscle-builder', 'strength'],
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    specifications: {
      en: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100 capsules',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Very high potency'
      },
      es: {
        dosePerCapsule: '10mg',
        capsulesPerBottle: '100 cápsulas',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'Potencia muy alta'
      }
    },
    benefits: {
      en: 'Rapid muscle gains, incredible strength increases, enhanced protein synthesis',
      es: 'Ganancias musculares rápidas, aumentos increíbles de fuerza, síntesis proteica mejorada'
    },
    sideEffects: {
      en: 'Liver stress, blood pressure changes, potential hair loss, suppression',
      es: 'Estrés hepático, cambios en presión arterial, posible pérdida de cabello, supresión'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to high androgenic effects',
      es: 'No recomendado para mujeres debido a altos efectos androgénicos'
    },
    safetyInformation: {
      en: 'Use liver protection, monitor blood pressure, short cycles only',
      es: 'Usar protección hepática, monitorear presión arterial, solo ciclos cortos'
    },
    howItWorks: {
      en: 'Dramatically increases protein synthesis and nitrogen retention',
      es: 'Aumenta dramáticamente la síntesis de proteínas y retención de nitrógeno'
    },
    whatToExpect: {
      en: 'Significant muscle and strength gains within 2-3 weeks',
      es: 'Ganancias significativas de músculo y fuerza en 2-3 semanas'
    },
    cycleInformation: {
      en: 'Short cycles recommended (4-6 weeks maximum)',
      es: 'Se recomiendan ciclos cortos (4-6 semanas máximo)'
    },
    researchBackground: {
      en: 'Developed in the early 2000s, known for rapid muscle building effects',
      es: 'Desarrollado a principios de los 2000s, conocido por efectos rápidos de construcción muscular'
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
    id: 'aromasin',
    name: 'Aromasin',
    price: 40,
    image: '/lovable-uploads/aromasin.jpg',
    tags: ['PCT', 'Estrogen Control'],
    description: {
      en: 'Powerful aromatase inhibitor for estrogen control and PCT.',
      es: 'Potente inhibidor de aromatasa para control de estrógeno y PCT.'
    },
    categories: ['pct', 'support'],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30 capsules',
        typicalCycleLength: '4-8 weeks',
        potencyLevel: 'High potency AI'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '30 cápsulas',
        typicalCycleLength: '4-8 semanas',
        potencyLevel: 'IA de alta potencia'
      }
    },
    benefits: {
      en: 'Prevents gynecomastia, reduces water retention, maintains testosterone levels',
      es: 'Previene ginecomastia, reduce retención de agua, mantiene niveles de testosterona'
    },
    sideEffects: {
      en: 'Joint pain, mood swings, potential cholesterol changes',
      es: 'Dolor articular, cambios de humor, posibles cambios en colesterol'
    },
    effectsOnWomen: {
      en: 'Not recommended for women due to estrogen suppression',
      es: 'No recomendado para mujeres debido a supresión de estrógeno'
    },
    safetyInformation: {
      en: 'Monitor estrogen levels, use only when needed, avoid over-suppression',
      es: 'Monitorear niveles de estrógeno, usar solo cuando sea necesario, evitar sobresupresión'
    },
    howItWorks: {
      en: 'Irreversibly binds to aromatase enzyme, preventing estrogen conversion',
      es: 'Se une irreversiblemente a la enzima aromatasa, previniendo conversión de estrógeno'
    },
    whatToExpect: {
      en: 'Reduced estrogen-related side effects within 1-2 weeks',
      es: 'Efectos secundarios relacionados con estrógeno reducidos en 1-2 semanas'
    },
    cycleInformation: {
      en: 'Used during cycle and PCT, dosage varies by individual needs',
      es: 'Usado durante ciclo y PCT, dosis varía según necesidades individuales'
    },
    researchBackground: {
      en: 'FDA approved for breast cancer treatment, widely used in performance enhancement',
      es: 'Aprobado por FDA para tratamiento de cáncer de mama, ampliamente usado en mejora del rendimiento'
    },
    performanceRatings: {
      muscleGain: 0,
      strength: 0,
      fatLoss: 1,
      sideEffects: 2,
      retention: 4
    }
  },
  {
    id: 'mk677',
    name: 'MK-677',
    price: 55,
    image: '/lovable-uploads/mk677.jpg',
    tags: ['Growth Hormone', 'Recovery'],
    description: {
      en: 'Growth hormone secretagogue for enhanced recovery and muscle growth.',
      es: 'Secretagogo de hormona de crecimiento para recuperación mejorada y crecimiento muscular.'
    },
    categories: ['recovery', 'muscle-builder'],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '60 capsules',
        typicalCycleLength: '8-12 weeks',
        potencyLevel: 'Moderate potency'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '60 cápsulas',
        typicalCycleLength: '8-12 semanas',
        potencyLevel: 'Potencia moderada'
      }
    },
    benefits: {
      en: 'Increased growth hormone, better sleep quality, enhanced recovery, muscle growth',
      es: 'Mayor hormona de crecimiento, mejor calidad del sueño, recuperación mejorada, crecimiento muscular'
    },
    sideEffects: {
      en: 'Increased appetite, water retention, potential blood sugar changes',
      es: 'Mayor apetito, retención de agua, posibles cambios en azúcar en sangre'
    },
    effectsOnWomen: {
      en: 'Generally well tolerated by women, beneficial for recovery and sleep',
      es: 'Generalmente bien tolerado por mujeres, beneficioso para recuperación y sueño'
    },
    safetyInformation: {
      en: 'Monitor blood glucose, take before bed, cycle off periodically',
      es: 'Monitorear glucosa en sangre, tomar antes de dormir, hacer descansos periódicos'
    },
    howItWorks: {
      en: 'Stimulates growth hormone release via ghrelin receptor activation',
      es: 'Estimula liberación de hormona de crecimiento via activación del receptor de grelina'
    },
    whatToExpected: {
      en: 'Improved sleep and recovery within 1-2 weeks, gradual muscle gains',
      es: 'Mejor sueño y recuperación en 1-2 semanas, ganancias musculares graduales'
    },
    cycleInformation: {
      en: 'Long cycles possible (8-12 weeks), best taken at night',
      es: 'Ciclos largos posibles (8-12 semanas), mejor tomado por la noche'
    },
    researchBackground: {
      en: 'Developed for growth hormone deficiency, extensively researched for anti-aging',
      es: 'Desarrollado para deficiencia de hormona de crecimiento, ampliamente investigado para anti-envejecimiento'
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 2,
      sideEffects: 2,
      retention: 4
    }
  },
  {
    id: 'enclomiphene',
    name: 'Enclomiphene',
    price: 45,
    image: '/lovable-uploads/enclomiphene.jpg',
    tags: ['PCT', 'Testosterone Booster'],
    description: {
      en: 'Selective estrogen receptor modulator for natural testosterone restoration.',
      es: 'Modulador selectivo del receptor de estrógeno para restauración natural de testosterona.'
    },
    categories: ['pct', 'testosterone'],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '60 capsules',
        typicalCycleLength: '4-6 weeks',
        potencyLevel: 'Moderate SERM'
      },
      es: {
        dosePerCapsule: '25mg',
        capsulesPerBottle: '60 cápsulas',
        typicalCycleLength: '4-6 semanas',
        potencyLevel: 'SERM moderado'
      }
    },
    benefits: {
      en: 'Restores natural testosterone, improves fertility, minimal side effects',
      es: 'Restaura testosterona natural, mejora fertilidad, efectos secundarios mínimos'
    },
    sideEffects: {
      en: 'Mild mood changes, potential vision issues (rare), headaches',
      es: 'Cambios leves de humor, posibles problemas de visión (raros), dolores de cabeza'
    },
    effectsOnWomen: {
      en: 'Can be used for fertility enhancement, consult healthcare provider',
      es: 'Puede usarse para mejora de fertilidad, consultar proveedor de salud'
    },
    safetyInformation: {
      en: 'Monitor testosterone levels, use for PCT only, avoid long-term use',
      es: 'Monitorear niveles de testosterona, usar solo para PCT, evitar uso prolongado'
    },
    howItWorks: {
      en: 'Blocks estrogen receptors in hypothalamus, stimulating LH and FSH production',
      es: 'Bloquea receptores de estrógeno en hipotálamo, estimulando producción de LH y FSH'
    },
    whatToExpect: {
      en: 'Testosterone recovery within 2-4 weeks, improved energy and libido',
      es: 'Recuperación de testosterona en 2-4 semanas, mejor energía y libido'
    },
    cycleInformation: {
      en: 'Standard PCT protocol, typically 4-6 weeks post-cycle',
      es: 'Protocolo PCT estándar, típicamente 4-6 semanas post-ciclo'
    },
    researchBackground: {
      en: 'Newer SERM with fewer side effects than traditional options',
      es: 'SERM más nuevo con menos efectos secundarios que opciones tradicionales'
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 2,
      fatLoss: 1,
      sideEffects: 1,
      retention: 5
    }
  }
];

export type { Product };
