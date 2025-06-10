
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
    console.log('Attempting auth signup with metadata...');

    // Check for duplicate email first
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking for existing user:', checkError);
      return { data: null, error: { message: 'Error checking account status' } };
    }

    if (existingUser) {
      return { 
        data: null, 
        error: { message: 'This email is already in use.' } 
      };
    }

    // Check IP restrictions (simplified for now - will be enhanced when IP tracking table is added)
    // TODO: Implement IP tracking when database is updated

    // Build metadata object
    const metadata: any = {};
    if (username?.trim()) {
      metadata.name = username.trim();
    }
    if (referralCode?.trim()) {
      metadata.referred_by = referralCode.trim();
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: metadata
      }
    });
    
    if (authError) {
      console.error('Auth signup error:', authError);
      return { data: authData, error: authError };
    }

    console.log('Auth user created successfully:', authData.user?.id);
    return { data: authData, error: authError };
  } else {
    // Login mode - check for 2FA after successful password auth
    console.log('Attempting login for email:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
      return { data, error };
    }

    // Check if user has 2FA enabled (simplified for now)
    if (data.user) {
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', data.user.id)
        .maybeSingle();

      // For now, proceed with login - 2FA will be handled when database is updated
      console.log('Login successful:', data);
      return { data, error: null };
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
    redirectTo: `${window.location.origin}/`,
    queryParams: {}
  };

  if (mode === 'signup' && referralCode?.trim()) {
    oauthOptions.queryParams.referred_by = referralCode.trim();
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
