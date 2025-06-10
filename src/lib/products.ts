
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
    price: 34.99,
    image: '/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'strength'],
    description: 'Powerful anabolic compound for serious muscle growth and strength gains.',
    featured: true,
    inStock: true,
    labTestFile: '/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png',
    dose: '10mg',
    capsules: 20,
    details: {
      research: 'Superdrol (Methasterone) has been extensively studied for its potent anabolic properties and rapid muscle-building capabilities in research settings.',
      effectsOnWomen: 'NOT RECOMMENDED for women due to extremely high virilization risk. Can cause permanent masculine features, voice deepening, and severe hormonal disruption.',
      benefits: 'Rapid muscle mass gains (8-15lbs in 4 weeks), dramatic strength increases, enhanced protein synthesis, improved nitrogen retention, minimal water retention.',
      sideEffects: 'Hepatotoxicity (liver stress), cardiovascular strain, blood pressure elevation, cholesterol imbalances, natural testosterone suppression, potential mood changes.',
      history: 'Originally developed in the 1950s by Syntex, later reformulated and marketed as a "prohormone" before being classified as an anabolic steroid.',
      howItWorks: 'Binds strongly to androgen receptors, promoting intense protein synthesis and muscle growth while minimizing estrogenic effects.',
      safety: 'Requires liver support (NAC, TUDCA), regular blood work monitoring, and proper post-cycle therapy. Not for beginners.',
      cycle: 'Typical cycles: 4-6 weeks maximum due to liver toxicity. Always followed by comprehensive PCT.',
      cycleLength: '4-6 weeks maximum',
      strength: 'Extremely high anabolic potency - one of the strongest oral compounds available',
      expectations: 'Users typically gain 8-15 lbs of lean muscle in 4 weeks with significant strength increases. Results are dramatic but require proper PCT to maintain.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 3,
        'Side Effects': 2,
        'Keepability': 4
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
    capsules: 45,
    details: {
      research: 'MK-677 (Ibutamoren) is extensively researched as a growth hormone secretagogue that increases IGF-1 and growth hormone levels naturally.',
      effectsOnWomen: 'Generally well-tolerated by women. May cause mild water retention and increased appetite. Start with lower doses (5-10mg).',
      benefits: 'Increased growth hormone and IGF-1 levels, improved recovery, better sleep quality, enhanced skin and hair, gradual muscle gains, improved bone density.',
      sideEffects: 'Mild water retention, increased appetite, potential blood sugar changes, temporary lethargy in some users, tingling in hands/feet initially.',
      history: 'Developed for treating growth hormone deficiency, muscle wasting, and age-related conditions. Extensively studied for anti-aging properties.',
      howItWorks: 'Mimics ghrelin and stimulates growth hormone release from the pituitary gland without affecting cortisol or other hormones.',
      safety: 'Generally safe with proper cycling. Monitor blood sugar levels. Can be used longer-term compared to other compounds.',
      cycle: 'Typically used for 8-16 weeks. Can be cycled continuously with breaks or used year-round at lower doses.',
      cycleLength: '8-16 weeks (can be extended)',
      strength: 'Moderate - focuses on recovery and gradual quality gains rather than dramatic changes',
      expectations: 'Gradual improvements in recovery, sleep, and body composition. 3-8 lbs of quality muscle over 12 weeks with better overall well-being.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 3,
        'Side Effects': 4,
        'Keepability': 5
      }
    }
  },
  {
    id: '3',
    name: 'RAD-140',
    price: 49.99,
    image: '/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png',
    category: 'sarms',
    categories: ['sarms', 'bulking'],
    description: 'Powerful SARM for significant muscle gains and strength enhancement.',
    featured: true,
    inStock: true,
    dose: '10mg',
    capsules: 50,
    details: {
      research: 'RAD-140 (Testolone) is one of the most potent SARMs with extensive research showing strong anabolic effects with reduced androgenic side effects.',
      effectsOnWomen: 'NOT RECOMMENDED for women due to strong androgenic effects. Risk of virilization even at low doses.',
      benefits: 'Rapid muscle growth, significant strength increases, enhanced endurance, improved recovery, minimal water retention, neuroprotective properties.',
      sideEffects: 'Potential testosterone suppression, mild aggression in some users, possible hair loss in predisposed individuals, temporary mood changes.',
      history: 'Developed as a safer alternative to anabolic steroids for treating muscle wasting and bone loss while minimizing prostate effects.',
      howItWorks: 'Selective androgen receptor modulator with high anabolic activity and reduced androgenic effects compared to traditional steroids.',
      safety: 'Requires post-cycle therapy for cycles over 6 weeks. Regular blood work recommended to monitor testosterone levels.',
      cycle: 'Typically used for 8-12 weeks followed by 4-8 week PCT depending on suppression level.',
      cycleLength: '8-12 weeks',
      strength: 'Very high anabolic potency - among the strongest SARMs available',
      expectations: 'Users typically gain 8-15 lbs of lean muscle with significant strength increases. Results are substantial and well-maintained post-cycle.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 3,
        'Side Effects': 3,
        'Keepability': 4
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
      research: 'Extensively studied as a bronchodilator and thermogenic compound. Research shows significant fat loss and metabolic enhancement properties.',
      effectsOnWomen: 'Well-tolerated by women and often preferred for cutting cycles. Women typically use 10-40mcg daily with good results.',
      benefits: 'Rapid fat loss, increased metabolic rate, improved cardiovascular performance, muscle preservation during calorie restriction, enhanced energy levels.',
      sideEffects: 'Jitters, increased heart rate, sweating, insomnia, muscle cramps, potential cardiac stress at high doses, anxiety in sensitive individuals.',
      history: 'Originally developed as an asthma medication, later discovered for its potent fat-burning and performance-enhancing properties.',
      howItWorks: 'Stimulates beta-2 receptors to increase metabolic rate, body temperature, and fat oxidation while preserving lean muscle tissue.',
      safety: 'Should be cycled properly with gradual dose increases. Monitor heart rate and blood pressure. Stay hydrated and supplement with taurine.',
      cycle: 'Typically used in 2-week on/2-week off cycles or pyramid protocols starting low and increasing gradually.',
      cycleLength: '2-6 weeks with breaks',
      strength: 'Very high thermogenic potency - one of the most effective fat burners available',
      expectations: 'Users can expect 2-5% body fat reduction over 4-6 week cycles with proper diet. Rapid visible changes in definition and vascularity.',
      ratings: {
        'Muscle Gain': 1,
        'Strength': 2,
        'Fat Loss': 5,
        'Side Effects': 3,
        'Keepability': 4
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
    description: 'Selective estrogen receptor modulator for post-cycle therapy and hormone optimization.',
    featured: true,
    inStock: true,
    dose: '12.5mg',
    capsules: 25,
    details: {
      research: 'Enclomiphene is well-researched as a SERM for testosterone restoration and fertility enhancement. Studies show effective LH/FSH stimulation.',
      effectsOnWomen: 'Can be used by women for fertility purposes under medical supervision. Not typically used for PCT as women don\'t suppress testosterone.',
      benefits: 'Restores natural testosterone production, prevents estrogen rebound, maintains muscle gains post-cycle, improves fertility markers, mood stabilization.',
      sideEffects: 'Mild mood swings, potential vision changes (rare), hot flashes, temporary libido fluctuations during hormone restoration.',
      history: 'Developed as a fertility treatment, now widely used for hormone restoration after suppressive cycles and testosterone optimization.',
      howItWorks: 'Blocks estrogen receptors in the hypothalamus, stimulating natural LH and FSH production, which restores testosterone levels.',
      safety: 'Generally safe when used properly for PCT protocols. Much safer than older SERMs with fewer side effects.',
      cycle: 'Used for 4-8 weeks after completing suppressive cycles. Can also be used for natural testosterone optimization.',
      cycleLength: '4-8 weeks post-cycle',
      strength: 'Moderate but crucial for hormone recovery - essential for maintaining gains',
      expectations: 'Users can expect restored hormone levels within 4-6 weeks and maintained muscle gains from previous cycles.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 2,
        'Side Effects': 4,
        'Keepability': 5
      }
    }
  },
  {
    id: '6',
    name: 'Aromasin',
    price: 24.99,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    category: 'pct',
    categories: ['pct', 'anti-estrogen'],
    description: 'Aromatase inhibitor for estrogen control during and after cycles.',
    featured: false,
    inStock: true,
    dose: '25mg',
    capsules: 10,
    details: {
      research: 'Aromasin (Exemestane) is extensively researched as a potent aromatase inhibitor that permanently binds to aromatase enzymes, preventing estrogen production.',
      effectsOnWomen: 'NOT RECOMMENDED for women as it will severely suppress estrogen levels, causing bone loss, mood issues, and other serious health problems.',
      benefits: 'Prevents gynecomastia, reduces water retention, prevents estrogen rebound, maintains muscle hardness, improves libido during cycles.',
      sideEffects: 'Joint pain, reduced bone density with long-term use, potential mood changes, dry skin, possible negative impact on cholesterol.',
      history: 'Originally developed for treating breast cancer in postmenopausal women, later adopted by bodybuilders for estrogen control.',
      howItWorks: 'Irreversibly binds to aromatase enzymes, permanently deactivating them and preventing testosterone conversion to estrogen.',
      safety: 'Should not be used without proper monitoring. Can crash estrogen levels if overdosed. Blood work essential to monitor estrogen levels.',
      cycle: 'Used during cycles with aromatizing compounds or as part of PCT protocol. Typically 12.5-25mg every other day.',
      cycleLength: 'Duration of cycle + 2-4 weeks',
      strength: 'Very potent - one of the strongest aromatase inhibitors available',
      expectations: 'Effective estrogen control, reduced water retention, prevention of estrogenic side effects. Must be dosed carefully.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 3,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  }
];

export const getProductById = (id: string) => products.find(product => product.id === id);

export const getProductsByCategory = (category: string) => products.filter(product => product.categories.includes(category));
