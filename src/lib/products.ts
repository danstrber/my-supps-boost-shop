
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  tags?: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Anavar',
    price: 15,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    description: 'Premium Anavar for lean muscle gains',
    category: 'oral',
    inStock: true,
    tags: ['lean muscle', 'cutting']
  },
  {
    id: '2',
    name: 'Winstrol',
    price: 10,
    image: '/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png',
    description: 'High-quality Winstrol for enhanced performance',
    category: 'oral',
    inStock: true,
    tags: ['performance', 'strength']
  },
  {
    id: '3',
    name: 'Dbol (Dianabol)',
    price: 20,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    description: 'Powerful Dianabol for rapid mass gains',
    category: 'oral',
    inStock: true,
    tags: ['mass gains', 'strength']
  },
  {
    id: '4',
    name: 'Tren Ace (Trenbolone)',
    price: 35,
    image: '/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png',
    description: 'Premium Trenbolone Acetate for serious athletes',
    category: 'injectable',
    inStock: true,
    tags: ['advanced', 'strength', 'cutting']
  },
  {
    id: '5',
    name: 'Test E (Testosterone)',
    price: 30,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    description: 'High-grade Testosterone Enanthate',
    category: 'injectable',
    inStock: true,
    tags: ['testosterone', 'base compound']
  },
  {
    id: '6',
    name: 'Primo (Primobolan)',
    price: 40,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    description: 'Premium Primobolan for quality gains',
    category: 'injectable',
    inStock: true,
    tags: ['quality gains', 'mild']
  },
  {
    id: '7',
    name: 'EQ (Equipoise)',
    price: 25,
    image: '/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png',
    description: 'Equipoise for steady, quality muscle growth',
    category: 'injectable',
    inStock: true,
    tags: ['steady gains', 'appetite']
  },
  {
    id: '8',
    name: 'RAD-140 (Testolone)',
    price: 55,
    image: '/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png',
    description: 'Powerful SARM for muscle building',
    category: 'sarms',
    inStock: true,
    tags: ['SARM', 'muscle building']
  },
  {
    id: '9',
    name: 'MK-677 (Ibutamoren)',
    price: 65,
    image: '/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png',
    description: 'Growth hormone secretagogue',
    category: 'sarms',
    inStock: true,
    tags: ['GH secretagogue', 'recovery']
  },
  {
    id: '10',
    name: 'LGD-4033 (Ligandrol)',
    price: 50,
    image: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    description: 'Selective androgen receptor modulator',
    category: 'sarms',
    inStock: true,
    tags: ['SARM', 'strength']
  },
  {
    id: '11',
    name: 'Clen (Clenbuterol)',
    price: 20,
    image: '/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png',
    description: 'Premium Clenbuterol for fat burning',
    category: 'fat-burner',
    inStock: true,
    tags: ['fat burner', 'thermogenic', 'lab tested']
  },
  {
    id: '12',
    name: 'T3',
    price: 15,
    image: '/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png',
    description: 'Thyroid hormone for metabolic enhancement',
    category: 'fat-burner',
    inStock: true,
    tags: ['metabolism', 'thyroid']
  },
  {
    id: '13',
    name: 'DNP',
    price: 25,
    image: '/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png',
    description: 'Powerful fat burning compound',
    category: 'fat-burner',
    inStock: true,
    tags: ['fat burner', 'advanced']
  },
  {
    id: '14',
    name: 'Cardarine',
    price: 45,
    image: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    description: 'PPAR delta agonist for endurance',
    category: 'research',
    inStock: true,
    tags: ['endurance', 'research compound']
  },
  {
    id: '15',
    name: 'Ostarine',
    price: 40,
    image: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    description: 'Popular SARM for lean gains',
    category: 'sarms',
    inStock: true,
    tags: ['SARM', 'lean gains']
  },
  {
    id: '16',
    name: 'HGH',
    price: 120,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    description: 'Human Growth Hormone',
    category: 'peptides',
    inStock: true,
    tags: ['growth hormone', 'recovery']
  },
  {
    id: '17',
    name: 'Aromasin',
    price: 20,
    image: '/lovable-uploads/7eaf0b79-d90d-4ac9-a577-b5a57d1272f1.png',
    description: 'Aromatase inhibitor for estrogen control',
    category: 'ancillary',
    inStock: true,
    tags: ['AI', 'estrogen control']
  },
  {
    id: '18',
    name: 'Arimidex',
    price: 15,
    image: '/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png',
    description: 'Powerful aromatase inhibitor',
    category: 'ancillary',
    inStock: true,
    tags: ['AI', 'estrogen blocker']
  },
  {
    id: '19',
    name: 'Nolvadex',
    price: 10,
    image: '/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png',
    description: 'SERM for post cycle therapy',
    category: 'pct',
    inStock: true,
    tags: ['PCT', 'SERM']
  },
  {
    id: '20',
    name: 'Clomid',
    price: 12,
    image: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    description: 'Essential for post cycle therapy',
    category: 'pct',
    inStock: true,
    tags: ['PCT', 'recovery']
  },
  {
    id: '21',
    name: 'HCG',
    price: 35,
    image: '/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png',
    description: 'Human Chorionic Gonadotropin',
    category: 'pct',
    inStock: true,
    tags: ['PCT', 'hormone recovery']
  },
  {
    id: '22',
    name: 'Superdrol',
    price: 25,
    image: '/lovable-uploads/9f4f9977-4f6c-4d53-ae01-a03204441df1.png',
    description: 'Powerful oral steroid for mass',
    category: 'oral',
    inStock: true,
    tags: ['mass gains', 'strength']
  },
  {
    id: '23',
    name: 'Anadrol',
    price: 30,
    image: '/lovable-uploads/aea84c22-c0e6-477b-aed1-e323fa1bf550.png',
    description: 'Potent oral for rapid size gains',
    category: 'oral',
    inStock: true,
    tags: ['mass gains', 'strength']
  },
  {
    id: '24',
    name: 'Turinabol',
    price: 18,
    image: '/lovable-uploads/b43000ed-31b9-4d86-926f-1640e6f0aa3c.png',
    description: 'Lean gains without water retention',
    category: 'oral',
    inStock: true,
    tags: ['lean gains', 'dry gains']
  },
  {
    id: '25',
    name: 'Proviron',
    price: 22,
    image: '/lovable-uploads/c13fb27e-2e08-4a90-a2a8-c8d6138e0c9a.png',
    description: 'DHT derivative for hardening',
    category: 'oral',
    inStock: true,
    tags: ['hardening', 'libido']
  },
  {
    id: '26',
    name: 'Masteron',
    price: 35,
    image: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    description: 'Premium DHT derivative',
    category: 'injectable',
    inStock: true,
    tags: ['cutting', 'hardening']
  },
  {
    id: '27',
    name: 'NPP (Nandrolone)',
    price: 28,
    image: '/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png',
    description: 'Fast-acting Nandrolone',
    category: 'injectable',
    inStock: true,
    tags: ['joint health', 'mass gains']
  },
  {
    id: '28',
    name: 'Test P (Testosterone)',
    price: 25,
    image: '/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png',
    description: 'Fast-acting Testosterone Propionate',
    category: 'injectable',
    inStock: true,
    tags: ['testosterone', 'fast acting']
  },
  {
    id: '29',
    name: 'Deca (Nandrolone)',
    price: 30,
    image: '/lovable-uploads/fb319341-a727-49e3-afa8-ce91bd70a788.png',
    description: 'Long-acting Nandrolone Decanoate',
    category: 'injectable',
    inStock: true,
    tags: ['joint health', 'mass gains']
  },
  {
    id: '30',
    name: 'Aormsim',
    price: 89,
    image: '/lovable-uploads/fc2fad1d-20dd-4b74-b5e3-07f81414d651.png',
    description: 'Advanced research compound for enhanced performance',
    category: 'research',
    inStock: true,
    tags: ['research compound', 'performance']
  },
  {
    id: '31',
    name: 'Test C (Testosterone)',
    price: 32,
    image: '/lovable-uploads/fd2ccebb-dc6a-47e5-96d7-e9ea40d4ecc5.png',
    description: 'Long-acting Testosterone Cypionate',
    category: 'injectable',
    inStock: true,
    tags: ['testosterone', 'long acting']
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string) => {
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};
