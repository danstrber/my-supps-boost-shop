
-- Drop policies one by one to avoid deadlocks
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
