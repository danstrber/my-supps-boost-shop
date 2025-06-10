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
    research: string;
    effectsOnWomen: string;
    benefits: string;
    sideEffects: string;
    history: string;
    howItWorks: string;
    safety: string;
    cycle: string;
    cycleLength: string;
    strength: string;
    expectations: string;
    ratings: {
      [key: string]: number;
    };
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Superdrol',
    price: 24.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'strength'],
    description: 'Compuesto anabólico potente para crecimiento muscular serio y ganancias de fuerza.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    dose: '10mg',
    capsules: 20,
    details: {
      research: 'Superdrol (Metasterona) ha sido extensamente estudiado por sus propiedades anabólicas potentes y capacidades rápidas de construcción muscular en entornos de investigación.',
      effectsOnWomen: 'NO RECOMENDADO para mujeres debido al riesgo extremadamente alto de virilización. Puede causar características masculinas permanentes, profundización de la voz y disrupción hormonal severa.',
      benefits: 'Ganancias rápidas de masa muscular (8-15 lbs en 4 semanas), aumentos dramáticos de fuerza, síntesis proteica mejorada, retención de nitrógeno mejorada, retención mínima de agua.',
      sideEffects: 'Hepatotoxicidad (estrés hepático), tensión cardiovascular, elevación de presión arterial, desequilibrios de colesterol, supresión de testosterona, cambios de humor, posible pérdida de cabello, acné, dolor articular, dolores de cabeza, fatiga.',
      history: 'Originalmente desarrollado en los años 1950 por Syntex, luego reformulado y comercializado como una "prohormona" antes de ser clasificado como esteroide anabólico.',
      howItWorks: 'Se une fuertemente a los receptores de andrógenos, promoviendo síntesis proteica intensa y crecimiento muscular mientras minimiza efectos estrogénicos.',
      safety: 'Requiere apoyo hepático (NAC, TUDCA), monitoreo regular de análisis de sangre y terapia post-ciclo adecuada. No para principiantes.',
      cycle: 'Ciclos típicos: 4-6 semanas máximo debido a toxicidad hepática. Siempre seguido por PCT integral.',
      cycleLength: '4-6 semanas máximo',
      strength: 'Potencia anabólica extremadamente alta - uno de los compuestos orales más fuertes disponibles',
      expectations: 'Los usuarios típicamente ganan 8-15 lbs de músculo magro en 4 semanas con aumentos significativos de fuerza. Los resultados son dramáticos pero requieren PCT adecuado para mantener.',
      ratings: {
        'Ganancia Muscular': 5,
        'Fuerza': 5,
        'Pérdida de Grasa': 3,
        'Efectos Secundarios': 2,
        'Mantenimiento': 4
      }
    }
  },
  {
    id: '2',
    name: 'MK-677',
    price: 39.99,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    category: 'sarms',
    categories: ['sarms', 'growth'],
    description: 'Secretagogo de hormona del crecimiento para recuperación mejorada y crecimiento muscular.',
    featured: true,
    inStock: true,
    dose: '10mg',
    capsules: 50,
    details: {
      research: 'MK-677 (Ibutamoreno) es extensamente investigado como secretagogo de hormona del crecimiento que aumenta los niveles de IGF-1 y hormona del crecimiento naturalmente.',
      effectsOnWomen: 'Generalmente bien tolerado por mujeres. Puede causar retención leve de agua y aumento del apetito. Comenzar con dosis más bajas (5-10mg).',
      benefits: 'Niveles aumentados de hormona del crecimiento e IGF-1, recuperación mejorada, mejor calidad de sueño, piel y cabello mejorados, ganancias musculares graduales, densidad ósea mejorada.',
      sideEffects: 'Retención de agua, aumento del apetito, posibles fluctuaciones de azúcar en sangre, letargo temporal, hormigueo en manos/pies, posible aumento de niveles de prolactina, dolor articular, sueños vívidos.',
      history: 'Desarrollado para tratar deficiencia de hormona del crecimiento, desgaste muscular y condiciones relacionadas con la edad. Extensamente estudiado por propiedades anti-envejecimiento.',
      howItWorks: 'Imita la grelina y estimula la liberación de hormona del crecimiento de la glándula pituitaria sin afectar cortisol u otras hormonas.',
      safety: 'Generalmente seguro con ciclado adecuado. Monitorear niveles de azúcar en sangre. Puede usarse a largo plazo comparado con otros compuestos.',
      cycle: 'Típicamente usado por 8-16 semanas. Puede ciclarse continuamente con descansos o usarse durante todo el año en dosis más bajas.',
      cycleLength: '8-16 semanas (puede extenderse)',
      strength: 'Moderado - se enfoca en recuperación y ganancias graduales de calidad más que cambios dramáticos',
      expectations: 'Mejoras graduales en recuperación, sueño y composición corporal. 3-8 lbs de músculo de calidad durante 12 semanas con mejor bienestar general.',
      ratings: {
        'Ganancia Muscular': 3,
        'Fuerza': 3,
        'Pérdida de Grasa': 3,
        'Efectos Secundarios': 4,
        'Mantenimiento': 5
      }
    }
  },
  {
    id: '3',
    name: 'RAD-140',
    price: 39.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    category: 'sarms',
    categories: ['sarms', 'bulking'],
    description: 'SARM poderoso para ganancias musculares significativas y mejora de fuerza.',
    featured: true,
    inStock: true,
    dose: '10mg',
    capsules: 50,
    details: {
      research: 'RAD-140 (Testolona) es uno de los SARMs más potentes con investigación extensa mostrando efectos anabólicos fuertes con efectos androgénicos reducidos.',
      effectsOnWomen: 'NO RECOMENDADO para mujeres debido a efectos androgénicos fuertes. Riesgo de virilización incluso en dosis bajas.',
      benefits: 'Crecimiento muscular rápido, aumentos significativos de fuerza, resistencia mejorada, recuperación mejorada, retención mínima de agua, propiedades neuroprotectoras.',
      sideEffects: 'Supresión de testosterona, agresión leve, posible pérdida de cabello en individuos predispuestos, cambios de humor, posible estrés hepático, dolores de cabeza, náuseas, fatiga, dolor articular, acné.',
      history: 'Desarrollado como alternativa más segura a esteroides anabólicos para tratar desgaste muscular y pérdida ósea mientras minimiza efectos prostáticos.',
      howItWorks: 'Modulador selectivo de receptor de andrógenos con alta actividad anabólica y efectos androgénicos reducidos comparado con esteroides tradicionales.',
      safety: 'Requiere terapia post-ciclo para ciclos de más de 6 semanas. Análisis de sangre regulares recomendados para monitorear niveles de testosterona.',
      cycle: 'Típicamente usado por 8-12 semanas seguido por PCT de 4-8 semanas dependiendo del nivel de supresión.',
      cycleLength: '8-12 semanas',
      strength: 'Potencia anabólica muy alta - entre los SARMs más fuertes disponibles',
      expectations: 'Los usuarios típicamente ganan 8-15 lbs de músculo magro con aumentos significativos de fuerza. Los resultados son sustanciales y bien mantenidos post-ciclo.',
      ratings: {
        'Ganancia Muscular': 5,
        'Fuerza': 5,
        'Pérdida de Grasa': 3,
        'Efectos Secundarios': 3,
        'Mantenimiento': 4
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
    description: 'Agente termogénico efectivo para pérdida de grasa y niveles de energía mejorados.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    dose: '40mcg',
    capsules: 50,
    details: {
      research: 'Extensamente estudiado como broncodilatador y compuesto termogénico. La investigación muestra propiedades significativas de pérdida de grasa y mejora metabólica.',
      effectsOnWomen: 'Bien tolerado por mujeres y a menudo preferido para ciclos de definición. Las mujeres típicamente usan 10-40mcg diarios con buenos resultados.',
      benefits: 'Pérdida rápida de grasa, tasa metabólica aumentada, rendimiento cardiovascular mejorado, preservación muscular durante restricción calórica, niveles de energía mejorados.',
      sideEffects: 'Nerviosismo y temblores, ritmo cardíaco aumentado, sudoración excesiva, insomnio, calambres musculares, posible estrés cardíaco, ansiedad, dolores de cabeza, presión arterial aumentada, deshidratación.',
      history: 'Originalmente desarrollado como medicamento para asma, luego descubierto por sus propiedades potentes de quema de grasa y mejora del rendimiento.',
      howItWorks: 'Estimula receptores beta-2 para aumentar la tasa metabólica, temperatura corporal y oxidación de grasa mientras preserva tejido muscular magro.',
      safety: 'Debe ciclarse adecuadamente con aumentos graduales de dosis. Monitorear ritmo cardíaco y presión arterial. Mantenerse hidratado y suplementar con taurina.',
      cycle: 'Típicamente usado en ciclos de 2 semanas encendido/2 semanas apagado o protocolos de pirámide comenzando bajo y aumentando gradualmente.',
      cycleLength: '2-6 semanas con descansos',
      strength: 'Potencia termogénica muy alta - uno de los quemadores de grasa más efectivos disponibles',
      expectations: 'Los usuarios pueden esperar reducción de 2-5% de grasa corporal durante ciclos de 4-6 semanas con dieta adecuada. Cambios rápidos visibles en definición y vascularidad.',
      ratings: {
        'Ganancia Muscular': 1,
        'Fuerza': 2,
        'Pérdida de Grasa': 5,
        'Efectos Secundarios': 3,
        'Mantenimiento': 4
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
    description: 'Modulador selectivo de receptor de estrógeno para terapia post-ciclo y optimización hormonal.',
    featured: true,
    inStock: true,
    dose: '12.5mg',
    capsules: 25,
    details: {
      research: 'Enclomifeno es bien investigado como SERM para restauración de testosterona y mejora de fertilidad. Los estudios muestran estimulación efectiva de LH/FSH.',
      effectsOnWomen: 'Puede ser usado por mujeres para propósitos de fertilidad bajo supervisión médica. No típicamente usado para PCT ya que las mujeres no suprimen testosterona.',
      benefits: 'Restaura producción natural de testosterona, previene rebote de estrógeno, mantiene ganancias musculares post-ciclo, mejora marcadores de fertilidad, estabilización del humor.',
      sideEffects: 'Cambios leves de humor, posibles cambios de visión (raros), sofocos, fluctuaciones temporales de libido, dolores de cabeza, náuseas, fatiga durante ajuste, posible depresión leve.',
      history: 'Desarrollado como tratamiento de fertilidad, ahora ampliamente usado para restauración hormonal después de ciclos supresivos y optimización de testosterona.',
      howItWorks: 'Bloquea receptores de estrógeno en el hipotálamo, estimulando producción natural de LH y FSH, lo que restaura niveles de testosterona.',
      safety: 'Generalmente seguro cuando se usa adecuadamente para protocolos PCT. Mucho más seguro que SERMs más antiguos con menos efectos secundarios.',
      cycle: 'Usado por 4-8 semanas después de completar ciclos supresivos. También puede usarse para optimización natural de testosterona.',
      cycleLength: '4-8 semanas post-ciclo',
      strength: 'Moderado pero crucial para recuperación hormonal - esencial para mantener ganancias',
      expectations: 'Los usuarios pueden esperar niveles hormonales restaurados dentro de 4-6 semanas y ganancias musculares mantenidas de ciclos previos.',
      ratings: {
        'Ganancia Muscular': 2,
        'Fuerza': 2,
        'Pérdida de Grasa': 2,
        'Efectos Secundarios': 4,
        'Mantenimiento': 5
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
    description: 'Inhibidor de aromatasa para control de estrógeno durante y después de ciclos.',
    featured: false,
    inStock: true,
    dose: '25mg',
    capsules: 10,
    details: {
      research: 'Aromasin (Exemestano) es extensamente investigado como inhibidor potente de aromatasa que se une permanentemente a enzimas aromatasa, previniendo producción de estrógeno.',
      effectsOnWomen: 'NO RECOMENDADO para mujeres ya que suprimirá severamente los niveles de estrógeno, causando pérdida ósea, problemas de humor y otros problemas serios de salud.',
      benefits: 'Previene ginecomastia, reduce retención de agua, previene rebote de estrógeno, mantiene dureza muscular, mejora libido durante ciclos.',
      sideEffects: 'Dolor y rigidez articular, densidad ósea reducida con uso a largo plazo, cambios de humor, piel y cabello secos, posible impacto negativo en colesterol, fatiga, dolores de cabeza, sofocos.',
      history: 'Originalmente desarrollado para tratar cáncer de mama en mujeres postmenopáusicas, luego adoptado por culturistas para control de estrógeno.',
      howItWorks: 'Se une irreversiblemente a enzimas aromatasa, desactivándolas permanentemente y previniendo conversión de testosterona a estrógeno.',
      safety: 'No debe usarse sin monitoreo adecuado. Puede colapsar niveles de estrógeno si se sobredosifica. Análisis de sangre esenciales para monitorear niveles de estrógeno.',
      cycle: 'Usado durante ciclos con compuestos aromatizantes o como parte del protocolo PCT. Típicamente 12.5-25mg cada dos días.',
      cycleLength: 'Duración del ciclo + 2-4 semanas',
      strength: 'Muy potente - uno de los inhibidores de aromatasa más fuertes disponibles',
      expectations: 'Control efectivo de estrógeno, retención de agua reducida, prevención de efectos secundarios estrogénicos. Debe dosificarse cuidadosamente.',
      ratings: {
        'Ganancia Muscular': 2,
        'Fuerza': 2,
        'Pérdida de Grasa': 3,
        'Efectos Secundarios': 3,
        'Mantenimiento': 4
      }
    }
  }
];

export const getProductById = (id: string) => products.find(product => product.id === id);

export const getProductsByCategory = (category: string) => products.filter(product => product.categories.includes(category));
