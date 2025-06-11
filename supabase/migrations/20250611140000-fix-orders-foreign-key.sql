
-- Fix foreign key constraint for orders table
-- The issue is that the orders table references users.id but we're passing auth.uid()
-- We need to update the foreign key to reference users.auth_id instead

-- First, drop the existing foreign key constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- Add the correct foreign key constraint that references users.auth_id
ALTER TABLE orders ADD CONSTRAINT orders_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(auth_id) ON DELETE CASCADE;

-- Update RLS policies to work with the corrected foreign key
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
CREATE POLICY "Users can insert their own orders" ON orders
FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" ON orders
FOR SELECT USING (
  user_id = auth.uid()
);

-- Also add update and delete policies for completeness
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
CREATE POLICY "Users can update their own orders" ON orders
FOR UPDATE USING (
  user_id = auth.uid()
);

DROP POLICY IF EXISTS "Users can delete their own orders" ON orders;
CREATE POLICY "Users can delete their own orders" ON orders
FOR DELETE USING (
  user_id = auth.uid()
);
