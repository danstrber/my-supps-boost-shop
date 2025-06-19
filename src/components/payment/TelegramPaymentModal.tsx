
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TelegramPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'es';
  orderTotal: number;
}

const TelegramPaymentModal = ({ 
  isOpen, 
  onClose, 
  language,
  orderTotal 
}: TelegramPaymentModalProps) => {
  const [telegram, setTelegram] = useState('');

  const handleSubmit = () => {
    if (telegram.trim()) {
      // Instead of calling onComplete, we'll just close and redirect to Telegram
      window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
      onClose();
    }
  };

  const labels = {
    en: {
      title: 'Complete Order via Telegram',
      description: 'Enter your Telegram username to receive order details',
      username: 'Telegram Username',
      placeholder: '@username',
      submit: 'Continue to Telegram',
      total: 'Order Total'
    },
    es: {
      title: 'Completar Pedido via Telegram',
      description: 'Ingresa tu usuario de Telegram para recibir detalles del pedido',
      username: 'Usuario de Telegram',
      placeholder: '@usuario',
      submit: 'Continuar a Telegram',
      total: 'Total del Pedido'
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{labels[language].title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {labels[language].description}
          </p>
          
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-blue-800 font-medium">
              {labels[language].total}: ${orderTotal.toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telegram">{labels[language].username}</Label>
            <Input
              id="telegram"
              type="text"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder={labels[language].placeholder}
            />
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="w-full"
            disabled={!telegram.trim()}
          >
            {labels[language].submit}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramPaymentModal;
