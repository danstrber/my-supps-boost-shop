
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
    // Create auth user with minimal data to avoid trigger issues
    console.log('Attempting auth signup with minimal data...');

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          // Send minimal data to avoid any trigger complications
          temp_signup: true
        }
      }
    });
    
    if (authError) {
      console.error('Auth signup error:', authError);
      return { data: authData, error: authError };
    }

    if (authData.user) {
      console.log('Auth user created successfully:', authData.user.id);

      // Wait a moment for auth to settle
      await new Promise(resolve => setTimeout(resolve, 500));

      // Now manually create the user profile
      try {
        const userReferralCode = generateReferralCode();
        
        console.log('Creating user profile with referral code:', userReferralCode);
        
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
          // Don't fail the whole signup for this, but log it
          console.log('Profile error details:', JSON.stringify(profileError, null, 2));
        } else {
          console.log('User profile created successfully with referral code:', userReferralCode);
          
          // Handle referral relationship if there's a referral code
          if (referralCode?.trim()) {
            try {
              console.log('Processing referral relationship for code:', referralCode.trim());
              
              // Find referrer
              const { data: referrer, error: referrerError } = await supabase
                .from('users')
                .select('id')
                .eq('referral_code', referralCode.trim())
                .single();

              if (referrerError) {
                console.error('Error finding referrer:', referrerError);
              } else if (referrer) {
                // Get the new user's ID
                const { data: newUser, error: newUserError } = await supabase
                  .from('users')
                  .select('id')
                  .eq('auth_id', authData.user.id)
                  .single();

                if (newUserError) {
                  console.error('Error finding new user:', newUserError);
                } else if (newUser) {
                  // Create referral relationship
                  const { error: referralError } = await supabase
                    .from('referrals')
                    .insert({
                      referrer_id: referrer.id,
                      referred_id: newUser.id
                    });

                  if (referralError) {
                    console.error('Referral relationship error:', referralError);
                  } else {
                    console.log('Referral relationship created successfully');
                  }
                }
              } else {
                console.log('No referrer found with code:', referralCode.trim());
              }
            } catch (referralError) {
              console.error('Referral processing error:', referralError);
            }
          }
        }
      } catch (error) {
        console.error('Manual profile creation failed:', error);
        console.log('Profile creation error details:', JSON.stringify(error, null, 2));
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
