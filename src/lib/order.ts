
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
      .insert([{
        id: orderData.order_id,
        customer_email: orderData.customer_email,
        customer_name: orderData.customer_name,
        items: orderData.items,
        total_amount: orderData.final_total,
        payment_method: orderData.payment_method,
        shipping_address: orderData.shipping_address,
        phone: orderData.phone,
        status: orderData.verification_status,
        created_at: orderData.order_date
      }]);

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
