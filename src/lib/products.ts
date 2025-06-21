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
  }
];

export type { Product };
