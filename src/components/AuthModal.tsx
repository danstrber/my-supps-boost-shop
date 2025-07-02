import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { handleEmailAuth, handleGoogleAuth } from '@/components/auth/authUtils';
import EmailConfirmationView from '@/components/auth/EmailConfirmationView';
import AuthForm from '@/components/auth/AuthForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  referralCode?: string | null;
  language: 'en' | 'es';
  onSignupSuccess?: () => void;
  onTermsClick?: () => void;
}

// Phantom wallet interface
declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom?: boolean;
        connect: () => Promise<{ publicKey: { toString: () => string } }>;
        disconnect: () => Promise<void>;
        isConnected: boolean;
      };
    };
  }
}

const AuthModal = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login', 
  referralCode, 
  language, 
  onSignupSuccess,
  onTermsClick
}: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'confirm-email' | 'forgot-password'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [referralCodeInput, setReferralCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (!isOpen) {
      setMode(initialMode);
      setEmail('');
      setPassword('');
      setName('');
      setCountry('');
      setReferralCodeInput('');
      setEmailSent(false);
      setLoading(false);
      setAcceptedTerms(false);
    }
  }, [isOpen, initialMode]);

  const checkForDuplicateEmail = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking duplicate email:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error in checkForDuplicateEmail:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!country) {
          toast({
            title: language === 'en' ? "Country required" : "País requerido",
            description: language === 'en' 
              ? "Please select your country to continue."
              : "Por favor selecciona tu país para continuar.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (!name) {
          toast({
            title: language === 'en' ? "Name required" : "Nombre requerido",
            description: language === 'en' 
              ? "Please enter your full name."
              : "Por favor ingresa tu nombre completo.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const emailExists = await checkForDuplicateEmail(email);
        if (emailExists) {
          toast({
            title: language === 'en' ? "Email already in use" : "Correo ya en uso",
            description: language === 'en' 
              ? "An account with this email already exists. Please use a different email or try signing in."
              : "Ya existe una cuenta con este correo. Por favor usa un correo diferente o intenta iniciar sesión.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (!acceptedTerms) {
          toast({
            title: language === 'en' ? "Terms required" : "Términos requeridos",
            description: language === 'en' 
              ? "Please accept the Terms of Service to continue."
              : "Por favor acepta los Términos de Servicio para continuar.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const finalReferralCode = referralCode || referralCodeInput || null;
        console.log('Starting signup process with:', { email, name, country, referralCode: finalReferralCode });
        
        const { error } = await handleEmailAuth('signup', email, password, name, finalReferralCode, country);
        
        if (error) {
          console.error('Signup error:', error);
          toast({
            title: language === 'en' ? "Error" : "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          console.log('Signup successful, email confirmation required');
          setEmailSent(true);
          setMode('confirm-email');
          toast({
            title: language === 'en' ? "Check your email!" : "¡Revisa tu correo!",
            description: language === 'en' 
              ? "We've sent you a confirmation link. Please check your email (including junk/spam folder) and click the link to complete your registration."
              : "Te hemos enviado un enlace de confirmación. Por favor revisa tu correo (incluyendo carpeta de spam/correo no deseado) y haz clic en el enlace para completar tu registro.",
          });
          if (onSignupSuccess) {
            onSignupSuccess();
          }
        }
      } else if (mode === 'login') {
        const { data, error } = await handleEmailAuth('login', email, password);
        
        if (error) {
          console.error('Login error:', error);
          toast({
            title: language === 'en' ? "Error" : "Error",
            description: error.message,
            variant: "destructive",
          });
        } else if (data?.user) {
          toast({
            title: language === 'en' ? "Welcome back!" : "¡Bienvenido de vuelta!",
            description: language === 'en' ? "You have been signed in successfully." : "Has iniciado sesión exitosamente.",
          });
          onClose();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en' ? "An unexpected error occurred" : "Ocurrió un error inesperado",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (mode === 'confirm-email' || mode === 'forgot-password') {
      return;
    }

    if (!country) {
      toast({
        title: language === 'en' ? "Country required" : "País requerido",
        description: language === 'en' 
          ? "Please select your country before signing in with Google."
          : "Por favor selecciona tu país antes de iniciar sesión con Google.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: language === 'en' ? "Terms required" : "Términos requeridos",
        description: language === 'en' 
          ? "Please accept the Terms of Service to continue with Google sign-in."
          : "Por favor acepta los Términos de Servicio para continuar con el inicio de sesión de Google.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const finalReferralCode = referralCode || referralCodeInput || null;
      console.log('Google auth with country:', country);
      const { error } = await handleGoogleAuth(mode, finalReferralCode, country);
      if (error) {
        toast({
          title: language === 'en' ? "Error" : "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Google auth error:', error);
      toast({
        title: language === 'en' ? "Error" : "Error",
        description: language === 'en' ? "Failed to sign in with Google" : "Error al iniciar sesión con Google",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const connectPhantomWallet = async () => {
    if (!country) {
      toast({
        title: language === 'en' ? "Country required" : "País requerido",
        description: language === 'en' 
          ? "Please select your country before connecting with Phantom wallet."
          : "Por favor selecciona tu país antes de conectar con Phantom wallet.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: language === 'en' ? "Terms required" : "Términos requeridos",
        description: language === 'en' 
          ? "Please accept the Terms of Service to continue with Phantom wallet."
          : "Por favor acepta los Términos de Servicio para continuar con Phantom wallet.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!window.phantom?.solana) {
        toast({
          title: language === 'en' ? "Phantom Wallet Not Found" : "Phantom Wallet No Encontrado",
          description: language === 'en' 
            ? "Please install Phantom wallet to connect with Solana."
            : "Por favor instala Phantom wallet para conectar con Solana.",
          variant: "destructive",
        });
        return;
      }

      const response = await window.phantom.solana.connect();
      const publicKey = response.publicKey.toString();
      
      toast({
        title: language === 'en' ? "Wallet Connected" : "Wallet Conectado",
        description: language === 'en' 
          ? `Connected: ${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`
          : `Conectado: ${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`,
      });
    } catch (error) {
      console.error('Phantom wallet connection error:', error);
      toast({
        title: language === 'en' ? "Connection Failed" : "Conexión Fallida",
        description: language === 'en' 
          ? "Failed to connect to Phantom wallet."
          : "No se pudo conectar a Phantom wallet.",
        variant: "destructive",
      });
    }
  };

  const resendConfirmation = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        toast({
          title: language === 'en' ? "Error" : "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: language === 'en' ? "Email sent!" : "¡Correo enviado!",
          description: language === 'en' 
            ? "We've sent you another confirmation email. Please check your junk/spam folder too."
            : "Te hemos enviado otro correo de confirmación. Por favor revisa también tu carpeta de spam/correo no deseado.",
        });
      }
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'confirm-email') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Email Confirmation Required' : 'Confirmación de Correo Requerida'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' ? 'Please check your email to confirm your account.' : 'Por favor revisa tu correo para confirmar tu cuenta.'}
            </DialogDescription>
          </DialogHeader>
          <EmailConfirmationView
            email={email}
            onResendConfirmation={resendConfirmation}
            resendLoading={loading}
            language={language}
          />
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === 'forgot-password') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Reset Password' : 'Restablecer Contraseña'}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' ? 'Enter your email to receive a password reset link.' : 'Ingresa tu correo para recibir un enlace de restablecimiento.'}
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm
            language={language}
            onBack={() => setMode('login')}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' 
              ? (language === 'en' ? 'Sign In' : 'Iniciar Sesión')
              : (language === 'en' ? 'Sign Up' : 'Registrarse')}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? (language === 'en' ? 'Welcome back! Please sign in to your account.' : '¡Bienvenido de vuelta! Por favor inicia sesión en tu cuenta.')
              : (language === 'en' ? 'Create your account to get started.' : 'Crea tu cuenta para comenzar.')}
          </DialogDescription>
        </DialogHeader>
        <AuthForm
          mode={mode}
          email={email}
          password={password}
          name={name}
          country={country}
          referralCodeInput={referralCodeInput}
          loading={loading}
          showPassword={showPassword}
          acceptedTerms={acceptedTerms}
          referralCode={referralCode}
          language={language}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onNameChange={setName}
          onCountryChange={setCountry}
          onReferralCodeInputChange={setReferralCodeInput}
          onShowPasswordToggle={() => setShowPassword(!showPassword)}
          onTermsChange={setAcceptedTerms}
          onSubmit={handleSubmit}
          onGoogleSignIn={handleGoogleSignIn}
          onPhantomConnect={connectPhantomWallet}
          onModeSwitch={() => setMode(mode === 'login' ? 'signup' : 'login')}
          onTermsClick={onTermsClick}
          onForgotPassword={() => setMode('forgot-password')}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
