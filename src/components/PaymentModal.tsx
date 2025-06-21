
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import PaymentTimer from '@/components/payment/PaymentTimer';
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
  const [paymentMethod, setPaymentMethod] = useState('bitcoin');
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

  const handleNext = () => {
    if (currentStep === 1) {
      form.handleSubmit((data) => {
        setCurrentStep(2);
      })();
    } else if (currentStep === 2) {
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
      <h3 className="text-xl font-semibold">
        {language === 'en' ? 'Complete Your Purchase' : 'Completa tu Compra'}
      </h3>
      <p className="text-gray-600">
        {language === 'en' 
          ? 'Please fill out your shipping information to complete your order.'
          : 'Por favor completa tu información de envío para completar tu orden.'}
      </p>
      
      <h4 className="text-lg font-medium">
        {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">{language === 'en' ? 'Full Name' : 'Nombre Completo'}</Label>
          <Input
            id="fullName"
            {...form.register('fullName')}
            placeholder={language === 'en' ? 'Full Name' : 'Nombre Completo'}
          />
        </div>
        <div>
          <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'Correo Electrónico'}</Label>
          <Input
            id="email"
            type="email"
            {...form.register('email')}
            placeholder={language === 'en' ? 'Email Address' : 'Correo Electrónico'}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">{language === 'en' ? 'Street Address' : 'Dirección'}</Label>
        <Input
          id="address"
          {...form.register('address')}
          placeholder={language === 'en' ? 'Street Address' : 'Dirección'}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">{language === 'en' ? 'City' : 'Ciudad'}</Label>
          <Input
            id="city"
            {...form.register('city')}
            placeholder={language === 'en' ? 'City' : 'Ciudad'}
          />
        </div>
        <div>
          <Label htmlFor="state">{language === 'en' ? 'State/Province' : 'Estado/Provincia'}</Label>
          <Input
            id="state"
            {...form.register('state')}
            placeholder={language === 'en' ? 'State/Province' : 'Estado/Provincia'}
          />
        </div>
        <div>
          <Label htmlFor="zipCode">{language === 'en' ? 'ZIP/Postal Code' : 'Código Postal'}</Label>
          <Input
            id="zipCode"
            {...form.register('zipCode')}
            placeholder={language === 'en' ? 'ZIP/Postal Code' : 'Código Postal'}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">{language === 'en' ? 'Country' : 'País'}</Label>
          <Select onValueChange={(value) => form.setValue('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'en' ? 'Select Country' : 'Seleccionar País'} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phone">{language === 'en' ? 'Phone Number' : 'Número de Teléfono'}</Label>
          <Input
            id="phone"
            type="tel"
            {...form.register('phone')}
            placeholder={language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        {language === 'en' ? 'Payment Method' : 'Método de Pago'}
      </h3>
      
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bitcoin" id="bitcoin" />
          <Label htmlFor="bitcoin">Bitcoin (BTC) - Automated Verification</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="telegram" id="telegram" />
          <Label htmlFor="telegram">Telegram - Manual Coordination</Label>
        </div>
      </RadioGroup>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">How to Pay with Bitcoin</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded">
            <h5 className="font-medium text-blue-600 mb-2">Easy Bitcoin Payment</h5>
            <ul className="text-sm space-y-1">
              <li>Copy the Bitcoin address provided</li>
              <li>Open your Bitcoin wallet app</li>
              <li>Send the exact amount to the address</li>
              <li>Wait for confirmation (usually 10-30 minutes)</li>
            </ul>
            <div className="mt-2 space-y-1 text-blue-600 text-sm">
              <div>• Coinbase.com</div>
              <div>• Kraken.com</div>
              <div>• Binance.com</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded">
            <h5 className="font-medium text-purple-600 mb-2">🔒 Anonymous Bitcoin Payment Tips</h5>
            <ul className="text-sm space-y-1">
              <li>• Use privacy wallets (Wasabi, Samourai)</li>
              <li>• Send from fresh, unlinked addresses</li>
              <li>• No ID verification - completely anonymous</li>
            </ul>
            <div className="mt-2 space-y-1 text-purple-600 text-sm">
              <div>• LocalCoinSwap.com</div>
              <div>• Bisq.network</div>
            </div>
          </div>
        </div>
        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
          Continue to Address Confirmation
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Confirm Your Address</h3>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <span className="text-blue-600 mr-2">📋</span>
          <span className="font-medium text-blue-800">Please confirm your shipping address:</span>
        </div>
        
        <div className="space-y-2 text-sm">
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

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
        <div className="flex items-center">
          <span className="text-orange-600 mr-2">⚠️</span>
          <span className="text-orange-800 font-medium">
            Please double-check your address carefully. Orders cannot be changed once payment is confirmed.
          </span>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button 
          onClick={() => setCurrentStep(4)} 
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          ✅ Address is Correct - Proceed to Payment
        </Button>
        <Button 
          onClick={() => setCurrentStep(1)} 
          variant="outline" 
          className="flex-1"
        >
          ← Edit Address
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Bitcoin Payment</h3>
      
      <PaymentTimer 
        onExpired={() => {
          toast({
            title: "Payment Expired",
            description: "Please restart the payment process",
            variant: "destructive"
          });
          setCurrentStep(1);
        }}
        language={language}
      />

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
        <h4 className="font-semibold text-orange-800 mb-3">₿ Payment Details</h4>
        
        <div className="bg-white p-4 rounded border text-center">
          <div className="mb-2 text-gray-600">Send exactly</div>
          <div className="text-2xl font-bold text-orange-600 mb-4">{bitcoinAmount} BTC</div>
          
          <div className="mb-2 text-gray-600">To address:</div>
          <div className="bg-blue-100 p-2 rounded font-mono text-sm break-all mb-4">
            3Arg9L1LwJTXd7fN7P3huZSYw42SfRFsBR
          </div>
          
          <div className="text-lg font-semibold text-orange-600">
            Total: ${finalTotal.toFixed(2)} USD
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <span className="text-blue-600 mr-2">🔍</span>
          <span className="font-medium">Transaction ID (Auto-Verification Enabled)</span>
        </div>
        
        <Input
          placeholder="Enter Bitcoin Transaction ID (64 characters)"
          className="mb-3"
        />
        
        <div className="flex items-center text-blue-600 text-sm mb-3">
          <span className="mr-2">🔍</span>
          <span>We'll automatically verify your payment on the Bitcoin blockchain. Orders are confirmed instantly after successful verification.</span>
        </div>
        
        <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700 text-sm mb-4">
          ❌ Transaction ID not working? Hit me up on Telegram: @your_telegram
        </div>
        
        <Button 
          onClick={handleFinalSubmit}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Processing...' : 'Verify & Submit Order'}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen && !orderSuccessData.show} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentStep === 1 && (language === 'en' ? 'Complete Your Purchase' : 'Completa tu Compra')}
              {currentStep === 2 && (language === 'en' ? 'Payment Method' : 'Método de Pago')}
              {currentStep === 3 && (language === 'en' ? 'Confirm Your Address' : 'Confirma tu Dirección')}
              {currentStep === 4 && (language === 'en' ? 'Bitcoin Payment' : 'Pago Bitcoin')}
            </DialogTitle>
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
                disabled={currentStep === 1 && !form.formState.isValid}
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
