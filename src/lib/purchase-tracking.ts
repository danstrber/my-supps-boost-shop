
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

// Direct order creation function with database integration
export const createOrder = async (orderData: any) => {
  console.log('🚀 Creating order in database:', orderData);
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) {
      console.error('💥 Order creation failed:', error);
      throw new Error('Failed to create order: ' + error.message);
    }
    
    console.log('✅ Order created successfully:', data);
    return data;
  } catch (error) {
    console.error('💥 Order creation failed:', error);
    throw error;
  }
};

// Update user spending with database integration
export const updateUserSpending = async (userId: string, amount: number) => {
  console.log('💰 Updating user spending:', { userId, amount });
  
  try {
    const { data, error } = await supabase.rpc('increment_user_spending', {
      user_auth_id: userId,
      amount_to_add: amount
    });
    
    if (error) {
      console.error('❌ Error updating user spending:', error);
      return false;
    }
    
    console.log('✅ User spending updated successfully:', data);
    return true;
  } catch (error) {
    console.error('❌ Error in spending update:', error);
    return false;
  }
};
