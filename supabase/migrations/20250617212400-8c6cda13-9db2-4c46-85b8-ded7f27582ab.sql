
-- Fix the foreign key constraint to reference users.auth_id instead of users.id
-- This is the root cause of the silent insertion failure

-- First, drop the existing foreign key constraint
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- Add the correct foreign key constraint that references users.auth_id
ALTER TABLE public.orders ADD CONSTRAINT orders_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.users(auth_id) ON DELETE CASCADE;

-- Verify the constraint is working by testing with current user
-- This should now allow inserts where user_id matches the authenticated user's auth_id
