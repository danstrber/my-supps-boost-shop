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
  details: {
    research: string;
    effectsOnWomen: string;
    benefits: string;
    sideEffects: string;
    history: string;
    howItWorks: string;
    safety: string;
    cycle: string;
    expectations: string;
    ratings: {
      [key: string]: number;
    };
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Super Drol',
    price: 34.99,
    image: '/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'strength'],
    description: 'Powerful anabolic compound for serious muscle growth and strength gains.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/superdrol-test.pdf',
    details: {
      research: 'Superdrol has been extensively studied for its anabolic properties and muscle-building capabilities.',
      effectsOnWomen: 'Women should use with extreme caution due to virilization risks.',
      benefits: 'Rapid muscle mass gains, increased strength, enhanced performance.',
      sideEffects: 'Potential liver toxicity, cardiovascular strain, hormonal imbalances.',
      history: 'Originally developed in the 1950s, later reformulated for bodybuilding use.',
      howItWorks: 'Binds to androgen receptors to promote protein synthesis and muscle growth.',
      safety: 'Requires liver support and regular blood work monitoring.',
      cycle: 'Typical cycles range from 4-6 weeks with proper post-cycle therapy.',
      expectations: 'Users can expect 10-15 lbs of muscle gain in a 4-week cycle.',
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
    name: 'Anavar',
    price: 49.99,
    image: '/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'cutting'],
    description: 'Premium quality Anavar for lean muscle gains and cutting cycles.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/anavar-test.pdf',
    details: {
      research: 'Anavar is one of the most researched oral steroids with extensive clinical data.',
      effectsOnWomen: 'Generally well-tolerated by women at low doses with minimal side effects.',
      benefits: 'Lean muscle gains, fat loss, improved muscle hardness and vascularity.',
      sideEffects: 'Mild liver stress, potential cholesterol changes, minimal androgenic effects.',
      history: 'Developed in 1964, originally used for medical conditions like muscle wasting.',
      howItWorks: 'Increases protein synthesis while promoting fat oxidation.',
      safety: 'One of the safer oral steroids with lower hepatotoxicity.',
      cycle: 'Cycles typically last 6-8 weeks for men, 4-6 weeks for women.',
      expectations: 'Expect lean gains of 5-10 lbs with improved muscle definition.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 4,
        'Fat Loss': 5,
        'Side Effects': 4,
        'Keepability': 5
      }
    }
  },
  {
    id: '3',
    name: 'Dianabol',
    price: 29.99,
    image: '/lovable-uploads/68ff590a-199c-454f-a998-8cbff432589c.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'bulking'],
    description: 'Classic mass builder for significant gains in muscle size and strength.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/dianabol-test.pdf',
    details: {
      research: 'One of the most studied anabolic steroids with decades of research data.',
      effectsOnWomen: 'Not recommended for women due to high androgenic activity.',
      benefits: 'Rapid muscle mass gains, increased strength, improved nitrogen retention.',
      sideEffects: 'Water retention, gynecomastia risk, liver toxicity, blood pressure increases.',
      history: 'Developed in 1955, became the most popular oral steroid in bodybuilding.',
      howItWorks: 'Enhances protein synthesis and glycogenolysis for rapid muscle growth.',
      safety: 'Requires liver protection and estrogen control during cycles.',
      cycle: 'Typically used for 4-6 weeks as a kickstart to longer cycles.',
      expectations: 'Users often gain 15-20 lbs in 4-6 weeks, with some water retention.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 2,
        'Side Effects': 2,
        'Keepability': 3
      }
    }
  },
  {
    id: '4',
    name: 'Clenbuterol',
    price: 39.99,
    image: '/lovable-uploads/43854434-7941-4a58-a678-6315a4ff9589.png',
    category: 'weight-loss',
    categories: ['weight-loss', 'cutting'],
    description: 'Effective thermogenic agent for fat loss and enhanced energy levels.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/clenbuterol-test.pdf',
    details: {
      research: 'Extensively studied as a bronchodilator and thermogenic compound.',
      effectsOnWomen: 'Well-tolerated by women, often preferred for cutting cycles.',
      benefits: 'Rapid fat loss, increased metabolism, improved cardiovascular performance.',
      sideEffects: 'Jitters, increased heart rate, sweating, potential cardiac stress.',
      history: 'Originally developed as an asthma medication, later used for fat loss.',
      howItWorks: 'Stimulates beta-2 receptors to increase metabolic rate and fat oxidation.',
      safety: 'Should be cycled properly with gradual dose increases and decreases.',
      cycle: 'Typically used in 2-week on/off cycles or pyramid protocols.',
      expectations: 'Users can expect 1-3% body fat reduction over 4-6 week cycles.',
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
    name: 'Winstrol',
    price: 54.99,
    image: '/lovable-uploads/04f99494-1295-450f-b949-19d1b3599995.png',
    category: 'oral-steroids',
    categories: ['oral-steroids', 'cutting'],
    description: 'Powerful anabolic compound for serious muscle growth and strength gains.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/winstrol-test.pdf',
    details: {
      research: 'Winstrol is well-known for its ability to promote lean muscle mass.',
      effectsOnWomen: 'Generally safe for women at low doses with minimal virilization.',
      benefits: 'Increased strength, improved muscle hardness, fat loss.',
      sideEffects: 'Liver toxicity, joint pain, cholesterol changes.',
      history: 'Developed in the 1960s, widely used in cutting cycles.',
      howItWorks: 'Enhances protein synthesis and nitrogen retention.',
      safety: 'Requires liver support and monitoring during use.',
      cycle: 'Commonly used for 6-8 weeks in cutting phases.',
      expectations: 'Users can expect lean gains and improved muscle definition.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 4,
        'Fat Loss': 4,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  },
  {
    id: '6',
    name: 'Testosterone Enanthate',
    price: 69.99,
    image: '/lovable-uploads/a424559d-744f-49b2-9544-909ca49b6c5a.png',
    category: 'injectable-steroids',
    categories: ['injectable-steroids', 'bulking'],
    description: 'Long-lasting testosterone ester for sustained muscle growth and performance.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/test-e-test.pdf',
    details: {
      research: 'Testosterone Enanthate is a staple injectable steroid with extensive research.',
      effectsOnWomen: 'Not recommended for women due to strong androgenic effects.',
      benefits: 'Increased muscle mass, strength, and recovery.',
      sideEffects: 'Estrogen conversion, water retention, acne.',
      history: 'One of the oldest and most used testosterone esters.',
      howItWorks: 'Provides steady testosterone release over weeks.',
      safety: 'Requires estrogen control and post-cycle therapy.',
      cycle: 'Typically used for 8-12 weeks in bulking cycles.',
      expectations: 'Users can expect significant muscle and strength gains.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 2,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  },
  {
    id: '7',
    name: 'Trenbolone Acetate',
    price: 79.99,
    image: '/lovable-uploads/597a1c77-401c-490a-a931-19b35259e099.png',
    category: 'injectable-steroids',
    categories: ['injectable-steroids', 'strength'],
    description: 'Potent anabolic steroid for rapid muscle gains and enhanced strength.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/tren-a-test.pdf',
    details: {
      research: 'Trenbolone is known for its powerful anabolic and androgenic effects.',
      effectsOnWomen: 'Not recommended for women due to severe virilization.',
      benefits: 'Rapid muscle growth, fat loss, increased strength.',
      sideEffects: 'Night sweats, aggression, cardiovascular strain.',
      history: 'Originally developed for veterinary use, adopted by bodybuilders.',
      howItWorks: 'Binds strongly to androgen receptors, enhancing protein synthesis.',
      safety: 'Requires careful monitoring and post-cycle therapy.',
      cycle: 'Short cycles of 6-8 weeks are common.',
      expectations: 'Users can expect dramatic gains in muscle and strength.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 4,
        'Side Effects': 5,
        'Keepability': 3
      }
    }
  },
  {
    id: '8',
    name: 'Masteron',
    price: 84.99,
    image: '/lovable-uploads/4e34a42b-9912-4499-8299-59203444955d.png',
    category: 'injectable-steroids',
    categories: ['injectable-steroids', 'cutting'],
    description: 'Premium quality Masteron for lean muscle gains and cutting cycles.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/masteron-test.pdf',
    details: {
      research: 'Masteron is favored for its anti-estrogenic properties and hardness effects.',
      effectsOnWomen: 'Women may use at low doses with caution.',
      benefits: 'Improved muscle hardness, fat loss, lean gains.',
      sideEffects: 'Androgenic effects, potential hair loss.',
      history: 'Used medically for breast cancer treatment, adopted by athletes.',
      howItWorks: 'Acts as a DHT derivative with anti-estrogenic effects.',
      safety: 'Generally well-tolerated with proper dosing.',
      cycle: 'Used in cutting cycles of 6-8 weeks.',
      expectations: 'Users can expect improved muscle definition and hardness.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 4,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  },
  {
    id: '9',
    name: 'SARMs Stack',
    price: 99.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    categories: ['sarms', 'stack'],
    description: 'Advanced SARMs stack for enhanced muscle growth and fat loss.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/sarms-stack-test.pdf',
    details: {
      research: 'SARMs are selective androgen receptor modulators with targeted effects.',
      effectsOnWomen: 'Generally safer for women than steroids but still caution advised.',
      benefits: 'Muscle growth, fat loss, improved endurance.',
      sideEffects: 'Potential hormonal suppression, mild side effects.',
      history: 'Developed as alternatives to anabolic steroids.',
      howItWorks: 'Selectively binds androgen receptors in muscle and bone.',
      safety: 'Requires cycling and post-cycle therapy.',
      cycle: 'Commonly used in 8-12 week cycles.',
      expectations: 'Users can expect lean gains and fat loss.',
      ratings: {
        'Muscle Gain': 4,
        'Strength': 4,
        'Fat Loss': 4,
        'Side Effects': 2,
        'Keepability': 4
      }
    }
  },
  {
    id: '10',
    name: 'Peptides Blend',
    price: 109.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'recovery'],
    description: 'Powerful blend of peptides for muscle repair, growth, and overall recovery.',
    featured: true,
    inStock: true,
    labTestFile: '/lab-tests/peptides-blend-test.pdf',
    details: {
      research: 'Peptides are short chains of amino acids with various biological effects.',
      effectsOnWomen: 'Generally safe and beneficial for both genders.',
      benefits: 'Enhanced recovery, muscle growth, anti-aging effects.',
      sideEffects: 'Minimal side effects, mostly injection site reactions.',
      history: 'Used medically for various therapeutic purposes.',
      howItWorks: 'Stimulates growth hormone release and tissue repair.',
      safety: 'Safe with proper dosing and protocols.',
      cycle: 'Used continuously or in cycles depending on goals.',
      expectations: 'Users can expect improved recovery and muscle quality.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 3,
        'Side Effects': 1,
        'Keepability': 5
      }
    }
  },
  {
    id: '11',
    name: 'Equipoise',
    price: 74.99,
    image: '/lovable-uploads/597a1c77-401c-490a-a931-19b35259e099.png',
    category: 'injectable-steroids',
    categories: ['injectable-steroids', 'bulking'],
    description: 'Long-lasting injectable steroid for steady muscle growth and increased appetite.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/equipoise-test.pdf',
    details: {
      research: 'Equipoise is known for its mild anabolic effects and long half-life.',
      effectsOnWomen: 'Not recommended for women due to androgenic effects.',
      benefits: 'Steady muscle gains, improved appetite, enhanced endurance.',
      sideEffects: 'Mild estrogenic effects, potential androgenic side effects.',
      history: 'Originally developed for veterinary use.',
      howItWorks: 'Provides slow release of anabolic steroid over weeks.',
      safety: 'Requires estrogen control and monitoring.',
      cycle: 'Used in 8-12 week bulking cycles.',
      expectations: 'Users can expect lean muscle gains and improved recovery.',
      ratings: {
        'Muscle Gain': 4,
        'Strength': 3,
        'Fat Loss': 2,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  },
  {
    id: '12',
    name: 'Primobolan',
    price: 89.99,
    image: '/lovable-uploads/4e34a42b-9912-4499-8299-59203444955d.png',
    category: 'injectable-steroids',
    categories: ['injectable-steroids', 'cutting'],
    description: 'Mild anabolic steroid for lean muscle gains and enhanced performance.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/primobolan-test.pdf',
    details: {
      research: 'Primobolan is favored for its mild anabolic effects and safety profile.',
      effectsOnWomen: 'Often used by women at low doses with minimal side effects.',
      benefits: 'Lean muscle gains, fat loss, improved endurance.',
      sideEffects: 'Minimal estrogenic effects, mild androgenic effects.',
      history: 'Developed for medical use in muscle wasting diseases.',
      howItWorks: 'Binds androgen receptors with mild anabolic activity.',
      safety: 'Generally safe with proper dosing.',
      cycle: 'Used in cutting cycles of 6-8 weeks.',
      expectations: 'Users can expect lean gains and improved muscle quality.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 4,
        'Side Effects': 2,
        'Keepability': 5
      }
    }
  },
  {
    id: '13',
    name: 'HGH Fragment 176-191',
    price: 119.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'fat-loss'],
    description: 'Specialized peptide for targeted fat loss and improved metabolism.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/hgh-frag-test.pdf',
    details: {
      research: 'HGH Fragment 176-191 is a modified form of human growth hormone.',
      effectsOnWomen: 'Safe and effective for fat loss in both genders.',
      benefits: 'Targeted fat loss, improved metabolism, muscle preservation.',
      sideEffects: 'Minimal side effects reported.',
      history: 'Developed to isolate fat loss effects of HGH.',
      howItWorks: 'Stimulates lipolysis and inhibits lipogenesis.',
      safety: 'Safe with proper dosing and protocols.',
      cycle: 'Used in cycles of 6-8 weeks.',
      expectations: 'Users can expect fat loss without muscle loss.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 5,
        'Side Effects': 1,
        'Keepability': 5
      }
    }
  },
  {
    id: '14',
    name: 'IGF-1 LR3',
    price: 129.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'growth'],
    description: 'Potent peptide for muscle growth, recovery, and enhanced nutrient absorption.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/igf-1-test.pdf',
    details: {
      research: 'IGF-1 LR3 is a synthetic analog of insulin-like growth factor.',
      effectsOnWomen: 'Generally safe with proper dosing.',
      benefits: 'Muscle growth, improved recovery, enhanced nutrient uptake.',
      sideEffects: 'Potential hypoglycemia if misused.',
      history: 'Developed for enhanced anabolic effects over native IGF-1.',
      howItWorks: 'Stimulates cell growth and differentiation.',
      safety: 'Requires careful dosing and monitoring.',
      cycle: 'Used in cycles of 6-8 weeks.',
      expectations: 'Users can expect improved muscle size and recovery.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 4,
        'Fat Loss': 3,
        'Side Effects': 2,
        'Keepability': 4
      }
    }
  },
  {
    id: '15',
    name: 'Ostarine (MK-2866)',
    price: 64.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    categories: ['sarms', 'cutting'],
    description: 'Versatile SARM for muscle growth, bone density, and overall body recomposition.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/ostarine-test.pdf',
    details: {
      research: 'Ostarine is one of the most studied SARMs with clinical trials.',
      effectsOnWomen: 'Generally safe and effective for women.',
      benefits: 'Muscle preservation, fat loss, improved bone density.',
      sideEffects: 'Mild hormonal suppression possible.',
      history: 'Developed for muscle wasting and osteoporosis.',
      howItWorks: 'Selective androgen receptor modulator with anabolic effects.',
      safety: 'Requires cycling and post-cycle therapy.',
      cycle: 'Used in 8-12 week cycles.',
      expectations: 'Users can expect lean gains and fat loss.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 4,
        'Side Effects': 2,
        'Keepability': 4
      }
    }
  },
  {
    id: '16',
    name: 'Ligandrol (LGD-4033)',
    price: 74.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    categories: ['sarms', 'bulking'],
    description: 'Powerful SARM for significant muscle gains and increased strength.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/ligandrol-test.pdf',
    details: {
      research: 'Ligandrol is a potent SARM with strong anabolic effects.',
      effectsOnWomen: 'Not recommended for women due to androgenic effects.',
      benefits: 'Muscle growth, strength gains, improved recovery.',
      sideEffects: 'Hormonal suppression, potential side effects.',
      history: 'Developed for muscle wasting diseases.',
      howItWorks: 'Selective androgen receptor modulator with high affinity.',
      safety: 'Requires cycling and post-cycle therapy.',
      cycle: 'Used in 8-12 week bulking cycles.',
      expectations: 'Users can expect significant muscle and strength gains.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 2,
        'Side Effects': 3,
        'Keepability': 3
      }
    }
  },
  {
    id: '17',
    name: 'Andarine (S-4)',
    price: 59.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    categories: ['sarms', 'cutting'],
    description: 'Effective SARM for fat loss, muscle hardening, and enhanced vascularity.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/andarine-test.pdf',
    details: {
      research: 'Andarine is a SARM known for its cutting and hardening effects.',
      effectsOnWomen: 'Generally safe at low doses.',
      benefits: 'Fat loss, muscle hardness, improved vascularity.',
      sideEffects: 'Visual side effects reported at high doses.',
      history: 'Developed for muscle wasting and osteoporosis.',
      howItWorks: 'Selective androgen receptor modulator with moderate affinity.',
      safety: 'Requires cycling and monitoring.',
      cycle: 'Used in 6-8 week cutting cycles.',
      expectations: 'Users can expect improved muscle definition and fat loss.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 4,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  },
  {
    id: '18',
    name: 'Cardarine (GW-501516)',
    price: 69.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    categories: ['sarms', 'endurance'],
    description: 'Performance-enhancing SARM for endurance, fat loss, and improved cholesterol levels.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/cardarine-test.pdf',
    details: {
      research: 'Cardarine is a PPAR receptor agonist, often grouped with SARMs.',
      effectsOnWomen: 'Generally safe and effective for both genders.',
      benefits: 'Improved endurance, fat loss, cardiovascular health.',
      sideEffects: 'Potential carcinogenicity in animal studies.',
      history: 'Developed for metabolic and cardiovascular diseases.',
      howItWorks: 'Activates PPAR receptors to enhance metabolism.',
      safety: 'Use with caution due to safety concerns.',
      cycle: 'Used in 6-8 week cycles.',
      expectations: 'Users can expect improved endurance and fat loss.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 5,
        'Side Effects': 4,
        'Keepability': 3
      }
    }
  },
  {
    id: '19',
    name: 'SR9009 (Stenabolic)',
    price: 79.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    categories: ['sarms', 'endurance'],
    description: 'Cutting-edge SARM for enhanced metabolism, fat loss, and improved endurance.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/sr9009-test.pdf',
    details: {
      research: 'SR9009 is a Rev-Erb agonist, often grouped with SARMs.',
      effectsOnWomen: 'Generally safe with proper dosing.',
      benefits: 'Increased metabolism, fat loss, endurance.',
      sideEffects: 'Minimal side effects reported.',
      history: 'Developed for metabolic diseases and endurance enhancement.',
      howItWorks: 'Activates Rev-Erb receptors to regulate metabolism.',
      safety: 'Safe with proper protocols.',
      cycle: 'Used in 6-8 week cycles.',
      expectations: 'Users can expect improved endurance and fat loss.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 5,
        'Side Effects': 1,
        'Keepability': 4
      }
    }
  },
  {
    id: '20',
    name: 'YK-11 (Myostatin Inhibitor)',
    price: 89.99,
    image: '/lovable-uploads/e369912d-439f-448f-b07f-94c2c5f77791.png',
    category: 'sarms',
    categories: ['sarms', 'bulking'],
    description: 'Unique SARM for muscle growth and myostatin inhibition.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/yk11-test.pdf',
    details: {
      research: 'YK-11 is a myostatin inhibitor with anabolic properties.',
      effectsOnWomen: 'Not recommended for women due to strong effects.',
      benefits: 'Muscle growth, strength, reduced myostatin activity.',
      sideEffects: 'Potential hormonal disruption and side effects.',
      history: 'Developed as a novel anabolic agent.',
      howItWorks: 'Inhibits myostatin to promote muscle growth.',
      safety: 'Requires careful dosing and monitoring.',
      cycle: 'Used in 6-8 week bulking cycles.',
      expectations: 'Users can expect rapid muscle gains.',
      ratings: {
        'Muscle Gain': 5,
        'Strength': 5,
        'Fat Loss': 2,
        'Side Effects': 4,
        'Keepability': 3
      }
    }
  },
  {
    id: '21',
    name: 'GHRP-6',
    price: 99.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'growth'],
    description: 'Growth hormone releasing peptide for muscle growth, recovery, and anti-aging.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/ghrp6-test.pdf',
    details: {
      research: 'GHRP-6 stimulates growth hormone release from the pituitary.',
      effectsOnWomen: 'Generally safe and effective for both genders.',
      benefits: 'Increased GH levels, improved recovery, anti-aging effects.',
      sideEffects: 'Mild water retention and increased appetite.',
      history: 'Developed for GH deficiency treatment.',
      howItWorks: 'Stimulates pituitary to release growth hormone.',
      safety: 'Safe with proper dosing.',
      cycle: 'Used in cycles of 6-8 weeks.',
      expectations: 'Users can expect improved recovery and muscle growth.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 3,
        'Side Effects': 1,
        'Keepability': 5
      }
    }
  },
  {
    id: '22',
    name: 'CJC-1295',
    price: 109.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'growth'],
    description: 'Long-acting growth hormone releasing hormone for sustained muscle growth and recovery.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/cjc1295-test.pdf',
    details: {
      research: 'CJC-1295 stimulates GH release with a long half-life.',
      effectsOnWomen: 'Generally safe and effective for both genders.',
      benefits: 'Sustained GH release, improved recovery, muscle growth.',
      sideEffects: 'Minimal side effects reported.',
      history: 'Developed for GH deficiency and anti-aging.',
      howItWorks: 'Stimulates pituitary to release growth hormone over time.',
      safety: 'Safe with proper dosing.',
      cycle: 'Used in cycles of 6-8 weeks.',
      expectations: 'Users can expect improved recovery and muscle quality.',
      ratings: {
        'Muscle Gain': 3,
        'Strength': 3,
        'Fat Loss': 3,
        'Side Effects': 1,
        'Keepability': 5
      }
    }
  },
  {
    id: '23',
    name: 'BPC-157',
    price: 119.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'recovery'],
    description: 'Versatile peptide for accelerated healing, tissue repair, and reduced inflammation.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/bpc157-test.pdf',
    details: {
      research: 'BPC-157 promotes healing and tissue regeneration.',
      effectsOnWomen: 'Safe and beneficial for both genders.',
      benefits: 'Accelerated healing, reduced inflammation, tissue repair.',
      sideEffects: 'Minimal side effects reported.',
      history: 'Derived from gastric juice peptides.',
      howItWorks: 'Promotes angiogenesis and tissue repair.',
      safety: 'Safe with proper dosing.',
      cycle: 'Used continuously or in cycles.',
      expectations: 'Users can expect faster recovery from injuries.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 2,
        'Side Effects': 1,
        'Keepability': 5
      }
    }
  },
  {
    id: '24',
    name: 'TB-500',
    price: 129.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'recovery'],
    description: 'Powerful peptide for injury recovery, tissue regeneration, and reduced pain.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/tb500-test.pdf',
    details: {
      research: 'TB-500 promotes healing and reduces inflammation.',
      effectsOnWomen: 'Safe and effective for both genders.',
      benefits: 'Injury recovery, tissue regeneration, pain reduction.',
      sideEffects: 'Minimal side effects reported.',
      history: 'Synthetic version of thymosin beta-4.',
      howItWorks: 'Promotes cell migration and repair.',
      safety: 'Safe with proper dosing.',
      cycle: 'Used in cycles of 4-6 weeks.',
      expectations: 'Users can expect faster healing and reduced pain.',
      ratings: {
        'Muscle Gain': 2,
        'Strength': 2,
        'Fat Loss': 2,
        'Side Effects': 1,
        'Keepability': 5
      }
    }
  },
  {
    id: '25',
    name: 'Melanotan II',
    price: 79.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'tanning'],
    description: 'Peptide for enhanced tanning, increased libido, and appetite suppression.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/mt2-test.pdf',
    details: {
      research: 'Melanotan II stimulates melanin production and libido.',
      effectsOnWomen: 'Generally safe with proper dosing.',
      benefits: 'Enhanced tanning, increased libido, appetite suppression.',
      sideEffects: 'Nausea, flushing, increased blood pressure.',
      history: 'Developed for tanning and sexual dysfunction.',
      howItWorks: 'Stimulates melanocortin receptors.',
      safety: 'Requires careful dosing.',
      cycle: 'Used intermittently for tanning.',
      expectations: 'Users can expect darker tan and libido boost.',
      ratings: {
        'Muscle Gain': 1,
        'Strength': 1,
        'Fat Loss': 2,
        'Side Effects': 3,
        'Keepability': 3
      }
    }
  },
  {
    id: '26',
    name: 'PT-141 (Bremelanotide)',
    price: 89.99,
    image: '/lovable-uploads/6c58b974-6e9d-4479-8999-bb94a639994a.png',
    category: 'peptides',
    categories: ['peptides', 'sexual-health'],
    description: 'Peptide for enhanced sexual function and increased libido.',
    featured: false,
    inStock: true,
    labTestFile: '/lab-tests/pt141-test.pdf',
    details: {
      research: 'PT-141 is used for sexual dysfunction and libido enhancement.',
      effectsOnWomen: 'Effective for both men and women.',
      benefits: 'Increased libido, improved sexual function.',
      sideEffects: 'Nausea, flushing, headache.',
      history: 'Developed as a treatment for sexual dysfunction.',
      howItWorks: 'Activates melanocortin receptors in the brain.',
      safety: 'Requires proper dosing and monitoring.',
      cycle: 'Used as needed for sexual enhancement.',
      expectations: 'Users can expect improved libido and function.',
      ratings: {
        'Muscle Gain': 1,
        'Strength': 1,
        'Fat Loss': 1,
        'Side Effects': 3,
        'Keepability': 4
      }
    }
  }
];

export const getProductById = (id: string) => products.find(product => product.id === id);

export const getProductsByCategory = (category: string) => products.filter(product => product.categories.includes(category));
