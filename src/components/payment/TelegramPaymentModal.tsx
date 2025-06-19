
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Shield, Clock, Users } from 'lucide-react';

interface TelegramPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'es';
}

const TelegramPaymentModal = ({ isOpen, onClose, language }: TelegramPaymentModalProps) => {
  const handleTelegramRedirect = () => {
    window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby="telegram-payment-description">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-bold text-blue-600 mb-4">
            <MessageCircle className="h-8 w-8 mr-3" />
            {language === 'en' ? 'Telegram Payment' : 'Pago por Telegram'}
          </DialogTitle>
        </DialogHeader>
        
        <div id="telegram-payment-description" className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'en' ? 'Why Choose Telegram?' : '¿Por qué elegir Telegram?'}
            </h3>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Experience the fastest and most secure way to complete your order'
                : 'Experimenta la forma más rápida y segura de completar tu pedido'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-800">
                  {language === 'en' ? 'Secure & Anonymous' : 'Seguro y Anónimo'}
                </h4>
                <p className="text-blue-700 text-sm">
                  {language === 'en' 
                    ? 'Complete privacy protection with encrypted communication'
                    : 'Protección completa de privacidad con comunicación encriptada'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <Clock className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-green-800">
                  {language === 'en' ? 'Instant Processing' : 'Procesamiento Instantáneo'}
                </h4>
                <p className="text-green-700 text-sm">
                  {language === 'en' 
                    ? 'Orders processed immediately with real-time updates'
                    : 'Pedidos procesados inmediatamente con actualizaciones en tiempo real'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-medium text-purple-800">
                  {language === 'en' ? '24/7 Support' : 'Soporte 24/7'}
                </h4>
                <p className="text-purple-700 text-sm">
                  {language === 'en' 
                    ? 'Direct communication with our team for instant support'
                    : 'Comunicación directa con nuestro equipo para soporte instantáneo'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleTelegramRedirect}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {language === 'en' ? 'Continue with Telegram' : 'Continuar con Telegram'}
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              {language === 'en' ? 'Back to Payment Options' : 'Volver a Opciones de Pago'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramPaymentModal;
