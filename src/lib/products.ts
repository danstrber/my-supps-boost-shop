export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  categories: string[];
  description: {
    en: string;
    es: string;
  };
  benefits: {
    en: string[];
    es: string[];
  };
  labTested: boolean;
}

export const products: Product[] = [
  {
    id: 'rad140',
    name: 'RAD-140',
    price: 39.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    category: 'sarms',
    categories: ['sarms'],
    description: {
      en: 'RAD-140 (Testolone) - Premium SARM for research purposes',
      es: 'RAD-140 (Testolone) - SARM premium para propósitos de investigación'
    },
    benefits: {
      en: ['Muscle growth research', 'Strength studies', 'Performance analysis'],
      es: ['Investigación de crecimiento muscular', 'Estudios de fuerza', 'Análisis de rendimiento']
    },
    labTested: true
  },
  {
    id: 'ostarine',
    name: 'Ostarine',
    price: 34.99,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    category: 'sarms',
    categories: ['sarms'],
    description: {
      en: 'MK-2866 (Ostarine) - Research compound for laboratory use',
      es: 'MK-2866 (Ostarine) - Compuesto de investigación para uso en laboratorio'
    },
    benefits: {
      en: ['Lean mass research', 'Bone density studies', 'Joint health analysis'],
      es: ['Investigación de masa magra', 'Estudios de densidad ósea', 'Análisis de salud articular']
    },
    labTested: true
  },
  {
    id: 'lgd4033',
    name: 'LGD-4033',
    price: 42.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    category: 'sarms',
    categories: ['sarms'],
    description: {
      en: 'LGD-4033 (Ligandrol) - Advanced research SARM',
      es: 'LGD-4033 (Ligandrol) - SARM de investigación avanzada'
    },
    benefits: {
      en: ['Muscle research', 'Strength analysis', 'Performance studies'],
      es: ['Investigación muscular', 'Análisis de fuerza', 'Estudios de rendimiento']
    },
    labTested: true
  },
  {
    id: 'mk677',
    name: 'MK-677',
    price: 45.99,
    image: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    category: 'peptides',
    categories: ['peptides'],
    description: {
      en: 'MK-677 (Ibutamoren) - Growth hormone research compound',
      es: 'MK-677 (Ibutamoren) - Compuesto de investigación de hormona de crecimiento'
    },
    benefits: {
      en: ['GH research', 'Sleep studies', 'Recovery analysis'],
      es: ['Investigación de GH', 'Estudios del sueño', 'Análisis de recuperación']
    },
    labTested: true
  },
  {
    id: 'cardarine',
    name: 'Cardarine',
    price: 38.99,
    image: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    category: 'ppar',
    categories: ['ppar'],
    description: {
      en: 'GW-501516 (Cardarine) - PPAR research compound',
      es: 'GW-501516 (Cardarine) - Compuesto de investigación PPAR'
    },
    benefits: {
      en: ['Endurance research', 'Fat oxidation studies', 'Metabolic analysis'],
      es: ['Investigación de resistencia', 'Estudios de oxidación de grasa', 'Análisis metabólico']
    },
    labTested: true
  },
  {
    id: 'stenabolic',
    name: 'Stenabolic',
    price: 41.99,
    image: '/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png',
    category: 'rev-erb',
    categories: ['rev-erb'],
    description: {
      en: 'SR-9009 (Stenabolic) - Rev-ErbA research compound',
      es: 'SR-9009 (Stenabolic) - Compuesto de investigación Rev-ErbA'
    },
    benefits: {
      en: ['Circadian research', 'Metabolism studies', 'Energy analysis'],
      es: ['Investigación circadiana', 'Estudios de metabolismo', 'Análisis de energía']
    },
    labTested: true
  },
  {
    id: 'yk11',
    name: 'YK-11',
    price: 47.99,
    image: '/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png',
    category: 'sarms',
    categories: ['sarms'],
    description: {
      en: 'YK-11 - Myostatin research compound',
      es: 'YK-11 - Compuesto de investigación de miostatina'
    },
    benefits: {
      en: ['Myostatin research', 'Muscle studies', 'Genetic analysis'],
      es: ['Investigación de miostatina', 'Estudios musculares', 'Análisis genético']
    },
    labTested: true
  },
  {
    id: 'andarine',
    name: 'Andarine',
    price: 36.99,
    image: '/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png',
    category: 'sarms',
    categories: ['sarms'],
    description: {
      en: 'S-4 (Andarine) - Selective androgen receptor research',
      es: 'S-4 (Andarine) - Investigación selectiva del receptor de andrógenos'
    },
    benefits: {
      en: ['Lean mass research', 'Bone studies', 'Vision research'],
      es: ['Investigación de masa magra', 'Estudios óseos', 'Investigación visual']
    },
    labTested: true
  },
  {
    id: 'superdrol',
    name: 'Superdrol',
    price: 49.99,
    image: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    category: 'prohormones',
    categories: ['prohormones'],
    description: {
      en: 'Superdrol - 20 caps research compound',
      es: 'Superdrol - Compuesto de investigación de 20 cápsulas'
    },
    benefits: {
      en: ['Anabolic research', 'Mass studies', 'Strength analysis'],
      es: ['Investigación anabólica', 'Estudios de masa', 'Análisis de fuerza']
    },
    labTested: true
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 35.00,
    image: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    category: 'fat-burners',
    categories: ['fat-burners'],
    description: {
      en: 'Clenbuterol - Beta-2 agonist research compound',
      es: 'Clenbuterol - Compuesto de investigación agonista beta-2'
    },
    benefits: {
      en: ['Thermogenic research', 'Fat loss studies', 'Respiratory analysis'],
      es: ['Investigación termogénica', 'Estudios de pérdida de grasa', 'Análisis respiratorio']
    },
    labTested: true
  },
  {
    id: 'anavar',
    name: 'Anavar',
    price: 52.99,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Oxandrolone (Anavar) - Anabolic research compound',
      es: 'Oxandrolona (Anavar) - Compuesto de investigación anabólica'
    },
    benefits: {
      en: ['Lean gains research', 'Cutting studies', 'Performance analysis'],
      es: ['Investigación de ganancias magras', 'Estudios de corte', 'Análisis de rendimiento']
    },
    labTested: true
  },
  {
    id: 'winstrol',
    name: 'Winstrol',
    price: 48.99,
    image: '/lovable-uploads/7eaf0b79-d90d-4ac9-a577-b5a57d1272f1.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Stanozolol (Winstrol) - Research steroid compound',
      es: 'Estanozolol (Winstrol) - Compuesto esteroide de investigación'
    },
    benefits: {
      en: ['Cutting research', 'Hardening studies', 'Athletic analysis'],
      es: ['Investigación de corte', 'Estudios de endurecimiento', 'Análisis atlético']
    },
    labTested: true
  },
  {
    id: 'dianabol',
    name: 'Dianabol',
    price: 44.99,
    image: '/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Methandrostenolone (Dianabol) - Mass research compound',
      es: 'Metandrostenolona (Dianabol) - Compuesto de investigación de masa'
    },
    benefits: {
      en: ['Mass research', 'Strength studies', 'Bulking analysis'],
      es: ['Investigación de masa', 'Estudios de fuerza', 'Análisis de volumen']
    },
    labTested: true
  },
  {
    id: 'trenbolone',
    name: 'Trenbolone',
    price: 59.99,
    image: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Trenbolone - Advanced research compound',
      es: 'Trembolona - Compuesto de investigación avanzada'
    },
    benefits: {
      en: ['Advanced research', 'Recomposition studies', 'Elite analysis'],
      es: ['Investigación avanzada', 'Estudios de recomposición', 'Análisis élite']
    },
    labTested: true
  },
  {
    id: 'testosterone',
    name: 'Testosterone',
    price: 39.99,
    image: '/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Testosterone - Base hormone research compound',
      es: 'Testosterona - Compuesto de investigación de hormona base'
    },
    benefits: {
      en: ['Hormone research', 'Base studies', 'TRT analysis'],
      es: ['Investigación hormonal', 'Estudios base', 'Análisis TRT']
    },
    labTested: true
  },
  {
    id: 'deca',
    name: 'Deca-Durabolin',
    price: 54.99,
    image: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Nandrolone Decanoate - Long-acting research compound',
      es: 'Decanoato de Nandrolona - Compuesto de investigación de acción prolongada'
    },
    benefits: {
      en: ['Joint research', 'Mass studies', 'Recovery analysis'],
      es: ['Investigación articular', 'Estudios de masa', 'Análisis de recuperación']
    },
    labTested: true
  },
  {
    id: 'equipoise',
    name: 'Equipoise',
    price: 46.99,
    image: '/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Boldenone Undecylenate - Research compound',
      es: 'Undecilenato de Boldenona - Compuesto de investigación'
    },
    benefits: {
      en: ['Lean gains research', 'Appetite studies', 'Endurance analysis'],
      es: ['Investigación de ganancias magras', 'Estudios de apetito', 'Análisis de resistencia']
    },
    labTested: true
  },
  {
    id: 'masteron',
    name: 'Masteron',
    price: 51.99,
    image: '/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Drostanolone - Anti-estrogenic research compound',
      es: 'Drostanolona - Compuesto de investigación anti-estrogénico'
    },
    benefits: {
      en: ['Hardening research', 'Anti-E studies', 'Definition analysis'],
      es: ['Investigación de endurecimiento', 'Estudios anti-E', 'Análisis de definición']
    },
    labTested: true
  },
  {
    id: 'primobolan',
    name: 'Primobolan',
    price: 64.99,
    image: '/lovable-uploads/fb319341-a727-49e3-afa8-ce91bd70a788.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Methenolone - Mild research compound',
      es: 'Metenolona - Compuesto de investigación suave'
    },
    benefits: {
      en: ['Quality research', 'Mild studies', 'Safety analysis'],
      es: ['Investigación de calidad', 'Estudios suaves', 'Análisis de seguridad']
    },
    labTested: true
  },
  {
    id: 'anadrol',
    name: 'Anadrol',
    price: 47.99,
    image: '/lovable-uploads/fc2fad1d-20dd-4b74-b5e3-07f81414d651.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Oxymetholone (Anadrol) - Powerful research compound',
      es: 'Oximetolona (Anadrol) - Compuesto de investigación potente'
    },
    benefits: {
      en: ['Power research', 'Mass studies', 'Strength analysis'],
      es: ['Investigación de potencia', 'Estudios de masa', 'Análisis de fuerza']
    },
    labTested: true
  },
  {
    id: 'turinabol',
    name: 'Turinabol',
    price: 43.99,
    image: '/lovable-uploads/fd2ccebb-dc6a-47e5-96d7-e9ea40d4ecc5.png',
    category: 'steroids',
    categories: ['steroids'],
    description: {
      en: 'Chlorodehydromethyltestosterone - Research compound',
      es: 'Clorodeshidrometiltestosterona - Compuesto de investigación'
    },
    benefits: {
      en: ['Clean research', 'Quality studies', 'Performance analysis'],
      es: ['Investigación limpia', 'Estudios de calidad', 'Análisis de rendimiento']
    },
    labTested: true
  }
];
