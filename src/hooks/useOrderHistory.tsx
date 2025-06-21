
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

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile, isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    setLoading(true);
    
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
        // Transform database orders to match our Order interface
        const transformedOrders: Order[] = (data || []).map(dbOrder => ({
          id: dbOrder.id,
          order_id: dbOrder.id, // Using id as order_id for now
          user_id: dbOrder.user_id,
          customer_email: userProfile.email || '',
          customer_name: userProfile.name || '',
          items: Array.isArray(dbOrder.items) ? (dbOrder.items as unknown as OrderItem[]) : [],
          original_total: Number(dbOrder.original_total) || 0,
          discount_amount: Number(dbOrder.discount_amount) || 0,
          shipping_fee: Number(dbOrder.shipping_fee) || 0,
          final_total: Number(dbOrder.final_total) || 0,
          payment_method: dbOrder.payment_method || '',
          tx_id: dbOrder.transaction_hash || '',
          bitcoin_amount: dbOrder.bitcoin_amount ? String(dbOrder.bitcoin_amount) : undefined,
          shipping_address: '', // This would come from payment_details
          phone: '', // This would come from payment_details
          order_date: dbOrder.created_at,
          verification_status: dbOrder.verification_status || 'pending',
          created_at: dbOrder.created_at
        }));
        
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
        const dbOrder = {
          user_id: userProfile.auth_id,
          items: order.items as any, // Cast to any to match Json type
          original_total: order.original_total,
          discount_amount: order.discount_amount,
          shipping_fee: order.shipping_fee,
          final_total: order.final_total,
          payment_method: order.payment_method,
          transaction_hash: order.tx_id,
          bitcoin_amount: order.bitcoin_amount ? Number(order.bitcoin_amount) : null,
          verification_status: order.verification_status,
          payment_details: {
            customer_email: order.customer_email,
            customer_name: order.customer_name,
            shipping_address: order.shipping_address,
            phone: order.phone
          }
        };

        await supabase
          .from('orders')
          .insert(dbOrder);
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
        const dbOrder = {
          user_id: userProfile.auth_id,
          items: newOrder.items as any, // Cast to any to match Json type
          original_total: newOrder.original_total,
          discount_amount: newOrder.discount_amount,
          shipping_fee: newOrder.shipping_fee,
          final_total: newOrder.final_total,
          payment_method: newOrder.payment_method,
          transaction_hash: newOrder.tx_id,
          bitcoin_amount: newOrder.bitcoin_amount ? Number(newOrder.bitcoin_amount) : null,
          verification_status: newOrder.verification_status,
          payment_details: {
            customer_email: newOrder.customer_email,
            customer_name: newOrder.customer_name,
            shipping_address: newOrder.shipping_address,
            phone: newOrder.phone
          }
        };

        const { data, error } = await supabase
          .from('orders')
          .insert(dbOrder)
          .select()
          .single();

        if (error) throw error;

        // Transform the database response back to our Order interface
        const transformedOrder: Order = {
          id: data.id,
          order_id: data.id,
          user_id: data.user_id,
          customer_email: newOrder.customer_email,
          customer_name: newOrder.customer_name,
          items: newOrder.items,
          original_total: newOrder.original_total,
          discount_amount: newOrder.discount_amount,
          shipping_fee: newOrder.shipping_fee,
          final_total: newOrder.final_total,
          payment_method: newOrder.payment_method,
          tx_id: newOrder.tx_id,
          bitcoin_amount: newOrder.bitcoin_amount,
          shipping_address: newOrder.shipping_address,
          phone: newOrder.phone,
          order_date: data.created_at,
          verification_status: newOrder.verification_status,
          created_at: data.created_at
        };

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
