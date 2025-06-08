
import { supabase } from '@/integrations/supabase/client';

export const handleEmailAuth = async (
  mode: 'login' | 'signup',
  email: string,
  password: string,
  username?: string,
  referralCode?: string
) => {
  if (mode === 'signup') {
    const signupData: any = {
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          name: username
        }
      }
    };

    if (referralCode) {
      signupData.options.data.referred_by = referralCode;
    }

    const { data, error } = await supabase.auth.signUp(signupData);
    return { data, error };
  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }
};

export const handleGoogleAuth = async (mode: 'login' | 'signup', referralCode?: string) => {
  const oauthOptions: any = {
    redirectTo: `${window.location.origin}/`
  };

  if (mode === 'signup' && referralCode) {
    oauthOptions.queryParams = {
      referred_by: referralCode
    };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: oauthOptions
  });

  return { data, error };
};
