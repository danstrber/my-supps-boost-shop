
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  product_name: string;
}

export interface Order {
  id: string;
  user_id: string;
  original_total: number;
  discount_amount: number;
  shipping_fee: number;
  final_total: number;
  payment_method: string;
  items: any;
  status: string;
  created_at: string;
  bitcoin_address?: string;
  bitcoin_amount?: number;
  payment_details?: any;
  verification_status?: string;
  verified_at?: string;
  transaction_hash?: string;
}

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchOrders = async (userProfile: UserProfile | null) => {
    if (!userProfile?.id) {
      console.log('No user profile available for fetching orders');
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching orders for user:', userProfile.id);
      
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userProfile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: "Error",
          description: "Failed to fetch order history",
          variant: "destructive",
        });
        return;
      }

      console.log('Orders fetched successfully:', ordersData);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Exception while fetching orders:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (
    userProfile: UserProfile,
    cart: Record<string, number>,
    shippingAddress: any,
    paymentMethod: string,
    originalTotal: number,
    discountAmount: number,
    shippingFee: number,
    paymentAddress?: string,
    paymentAmount?: number,
    paymentCurrency?: string
  ) => {
    if (!userProfile?.id) {
      throw new Error('User profile is required to create an order');
    }

    try {
      console.log('Creating order for user:', userProfile.id);
      
      const finalTotal = originalTotal - discountAmount + shippingFee;

      // Create the order record
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userProfile.id,
          original_total: originalTotal,
          discount_amount: discountAmount,
          shipping_fee: shippingFee,
          final_total: finalTotal,
          payment_method: paymentMethod,
          items: cart,
          status: paymentMethod === 'bitcoin' ? 'pending' : 'confirmed',
          bitcoin_address: paymentAddress,
          bitcoin_amount: paymentAmount,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error('Failed to create order');
      }

      console.log('Order created successfully:', orderData);

      // Update user's total spending
      const newTotalSpending = (userProfile.total_spending || 0) + finalTotal;
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ total_spending: newTotalSpending })
        .eq('id', userProfile.id);

      if (updateError) {
        console.error('Error updating user spending:', updateError);
      }

      // If this user was referred, update the referrer's spending
      if (userProfile.referred_by) {
        const { data: referrerData, error: referrerError } = await supabase
          .from('users')
          .select('referred_spending')
          .eq('referral_code', userProfile.referred_by)
          .single();

        if (!referrerError && referrerData) {
          const newReferredSpending = (referrerData.referred_spending || 0) + finalTotal;
          
          await supabase
            .from('users')
            .update({ referred_spending: newReferredSpending })
            .eq('referral_code', userProfile.referred_by);
        }
      }

      return orderData;
    } catch (error) {
      console.error('Exception while creating order:', error);
      throw error;
    }
  };

  return {
    orders,
    loading,
    fetchOrders,
    createOrder
  };
};
