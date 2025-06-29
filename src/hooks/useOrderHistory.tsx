
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
  total_amount: number;
  discount_amount: number;
  shipping_fee: number;
  payment_method: string;
  shipping_address: any;
  items: OrderItem[];
  status: string;
  created_at: string;
  updated_at: string;
  payment_address?: string;
  payment_amount?: number;
  payment_currency?: string;
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
        .select(`
          *,
          order_items (
            product_id,
            quantity,
            price,
            product_name
          )
        `)
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
      
      // Transform the data to match our Order interface
      const transformedOrders: Order[] = ordersData?.map(order => ({
        ...order,
        items: order.order_items || []
      })) || [];

      setOrders(transformedOrders);
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
    totalAmount: number,
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
      
      // Create the order record
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userProfile.id,
          total_amount: totalAmount,
          discount_amount: discountAmount,
          shipping_fee: shippingFee,
          payment_method: paymentMethod,
          shipping_address: shippingAddress,
          status: paymentMethod === 'bitcoin' ? 'pending' : 'confirmed',
          payment_address: paymentAddress,
          payment_amount: paymentAmount,
          payment_currency: paymentCurrency
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error('Failed to create order');
      }

      console.log('Order created successfully:', orderData);

      // Create order items
      const orderItems = Object.entries(cart).map(([productId, quantity]) => ({
        order_id: orderData.id,
        product_id: productId,
        quantity: quantity,
        price: 0, // You might want to pass actual product prices here
        product_name: '' // You might want to pass actual product names here
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Don't throw here as the order was created successfully
      }

      // Update user's total spending
      const newTotalSpending = (userProfile.total_spending || 0) + totalAmount;
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ total_spending: newTotalSpending })
        .eq('id', userProfile.id);

      if (updateError) {
        console.error('Error updating user spending:', updateError);
        // Don't throw here as the order was created successfully
      }

      // If this user was referred, update the referrer's spending
      if (userProfile.referred_by) {
        const { data: referrerData, error: referrerError } = await supabase
          .from('users')
          .select('referred_spending')
          .eq('referral_code', userProfile.referred_by)
          .single();

        if (!referrerError && referrerData) {
          const newReferredSpending = (referrerData.referred_spending || 0) + totalAmount;
          
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
