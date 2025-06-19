
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
  onComplete: (telegramInfo: { telegram: string }) => void;
}

const TelegramPaymentModal = ({ 
  isOpen, 
  onClose, 
  language,
  orderTotal,
  onComplete 
}: TelegramPaymentModalProps) => {
  const [telegram, setTelegram] = useState('');

  const handleSubmit = () => {
    if (telegram.trim()) {
      onComplete({ telegram: telegram.trim() });
    }
  };

  const labels = {
    en: {
      title: 'Complete Order via Telegram',
      description: 'Enter your Telegram username to receive order details',
      username: 'Telegram Username',
      placeholder: '@username',
      submit: 'Complete Order',
      total: 'Order Total'
    },
    es: {
      title: 'Completar Pedido via Telegram',
      description: 'Ingresa tu usuario de Telegram para recibir detalles del pedido',
      username: 'Usuario de Telegram',
      placeholder: '@usuario',
      submit: 'Completar Pedido',
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
          
          <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg text-center">
            <p className="text-blue-800 font-semibold mb-3">
              Or join our Telegram channel directly:
            </p>
            <a 
              href="https://t.me/+fDDZObF0zjI2M2Y0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              💬 Join Telegram Channel
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramPaymentModal;
