import { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  ingredients: string;
  dosage: string;
  sideEffects: string;
  benefits: string[];
}

export const products: Product[] = [
  {
    id: 'mk677',
    name: 'MK-677 (Ibutamoren)',
    price: 50,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    category: 'sarms',
    description: 'Growth hormone secretagogue that can support increased muscle mass, improved sleep quality, and enhanced recovery.',
    ingredients: 'MK-677 (Ibutamoren) 25mg per capsule',
    dosage: '25mg daily, preferably before bedtime',
    sideEffects: 'May cause increased appetite, mild water retention, or temporary changes in sleep patterns. Individual responses may vary.',
    benefits: [
      'Supports natural growth hormone production',
      'May improve sleep quality and recovery',
      'Can help with muscle mass development',
      'Supports bone density'
    ]
  },
  {
    id: 'rad140',
    name: 'RAD-140 (Testolone)',
    price: 60,
    image: '/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png',
    category: 'sarms',
    description: 'Selective androgen receptor modulator designed for lean muscle gain and strength enhancement.',
    ingredients: 'RAD-140 (Testolone) 10mg per capsule',
    dosage: '10-20mg daily for 8-12 weeks',
    sideEffects: 'Some users may experience mild testosterone suppression or temporary changes in energy levels. Consider post-cycle support.',
    benefits: [
      'Supports lean muscle growth',
      'May enhance strength and endurance',
      'Selective tissue targeting',
      'Supports body composition goals'
    ]
  },
  {
    id: 'lgd4033',
    name: 'LGD-4033 (Ligandrol)',
    price: 55,
    image: '/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png',
    category: 'sarms',
    description: 'Popular SARM for muscle building and strength gains with good bioavailability.',
    ingredients: 'LGD-4033 (Ligandrol) 10mg per capsule',
    dosage: '5-10mg daily for 8-12 weeks',
    sideEffects: 'May cause mild water retention or temporary hormonal changes. Post-cycle therapy may be beneficial for some users.',
    benefits: [
      'Effective for muscle building',
      'Supports strength gains',
      'Good oral bioavailability',
      'Well-researched compound'
    ]
  },
  {
    id: 'ostarine',
    name: 'Ostarine (MK-2866)',
    price: 45,
    image: '/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png',
    category: 'sarms',
    description: 'Mild SARM ideal for beginners, supporting muscle preservation and gradual gains.',
    ingredients: 'Ostarine (MK-2866) 25mg per capsule',
    dosage: '15-25mg daily for 8-12 weeks',
    sideEffects: 'Generally well-tolerated. Some users may experience mild changes in energy or mood. Monitor your response.',
    benefits: [
      'Beginner-friendly profile',
      'Supports muscle preservation',
      'May help with recovery',
      'Gradual, sustainable gains'
    ]
  },
  {
    id: 'gw501516',
    name: 'GW-501516 (Cardarine)',
    price: 50,
    image: '/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png',
    category: 'fat-burners',
    description: 'PPARδ agonist supporting endurance, fat metabolism, and cardiovascular health.',
    ingredients: 'GW-501516 (Cardarine) 20mg per capsule',
    dosage: '10-20mg daily, can be split into two doses',
    sideEffects: 'Most users tolerate well. Some may experience mild changes in sleep patterns or energy levels initially.',
    benefits: [
      'Supports endurance and stamina',
      'May enhance fat metabolism',
      'Supports cardiovascular health',
      'No hormonal impact'
    ]
  },
  {
    id: 'sr9009',
    name: 'SR-9009 (Stenabolic)',
    price: 55,
    image: '/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png',
    category: 'fat-burners',
    description: 'Rev-ErbA agonist that may support metabolic function and circadian rhythm.',
    ingredients: 'SR-9009 (Stenabolic) 10mg per capsule',
    dosage: '20-30mg daily, split into 3-4 doses',
    sideEffects: 'Generally well-tolerated. Some users may experience mild changes in sleep schedule or energy patterns.',
    benefits: [
      'Supports metabolic function',
      'May improve endurance',
      'Supports healthy sleep cycles',
      'No hormonal suppression'
    ]
  },
  {
    id: 'yk11',
    name: 'YK-11',
    price: 70,
    image: '/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png',
    category: 'sarms',
    description: 'Unique myostatin inhibitor with SARM-like properties for advanced users.',
    ingredients: 'YK-11 5mg per capsule',
    dosage: '5-10mg daily for 6-8 weeks',
    sideEffects: 'More potent compound - may cause hormonal changes or liver stress. Regular monitoring recommended for advanced users.',
    benefits: [
      'Myostatin inhibition',
      'Potent muscle building effects',
      'Supports strength gains',
      'For experienced users'
    ]
  },
  {
    id: 's4',
    name: 'S-4 (Andarine)',
    price: 48,
    image: '/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png',
    category: 'sarms',
    description: 'SARM supporting lean muscle gains while promoting fat loss.',
    ingredients: 'S-4 (Andarine) 25mg per capsule',
    dosage: '25-50mg daily, cycle 5 days on, 2 days off',
    sideEffects: 'Some users may experience temporary vision changes (yellow tint) or mild hormonal effects. Cycling recommended.',
    benefits: [
      'Supports lean muscle growth',
      'May help with fat loss',
      'Good for body recomposition',
      'Relatively fast-acting'
    ]
  },
];
