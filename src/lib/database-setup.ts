
import { supabase } from '@/integrations/supabase/client';

export const setupDatabase = async () => {
  try {
    console.log('Setting up database functions...');
    
    // Create the generate_referral_code function
    const { error: functionError } = await supabase.rpc('create_referral_function');
    
    if (functionError && !functionError.message.includes('already exists')) {
      console.error('Error creating function:', functionError);
    }
    
    console.log('Database setup complete');
  } catch (error) {
    console.error('Database setup error:', error);
  }
};
