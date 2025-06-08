
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail } from 'lucide-react';
import GoogleSignInButton from './auth/GoogleSignInButton';
import AuthForm from './auth/AuthForm';
import TermsOfService from './TermsOfService';
import { handleEmailAuth, handleGoogleAuth } from './auth/authUtils';
import { getReferralCodeFromUrl, clearReferralFromUrl } from '@/lib/referral';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  referralCode?: string | null;
  onSignupSuccess?: () => void;
  language?: 'en' | 'es';
}

const AuthModal = ({ isOpen, onClose, initialMode, referralCode: propReferralCode, onSignupSuccess, language = 'en' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const { toast } = useToast();

  // Auto-detect referral code from URL on component mount
  useEffect(() => {
    const urlReferralCode = getReferralCodeFromUrl();
    if (urlReferralCode) {
      setReferralCode(urlReferralCode);
      console.log('Auto-detected referral code from URL:', urlReferralCode);
      // Clear it from URL after detecting
      clearReferralFromUrl();
    } else if (propReferralCode) {
      setReferralCode(propReferralCode);
    }
  }, [propReferralCode]);

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

        if (!username.trim()) {
          toast({
            title: "Username required",
            description: "Please enter a username to create your account.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        console.log('Starting signup process...', { email, username, referralCode });
      } else {
        console.log('Starting login process...', { email });
      }
      
      const { data, error } = await handleEmailAuth(mode, email, password, username.trim(), referralCode.trim() || undefined);

      if (error) {
        console.error(`${mode} error:`, error);
        throw error;
      }

      console.log(`${mode} successful:`, data);
      
      if (mode === 'signup') {
        setShowEmailConfirmation(true);
        toast({
          title: "Check your email!",
          description: "We've sent you a confirmation link. Please check your email and click the link to activate your account.",
        });
        onSignupSuccess?.();
      } else {
        // For login, check if email is confirmed
        if (data.user && !data.user.email_confirmed_at) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email and click the confirmation link before signing in.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
        onClose();
        resetForm();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Handle specific auth errors
      if (error.message?.includes('Invalid login credentials')) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password and try again.",
          variant: "destructive"
        });
      } else if (error.message?.includes('Email not confirmed')) {
        toast({
          title: "Email not confirmed",
          description: "Please check your email and click the confirmation link before signing in.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Authentication Error",
          description: error.message || "An error occurred during authentication.",
          variant: "destructive"
        });
      }
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
      
      const { data, error } = await handleGoogleAuth(mode, referralCode.trim() || undefined);

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
    setShowPassword(false);
    setAcceptedTerms(false);
    setShowEmailConfirmation(false);
    // Don't reset referral code as it might come from URL
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </DialogTitle>
          </DialogHeader>
          
          {showEmailConfirmation ? (
            <div className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  We've sent a confirmation email to <strong>{email}</strong>. 
                  Please check your email and click the confirmation link to activate your account.
                  You can close this window now.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={() => {
                  onClose();
                  resetForm();
                }} 
                className="w-full"
              >
                Got it!
              </Button>
            </div>
          ) : (
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
                onTermsClick={() => setShowTerms(true)}
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
          )}
        </DialogContent>
      </Dialog>

      <TermsOfService 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
        language={language}
      />
    </>
  );
};

export default AuthModal;
