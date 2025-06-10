
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
    // Login mode - simplified to not require email confirmation for existing users
    console.log('Attempting login for email:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
      // Handle specific error cases
      if (error.message.includes('Email not confirmed')) {
        // For existing users who haven't confirmed email, we'll handle this differently
        return { 
          data, 
          error: { 
            ...error, 
            message: 'Please check your email and confirm your account to continue signing in.' 
          } 
        };
      }
    } else {
      console.log('Login successful:', data);
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

// New function to check if user has 2FA enabled
export const checkTwoFactorStatus = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('two_factor_enabled, two_factor_method')
      .eq('auth_id', userId)
      .single();
    
    if (error) {
      console.error('Error checking 2FA status:', error);
      return { enabled: false, method: null };
    }
    
    return { 
      enabled: data?.two_factor_enabled || false, 
      method: data?.two_factor_method || null 
    };
  } catch (error) {
    console.error('Error in checkTwoFactorStatus:', error);
    return { enabled: false, method: null };
  }
};

// Function to send 2FA code
export const sendTwoFactorCode = async (email: string, method: 'email' | 'sms') => {
  try {
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code temporarily (you might want to use a separate table for this)
    const { error } = await supabase
      .from('two_factor_codes')
      .insert({
        email,
        code,
        method,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
      });
    
    if (error) {
      console.error('Error storing 2FA code:', error);
      return { success: false, error: error.message };
    }
    
    // Here you would integrate with your email/SMS service
    // For now, we'll just log it (in production, send actual email/SMS)
    console.log(`2FA Code for ${email}: ${code}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error in sendTwoFactorCode:', error);
    return { success: false, error: 'Failed to send verification code' };
  }
};

// Function to verify 2FA code
export const verifyTwoFactorCode = async (email: string, code: string) => {
  try {
    const { data, error } = await supabase
      .from('two_factor_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    if (error || !data) {
      return { valid: false, error: 'Invalid or expired code' };
    }
    
    // Delete used code
    await supabase
      .from('two_factor_codes')
      .delete()
      .eq('id', data.id);
    
    return { valid: true };
  } catch (error) {
    console.error('Error in verifyTwoFactorCode:', error);
    return { valid: false, error: 'Failed to verify code' };
  }
};
