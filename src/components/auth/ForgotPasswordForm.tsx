
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
        redirectTo: `${window.location.origin}/`,
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
          title: language === 'en' ? 'Email Sent!' : '¡Correo Enviado!',
          description: language === 'en' 
            ? 'Check your email for password reset instructions.' 
            : 'Revisa tu correo para las instrucciones de restablecimiento.',
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
            ? `We've sent password reset instructions to ${email}`
            : `Hemos enviado instrucciones de restablecimiento a ${email}`}
        </p>
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
            ? 'Enter your email to receive reset instructions'
            : 'Ingresa tu correo para recibir instrucciones'}
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
            ? (language === 'en' ? 'Sending...' : 'Enviando...')
            : (language === 'en' ? 'Send Reset Email' : 'Enviar Correo de Restablecimiento')
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
