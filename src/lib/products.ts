export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  image: string; // Add this for backward compatibility
  description: string | { en: string; es: string };
  sideEffects: string | { en: string; es: string };
  dosage: string;
  categories: string[];
  featured?: boolean;
  labTestFile?: string;
  inStock?: boolean;
  specifications?: {
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
  researchBackground?: { en: string; es: string };
  benefits?: { en: string; es: string };
  effectsOnWomen?: { en: string; es: string };
  howItWorks?: { en: string; es: string };
  safetyInformation?: { en: string; es: string };
  cycleInformation?: { en: string; es: string };
  whatToExpect?: { en: string; es: string };
  performanceRatings?: {
    muscleGain: number;
    strength: number;
    fatLoss: number;
    sideEffects: number;
    retention: number;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ostarine (MK-2866)",
    price: 15,
    images: ["/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png"],
    image: "/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png",
    description: "One of the most researched SARMs with potential for muscle growth and bone health support.",
    sideEffects: "Generally well-tolerated. Some users may experience mild effects with extended use. Regular monitoring recommended.",
    dosage: "Typical range: 10-25mg daily. Start with lower doses and assess tolerance.",
    categories: ["sarms", "beginner"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 semanas",
        potencyLevel: "Moderado"
      }
    },
    researchBackground: {
      en: "Extensively studied SARM with numerous clinical trials demonstrating its potential benefits.",
      es: "SARM ampliamente estudiado con numerosos ensayos clínicos que demuestran sus beneficios potenciales."
    },
    benefits: {
      en: "May support lean muscle growth, bone density, and overall body composition improvements.",
      es: "Puede apoyar el crecimiento muscular magro, la densidad ósea y mejoras en la composición corporal."
    },
    effectsOnWomen: {
      en: "Generally well-tolerated by women at lower doses. Monitor for any unwanted effects.",
      es: "Generalmente bien tolerado por mujeres en dosis más bajas. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle and bone tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular y óseo."
    },
    safetyInformation: {
      en: "Start with lower doses and monitor response. Regular health checkups recommended.",
      es: "Comenzar con dosis más bajas y monitorear la respuesta. Se recomiendan chequeos de salud regulares."
    },
    cycleInformation: {
      en: "Typical cycle length is 8-12 weeks with a 4-week break between cycles.",
      es: "La duración típica del ciclo es de 8-12 semanas con un descanso de 4 semanas entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle definition and strength over 6-8 weeks.",
      es: "Mejoras graduales en la definición muscular y fuerza durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 3,
      fatLoss: 2,
      sideEffects: 4,
      retention: 4
    }
  },
  {
    id: "2", 
    name: "Ligandrol (LGD-4033)",
    price: 20,
    images: ["/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png"],
    image: "/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png",
    description: "Popular for its potential muscle-building properties and strength enhancement.",
    sideEffects: "May cause mild effects. Some users report temporary water retention. Post-cycle support may be beneficial.",
    dosage: "Typical range: 5-10mg daily. Conservative approach recommended for beginners.",
    categories: ["sarms", "intermediate"],
    featured: true,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "5mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "5mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Well-researched SARM with strong anabolic properties and favorable safety profile.",
      es: "SARM bien investigado con fuertes propiedades anabólicas y perfil de seguridad favorable."
    },
    benefits: {
      en: "Significant muscle mass gains and strength improvements with minimal side effects.",
      es: "Ganancias significativas de masa muscular y mejoras de fuerza con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Lower doses recommended and close monitoring required.",
      es: "Usar con precaución. Se recomiendan dosis más bajas y monitoreo cercano."
    },
    howItWorks: {
      en: "Highly selective for muscle and bone tissue androgen receptors.",
      es: "Altamente selectivo para los receptores de andrógenos del tejido muscular y óseo."
    },
    safetyInformation: {
      en: "Monitor hormone levels and consider post-cycle therapy for longer cycles.",
      es: "Monitorear los niveles hormonales y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Noticeable strength gains within 2-3 weeks, with muscle mass improvements following.",
      es: "Ganancias notables de fuerza dentro de 2-3 semanas, con mejoras de masa muscular siguiendo."
    },
    performanceRatings: {
      muscleGain: 5,
      strength: 5,
      fatLoss: 2,
      sideEffects: 3,
      retention: 4
    }
  },
  {
    id: "3",
    name: "Cardarine (GW-501516)",
    price: 18,
    images: ["/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png"],
    image: "/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png",
    description: "Known for potential endurance and metabolic benefits.",
    sideEffects: "Generally well-tolerated in short-term use. Long-term effects not fully established. Use with caution.",
    dosage: "Typical range: 10-20mg daily. Cycling recommended.",
    categories: ["sarms", "cutting"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 weeks",
        potencyLevel: "Moderate"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 semanas",
        potencyLevel: "Moderado"
      }
    },
    researchBackground: {
      en: "Originally developed for metabolic disorders, now researched for endurance enhancement.",
      es: "Originalmente desarrollado para trastornos metabólicos, ahora investigado para mejora de resistencia."
    },
    benefits: {
      en: "Enhanced endurance, improved fat oxidation, and better cardiovascular performance.",
      es: "Resistencia mejorada, mejor oxidación de grasas y mejor rendimiento cardiovascular."
    },
    effectsOnWomen: {
      en: "Generally well-tolerated by women with minimal androgenic effects.",
      es: "Generalmente bien tolerado por mujeres con efectos androgénicos mínimos."
    },
    howItWorks: {
      en: "Activates PPAR-delta receptors to enhance fat burning and endurance.",
      es: "Activa los receptores PPAR-delta para mejorar la quema de grasa y resistencia."
    },
    safetyInformation: {
      en: "Use in cycles and avoid long-term continuous use. Monitor cardiovascular health.",
      es: "Usar en ciclos y evitar el uso continuo a largo plazo. Monitorear la salud cardiovascular."
    },
    cycleInformation: {
      en: "8-12 week cycles with equal time off between cycles.",
      es: "Ciclos de 8-12 semanas con tiempo igual de descanso entre ciclos."
    },
    whatToExpected: {
      en: "Improved endurance within 1-2 weeks, with fat loss effects developing over time.",
      es: "Resistencia mejorada dentro de 1-2 semanas, con efectos de pérdida de grasa desarrollándose con el tiempo."
    },
    performanceRatings: {
      muscleGain: 1,
      strength: 2,
      fatLoss: 5,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "4",
    name: "Andarine (S4)",
    price: 16,
    images: ["/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png"],
    image: "/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png",
    description: "Research compound with potential for body composition improvements.",
    sideEffects: "May cause temporary vision effects (yellow tint) in some users. Generally reversible upon discontinuation.",
    dosage: "Typical range: 25-50mg daily in divided doses. Monitor for vision changes.",
    categories: ["sarms", "cutting"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Research compound with potential for body composition improvements.",
      es: "Compuesto de investigación con potencial para mejoras en la composición corporal."
    },
    benefits: {
      en: "Potential for body composition improvements, including lean muscle mass gains.",
      es: "Posible para mejoras en la composición corporal, incluyendo ganancias de masa muscular magro."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for vision changes and consider post-cycle therapy for longer cycles.",
      es: "Monitorear los cambios de visión y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "5",
    name: "RAD-140 (Testolone)",
    price: 22,
    images: ["/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png"],
    image: "/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png",
    description: "Potent research compound with strong anabolic potential.",
    sideEffects: "May cause moderate testosterone suppression. Some users report mild aggression or mood changes.",
    dosage: "Typical range: 10-20mg daily. More experienced users only.",
    categories: ["sarms", "advanced"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Potent research compound with strong anabolic potential.",
      es: "Compuesto de investigación potente con fuertes propiedades anabólicas."
    },
    benefits: {
      en: "Strong anabolic potential with moderate testosterone suppression.",
      es: "Potencial anabólico fuerte con moderada supresión de testosterona."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-12 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-12 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 4,
      strength: 3,
      fatLoss: 2,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "6",
    name: "YK-11",
    price: 25,
    images: ["/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png"],
    image: "/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png",
    description: "Unique compound with myostatin inhibition properties.",
    sideEffects: "Limited research available. May cause testosterone suppression. Liver function monitoring advised.",
    dosage: "Typical range: 5-10mg daily. Advanced users only due to limited research.",
    categories: ["sarms", "advanced"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "5mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "5mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Unique compound with myostatin inhibition properties.",
      es: "Compuesto único con propiedades de inhibición de myostatin."
    },
    benefits: {
      en: "Potential for myostatin inhibition with limited research.",
      es: "Posible para inhibición de myostatin con poco estudio."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "mk677",
    name: "MK-677 (Ibutamoren)",
    price: 30,
    images: ["/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png"],
    image: "/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png",
    description: "Growth hormone secretagogue with potential for recovery and sleep benefits.",
    sideEffects: "May cause increased appetite, mild water retention, or temporary insulin sensitivity changes.",
    dosage: "Typical range: 10-25mg daily, preferably before bed.",
    categories: ["growth-hormone", "recovery"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-12 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Growth hormone secretagogue with potential for recovery and sleep benefits.",
      es: "Secreto de hormona de crecimiento con potencial para recuperación y beneficios de sueño."
    },
    benefits: {
      en: "Potential for recovery and sleep benefits with mild side effects.",
      es: "Posible para beneficios de recuperación y sueño con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-12 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-12 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "superdrol",
    name: "Superdrol",
    price: 35,
    images: ["/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png"],
    image: "/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png",
    description: "Potent oral compound for experienced users seeking significant gains.",
    sideEffects: "May cause liver stress, blood pressure changes, and hormonal suppression. Regular health monitoring essential.",
    dosage: "Typical range: 10-20mg daily. Short cycles recommended. Experienced users only.",
    categories: ["prohormones", "advanced"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Potent oral compound for experienced users seeking significant gains.",
      es: "Compuesto oral potente para usuarios experimentados buscando ganancias significativas."
    },
    benefits: {
      en: "Significant gains with minimal side effects.",
      es: "Ganancias significativas con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "anavar",
    name: "Anavar",
    price: 40,
    images: ["/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png"],
    image: "/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png",
    description: "Well-researched compound known for lean muscle preservation.",
    sideEffects: "Generally mild side effect profile. May cause minor liver enzyme elevation and cholesterol changes.",
    dosage: "Typical range: 20-50mg daily. Regular health monitoring recommended.",
    categories: ["anabolic", "cutting"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Well-researched compound known for lean muscle preservation.",
      es: "Compuesto de investigación conocido por preservar masa muscular magra."
    },
    benefits: {
      en: "Preservation of lean muscle mass with minimal side effects.",
      es: "Preservación de masa muscular magra con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "winstrol",
    name: "Winstrol",
    price: 38,
    images: ["/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png"],
    image: "/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png",
    description: "Popular for cutting phases and athletic performance enhancement.",
    sideEffects: "May cause joint dryness, cholesterol changes, and liver stress. Hair loss possible in predisposed individuals.",
    dosage: "Typical range: 25-50mg daily. Joint support supplements recommended.",
    categories: ["anabolic", "cutting"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Popular for cutting phases and athletic performance enhancement.",
      es: "Popular para fases de corte y mejora de rendimiento deportivo."
    },
    benefits: {
      en: "Enhanced athletic performance and joint support.",
      es: "Mejora del rendimiento deportivo y apoyo a los joints."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "dianabol",
    name: "Dianabol",
    price: 32,
    images: ["/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png"],
    image: "/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png",
    description: "Classic compound for rapid muscle and strength gains.",
    sideEffects: "May cause water retention, elevated blood pressure, and liver stress. Estrogenic effects possible.",
    dosage: "Typical range: 20-40mg daily. Liver support and cycle management essential.",
    categories: ["anabolic", "bulking"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "20mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Classic compound for rapid muscle and strength gains.",
      es: "Compuesto clásico para ganancias rápidas de masa muscular y fuerza."
    },
    benefits: {
      en: "Rapid muscle and strength gains with minimal side effects.",
      es: "Ganancias rápidas de masa muscular y fuerza con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "trenbolone",
    name: "Trenbolone",
    price: 45,
    images: ["/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png"],
    image: "/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png",
    description: "Highly potent compound for experienced users seeking dramatic results.",
    sideEffects: "Significant side effects possible including night sweats, mood changes, and cardiovascular stress. Advanced users only.",
    dosage: "Typical range: 200-400mg weekly. Extensive experience and health monitoring required.",
    categories: ["anabolic", "advanced"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "200mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "200mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Highly potent compound for experienced users seeking dramatic results.",
      es: "Compuesto potente para usuarios experimentados buscando resultados dramáticos."
    },
    benefits: {
      en: "Dramatic muscle gains and strength improvements with significant side effects.",
      es: "Ganancias dramáticas de masa muscular y mejoras de fuerza con efectos secundarios significativos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "testosterone",
    name: "Testosterone Enanthate",
    price: 28,
    images: ["/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png"],
    image: "/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png",
    description: "Base compound for hormone replacement and performance enhancement.",
    sideEffects: "May cause acne, hair loss in predisposed individuals, and estrogenic effects. Regular monitoring advised.",
    dosage: "Typical range: 250-500mg weekly. Bloodwork and cycle support recommended.",
    categories: ["anabolic", "testosterone"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "250mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "250mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Base compound for hormone replacement and performance enhancement.",
      es: "Compuesto base para reemplazo de hormonas y mejora del rendimiento."
    },
    benefits: {
      en: "Hormone replacement and performance enhancement with minimal side effects.",
      es: "Reemplazo de hormonas y mejora del rendimiento con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "deca",
    name: "Deca Durabolin",
    price: 42,
    images: ["/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png"],
    image: "/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png",
    description: "Long-acting compound known for joint health benefits and steady gains.",
    sideEffects: "May cause erectile dysfunction (deca dick), prolactin elevation, and slow recovery. Long detection time.",
    dosage: "Typical range: 300-600mg weekly. Often combined with testosterone.",
    categories: ["anabolic", "bulking"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "300mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "300mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Long-acting compound known for joint health benefits and steady gains.",
      es: "Compuesto de larga duración conocido por beneficios de salud de los joints y ganancias estables."
    },
    benefits: {
      en: "Joint health benefits and steady gains with minimal side effects.",
      es: "Beneficios de salud de los joints y ganancias estables con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "primobolan",
    name: "Primobolan",
    price: 50,
    images: ["/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png"],
    image: "/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png",
    description: "Mild compound favored for its safety profile and quality gains.",
    sideEffects: "Generally mild side effect profile. May cause minor testosterone suppression and cost considerations.",
    dosage: "Typical range: 400-800mg weekly. Longer cycles often preferred.",
    categories: ["anabolic", "cutting"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "400mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "400mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Mild compound favored for its safety profile and quality gains.",
      es: "Compuesto leve favorado por su perfil de seguridad y ganancias de calidad."
    },
    benefits: {
      en: "Quality gains with minimal side effects.",
      es: "Ganancias de calidad con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "equipoise",
    name: "Equipoise",
    price: 36,
    images: ["/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png"],
    image: "/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png",
    description: "Steady gains compound with appetite enhancement properties.",
    sideEffects: "May cause increased red blood cell count, anxiety in some users, and long detection time.",
    dosage: "Typical range: 400-800mg weekly. Blood donation may be necessary.",
    categories: ["anabolic", "lean-bulking"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "400mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "400mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Steady gains compound with appetite enhancement properties.",
      es: "Compuesto de ganancias estables con propiedades de mejora de apetito."
    },
    benefits: {
      en: "Steady gains with appetite enhancement.",
      es: "Ganancias estables con mejora de apetito."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "masteron",
    name: "Masteron",
    price: 44,
    images: ["/lovable-uploads/7eaf0b79-d90d-4ac9-a577-b5a57d1272f1.png"],
    image: "/lovable-uploads/7eaf0b79-d90d-4ac9-a577-b5a57d1272f1.png",
    description: "Anti-estrogenic compound popular for cutting and muscle hardening.",
    sideEffects: "May cause hair loss in predisposed individuals and androgenic effects. Generally well-tolerated.",
    dosage: "Typical range: 300-600mg weekly. Often used in cutting phases.",
    categories: ["anabolic", "cutting"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "300mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "300mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Anti-estrogenic compound popular for cutting and muscle hardening.",
      es: "Compuesto antiestrogenico popular para corte y fortalecimiento muscular."
    },
    benefits: {
      en: "Anti-estrogenic properties with minimal side effects.",
      es: "Propiedades antiestrogenicas con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "anadrol",
    name: "Anadrol",
    price: 34,
    images: ["/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png"],
    image: "/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png",
    description: "Powerful oral compound for rapid mass and strength gains.",
    sideEffects: "May cause significant water retention, liver stress, and blood pressure elevation. Short cycles recommended.",
    dosage: "Typical range: 25-100mg daily. Liver support essential.",
    categories: ["anabolic", "bulking"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "25mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Powerful oral compound for rapid mass and strength gains.",
      es: "Compuesto oral potente para ganancias rápidas de masa y fuerza."
    },
    benefits: {
      en: "Rapid mass and strength gains with minimal side effects.",
      es: "Ganancias rápidas de masa y fuerza con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "turinabol",
    name: "Turinabol",
    price: 33,
    images: ["/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png"],
    image: "/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png",
    description: "Oral compound known for clean, quality muscle gains.",
    sideEffects: "May cause liver stress and cholesterol changes. Generally milder than other orals.",
    dosage: "Typical range: 30-60mg daily. Moderate cycles recommended.",
    categories: ["anabolic", "lean-gains"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "30mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "30mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Oral compound known for clean, quality muscle gains.",
      es: "Compuesto oral conocido por ganancias de masa muscular limpias y de calidad."
    },
    benefits: {
      en: "Clean, quality muscle gains with minimal side effects.",
      es: "Ganancias de masa muscular limpias y de calidad con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "halotestin",
    name: "Halotestin",
    price: 48,
    images: ["/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png"],
    image: "/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png",
    description: "Extremely potent compound for strength and aggression enhancement.",
    sideEffects: "Highly hepatotoxic and may cause significant mood changes. Very short cycles only.",
    dosage: "Typical range: 10-40mg daily. Extreme caution and experience required.",
    categories: ["anabolic", "strength"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Extremely potent compound for strength and aggression enhancement.",
      es: "Compuesto extremadamente potente para mejora de fuerza y agresividad."
    },
    benefits: {
      en: "Significant strength and aggression enhancement with minimal side effects.",
      es: "Mejora significativa de fuerza y agresividad con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    price: 26,
    images: ["/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png"],
    image: "/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png",
    description: "Beta-2 agonist used for fat loss and metabolic enhancement.",
    sideEffects: "May cause jitters, increased heart rate, cramping, and sleep disruption. Cardiovascular monitoring advised.",
    dosage: "Typical range: 20-120mcg daily in pyramid cycles. Start low and assess tolerance.",
    categories: ["fat-loss", "cutting"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "20mcg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "20mcg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Beta-2 agonist used for fat loss and metabolic enhancement.",
      es: "Agonista beta-2 utilizado para pérdida de grasa y mejora de la metabolización."
    },
    benefits: {
      en: "Fat loss and metabolic enhancement with minimal side effects.",
      es: "Pérdida de grasa y mejora de la metabolización con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "t3",
    name: "T3 (Cytomel)",
    price: 24,
    images: ["/lovable-uploads/aea84c22-c0e6-477b-aed1-e323fa1bf550.png"],
    image: "/lovable-uploads/aea84c22-c0e6-477b-aed1-e323fa1bf550.png",
    description: "Thyroid hormone for metabolic enhancement and fat loss.",
    sideEffects: "May cause thyroid suppression, heart palpitations, and muscle loss if overdosed. Careful dosing essential.",
    dosage: "Typical range: 25-75mcg daily. Gradual increases and decreases recommended.",
    categories: ["fat-loss", "thyroid"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "25mcg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "25mcg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Thyroid hormone for metabolic enhancement and fat loss.",
      es: "Hormona tiroid para mejora de la metabolización y pérdida de grasa."
    },
    benefits: {
      en: "Metabolic enhancement and fat loss with minimal side effects.",
      es: "Mejora de la metabolización y pérdida de grasa con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "hgh",
    name: "Human Growth Hormone",
    price: 80,
    images: ["/lovable-uploads/b43000ed-31b9-4d86-926f-1640e6f0aa3c.png"],
    image: "/lovable-uploads/b43000ed-31b9-4d86-926f-1640e6f0aa3c.png",
    description: "Naturally occurring hormone for recovery, anti-aging, and body composition.",
    sideEffects: "May cause water retention, joint pain, and carpal tunnel syndrome. Diabetes risk with long-term use.",
    dosage: "Typical range: 2-6 IU daily. Start low and monitor blood glucose.",
    categories: ["growth-hormone", "anti-aging"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "2IU",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "2IU",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Naturally occurring hormone for recovery, anti-aging, and body composition.",
      es: "Hormona natural para recuperación, anti-aging y composición corporal."
    },
    benefits: {
      en: "Recovery, anti-aging, and body composition enhancement with minimal side effects.",
      es: "Mejora de recuperación, anti-aging y composición corporal con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "insulin",
    name: "Insulin",
    price: 60,
    images: ["/lovable-uploads/c13fb27e-2e08-4a90-a2a8-c8d6138e0c9a.png"],
    image: "/lovable-uploads/c13fb27e-2e08-4a90-a2a8-c8d6138e0c9a.png",
    description: "Powerful anabolic hormone for advanced users seeking maximum gains.",
    sideEffects: "Potentially life-threatening hypoglycemia if misused. Requires extensive knowledge and glucose monitoring.",
    dosage: "Highly individual. Expert guidance and glucose monitoring absolutely essential.",
    categories: ["advanced", "anabolic"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "100mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "100mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Powerful anabolic hormone for advanced users seeking maximum gains.",
      es: "Compuesto anabólico potente para usuarios avanzados buscando ganancias maximas."
    },
    benefits: {
      en: "Maximum anabolic gains with minimal side effects.",
      es: "Ganancias anabólicas maximas con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "igf1",
    name: "IGF-1",
    price: 70,
    images: ["/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png"],
    image: "/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png",
    description: "Growth factor for muscle growth and recovery enhancement.",
    sideEffects: "May cause hypoglycemia, organ growth concerns with long-term use, and injection site reactions.",
    dosage: "Typical range: 50-150mcg daily post-workout. Advanced users only.",
    categories: ["growth-hormone", "advanced"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "50mcg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "50mcg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Growth factor for muscle growth and recovery enhancement.",
      es: "Factor de crecimiento para mejoras en la masa muscular y recuperación."
    },
    benefits: {
      en: "Enhanced muscle growth and recovery with minimal side effects.",
      es: "Mejora de masa muscular y recuperación con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  },
  {
    id: "peptides",
    name: "Peptide Stack",
    price: 55,
    images: ["/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png"],
    image: "/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png",
    description: "Combination of research peptides for various enhancement goals.",
    sideEffects: "Variable depending on specific peptides. May include injection site reactions and individual sensitivities.",
    dosage: "Highly variable based on specific peptides included. Research each component thoroughly.",
    categories: ["peptides", "research"],
    featured: false,
    inStock: true,
    specifications: {
      en: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 weeks",
        potencyLevel: "High"
      },
      es: {
        dosePerCapsule: "10mg",
        capsulesPerBottle: "60",
        typicalCycleLength: "8-10 semanas",
        potencyLevel: "Alto"
      }
    },
    researchBackground: {
      en: "Combination of research peptides for various enhancement goals.",
      es: "Combinación de compuestos de investigación para diversos objetivos de mejora."
    },
    benefits: {
      en: "Various enhancement goals with minimal side effects.",
      es: "Diversos objetivos de mejora con efectos secundarios mínimos."
    },
    effectsOnWomen: {
      en: "Use with caution. Monitor for any unwanted effects.",
      es: "Usar con precaución. Monitorear cualquier efecto no deseado."
    },
    howItWorks: {
      en: "Selectively binds to androgen receptors in muscle tissue.",
      es: "Se une selectivamente a los receptores de andrógenos en el tejido muscular."
    },
    safetyInformation: {
      en: "Monitor for any unwanted effects and consider post-cycle therapy for longer cycles.",
      es: "Monitorear cualquier efecto no deseado y considerar terapia post-ciclo para ciclos más largos."
    },
    cycleInformation: {
      en: "8-10 week cycles with appropriate breaks between cycles.",
      es: "Ciclos de 8-10 semanas con descansos apropiados entre ciclos."
    },
    whatToExpect: {
      en: "Gradual improvements in muscle composition over 6-8 weeks.",
      es: "Mejoras graduales en la composición muscular durante 6-8 semanas."
    },
    performanceRatings: {
      muscleGain: 3,
      strength: 2,
      fatLoss: 3,
      sideEffects: 4,
      retention: 3
    }
  }
];
