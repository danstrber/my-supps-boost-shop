
import { supabase } from '@/integrations/supabase/client';

export interface OrderData {
  order_id: string;
  customer_email: string;
  customer_name: string;
  items: any[];
  original_total: number;
  discount_amount: number;
  shipping_fee: number;
  final_total: number;
  payment_method: string;
  tx_id: string;
  bitcoin_amount: string;
  shipping_address: string;
  phone: string;
  order_date: string;
  verification_status: string;
}

export const addOrder = async (orderData: OrderData) => {
  console.log('📝 Adding order to database:', orderData);
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({
        id: orderData.order_id,
        user_id: null, // Will be null for guest orders
        items: orderData.items,
        original_total: orderData.original_total,
        discount_amount: orderData.discount_amount,
        shipping_fee: orderData.shipping_fee,
        final_total: orderData.final_total,
        payment_method: orderData.payment_method,
        bitcoin_amount: parseFloat(orderData.bitcoin_amount),
        transaction_hash: orderData.tx_id || null,
        verification_status: orderData.verification_status,
        payment_details: {
          customer_email: orderData.customer_email,
          customer_name: orderData.customer_name,
          shipping_address: orderData.shipping_address,
          phone: orderData.phone,
          order_id: orderData.order_id
        }
      });

    if (error) {
      console.error('❌ Error adding order:', error);
      throw error;
    }

    console.log('✅ Order added successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Failed to add order:', error);
    throw error;
  }
};
