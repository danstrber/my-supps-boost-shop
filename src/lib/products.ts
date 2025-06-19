
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string;
  dosage: string;
  capsules: number;
}

export const products: Product[] = [
  {
    id: 'anavar',
    name: 'Anavar',
    price: 89.99,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    description: 'Premium Anavar for lean muscle gains and strength enhancement.',
    ingredients: 'Oxandrolone 20mg per capsule',
    dosage: '20-40mg daily',
    capsules: 100
  },
  {
    id: 'testosterone',
    name: 'Testosterone Enanthate',
    price: 79.99,
    image: '/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png',
    description: 'High-quality Testosterone Enanthate for muscle building and hormone optimization.',
    ingredients: 'Testosterone Enanthate 250mg/ml',
    dosage: '250-500mg weekly',
    capsules: 10
  },
  {
    id: 'winstrol',
    name: 'Winstrol',
    price: 69.99,
    image: '/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png',
    description: 'Powerful Winstrol for cutting cycles and athletic performance.',
    ingredients: 'Stanozolol 25mg per capsule',
    dosage: '25-50mg daily',
    capsules: 100
  },
  {
    id: 'dbol',
    name: 'Dianabol',
    price: 59.99,
    image: '/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png',
    description: 'Classic Dianabol for rapid muscle mass and strength gains.',
    ingredients: 'Methandrostenolone 25mg per capsule',
    dosage: '25-50mg daily',
    capsules: 100
  },
  {
    id: 'trenbolone',
    name: 'Trenbolone Acetate',
    price: 99.99,
    image: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    description: 'Potent Trenbolone Acetate for advanced users seeking maximum results.',
    ingredients: 'Trenbolone Acetate 100mg/ml',
    dosage: '100-300mg weekly',
    capsules: 10
  },
  {
    id: 'deca',
    name: 'Deca Durabolin',
    price: 84.99,
    image: '/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png',
    description: 'Premium Deca Durabolin for joint health and steady muscle gains.',
    ingredients: 'Nandrolone Decanoate 250mg/ml',
    dosage: '200-400mg weekly',
    capsules: 10
  },
  {
    id: 'anadrol',
    name: 'Anadrol',
    price: 74.99,
    image: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    description: 'Powerful Anadrol for explosive strength and mass gains.',
    ingredients: 'Oxymetholone 50mg per capsule',
    dosage: '50-100mg daily',
    capsules: 100
  },
  {
    id: 'masteron',
    name: 'Masteron',
    price: 94.99,
    image: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    description: 'Quality Masteron for cutting cycles and muscle hardening.',
    ingredients: 'Drostanolone Propionate 100mg/ml',
    dosage: '300-500mg weekly',
    capsules: 10
  },
  {
    id: 'primobolan',
    name: 'Primobolan',
    price: 109.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    description: 'Premium Primobolan for lean gains and quality muscle development.',
    ingredients: 'Methenolone Enanthate 100mg/ml',
    dosage: '400-600mg weekly',
    capsules: 10
  },
  {
    id: 'equipoise',
    name: 'Equipoise',
    price: 89.99,
    image: '/lovable-uploads/fb319341-a727-49e3-afa8-ce91bd70a788.png',
    description: 'High-grade Equipoise for steady gains and enhanced appetite.',
    ingredients: 'Boldenone Undecylenate 250mg/ml',
    dosage: '400-600mg weekly',
    capsules: 10
  },
  {
    id: 'clenbuterol',
    name: 'Clenbuterol',
    price: 49.99,
    image: '/lovable-uploads/eba9e12b-46c3-4087-b249-0766d5bd34bb.png',
    description: 'Effective Clenbuterol for fat burning and improved cardiovascular performance.',
    ingredients: 'Clenbuterol HCl 40mcg per capsule',
    dosage: '20-120mcg daily (pyramid dosing)',
    capsules: 50
  },
  {
    id: 'aromasin',
    name: 'Aromasin',
    price: 39.99,
    image: '',
    description: 'Essential Aromasin (Exemestane) for estrogen control during cycles.',
    ingredients: 'Exemestane 25mg per capsule',
    dosage: '12.5-25mg daily',
    capsules: 100
  }
];
