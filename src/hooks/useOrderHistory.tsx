import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';

export interface Order {
  id: string;
  order_id: string;
  customer_email: string;
  customer_name: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  original_total: number;
  discount_amount: number;
  shipping_fee: number;
  final_total: number;
  payment_method: string;
  tx_id?: string;
  bitcoin_amount?: string;
  shipping_address: string;
  phone: string;
  order_date: string;
  verification_status?: string;
}

interface OrderHistoryContextType {
  orders: Order[];
  loading: boolean;
  fetchOrders: (userProfile: UserProfile) => Promise<void>;
  refreshOrders: () => Promise<void>;
  createOrder: (userProfile: UserProfile, cart: Record<string, any>, shippingAddress: any, paymentMethod: string, originalTotal: number, discountAmount: number, shippingFee: number, paymentAddress: any) => Promise<void>;
  addOrder: (orderData: Omit<Order, 'id'>) => Promise<void>;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export const OrderHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (userProfile: UserProfile) => {
    if (!userProfile?.email) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', userProfile.email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error('Exception fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = async () => {
    // This would need the current user profile to refresh
    // For now, just keep the existing orders
  };

  const createOrder = async (
    userProfile: UserProfile,
    cart: Record<string, any>,
    shippingAddress: any,
    paymentMethod: string,
    originalTotal: number,
    discountAmount: number,
    shippingFee: number,
    paymentAddress: any
  ) => {
    // Implementation for creating orders
    console.log('Creating order:', { userProfile, cart, shippingAddress, paymentMethod });
  };

  const addOrder = async (orderData: Omit<Order, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Error adding order:', error);
        throw error;
      }

      // Add to local state
      setOrders(prev => [data, ...prev]);
    } catch (error) {
      console.error('Exception adding order:', error);
      throw error;
    }
  };

  const contextValue: OrderHistoryContextType = {
    orders,
    loading,
    fetchOrders,
    refreshOrders,
    createOrder,
    addOrder
  };

  return (
    <OrderHistoryContext.Provider value={contextValue}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (context === undefined) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
};
