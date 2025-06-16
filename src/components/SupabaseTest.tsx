
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const SupabaseTest = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('Testing...');
    
    try {
      console.log('🧪 Testing Supabase connection...');
      console.log('🔗 Supabase URL: https://kunluppghxdqfqjxruwv.supabase.co');
      console.log('🔗 Supabase Key (first 20 chars): eyJhbGciOiJIUzI1NiIsInR5...');
      
      // Test 1: Basic connection
      const { data: healthData, error: healthError } = await supabase
        .from('orders')
        .select('count')
        .limit(1);
      
      console.log('🧪 Health check result:', { healthData, healthError });
      
      if (healthError) {
        setTestResult(`❌ Connection failed: ${healthError.message}`);
        return;
      }
      
      // Test 2: Auth check
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      console.log('🧪 Auth check result:', { user: user?.id, authError });
      
      if (authError) {
        setTestResult(`❌ Auth failed: ${authError.message}`);
        return;
      }
      
      if (!user) {
        setTestResult(`⚠️ No authenticated user found`);
        return;
      }
      
      // Test 3: RLS policy check
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .limit(1);
      
      console.log('🧪 Orders query result:', { ordersData, ordersError });
      
      if (ordersError) {
        setTestResult(`❌ Orders query failed: ${ordersError.message} (Check RLS policies)`);
        return;
      }
      
      setTestResult(`✅ All tests passed! User: ${user.id.slice(0, 8)}... Orders accessible: ${ordersData?.length || 0}`);
      
    } catch (error: any) {
      console.error('🧪 Test error:', error);
      setTestResult(`❌ Test failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-3">Supabase Connection Test</h3>
      <Button onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test Connection'}
      </Button>
      {testResult && (
        <div className="mt-3 p-3 bg-white border rounded text-sm">
          {testResult}
        </div>
      )}
    </div>
  );
};

export default SupabaseTest;
