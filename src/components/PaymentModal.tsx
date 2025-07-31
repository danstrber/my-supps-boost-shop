import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useOrderSuccess } from '@/hooks/useOrderSuccess';
import { translations } from '@/lib/translations';
import ShippingForm from './payment/ShippingForm';
import OrderSummary from './payment/OrderSummary';
import PaymentMethodInfo from './payment/PaymentMethodInfo';
import BitcoinTutorial from './payment/BitcoinTutorial';
import PaymentTimer from './payment/PaymentTimer';
import { EnhancedBitcoinVerificationService } from '@/lib/bitcoinVerificationImproved';
import { products, Product } from '@/lib/products';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'es';
}

interface CartItem {
  id: string;
  variantId?: string;
  quantity: number;
  price: number;
  name: string;
  product: Product;
}

export const PaymentModal = ({ isOpen, onClose, language }: PaymentModalProps) => {
  const t = translations[language];
  const { userProfile } = useAuth();
  const { cart, clearCart } = useCart();
  const { showOrderSuccess } = useOrderSuccess();

  const [txId, setTxId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

  // Convert cart to cart items with full product data
  const cartItems: CartItem[] = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }
    return {
      id: productId,
      quantity,
      price: product.price,
      name: product.name,
      product,
    };
  });

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

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
            title: t.errorOccurred || 'Error',
            description: 'Payment failed. Please try again.',
            variant: "destructive"
          });
        } else {
          setBitcoinAddress(data.address);
          setBitcoinAmount(data.amount);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        toast({
          title: t.errorOccurred || 'Error',
          description: 'An unexpected error occurred',
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
        title: t.errorOccurred || 'Error',
        description: 'Please enter a transaction ID',
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      console.log('Verifying transaction:', txId);
      
      const verification = await EnhancedBitcoinVerificationService.verifyTransactionEnhanced(
        txId, 
        bitcoinAddress, 
        parseFloat(bitcoinAmount)
      );
      
      if (verification.isValid) {
        await processValidPayment(verification);
      } else {
        toast({
          title: 'Verification Failed',
          description: verification.error || 'Transaction not found',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Transaction verification error:', error);
      toast({
        title: t.errorOccurred || 'Error',
        description: 'Verification error occurred',
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
        bitcoin_amount: parseFloat(bitcoinAmount),
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
      
      clearCart();
      
      // Convert order to OrderDetails format
      const orderDetails = {
        orderId: order.id,
        total: finalTotal,
        customerEmail: userProfile?.email || '',
        paymentMethod: 'bitcoin'
      };
      
      showOrderSuccess(orderDetails);
      onClose();
      
      toast({
        title: 'Payment Successful',
        description: t.orderPlaced || 'Order confirmed successfully!',
      });
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast({
        title: t.errorOccurred || 'Error',
        description: 'Error processing payment',
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t.paymentTitle || 'Payment'}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Form - Placeholder */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Information</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p>Shipping form will be displayed here</p>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            orderTotal={subtotal}
            discount={discountAmount}
            shippingFee={shippingCost}
            finalTotal={finalTotal}
          />
        </div>

        {/* Payment Information - Placeholder */}
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
          <p>Bitcoin Address: {bitcoinAddress}</p>
          <p>Amount: {bitcoinAmount} BTC</p>
        </div>

        {/* Bitcoin Payment Tutorial */}
        <BitcoinTutorial language={language} />

        {/* Payment Timer */}
        <PaymentTimer 
          language={language} 
          onExpired={() => {
            toast({
              title: t.errorOccurred || 'Error',
              description: 'Payment expired. Please try again.',
              variant: "destructive"
            });
            onClose();
          }}
        />

        {/* Transaction ID Submission */}
        <div className="mt-6">
          <Input
            type="text"
            placeholder="Enter transaction ID"
            value={txId}
            onChange={(e) => setTxId(e.target.value)}
            className="w-full"
          />
          <Button
            onClick={handleSubmitTransaction}
            disabled={isVerifying}
            className="w-full mt-4"
          >
            {isVerifying ? 'Verifying...' : 'Submit Transaction'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};