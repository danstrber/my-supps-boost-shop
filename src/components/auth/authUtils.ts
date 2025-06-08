
import { supabase } from '@/integrations/supabase/client';

export const handleEmailAuth = async (
  mode: 'login' | 'signup',
  email: string,
  password: string,
  username?: string,
  referralCode?: string
) => {
  console.log(`Starting ${mode} process...`, { email, username, referralCode });

  if (mode === 'signup') {
    const signupData: any = {
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {}
      }
    };

    if (username) {
      signupData.options.data.name = username;
    }

    if (referralCode) {
      signupData.options.data.referred_by = referralCode;
    }

    const { data, error } = await supabase.auth.signUp(signupData);
    
    if (error) {
      console.error('Signup error:', error);
    } else {
      console.log('Signup successful:', data);
    }
    
    return { data, error };
  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
    } else {
      console.log('Login successful:', data);
    }
    
    return { data, error };
  }
};

export const handleGoogleAuth = async (mode: 'login' | 'signup', referralCode?: string) => {
  console.log(`Starting Google ${mode}...`, { referralCode });

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

  if (error) {
    console.error('Google auth error:', error);
  } else {
    console.log('Google auth initiated:', data);
  }

  return { data, error };
};
