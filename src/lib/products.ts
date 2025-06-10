export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  featured?: boolean;
  inStock?: boolean;
  labTestFile?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Super Drol',
    price: 34.99,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    category: 'oral-steroids',
    description: 'Powerful anabolic compound for serious muscle growth and strength gains.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/superdrol-test.pdf'
  },
  {
    id: '2',
    name: 'Anavar',
    price: 49.99,
    image: '/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png',
    category: 'oral-steroids',
    description: 'Premium quality Anavar for lean muscle gains and cutting cycles.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/anavar-test.pdf'
  },
  {
    id: '3',
    name: 'Dianabol',
    price: 29.99,
    image: '/lovable-uploads/68ff590a-199c-454f-a998-8cbff432589c.png',
    category: 'oral-steroids',
    description: 'Classic mass builder for significant gains in muscle size and strength.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/dianabol-test.pdf'
  },
  {
    id: '4',
    name: 'Clenbuterol',
    price: 39.99,
    image: '/lovable-uploads/43854434-7941-4a58-a678-6315a4ff9589.png',
    category: 'weight-loss',
    description: 'Effective thermogenic agent for fat loss and enhanced energy levels.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/clenbuterol-test.pdf'
  },
    {
    id: '5',
    name: 'Winstrol',
    price: 54.99,
    image: '/lovable-uploads/04f99494-1295-450f-b949-19d1b3599995.png',
    category: 'oral-steroids',
    description: 'Powerful anabolic compound for serious muscle growth and strength gains.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/winstrol-test.pdf'
  },
  {
    id: '6',
    name: 'Testosterone Enanthate',
    price: 69.99,
    image: '/lovable-uploads/a424559d-744f-49b2-9544-909ca49b6c5a.png',
    category: 'injectable-steroids',
    description: 'Long-lasting testosterone ester for sustained muscle growth and performance.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/test-e-test.pdf'
  },
  {
    id: '7',
    name: 'Trenbolone Acetate',
    price: 79.99,
    image: '/lovable-uploads/597a1c77-401c-490a-a931-19b35259e099.png',
    category: 'injectable-steroids',
    description: 'Potent anabolic steroid for rapid muscle gains and enhanced strength.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/tren-a-test.pdf'
  },
  {
    id: '8',
    name: 'Masteron',
    price: 84.99,
    image: '/lovable-uploads/4e34a42b-9912-4499-8299-59203444955d.png',
    category: 'injectable-steroids',
    description: 'Premium quality Masteron for lean muscle gains and cutting cycles.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/masteron-test.pdf'
  },
  {
    id: '9',
    name: 'SARMs Stack',
    price: 99.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    description: 'Advanced SARMs stack for enhanced muscle growth and fat loss.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/sarms-stack-test.pdf'
  },
  {
    id: '10',
    name: 'Peptides Blend',
    price: 109.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Powerful blend of peptides for muscle repair, growth, and overall recovery.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/peptides-blend-test.pdf'
  },
  {
    id: '11',
    name: 'Equipoise',
    price: 74.99,
    image: '/lovable-uploads/597a1c77-401c-490a-a931-19b35259e099.png',
    category: 'injectable-steroids',
    description: 'Long-lasting injectable steroid for steady muscle growth and increased appetite.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/equipoise-test.pdf'
  },
  {
    id: '12',
    name: 'Primobolan',
    price: 89.99,
    image: '/lovable-uploads/4e34a42b-9912-4499-8299-59203444955d.png',
    category: 'injectable-steroids',
    description: 'Mild anabolic steroid for lean muscle gains and enhanced performance.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/primobolan-test.pdf'
  },
  {
    id: '13',
    name: 'HGH Fragment 176-191',
    price: 119.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Specialized peptide for targeted fat loss and improved metabolism.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/hgh-frag-test.pdf'
  },
  {
    id: '14',
    name: 'IGF-1 LR3',
    price: 129.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Potent peptide for muscle growth, recovery, and enhanced nutrient absorption.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/igf-1-test.pdf'
  },
  {
    id: '15',
    name: 'Ostarine (MK-2866)',
    price: 64.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    description: 'Versatile SARM for muscle growth, bone density, and overall body recomposition.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/ostarine-test.pdf'
  },
  {
    id: '16',
    name: 'Ligandrol (LGD-4033)',
    price: 74.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    description: 'Powerful SARM for significant muscle gains and increased strength.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/ligandrol-test.pdf'
  },
  {
    id: '17',
    name: 'Andarine (S-4)',
    price: 59.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    description: 'Effective SARM for fat loss, muscle hardening, and enhanced vascularity.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/andarine-test.pdf'
  },
  {
    id: '18',
    name: 'Cardarine (GW-501516)',
    price: 69.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    description: 'Performance-enhancing SARM for endurance, fat loss, and improved cholesterol levels.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/cardarine-test.pdf'
  },
  {
    id: '19',
    name: 'SR9009 (Stenabolic)',
    price: 79.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    description: 'Cutting-edge SARM for enhanced metabolism, fat loss, and improved endurance.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/sr9009-test.pdf'
  },
  {
    id: '20',
    name: 'YK-11 (Myostatin Inhibitor)',
    price: 89.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    description: 'Unique SARM for muscle growth and myostatin inhibition.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/yk11-test.pdf'
  },
  {
    id: '21',
    name: 'GHRP-6',
    price: 99.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Growth hormone releasing peptide for muscle growth, recovery, and anti-aging.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/ghrp6-test.pdf'
  },
  {
    id: '22',
    name: 'CJC-1295',
    price: 109.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Long-acting growth hormone releasing hormone for sustained muscle growth and recovery.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/cjc1295-test.pdf'
  },
  {
    id: '23',
    name: 'BPC-157',
    price: 119.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Versatile peptide for accelerated healing, tissue repair, and reduced inflammation.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/bpc157-test.pdf'
  },
  {
    id: '24',
    name: 'TB-500',
    price: 129.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Powerful peptide for injury recovery, tissue regeneration, and reduced pain.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/tb500-test.pdf'
  },
  {
    id: '25',
    name: 'Melanotan II',
    price: 79.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Peptide for enhanced tanning, increased libido, and appetite suppression.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/mt2-test.pdf'
  },
  {
    id: '26',
    name: 'PT-141 (Bremelanotide)',
    price: 89.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    description: 'Peptide for enhanced sexual function and increased libido.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/pt141-test.pdf'
  },
];

export const getProductById = (id: string) => products.find(product => product.id === id);

export const getProductsByCategory = (category: string) => products.filter(product => product.category === category);
