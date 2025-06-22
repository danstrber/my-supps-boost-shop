
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  language: 'en' | 'es';
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderId,
  language
}) => {
  const t = {
    en: {
      title: 'Order Successful!',
      subtitle: 'Thank you for your purchase',
      orderNumber: 'Order Number',
      message: 'Your order has been successfully processed and submitted for verification.',
      emailSent: 'A confirmation email has been sent to your email address.',
      nextSteps: 'What happens next?',
      step1: 'We will verify your payment within 24 hours',
      step2: 'Once verified, your order will be processed and shipped',
      step3: 'You will receive tracking information via email',
      close: 'Close'
    },
    es: {
      title: '¡Pedido Exitoso!',
      subtitle: 'Gracias por tu compra',
      orderNumber: 'Número de Pedido',
      message: 'Tu pedido ha sido procesado exitosamente y enviado para verificación.',
      emailSent: 'Se ha enviado un correo de confirmación a tu dirección de email.',
      nextSteps: '¿Qué sigue?',
      step1: 'Verificaremos tu pago en las próximas 24 horas',
      step2: 'Una vez verificado, tu pedido será procesado y enviado',
      step3: 'Recibirás información de seguimiento por email',
      close: 'Cerrar'
    }
  };

  const text = t[language];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">{text.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Order confirmation details and next steps
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              {text.title}
            </h2>
            <p className="text-gray-600">
              {text.subtitle}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">
              {text.orderNumber}
            </p>
            <p className="text-lg font-mono font-bold text-gray-900">
              #{orderId}
            </p>
          </div>
          
          <div className="space-y-3 text-left">
            <p className="text-gray-700">
              {text.message}
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <Mail className="h-4 w-4" />
              <span>{text.emailSent}</span>
            </div>
          </div>
          
          <div className="text-left space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              {text.nextSteps}
            </h3>
            
            <ol className="text-sm text-gray-600 space-y-1 ml-6">
              <li>1. {text.step1}</li>
              <li>2. {text.step2}</li>
              <li>3. {text.step3}</li>
            </ol>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {text.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessModal;
