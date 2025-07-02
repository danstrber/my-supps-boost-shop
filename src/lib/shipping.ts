
// Shipping calculation utilities

export const getShippingCost = (country: string, orderTotal: number): number => {
  // Free shipping for orders $100+
  if (orderTotal >= 100) {
    return 0;
  }
  
  // US shipping
  if (country === 'USA' || country === 'United States') {
    return 10;
  }
  
  // International shipping
  return 17;
};

export const isUSCountry = (country: string): boolean => {
  return country === 'USA' || country === 'United States';
};
