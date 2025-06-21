import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import PaymentTimer from '@/components/payment/PaymentTimer';
import ShippingForm from '@/components/payment/ShippingForm';
import BitcoinTutorial from '@/components/payment/BitcoinTutorial';
import PaymentMethodInfo from '@/components/payment/PaymentMethodInfo';
import { FormData, formSchema } from '@/components/payment/types';
import { handlePaymentProcessing } from '@/components/payment/PaymentLogic';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  products: any[];
  language: 'en' | 'es';
  userDiscount: number;
  onOrderComplete?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  language,
  userDiscount,
  onOrderComplete
}) => {
  const { clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'bitcoin' | 'telegram'>('bitcoin');
  const [transactionId, setTransactionId] = useState('');
  const SHIPPING_FEE = 7.5;

  const [orderSuccessData, setOrderSuccessData] = useState<{
    orderId: string;
    show: boolean;
  }>({ orderId: '', show: false });

  const form: UseFormReturn<FormData> = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const cartItems = products.map(product => ({
    ...product,
    quantity: cart[product.id] || 0,
  })).filter(item => item.quantity > 0);

  const originalTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = originalTotal * userDiscount;
  const finalTotal = Math.max(0, originalTotal - discountAmount) + SHIPPING_FEE;
  const bitcoinAmount = (finalTotal / 100000).toFixed(8);

  const handleOrderComplete = (orderId: string) => {
    console.log('🎉 Order completed with ID:', orderId);
    setOrderSuccessData({ orderId, show: true });
    clearCart();
    if (onOrderComplete) {
      onOrderComplete();
    }
  };

  const handleCloseSuccessModal = () => {
    setOrderSuccessData({ orderId: '', show: false });
    onClose();
    setCurrentStep(1);
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await form.trigger();
      if (isValid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (paymentMethod === 'telegram') {
        window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
        onClose();
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = async () => {
    if (!transactionId.trim()) {
      toast({
        title: language === 'en' ? 'Transaction ID Required' : 'ID de Transacción Requerido',
        description: language === 'en' ? 'Please enter your Bitcoin transaction ID' : 'Por favor ingresa tu ID de transacción Bitcoin',
        variant: "destructive"
      });
      return;
    }

    await handlePaymentProcessing(
      form,
      cartItems,
      originalTotal,
      discountAmount,
      SHIPPING_FEE,
      finalTotal,
      bitcoinAmount,
      transactionId,
      language,
      toast,
      handleOrderComplete
    );
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
      </h3>
      <ShippingForm form={form} language={language} />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'Payment Method' : 'Método de Pago'}
      </h3>
      
      <RadioGroup value={paymentMethod} onValueChange={(value: 'bitcoin' | 'telegram') => setPaymentMethod(value)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="telegram" id="telegram" />
          <Label htmlFor="telegram">
            {language === 'en' ? 'Telegram - Manual Coordination' : 'Telegram - Coordinación Manual'}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bitcoin" id="bitcoin" />
          <Label htmlFor="bitcoin">
            {language === 'en' ? 'Bitcoin (BTC) - Automated Verification' : 'Bitcoin (BTC) - Verificación Automática'}
          </Label>
        </div>
      </RadioGroup>

      <PaymentMethodInfo paymentMethod={paymentMethod} />
      
      {paymentMethod === 'bitcoin' && (
        <BitcoinTutorial language={language} />
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'Confirm Your Address' : 'Confirma tu Dirección'}
      </h3>
      
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <div className="flex items-start mb-4">
          <div className="text-blue-600 mr-2">📋</div>
          <h4 className="text-blue-800 font-medium">
            {language === 'en' ? 'Please confirm your shipping address:' : 'Por favor confirma tu dirección de envío:'}
          </h4>
        </div>
        
        <div className="space-y-2 text-gray-700">
          <div><strong>Name:</strong> {form.getValues('fullName')}</div>
          <div><strong>Email:</strong> {form.getValues('email')}</div>
          <div><strong>Address:</strong> {form.getValues('address')}</div>
          <div><strong>City:</strong> {form.getValues('city')}</div>
          <div><strong>State/Province:</strong> {form.getValues('state')}</div>
          <div><strong>ZIP/Postal Code:</strong> {form.getValues('zipCode')}</div>
          <div><strong>Country:</strong> {form.getValues('country')}</div>
          <div><strong>Phone:</strong> {form.getValues('phone')}</div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-yellow-600 mr-2">⚠️</span>
          <p className="text-yellow-700 text-sm">
            {language === 'en' 
              ? 'Please double-check your address carefully. Orders cannot be changed once payment is confirmed.'
              : 'Por favor revisa tu dirección cuidadosamente. Los pedidos no pueden cambiarse una vez confirmado el pago.'
            }
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={() => setCurrentStep(4)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          ✅ {language === 'en' ? 'Address is Correct - Proceed to Payment' : 'Dirección Correcta - Proceder al Pago'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
          className="flex-1"
        >
          ← {language === 'en' ? 'Edit Address' : 'Editar Dirección'}
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <PaymentTimer 
        onExpired={() => {
          toast({
            title: language === 'en' ? 'Payment Expired' : 'Pago Expirado',
            description: language === 'en' ? 'Please restart the payment process' : 'Por favor reinicia el proceso de pago',
            variant: "destructive"
          });
          setCurrentStep(1);
        }}
        language={language}
      />

      <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="text-orange-600 mr-2">₿</span>
          <h3 className="text-orange-800 text-lg font-semibold">
            {language === 'en' ? 'Payment Details' : 'Detalles de Pago'}
          </h3>
        </div>
        
        <div className="text-center space-y-4">
          <div>
            <p className="text-gray-600 mb-2">{language === 'en' ? 'Send exactly' : 'Envía exactamente'}</p>
            <p className="text-2xl font-bold text-orange-600">{bitcoinAmount} BTC</p>
          </div>
          
          <div>
            <p className="text-gray-600 mb-2">{language === 'en' ? 'To address:' : 'A la dirección:'}</p>
            <div className="bg-white p-3 rounded border">
              <p className="font-mono text-sm break-all text-blue-600">3Arg9L1LwJjXd7FN7P3huZSYw42SFRFsBR</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-lg font-semibold text-red-600">
              Total: ${finalTotal.toFixed(2)} USD
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <span className="text-blue-600 mr-2">🔍</span>
          <h4 className="font-medium">
            {language === 'en' ? 'Transaction ID (Auto-Verification Enabled)' : 'ID de Transacción (Verificación Automática Habilitada)'}
          </h4>
        </div>
        
        <Input
          placeholder={language === 'en' ? 'Enter Bitcoin Transaction ID (64 characters)' : 'Ingresa ID de Transacción Bitcoin (64 caracteres)'}
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="font-mono text-sm"
        />
        
        <div className="flex items-start space-x-2 text-sm text-blue-600">
          <span>🔍</span>
          <p>
            {language === 'en' 
              ? "We'll automatically verify your payment on the Bitcoin blockchain. Orders are confirmed instantly after successful verification."
              : "Verificaremos automáticamente tu pago en la blockchain de Bitcoin. Los pedidos se confirman instantáneamente después de la verificación exitosa."
            }
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-600 mr-2">❌</span>
            <p className="text-red-700 text-sm">
              {language === 'en' 
                ? 'Transaction ID not working? Hit me up on Telegram: @DANSTRBER'
                : 'ID de transacción no funciona? Contáctame en Telegram: @DANSTRBER'
              }
            </p>
          </div>
        </div>

        <Button 
          onClick={handleFinalSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting 
            ? (language === 'en' ? 'Processing...' : 'Procesando...') 
            : (language === 'en' ? 'Verify & Submit Order' : 'Verificar y Enviar Pedido')
          }
        </Button>
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return language === 'en' ? 'Shipping Information' : 'Información de Envío';
      case 2:
        return language === 'en' ? 'Payment Method' : 'Método de Pago';
      case 3:
        return language === 'en' ? 'Confirm Your Address' : 'Confirma tu Dirección';
      case 4:
        return language === 'en' ? 'Bitcoin Payment' : 'Pago Bitcoin';
      default:
        return language === 'en' ? 'Complete Your Purchase' : 'Completa tu Compra';
    }
  };

  return (
    <>
      <Dialog open={isOpen && !orderSuccessData.show} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getStepTitle()}</DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? `Step ${currentStep} of 4: Complete your order securely` 
                : `Paso ${currentStep} de 4: Completa tu pedido de forma segura`
              }
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </Form>

          {currentStep < 3 && (
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button variant="secondary" onClick={handleBack}>
                  {language === 'en' ? 'Back' : 'Atrás'}
                </Button>
              )}
              <Button 
                onClick={handleNext}
                className="ml-auto"
              >
                {language === 'en' ? 'Next' : 'Siguiente'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <OrderSuccessModal
        isOpen={orderSuccessData.show}
        onClose={handleCloseSuccessModal}
        orderId={orderSuccessData.orderId}
        language={language}
      />
    </>
  );
};

export default PaymentModal;
