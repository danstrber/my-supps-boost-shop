
import React, { useState, useEffect } from 'react';
import { X, Copy, Check, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PaymentTimer from './payment/PaymentTimer';
import OrderSummary from './payment/OrderSummary';
import PaymentMethodInfo from './payment/PaymentMethodInfo';
import BitcoinTutorial from './payment/BitcoinTutorial';
import OrderSuccessModal from './OrderSuccessModal';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { BitcoinVerificationService, VerificationError } from '@/lib/bitcoinVerification';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderTotal: number;
  discount: number;
  shippingInfo: ShippingInfo;
  language: 'en' | 'es';
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  orderTotal, 
  discount, 
  shippingInfo, 
  language 
}: PaymentModalProps) => {
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bitcoinAddress, setBitcoinAddress] = useState('bc1qxy2kgdygjrsqtzq2yr8yr3ylk69swq2x83kppa');
  const { user } = useAuth();

  const text = {
    en: {
      title: 'Bitcoin Payment',
      paymentInfo: 'Send the exact amount of Bitcoin to the address below to complete your order. Your order will be processed after the payment is confirmed on the blockchain.',
      bitcoinAddress: 'Bitcoin Address',
      amount: 'Amount',
      transactionId: 'Transaction ID',
      submitOrder: 'Submit Order',
      verifyingTransaction: 'Verifying Bitcoin Transaction...',
      processing: 'Processing Order...',
      paymentExpired: 'Payment Expired',
      paymentExpiredDesc: 'Your payment session has expired. Please start a new order.',
      retry: 'Retry Verification',
      retrying: 'Retrying...',
      contactSupport: 'Contact Support',
      copied: 'Copied!',
      invalidTransactionId: 'Invalid Transaction ID',
      insufficientFunds: 'Insufficient Funds',
      wrongAddress: 'Wrong Address',
      paymentReceived: 'Payment Received',
      paymentConfirmation: 'Your payment has been received and is awaiting confirmation.',
      orderConfirmed: 'Order Confirmed',
      orderConfirmationDesc: 'Your order has been successfully placed and is being processed.'
    },
    es: {
      title: 'Pago con Bitcoin',
      paymentInfo: 'Envía la cantidad exacta de Bitcoin a la dirección de abajo para completar tu pedido. Tu pedido se procesará después de que el pago se confirme en la blockchain.',
      bitcoinAddress: 'Dirección de Bitcoin',
      amount: 'Cantidad',
      transactionId: 'ID de Transacción',
      submitOrder: 'Enviar Pedido',
      verifyingTransaction: 'Verificando Transacción de Bitcoin...',
      processing: 'Procesando Pedido...',
      paymentExpired: 'Pago Expirado',
      paymentExpiredDesc: 'Tu sesión de pago ha expirado. Por favor, inicia un nuevo pedido.',
      retry: 'Reintentar Verificación',
      retrying: 'Reintentando...',
      contactSupport: 'Contactar Soporte',
      copied: '¡Copiado!',
      invalidTransactionId: 'ID de Transacción Inválido',
      insufficientFunds: 'Fondos Insuficientes',
      wrongAddress: 'Dirección Incorrecta',
      paymentReceived: 'Pago Recibido',
      paymentConfirmation: 'Tu pago ha sido recibido y está esperando confirmación.',
      orderConfirmed: 'Pedido Confirmado',
      orderConfirmationDesc: 'Tu pedido ha sido realizado con éxito y está siendo procesado.'
    }
  };

  const t = text[language];
  const finalTotal = orderTotal - discount + 10;

  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  const [verificationError, setVerificationError] = useState<string>('');
  const [isRetrying, setIsRetrying] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(t.copied);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSubmitOrder = async () => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }

    if (!transactionId.trim()) {
      console.error('Transaction ID is required');
      return;
    }

    setIsSubmitting(true);
    setVerificationStatus('verifying');
    setVerificationError('');

    try {
      console.log('🚀 Starting Bitcoin verification...');
      
      // First verify the Bitcoin transaction
      const verificationResult = await BitcoinVerificationService.verifyTransaction(
        transactionId.trim(),
        bitcoinAddress,
        finalTotal
      );

      console.log('🔍 Verification result:', verificationResult);

      if (verificationResult.isValid) {
        // Only save order AFTER successful verification
        console.log('✅ Bitcoin transaction verified successfully!');
        
        const orderData = {
          user_id: user.id,
          items: JSON.stringify(cartItems),
          original_total: orderTotal,
          discount_amount: discount,
          shipping_fee: 10,
          final_total: finalTotal,
          payment_method: 'bitcoin',
          bitcoin_address: bitcoinAddress,
          bitcoin_amount: finalTotal,
          transaction_hash: transactionId.trim(),
          verification_status: 'verified' as const,
          status: 'confirmed' as const,
          verified_at: new Date().toISOString(),
          verification_details: JSON.stringify(verificationResult.details),
          payment_details: JSON.stringify({
            shipping_info: shippingInfo,
            bitcoin_address: bitcoinAddress,
            expected_amount: finalTotal
          })
        };

        const { data: orderResult, error: orderError } = await supabase
          .from('orders')
          .insert(orderData)
          .select()
          .single();

        if (orderError) {
          console.error('❌ Error creating order:', orderError);
          throw new Error('Failed to create order');
        }

        const newOrderId = orderResult.id;
        setOrderId(newOrderId);
        console.log('✅ Order created successfully:', newOrderId);

        // Send confirmation email
        console.log('📧 Sending confirmation email...');
        try {
          const emailData = {
            customerEmail: user.email || '',
            customerName: user.user_metadata?.name || user.email || 'Customer',
            items: cartItems.map(item => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity
            })),
            originalTotal: orderTotal,
            discountAmount: discount,
            shippingFee: 10,
            finalTotal: finalTotal,
            paymentMethod: 'Bitcoin (BTC)',
            paymentDetails: {
              transactionId: transactionId.trim(),
              bitcoinAddress,
              verificationStatus: 'verified',
              shippingInfo
            }
          };

          const response = await supabase.functions.invoke('send-order-email', {
            body: emailData
          });

          if (response.error) {
            console.error('❌ Email sending failed:', response.error);
          } else {
            console.log('✅ Email sent successfully');
          }
        } catch (emailError) {
          console.error('❌ Email error:', emailError);
        }

        setVerificationStatus('success');
        setShowSuccessModal(true);
        
      } else {
        // Verification failed - don't save order
        console.log('❌ Bitcoin verification failed:', verificationResult.error);
        setVerificationStatus('failed');
        setVerificationError(verificationResult.errorMessage || 'Verification failed');
      }

    } catch (error) {
      console.error('❌ Order submission error:', error);
      setVerificationStatus('failed');
      setVerificationError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetryVerification = async () => {
    setIsRetrying(true);
    setVerificationError('');
    
    try {
      console.log('🔄 Retrying Bitcoin verification...');
      
      const verificationResult = await BitcoinVerificationService.verifyTransaction(
        transactionId.trim(),
        bitcoinAddress,
        finalTotal
      );

      if (verificationResult.isValid) {
        // If retry succeeds, create the order
        await handleSubmitOrder();
      } else {
        setVerificationError(verificationResult.errorMessage || 'Verification failed');
      }
    } catch (error) {
      console.error('❌ Retry verification failed:', error);
      setVerificationError('Retry failed. Please contact support.');
    } finally {
      setIsRetrying(false);
    }
  };

  const handlePaymentExpired = () => {
    alert(t.paymentExpiredDesc);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold">{t.title}</CardTitle>
              <Button variant="ghost" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-gray-600 mt-2">{t.paymentInfo}</p>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <OrderSummary
                  cartItems={cartItems}
                  orderTotal={orderTotal}
                  discount={discount}
                  shippingFee={10}
                  finalTotal={finalTotal}
                />
                <PaymentTimer onExpired={handlePaymentExpired} language={language} />
                <PaymentMethodInfo
                  address={bitcoinAddress}
                  amount={finalTotal}
                  language={language}
                />
              </div>

              <div>
                <BitcoinTutorial language={language} />

                <div className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="bitcoin-address">{t.bitcoinAddress}</Label>
                    <Input
                      type="text"
                      id="bitcoin-address"
                      className="font-mono text-sm"
                      value={bitcoinAddress}
                      readOnly
                      onClick={(e) => {
                        (e.target as HTMLInputElement).select();
                        copyToClipboard(bitcoinAddress);
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount">{t.amount}</Label>
                    <Input
                      type="text"
                      id="amount"
                      className="font-mono text-sm"
                      value={finalTotal.toFixed(8)}
                      readOnly
                      onClick={(e) => {
                        (e.target as HTMLInputElement).select();
                        copyToClipboard(finalTotal.toFixed(8));
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="transaction-id">{t.transactionId}</Label>
                    <Input
                      type="text"
                      id="transaction-id"
                      placeholder="Enter your transaction ID"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Verification Status Section */}
          {verificationStatus !== 'idle' && (
            <div className="p-6 border-t">
              <div className="space-y-4">
                {verificationStatus === 'verifying' && (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      {t.verifyingTransaction}
                    </AlertDescription>
                  </Alert>
                )}
                
                {verificationStatus === 'failed' && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p>{verificationError}</p>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={handleRetryVerification}
                            disabled={isRetrying}
                            size="sm"
                          >
                            {isRetrying ? (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                {t.retrying}
                              </>
                            ) : (
                              <>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                {t.retry}
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open('https://t.me/DANSTRBER', '_blank')}
                          >
                            {t.contactSupport}
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          <div className="p-6 border-t bg-gray-50">
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting || !transactionId.trim() || verificationStatus === 'verifying'}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  {verificationStatus === 'verifying' ? t.verifyingTransaction : t.processing}
                </>
              ) : (
                t.submitOrder
              )}
            </Button>
          </div>
        </div>
      </div>

      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        orderId={orderId}
        language={language}
      />
    </>
  );
};

export default PaymentModal;
