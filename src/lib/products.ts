import { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: "rad-140",
    name: "RAD-140 (Testolone)",
    price: 29.99,
    image: "/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png",
    labTestFile: "/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png",
    description: {
      en: "RAD-140 (Testolone) is a powerful SARM designed for serious muscle building and strength enhancement.",
      es: "RAD-140 (Testolone) es un SARM potente diseñado para la construcción seria de músculo y el aumento de fuerza."
    },
    specifications: {
      en: {
        dosePerCapsule: "10mg per capsule",
        capsulesPerBottle: "30 capsules per bottle",
        suggestedUse: "1 capsule daily with food",
        benefits: ["Rapid muscle growth", "Increased strength", "Enhanced endurance", "Fat loss"],
        typicalCycleLength: "8-12 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "30 cápsulas por frasco",
        suggestedUse: "1 cápsula diaria con comida",
        benefits: ["Crecimiento muscular rápido", "Aumento de fuerza", "Resistencia mejorada", "Pérdida de grasa"],
        typicalCycleLength: "8-12 semanas",
        potencyLevel: "Alto"
      }
    },
    whatToExpect: {
      en: "Expect significant muscle gains and strength increases within 2-3 weeks. Users typically gain 8-15 lbs of lean muscle.",
      es: "Espera ganancias musculares significativas y aumentos de fuerza dentro de 2-3 semanas. Los usuarios típicamente ganan 8-15 libras de músculo magro."
    },
    researchBackground: {
      en: "RAD-140 was developed by Radius Health for treating muscle wasting conditions. Clinical studies show promising results for muscle growth without significant side effects.",
      es: "RAD-140 fue desarrollado por Radius Health para tratar condiciones de desgaste muscular. Los estudios clínicos muestran resultados prometedores para el crecimiento muscular sin efectos secundarios significativos."
    },
    benefits: {
      en: "Primary benefits include rapid muscle growth, increased strength, enhanced endurance, and accelerated fat loss while preserving muscle mass.",
      es: "Los beneficios principales incluyen crecimiento muscular rápido, aumento de fuerza, resistencia mejorada, y pérdida de grasa acelerada mientras se preserva la masa muscular."
    },
    sideEffects: {
      en: "Mild side effects may include slight testosterone suppression. PCT recommended after cycle completion.",
      es: "Los efectos secundarios leves pueden incluir supresión ligera de testosterona. Se recomienda PCT después de completar el ciclo."
    },
    effectsOnWomen: {
      en: "Women should use lower doses (5mg) to avoid virilization effects. Suitable for female athletes seeking lean gains.",
      es: "Las mujeres deben usar dosis más bajas (5mg) para evitar efectos de virilización. Adecuado para atletas femeninas que buscan ganancias magras."
    },
    howItWorks: {
      en: "RAD-140 selectively binds to androgen receptors in muscle tissue, promoting anabolic activity without affecting other organs.",
      es: "RAD-140 se une selectivamente a los receptores de andrógenos en el tejido muscular, promoviendo actividad anabólica sin afectar otros órganos."
    },
    safetyInformation: {
      en: "Generally well-tolerated when used as directed. Regular blood work recommended during longer cycles.",
      es: "Generalmente bien tolerado cuando se usa según las instrucciones. Se recomienda análisis de sangre regulares durante ciclos más largos."
    },
    cycleInformation: {
      en: "Typical cycles last 8-12 weeks. Begin with 10mg daily, may increase to 20mg for advanced users. PCT recommended.",
      es: "Los ciclos típicos duran 8-12 semanas. Comienza con 10mg diarios, puede aumentar a 20mg para usuarios avanzados. Se recomienda PCT."
    },
    performanceRatings: {
      muscleGain: 9,
      strength: 9,
      fatLoss: 7,
      sideEffects: 8,
      retention: 8
    },
    categories: ["SARMs", "Muscle Building", "Strength"],
    featured: true,
    inStock: true
  },
  {
    id: "mk-677",
    name: "MK-677 (Ibutamoren)",
    price: 34.99,
    image: "/lovable-uploads/80ca5b8b-5b25-4266-a8fe-acffb838a696.png",
    labTestFile: "/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png",
    description: {
      en: "MK-677 (Ibutamoren) is a growth hormone secretagogue that increases IGF-1 and growth hormone levels naturally.",
      es: "MK-677 (Ibutamoren) es un secretagogo de hormona de crecimiento que aumenta los niveles de IGF-1 y hormona de crecimiento naturalmente."
    },
    specifications: {
      en: {
        dosePerCapsule: "25mg per capsule",
        capsulesPerBottle: "30 capsules per bottle",
        suggestedUse: "1 capsule daily before bed",
        benefits: ["Increased HGH", "Better sleep", "Muscle growth", "Anti-aging effects"],
        typicalCycleLength: "12-16 weeks",
        potencyLevel: "Moderate to High"
      },
      es: {
        dosePerCapsule: "25mg por cápsula",
        capsulesPerBottle: "30 cápsulas por frasco",
        suggestedUse: "1 cápsula diaria antes de dormir",
        benefits: ["Aumento de HGH", "Mejor sueño", "Crecimiento muscular", "Efectos anti-envejecimiento"],
        typicalCycleLength: "12-16 semanas",
        potencyLevel: "Moderado a Alto"
      }
    },
    whatToExpect: {
      en: "Improved sleep quality within days, increased appetite, gradual muscle gains, and enhanced recovery over weeks.",
      es: "Mejora en la calidad del sueño en días, aumento del apetito, ganancias musculares graduales, y recuperación mejorada durante semanas."
    },
    researchBackground: {
      en: "Developed by Lumos Pharma, MK-677 mimics ghrelin and stimulates growth hormone release without affecting cortisol levels.",
      es: "Desarrollado por Lumos Pharma, MK-677 imita la ghrelina y estimula la liberación de hormona de crecimiento sin afectar los niveles de cortisol."
    },
    benefits: {
      en: "Benefits include increased growth hormone, improved sleep quality, enhanced muscle growth, better skin and hair, and improved bone density.",
      es: "Los beneficios incluyen aumento de hormona de crecimiento, mejor calidad del sueño, crecimiento muscular mejorado, mejor piel y cabello, y densidad ósea mejorada."
    },
    sideEffects: {
      en: "May cause increased appetite, mild water retention, and occasional drowsiness. Generally well-tolerated.",
      es: "Puede causar aumento del apetito, retención de agua leve, y somnolencia ocasional. Generalmente bien tolerado."
    },
    effectsOnWomen: {
      en: "Excellent choice for women seeking anti-aging benefits, improved sleep, and gradual muscle development without hormonal disruption.",
      es: "Excelente opción para mujeres que buscan beneficios anti-envejecimiento, mejor sueño, y desarrollo muscular gradual sin disrupción hormonal."
    },
    howItWorks: {
      en: "MK-677 acts as a ghrelin receptor agonist, stimulating the pituitary gland to release more growth hormone and IGF-1.",
      es: "MK-677 actúa como un agonista del receptor de ghrelina, estimulando la glándula pituitaria para liberar más hormona de crecimiento e IGF-1."
    },
    safetyInformation: {
      en: "Long-term safety profile is favorable. May affect glucose metabolism in sensitive individuals. Monitor blood sugar if diabetic.",
      es: "El perfil de seguridad a largo plazo es favorable. Puede afectar el metabolismo de la glucosa en individuos sensibles. Monitorear azúcar en sangre si es diabético."
    },
    cycleInformation: {
      en: "Can be used continuously for 3-6 months. Take 25mg daily before bed. No PCT required as it doesn't suppress hormones.",
      es: "Puede usarse continuamente por 3-6 meses. Tomar 25mg diarios antes de dormir. No se requiere PCT ya que no suprime hormonas."
    },
    performanceRatings: {
      muscleGain: 7,
      strength: 6,
      fatLoss: 6,
      sideEffects: 9,
      retention: 9
    },
    categories: ["Growth Hormone", "Recovery", "Anti-Aging"],
    featured: true,
    inStock: true
  },
  {
    id: "superdrol",
    name: "Superdrol (Methasterone)",
    price: 39.99,
    image: "/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png",
    labTestFile: "/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png",
    description: {
      en: "Superdrol (Methasterone) is a powerful prohormone for extreme muscle and strength gains in advanced users.",
      es: "Superdrol (Methasterone) es una prohormona poderosa para ganancias extremas de músculo y fuerza en usuarios avanzados."
    },
    specifications: {
      en: {
        dosePerCapsule: "10mg per capsule",
        capsulesPerBottle: "30 capsules per bottle",
        suggestedUse: "1-2 capsules daily with food",
        benefits: ["Extreme muscle growth", "Massive strength gains", "Rapid results", "Enhanced pumps"],
        typicalCycleLength: "4-6 weeks",
        potencyLevel: "Very High"
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "30 cápsulas por frasco",
        suggestedUse: "1-2 cápsulas diarias con comida",
        benefits: ["Crecimiento muscular extremo", "Ganancias masivas de fuerza", "Resultados rápidos", "Bombeo mejorado"],
        typicalCycleLength: "4-6 semanas",
        potencyLevel: "Muy Alto"
      }
    },
    whatToExpect: {
      en: "Dramatic muscle and strength gains within 1-2 weeks. Users often gain 10-20 lbs during a cycle.",
      es: "Ganancias dramáticas de músculo y fuerza dentro de 1-2 semanas. Los usuarios a menudo ganan 10-20 libras durante un ciclo."
    },
    researchBackground: {
      en: "Originally developed in the 1950s, Superdrol is a modified form of dihydrotestosterone with enhanced anabolic properties.",
      es: "Originalmente desarrollado en los años 1950, Superdrol es una forma modificada de dihidrotestosterona con propiedades anabólicas mejoradas."
    },
    benefits: {
      en: "Provides extreme muscle growth, massive strength increases, enhanced muscle pumps, and rapid transformation results.",
      es: "Proporciona crecimiento muscular extremo, aumentos masivos de fuerza, bombeo muscular mejorado, y resultados de transformación rápida."
    },
    sideEffects: {
      en: "Can cause liver stress, blood pressure elevation, and hormonal suppression. Requires careful monitoring and PCT.",
      es: "Puede causar estrés hepático, elevación de presión arterial, y supresión hormonal. Requiere monitoreo cuidadoso y PCT."
    },
    effectsOnWomen: {
      en: "Not recommended for women due to high androgenic activity and risk of virilization effects.",
      es: "No recomendado para mujeres debido a alta actividad androgénica y riesgo de efectos de virilización."
    },
    howItWorks: {
      en: "Superdrol binds strongly to androgen receptors, promoting intense protein synthesis and nitrogen retention.",
      es: "Superdrol se une fuertemente a los receptores de andrógenos, promoviendo síntesis intensa de proteínas y retención de nitrógeno."
    },
    safetyInformation: {
      en: "For advanced users only. Regular liver function tests required. Use liver support supplements throughout cycle.",
      es: "Solo para usuarios avanzados. Se requieren pruebas regulares de función hepática. Usar suplementos de soporte hepático durante todo el ciclo."
    },
    cycleInformation: {
      en: "Short cycles of 4-6 weeks maximum. Start with 10mg daily, maximum 20mg. Comprehensive PCT essential.",
      es: "Ciclos cortos de máximo 4-6 semanas. Comenzar con 10mg diarios, máximo 20mg. PCT comprensivo esencial."
    },
    performanceRatings: {
      muscleGain: 10,
      strength: 10,
      fatLoss: 8,
      sideEffects: 4,
      retention: 7
    },
    categories: ["Prohormones", "Advanced", "Strength"],
    featured: true,
    inStock: true
  },
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    price: 35,
    image: "/lovable-uploads/80ca5b8b-5b25-4266-a8fe-acffb838a696.png",
    labTestFile: "/lovable-uploads/fe9cf414-0d70-446e-8867-3150485e8cc2.png",
    description: {
      en: "Premium fat burning compound for rapid weight loss and body recomposition. Lab tested for purity.",
      es: "Compuesto quemador de grasa premium para pérdida rápida de peso y recomposición corporal. Probado en laboratorio para pureza."
    },
    specifications: {
      en: {
        dosePerCapsule: "40mcg per capsule",
        capsulesPerBottle: "50 capsules per bottle",
        suggestedUse: "Start with 1 capsule daily, gradually increase",
        benefits: ["Rapid fat loss", "Increased metabolism", "Enhanced energy", "Muscle preservation"],
        typicalCycleLength: "2-4 weeks on, 2 weeks off",
        potencyLevel: "Very High"
      },
      es: {
        dosePerCapsule: "40mcg por cápsula",
        capsulesPerBottle: "50 cápsulas por botella",
        suggestedUse: "Comenzar con 1 cápsula diaria, aumentar gradualmente",
        benefits: ["Pérdida rápida de grasa", "Metabolismo aumentado", "Energía mejorada", "Preservación muscular"],
        typicalCycleLength: "2-4 semanas activo, 2 semanas descanso",
        potencyLevel: "Muy Alto"
      }
    },
    whatToExpect: {
      en: "Noticeable fat loss and increased energy within the first week. Significant body recomposition over 4-6 weeks.",
      es: "Pérdida notable de grasa y energía aumentada en la primera semana. Recomposición corporal significativa en 4-6 semanas."
    },
    researchBackground: {
      en: "Clenbuterol is a beta-2 agonist originally developed for treating asthma. It became popular for its powerful fat-burning and muscle-preserving properties.",
      es: "Clenbuterol es un agonista beta-2 originalmente desarrollado para tratar el asma. Se volvió popular por sus poderosas propiedades quemagrasas y preservadoras de músculo."
    },
    benefits: {
      en: "Rapidly increases metabolic rate, promotes fat oxidation, preserves lean muscle mass during caloric restriction, and provides sustained energy throughout the day.",
      es: "Aumenta rápidamente la tasa metabólica, promueve la oxidación de grasas, preserva la masa muscular magra durante la restricción calórica y proporciona energía sostenida durante el día."
    },
    sideEffects: {
      en: "May cause jitters, increased heart rate, sweating, insomnia, muscle cramps, and anxiety. Start with low doses and assess tolerance carefully.",
      es: "Puede causar nerviosismo, aumento de la frecuencia cardíaca, sudoración, insomnio, calambres musculares y ansiedad. Comenzar con dosis bajas y evaluar la tolerancia cuidadosamente."
    },
    effectsOnWomen: {
      en: "Effective for women for fat loss without virilization concerns. Women typically use 20-80mcg daily. Monitor for side effects and adjust dose accordingly.",
      es: "Efectivo para mujeres para pérdida de grasa sin preocupaciones de virilización. Las mujeres típicamente usan 20-80mcg diarios. Monitorear efectos secundarios y ajustar dosis en consecuencia."
    },
    howItWorks: {
      en: "Stimulates beta-2 adrenergic receptors, increasing cellular metabolism, body temperature, and lipolysis while reducing appetite and preserving muscle tissue.",
      es: "Estimula los receptores adrenérgicos beta-2, aumentando el metabolismo celular, la temperatura corporal y la lipólisis mientras reduce el apetito y preserva el tejido muscular."
    },
    safetyInformation: {
      en: "Not suitable for individuals with heart conditions, high blood pressure, or anxiety disorders. Monitor heart rate and blood pressure. Stay hydrated and supplement electrolytes.",
      es: "No apto para individuos con condiciones cardíacas, presión arterial alta o trastornos de ansiedad. Monitorear frecuencia cardíaca y presión arterial. Mantenerse hidratado y suplementar electrolitos."
    },
    cycleInformation: {
      en: "Start with 20-40mcg daily, increase by 20mcg every 2-3 days up to 120-160mcg max. Cycle 2 weeks on, 2 weeks off. Use with proper diet and cardio.",
      es: "Comenzar con 20-40mcg diarios, aumentar 20mcg cada 2-3 días hasta máximo 120-160mcg. Ciclo 2 semanas activo, 2 semanas descanso. Usar con dieta apropiada y cardio."
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 1,
      fatLoss: 5,
      sideEffects: 3,
      retention: 2
    },
    categories: ["cutting", "fat-loss", "energy"],
    featured: true,
    inStock: true
  },
  {
    id: "enclomiphene",
    name: "Enclomiphene Citrate",
    price: 30,
    image: "/lovable-uploads/29f98aea-c8d6-4336-ac7d-521df4484c4a.png",
    description: {
      en: "SERM for natural testosterone restoration and PCT support. Essential for post-cycle recovery.",
      es: "SERM para restauración natural de testosterona y soporte PCT. Esencial para recuperación post-ciclo."
    },
    specifications: {
      en: {
        dosePerCapsule: "12.5mg per capsule",
        capsulesPerBottle: "30 capsules per bottle",
        suggestedUse: "1 capsule daily or as directed",
        benefits: ["Natural testosterone boost", "Estrogen regulation", "Fertility support", "Post-cycle recovery"],
        typicalCycleLength: "4-8 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "12.5mg por cápsula",
        capsulesPerBottle: "30 cápsulas por botella",
        suggestedUse: "1 cápsula diaria o según indicaciones",
        benefits: ["Aumento natural de testosterona", "Regulación de estrógeno", "Soporte de fertilidad", "Recuperación post-ciclo"],
        typicalCycleLength: "4-8 semanas",
        potencyLevel: "Moderado"
      }
    },
    whatToExpect: {
      en: "Improved energy and mood within 1-2 weeks. Natural testosterone levels restored over 4-8 weeks.",
      es: "Energía y estado de ánimo mejorados en 1-2 semanas. Niveles naturales de testosterona restaurados en 4-8 semanas."
    },
    researchBackground: {
      en: "Enclomiphene is the trans-isomer of clomiphene, developed as a safer alternative for testosterone restoration without the side effects associated with zuclomiphene.",
      es: "Enclomiphene es el trans-isómero del clomifeno, desarrollado como una alternativa más segura para la restauración de testosterona sin los efectos secundarios asociados con zuclomiphene."
    },
    benefits: {
      en: "Stimulates natural testosterone production, improves fertility parameters, enhances mood and energy, supports post-cycle recovery, and maintains hormonal balance.",
      es: "Estimula la producción natural de testosterona, mejora los parámetros de fertilidad, mejora el estado de ánimo y la energía, apoya la recuperación post-ciclo y mantiene el equilibrio hormonal."
    },
    sideEffects: {
      en: "Generally well-tolerated. May cause mild mood changes, visual disturbances, or hot flashes in some users. Side effects are typically minimal compared to clomiphene.",
      es: "Generalmente bien tolerado. Puede causar cambios leves de humor, disturbios visuales o sofocos en algunos usuarios. Los efectos secundarios son típicamente mínimos comparados con clomifeno."
    },
    effectsOnWomen: {
      en: "Can be used by women for fertility purposes under medical supervision. May help with ovulation induction. Consult healthcare provider for proper dosing and monitoring.",
      es: "Puede ser usado por mujeres para propósitos de fertilidad bajo supervisión médica. Puede ayudar con la inducción de ovulación. Consultar proveedor de salud para dosificación y monitoreo apropiados."
    },
    howItWorks: {
      en: "Blocks estrogen receptors in the hypothalamus, leading to increased GnRH release, which stimulates LH and FSH production, ultimately boosting natural testosterone synthesis.",
      es: "Bloquea los receptores de estrógeno en el hipotálamo, llevando a un aumento en la liberación de GnRH, que estimula la producción de LH y FSH, finalmente impulsando la síntesis natural de testosterona."
    },
    safetyInformation: {
      en: "Generally safe for most adults. Monitor for visual changes or mood alterations. Consult healthcare provider if symptoms persist. Not recommended during pregnancy or breastfeeding.",
      es: "Generalmente seguro para la mayoría de adultos. Monitorear cambios visuales o alteraciones del humor. Consultar proveedor de salud si los síntomas persisten. No recomendado durante embarazo o lactancia."
    },
    cycleInformation: {
      en: "Typical PCT protocol: 12.5-25mg daily for 4-6 weeks. Can be used standalone or with other PCT compounds. Begin immediately after cycle completion for best results.",
      es: "Protocolo PCT típico: 12.5-25mg diarios por 4-6 semanas. Puede usarse solo o con otros compuestos PCT. Comenzar inmediatamente después de completar el ciclo para mejores resultados."
    },
    performanceRatings: {
      muscleGain: 2,
      strength: 2,
      fatLoss: 1,
      sideEffects: 1,
      retention: 4
    },
    categories: ["pct", "testosterone", "recovery"],
    featured: false,
    inStock: true
  },
  {
    id: "aromasin",
    name: "Aromasin (Exemestane)",
    price: 25,
    image: "",
    description: {
      en: "Potent aromatase inhibitor for estrogen control during and after cycles.",
      es: "Inhibidor potente de aromatasa para control de estrógeno durante y después de ciclos."
    },
    specifications: {
      en: {
        dosePerCapsule: "25mg per capsule",
        capsulesPerBottle: "10 capsules per bottle",
        suggestedUse: "As needed for estrogen control",
        benefits: ["Estrogen suppression", "Reduces water retention", "Prevents gynecomastia", "Maintains muscle hardness"],
        typicalCycleLength: "As needed during cycle",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "25mg por cápsula",
        capsulesPerBottle: "10 cápsulas por botella",
        suggestedUse: "Según sea necesario para control de estrógeno",
        benefits: ["Supresión de estrógeno", "Reduce retención de agua", "Previene ginecomastia", "Mantiene dureza muscular"],
        typicalCycleLength: "Según necesidad durante ciclo",
        potencyLevel: "Alto"
      }
    },
    whatToExpect: {
      en: "Reduced water retention and estrogen-related side effects within days of use.",
      es: "Retención de agua reducida y efectos secundarios relacionados con estrógeno en días de uso."
    },
    researchBackground: {
      en: "Exemestane is a steroidal aromatase inhibitor originally developed for treating breast cancer in postmenopausal women. It irreversibly binds to aromatase enzyme.",
      es: "Exemestane es un inhibidor de aromatasa esteroidal originalmente desarrollado para tratar cáncer de mama en mujeres postmenopáusicas. Se une irreversiblemente a la enzima aromatasa."
    },
    benefits: {
      en: "Effectively reduces estrogen levels, prevents gynecomastia, reduces water retention, maintains muscle definition, and may have slight androgenic benefits.",
      es: "Reduce efectivamente los niveles de estrógeno, previene ginecomastia, reduce retención de agua, mantiene definición muscular y puede tener beneficios androgénicos leves."
    },
    sideEffects: {
      en: "May cause joint pain, mood changes, decreased libido, and fatigue. Excessive use can crash estrogen levels leading to negative health effects.",
      es: "Puede causar dolor articular, cambios de humor, disminución de la lib ido y fatiga. El uso excesivo puede colapsar los niveles de estrógeno llevando a efectos negativos en la salud."
    },
    effectsOnWomen: {
      en: "NOT RECOMMENDED for women as it can severely suppress estrogen levels, leading to bone density loss, mood disorders, and other serious health issues.",
      es: "NO RECOMENDADO para mujeres ya que puede suprimir severamente los niveles de estrógeno, llevando a pérdida de densidad ósea, trastornos del humor y otros problemas serios de salud."
    },
    howItWorks: {
      en: "Irreversibly inhibits the aromatase enzyme, preventing the conversion of androgens to estrogens, thereby reducing overall estrogen levels in the body.",
      es: "Inhibe irreversiblemente la enzima aromatasa, previniendo la conversión de andrógenos a estrógenos, reduciendo así los niveles generales de estrógeno en el cuerpo."
    },
    safetyInformation: {
      en: "Use only when necessary for estrogen control. Monitor estrogen levels through blood work. Do not crash estrogen completely. Consult healthcare provider for proper dosing.",
      es: "Usar solo cuando sea necesario para control de estrógeno. Monitorear niveles de estrógeno a través de análisis de sangre. No colapsar completamente el estrógeno. Consultar proveedor de salud para dosificación apropiada."
    },
    cycleInformation: {
      en: "Typically used at 12.5-25mg every other day or as needed. Start with lower doses and adjust based on symptoms and blood work. Use throughout cycle if needed.",
      es: "Típicamente usado a 12.5-25mg cada dos días o según necesidad. Comenzar con dosis más bajas y ajustar basado en síntomas y análisis de sangre. Usar durante todo el ciclo si es necesario."
    },
    performanceRatings: {
      muscleGain: 0,
      strength: 0,
      fatLoss: 2,
      sideEffects: 2,
      retention: 3
    },
    categories: ["pct", "estrogen-control"],
    featured: false,
    inStock: true
  }
];

export type { Product };

export const getProduct = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.categories.includes(category));
};
