
import { addOrder } from '@/lib/order';

export const handlePaymentProcessing = async (
  form: any,
  cartItems: any[],
  originalTotal: number,
  discountAmount: number,
  shippingFee: number,
  finalTotal: number,
  bitcoinAmount: string,
  language: 'en' | 'es',
  toast: any,
  onOrderComplete: (orderId: string) => void
) => {
  console.log('💰 Processing Bitcoin payment...');
  
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
