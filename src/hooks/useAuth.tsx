
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
      console.log('Fetching user profile for:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      console.log('User profile fetched successfully:', data);
      return data as UserProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    try {
      console.log('Refreshing profile...');
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
    console.log('Auth action triggered:', action);
    if (action === 'logout') {
      supabase.auth.signOut();
      setUserProfile(null);
    }
  };

  const isAuthenticated = !!userProfile;
  
  const userDiscount = userProfile ? Math.min(
    (userProfile.referred_by ? 
      Math.floor(userProfile.total_spending / 50) * 6 : 
      Math.floor(userProfile.referred_spending / 50) * 2
    ), 30
  ) : 0;

  useEffect(() => {
    console.log('Auth hook initializing...');
    let mounted = true;

    const initAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (session?.user) {
          console.log('Initial session found:', session.user.id);
          const profile = await fetchUserProfile(session.user.id);
          if (mounted) {
            setUserProfile(profile);
          }
        } else {
          console.log('No initial session');
          if (mounted) {
            setUserProfile(null);
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (mounted) {
          setUserProfile(null);
        }
      } finally {
        if (mounted) {
          console.log('Setting loading to false');
          setLoading(false);
        }
      }
    };

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state change:', event, session?.user?.id);
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (mounted) {
            setUserProfile(profile);
          }
        } else {
          if (mounted) {
            setUserProfile(null);
          }
        }
      }
    );

    // Initialize
    initAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const contextValue: AuthContextType = {
    userProfile, 
    loading, 
    refreshProfile, 
    isAuthenticated, 
    userDiscount, 
    handleAuthAction
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
