
import { supabase } from '@/integrations/supabase/client';

// Generate referral code in frontend to avoid database function dependency
const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

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
    // First, create the auth user
    const signupData: any = {
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          skip_trigger: true // Skip the problematic trigger
        }
      }
    };

    // Always add username if provided
    if (username?.trim()) {
      signupData.options.data.name = username.trim();
      console.log('Adding username to signup data:', username.trim());
    }

    console.log('Attempting auth signup with simplified data...');

    const { data: authData, error: authError } = await supabase.auth.signUp(signupData);
    
    if (authError) {
      console.error('Auth signup error:', authError);
      return { data: authData, error: authError };
    }

    if (authData.user) {
      console.log('Auth user created successfully:', authData.user.id);

      // Now manually create the user profile
      try {
        const userReferralCode = generateReferralCode();
        
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            auth_id: authData.user.id,
            email: authData.user.email,
            name: username?.trim() || authData.user.email,
            referral_code: userReferralCode,
            referred_by: referralCode?.trim() || null
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't fail the whole signup for this
        } else {
          console.log('User profile created successfully with referral code:', userReferralCode);
          
          // Handle referral relationship if there's a referral code
          if (referralCode?.trim()) {
            try {
              // Find referrer
              const { data: referrer } = await supabase
                .from('users')
                .select('id')
                .eq('referral_code', referralCode.trim())
                .single();

              if (referrer) {
                // Create referral relationship
                await supabase
                  .from('referrals')
                  .insert({
                    referrer_id: referrer.id,
                    referred_id: (await supabase.from('users').select('id').eq('auth_id', authData.user.id).single()).data?.id
                  });
                console.log('Referral relationship created');
              }
            } catch (referralError) {
              console.error('Referral relationship error:', referralError);
            }
          }
        }
      } catch (error) {
        console.error('Manual profile creation failed:', error);
      }
    }
    
    return { data: authData, error: authError };
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
    redirectTo: `${window.location.origin}/`,
    queryParams: {}
  };

  if (mode === 'signup' && referralCode?.trim()) {
    oauthOptions.queryParams.referred_by = referralCode.trim();
    console.log('Adding referral code to Google auth:', referralCode.trim());
  }

  // Skip the problematic trigger for Google auth too
  oauthOptions.queryParams.skip_trigger = 'true';

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
