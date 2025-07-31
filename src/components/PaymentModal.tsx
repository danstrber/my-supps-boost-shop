import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useOrderSuccess from '@/hooks/useOrderSuccess';
import { translations } from '@/lib/translations';
import { ShippingForm } from './payment/ShippingForm';
import { OrderSummary } from './payment/OrderSummary';
import { PaymentMethodInfo } from './payment/PaymentMethodInfo';
import { BitcoinTutorial } from './payment/BitcoinTutorial';
import { PaymentTimer } from './payment/PaymentTimer';
import { verifyBitcoinTransaction } from '@/lib/bitcoinVerificationImproved';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'es';
}

export const PaymentModal = ({ isOpen, onClose, language }: PaymentModalProps) => {
  const { t } = translations[language];
  const { userProfile } = useAuth();
  const { cartItems, clearCart, subtotal } = useCart();
  const { showOrderSuccess } = useOrderSuccess();

  const [txId, setTxId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [bitcoinAmount, setBitcoinAmount] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    const calculateTotals = () => {
      const calculatedShippingCost = shippingInfo.country === 'US' ? 10 : 25;
      setShippingCost(calculatedShippingCost);

      // Fetch discount from local storage
      const storedDiscount = localStorage.getItem('discountAmount');
      const parsedDiscount = storedDiscount ? parseFloat(storedDiscount) : 0;
      setDiscountAmount(parsedDiscount);

      const calculatedFinalTotal = Math.max(0, subtotal - parsedDiscount + calculatedShippingCost);
      setFinalTotal(calculatedFinalTotal);
    };

    calculateTotals();
  }, [subtotal, shippingInfo, discountAmount]);

  useEffect(() => {
    const fetchBitcoinPaymentDetails = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('create-btc-payment', {
          body: {
            amount_usd: finalTotal,
            user_id: userProfile?.auth_id
          }
        });

        if (error) {
          console.error('Error from Supabase Function:', error);
          toast({
            title: t.error,
            description: t.paymentFailed,
            variant: "destructive"
          });
        } else {
          setBitcoinAddress(data.address);
          setBitcoinAmount(data.amount);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        toast({
          title: t.error,
          description: t.unexpectedError,
          variant: "destructive"
        });
      }
    };

    if (finalTotal > 0) {
      fetchBitcoinPaymentDetails();
    }
  }, [finalTotal, userProfile?.auth_id, t, toast]);

  const handleShippingChange = (newShippingInfo: any) => {
    setShippingInfo(newShippingInfo);
  };

  const handleSubmitTransaction = async () => {
    if (!txId.trim()) {
      toast({
        title: t.error,
        description: t.enterTransactionId,
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      console.log('Verifying transaction:', txId);
      
      // Remove debug bypass - all transactions must be verified properly
      const verification = await verifyBitcoinTransaction(txId, bitcoinAmount, bitcoinAddress);
      
      if (verification.isValid) {
        await processValidPayment(verification);
      } else {
        toast({
          title: t.verificationFailed,
          description: verification.error || t.transactionNotFound,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Transaction verification error:', error);
      toast({
        title: t.error,
        description: t.verificationError,
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const processValidPayment = async (verification: any) => {
    try {
      console.log('Processing valid payment...');
      
      const orderData = {
        user_id: userProfile?.auth_id,
        items: cartItems.map(item => ({
          productId: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        })),
        original_total: subtotal,
        discount_amount: discountAmount,
        shipping_fee: shippingCost,
        final_total: finalTotal,
        payment_method: 'bitcoin',
        bitcoin_address: bitcoinAddress,
        bitcoin_amount: bitcoinAmount,
        transaction_hash: verification.txId,
        status: 'paid',
        verification_status: 'verified',
        payment_details: {
          verification_time: new Date().toISOString(),
          confirmations: verification.confirmations,
          amount_btc: verification.amount
        },
        verification_details: verification,
        shipping_address: shippingInfo
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
      }

      console.log('Order created successfully:', order);
      
      // Send order confirmation email using secure environment variables
      try {
        const emailResponse = await fetch(process.env.FORMSPREE_ENDPOINT || '/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: userProfile?.email,
            subject: `Order Confirmation - ${order.id}`,
            message: `Your order has been confirmed and payment verified.\n\nOrder ID: ${order.id}\nTotal: $${finalTotal}\nTransaction: ${verification.txId}`
          }),
        });
        
        if (!emailResponse.ok) {
          console.warn('Failed to send confirmation email');
        }
      } catch (emailError) {
        console.warn('Email service unavailable:', emailError);
      }

      clearCart();
      showOrderSuccess(order);
      onClose();
      
      toast({
        title: t.paymentSuccess,
        description: t.orderConfirmed,
      });
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: t.error,
        description: t.processingError,
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t.paymentModalTitle}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Form */}
          <ShippingForm language={language} onChange={handleShippingChange} />

          {/* Order Summary */}
          <OrderSummary
            language={language}
            shippingCost={shippingCost}
            discountAmount={discountAmount}
            finalTotal={finalTotal}
          />
        </div>

        {/* Payment Information */}
        <PaymentMethodInfo
          bitcoinAddress={bitcoinAddress}
          bitcoinAmount={bitcoinAmount}
          language={language}
        />

        {/* Bitcoin Payment Tutorial */}
        <BitcoinTutorial language={language} />

        {/* Payment Timer */}
        <PaymentTimer language={language} />

        {/* Transaction ID Submission */}
        <div className="mt-6">
          <Input
            type="text"
            placeholder={t.transactionIdPlaceholder}
            value={txId}
            onChange={(e) => setTxId(e.target.value)}
            className="w-full"
          />
          <Button
            onClick={handleSubmitTransaction}
            disabled={isVerifying}
            className="w-full mt-4"
          >
            {isVerifying ? t.verifying : t.submitTransaction}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
