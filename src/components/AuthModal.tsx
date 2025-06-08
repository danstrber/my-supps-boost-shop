
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Mail } from 'lucide-react';

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
        // Validate terms for signup
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
        
        const signupData: any = {
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              name: username
            }
          }
        };

        // Add referral code to metadata if provided
        if (referralCode) {
          signupData.options.data.referred_by = referralCode;
        }

        const { data, error } = await supabase.auth.signUp(signupData);

        if (error) {
          console.error('Signup error:', error);
          throw error;
        }

        console.log('Signup successful:', data);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        
        onSignupSuccess?.();
        onClose();
      } else {
        console.log('Starting login process...', { email });
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error('Login error:', error);
          throw error;
        }

        console.log('Login successful:', data);
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
        
        onClose();
      }
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
      
      const oauthOptions: any = {
        redirectTo: `${window.location.origin}/`
      };

      // Add referral code for signup mode
      if (mode === 'signup' && referralCode) {
        oauthOptions.queryParams = {
          referred_by: referralCode
        };
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: oauthOptions
      });

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
          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
            disabled={loading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                  />
                </div>
                
                <div>
                  <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                  <Input
                    id="referralCode"
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="Enter referral code for discounts"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Combined Terms Checkbox for Signup */}
            {mode === 'signup' && (
              <div className="border-t pt-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I accept the Terms of Service and Privacy Policy. I confirm that I am over 18 years of age and understand these products are NOT for human consumption and are for research purposes only.
                  </Label>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

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
