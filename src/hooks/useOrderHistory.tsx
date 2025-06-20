
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  order_id: string;
  user_id: string | null;
  customer_email: string;
  customer_name: string;
  items: OrderItem[];
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
  verification_status: string;
  created_at: string;
}

// Transform database row to Order interface
const transformDatabaseRowToOrder = (row: any): Order => {
  const paymentDetails = row.payment_details ? JSON.parse(JSON.stringify(row.payment_details)) : {};
  
  return {
    id: row.id,
    order_id: paymentDetails.order_id || `ORD-${Date.now()}`,
    user_id: row.user_id,
    customer_email: paymentDetails.customer_email || '',
    customer_name: paymentDetails.customer_name || '',
    items: Array.isArray(row.items) ? row.items : [],
    original_total: row.original_total || 0,
    discount_amount: row.discount_amount || 0,
    shipping_fee: row.shipping_fee || 0,
    final_total: row.final_total || 0,
    payment_method: row.payment_method || '',
    tx_id: row.transaction_hash || '',
    bitcoin_amount: row.bitcoin_amount?.toString() || '',
    shipping_address: paymentDetails.shipping_address || '',
    phone: paymentDetails.phone || '',
    order_date: row.created_at,
    verification_status: row.verification_status || 'pending',
    created_at: row.created_at
  };
};

// Transform Order to database insert format
const transformOrderToDatabaseFormat = (order: Omit<Order, 'id' | 'created_at' | 'user_id'>, userId?: string) => {
  return {
    user_id: userId || null,
    items: order.items,
    original_total: order.original_total,
    discount_amount: order.discount_amount,
    shipping_fee: order.shipping_fee,
    final_total: order.final_total,
    payment_method: order.payment_method,
    bitcoin_amount: order.bitcoin_amount ? parseFloat(order.bitcoin_amount) : null,
    transaction_hash: order.tx_id || null,
    verification_status: order.verification_status,
    payment_details: {
      order_id: order.order_id,
      customer_email: order.customer_email,
      customer_name: order.customer_name,
      shipping_address: order.shipping_address,
      phone: order.phone
    }
  };
};

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile, isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    if (!isAuthenticated || !userProfile) {
      // If not authenticated, check localStorage for temporary orders
      const localOrders = JSON.parse(localStorage.getItem('tempOrders') || '[]');
      setOrders(localOrders);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userProfile.auth_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        // Fallback to localStorage if database fails
        const localOrders = JSON.parse(localStorage.getItem('tempOrders') || '[]');
        setOrders(localOrders);
      } else {
        // Transform database rows to Order interface
        const transformedOrders = (data || []).map(transformDatabaseRowToOrder);
        setOrders(transformedOrders);
        // Sync any temporary orders from localStorage
        await syncTemporaryOrders();
      }
    } catch (error) {
      console.error('Exception fetching orders:', error);
      const localOrders = JSON.parse(localStorage.getItem('tempOrders') || '[]');
      setOrders(localOrders);
    } finally {
      setLoading(false);
    }
  };

  const syncTemporaryOrders = async () => {
    if (!userProfile) return;

    const tempOrders = JSON.parse(localStorage.getItem('tempOrders') || '[]');
    if (tempOrders.length === 0) return;

    try {
      // Insert temporary orders into database
      for (const order of tempOrders) {
        const dbOrder = transformOrderToDatabaseFormat(order, userProfile.auth_id);
        await supabase
          .from('orders')
          .insert([dbOrder]);
      }
      
      // Clear temporary orders after successful sync
      localStorage.removeItem('tempOrders');
      console.log('Successfully synced temporary orders to database');
    } catch (error) {
      console.error('Error syncing temporary orders:', error);
    }
  };

  const addOrder = async (order: Omit<Order, 'id' | 'created_at' | 'user_id'>) => {
    const newOrder = {
      ...order,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      user_id: userProfile?.auth_id || null
    };

    if (isAuthenticated && userProfile) {
      try {
        const dbOrder = transformOrderToDatabaseFormat(order, userProfile.auth_id);
        const { data, error } = await supabase
          .from('orders')
          .insert([dbOrder])
          .select()
          .single();

        if (error) throw error;

        const transformedOrder = transformDatabaseRowToOrder(data);
        setOrders(prev => [transformedOrder, ...prev]);
        console.log('Order saved to database successfully');
      } catch (error) {
        console.error('Error saving order to database:', error);
        // Fallback to localStorage
        addToLocalStorage(newOrder);
      }
    } else {
      // Store in localStorage for unauthenticated users
      addToLocalStorage(newOrder);
    }
  };

  const addToLocalStorage = (order: Order) => {
    const tempOrders = JSON.parse(localStorage.getItem('tempOrders') || '[]');
    tempOrders.unshift(order);
    localStorage.setItem('tempOrders', JSON.stringify(tempOrders));
    setOrders(prev => [order, ...prev]);
    console.log('Order saved to localStorage (temporary)');
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated, userProfile]);

  return {
    orders,
    loading,
    addOrder,
    refreshOrders: fetchOrders
  };
};
