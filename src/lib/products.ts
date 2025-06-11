
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categories: string[];
  description?: string;
  featured?: boolean;
  inStock?: boolean;
  labTestFile?: string;
  dose: string;
  capsules: number;
  details: {
    research: { en: string; es: string };
    effectsOnWomen: { en: string; es: string };
    benefits: { en: string; es: string };
    sideEffects: { en: string; es: string };
    history: { en: string; es: string };
    howItWorks: { en: string; es: string };
    safety: { en: string; es: string };
    cycle: { en: string; es: string };
    cycleLength: string;
    strength: { en: string; es: string };
    expectations: { en: string; es: string };
    ratings: {
      [key: string]: number;
    };
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Superdrol',
    price: 29.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'strength'],
    description: 'Potent anabolic compound for serious muscle growth and strength gains.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    dose: '10mg',
    capsules: 20,
    details: {
      research: {
        en: 'Superdrol (Methasterone) has been extensively studied for its potent anabolic properties and rapid muscle-building capabilities in research settings.',
        es: 'Superdrol (Metasterona) ha sido extensivamente estudiado por sus propiedades anabólicas potentes y capacidades rápidas de construcción muscular en entornos de investigación.'
      },
      effectsOnWomen: {
        en: 'NOT RECOMMENDED for women due to extremely high virilization risk. Can cause permanent masculine features, voice deepening, and severe hormonal disruption.',
        es: 'NO RECOMENDADO para mujeres debido al riesgo extremadamente alto de virilización. Puede causar características masculinas permanentes, profundización de la voz y disrupción hormonal severa.'
      },
      benefits: {
        en: 'Rapid muscle mass gains (8-15lbs in 4 weeks), dramatic strength increases, enhanced protein synthesis, improved nitrogen retention, minimal water retention.',
        es: 'Ganancias rápidas de masa muscular (8-15 lbs en 4 semanas), aumentos dramáticos de fuerza, síntesis proteica mejorada, retención de nitrógeno mejorada, retención mínima de agua.'
      },
      sideEffects: {
        en: 'Possible side effects may include mild liver stress, temporary blood pressure changes, slight cholesterol shifts, reduced testosterone levels, occasional mood changes, or mild fatigue. Consult a doctor before use.',
        es: 'Posibles efectos secundarios pueden incluir estrés hepático leve, cambios temporales en la presión arterial, ligeros cambios en el colesterol, niveles reducidos de testosterona, cambios de humor ocasionales o fatiga leve. Consulta a un médico antes de usar.'
      },
      history: {
        en: 'Originally developed in the 1950s by Syntex, later reformulated and marketed as a "prohormone" before being classified as an anabolic steroid.',
        es: 'Originalmente desarrollado en los años 1950 por Syntex, luego reformulado y comercializado como una "prohormona" antes de ser clasificado como esteroide anabólico.'
      },
      howItWorks: {
        en: 'Binds strongly to androgen receptors, promoting intense protein synthesis and muscle growth while minimizing estrogenic effects.',
        es: 'Se une fuertemente a los receptores de andrógenos, promoviendo síntesis proteica intensa y crecimiento muscular mientras minimiza efectos estrogénicos.'
      },
      safety: {
        en: 'Requires liver support (NAC, TUDCA), regular blood work monitoring, and proper post-cycle therapy. Not for beginners.',
        es: 'Requiere apoyo hepático (NAC, TUDCA), monitoreo regular de análisis de sangre y terapia post-ciclo adecuada. No para principiantes.'
      },
      cycle: {
        en: 'Typical cycles: 4-6 weeks maximum due to liver toxicity. Always followed by comprehensive PCT.',
        es: 'Ciclos típicos: 4-6 semanas máximo debido a toxicidad hepática. Siempre seguido por PCT integral.'
      },
      cycleLength: '4-6 weeks maximum',
      strength: {
        en: 'Extremely high anabolic potency - one of the strongest oral compounds available',
        es: 'Potencia anabólica extremadamente alta - uno de los compuestos orales más fuertes disponibles'
      },
      expectations: {
        en: 'Users typically gain 8-15 lbs of lean muscle in 4 weeks with significant strength increases. Results are dramatic but require proper PCT to maintain.',
        es: 'Los usuarios típicamente ganan 8-15 lbs de músculo magro en 4 semanas con aumentos significativos de fuerza. Los resultados son dramáticos pero requieren PCT adecuado para mantener.'
      },
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 3,
        'Side Effects': 2,
        'Maintainability': 4
      }
    }
  },
  {
    id: '2',
    name: 'MK-677',
    price: 44.99,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    category: 'sarms',
    categories: ['sarms', 'growth'],
    description: 'Growth hormone secretagogue for enhanced recovery and muscle growth.',
    featured: true,
    inStock: true,
    dose: '10mg',
    capsules: 50,
    details: {
      research: {
        en: 'MK-677 (Ibutamoren) is extensively researched as a growth hormone secretagogue that increases IGF-1 and growth hormone levels naturally.',
        es: 'MK-677 (Ibutamoreno) es extensivamente investigado como secretagogo de hormona del crecimiento que aumenta los niveles de IGF-1 y hormona del crecimiento naturalmente.'
      },
      effectsOnWomen: {
        en: 'Generally well-tolerated by women. May cause mild water retention and increased appetite. Start with lower doses (5-10mg).',
        es: 'Generalmente bien tolerado por mujeres. Puede causar retención leve de agua y aumento del apetito. Comenzar con dosis más bajas (5-10mg).'
      },
      benefits: {
        en: 'Increased growth hormone and IGF-1 levels, improved recovery, better sleep quality, enhanced skin and hair, gradual muscle gains, improved bone density.',
        es: 'Niveles aumentados de hormona del crecimiento e IGF-1, recuperación mejorada, mejor calidad de sueño, piel y cabello mejorados, ganancias musculares graduales, densidad ósea mejorada.'
      },
      sideEffects: {
        en: 'Water retention, increased appetite, potential blood sugar fluctuations, temporary lethargy, tingling in hands/feet, possible increased prolactin levels, joint pain, vivid dreams.',
        es: 'Retención de agua, aumento del apetito, posibles fluctuaciones de azúcar en sangre, letargo temporal, hormigueo en manos/pies, posible aumento de niveles de prolactina, dolor articular, sueños vívidos.'
      },
      history: {
        en: 'Developed to treat growth hormone deficiency, muscle wasting, and age-related conditions. Extensively studied for anti-aging properties.',
        es: 'Desarrollado para tratar deficiencia de hormona del crecimiento, desgaste muscular y condiciones relacionadas con la edad. Extensamente estudiado por propiedades anti-envejecimiento.'
      },
      howItWorks: {
        en: 'Mimics ghrelin and stimulates growth hormone release from the pituitary gland without affecting cortisol or other hormones.',
        es: 'Imita la grelina y estimula la liberación de hormona del crecimiento de la glándula pituitaria sin afectar cortisol u otras hormonas.'
      },
      safety: {
        en: 'Generally safe with proper cycling. Monitor blood sugar levels. Can be used longer-term compared to other compounds.',
        es: 'Generalmente seguro con ciclado adecuado. Monitorear niveles de azúcar en sangre. Puede usarse a largo plazo comparado con otros compuestos.'
      },
      cycle: {
        en: 'Typically used for 8-16 weeks. Can be cycled continuously with breaks or used year-round at lower doses.',
        es: 'Típicamente usado por 8-16 semanas. Puede ciclarse continuamente con descansos o usarse durante todo el año en dosis más bajas.'
      },
      cycleLength: '8-16 weeks (can be extended)',
      strength: {
        en: 'Moderate - focuses on recovery and gradual quality gains rather than dramatic changes',
        es: 'Moderado - se enfoca en recuperación y ganancias graduales de calidad más que cambios dramáticos'
      },
      expectations: {
        en: 'Gradual improvements in recovery, sleep, and body composition. 3-8 lbs of quality muscle over 12 weeks with better overall well-being.',
        es: 'Mejoras graduales en recuperación, sueño y composición corporal. 3-8 lbs de músculo de calidad durante 12 semanas con mejor bienestar general.'
      },
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 3,
        'Side Effects': 4,
        'Maintainability': 5
      }
    }
  },
  {
    id: '3',
    name: 'RAD-140',
    price: 44.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    category: 'sarms',
    categories: ['sarms', 'bulking'],
    description: 'Powerful SARM for significant muscle gains and strength enhancement.',
    featured: true,
    inStock: true,
    dose: '10mg',
    capsules: 50,
    details: {
      research: {
        en: 'RAD-140 (Testolone) is one of the most potent SARMs with extensive research showing strong anabolic effects with reduced androgenic side effects.',
        es: 'RAD-140 (Testolona) es uno de los SARMs más potentes con investigación extensa mostrando efectos anabólicos fuertes con efectos androgénicos reducidos.'
      },
      effectsOnWomen: {
        en: 'NOT RECOMMENDED for women due to strong androgenic effects. Risk of virilization even at low doses.',
        es: 'NO RECOMENDADO para mujeres debido a efectos androgénicos fuertes. Riesgo de virilización incluso en dosis bajas.'
      },
      benefits: {
        en: 'Rapid muscle growth, significant strength increases, enhanced endurance, improved recovery, minimal water retention, neuroprotective properties.',
        es: 'Crecimiento muscular rápido, aumentos significativos de fuerza, resistencia mejorada, recuperación mejorada, retención mínima de agua, propiedades neuroprotectoras.'
      },
      sideEffects: {
        en: 'Testosterone suppression, mild aggression, possible hair loss in predisposed individuals, mood changes, potential liver stress, headaches, nausea, fatigue, joint pain, acne.',
        es: 'Supresión de testosterona, agresión leve, posible pérdida de cabello en individuos predispuestos, cambios de humor, posible estrés hepático, dolores de cabeza, náuseas, fatiga, dolor articular, acné.'
      },
      history: {
        en: 'Developed as a safer alternative to anabolic steroids for treating muscle wasting and bone loss while minimizing prostatic effects.',
        es: 'Desarrollado como alternativa más segura a esteroides anabólicos para tratar desgaste muscular y pérdida ósea mientras minimiza efectos prostáticos.'
      },
      howItWorks: {
        en: 'Selective androgen receptor modulator with high anabolic activity and reduced androgenic effects compared to traditional steroids.',
        es: 'Modulador selectivo de receptor de andrógenos con alta actividad anabólica y efectos androgénicos reducidos comparado con esteroides tradicionales.'
      },
      safety: {
        en: 'Requires post-cycle therapy for cycles over 6 weeks. Regular blood work recommended to monitor testosterone levels.',
        es: 'Requiere terapia post-ciclo para ciclos de más de 6 semanas. Análisis de sangre regulares recomendados para monitorear niveles de testosterona.'
      },
      cycle: {
        en: 'Typically used for 8-12 weeks followed by 4-8 week PCT depending on suppression level.',
        es: 'Típicamente usado por 8-12 semanas seguido por PCT de 4-8 semanas dependiendo del nivel de supresión.'
      },
      cycleLength: '8-12 weeks',
      strength: {
        en: 'Very high anabolic potency - among the strongest SARMs available',
        es: 'Potencia anabólica muy alta - entre los SARMs más fuertes disponibles'
      },
      expectations: {
        en: 'Users typically gain 8-15 lbs of lean muscle with significant strength increases. Results are substantial and well-maintained post-cycle.',
        es: 'Los usuarios típicamente ganan 8-15 lbs de músculo magro con aumentos significativos de fuerza. Los resultados son sustanciales y bien mantenidos post-ciclo.'
      },
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 3,
        'Side Effects': 3,
        'Maintainability': 4
      }
    }
  },
  {
    id: '4',
    name: 'Clenbuterol',
    price: 34.99,
    image: '/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png',
    category: 'fat-burners',
    categories: ['fat-burners', 'cutting'],
    description: 'Effective thermogenic agent for fat loss and enhanced energy levels.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    dose: '40mcg',
    capsules: 50,
    details: {
      research: {
        en: 'Extensively studied as a bronchodilator and thermogenic compound. Research shows significant fat loss and metabolic enhancement properties.',
        es: 'Extensamente estudiado como broncodilatador y compuesto termogénico. La investigación muestra propiedades significativas de pérdida de grasa y mejora metabólica.'
      },
      effectsOnWomen: {
        en: 'Well-tolerated by women and often preferred for cutting cycles. Women typically use 10-40mcg daily with good results.',
        es: 'Bien tolerado por mujeres y a menudo preferido para ciclos de definición. Las mujeres típicamente usan 10-40mcg diariamente con buenos resultados.'
      },
      benefits: {
        en: 'Rapid fat loss, increased metabolic rate, improved cardiovascular performance, muscle preservation during calorie restriction, enhanced energy levels.',
        es: 'Pérdida rápida de grasa, tasa metabólica aumentada, rendimiento cardiovascular mejorado, preservación muscular durante restricción calórica, niveles de energía mejorados.'
      },
      sideEffects: {
        en: 'Jitters and tremors, increased heart rate, excessive sweating, insomnia, muscle cramps, potential cardiac stress, anxiety, headaches, increased blood pressure, dehydration.',
        es: 'Nerviosismo y temblores, ritmo cardíaco aumentado, sudoración excesiva, insomnio, calambres musculares, posible estrés cardíaco, ansiedad, dolores de cabeza, presión arterial aumentada, deshidratación.'
      },
      history: {
        en: 'Originally developed as asthma medication, later discovered for its potent fat-burning properties and performance enhancement.',
        es: 'Originalmente desarrollado como medicamento para asma, luego descubierto por sus propiedades potentes de quema de grasa y mejora del rendimiento.'
      },
      howItWorks: {
        en: 'Stimulates beta-2 receptors to increase metabolic rate, body temperature, and fat oxidation while preserving lean muscle tissue.',
        es: 'Estimula receptores beta-2 para aumentar la tasa metabólica, temperatura corporal y oxidación de grasa mientras preserva tejido muscular magro.'
      },
      safety: {
        en: 'Should be cycled properly with gradual dose increases. Monitor heart rate and blood pressure. Stay hydrated and supplement with taurine.',
        es: 'Debe ciclarse adecuadamente con aumentos graduales de dosis. Monitorear ritmo cardíaco y presión arterial. Mantenerse hidratado y suplementar con taurina.'
      },
      cycle: {
        en: 'Typically used in 2-week on/2-week off cycles or pyramid protocols starting low and increasing gradually.',
        es: 'Típicamente usado en ciclos de 2 semanas encendido/2 semanas apagado o protocolos de pirámide comenzando bajo y aumentando gradualmente.'
      },
      cycleLength: '2-6 weeks with breaks',
      strength: {
        en: 'Very high thermogenic potency - one of the most effective fat burners available',
        es: 'Potencia termogénica muy alta - uno de los quemadores de grasa más efectivos disponibles'
      },
      expectations: {
        en: 'Users can expect 2-5% body fat reduction over 4-6 week cycles with proper diet. Rapid visible changes in definition and vascularity.',
        es: 'Los usuarios pueden esperar reducción de 2-5% de grasa corporal durante ciclos de 4-6 semanas con dieta adecuada. Cambios rápidos visibles en definición y vascularidad.'
      },
      ratings: {
        'Muscle Gain': 1,
        'Strength': 2,
        'Fat Loss': 5,
        'Side Effects': 3,
        'Maintainability': 4
      }
    }
  },
  {
    id: '5',
    name: 'Enclomiphene',
    price: 24.99,
    image: '/lovable-uploads/fc2fad1d-20dd-4b74-b5e3-07f81414d651.png',
    category: 'pct',
    categories: ['pct', 'hormones'],
    description: 'Selective estrogen receptor modulator for post-cycle therapy and hormonal optimization.',
    featured: true,
    inStock: true,
    dose: '12.5mg',
    capsules: 25,
    details: {
      research: {
        en: 'Enclomiphene is well-researched as a SERM for testosterone restoration and fertility enhancement. Studies show effective LH/FSH stimulation.',
        es: 'Enclomifeno es bien investigado como SERM para restauración de testosterona y mejora de fertilidad. Los estudios muestran estimulación efectiva de LH/FSH.'
      },
      effectsOnWomen: {
        en: 'Can be used by women for fertility purposes under medical supervision. Not typically used for PCT as women don\'t suppress testosterone.',
        es: 'Puede ser usado por mujeres para propósitos de fertilidad bajo supervisión médica. No típicamente usado para PCT ya que las mujeres no suprimen testosterona.'
      },
      benefits: {
        en: 'Restores natural testosterone production, prevents estrogen rebound, maintains muscle gains post-cycle, improves fertility markers, mood stabilization.',
        es: 'Restaura producción natural de testosterona, previene rebote de estrógeno, mantiene ganancias musculares post-ciclo, mejora marcadores de fertilidad, estabilización del humor.'
      },
      sideEffects: {
        en: 'Mild mood swings, potential vision changes (rare), hot flashes, temporary libido fluctuations, headaches, nausea, fatigue during adjustment, possible mild depression.',
        es: 'Cambios leves de humor, posibles cambios de visión (raros), sofocos, fluctuaciones temporales de libido, dolores de cabeza, náuseas, fatiga durante ajuste, posible depresión leve.'
      },
      history: {
        en: 'Developed as fertility treatment, now widely used for hormonal restoration after suppressive cycles and testosterone optimization.',
        es: 'Desarrollado como tratamiento de fertilidad, ahora ampliamente usado para restauración hormonal después de ciclos supresivos y optimización de testosterona.'
      },
      howItWorks: {
        en: 'Blocks estrogen receptors in the hypothalamus, stimulating natural LH and FSH production, which restores testosterone levels.',
        es: 'Bloquea receptores de estrógeno en el hipotálamo, estimulando producción natural de LH y FSH, lo que restaura niveles de testosterona.'
      },
      safety: {
        en: 'Generally safe when used properly for PCT protocols. Much safer than older SERMs with fewer side effects.',
        es: 'Generalmente seguro cuando se usa adecuadamente para protocolos PCT. Mucho más seguro que SERMs más antiguos con menos efectos secundarios.'
      },
      cycle: {
        en: 'Used for 4-8 weeks after completing suppressive cycles. Can also be used for natural testosterone optimization.',
        es: 'Usado por 4-8 semanas después de completar ciclos supresivos. También puede usarse para optimización natural de testosterona.'
      },
      cycleLength: '4-8 weeks post-cycle',
      strength: {
        en: 'Moderate but crucial for hormonal recovery - essential for maintaining gains',
        es: 'Moderado pero crucial para recuperación hormonal - esencial para mantener ganancias'
      },
      expectations: {
        en: 'Users can expect restored hormone levels within 4-6 weeks and maintained muscle gains from previous cycles.',
        es: 'Los usuarios pueden esperar niveles hormonales restaurados dentro de 4-6 semanas y ganancias musculares mantenidas de ciclos previos.'
      },
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 2,
        'Side Effects': 4,
        'Maintainability': 5
      }
    }
  },
  {
    id: '6',
    name: 'Aromasin',
    price: 24.99,
    image: '',
    category: 'pct',
    categories: ['pct', 'anti-estrogen'],
    description: 'Aromatase inhibitor for estrogen control during and after cycles.',
    featured: false,
    inStock: true,
    dose: '25mg',
    capsules: 10,
    details: {
      research: {
        en: 'Aromasin (Exemestane) is extensively researched as a potent aromatase inhibitor that permanently binds to aromatase enzymes, preventing estrogen production.',
        es: 'Aromasin (Exemestano) es extensivamente investigado como inhibidor potente de aromatasa que se une permanentemente a enzimas aromatasa, previniendo producción de estrógeno.'
      },
      effectsOnWomen: {
        en: 'NOT RECOMMENDED for women as it will severely suppress estrogen levels, causing bone loss, mood issues, and other serious health problems.',
        es: 'NO RECOMENDADO para mujeres ya que suprimirá severamente los niveles de estrógeno, causando pérdida ósea, problemas de humor y otros problemas serios de salud.'
      },
      benefits: {
        en: 'Prevents gynecomastia, reduces water retention, prevents estrogen rebound, maintains muscle hardness, improves libido during cycles.',
        es: 'Previene ginecomastia, reduce retención de agua, previene rebote de estrógeno, mantiene dureza muscular, mejora libido durante ciclos.'
      },
      sideEffects: {
        en: 'Joint pain and stiffness, reduced bone density with long-term use, mood changes, dry skin and hair, possible negative impact on cholesterol, fatigue, headaches, hot flashes.',
        es: 'Dolor y rigidez articular, densidad ósea reducida con uso a largo plazo, cambios de humor, piel y cabello secos, posible impacto negativo en colesterol, fatiga, dolores de cabeza, sofocos.'
      },
      history: {
        en: 'Originally developed to treat breast cancer in postmenopausal women, later adopted by bodybuilders for estrogen control.',
        es: 'Originalmente desarrollado para tratar cáncer de mama en mujeres postmenopáusicas, luego adoptado por culturistas para control de estrógeno.'
      },
      howItWorks: {
        en: 'Irreversibly binds to aromatase enzymes, permanently deactivating them and preventing testosterone conversion to estrogen.',
        es: 'Se une irreversiblemente a enzimas aromatasa, desactivándolas permanentemente y previniendo conversión de testosterona a estrógeno.'
      },
      safety: {
        en: 'Should not be used without proper monitoring. Can crash estrogen levels if overdosed. Blood work essential to monitor estrogen levels.',
        es: 'No debe usarse sin monitoreo adecuado. Puede colapsar niveles de estrógeno si se sobredosifica. Análisis de sangre esencial para monitorear niveles de estrógeno.'
      },
      cycle: {
        en: 'Used during cycles with aromatizing compounds or as part of PCT protocol. Typically 12.5-25mg every other day.',
        es: 'Usado durante ciclos con compuestos aromatizantes o como parte del protocolo PCT. Típicamente 12.5-25mg cada dos días.'
      },
      cycleLength: 'Cycle duration + 2-4 weeks',
      strength: {
        en: 'Very potent - one of the strongest aromatase inhibitors available',
        es: 'Muy potente - uno de los inhibidores de aromatasa más fuertes disponibles'
      },
      expectations: {
        en: 'Effective estrogen control, reduced water retention, prevention of estrogenic side effects. Must be dosed carefully.',
        es: 'Control efectivo de estrógeno, retención de agua reducida, prevención de efectos secundarios estrogénicos. Debe dosificarse cuidadosamente.'
      },
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 3,
        'Side Effects': 3,
        'Maintainability': 4
      }
    }
  }
];

export const getProductById = (id: string) => products.find(product => product.id === id);

export const getProductsByCategory = (category: string) => products.filter(product => product.categories.includes(category));
