
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  items: OrderItem[];
  paymentMethod: string;
  shippingAddress: string;
}

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { userProfile } = useAuth();

  useEffect(() => {
    if (userProfile?.email) {
      // Get orders from localStorage for this specific user
      const userOrdersKey = `orders_${userProfile.email}`;
      const savedOrders = localStorage.getItem(userOrdersKey);
      
      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders);
          setOrders(parsedOrders);
        } catch (error) {
          console.error('Error parsing saved orders:', error);
          setOrders([]);
        }
      }
    }
  }, [userProfile?.email]);

  const addOrder = (orderData: any) => {
    if (!userProfile?.email) return;

    const newOrder: Order = {
      id: orderData.orderId,
      date: new Date().toISOString(),
      total: orderData.finalTotal,
      status: 'pending',
      items: orderData.items.map((item: any) => ({
        name: item.name || 'Unknown Product',
        quantity: item.quantity,
        price: item.price,
        total: item.total
      })),
      paymentMethod: orderData.paymentMethod,
      shippingAddress: orderData.shippingAddress
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);

    // Save to localStorage with user-specific key
    const userOrdersKey = `orders_${userProfile.email}`;
    localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
  };

  return { orders, addOrder };
};
