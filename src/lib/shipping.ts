
// Shipping calculation utilities

export const getShippingCost = (country: string, orderTotal: number): number => {
  const isUS = isUSCountry(country);
  
  // Free shipping thresholds: $100 for US, $130 for international (based on subtotal before discount)
  const freeShippingThreshold = isUS ? 100 : 130;
  
  if (orderTotal >= freeShippingThreshold) {
    return 0;
  }
  
  // US shipping: $12.50, International: $18.50
  return isUS ? 12.5 : 18.5;
};

export const isUSCountry = (country: string): boolean => {
  return country === 'USA' || country === 'United States';
};

export const getFreeShippingThreshold = (country: string): number => {
  return isUSCountry(country) ? 100 : 130;
};
