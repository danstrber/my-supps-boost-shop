
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import GoogleSignInButton from './auth/GoogleSignInButton';
import AuthForm from './auth/AuthForm';
import { handleEmailAuth, handleGoogleAuth } from './auth/authUtils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  referralCode?: string | null;
  onSignupSuccess?: () => void;
}

const AuthModal = ({ isOpen, onClose, initialMode, referralCode: propReferralCode, onSignupSuccess }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState(propReferralCode || '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!acceptedTerms) {
          toast({
            title: "Please accept the terms",
            description: "You must accept all terms and conditions to create an account.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        console.log('Starting signup process...', { email, username, referralCode });
      } else {
        console.log('Starting login process...', { email });
      }
      
      const { data, error } = await handleEmailAuth(mode, email, password, username, referralCode);

      if (error) {
        console.error(`${mode} error:`, error);
        throw error;
      }

      console.log(`${mode} successful:`, data);
      
      if (mode === 'signup') {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        onSignupSuccess?.();
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
      }
      
      onClose();
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (mode === 'signup' && !acceptedTerms) {
      toast({
        title: "Please accept the terms",
        description: "You must accept all terms and conditions to sign up with Google.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Starting Google signin...', { mode, referralCode });
      
      const { data, error } = await handleGoogleAuth(mode, referralCode);

      if (error) {
        console.error('Google auth error:', error);
        throw error;
      }

      console.log('Google signin initiated:', data);
      toast({
        title: "Redirecting...",
        description: "You will be redirected to Google to complete sign in.",
      });
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Google Sign In Error",
        description: error.message || "Failed to sign in with Google.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setReferralCode(propReferralCode || '');
    setShowPassword(false);
    setAcceptedTerms(false);
  };

  const switchMode = () => {
    if (mode === 'login') {
      setMode('signup');
    } else {
      setMode('login');
    }
    resetForm();
  };

  React.useEffect(() => {
    setMode(initialMode);
    resetForm();
  }, [initialMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <GoogleSignInButton onClick={handleGoogleSignIn} loading={loading} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <AuthForm
            mode={mode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            referralCode={referralCode}
            setReferralCode={setReferralCode}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
            loading={loading}
            onSubmit={handleSubmit}
          />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                className="p-0 ml-1 h-auto font-normal text-blue-600"
                onClick={switchMode}
                type="button"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
