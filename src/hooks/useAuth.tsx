
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfile, getUserDiscount, type UserProfile } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDiscount, setUserDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (session?.user) {
        setIsAuthenticated(true);
        try {
          // Wait a moment for trigger to complete if this is a new user
          if (event === 'SIGNED_IN') {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
          const profile = await getUserProfile(session.user.id);
          setUserProfile(profile);
          console.log('User profile loaded:', profile);
          
          if (profile) {
            // Get user discount
            const discount = await getUserDiscount(session.user.id);
            setUserDiscount(discount);
            console.log('User discount:', discount);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
        setUserDiscount(0);
        console.log('User signed out or no session');
      }
      
      setLoading(false);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id || 'null');
      if (session?.user) {
        setIsAuthenticated(true);
        getUserProfile(session.user.id).then(profile => {
          setUserProfile(profile);
          if (profile) {
            getUserDiscount(session.user.id).then(setUserDiscount).catch(console.error);
          }
          setLoading(false);
        }).catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    if (action === 'logout') {
      supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    }
  };

  return {
    userProfile,
    isAuthenticated,
    userDiscount,
    loading,
    handleAuthAction
  };
};
