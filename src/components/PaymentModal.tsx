
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ShippingForm from '@/components/payment/ShippingForm';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import { addOrder } from '@/lib/order';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be selected.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Record<string, number>;
  products: Product[];
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

  const t = {
    en: {
      shippingInfo: 'Shipping Information',
      payment: 'Payment',
      reviewOrder: 'Review Order',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      state: 'State',
      zip: 'ZIP Code',
      country: 'Country',
      next: 'Next',
      back: 'Back',
      placeOrder: 'Place Order',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      discount: 'Discount',
      shipping: 'Shipping',
      total: 'Total',
      bitcoinAmount: 'Bitcoin Amount',
      btcAddress: 'BTC Address',
      btcAddressValue: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlv',
      shippingTo: 'Shipping To',
      items: 'Items',
      quantity: 'Quantity',
      price: 'Price',
      confirmOrder: 'Confirm Order',
      edit: 'Edit',
      pleaseSend: 'Please send',
      toThisAddress: 'to this address',
      pendingConfirmation: 'Your order is pending confirmation. We will verify your payment within 24 hours.',
      close: 'Close',
      orderNumber: 'Order Number',
      copyAddress: 'Copy Address',
      copied: 'Copied!',
      processing: 'Processing...'
    },
    es: {
      shippingInfo: 'Información de Envío',
      payment: 'Pago',
      reviewOrder: 'Revisar Pedido',
      fullName: 'Nombre Completo',
      email: 'Email',
      phone: 'Teléfono',
      address: 'Dirección',
      city: 'Ciudad',
      state: 'Estado',
      zip: 'Código Postal',
      country: 'País',
      next: 'Siguiente',
      back: 'Atrás',
      placeOrder: 'Realizar Pedido',
      orderSummary: 'Resumen del Pedido',
      subtotal: 'Subtotal',
      discount: 'Descuento',
      shipping: 'Envío',
      total: 'Total',
      bitcoinAmount: 'Cantidad de Bitcoin',
      btcAddress: 'Dirección BTC',
      btcAddressValue: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlv',
      shippingTo: 'Enviar A',
      items: 'Artículos',
      quantity: 'Cantidad',
      price: 'Precio',
      confirmOrder: 'Confirmar Pedido',
      edit: 'Editar',
      pleaseSend: 'Por favor envíe',
      toThisAddress: 'a esta dirección',
      pendingConfirmation: 'Su pedido está pendiente de confirmación. Verificaremos su pago en 24 horas.',
      close: 'Cerrar',
      orderNumber: 'Número de Pedido',
      copyAddress: 'Copiar Dirección',
      copied: '¡Copiado!',
      processing: 'Procesando...'
    }
  };

  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(t.en.btcAddressValue)
      .then(() => {
        setIsAddressCopied(true);
        setTimeout(() => setIsAddressCopied(false), 2000);
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
        toast({
          title: language === 'en' ? "Copy Failed" : "Copia Fallida",
          description: language === 'en' ? "Could not copy the address to clipboard." : "No se pudo copiar la dirección al portapapeles.",
          variant: "destructive",
        });
      });
  };

  const handlePaymentStep = async () => {
    console.log('💰 Processing Bitcoin payment...');
    
    const orderData = {
      order_id: `ORD-${Date.now()}`,
      customer_email: form.getValues('email'),
      customer_name: form.getValues('fullName'),
      items: cartItems,
      original_total: originalTotal,
      discount_amount: discountAmount,
      shipping_fee: SHIPPING_FEE,
      final_total: finalTotal,
      payment_method: 'bitcoin',
      tx_id: '',
      bitcoin_amount: bitcoinAmount,
      shipping_address: `${form.getValues('address')}, ${form.getValues('city')}, ${form.getValues('state')} ${form.getValues('zipCode')}, ${form.getValues('country')}`,
      phone: form.getValues('phone'),
      order_date: new Date().toISOString(),
      verification_status: 'pending'
    };

    try {
      await addOrder(orderData);
      
      // Send notification email
      console.log('📧 Sending order collection email via Formspree...');
      const formspreeResponse = await fetch('https://formspree.io/f/xdkoybpv', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderData.order_id,
          customer_email: orderData.customer_email,
          customer_name: orderData.customer_name,
          total: orderData.final_total,
          bitcoin_amount: bitcoinAmount,
          items: cartItems.map(item => `${item.name} (Qty: ${item.quantity})`).join(', '),
          shipping_address: orderData.shipping_address,
          phone: orderData.phone
        })
      });

      if (formspreeResponse.ok) {
        console.log('✅ Order collected successfully via Formspree');
      } else {
        console.warn('⚠️ Failed to send order collection email via Formspree');
      }

      console.log('✅ Order processed successfully');
      
      // Send customer confirmation email
      console.log('📧 Sending customer confirmation email...');
      try {
        const confirmationResponse = await fetch('https://formspree.io/f/xdkoybpv', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _replyto: orderData.customer_email,
            _subject: `Order Confirmation - ${orderData.order_id}`,
            message: `Thank you for your order! Your order ID is: ${orderData.order_id}. We will verify your Bitcoin payment within 24 hours and send you tracking information.`,
            to: orderData.customer_email
          })
        });
        
        if (confirmationResponse.ok) {
          console.log('✅ Customer confirmation email sent successfully');
        }
      } catch (emailError) {
        console.warn('⚠️ Failed to send customer confirmation email:', emailError);
      }

      // Show success modal
      handleOrderComplete(orderData.order_id);
      
    } catch (error) {
      console.error('❌ Error processing order:', error);
      toast({
        title: language === 'en' ? "Order Failed" : "Pedido Fallido",
        description: language === 'en' ? "There was an error processing your order. Please try again." : "Hubo un error procesando tu pedido. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const l = t[language];

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
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{l.orderSummary}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">{l.subtotal}:</p>
                  <p className="font-semibold">${originalTotal.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">{l.discount}:</p>
                  <p className="font-semibold">-${discountAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">{l.shipping}:</p>
                  <p className="font-semibold">${SHIPPING_FEE.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">{l.total}:</p>
                  <p className="font-semibold">${finalTotal.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">{l.bitcoinAmount}:</p>
                  <p className="font-semibold">{bitcoinAmount} BTC</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold">{l.shippingTo}</h3>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <p className="text-gray-600">{l.fullName}:</p>
                  <p className="font-semibold">{form.getValues('fullName')}</p>
                </div>
                <div>
                  <p className="text-gray-600">{l.email}:</p>
                  <p className="font-semibold">{form.getValues('email')}</p>
                </div>
                <div>
                  <p className="text-gray-600">{l.phone}:</p>
                  <p className="font-semibold">{form.getValues('phone')}</p>
                </div>
                <div>
                  <p className="text-gray-600">{l.address}:</p>
                  <p className="font-semibold">{form.getValues('address')}, {form.getValues('city')}, {form.getValues('state')} {form.getValues('zipCode')}, {form.getValues('country')}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold">{l.items}</h3>
              <div className="grid grid-cols-1 gap-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <p className="text-gray-600">{item.name}</p>
                    <p className="font-semibold">{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{l.confirmOrder}</h3>
              <p>{l.pleaseSend} <strong>{bitcoinAmount} BTC</strong> {l.toThisAddress}:</p>
              <div className="relative">
                <Input
                  type="text"
                  value={t.en.btcAddressValue}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  className="absolute top-1 right-1 bg-blue-500 text-white rounded-md px-3 py-1 text-sm hover:bg-blue-600 transition-colors"
                  disabled={isAddressCopied}
                >
                  {isAddressCopied ? l.copied : l.copyAddress}
                </Button>
              </div>
              <p className="text-green-600">{l.pendingConfirmation}</p>
            </div>
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
