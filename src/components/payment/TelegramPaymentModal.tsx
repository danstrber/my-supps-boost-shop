
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
      <DialogContent className="max-w-md" aria-describedby="telegram-payment-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600 mb-4">
            💬 {language === 'en' ? 'Telegram Payment' : 'Pago por Telegram'}
          </DialogTitle>
          <DialogDescription id="telegram-payment-description">
            {language === 'en' 
              ? 'Complete your order through our secure Telegram channel for the best experience.'
              : 'Completa tu pedido a través de nuestro canal seguro de Telegram para la mejor experiencia.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-3">
              {language === 'en' ? 'Why Choose Telegram?' : '¿Por Qué Elegir Telegram?'}
            </h3>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                {language === 'en' ? 'Anonymous ordering possible' : 'Pedidos anónimos posibles'}
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                {language === 'en' ? 'Direct communication with support' : 'Comunicación directa con soporte'}
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                {language === 'en' ? 'Real-time order tracking' : 'Seguimiento de pedidos en tiempo real'}
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                {language === 'en' ? 'Expert coaching available' : 'Asesoramiento experto disponible'}
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                {language === 'en' ? 'Faster processing' : 'Procesamiento más rápido'}
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              {language === 'en' 
                ? '💡 Simply join our Telegram group and send your order details. Our team will guide you through the payment process step by step.'
                : '💡 Simplemente únete a nuestro grupo de Telegram y envía los detalles de tu pedido. Nuestro equipo te guiará paso a paso en el proceso de pago.'}
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleTelegramRedirect}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              💬 {language === 'en' ? 'Join Telegram Group' : 'Unirse al Grupo'}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6"
            >
              {language === 'en' ? 'Cancel' : 'Cancelar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramPaymentModal;
