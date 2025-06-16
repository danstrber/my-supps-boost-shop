
import React from 'react';
import { Button } from '@/components/ui/button';
import { translations } from '@/lib/translations';

interface EmailConfirmationViewProps {
  email: string;
  onResendConfirmation: () => void;
  resendLoading: boolean;
  language: 'en' | 'es';
}

const EmailConfirmationView = ({
  email,
  onResendConfirmation,
  resendLoading,
  language
}: EmailConfirmationViewProps) => {
  const t = translations[language];

  return (
    <div className="space-y-4 text-center">
      <div className="text-6xl mb-4">📧</div>
      <h2 className="text-2xl font-bold text-gray-900">
        {t.checkYourEmail}
      </h2>
      <p className="text-gray-600">
        {language === 'en' 
          ? `We've sent a verification link to ${email}. Please check your email and click the link to verify your account.`
          : `Hemos enviado un enlace de verificación a ${email}. Por favor, revisa tu email y haz clic en el enlace para verificar tu cuenta.`
        }
      </p>
      
      {/* New junk/spam warning */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>
            {language === 'en' 
              ? "⚠️ Don't forget to check your spam/junk folder!"
              : "⚠️ ¡No olvides revisar tu carpeta de spam/correo no deseado!"
            }
          </strong>
        </p>
        <p className="text-yellow-700 text-xs mt-1">
          {language === 'en'
            ? "Sometimes verification emails end up there."
            : "A veces los emails de verificación terminan ahí."
          }
        </p>
      </div>

      <Button
        onClick={onResendConfirmation}
        disabled={resendLoading}
        variant="outline"
        className="w-full"
      >
        {resendLoading 
          ? (language === 'en' ? 'Sending...' : 'Enviando...')
          : t.resendEmail
        }
      </Button>
    </div>
  );
};

export default EmailConfirmationView;
