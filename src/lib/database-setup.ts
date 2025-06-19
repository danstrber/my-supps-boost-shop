
import { supabase } from '@/integrations/supabase/client';

export const setupDatabase = async () => {
  try {
    console.log('Checking database setup...');
    
    // Test database connection by checking if we can query the users table
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Database setup check failed:', error);
      return false;
    }
    
    console.log('Database setup verified successfully');
    return true;
    
  } catch (error) {
    console.error('Database setup error:', error);
    return false;
  }
};
