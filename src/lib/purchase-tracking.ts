
import { supabase } from '@/integrations/supabase/client';

export interface PendingPurchase {
  userId: string;
  amount: number;
  items: any[];
  referralCode?: string;
}

// Simplified tracking system
const pendingPurchases = new Map<string, PendingPurchase>();

export const createPendingPurchase = (orderId: string, purchase: PendingPurchase): void => {
  pendingPurchases.set(orderId, purchase);
  console.log('📝 Pending purchase created:', orderId, purchase);
};

export const getPendingPurchase = (orderId: string): PendingPurchase | undefined => {
  return pendingPurchases.get(orderId);
};

export const cancelPendingPurchase = (orderId: string): void => {
  pendingPurchases.delete(orderId);
  console.log('🗑️ Pending purchase cancelled:', orderId);
};

// Direct order creation function for better reliability
export const createOrder = async (orderData: any) => {
  console.log('🚀 Creating order directly:', orderData);
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      throw new Error('No order data returned from database');
    }

    console.log('✅ Order created successfully:', data);
    return data;
  } catch (error) {
    console.error('💥 Order creation failed:', error);
    throw error;
  }
};

// Update user spending with better error handling
export const updateUserSpending = async (userId: string, amount: number) => {
  console.log('💰 Updating user spending:', { userId, amount });
  
  try {
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('total_spending')
      .eq('auth_id', userId)
      .single();

    if (fetchError) {
      console.error('❌ Error fetching user data:', fetchError);
      return false;
    }

    const newTotalSpending = (userData.total_spending || 0) + amount;
    
    const { error: updateError } = await supabase
      .from('users')
      .update({ total_spending: newTotalSpending })
      .eq('auth_id', userId);

    if (updateError) {
      console.error('❌ Error updating user spending:', updateError);
      return false;
    }

    console.log('✅ User spending updated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error in spending update:', error);
    return false;
  }
};
