
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  auth_id: string;
  name: string | null;
  email: string | null;
  referral_code: string;
  referred_by: string | null;
  total_spending: number;
  referred_spending: number;
  created_at: string;
  updated_at: string;
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

    const profile = await getUserProfile(user.id);
    return { user, profile };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return { user: null, profile: null };
  }
};

export const getUserProfile = async (authId: string): Promise<UserProfile | null> => {
  try {
    console.log('Fetching user profile for:', authId);
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    console.log('User profile fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};

export const getUserDiscount = async (authId: string): Promise<number> => {
  try {
    console.log('Calculating user discount for:', authId);
    
    const profile = await getUserProfile(authId);
    if (!profile) return 0;
    
    // Calculate discount based on spending and referrals
    const spendingDiscount = profile.referred_by 
      ? Math.floor(profile.total_spending / 50) * 7  // 7% per $50 for referred users
      : Math.floor(profile.total_spending / 50) * 3; // 3% per $50 for normal users
    
    // Add first referral bonus
    const firstReferralBonus = profile.referred_by ? 10 : 0;
    
    const totalDiscount = Math.min(spendingDiscount + firstReferralBonus, 32);
    
    console.log('User discount calculated:', {
      profile,
      spendingDiscount,
      firstReferralBonus,
      totalDiscount
    });
    
    return totalDiscount;
  } catch (error) {
    console.error('Error in getUserDiscount:', error);
    return 0;
  }
};
