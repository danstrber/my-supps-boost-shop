
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';

interface AuthContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
  userDiscount: number;
  handleAuthAction: (action: 'login' | 'signup' | 'logout') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const profile = await fetchUserProfile(user.id);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
      setUserProfile(null);
    }
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      supabase.auth.signOut();
      setUserProfile(null);
    }
    // For login/signup, the modal will handle these actions
  };

  const isAuthenticated = !!userProfile;
  
  // Calculate user discount based on referrals and spending
  const userDiscount = userProfile ? Math.min(
    (userProfile.referred_by ? 
      Math.floor(userProfile.total_spending / 50) * 6 : 
      Math.floor(userProfile.referred_spending / 50) * 2
    ), 30
  ) : 0;

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (mounted) {
          if (user) {
            const profile = await fetchUserProfile(user.id);
            setUserProfile(profile);
          } else {
            setUserProfile(null);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setUserProfile(null);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setUserProfile(profile);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      userProfile, 
      loading, 
      refreshProfile, 
      isAuthenticated, 
      userDiscount, 
      handleAuthAction 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
