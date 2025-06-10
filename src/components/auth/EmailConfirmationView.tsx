
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmailConfirmationViewProps {
  email: string;
  loading: boolean;
  language: 'en' | 'es';
  onResendConfirmation: () => void;
  onBackToLogin: () => void;
}

const EmailConfirmationView = ({
  email,
  loading,
  language,
  onResendConfirmation,
  onBackToLogin
}: EmailConfirmationViewProps) => {
  return (
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
          onClick={onResendConfirmation} 
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
          onClick={onBackToLogin} 
          variant="ghost"
          className="w-full"
        >
          {language === 'en' ? 'Back to Sign In' : 'Volver a Iniciar Sesión'}
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmationView;
