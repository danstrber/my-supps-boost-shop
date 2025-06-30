
// Utility functions for referral system
export const generateReferralLink = (referralCode: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}?ref=${referralCode}`;
};

export const getReferralCodeFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
};

export const clearReferralFromUrl = (): void => {
  const url = new URL(window.location.href);
  url.searchParams.delete('ref');
  window.history.replaceState({}, '', url.toString());
};
