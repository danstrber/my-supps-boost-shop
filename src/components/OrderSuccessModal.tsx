
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Mail, Clock } from 'lucide-react';
import { translations } from '@/lib/translations';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string;
    total: number;
    customerEmail: string;
    paymentMethod: string;
  };
  language: 'en' | 'es';
}

const OrderSuccessModal = ({ isOpen, onClose, orderDetails, language }: OrderSuccessModalProps) => {
  const t = translations[language];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-green-600 mb-2">
            {t.paymentSuccessful}
          </DialogTitle>
          <p className="text-gray-600">
            {t.thankYou}
          </p>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">{t.orderDetails}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t.orderNumber}:</span>
                <span className="font-mono font-semibold text-green-700">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.orderTotal}:</span>
                <span className="font-semibold text-green-700">${orderDetails.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t.paymentMethod}:</span>
                <span className="font-semibold text-green-700">{orderDetails.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Mail className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-blue-800 font-medium">
                {language === 'en' ? 'Email Sent' : 'Email Enviado'}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
              <p className="text-xs text-yellow-800 font-medium">
                {language === 'en' ? 'Processing' : 'Procesando'}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Package className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <p className="text-xs text-purple-800 font-medium">
                {language === 'en' ? 'Shipping Soon' : 'Enviando Pronto'}
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p>
              {language === 'en' 
                ? `A confirmation email has been sent to ${orderDetails.customerEmail}. Your order will be processed within 24 hours.`
                : `Se ha enviado un email de confirmación a ${orderDetails.customerEmail}. Tu pedido será procesado en 24 horas.`
              }
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 font-semibold"
          >
            {language === 'en' ? 'Continue Shopping' : 'Continuar Comprando'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessModal;
