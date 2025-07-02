
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

  console.log('AuthProvider render - loading:', loading, 'userProfile:', userProfile?.id);

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log('fetchUserProfile called for userId:', userId);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      console.log('User profile fetched:', data);
      return data as UserProfile;
    } catch (error) {
      console.error('Exception in fetchUserProfile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    try {
      console.log('refreshProfile called');
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const profile = await fetchUserProfile(user.id);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error in refreshProfile:', error);
      setUserProfile(null);
    }
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    console.log('handleAuthAction called with:', action);
    if (action === 'logout') {
      supabase.auth.signOut();
      setUserProfile(null);
    }
  };

  const isAuthenticated = !!userProfile;
  
  // Calculate user discount based on referral system rules with 32.5% hard cap
  const userDiscount = userProfile ? (() => {
    let discount = 0;
    
    // Base discount for having referrals (10% + 4% per additional referral, max 25%)
    if (userProfile.referred_by) {
      // User was referred - gets spending discount (6% per $50 spent)
      discount = Math.floor((userProfile.total_spending || 0) / 50) * 6;
    } else {
      // User is a referrer - gets referral discount (2% per $50 of referred spending)
      discount = Math.floor((userProfile.referred_spending || 0) / 50) * 2;
    }
    
    return Math.min(discount, 32.5); // Hard cap at 32.5%
  })() : 0;

  useEffect(() => {
    console.log('Auth useEffect starting...');
    let cleanup = false;
    
    const initialize = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (!cleanup) {
            setLoading(false);
          }
          return;
        }

        console.log('Initial session result:', session?.user?.id || 'no session');
        
        if (cleanup) {
          console.log('Component unmounted, skipping profile fetch');
          return;
        }

        if (session?.user) {
          console.log('Fetching profile for user:', session.user.id);
          const profile = await fetchUserProfile(session.user.id);
          if (!cleanup) {
            console.log('Setting user profile:', profile?.id);
            setUserProfile(profile);
          }
        } else {
          console.log('No session, setting userProfile to null');
          if (!cleanup) {
            setUserProfile(null);
          }
        }
      } catch (error) {
        console.error('Error in initialize:', error);
        if (!cleanup) {
          setUserProfile(null);
        }
      } finally {
        if (!cleanup) {
          console.log('Setting loading to false');
          setLoading(false);
        }
      }
    };

    // Initialize first, then set up listener
    initialize().then(() => {
      if (cleanup) return;
      
      console.log('Setting up auth state listener after initialization...');
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (cleanup) return;
          
          console.log('Auth state change:', event, 'user:', session?.user?.id);
          
          try {
            if (session?.user) {
              console.log('Auth change - fetching profile for:', session.user.id);
              const profile = await fetchUserProfile(session.user.id);
              if (!cleanup) {
                setUserProfile(profile);
              }
            } else {
              console.log('Auth change - no user, clearing profile');
              if (!cleanup) {
                setUserProfile(null);
              }
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
            if (!cleanup) {
              setUserProfile(null);
            }
          }
        }
      );

      // Store subscription for cleanup
      return () => {
        console.log('Auth listener cleanup');
        subscription.unsubscribe();
      };
    });

    return () => {
      console.log('Auth cleanup triggered');
      cleanup = true;
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

  console.log('AuthProvider rendering with loading:', loading);

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
