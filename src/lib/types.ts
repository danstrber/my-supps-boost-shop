
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  labTestFile?: string;
  description: {
    en: string;
    es: string;
  };
  specifications: {
    en: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      suggestedUse: string;
      benefits: string[];
      typicalCycleLength: string;
      potencyLevel: string;
    };
    es: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      suggestedUse: string;
      benefits: string[];
      typicalCycleLength: string;
      potencyLevel: string;
    };
  };
  whatToExpect: {
    en: string;
    es: string;
  };
  researchBackground: {
    en: string;
    es: string;
  };
  benefits: {
    en: string;
    es: string;
  };
  sideEffects: {
    en: string;
    es: string;
  };
  effectsOnWomen: {
    en: string;
    es: string;
  };
  howItWorks: {
    en: string;
    es: string;
  };
  safetyInformation: {
    en: string;
    es: string;
  };
  cycleInformation: {
    en: string;
    es: string;
  };
  performanceRatings: {
    muscleGain: number;
    strength: number;
    fatLoss: number;
    sideEffects: number;
    retention: number;
  };
  categories: string[];
  featured: boolean;
  inStock: boolean;
}
