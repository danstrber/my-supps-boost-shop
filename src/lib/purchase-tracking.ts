
import { supabase } from '@/integrations/supabase/client';

export interface PendingPurchase {
  userId: string;
  amount: number;
  items: any[];
  referralCode?: string;
}

// Simple in-memory storage for pending purchases
const pendingPurchases = new Map<string, PendingPurchase>();

export const createPendingPurchase = (orderId: string, purchase: PendingPurchase): void => {
  pendingPurchases.set(orderId, purchase);
  console.log('📝 Pending purchase created:', orderId, purchase);
};

export const confirmPurchase = async (orderId: string): Promise<boolean> => {
  const purchase = pendingPurchases.get(orderId);
  
  if (!purchase) {
    console.error('❌ No pending purchase found for order:', orderId);
    return false;
  }

  try {
    console.log('🔄 Confirming purchase for order:', orderId);
    
    // Update user spending
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('total_spending, referred_by')
      .eq('auth_id', purchase.userId)
      .maybeSingle();

    if (fetchError) {
      console.error('❌ Error fetching user data:', fetchError);
      throw fetchError;
    }

    if (userData) {
      const newTotalSpending = (userData.total_spending || 0) + purchase.amount;
      
      const { error: userError } = await supabase
        .from('users')
        .update({ total_spending: newTotalSpending })
        .eq('auth_id', purchase.userId);

      if (userError) {
        console.error('❌ Error updating user spending:', userError);
        throw userError;
      }

      // Handle referral spending if applicable
      if (purchase.referralCode) {
        console.log('🔄 Processing referral spending for code:', purchase.referralCode);
        
        const { data: referrerData, error: referrerFetchError } = await supabase
          .from('users')
          .select('referred_spending')
          .eq('referral_code', purchase.referralCode)
          .maybeSingle();

        if (referrerFetchError) {
          console.error('❌ Error fetching referrer data:', referrerFetchError);
          // Don't throw here, just log the error
        } else if (referrerData) {
          const newReferredSpending = (referrerData.referred_spending || 0) + purchase.amount;
          
          const { error: referrerError } = await supabase
            .from('users')
            .update({ referred_spending: newReferredSpending })
            .eq('referral_code', purchase.referralCode);

          if (referrerError) {
            console.error('❌ Error updating referrer spending:', referrerError);
            // Don't throw here, just log the error
          }
        }
      }
    }

    // Remove from pending purchases
    pendingPurchases.delete(orderId);
    
    console.log('✅ Purchase confirmed and saved:', orderId);
    return true;
  } catch (error) {
    console.error('❌ Error confirming purchase:', error);
    return false;
  }
};

export const cancelPendingPurchase = (orderId: string): void => {
  pendingPurchases.delete(orderId);
  console.log('🗑️ Pending purchase cancelled:', orderId);
};

export const getPendingPurchase = (orderId: string): PendingPurchase | undefined => {
  return pendingPurchases.get(orderId);
};
