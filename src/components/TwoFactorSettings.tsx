
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Shield, Smartphone, Mail } from 'lucide-react';

interface TwoFactorSettingsProps {
  language: 'en' | 'es';
  userProfile: any;
}

const TwoFactorSettings = ({ language, userProfile }: TwoFactorSettingsProps) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [method, setMethod] = useState<'email' | 'authenticator'>('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const { toast } = useToast();

  const handleToggle2FA = async (enabled: boolean) => {
    if (enabled) {
      setShowSetup(true);
    } else {
      // Disable 2FA
      setTwoFactorEnabled(false);
      setShowSetup(false);
      toast({
        title: language === 'en' ? 'Two-Factor Authentication Disabled' : 'Autenticación de Dos Factores Deshabilitada',
        description: language === 'en' ? 'Your account is no longer protected by 2FA.' : 'Tu cuenta ya no está protegida por 2FA.',
      });
    }
  };

  const handleSendVerification = async () => {
    // Simulate sending verification code
    toast({
      title: language === 'en' ? 'Verification Code Sent' : 'Código de Verificación Enviado',
      description: method === 'email' 
        ? (language === 'en' ? 'Check your email for the verification code.' : 'Revisa tu correo para el código de verificación.')
        : (language === 'en' ? 'Use your authenticator app to get the code.' : 'Usa tu aplicación autenticadora para obtener el código.'),
    });
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setShowSetup(false);
      setVerificationCode('');
      toast({
        title: language === 'en' ? 'Two-Factor Authentication Enabled' : 'Autenticación de Dos Factores Habilitada',
        description: language === 'en' ? 'Your account is now protected by 2FA.' : 'Tu cuenta ahora está protegida por 2FA.',
      });
    } else {
      toast({
        title: language === 'en' ? 'Invalid Code' : 'Código Inválido',
        description: language === 'en' ? 'Please enter a valid 6-digit code.' : 'Por favor ingresa un código válido de 6 dígitos.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          {language === 'en' ? 'Two-Factor Authentication' : 'Autenticación de Dos Factores'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">
              {language === 'en' ? 'Enable 2FA' : 'Habilitar 2FA'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? 'Add an extra layer of security to your account.' 
                : 'Agrega una capa extra de seguridad a tu cuenta.'}
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={handleToggle2FA}
          />
        </div>

        {showSetup && (
          <div className="space-y-4 border-t pt-4">
            <div>
              <Label className="text-base font-medium">
                {language === 'en' ? 'Choose 2FA Method' : 'Elige el Método 2FA'}
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Button
                  variant={method === 'email' ? 'default' : 'outline'}
                  onClick={() => setMethod('email')}
                  className="flex items-center justify-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>{language === 'en' ? 'Email' : 'Correo'}</span>
                </Button>
                <Button
                  variant={method === 'authenticator' ? 'default' : 'outline'}
                  onClick={() => setMethod('authenticator')}
                  className="flex items-center justify-center space-x-2"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>{language === 'en' ? 'Authenticator' : 'Autenticador'}</span>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleSendVerification} variant="outline" className="w-full">
                {method === 'email' 
                  ? (language === 'en' ? 'Send Email Code' : 'Enviar Código por Correo')
                  : (language === 'en' ? 'Setup Authenticator' : 'Configurar Autenticador')
                }
              </Button>

              <div>
                <Label htmlFor="verification-code">
                  {language === 'en' ? 'Enter 6-digit code' : 'Ingresa código de 6 dígitos'}
                </Label>
                <Input
                  id="verification-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <Button onClick={handleVerifyCode} className="w-full">
                {language === 'en' ? 'Verify & Enable 2FA' : 'Verificar y Habilitar 2FA'}
              </Button>
            </div>
          </div>
        )}

        {twoFactorEnabled && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">
                {language === 'en' ? '2FA is active' : '2FA está activo'}
              </span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              {language === 'en' 
                ? `Protected with ${method === 'email' ? 'email codes' : 'authenticator app'}`
                : `Protegido con ${method === 'email' ? 'códigos por correo' : 'aplicación autenticadora'}`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TwoFactorSettings;
