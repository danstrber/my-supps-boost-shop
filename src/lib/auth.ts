import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  auth_id: string;
  name: string;
  email: string;
  referral_code: string;
  referred_by: string | null;
  total_spending: number;
  referred_spending: number;
  created_at: string;
  updated_at: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export const signUp = async (email: string, password: string, name?: string, referralCode?: string) => {
  console.log('Starting signup process...', { email, name, referralCode });
  
  const metadata: any = {};
  if (name) metadata.name = name;
  if (referralCode) metadata.referred_by = referralCode;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/`
    }
  });

  if (error) {
    console.error('Signup error:', error);
  } else {
    console.log('Signup successful:', data);
  }

  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  console.log('Starting signin process...', { email });
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Signin error:', error);
  } else {
    console.log('Signin successful:', data);
  }

  return { data, error };
};

export const signInWithGoogle = async (referralCode?: string) => {
  console.log('Starting Google signin...', { referralCode });
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
      queryParams: {
        ...(referralCode && { referred_by: referralCode })
      }
    }
  });

  if (error) {
    console.error('Google signin error:', error);
  } else {
    console.log('Google signin initiated:', data);
  }

  return { data, error };
};

export const signOut = async () => {
  console.log('Starting signout process...');
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Signout error:', error);
  } else {
    console.log('Signout successful');
  }
  
  return { error };
};

export const getCurrentUser = async (): Promise<{ user: User | null; profile: UserProfile | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No authenticated user found');
      return { user: null, profile: null };
    }

    console.log('Found authenticated user:', user.id);

    // Wait a bit for the trigger to complete if this is a new user
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile:', error);
      return { user, profile: null };
    }

    console.log('User profile found:', profile);
    return { user, profile };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return { user: null, profile: null };
  }
};

export const getUserProfile = async (authId: string): Promise<UserProfile | null> => {
  try {
    console.log('Fetching user profile for:', authId);
    
    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    console.log('User profile found:', profile);
    return profile;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};

export const getUserDiscount = async (authId: string): Promise<number> => {
  try {
    console.log('Calculating user discount for:', authId);
    
    const { data, error } = await supabase.rpc('calculate_user_discount', {
      user_auth_id: authId
    });

    if (error) {
      console.error('Error calculating discount:', error);
      return 0;
    }

    console.log('User discount calculated:', data);
    return data || 0;
  } catch (error) {
    console.error('Error in getUserDiscount:', error);
    return 0;
  }
};
