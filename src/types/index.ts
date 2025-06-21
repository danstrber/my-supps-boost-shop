
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  description: string;
  featured?: boolean;
  labTestFile?: string;
  inStock?: boolean;
  categories?: string[];
  specifications?: {
    en: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      typicalCycleLength: string;
      potencyLevel: string;
    };
    es: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      typicalCycleLength: string;
      potencyLevel: string;
    };
  };
  benefits?: {
    en: string;
    es: string;
  };
  sideEffects?: {
    en: string;
    es: string;
  };
  effectsOnWomen?: {
    en: string;
    es: string;
  };
  howItWorks?: {
    en: string;
    es: string;
  };
  safetyInformation?: {
    en: string;
    es: string;
  };
  cycleInformation?: {
    en: string;
    es: string;
  };
  whatToExpect?: {
    en: string;
    es: string;
  };
  researchBackground?: {
    en: string;
    es: string;
  };
  performanceRatings?: {
    muscleGain: number;
    strength: number;
    fatLoss: number;
    sideEffects: number;
    retention: number;
  };
}
