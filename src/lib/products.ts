
import { Product } from './types';

export const products: Product[] = [
  // RAD-140 - moved to top with correct image
  {
    id: "2",
    name: "RAD-140 (Testolone)",
    price: 55,
    image: "/lovable-uploads/b79007ea-2fd0-4498-b009-8e0d76ac325e.png",
    description: {
      en: "Powerful SARM for muscle growth and strength gains. Perfect for serious bodybuilders.",
      es: "SARM potente para crecimiento muscular y ganancias de fuerza. Perfecto para culturistas serios."
    },
    specifications: {
      en: {
        dosePerCapsule: "10mg per capsule",
        capsulesPerBottle: "50 capsules per bottle",
        suggestedUse: "1-2 capsules daily",
        benefits: ["Rapid muscle growth", "Increased strength", "Enhanced recovery"],
        typicalCycleLength: "8-12 weeks",
        potencyLevel: "Very High"
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "50 cápsulas por botella",
        suggestedUse: "1-2 cápsulas diarias",
        benefits: ["Crecimiento muscular rápido", "Aumento de fuerza", "Recuperación mejorada"],
        typicalCycleLength: "8-12 semanas",
        potencyLevel: "Muy Alto"
      }
    },
    whatToExpect: {
      en: "Expect significant muscle gains and strength improvements within 4-6 weeks of consistent use.",
      es: "Espera ganancias musculares significativas y mejoras de fuerza dentro de 4-6 semanas de uso consistente."
    },
    researchBackground: {
      en: "RAD-140 was developed by Radius Health as a potential treatment for muscle wasting and breast cancer. Studies show it has strong anabolic effects with minimal androgenic side effects.",
      es: "RAD-140 fue desarrollado por Radius Health como un tratamiento potencial para el desgaste muscular y el cáncer de mama. Los estudios muestran que tiene fuertes efectos anabólicos con efectos secundarios androgénicos mínimos."
    },
    benefits: {
      en: "Increases lean muscle mass, enhances strength and power output, improves bone density, and accelerates fat loss while preserving muscle during cutting phases.",
      es: "Aumenta la masa muscular magra, mejora la fuerza y potencia, mejora la densidad ósea y acelera la pérdida de grasa mientras preserva el músculo durante las fases de corte."
    },
    sideEffects: {
      en: "May cause mild testosterone suppression, slight hair loss in predisposed individuals, and occasional mood changes. Generally well-tolerated at recommended doses.",
      es: "Puede causar supresión leve de testosterona, ligera pérdida de cabello en individuos predispuestos y cambios ocasionales de humor. Generalmente bien tolerado en dosis recomendadas."
    },
    effectsOnWomen: {
      en: "Women should use lower doses (5mg) and shorter cycles (6-8 weeks). May cause mild virilization effects at higher doses. Monitor for voice changes or excessive hair growth.",
      es: "Las mujeres deben usar dosis más bajas (5mg) y ciclos más cortos (6-8 semanas). Puede causar efectos de virilización leves en dosis altas. Monitorear cambios de voz o crecimiento excesivo de vello."
    },
    howItWorks: {
      en: "RAD-140 selectively binds to androgen receptors in muscle and bone tissue, promoting anabolic activity while minimizing effects on other organs like the prostate.",
      es: "RAD-140 se une selectivamente a los receptores de andrógenos en el tejido muscular y óseo, promoviendo actividad anabólica mientras minimiza efectos en otros órganos como la próstata."
    },
    safetyInformation: {
      en: "Always follow recommended dosages. Consider PCT after cycles longer than 8 weeks. Regular blood work is recommended. Not suitable for individuals under 21 or pregnant/nursing women.",
      es: "Siempre seguir las dosis recomendadas. Considerar PCT después de ciclos más largos de 8 semanas. Se recomienda análisis de sangre regulares. No apto para menores de 21 años o mujeres embarazadas/lactantes."
    },
    cycleInformation: {
      en: "Typical cycle: 8-12 weeks at 10-20mg daily. Beginners start with 10mg. Advanced users may use up to 20mg. Always include proper PCT and take breaks between cycles.",
      es: "Ciclo típico: 8-12 semanas a 10-20mg diarios. Principiantes comenzar con 10mg. Usuarios avanzados pueden usar hasta 20mg. Siempre incluir PCT apropiado y descansos entre ciclos."
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 3,
      sideEffects: 2,
      retention: 4
    },
    categories: ["sarms", "bulking", "strength"],
    featured: true,
    inStock: true
  },
  // MK-677 - moved to top with correct image
  {
    id: "mk677",
    name: "MK-677 (Ibutamoren)",
    price: 40,
    image: "/lovable-uploads/3a5b35d3-8bfd-47ec-acb5-94ef2faf5e92.png",
    description: {
      en: "Growth hormone secretagogue for enhanced recovery, better sleep, and muscle growth.",
      es: "Secretagogo de hormona de crecimiento para recuperación mejorada, mejor sueño y crecimiento muscular."
    },
    specifications: {
      en: {
        dosePerCapsule: "10mg per capsule",
        capsulesPerBottle: "50 capsules per bottle",
        suggestedUse: "1 capsule daily before bed",
        benefits: ["Enhanced recovery", "Better sleep quality", "Increased appetite", "Anti-aging effects"],
        typicalCycleLength: "12-24 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "50 cápsulas por botella",
        suggestedUse: "1 cápsula diaria antes de dormir",
        benefits: ["Recuperación mejorada", "Mejor calidad de sueño", "Aumento del apetito", "Efectos anti-envejecimiento"],
        typicalCycleLength: "12-24 semanas",
        potencyLevel: "Moderado"
      }
    },
    whatToExpect: {
      en: "Improved sleep quality within days, enhanced recovery and gradual muscle gains over 8-12 weeks.",
      es: "Calidad de sueño mejorada en días, recuperación mejorada y ganancias musculares graduales en 8-12 semanas."
    },
    researchBackground: {
      en: "MK-677 stimulates growth hormone release by mimicking ghrelin. Originally developed for treating growth hormone deficiency and muscle wasting conditions.",
      es: "MK-677 estimula la liberación de hormona de crecimiento imitando la grelina. Originalmente desarrollado para tratar la deficiencia de hormona de crecimiento y condiciones de desgaste muscular."
    },
    benefits: {
      en: "Increases growth hormone and IGF-1 levels, improves sleep quality, enhances recovery, increases appetite, and may have anti-aging benefits.",
      es: "Aumenta los niveles de hormona de crecimiento e IGF-1, mejora la calidad del sueño, mejora la recuperación, aumenta el apetito y puede tener beneficios anti-envejecimiento."
    },
    sideEffects: {
      en: "May cause increased appetite, water retention, mild lethargy, and temporary increase in blood sugar. Generally well-tolerated with minimal side effects.",
      es: "Puede causar aumento del apetito, retención de agua, letargo leve y aumento temporal del azúcar en sangre. Generalmente bien tolerado con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Safe for women at standard doses. May help with skin quality and hair health. No virilization effects reported. Ideal for recovery and anti-aging benefits.",
      es: "Seguro para mujeres en dosis estándar. Puede ayudar con la calidad de la piel y salud del cabello. No se reportan efectos de virilización. Ideal para recuperación y beneficios anti-envejecimiento."
    },
    howItWorks: {
      en: "Acts as a ghrelin receptor agonist, stimulating the release of growth hormone from the pituitary gland, leading to increased IGF-1 production.",
      es: "Actúa como agonista del receptor de grelina, estimulando la liberación de hormona de crecimiento de la glándula pituitaria, llevando a un aumento en la producción de IGF-1."
    },
    safetyInformation: {
      en: "Generally safe for long-term use. Monitor blood sugar levels if diabetic. May interact with diabetes medications. Consult healthcare provider if pregnant or nursing.",
      es: "Generalmente seguro para uso a largo plazo. Monitorear niveles de azúcar en sangre si es diabético. Puede interactuar con medicamentos para diabetes. Consultar proveedor de salud si está embarazada o amamantando."
    },
    cycleInformation: {
      en: "Can be used continuously for 3-6 months or longer. Take 10-25mg daily, preferably before bed. No PCT required as it doesn't suppress natural hormone production.",
      es: "Puede usarse continuamente por 3-6 meses o más. Tomar 10-25mg diarios, preferiblemente antes de dormir. No se requiere PCT ya que no suprime la producción hormonal natural."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 2,
      sideEffects: 1,
      retention: 5
    },
    categories: ["sarms", "recovery", "sleep"],
    featured: true,
    inStock: true
  },
  // Superdrol - moved to top with correct image
  {
    id: "superdrol",
    name: "Superdrol",
    price: 25,
    image: "/lovable-uploads/71d351ff-45d9-4ad9-91bf-1e5572468693.png",
    labTestFile: "/lovable-uploads/6bf00b32-1fdf-426e-af4b-4eae2b29157c.png",
    description: {
      en: "Powerful anabolic compound for rapid muscle gains and strength increases. Lab tested for purity.",
      es: "Compuesto anabólico potente para ganancias musculares rápidas y aumentos de fuerza. Probado en laboratorio para pureza."
    },
    specifications: {
      en: {
        dosePerCapsule: "10mg per capsule",
        capsulesPerBottle: "20 capsules per bottle",
        suggestedUse: "1-2 capsules daily with food",
        benefits: ["Rapid muscle growth", "Dramatic strength gains", "Enhanced vascularity", "Improved muscle hardness"],
        typicalCycleLength: "4-6 weeks",
        potencyLevel: "Extremely High"
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "20 cápsulas por botella",
        suggestedUse: "1-2 cápsulas diarias con comida",
        benefits: ["Crecimiento muscular rápido", "Ganancias dramáticas de fuerza", "Vascularidad mejorada", "Dureza muscular mejorada"],
        typicalCycleLength: "4-6 semanas",
        potencyLevel: "Extremadamente Alto"
      }
    },
    whatToExpect: {
      en: "Rapid strength and size gains within 1-2 weeks. Significant muscle hardness and definition improvements.",
      es: "Ganancias rápidas de fuerza y tamaño en 1-2 semanas. Mejoras significativas en dureza y definición muscular."
    },
    researchBackground: {
      en: "Superdrol (methasterone) is a potent oral anabolic steroid developed in the 1950s. Known for its ability to provide rapid muscle gains with minimal water retention.",
      es: "Superdrol (metasterona) es un esteroide anabólico oral potente desarrollado en los años 1950. Conocido por su capacidad de proporcionar ganancias musculares rápidas con retención mínima de agua."
    },
    benefits: {
      en: "Provides rapid muscle mass gains, dramatic strength increases, enhanced muscle hardness and definition, improved vascularity, and minimal water retention.",
      es: "Proporciona ganancias rápidas de masa muscular, aumentos dramáticos de fuerza, dureza y definición muscular mejorada, vascularidad mejorada y retención mínima de agua."
    },
    sideEffects: {
      en: "May cause liver stress, elevated blood pressure, cholesterol changes, hair loss, and acne. Requires proper cycle support and PCT. Not for beginners.",
      es: "Puede causar estrés hepático, presión arterial elevada, cambios en el colesterol, pérdida de cabello y acné. Requiere soporte de ciclo apropiado y PCT. No para principiantes."
    },
    effectsOnWomen: {
      en: "NOT RECOMMENDED for women due to high virilization risk. May cause voice deepening, body hair growth, clitoral enlargement, and other masculine characteristics.",
      es: "NO RECOMENDADO para mujeres debido al alto riesgo de virilización. Puede causar profundización de la voz, crecimiento de vello corporal, agrandamiento del clítoris y otras características masculinas."
    },
    howItWorks: {
      en: "Acts as a potent androgen receptor agonist, promoting protein synthesis and nitrogen retention while reducing cortisol effects on muscle tissue.",
      es: "Actúa como un agonista potente del receptor de andrógenos, promoviendo la síntesis de proteínas y retención de nitrógeno mientras reduce los efectos del cortisol en el tejido muscular."
    },
    safetyInformation: {
      en: "ADVANCED USERS ONLY. Requires liver support (TUDCA/NAC), blood pressure monitoring, and comprehensive PCT. Regular blood work essential. Maximum 6-week cycles.",
      es: "SOLO USUARIOS AVANZADOS. Requiere soporte hepático (TUDCA/NAC), monitoreo de presión arterial y PCT integral. Análisis de sangre regulares esenciales. Ciclos máximos de 6 semanas."
    },
    cycleInformation: {
      en: "Typical cycle: 4-6 weeks at 10-20mg daily. Always use liver support, cycle support, and comprehensive PCT. Minimum 8-week break between cycles required.",
      es: "Ciclo típico: 4-6 semanas a 10-20mg diarios. Siempre usar soporte hepático, soporte de ciclo y PCT integral. Se requiere descanso mínimo de 8 semanas entre ciclos."
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 4,
      sideEffects: 4,
      retention: 4
    },
    categories: ["steroids", "bulking", "strength"],
    featured: true,
    inStock: true
  },
  // Clenbuterol with correct image
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
  // Enclomiphene - fixed dosage and correct image
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
  // Aromasin - removed image
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
