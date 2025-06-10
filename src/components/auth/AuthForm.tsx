
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  username: string;
  setUsername: (username: string) => void;
  referralCode: string;
  setReferralCode: (code: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onTermsClick?: () => void;
}

const AuthForm = ({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  referralCode,
  setReferralCode,
  showPassword,
  setShowPassword,
  acceptedTerms,
  setAcceptedTerms,
  loading,
  onSubmit,
  onTermsClick
}: AuthFormProps) => {
  const isFormValid = mode === 'login' ? 
    email && password :
    email && password && username && acceptedTerms;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          placeholder="Enter your email"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter your password"
            className="w-full pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mode === 'signup' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your username"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referralCode">Referral Code (Optional)</Label>
            <Input
              id="referralCode"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              disabled={loading}
              placeholder="Enter referral code if you have one"
              className="w-full"
            />
          </div>

          <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
              disabled={loading}
              className="mt-0.5"
              required
            />
            <div className="text-sm leading-5 flex-1">
              <Label htmlFor="terms" className="cursor-pointer font-medium">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={onTermsClick}
                  className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  disabled={loading}
                >
                  Terms of Service
                </button>{' '}
                and Privacy Policy
              </Label>
              <p className="text-gray-600 mt-1">
                Required to create an account and use our services.
              </p>
            </div>
          </div>
        </>
      )}

      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5" 
        disabled={loading || !isFormValid}
      >
        {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
      </Button>

      {mode === 'signup' && !acceptedTerms && (
        <p className="text-sm text-red-600 text-center">
          You must accept the Terms of Service to create an account.
        </p>
      )}
    </form>
  );
};

export default AuthForm;
