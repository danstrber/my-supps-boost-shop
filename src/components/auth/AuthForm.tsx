
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { countries } from '@/lib/countries';
import GoogleSignInButton from './GoogleSignInButton';

interface AuthFormProps {
  mode: 'login' | 'signup';
  email: string;
  password: string;
  name: string;
  country: string;
  referralCodeInput: string;
  loading: boolean;
  showPassword: boolean;
  acceptedTerms: boolean;
  referralCode?: string | null;
  language: 'en' | 'es';
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNameChange: (name: string) => void;
  onCountryChange: (country: string) => void;
  onReferralCodeInputChange: (code: string) => void;
  onShowPasswordToggle: () => void;
  onTermsChange: (accepted: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
  onPhantomConnect: () => void;
  onModeSwitch: () => void;
  onTermsClick?: () => void;
  onForgotPassword?: () => void;
}

const AuthForm = ({
  mode,
  email,
  password,
  name,
  country,
  referralCodeInput,
  loading,
  showPassword,
  acceptedTerms,
  referralCode,
  language,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onCountryChange,
  onReferralCodeInputChange,
  onShowPasswordToggle,
  onTermsChange,
  onSubmit,
  onGoogleSignIn,
  onPhantomConnect,
  onModeSwitch,
  onTermsClick,
  onForgotPassword
}: AuthFormProps) => {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <Label htmlFor="auth-name">
              {language === 'en' ? 'Full Name' : 'Nombre Completo'}
            </Label>
            <Input
              id="auth-name"
              name="fullName"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={language === 'en' ? 'Enter your full name' : 'Ingresa tu nombre completo'}
              autoComplete="name"
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="auth-email">
            {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
          </Label>
          <Input
            id="auth-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={language === 'en' ? 'Enter your email' : 'Ingresa tu correo'}
            required
            autoComplete="email"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="auth-password">
            {language === 'en' ? 'Password' : 'Contraseña'}
          </Label>
          <div className="relative mt-1">
            <Input
              id="auth-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder={language === 'en' ? 'Enter your password' : 'Ingresa tu contraseña'}
              required
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              className="pr-10"
            />
            <button
              type="button"
              onClick={onShowPasswordToggle}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="auth-country">
            {language === 'en' ? 'Country' : 'País'} *
          </Label>
          <Select value={country} onValueChange={onCountryChange} required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={language === 'en' ? 'Select your country' : 'Selecciona tu país'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USA">
                {language === 'en' ? 'United States' : 'Estados Unidos'}
              </SelectItem>
              {countries.filter(c => c !== 'United States').map((countryName) => (
                <SelectItem key={countryName} value={countryName}>
                  {countryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="auth-referral">
            {language === 'en' ? 'Referral Code (Optional)' : 'Código de Referido (Opcional)'}
          </Label>
          <Input
            id="auth-referral"
            name="referralCode"
            type="text"
            value={referralCodeInput}
            onChange={(e) => onReferralCodeInputChange(e.target.value)}
            placeholder={language === 'en' ? 'Enter referral code' : 'Ingresa código de referido'}
            className="mt-1"
          />
        </div>

        {mode === 'login' && onForgotPassword && (
          <div className="text-right">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {language === 'en' ? 'Forgot password?' : '¿Olvidaste tu contraseña?'}
            </button>
          </div>
        )}

        {referralCode && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <p className="text-green-700 text-sm">
              {language === 'en' 
                ? `You're signing up with referral code: ${referralCode}`
                : `Te estás registrando con el código de referido: ${referralCode}`}
            </p>
          </div>
        )}

        {mode === 'signup' && (
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms-checkbox"
              checked={acceptedTerms}
              onCheckedChange={onTermsChange}
              className="mt-1"
            />
            <Label htmlFor="terms-checkbox" className="text-sm text-gray-600 leading-5">
              {language === 'en' ? 'I agree to the ' : 'Acepto los '}
              <button
                type="button"
                onClick={onTermsClick}
                className="text-blue-600 hover:text-blue-500 underline"
              >
                {language === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
              </button>
            </Label>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading || !country || (mode === 'signup' && !acceptedTerms)} 
          className="w-full"
        >
          {loading 
            ? (language === 'en' ? 'Processing...' : 'Procesando...')
            : mode === 'login' 
              ? (language === 'en' ? 'Sign In' : 'Iniciar Sesión')
              : (language === 'en' ? 'Sign Up' : 'Registrarse')
          }
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            {language === 'en' ? 'Or continue with' : 'O continúa con'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <GoogleSignInButton 
          onClick={onGoogleSignIn} 
          disabled={loading || !country}
          language={language}
          mode={mode}
        />
        
        <Button
          type="button"
          onClick={onPhantomConnect}
          disabled={loading || !country}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          <span>👻</span>
          <span>
            {language === 'en' ? 'Connect Phantom Wallet' : 'Conectar Phantom Wallet'}
          </span>
        </Button>
      </div>

      {!country && (
        <p className="text-sm text-red-600 text-center">
          {language === 'en' 
            ? 'Please select your country to continue' 
            : 'Por favor selecciona tu país para continuar'}
        </p>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={onModeSwitch}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {mode === 'login' 
            ? (language === 'en' ? "Don't have an account? Sign up" : "¿No tienes cuenta? Regístrate")
            : (language === 'en' ? 'Already have an account? Sign in' : '¿Ya tienes cuenta? Inicia sesión')
          }
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
