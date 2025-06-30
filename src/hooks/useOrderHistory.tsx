
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
  user_id: string;
  bitcoin_address?: string;
  transaction_hash?: string;
  status?: string;
  created_at: string;
  verified_at?: string;
  payment_details?: any;
  verification_details?: any;
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

      // Transform database data to match Order interface
      const transformedOrders: Order[] = (data || []).map(dbOrder => ({
        id: dbOrder.id,
        order_id: dbOrder.id, // Use id as order_id if no separate order_id field
        customer_email: userProfile.email,
        customer_name: userProfile.name || userProfile.email,
        items: Array.isArray(dbOrder.items) ? dbOrder.items : [],
        original_total: dbOrder.original_total || 0,
        discount_amount: dbOrder.discount_amount || 0,
        shipping_fee: dbOrder.shipping_fee || 0,
        final_total: dbOrder.final_total || 0,
        payment_method: dbOrder.payment_method || '',
        tx_id: dbOrder.transaction_hash,
        bitcoin_amount: dbOrder.bitcoin_amount?.toString(),
        shipping_address: '', // Will need to be extracted from payment_details if stored there
        phone: '', // Will need to be extracted from payment_details if stored there
        order_date: dbOrder.created_at,
        verification_status: dbOrder.verification_status,
        user_id: dbOrder.user_id,
        bitcoin_address: dbOrder.bitcoin_address,
        transaction_hash: dbOrder.transaction_hash,
        status: dbOrder.status,
        created_at: dbOrder.created_at,
        verified_at: dbOrder.verified_at,
        payment_details: dbOrder.payment_details,
        verification_details: dbOrder.verification_details
      }));

      setOrders(transformedOrders);
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
      // Transform Order data to match database schema
      const dbOrderData = {
        user_id: orderData.user_id,
        items: orderData.items,
        original_total: orderData.original_total,
        discount_amount: orderData.discount_amount,
        shipping_fee: orderData.shipping_fee,
        final_total: orderData.final_total,
        payment_method: orderData.payment_method,
        transaction_hash: orderData.tx_id,
        bitcoin_amount: orderData.bitcoin_amount ? parseFloat(orderData.bitcoin_amount) : null,
        bitcoin_address: orderData.bitcoin_address,
        verification_status: orderData.verification_status || 'pending',
        status: orderData.status || 'pending',
        payment_details: {
          customer_email: orderData.customer_email,
          customer_name: orderData.customer_name,
          shipping_address: orderData.shipping_address,
          phone: orderData.phone,
          ...orderData.payment_details
        },
        verification_details: orderData.verification_details
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([dbOrderData])
        .select()
        .single();

      if (error) {
        console.error('Error adding order:', error);
        throw error;
      }

      // Transform back to Order interface and add to local state
      const newOrder: Order = {
        id: data.id,
        order_id: data.id,
        customer_email: orderData.customer_email,
        customer_name: orderData.customer_name,
        items: orderData.items,
        original_total: orderData.original_total,
        discount_amount: orderData.discount_amount,
        shipping_fee: orderData.shipping_fee,
        final_total: orderData.final_total,
        payment_method: orderData.payment_method,
        tx_id: orderData.tx_id,
        bitcoin_amount: orderData.bitcoin_amount,
        shipping_address: orderData.shipping_address,
        phone: orderData.phone,
        order_date: data.created_at,
        verification_status: orderData.verification_status,
        user_id: orderData.user_id,
        bitcoin_address: orderData.bitcoin_address,
        transaction_hash: orderData.tx_id,
        status: orderData.status,
        created_at: data.created_at,
        verified_at: data.verified_at,
        payment_details: orderData.payment_details,
        verification_details: orderData.verification_details
      };

      setOrders(prev => [newOrder, ...prev]);
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
