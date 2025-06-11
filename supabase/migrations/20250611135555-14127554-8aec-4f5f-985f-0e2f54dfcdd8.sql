
-- Fix row-level security policy for orders table
-- This allows users to insert orders with their own user_id

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;

-- Create new policy that allows users to insert orders with their user_id
CREATE POLICY "Users can insert their own orders" ON orders
FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

-- Also ensure users can view their own orders
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" ON orders
FOR SELECT USING (
  user_id = auth.uid()
);
