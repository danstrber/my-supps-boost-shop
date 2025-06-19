
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface OrderItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  verification_status: 'pending' | 'verified' | 'failed';
  items: OrderItem[];
  transaction_hash?: string;
  bitcoin_address?: string;
  bitcoin_amount?: number;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching orders:', fetchError);
        setError('Failed to load orders');
        toast({
          title: 'Error',
          description: 'Failed to load your orders. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      // Transform the data to match the expected Order interface
      const transformedOrders: Order[] = (data || []).map(order => ({
        id: order.id,
        date: order.created_at,
        total: order.final_total,
        status: order.status || 'pending',
        verification_status: order.verification_status || 'pending',
        items: Array.isArray(order.items) ? order.items : [],
        transaction_hash: order.transaction_hash,
        bitcoin_address: order.bitcoin_address,
        bitcoin_amount: order.bitcoin_amount
      }));

      setOrders(transformedOrders);
    } catch (err) {
      console.error('Error in fetchOrders:', err);
      setError('An unexpected error occurred');
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while loading orders.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders
  };
};
