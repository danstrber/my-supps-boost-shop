
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

export const checkTwoFactorStatus = async (userId: string) => {
  try {
    const { data: userProfile } = await supabase
      .from('users')
      .select('two_factor_enabled, two_factor_method')
      .eq('auth_id', userId)
      .maybeSingle();

    return {
      enabled: userProfile?.two_factor_enabled || false,
      method: userProfile?.two_factor_method || 'email'
    };
  } catch (error) {
    console.error('Error checking 2FA status:', error);
    return { enabled: false, method: 'email' };
  }
};

export const sendTwoFactorCode = async (email: string, method: 'email' | 'sms' = 'email') => {
  try {
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store code in database
    const { error } = await supabase
      .from('two_factor_codes')
      .insert({
        email,
        code,
        method,
        expires_at: expiresAt.toISOString()
      });

    if (error) {
      console.error('Error storing 2FA code:', error);
      return { success: false, error: error.message };
    }

    // In a real implementation, you would send the code via email/SMS
    console.log(`2FA Code for ${email}: ${code}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error in sendTwoFactorCode:', error);
    return { success: false, error: 'Failed to send verification code' };
  }
};

export const verifyTwoFactorCode = async (email: string, code: string) => {
  try {
    // Find valid code
    const { data: codeRecord, error } = await supabase
      .from('two_factor_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error verifying 2FA code:', error);
      return { valid: false, error: error.message };
    }

    if (!codeRecord) {
      return { valid: false, error: 'Invalid or expired code' };
    }

    // Delete the used code
    await supabase
      .from('two_factor_codes')
      .delete()
      .eq('id', codeRecord.id);

    return { valid: true };
  } catch (error) {
    console.error('Error in verifyTwoFactorCode:', error);
    return { valid: false, error: 'Failed to verify code' };
  }
};
