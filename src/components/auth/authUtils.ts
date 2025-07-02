
import { signUp, signIn, signInWithGoogle } from '@/lib/auth';

export const handleEmailAuth = async (
  mode: 'login' | 'signup',
  email: string,
  password: string,
  name?: string,
  referralCode?: string | null,
  country?: string
) => {
  console.log('handleEmailAuth called:', { mode, email, name, referralCode, country });
  
  // Store data for post-auth processing
  if (name) localStorage.setItem('pending_name', name);
  if (country) localStorage.setItem('pending_country', country);
  if (referralCode) localStorage.setItem('pending_referral', referralCode);
  
  if (mode === 'signup') {
    return await signUp(email, password, name, referralCode, country);
  } else {
    return await signIn(email, password);
  }
};

export const handleGoogleAuth = async (
  mode: 'login' | 'signup',
  referralCode?: string | null,
  country?: string
) => {
  console.log('handleGoogleAuth called:', { mode, referralCode, country });
  
  // Store country in localStorage temporarily for Google auth
  if (country) {
    localStorage.setItem('pending_country', country);
  }
  
  return await signInWithGoogle(referralCode);
};
