
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
  userDiscount: number;
  handleAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider render - loading:', loading, 'userProfile:', userProfile?.id);

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log('fetchUserProfile called for userId:', userId);
      
      // Temporarily disable database calls until migration runs
      console.log('Database migration not yet run, skipping profile fetch');
      return null;
    } catch (error) {
      console.error('Exception in fetchUserProfile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    try {
      console.log('refreshProfile called');
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
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

  const signOut = async () => {
    console.log('Starting signout process...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Signout error:', error);
    } else {
      console.log('Signout successful');
      setUser(null);
      setUserProfile(null);
    }
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    console.log('handleAuthAction called with:', action);
    if (action === 'logout') {
      signOut();
    }
  };

  const isAuthenticated = !!user;
  
  const userDiscount = userProfile ? Math.min(
    (userProfile.referred_by ? 
      Math.floor(userProfile.total_spending / 50) * 6 : 
      Math.floor(userProfile.referred_spending / 50) * 2
    ), 30
  ) : 0;

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
          console.log('Setting user from session:', session.user.id);
          setUser(session.user);
          const profile = await fetchUserProfile(session.user.id);
          if (!cleanup) {
            console.log('Setting user profile:', profile?.id);
            setUserProfile(profile);
          }
        } else {
          console.log('No session, setting user to null');
          if (!cleanup) {
            setUser(null);
            setUserProfile(null);
          }
        }
      } catch (error) {
        console.error('Error in initialize:', error);
        if (!cleanup) {
          setUser(null);
          setUserProfile(null);
        }
      } finally {
        if (!cleanup) {
          console.log('Setting loading to false');
          setLoading(false);
        }
      }
    };

    initialize().then(() => {
      if (cleanup) return;
      
      console.log('Setting up auth state listener after initialization...');
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (cleanup) return;
          
          console.log('Auth state change:', event, 'user:', session?.user?.id);
          
          try {
            if (session?.user) {
              console.log('Auth change - setting user:', session.user.id);
              setUser(session.user);
              const profile = await fetchUserProfile(session.user.id);
              if (!cleanup) {
                setUserProfile(profile);
              }
            } else {
              console.log('Auth change - no user, clearing data');
              if (!cleanup) {
                setUser(null);
                setUserProfile(null);
              }
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
            if (!cleanup) {
              setUser(null);
              setUserProfile(null);
            }
          }
        }
      );

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
    user,
    userProfile, 
    loading, 
    refreshProfile, 
    isAuthenticated, 
    userDiscount, 
    handleAuthAction,
    signOut
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
