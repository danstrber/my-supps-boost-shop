
import { supabase } from '@/integrations/supabase/client';

export interface PendingPurchase {
  userId: string;
  amount: number;
  items: any[];
  referralCode?: string;
}

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
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('total_spending, referred_by')
      .eq('auth_id', purchase.userId)
      .single();

    if (fetchError) throw fetchError;

    const isFirstPurchase = userData.total_spending === 0;
    const isReferredUser = userData.referred_by;

    const newTotalSpending = (userData.total_spending || 0) + purchase.amount;
    
    let updateData: any = { total_spending: newTotalSpending };
    
    if (isReferredUser && isFirstPurchase) {
      updateData.referred_by = null;
      console.log('Resetting referred status after first purchase for user:', purchase.userId);
    }

    const { error: userError } = await supabase
      .from('users')
      .update(updateData)
      .eq('auth_id', purchase.userId);

    if (userError) throw userError;

    if (purchase.referralCode) {
      const { data: referrerData, error: referrerFetchError } = await supabase
        .from('users')
        .select('referred_spending')
        .eq('referral_code', purchase.referralCode)
        .single();

      if (referrerFetchError) throw referrerFetchError;

      const newReferredSpending = (referrerData.referred_spending || 0) + purchase.amount;
      const { error: referrerError } = await supabase
        .from('users')
        .update({ referred_spending: newReferredSpending })
        .eq('referral_code', purchase.referralCode);

      if (referrerError) throw referrerError;
    }

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
