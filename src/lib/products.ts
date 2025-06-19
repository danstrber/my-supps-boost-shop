
import { Product } from './types';

export const products: Product[] = [
  // RAD-140 - moved to top
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
        benefits: ["Rapid muscle growth", "Increased strength", "Enhanced recovery"]
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "50 cápsulas por botella",
        suggestedUse: "1-2 cápsulas diarias",
        benefits: ["Crecimiento muscular rápido", "Aumento de fuerza", "Recuperación mejorada"]
      }
    },
    whatToExpect: {
      en: "Expect significant muscle gains and strength improvements within 4-6 weeks of consistent use.",
      es: "Espera ganancias musculares significativas y mejoras de fuerza dentro de 4-6 semanas de uso consistente."
    },
    categories: ["sarms", "bulking", "strength"],
    featured: true,
    inStock: true
  },
  // MK-677 - moved to top
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
        benefits: ["Enhanced recovery", "Better sleep quality", "Increased appetite", "Anti-aging effects"]
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "50 cápsulas por botella",
        suggestedUse: "1 cápsula diaria antes de dormir",
        benefits: ["Recuperación mejorada", "Mejor calidad de sueño", "Aumento del apetito", "Efectos anti-envejecimiento"]
      }
    },
    whatToExpect: {
      en: "Improved sleep quality within days, enhanced recovery and gradual muscle gains over 8-12 weeks.",
      es: "Calidad de sueño mejorada en días, recuperación mejorada y ganancias musculares graduales en 8-12 semanas."
    },
    categories: ["sarms", "recovery", "sleep"],
    featured: true,
    inStock: true
  },
  // Superdrol - moved to top
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
        benefits: ["Rapid muscle growth", "Dramatic strength gains", "Enhanced vascularity", "Improved muscle hardness"]
      },
      es: {
        dosePerCapsule: "10mg por cápsula",
        capsulesPerBottle: "20 cápsulas por botella",
        suggestedUse: "1-2 cápsulas diarias con comida",
        benefits: ["Crecimiento muscular rápido", "Ganancias dramáticas de fuerza", "Vascularidad mejorada", "Dureza muscular mejorada"]
      }
    },
    whatToExpect: {
      en: "Rapid strength and size gains within 1-2 weeks. Significant muscle hardness and definition improvements.",
      es: "Ganancias rápidas de fuerza y tamaño en 1-2 semanas. Mejoras significativas en dureza y definición muscular."
    },
    categories: ["steroids", "bulking", "strength"],
    featured: true,
    inStock: true
  },
  // Clenbuterol
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
        benefits: ["Rapid fat loss", "Increased metabolism", "Enhanced energy", "Muscle preservation"]
      },
      es: {
        dosePerCapsule: "40mcg por cápsula",
        capsulesPerBottle: "50 cápsulas por botella",
        suggestedUse: "Comenzar con 1 cápsula diaria, aumentar gradualmente",
        benefits: ["Pérdida rápida de grasa", "Metabolismo aumentado", "Energía mejorada", "Preservación muscular"]
      }
    },
    whatToExpect: {
      en: "Noticeable fat loss and increased energy within the first week. Significant body recomposition over 4-6 weeks.",
      es: "Pérdida notable de grasa y energía aumentada en la primera semana. Recomposición corporal significativa en 4-6 semanas."
    },
    categories: ["cutting", "fat-loss", "energy"],
    featured: true,
    inStock: true
  },
  // Enclomiphene - fixed dosage
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
        benefits: ["Natural testosterone boost", "Estrogen regulation", "Fertility support", "Post-cycle recovery"]
      },
      es: {
        dosePerCapsule: "12.5mg por cápsula",
        capsulesPerBottle: "30 cápsulas por botella",
        suggestedUse: "1 cápsula diaria o según indicaciones",
        benefits: ["Aumento natural de testosterona", "Regulación de estrógeno", "Soporte de fertilidad", "Recuperación post-ciclo"]
      }
    },
    whatToExpect: {
      en: "Improved energy and mood within 1-2 weeks. Natural testosterone levels restored over 4-8 weeks.",
      es: "Energía y estado de ánimo mejorados en 1-2 semanas. Niveles naturales de testosterona restaurados en 4-8 semanas."
    },
    categories: ["pct", "testosterone", "recovery"],
    featured: false,
    inStock: true
  },
  // Aromasin - removed image reference
  {
    id: "aromasin",
    name: "Aromasin (Exemestane)",
    price: 25,
    image: "", // Removed image
    description: {
      en: "Potent aromatase inhibitor for estrogen control during and after cycles.",
      es: "Inhibidor potente de aromatasa para control de estrógeno durante y después de ciclos."
    },
    specifications: {
      en: {
        dosePerCapsule: "25mg per capsule",
        capsulesPerBottle: "10 capsules per bottle",
        suggestedUse: "As needed for estrogen control",
        benefits: ["Estrogen suppression", "Reduces water retention", "Prevents gynecomastia", "Maintains muscle hardness"]
      },
      es: {
        dosePerCapsule: "25mg por cápsula",
        capsulesPerBottle: "10 cápsulas por botella",
        suggestedUse: "Según sea necesario para control de estrógeno",
        benefits: ["Supresión de estrógeno", "Reduce retención de agua", "Previene ginecomastia", "Mantiene dureza muscular"]
      }
    },
    whatToExpect: {
      en: "Reduced water retention and estrogen-related side effects within days of use.",
      es: "Retención de agua reducida y efectos secundarios relacionados con estrógeno en días de uso."
    },
    categories: ["pct", "estrogen-control"],
    featured: false,
    inStock: true
  }
];

export type { Product };
