
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import PaymentTimer from '@/components/payment/PaymentTimer';
import ShippingForm from '@/components/payment/ShippingForm';
import PaymentMethodInfo from '@/components/payment/PaymentMethodInfo';
import PaymentStep from '@/components/payment/PaymentStep';
import BitcoinStep from '@/components/payment/BitcoinStep';
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
  const SHIPPING_FEE = 10;

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
  const bitcoinAmount = (finalTotal / 30000).toFixed(8);

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
      // Validate shipping form
      const isValid = await form.trigger();
      if (isValid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (paymentMethod === 'telegram') {
        // Direct redirect to Telegram
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
    await handlePaymentProcessing(
      form,
      cartItems,
      originalTotal,
      discountAmount,
      SHIPPING_FEE,
      finalTotal,
      bitcoinAmount,
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
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">
        {language === 'en' ? 'Order Summary' : 'Resumen del Pedido'}
      </h3>
      <PaymentStep
        cartItems={cartItems}
        originalTotal={originalTotal}
        discountAmount={discountAmount}
        shippingFee={SHIPPING_FEE}
        finalTotal={finalTotal}
        bitcoinAmount={bitcoinAmount}
        form={form}
        language={language}
      />
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
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

      <BitcoinStep
        bitcoinAmount={bitcoinAmount}
        language={language}
      />

      <Button 
        onClick={handleFinalSubmit}
        className="w-full bg-green-600 hover:bg-green-700 mt-4"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting 
          ? (language === 'en' ? 'Processing...' : 'Procesando...') 
          : (language === 'en' ? 'Complete Order' : 'Completar Pedido')
        }
      </Button>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return language === 'en' ? 'Shipping Information' : 'Información de Envío';
      case 2:
        return language === 'en' ? 'Payment Method' : 'Método de Pago';
      case 3:
        return language === 'en' ? 'Order Summary' : 'Resumen del Pedido';
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

          {currentStep < 4 && (
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
