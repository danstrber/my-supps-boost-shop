import { supabase } from '@/integrations/supabase/client';

export const handleEmailAuth = async (
  mode: 'login' | 'signup',
  email: string,
  password: string,
  username?: string,
  referralCode?: string,
  country?: string
) => {
  console.log(`Starting ${mode} process...`, { 
    email, 
    username, 
    referralCode: referralCode || 'none',
    country: country || 'none',
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

    // Generate login intent ID for session linking
    const loginIntentId = crypto.randomUUID();
    localStorage.setItem('loginIntentId', loginIntentId);

    // Build metadata object
    const metadata: any = { loginIntentId };
    if (username?.trim()) {
      metadata.name = username.trim();
    }
    if (referralCode?.trim()) {
      metadata.referred_by = referralCode.trim();
    }
    if (country?.trim()) {
      metadata.country = country.trim();
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?intent=${loginIntentId}`,
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
    // Login mode
    console.log('Attempting login for email:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
      return { data, error };
    }

    console.log('Login successful:', data);
    return { data, error: null };
  }
};

export const handleGoogleAuth = async (mode: 'login' | 'signup', referralCode?: string) => {
  console.log(`Starting Google ${mode}...`, { 
    referralCode: referralCode || 'none',
    hasReferralCode: !!referralCode 
  });

  // Generate login intent ID for session linking
  const loginIntentId = crypto.randomUUID();
  localStorage.setItem('loginIntentId', loginIntentId);

  const oauthOptions: any = {
    redirectTo: `${window.location.origin}/auth/callback?intent=${loginIntentId}`,
    queryParams: {}
  };

  if (mode === 'signup' && referralCode?.trim()) {
    oauthOptions.queryParams.referred_by = referralCode.trim();
    console.log('Adding referral code to Google auth:', referralCode.trim());
  }

  // Add login intent to query params for session linking
  oauthOptions.queryParams.loginIntentId = loginIntentId;

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

// Placeholder functions until database migration is run
export const checkTwoFactorStatus = async (userId: string) => {
  try {
    // For now, return disabled until database columns are added
    console.log('2FA check - database columns not yet available, returning disabled');
    return {
      enabled: false,
      method: 'email' as 'email' | 'sms'
    };
  } catch (error) {
    console.error('Error checking 2FA status:', error);
    return { enabled: false, method: 'email' as 'email' | 'sms' };
  }
};

export const sendTwoFactorCode = async (email: string, method: 'email' | 'sms' = 'email') => {
  try {
    // Generate 6-digit code (for demo purposes)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // For now, just log the code since database table doesn't exist yet
    console.log(`2FA Code for ${email}: ${code} (method: ${method})`);
    console.log('Note: Database table for 2FA codes not yet created');
    
    return { success: true };
  } catch (error) {
    console.error('Error in sendTwoFactorCode:', error);
    return { success: false, error: 'Failed to send verification code' };
  }
};

export const verifyTwoFactorCode = async (email: string, code: string) => {
  try {
    // For now, accept any 6-digit code since database table doesn't exist yet
    if (code.length === 6 && /^\d+$/.test(code)) {
      console.log(`2FA verification for ${email} with code ${code} - simulated success`);
      console.log('Note: Database table for 2FA codes not yet created');
      return { valid: true };
    }
    
    return { valid: false, error: 'Invalid code format' };
  } catch (error) {
    console.error('Error in verifyTwoFactorCode:', error);
    return { valid: false, error: 'Failed to verify code' };
  }
};
