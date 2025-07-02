
// Shipping calculation utilities

export const getShippingCost = (country: string, orderTotal: number): number => {
  const isUS = isUSCountry(country);
  
  // Free shipping threshold: $110 for both US and international (based on subtotal before discount)
  const freeShippingThreshold = 110;
  
  if (orderTotal >= freeShippingThreshold) {
    return 0;
  }
  
  // US shipping: $10, International: $18.50
  return isUS ? 10 : 18.5;
};

export const isUSCountry = (country: string): boolean => {
  return country === 'USA' || country === 'United States';
};
