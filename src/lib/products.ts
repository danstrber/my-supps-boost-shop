export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  features: string[];
}

export const products: Product[] = [
  {
    id: 'mk-2866',
    name: 'MK-2866 (Ostarine)',
    price: 60,
    image: '',
    description: 'SARM for muscle growth and recovery - Ideal for bulking and cutting cycles.',
    category: 'SARMs',
    inStock: true,
    features: [
      'Promotes lean muscle growth',
      'Enhances bone density',
      'Accelerates recovery',
      'Improves overall performance'
    ]
  },
  {
    id: 'gw-501516',
    name: 'GW-501516 (Cardarine)',
    price: 70,
    image: '',
    description: 'PPAR receptor agonist for endurance and fat loss - Perfect for cutting and performance enhancement.',
    category: 'SARMs',
    inStock: true,
    features: [
      'Increases endurance',
      'Burns fat effectively',
      'Improves cholesterol levels',
      'Enhances cardiovascular health'
    ]
  },
  {
    id: 's-23',
    name: 'S-23',
    price: 80,
    image: '',
    description: 'Potent SARM for significant muscle gains and fat loss - Use with caution due to its strength.',
    category: 'SARMs',
    inStock: true,
    features: [
      'Maximum muscle growth',
      'Aggressive fat loss',
      'Increases strength',
      'Enhanced muscle definition'
    ]
  },
  {
    id: 'yk-11',
    name: 'YK-11',
    price: 90,
    image: '',
    description: 'Myostatin inhibitor for extreme muscle growth - Best used by experienced users.',
    category: 'SARMs',
    inStock: true,
    features: [
      'Inhibits myostatin',
      'Unleashes extreme muscle growth',
      'Increases muscle hardness',
      'Enhances protein synthesis'
    ]
  },
  {
    id: 'clomid',
    name: 'Clomid (Clomiphene Citrate)',
    price: 30,
    image: '', // Removed image
    description: 'PCT/Testosterone booster - Essential for post-cycle therapy to restore natural hormone production.',
    category: 'PCT',
    inStock: true,
    features: [
      'Restores natural testosterone production',
      'Essential for PCT protocols',
      'Prevents estrogen rebound',
      'Maintains muscle gains post-cycle'
    ]
  },
  {
    id: 'dust',
    name: 'Dust (DHT Blocker)',
    price: 40,
    image: '', // Removed image
    description: 'DHT blocker - Helps prevent hair loss and other DHT-related side effects.',
    category: 'Support',
    inStock: true,
    features: [
      'Blocks DHT conversion',
      'Prevents hair loss',
      'Reduces DHT side effects',
      'Maintains healthy hormone balance'
    ]
  },
  {
    id: 'arimidex',
    name: 'Arimidex (Anastrozole)',
    price: 35,
    image: '', // Removed image
    description: 'Aromatase inhibitor for PCT - Controls estrogen levels during and after cycles.',
    category: 'PCT',
    inStock: true,
    features: [
      'Powerful aromatase inhibitor',
      'Controls estrogen levels',
      'Prevents gynecomastia',
      'Essential for PCT protocols'
    ]
  }
];

