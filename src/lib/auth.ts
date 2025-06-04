
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

  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`
    }
  });

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async (): Promise<{ user: User | null; profile: UserProfile | null }> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', user.id)
    .single();

  return { user, profile };
};

export const getUserDiscount = async (authId: string): Promise<number> => {
  const { data } = await supabase.rpc('calculate_user_discount', {
    user_auth_id: authId
  });

  return data || 0;
};
