import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const PostAuthHandler = () => {
  const { refreshProfile } = useAuth();
  
  useEffect(() => {
    const handlePostAuth = async () => {
      // Get pending data from localStorage
      const pendingCountry = localStorage.getItem('pending_country');
      const pendingReferral = localStorage.getItem('pending_referral');
      const pendingName = localStorage.getItem('pending_name');

      if (pendingCountry || pendingReferral || pendingName) {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          try {
            console.log('Updating user post-auth with:', { pendingName, pendingCountry, pendingReferral });
            
            // Call the post-auth update function
            await supabase.rpc('update_user_post_auth', {
              user_auth_id: user.id,
              user_name: pendingName,
              user_country: pendingCountry,
              referral_code: pendingReferral
            });

            console.log('User post-auth update successful');

            // Clear pending data
            localStorage.removeItem('pending_country');
            localStorage.removeItem('pending_referral');
            localStorage.removeItem('pending_name');
            
            // Refresh the user profile to get updated data
            await refreshProfile();
          } catch (error) {
            console.error('Error updating user post-auth:', error);
          }
        }
      }
    };

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          handlePostAuth();
        }
      }
    );

    // Also check on component mount
    handlePostAuth();

    return () => subscription.unsubscribe();
  }, [refreshProfile]);

  return null;
};

export default PostAuthHandler;