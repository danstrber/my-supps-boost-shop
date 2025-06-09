
import { supabase } from '@/integrations/supabase/client';

export interface PendingPurchase {
  userId: string;
  amount: number;
  items: any[];
  referralCode?: string;
}

// Store pending purchases in memory until confirmed
const pendingPurchases = new Map<string, PendingPurchase>();

export const createPendingPurchase = (orderId: string, purchase: PendingPurchase): void => {
  pendingPurchases.set(orderId, purchase);
  console.log('Pending purchase created:', orderId, purchase);
};

export const confirmPurchase = async (orderId: string): Promise<boolean> => {
  const purchase = pendingPurchases.get(orderId);
  
  if (!purchase) {
    console.error('No pending purchase found for order:', orderId);
    return false;
  }

  try {
    // Update user's total spending
    const { error: userError } = await supabase
      .from('users')
      .update({ 
        total_spending: supabase.sql`total_spending + ${purchase.amount}`
      })
      .eq('auth_id', purchase.userId);

    if (userError) throw userError;

    // If user was referred, update referrer's referred_spending
    if (purchase.referralCode) {
      const { error: referrerError } = await supabase
        .from('users')
        .update({ 
          referred_spending: supabase.sql`referred_spending + ${purchase.amount}`
        })
        .eq('referral_code', purchase.referralCode);

      if (referrerError) throw referrerError;
    }

    // Remove from pending purchases
    pendingPurchases.delete(orderId);
    
    console.log('Purchase confirmed and saved:', orderId);
    return true;
  } catch (error) {
    console.error('Error confirming purchase:', error);
    return false;
  }
};

export const cancelPendingPurchase = (orderId: string): void => {
  pendingPurchases.delete(orderId);
  console.log('Pending purchase cancelled:', orderId);
};

export const getPendingPurchase = (orderId: string): PendingPurchase | undefined => {
  return pendingPurchases.get(orderId);
};
