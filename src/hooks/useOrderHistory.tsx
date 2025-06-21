
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
        setOrders(data || []);
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
        await supabase
          .from('orders')
          .upsert({
            ...order,
            user_id: userProfile.auth_id,
            id: undefined // Let database generate new ID
          });
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
        const { data, error } = await supabase
          .from('orders')
          .insert([newOrder])
          .select()
          .single();

        if (error) throw error;

        setOrders(prev => [data, ...prev]);
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
