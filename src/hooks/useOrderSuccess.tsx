
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OrderDetails {
  orderId: string;
  total: number;
  customerEmail: string;
  paymentMethod: string;
}

export const useOrderSuccess = () => {
  const [orderSuccessModal, setOrderSuccessModal] = useState<{
    isOpen: boolean;
    orderDetails: OrderDetails | null;
  }>({ isOpen: false, orderDetails: null });
  
  const { toast } = useToast();

  const showOrderSuccess = (orderDetails: OrderDetails) => {
    setOrderSuccessModal({
      isOpen: true,
      orderDetails
    });

    // Also show a toast notification
    toast({
      title: "Order Confirmed! 🎉",
      description: `Order #${orderDetails.orderId} has been successfully placed.`,
      duration: 5000,
    });
  };

  const closeOrderSuccess = () => {
    setOrderSuccessModal({ isOpen: false, orderDetails: null });
  };

  return {
    orderSuccessModal,
    showOrderSuccess,
    closeOrderSuccess
  };
};
