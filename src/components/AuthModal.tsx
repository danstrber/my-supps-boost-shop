
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { signUp, signIn, signInWithGoogle } from '@/lib/auth';
import { Chrome, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Check for referral code in URL
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get('ref');

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        console.log('Attempting signup with referral code:', referralCode);
        const { error } = await signUp(email, password, name, referralCode || undefined);
        if (error) throw error;
        
        toast({
          title: "Account created successfully!",
          description: referralCode 
            ? `Welcome! You've been referred and will get 6.5% discount per $50 spent.`
            : "Please check your email to verify your account.",
        });
        onClose();
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to MySupps.",
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
    try {
      setLoading(true);
      const { error } = await signInWithGoogle();
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Redirecting to Google for authentication...",
      });
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Google Sign-In Error",
        description: error.message || "Failed to sign in with Google.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-800">
            {mode === 'login' ? 'Welcome Back' : 'Join MySupps'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Username</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
                required
                className="mt-1"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? "Create a strong password" : "Enter your password"}
                required
                minLength={6}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {mode === 'signup' && (
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
            )}
          </div>

          {referralCode && mode === 'signup' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                🎉 You're signing up with referral code: <strong>{referralCode}</strong>
              </p>
              <p className="text-xs text-green-600 mt-1">
                You'll receive 6.5% discount for every $50 you spend!
              </p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2" 
            disabled={loading}
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="w-full border-gray-300 hover:bg-gray-50"
          disabled={loading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Google
        </Button>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-sm text-green-600 hover:text-green-800 hover:underline"
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
