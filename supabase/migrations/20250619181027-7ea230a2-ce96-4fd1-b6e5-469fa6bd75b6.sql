
-- Fix the database function search path warnings by updating the functions
-- This will resolve the 4 "Function Search Path Mutable" warnings shown in your image

-- Update the generate_referral_code function
CREATE OR REPLACE FUNCTION public.generate_referral_code()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path = public, pg_temp
AS $function$
DECLARE
  code TEXT;
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.users WHERE referral_code = code) INTO exists_check;
    
    -- If code doesn't exist, return it
    IF NOT exists_check THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$function$;

-- Update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  referrer_user_id UUID;
  new_user_id UUID;
  user_referral_code TEXT;
BEGIN
  -- Generate referral code
  user_referral_code := public.generate_referral_code();
  
  -- Insert new user with generated referral code
  INSERT INTO public.users (auth_id, email, referral_code, name)
  VALUES (
    NEW.id,
    NEW.email,
    user_referral_code,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  )
  RETURNING id INTO new_user_id;
  
  -- Check if user was referred by someone
  IF NEW.raw_user_meta_data->>'referred_by' IS NOT NULL THEN
    -- Find the referrer
    SELECT id INTO referrer_user_id 
    FROM public.users 
    WHERE referral_code = NEW.raw_user_meta_data->>'referred_by';
    
    -- Update the new user's referred_by field
    UPDATE public.users 
    SET referred_by = NEW.raw_user_meta_data->>'referred_by'
    WHERE id = new_user_id;
    
    -- Create referral relationship
    IF referrer_user_id IS NOT NULL THEN
      INSERT INTO public.referrals (referrer_id, referred_id)
      VALUES (referrer_user_id, new_user_id);
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Update the calculate_user_discount function
CREATE OR REPLACE FUNCTION public.calculate_user_discount(user_auth_id uuid)
 RETURNS numeric
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pg_temp
AS $function$
DECLARE
  user_record RECORD;
  referral_count INTEGER;
  referral_discount DECIMAL;
  spending_discount DECIMAL;
  total_discount DECIMAL;
BEGIN
  -- Get user data
  SELECT * INTO user_record FROM public.users WHERE auth_id = user_auth_id;
  
  IF user_record IS NULL THEN
    RETURN 0;
  END IF;
  
  -- Calculate referral discount
  SELECT COUNT(*) INTO referral_count FROM public.referrals WHERE referrer_id = user_record.id;
  
  IF referral_count > 0 THEN
    referral_discount := 10 + (referral_count - 1) * 4;
    referral_discount := LEAST(referral_discount, 25); -- Cap at 25%
  ELSE
    referral_discount := 0;
  END IF;
  
  -- Calculate spending discount
  IF user_record.referred_by IS NOT NULL THEN
    -- Referred user gets 6% per $50 spent
    spending_discount := FLOOR(user_record.total_spending / 50) * 6;
  ELSE
    -- Referrer gets 2% per $50 of referred spending
    spending_discount := FLOOR(user_record.referred_spending / 50) * 2;
  END IF;
  
  -- Total discount capped at 30%
  total_discount := LEAST(referral_discount + spending_discount, 30);
  
  RETURN total_discount;
END;
$function$;

-- Add RLS policies for the orders table to ensure users can only see their own orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own orders
CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy for users to insert their own orders
CREATE POLICY "Users can create their own orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own orders
CREATE POLICY "Users can update their own orders" 
  ON public.orders 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add index for better query performance on verification status
CREATE INDEX IF NOT EXISTS idx_orders_verification_status ON public.orders(verification_status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
