
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Wallet } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';

interface AuthFormProps {
  mode: 'login' | 'signup';
  email: string;
  password: string;
  name: string;
  loading: boolean;
  showPassword: boolean;
  acceptedTerms: boolean;
  referralCode?: string | null;
  language: 'en' | 'es';
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNameChange: (name: string) => void;
  onShowPasswordToggle: () => void;
  onTermsChange: (accepted: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSignIn: () => void;
  onPhantomConnect: () => void;
  onModeSwitch: () => void;
  onTermsClick?: () => void;
}

const AuthForm = ({
  mode,
  email,
  password,
  name,
  loading,
  showPassword,
  acceptedTerms,
  referralCode,
  language,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onShowPasswordToggle,
  onTermsChange,
  onSubmit,
  onGoogleSignIn,
  onPhantomConnect,
  onModeSwitch,
  onTermsClick
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div>
          <Label htmlFor="name">
            {language === 'en' ? 'Name' : 'Nombre'}
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      )}
      <div>
        <Label htmlFor="email">
          {language === 'en' ? 'Email' : 'Correo'}
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <Label htmlFor="password">
          {language === 'en' ? 'Password' : 'Contraseña'}
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            disabled={loading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={onShowPasswordToggle}
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {referralCode && mode === 'signup' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            {language === 'en' 
              ? `Using referral code: ${referralCode}` 
              : `Usando código de referido: ${referralCode}`}
          </p>
        </div>
      )}

      {mode === 'signup' && (
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => onTermsChange(!!checked)}
            disabled={loading}
          />
          <div className="text-sm leading-5">
            <Label htmlFor="terms" className="cursor-pointer">
              {language === 'en' ? 'I agree to the ' : 'Acepto los '}
              <button
                type="button"
                onClick={onTermsClick}
                className="text-blue-600 hover:text-blue-800 underline"
                disabled={loading}
              >
                {language === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
              </button>
              {language === 'en' ? ' and Privacy Policy' : ' y Política de Privacidad'}
            </Label>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 
          (language === 'en' ? 'Loading...' : 'Cargando...') : 
          (mode === 'login' 
            ? (language === 'en' ? 'Sign In' : 'Iniciar Sesión')
            : (language === 'en' ? 'Sign Up' : 'Registrarse')
          )
        }
      </Button>

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

      <div className="space-y-2">
        <GoogleSignInButton 
          onClick={onGoogleSignIn} 
          loading={loading} 
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={onPhantomConnect}
          className="w-full"
          disabled={loading}
        >
          <Wallet className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Connect Phantom Wallet' : 'Conectar Phantom Wallet'}
        </Button>
      </div>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={onModeSwitch}
          disabled={loading}
        >
          {mode === 'login' 
            ? (language === 'en' ? "Don't have an account? Sign up" : "¿No tienes cuenta? Regístrate")
            : (language === 'en' ? "Already have an account? Sign in" : "¿Ya tienes cuenta? Inicia sesión")
          }
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
