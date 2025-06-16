
-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can select their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;

-- Enable RLS on orders table (safe to run even if already enabled)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies for orders
CREATE POLICY "Users can insert their own orders" ON public.orders
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select their own orders" ON public.orders
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own orders" ON public.orders
FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);
