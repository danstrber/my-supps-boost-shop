
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import ShippingForm from '@/components/payment/ShippingForm';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import PaymentStep from '@/components/payment/PaymentStep';
import BitcoinStep from '@/components/payment/BitcoinStep';
import { PaymentModalProps, FormData, formSchema } from '@/components/payment/types';
import { translations } from '@/components/payment/translations';
import { handlePaymentProcessing } from '@/components/payment/PaymentLogic';

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
  const SHIPPING_FEE = 10;

  const [orderSuccessData, setOrderSuccessData] = useState<{
    orderId: string;
    show: boolean;
  }>({ orderId: '', show: false });

  const form = useForm<FormData>({
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

  const handlePaymentStep = async () => {
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

  const l = translations[language];

  return (
    <>
      <Dialog open={isOpen && !orderSuccessData.show} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentStep === 1 ? l.shippingInfo : currentStep === 2 ? l.payment : l.reviewOrder}</DialogTitle>
            <DialogDescription>
              {currentStep === 1
                ? language === 'en' ? 'Enter your shipping information' : 'Ingrese su información de envío'
                : currentStep === 2
                  ? language === 'en' ? 'Confirm your order and payment details' : 'Confirme su pedido y detalles de pago'
                  : language === 'en' ? 'Review your order before placing it' : 'Revise su pedido antes de realizarlo'}
            </DialogDescription>
          </DialogHeader>

          {currentStep === 1 && (
            <Form {...form}>
              <ShippingForm form={form} language={language} />
            </Form>
          )}

          {currentStep === 2 && (
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
          )}

          {currentStep === 3 && (
            <BitcoinStep
              bitcoinAmount={bitcoinAmount}
              language={language}
            />
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                {l.back}
              </Button>
            )}
            {currentStep < 3 ? (
              <Button onClick={() => {
                if (currentStep === 1) {
                  form.handleSubmit((data) => {
                    setCurrentStep(2);
                  })();
                } else if (currentStep === 2) {
                  setCurrentStep(3);
                }
              }}
                disabled={currentStep === 1 && !form.formState.isValid}
              >
                {l.next}
              </Button>
            ) : (
              <Button onClick={handlePaymentStep} disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? l.processing : l.placeOrder}
              </Button>
            )}
          </div>
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
