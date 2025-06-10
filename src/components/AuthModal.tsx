import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { handleEmailAuth, checkTwoFactorStatus, sendTwoFactorCode, verifyTwoFactorCode } from '@/components/auth/authUtils';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { Eye, EyeOff, Wallet, Shield } from 'lucide-react';

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
  const [mode, setMode] = useState<'login' | 'signup' | 'confirm-email' | 'two-factor'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorMethod, setTwoFactorMethod] = useState<'email' | 'sms'>('email');
  const [pendingLoginData, setPendingLoginData] = useState<any>(null);
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
      setEmailSent(false);
      setLoading(false);
      setAcceptedTerms(false);
      setTwoFactorCode('');
      setPendingLoginData(null);
    }
  }, [isOpen, initialMode]);

  const checkForDuplicateEmail = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is what we want
        console.error('Error checking duplicate email:', error);
        return false;
      }
      
      return !!data; // Returns true if email exists
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
        // Check for duplicate email first
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

        // Check terms acceptance
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

        console.log('Starting signup process with referral code:', referralCode);
        const { error } = await handleEmailAuth('signup', email, password, name, referralCode);
        
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
          // Check if user has 2FA enabled
          const { enabled, method } = await checkTwoFactorStatus(data.user.id);
          
          if (enabled) {
            // Store login data and switch to 2FA mode
            setPendingLoginData(data);
            setTwoFactorMethod(method || 'email');
            setMode('two-factor');
            
            // Send 2FA code
            const { success } = await sendTwoFactorCode(email, method || 'email');
            if (success) {
              toast({
                title: language === 'en' ? "Verification code sent" : "Código de verificación enviado",
                description: language === 'en' 
                  ? "Please check your email for the verification code."
                  : "Por favor revisa tu correo para el código de verificación.",
              });
            }
          } else {
            // Regular login without 2FA
            toast({
              title: language === 'en' ? "Welcome back!" : "¡Bienvenido de vuelta!",
              description: language === 'en' ? "You have been signed in successfully." : "Has iniciado sesión exitosamente.",
            });
            onClose();
          }
        }
      } else if (mode === 'two-factor') {
        // Verify 2FA code
        const { valid, error: verifyError } = await verifyTwoFactorCode(email, twoFactorCode);
        
        if (valid) {
          toast({
            title: language === 'en' ? "Welcome back!" : "¡Bienvenido de vuelta!",
            description: language === 'en' ? "You have been signed in successfully." : "Has iniciado sesión exitosamente.",
          });
          onClose();
        } else {
          toast({
            title: language === 'en' ? "Invalid code" : "Código inválido",
            description: verifyError || (language === 'en' ? "Please enter a valid verification code." : "Por favor ingresa un código de verificación válido."),
            variant: "destructive",
          });
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

  const connectPhantomWallet = async () => {
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

  const renderTwoFactorMode = () => (
    <div className="space-y-4">
      <div className="text-center">
        <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500" />
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Two-Factor Authentication' : 'Autenticación de Dos Factores'}
        </h3>
        <p className="text-gray-600 mt-2">
          {language === 'en' 
            ? `We've sent a verification code to your ${twoFactorMethod === 'email' ? 'email' : 'phone'}.`
            : `Hemos enviado un código de verificación a tu ${twoFactorMethod === 'email' ? 'correo' : 'teléfono'}.`}
        </p>
      </div>
      
      <div>
        <Label htmlFor="twoFactorCode">
          {language === 'en' ? 'Enter 6-digit code' : 'Ingresa código de 6 dígitos'}
        </Label>
        <Input
          id="twoFactorCode"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          placeholder="123456"
          maxLength={6}
          className="text-center text-lg tracking-widest"
        />
      </div>
      
      <Button onClick={handleSubmit} className="w-full" disabled={loading || twoFactorCode.length !== 6}>
        {loading ? 
          (language === 'en' ? 'Verifying...' : 'Verificando...') : 
          (language === 'en' ? 'Verify Code' : 'Verificar Código')
        }
      </Button>
      
      <Button 
        onClick={() => setMode('login')} 
        variant="ghost"
        className="w-full"
      >
        {language === 'en' ? 'Back to Sign In' : 'Volver a Iniciar Sesión'}
      </Button>
    </div>
  );

  const renderConfirmEmailMode = () => (
    <div className="space-y-4 text-center">
      <div className="text-2xl">📧</div>
      <h3 className="text-lg font-semibold">
        {language === 'en' ? 'Check Your Email' : 'Revisa Tu Correo'}
      </h3>
      <div className="space-y-2">
        <p className="text-gray-600">
          {language === 'en' 
            ? `We've sent a confirmation link to ${email}. Please click the link in your email to complete your registration.`
            : `Hemos enviado un enlace de confirmación a ${email}. Por favor haz clic en el enlace en tu correo para completar tu registro.`}
        </p>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-yellow-700 text-sm font-medium">
            {language === 'en' 
              ? '⚠️ Don\'t forget to check your junk/spam folder!'
              : '⚠️ ¡No olvides revisar tu carpeta de spam/correo no deseado!'}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <Button 
          onClick={resendConfirmation} 
          variant="outline" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 
            (language === 'en' ? 'Sending...' : 'Enviando...') : 
            (language === 'en' ? 'Resend Email' : 'Reenviar Correo')
          }
        </Button>
        <Button 
          onClick={() => setMode('login')} 
          variant="ghost"
          className="w-full"
        >
          {language === 'en' ? 'Back to Sign In' : 'Volver a Iniciar Sesión'}
        </Button>
      </div>
    </div>
  );

  if (mode === 'confirm-email') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Email Confirmation Required' : 'Confirmación de Correo Requerida'}
            </DialogTitle>
          </DialogHeader>
          {renderConfirmEmailMode()}
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === 'two-factor') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? 'Two-Factor Authentication' : 'Autenticación de Dos Factores'}
            </DialogTitle>
          </DialogHeader>
          {renderTwoFactorMode()}
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
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="name">
                {language === 'en' ? 'Name' : 'Nombre'}
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              onChange={(e) => setEmail(e.target.value)}
              required
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
                onChange={(e) => setPassword(e.target.value)}
                required
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
                onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
              />
              <div className="text-sm leading-5">
                <Label htmlFor="terms" className="cursor-pointer">
                  {language === 'en' ? 'I agree to the ' : 'Acepto los '}
                  <button
                    type="button"
                    onClick={onTermsClick}
                    className="text-blue-600 hover:text-blue-800 underline"
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
              onClick={() => console.log('Google sign in')} 
              loading={loading} 
            />
            
            <Button
              type="button"
              variant="outline"
              onClick={connectPhantomWallet}
              className="w-full"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Connect Phantom Wallet' : 'Conectar Phantom Wallet'}
            </Button>
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' 
                ? (language === 'en' ? "Don't have an account? Sign up" : "¿No tienes cuenta? Regístrate")
                : (language === 'en' ? "Already have an account? Sign in" : "¿Ya tienes cuenta? Inicia sesión")
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
