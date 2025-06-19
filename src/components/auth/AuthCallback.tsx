
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/');
          return;
        }

        if (data.session) {
          // Check for login intent ID to enable cross-device sync
          const urlParams = new URLSearchParams(window.location.search);
          const intentId = urlParams.get('intent');
          const storedIntentId = localStorage.getItem('loginIntentId');

          if (intentId && storedIntentId && intentId === storedIntentId) {
            console.log('Session linked successfully via intent ID');
            localStorage.removeItem('loginIntentId');
          } else if (intentId) {
            // Store the session for cross-device access
            localStorage.setItem('authSession', JSON.stringify(data.session));
            console.log('Session stored for cross-device access');
          }

          console.log('Authentication successful, redirecting to home');
          navigate('/');
        } else {
          console.log('No session found, redirecting to home');
          navigate('/');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
