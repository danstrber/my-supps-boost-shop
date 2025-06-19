import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShippingForm } from '@/components/payment/ShippingForm';
import { OrderSummary } from '@/components/payment/OrderSummary';
import { PaymentMethodInfo } from '@/components/payment/PaymentMethodInfo';
import { PaymentTimer } from '@/components/payment/PaymentTimer';
import { bitcoinVerification } from '@/lib/bitcoinVerification';
import { useOrderHistory } from '@/hooks/useOrderHistory';

interface CartItem {
  id: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const BITCOIN_ADDRESS = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

interface ShippingData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  products: Product[];
  subtotal: number;
  userDiscount: number;
  shippingFee: number;
  total: number;
  onOrderComplete: () => void;
  userProfile: any;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  cart, 
  products, 
  subtotal, 
  userDiscount, 
  shippingFee, 
  total, 
  onOrderComplete,
  userProfile 
}: PaymentModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { addOrder } = useOrderHistory();

  const sendOrderToFormspree = async (orderData: any): Promise<boolean> => {
    try {
      console.log('📧 Sending order email via Formspree...');
      
      // Organize items for better readability
      const organizedItems = orderData.items
        .filter((item: any) => item.name !== 'Unknown' && item.price > 0)
        .map((item: any) => `• ${item.name} - Qty: ${item.quantity} × $${item.price} = $${item.total.toFixed(2)}`)
        .join('\n');

      const customerEmailContent = `
🎉 ORDER CONFIRMATION 🎉

Order ID: ${orderData.orderId}
Date: ${new Date(orderData.orderDate).toLocaleDateString()}

📦 ITEMS ORDERED:
${organizedItems}

💰 PRICING:
Subtotal: $${orderData.originalTotal.toFixed(2)}
Discount: ${userDiscount}% (-$${(orderData.originalTotal * userDiscount / 100).toFixed(2)})
Shipping: $${orderData.shippingFee}
Final Total: $${orderData.finalTotal.toFixed(2)}

💳 Payment: ${orderData.paymentMethod}
📍 Shipping Address: ${orderData.shippingAddress}

${orderData.telegramInfo}

Thank you for your order! We'll process it soon and keep you updated.
      `;

      const deliveryEmailContent = `
📬 NEW ORDER RECEIVED

Order ID: ${orderData.orderId}
Customer: ${orderData.fullName}
Email: ${orderData.email}
Phone: ${orderData.phone || 'Not provided'}

📦 ITEMS:
${organizedItems}

💰 TOTAL: $${orderData.finalTotal.toFixed(2)}
Payment: ${orderData.paymentMethod}

📍 DELIVERY ADDRESS:
${orderData.shippingAddress}

Process this order and update customer via Telegram if provided.
      `;

      // Send customer confirmation
      const customerResponse = await fetch('https://formspree.io/f/xrbgoddw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: orderData.email,
          subject: `Order Confirmation - ${orderData.orderId}`,
          message: customerEmailContent,
          _reply_to: orderData.email
        }),
      });

      // Send delivery notification
      const deliveryResponse = await fetch('https://formspree.io/f/xrbgoddw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'delivery@mkbooster.com',
          subject: `New Order - ${orderData.orderId}`,
          message: deliveryEmailContent,
          _reply_to: orderData.email
        }),
      });

      if (customerResponse.ok && deliveryResponse.ok) {
        console.log('✅ Order emails sent successfully via Formspree');
        return true;
      } else {
        console.error('❌ Failed to send order emails via Formspree');
        return false;
      }
    } catch (error) {
      console.error('❌ Error sending order emails via Formspree:', error);
      return false;
    }
  };

  const handleOrderComplete = async (orderData: any) => {
    try {
      console.log('✅ Order processed via Formspree successfully');
      
      // Add to order history
      addOrder(orderData);
      
      // Show success toast
      toast({
        title: "🎉 Order Confirmed!",
        description: `Order ${orderData.orderId} has been successfully placed. Check your email for confirmation details.`,
        duration: 5000,
      });

      // Close modal and clear cart
      onOrderComplete();
      onClose();
      
    } catch (error) {
      console.error('Error completing order:', error);
      toast({
        title: "Order Placement Issue",
        description: "Your payment was processed but there was an issue saving the order. Please contact support with your transaction ID.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      // Address confirmation step
      if (!shippingData.fullName || !shippingData.email || !shippingData.address || !shippingData.city || !shippingData.country) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required shipping fields.",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      // Payment processing step
      setIsProcessing(true);
      
      console.log('🚀 Form submitted, processing...');
      console.log('Form data:', shippingData);

      if (!shippingData.fullName || !shippingData.email || !shippingData.address || !shippingData.city || !shippingData.country) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      console.log('✅ Form validation passed');

      if (selectedPaymentMethod === 'bitcoin') {
        console.log('💰 Processing Bitcoin payment...');
        
        if (!transactionId.trim()) {
          toast({
            title: "Transaction ID Required",
            description: "Please enter your Bitcoin transaction ID.",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }

        console.log('🎯 Moving to step 3 for Bitcoin verification');
        setCurrentStep(3);
        setIsProcessing(false);
        return;
      }
    }

    if (currentStep === 3) {
      // Bitcoin verification step
      console.log('🔍 Starting Bitcoin transaction verification...');
      
      try {
        const verificationResult = await bitcoinVerification.verifyTransaction(
          transactionId,
          total,
          BITCOIN_ADDRESS
        );
        
        console.log('🔍 Verification result:', verificationResult);

        if (verificationResult.isValid) {
          console.log('✅ Transaction verified! Processing order via Formspree first...');
          
          // Create comprehensive order data
          const orderData = {
            orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            orderDate: new Date().toLocaleString(),
            ...shippingData,
            items: cart.map(item => {
              const product = products.find(p => p.id === item.id);
              return {
                id: item.id,
                name: product?.name || 'Unknown',
                price: product?.price || 0,
                quantity: item.quantity,
                total: (product?.price || 0) * item.quantity
              };
            }),
            originalTotal: subtotal,
            finalTotal: total,
            shippingFee,
            paymentMethod: selectedPaymentMethod === 'bitcoin' ? 'Bitcoin (BTC)' : selectedPaymentMethod,
            txId: transactionId,
            verificationStatus: 'verified',
            telegramInfo: `

🔹 For faster replies and 1-on-1 communications, join our Telegram group:
📱 Telegram: https://t.me/DANSTRBER

We'll contact you there for order updates and support!`
          };

          console.log('📧 Sending order email via Formspree (primary)...');
          const formspreeSuccess = await sendOrderToFormspree(orderData);

          if (formspreeSuccess) {
            await handleOrderComplete(orderData);
          } else {
            throw new Error('Failed to process order via Formspree');
          }
        } else {
          toast({
            title: "Payment Verification Failed",
            description: verificationResult.error || "Could not verify your Bitcoin transaction. Please check the transaction ID and try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error during verification:', error);
        toast({
          title: "Verification Error",
          description: "There was an error verifying your payment. Please try again or contact support.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {currentStep === 1 && 'Shipping Information'}
            {currentStep === 2 && 'Confirm Your Order'}
            {currentStep === 3 && 'Payment Verification'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <ShippingForm
              shippingData={shippingData}
              onShippingDataChange={setShippingData}
            />
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Order confirmation step */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">📍 Confirm Your Shipping Address</h3>
                <div className="text-blue-800">
                  <p><strong>{shippingData.fullName}</strong></p>
                  <p>{shippingData.address}</p>
                  <p>{shippingData.city}, {shippingData.state}</p>
                  <p>{shippingData.postalCode} {shippingData.country}</p>
                  {shippingData.phone && <p>📞 {shippingData.phone}</p>}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(1)}
                  className="mt-2"
                >
                  ✏️ Edit Address
                </Button>
              </div>

              <OrderSummary 
                cart={cart}
                products={products}
                subtotal={subtotal}
                userDiscount={userDiscount}
                shippingFee={shippingFee}
                total={total}
              />
              
              <PaymentMethodInfo
                selectedMethod={selectedPaymentMethod}
                onMethodChange={setSelectedPaymentMethod}
                bitcoinAddress={BITCOIN_ADDRESS}
                total={total}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <PaymentTimer />
              
              <div className="space-y-4">
                <Label htmlFor="txId">Bitcoin Transaction ID</Label>
                <Input
                  id="txId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter your Bitcoin transaction ID"
                  required
                />
                <p className="text-sm text-gray-600">
                  Enter the transaction ID from your Bitcoin wallet after sending the payment.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                } else {
                  onClose();
                }
              }}
              disabled={isProcessing}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>

            <Button
              type="submit"
              disabled={isProcessing}
              className="min-w-[120px]"
            >
              {isProcessing ? 'Processing...' : 
               currentStep === 1 ? 'Continue' :
               currentStep === 2 ? 'Proceed to Payment' :
               'Verify & Complete Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
