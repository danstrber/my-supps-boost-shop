
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
    // Step 1: Create auth user with absolutely minimal data
    console.log('Attempting auth signup with no metadata...');

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        // Send NO metadata to avoid any trigger issues
        data: {}
      }
    });
    
    if (authError) {
      console.error('Auth signup error:', authError);
      return { data: authData, error: authError };
    }

    if (authData.user) {
      console.log('Auth user created successfully:', authData.user.id);

      // Step 2: Wait longer for auth to settle
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 3: Manually create user profile with error handling
      try {
        const userReferralCode = generateReferralCode();
        
        console.log('Creating user profile manually with referral code:', userReferralCode);
        
        // Check if user profile already exists (in case trigger partially worked)
        const { data: existingProfile } = await supabase
          .from('users')
          .select('id')
          .eq('auth_id', authData.user.id)
          .maybeSingle();

        if (!existingProfile) {
          // Create the user profile
          const { data: newProfile, error: profileError } = await supabase
            .from('users')
            .insert({
              auth_id: authData.user.id,
              email: authData.user.email,
              name: username?.trim() || authData.user.email,
              referral_code: userReferralCode,
              referred_by: referralCode?.trim() || null
            })
            .select()
            .single();

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Log detailed error info
            console.log('Profile error details:', JSON.stringify(profileError, null, 2));
            
            // Don't fail the whole signup for this
            return { data: authData, error: null };
          } else {
            console.log('User profile created successfully:', newProfile);
            
            // Step 4: Handle referral relationship if there's a referral code
            if (referralCode?.trim()) {
              await handleReferralRelationship(referralCode.trim(), newProfile.id);
            }
          }
        } else {
          console.log('User profile already exists, skipping creation');
        }
      } catch (error) {
        console.error('Manual profile creation failed:', error);
        // Don't fail signup for profile creation issues
      }
    }
    
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
    } else {
      console.log('Login successful:', data);
    }
    
    return { data, error };
  }
};

const handleReferralRelationship = async (referralCode: string, newUserId: string) => {
  try {
    console.log('Processing referral relationship for code:', referralCode);
    
    // Find referrer
    const { data: referrer, error: referrerError } = await supabase
      .from('users')
      .select('id')
      .eq('referral_code', referralCode)
      .maybeSingle();

    if (referrerError) {
      console.error('Error finding referrer:', referrerError);
    } else if (referrer) {
      // Create referral relationship
      const { error: referralError } = await supabase
        .from('referrals')
        .insert({
          referrer_id: referrer.id,
          referred_id: newUserId
        });

      if (referralError) {
        console.error('Referral relationship error:', referralError);
      } else {
        console.log('Referral relationship created successfully');
      }
    } else {
      console.log('No referrer found with code:', referralCode);
    }
  } catch (referralError) {
    console.error('Referral processing error:', referralError);
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
