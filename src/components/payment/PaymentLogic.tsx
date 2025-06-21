
import { addOrder } from '@/lib/order';
import { BitcoinVerificationService } from '@/lib/bitcoinVerification';

export const handlePaymentProcessing = async (
  form: any,
  cartItems: any[],
  originalTotal: number,
  discountAmount: number,
  shippingFee: number,
  finalTotal: number,
  bitcoinAmount: string,
  transactionId: string,
  language: 'en' | 'es',
  toast: any,
  onOrderComplete: (orderId: string) => void
) => {
  console.log('💰 Processing Bitcoin payment with transaction ID:', transactionId);
  
  // Verify Bitcoin transaction if transaction ID is provided
  if (transactionId && transactionId.trim()) {
    console.log('🔍 Verifying Bitcoin transaction...');
    
    try {
      const verification = await BitcoinVerificationService.verifyTransaction(
        transactionId.trim(),
        '3Arg9L1LwJjXd7FN7P3huZSYw42SFRFsBR',
        parseFloat(bitcoinAmount)
      );

      if (!verification.isValid) {
        toast({
          title: language === 'en' ? "Transaction Verification Failed" : "Verificación de Transacción Fallida",
          description: verification.errorMessage || (language === 'en' ? "Unable to verify Bitcoin transaction" : "No se pudo verificar la transacción Bitcoin"),
          variant: "destructive",
        });
        return;
      }

      console.log('✅ Bitcoin transaction verified successfully');
    } catch (error) {
      console.error('❌ Bitcoin verification error:', error);
      toast({
        title: language === 'en' ? "Verification Error" : "Error de Verificación",
        description: language === 'en' ? "Unable to verify transaction. Please contact support via Telegram." : "No se pudo verificar la transacción. Por favor contacta soporte via Telegram.",
        variant: "destructive",
      });
      return;
    }
  }

  const orderData = {
    order_id: `ORD-${Date.now()}`,
    customer_email: form.getValues('email'),
    customer_name: form.getValues('fullName'),
    items: cartItems,
    original_total: originalTotal,
    discount_amount: discountAmount,
    shipping_fee: shippingFee,
    final_total: finalTotal,
    payment_method: 'bitcoin',
    tx_id: transactionId.trim() || '',
    bitcoin_amount: bitcoinAmount,
    shipping_address: `${form.getValues('address')}, ${form.getValues('city')}, ${form.getValues('state')} ${form.getValues('zipCode')}, ${form.getValues('country')}`,
    phone: form.getValues('phone'),
    order_date: new Date().toISOString(),
    verification_status: transactionId.trim() ? 'verified' : 'pending'
  };

  try {
    await addOrder(orderData);
    
    // Send notification email with transaction ID
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
        transaction_id: transactionId,
        verification_status: orderData.verification_status,
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
          message: `Thank you for your order! Your order ID is: ${orderData.order_id}. Transaction ID: ${transactionId}. We will process your order and send you tracking information.`,
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
    onOrderComplete(orderData.order_id);
    
  } catch (error) {
    console.error('❌ Error processing order:', error);
    toast({
      title: language === 'en' ? "Order Failed" : "Pedido Fallido",
      description: language === 'en' ? "There was an error processing your order. Please try again." : "Hubo un error procesando tu pedido. Por favor intenta de nuevo.",
      variant: "destructive",
    });
  }
};
