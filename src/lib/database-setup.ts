
import { supabase } from '@/integrations/supabase/client';

export const setupDatabase = async () => {
  try {
    console.log('Checking database setup...');
    
    // Test if the generate_referral_code function exists by trying to call it
    const { data, error } = await supabase.rpc('generate_referral_code');
    
    if (error) {
      console.error('Database function error:', error);
      console.log('You may need to run the migration to create the generate_referral_code function');
    } else {
      console.log('Database functions are working correctly');
    }
    
  } catch (error) {
    console.error('Database setup error:', error);
  }
};
