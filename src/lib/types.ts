
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
    };
    es: {
      dosePerCapsule: string;
      capsulesPerBottle: string;
      suggestedUse: string;
      benefits: string[];
    };
  };
  whatToExpect: {
    en: string;
    es: string;
  };
  categories: string[];
  featured: boolean;
  inStock: boolean;
}
