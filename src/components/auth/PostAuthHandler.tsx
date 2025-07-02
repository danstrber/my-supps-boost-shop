import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const PostAuthHandler = () => {
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
            // Call the post-auth update function
            await supabase.rpc('update_user_post_auth', {
              user_auth_id: user.id,
              user_name: pendingName,
              user_country: pendingCountry,
              referral_code: pendingReferral
            });

            // Clear pending data
            localStorage.removeItem('pending_country');
            localStorage.removeItem('pending_referral');
            localStorage.removeItem('pending_name');
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
  }, []);

  return null;
};

export default PostAuthHandler;