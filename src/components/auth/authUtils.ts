
import { supabase } from '@/integrations/supabase/client';

export const handleEmailAuth = async (
  mode: 'login' | 'signup',
  email: string,
  password: string,
  username?: string,
  referralCode?: string
) => {
  console.log(`Starting ${mode} process...`, { 
    email, 
    username, 
    referralCode: referralCode || 'none',
    hasReferralCode: !!referralCode 
  });

  if (mode === 'signup') {
    const signupData: any = {
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {}
      }
    };

    // Always add username if provided
    if (username?.trim()) {
      signupData.options.data.name = username.trim();
      console.log('Adding username to signup data:', username.trim());
    }

    // Add referral code if provided
    if (referralCode?.trim()) {
      signupData.options.data.referred_by = referralCode.trim();
      console.log('Adding referral code to signup data:', referralCode.trim());
    }

    console.log('Final signup data:', JSON.stringify(signupData, null, 2));

    const { data, error } = await supabase.auth.signUp(signupData);
    
    if (error) {
      console.error('Signup error:', error);
    } else {
      console.log('Signup successful:', data);
      console.log('User created with ID:', data.user?.id);
    }
    
    return { data, error };
  } else {
    console.log('Attempting login for email:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
    } else {
      console.log('Login successful:', data);
      console.log('User logged in with ID:', data.user?.id);
    }
    
    return { data, error };
  }
};

export const handleGoogleAuth = async (mode: 'login' | 'signup', referralCode?: string) => {
  console.log(`Starting Google ${mode}...`, { 
    referralCode: referralCode || 'none',
    hasReferralCode: !!referralCode 
  });

  const oauthOptions: any = {
    redirectTo: `${window.location.origin}/`
  };

  if (mode === 'signup' && referralCode?.trim()) {
    oauthOptions.queryParams = {
      referred_by: referralCode.trim()
    };
    console.log('Adding referral code to Google auth:', referralCode.trim());
  }

  console.log('Google auth options:', JSON.stringify(oauthOptions, null, 2));

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
