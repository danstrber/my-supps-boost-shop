
-- First, let's fix the RLS performance issues by optimizing the auth function calls
-- and clean up duplicate policies

-- Drop duplicate/conflicting policies on orders table
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can select their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;

-- Drop and recreate users policies with optimized auth calls
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

-- Drop referrals policy
DROP POLICY IF EXISTS "Users can view referrals they're involved in" ON public.referrals;

-- Create optimized policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
FOR SELECT USING (auth_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own profile" ON public.users
FOR UPDATE USING (auth_id = (SELECT auth.uid()));

CREATE POLICY "Users can insert their own profile" ON public.users
FOR INSERT WITH CHECK (auth_id = (SELECT auth.uid()));

-- Create single, optimized policies for orders table
CREATE POLICY "Users can manage their own orders" ON public.orders
FOR ALL USING (user_id = (SELECT auth.uid()));

-- Create optimized policy for referrals
CREATE POLICY "Users can view referrals they're involved in" ON public.referrals
FOR SELECT USING (
  referrer_id IN (SELECT id FROM public.users WHERE auth_id = (SELECT auth.uid())) OR
  referred_id IN (SELECT id FROM public.users WHERE auth_id = (SELECT auth.uid()))
);

-- Add a verification status column to orders for Bitcoin transaction verification
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS verification_details JSONB;

-- Add Bitcoin address and transaction amount for verification
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS bitcoin_address TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS bitcoin_amount NUMERIC;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS transaction_hash TEXT;
