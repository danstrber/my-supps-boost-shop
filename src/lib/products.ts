
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  sideEffects: string;
  dosage: string;
  categories: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ostarine (MK-2866)",
    price: 15,
    images: ["/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png"],
    description: "One of the most researched SARMs with potential for muscle growth and bone health support.",
    sideEffects: "Generally well-tolerated. Some users may experience mild testosterone suppression with extended use. Regular monitoring recommended.",
    dosage: "Typical range: 10-25mg daily. Start with lower doses and assess tolerance.",
    categories: ["sarms", "beginner"]
  },
  {
    id: "2", 
    name: "Ligandrol (LGD-4033)",
    price: 20,
    images: ["/lovable-uploads/03872941-927f-4c0f-bbdc-f29c84db2e6c.png"],
    description: "Popular for its potential muscle-building properties and strength enhancement.",
    sideEffects: "May cause mild testosterone suppression. Some users report temporary water retention. Post-cycle support may be beneficial.",
    dosage: "Typical range: 5-10mg daily. Conservative approach recommended for beginners.",
    categories: ["sarms", "intermediate"]
  },
  {
    id: "3",
    name: "Cardarine (GW-501516)",
    price: 18,
    images: ["/lovable-uploads/092e9c9b-041a-4ad5-9acb-f427fbf3db14.png"],
    description: "Known for potential endurance and metabolic benefits.",
    sideEffects: "Generally well-tolerated in short-term use. Long-term effects not fully established. Use with caution.",
    dosage: "Typical range: 10-20mg daily. Cycling recommended.",
    categories: ["sarms", "cutting"]
  },
  {
    id: "4",
    name: "Andarine (S4)",
    price: 16,
    images: ["/lovable-uploads/1bf4f1ae-fdea-4150-a6f0-d7624092d03b.png"],
    description: "Research compound with potential for body composition improvements.",
    sideEffects: "May cause temporary vision effects (yellow tint) in some users. Generally reversible upon discontinuation.",
    dosage: "Typical range: 25-50mg daily in divided doses. Monitor for vision changes.",
    categories: ["sarms", "cutting"]
  },
  {
    id: "5",
    name: "RAD-140 (Testolone)",
    price: 22,
    images: ["/lovable-uploads/286bede4-8413-4ea2-ba39-1386b5f021fd.png"],
    description: "Potent research compound with strong anabolic potential.",
    sideEffects: "May cause moderate testosterone suppression. Some users report mild aggression or mood changes.",
    dosage: "Typical range: 10-20mg daily. More experienced users only.",
    categories: ["sarms", "advanced"]
  },
  {
    id: "6",
    name: "YK-11",
    price: 25,
    images: ["/lovable-uploads/321d7f80-c176-4697-9b07-e889b642e288.png"],
    description: "Unique compound with myostatin inhibition properties.",
    sideEffects: "Limited research available. May cause testosterone suppression. Liver function monitoring advised.",
    dosage: "Typical range: 5-10mg daily. Advanced users only due to limited research.",
    categories: ["sarms", "advanced"]
  },
  {
    id: "mk677",
    name: "MK-677 (Ibutamoren)",
    price: 30,
    images: ["/lovable-uploads/3676fa98-6e90-442a-99d8-ce8d8d9bef23.png"],
    description: "Growth hormone secretagogue with potential for recovery and sleep benefits.",
    sideEffects: "May cause increased appetite, mild water retention, or temporary insulin sensitivity changes.",
    dosage: "Typical range: 10-25mg daily, preferably before bed.",
    categories: ["growth-hormone", "recovery"]
  },
  {
    id: "superdrol",
    name: "Superdrol",
    price: 35,
    images: ["/lovable-uploads/3d1bbbbd-6bf6-479b-9030-d3c83459de3b.png"],
    description: "Potent oral compound for experienced users seeking significant gains.",
    sideEffects: "May cause liver stress, blood pressure changes, and hormonal suppression. Regular health monitoring essential.",
    dosage: "Typical range: 10-20mg daily. Short cycles recommended. Experienced users only.",
    categories: ["prohormones", "advanced"]
  },
  {
    id: "anavar",
    name: "Anavar",
    price: 40,
    images: ["/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png"],
    description: "Well-researched compound known for lean muscle preservation.",
    sideEffects: "Generally mild side effect profile. May cause minor liver enzyme elevation and cholesterol changes.",
    dosage: "Typical range: 20-50mg daily. Regular health monitoring recommended.",
    categories: ["anabolic", "cutting"]
  },
  {
    id: "winstrol",
    name: "Winstrol",
    price: 38,
    images: ["/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png"],
    description: "Popular for cutting phases and athletic performance enhancement.",
    sideEffects: "May cause joint dryness, cholesterol changes, and liver stress. Hair loss possible in predisposed individuals.",
    dosage: "Typical range: 25-50mg daily. Joint support supplements recommended.",
    categories: ["anabolic", "cutting"]
  },
  {
    id: "dianabol",
    name: "Dianabol",
    price: 32,
    images: ["/lovable-uploads/5d2b3f9c-eeb8-40cc-b547-0902cd012226.png"],
    description: "Classic compound for rapid muscle and strength gains.",
    sideEffects: "May cause water retention, elevated blood pressure, and liver stress. Estrogenic effects possible.",
    dosage: "Typical range: 20-40mg daily. Liver support and cycle management essential.",
    categories: ["anabolic", "bulking"]
  },
  {
    id: "trenbolone",
    name: "Trenbolone",
    price: 45,
    images: ["/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png"],
    description: "Highly potent compound for experienced users seeking dramatic results.",
    sideEffects: "Significant side effects possible including night sweats, mood changes, and cardiovascular stress. Advanced users only.",
    dosage: "Typical range: 200-400mg weekly. Extensive experience and health monitoring required.",
    categories: ["anabolic", "advanced"]
  },
  {
    id: "testosterone",
    name: "Testosterone Enanthate",
    price: 28,
    images: ["/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png"],
    description: "Base compound for hormone replacement and performance enhancement.",
    sideEffects: "May cause acne, hair loss in predisposed individuals, and estrogenic effects. Regular monitoring advised.",
    dosage: "Typical range: 250-500mg weekly. Bloodwork and cycle support recommended.",
    categories: ["anabolic", "testosterone"]
  },
  {
    id: "deca",
    name: "Deca Durabolin",
    price: 42,
    images: ["/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png"],
    description: "Long-acting compound known for joint health benefits and steady gains.",
    sideEffects: "May cause erectile dysfunction (deca dick), prolactin elevation, and slow recovery. Long detection time.",
    dosage: "Typical range: 300-600mg weekly. Often combined with testosterone.",
    categories: ["anabolic", "bulking"]
  },
  {
    id: "primobolan",
    name: "Primobolan",
    price: 50,
    images: ["/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png"],
    description: "Mild compound favored for its safety profile and quality gains.",
    sideEffects: "Generally mild side effect profile. May cause minor testosterone suppression and cost considerations.",
    dosage: "Typical range: 400-800mg weekly. Longer cycles often preferred.",
    categories: ["anabolic", "cutting"]
  },
  {
    id: "equipoise",
    name: "Equipoise",
    price: 36,
    images: ["/lovable-uploads/77e6f089-3a81-4383-bec7-323928b8b739.png"],
    description: "Steady gains compound with appetite enhancement properties.",
    sideEffects: "May cause increased red blood cell count, anxiety in some users, and long detection time.",
    dosage: "Typical range: 400-800mg weekly. Blood donation may be necessary.",
    categories: ["anabolic", "lean-bulking"]
  },
  {
    id: "masteron",
    name: "Masteron",
    price: 44,
    images: ["/lovable-uploads/7eaf0b79-d90d-4ac9-a577-b5a57d1272f1.png"],
    description: "Anti-estrogenic compound popular for cutting and muscle hardening.",
    sideEffects: "May cause hair loss in predisposed individuals and androgenic effects. Generally well-tolerated.",
    dosage: "Typical range: 300-600mg weekly. Often used in cutting phases.",
    categories: ["anabolic", "cutting"]
  },
  {
    id: "anadrol",
    name: "Anadrol",
    price: 34,
    images: ["/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png"],
    description: "Powerful oral compound for rapid mass and strength gains.",
    sideEffects: "May cause significant water retention, liver stress, and blood pressure elevation. Short cycles recommended.",
    dosage: "Typical range: 25-100mg daily. Liver support essential.",
    categories: ["anabolic", "bulking"]
  },
  {
    id: "turinabol",
    name: "Turinabol",
    price: 33,
    images: ["/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png"],
    description: "Oral compound known for clean, quality muscle gains.",
    sideEffects: "May cause liver stress and cholesterol changes. Generally milder than other orals.",
    dosage: "Typical range: 30-60mg daily. Moderate cycles recommended.",
    categories: ["anabolic", "lean-gains"]
  },
  {
    id: "halotestin",
    name: "Halotestin",
    price: 48,
    images: ["/lovable-uploads/96e40d17-f8c0-404b-af96-b7cadb9b096e.png"],
    description: "Extremely potent compound for strength and aggression enhancement.",
    sideEffects: "Highly hepatotoxic and may cause significant mood changes. Very short cycles only.",
    dosage: "Typical range: 10-40mg daily. Extreme caution and experience required.",
    categories: ["anabolic", "strength"]
  },
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    price: 26,
    images: ["/lovable-uploads/9ac178e7-36d1-4738-ac66-d1e3917e7ec5.png"],
    description: "Beta-2 agonist used for fat loss and metabolic enhancement.",
    sideEffects: "May cause jitters, increased heart rate, cramping, and sleep disruption. Cardiovascular monitoring advised.",
    dosage: "Typical range: 20-120mcg daily in pyramid cycles. Start low and assess tolerance.",
    categories: ["fat-loss", "cutting"]
  },
  {
    id: "t3",
    name: "T3 (Cytomel)",
    price: 24,
    images: ["/lovable-uploads/aea84c22-c0e6-477b-aed1-e323fa1bf550.png"],
    description: "Thyroid hormone for metabolic enhancement and fat loss.",
    sideEffects: "May cause thyroid suppression, heart palpitations, and muscle loss if overdosed. Careful dosing essential.",
    dosage: "Typical range: 25-75mcg daily. Gradual increases and decreases recommended.",
    categories: ["fat-loss", "thyroid"]
  },
  {
    id: "hgh",
    name: "Human Growth Hormone",
    price: 80,
    images: ["/lovable-uploads/b43000ed-31b9-4d86-926f-1640e6f0aa3c.png"],
    description: "Naturally occurring hormone for recovery, anti-aging, and body composition.",
    sideEffects: "May cause water retention, joint pain, and carpal tunnel syndrome. Diabetes risk with long-term use.",
    dosage: "Typical range: 2-6 IU daily. Start low and monitor blood glucose.",
    categories: ["growth-hormone", "anti-aging"]
  },
  {
    id: "insulin",
    name: "Insulin",
    price: 60,
    images: ["/lovable-uploads/c13fb27e-2e08-4a90-a2a8-c8d6138e0c9a.png"],
    description: "Powerful anabolic hormone for advanced users seeking maximum gains.",
    sideEffects: "Potentially life-threatening hypoglycemia if misused. Requires extensive knowledge and glucose monitoring.",
    dosage: "Highly individual. Expert guidance and glucose monitoring absolutely essential.",
    categories: ["advanced", "anabolic"]
  },
  {
    id: "igf1",
    name: "IGF-1",
    price: 70,
    images: ["/lovable-uploads/c9fe7da9-5ea7-4596-bcb7-cfddb8e23e93.png"],
    description: "Growth factor for muscle growth and recovery enhancement.",
    sideEffects: "May cause hypoglycemia, organ growth concerns with long-term use, and injection site reactions.",
    dosage: "Typical range: 50-150mcg daily post-workout. Advanced users only.",
    categories: ["growth-hormone", "advanced"]
  },
  {
    id: "peptides",
    name: "Peptide Stack",
    price: 55,
    images: ["/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png"],
    description: "Combination of research peptides for various enhancement goals.",
    sideEffects: "Variable depending on specific peptides. May include injection site reactions and individual sensitivities.",
    dosage: "Highly variable based on specific peptides included. Research each component thoroughly.",
    categories: ["peptides", "research"]
  }
];
