
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Mail } from 'lucide-react';

interface ForgotPasswordFormProps {
  language: 'en' | 'es';
  onBack: () => void;
}

const ForgotPasswordForm = ({ language, onBack }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: language === 'en' ? 'Error' : 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setSent(true);
        toast({
          title: language === 'en' ? 'Reset Email Sent!' : '¡Correo de Restablecimiento Enviado!',
          description: language === 'en' 
            ? 'Check your email for password reset instructions. Click the link in the email to set a new password.' 
            : 'Revisa tu correo para las instrucciones de restablecimiento. Haz clic en el enlace del correo para establecer una nueva contraseña.',
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' ? 'An unexpected error occurred' : 'Ocurrió un error inesperado',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="text-6xl mb-4">📧</div>
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'en' ? 'Check Your Email' : 'Revisa Tu Correo'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? `We've sent password reset instructions to ${email}. Click the link in the email to set a new password.`
            : `Hemos enviado instrucciones de restablecimiento a ${email}. Haz clic en el enlace del correo para establecer una nueva contraseña.`}
        </p>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left">
          <h3 className="font-semibold text-blue-800 mb-2">
            {language === 'en' ? 'Next Steps:' : 'Próximos Pasos:'}
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
            <li>{language === 'en' ? 'Check your email inbox' : 'Revisa tu bandeja de entrada'}</li>
            <li>{language === 'en' ? 'Click the "Reset Password" link' : 'Haz clic en el enlace "Restablecer Contraseña"'}</li>
            <li>{language === 'en' ? 'Enter your new password' : 'Ingresa tu nueva contraseña'}</li>
            <li>{language === 'en' ? 'Login with your new password' : 'Inicia sesión con tu nueva contraseña'}</li>
          </ol>
        </div>
        <Button onClick={onBack} className="w-full">
          {language === 'en' ? 'Back to Login' : 'Volver al Inicio de Sesión'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'en' ? 'Reset Password' : 'Restablecer Contraseña'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Enter your email to receive a password reset link'
            : 'Ingresa tu correo para recibir un enlace de restablecimiento'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="reset-email">
            {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
          </Label>
          <Input
            id="reset-email"
            name="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'en' ? 'Enter your email' : 'Ingresa tu correo'}
            required
            autoComplete="email"
            className="mt-1"
          />
        </div>

        <Button type="submit" disabled={loading || !email} className="w-full">
          {loading 
            ? (language === 'en' ? 'Sending Reset Link...' : 'Enviando Enlace...')
            : (language === 'en' ? 'Send Reset Link' : 'Enviar Enlace de Restablecimiento')
          }
        </Button>

        <Button type="button" onClick={onBack} variant="ghost" className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Back to Login' : 'Volver al Inicio de Sesión'}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
