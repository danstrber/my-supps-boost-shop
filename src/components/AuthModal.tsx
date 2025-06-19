
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { handleEmailAuth, handleGoogleAuth } from '@/components/auth/authUtils';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
  initialMode?: 'login' | 'signup';
  language?: 'en' | 'es';
  onSignupSuccess?: () => void;
}

const AuthModal = ({ 
  isOpen, 
  onClose, 
  referralCode, 
  initialMode = 'login',
  language = 'en',
  onSignupSuccess 
}: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (mode: 'login' | 'signup') => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    console.log(`Starting ${mode} for:`, email);

    try {
      const { data, error } = await handleEmailAuth(
        mode,
        email,
        password,
        username,
        referralCode
      );

      if (error) {
        console.error(`${mode} error:`, error);
        toast({
          title: "Error",
          description: error.message || `Failed to ${mode}`,
          variant: "destructive"
        });
        return;
      }

      if (mode === 'signup') {
        // Check if user exists in our database after signup
        console.log('Signup successful, checking if user exists in database...');
        
        // Temporarily skip database check until migration runs
        console.log('Database migration not yet run, skipping user check');
        
        toast({
          title: "Success!",
          description: "Account created successfully! Please check your email to verify your account.",
        });

        if (onSignupSuccess) {
          onSignupSuccess();
        }
      } else {
        console.log('Login successful');
        toast({
          title: "Success!",
          description: "Logged in successfully!",
        });
      }

      onClose();
    } catch (error) {
      console.error(`${mode} exception:`, error);
      toast({
        title: "Error",
        description: `An unexpected error occurred during ${mode}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async (mode: 'login' | 'signup') => {
    setLoading(true);
    
    try {
      const { error } = await handleGoogleAuth(mode, referralCode);
      
      if (error) {
        console.error(`Google ${mode} error:`, error);
        toast({
          title: "Error",
          description: error.message || `Failed to ${mode} with Google`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(`Google ${mode} exception:`, error);
      toast({
        title: "Error",
        description: `An unexpected error occurred with Google ${mode}`,
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
          <DialogTitle>Welcome to SteroidShop</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={initialMode} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button 
              onClick={() => handleSubmit('login')} 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <GoogleSignInButton 
              onClick={() => handleGoogleSubmit('login')}
              disabled={loading}
              language={language}
              mode="login"
            />
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username">Username (Optional)</Label>
              <Input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>
            {referralCode && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  🎉 You're signing up with referral code: <strong>{referralCode}</strong>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  You'll get special discounts on your purchases!
                </p>
              </div>
            )}
            <Button 
              onClick={() => handleSubmit('signup')} 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <GoogleSignInButton 
              onClick={() => handleGoogleSubmit('signup')}
              disabled={loading}
              language={language}
              mode="signup"
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
