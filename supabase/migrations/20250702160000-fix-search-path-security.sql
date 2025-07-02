
-- Fix search_path security warnings for database functions
-- This addresses the "Function Search Path Mutable" security warnings

-- Drop and recreate handle_new_user function with secure search_path
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Insert new user with metadata from auth
  INSERT INTO public.users (
    auth_id,
    email,
    name,
    country,
    referred_by,
    referral_code,
    total_spending,
    referred_spending
  ) VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      (NEW.raw_user_meta_data->>'name')::text,
      (NEW.raw_user_meta_data->>'full_name')::text,
      NEW.email
    ),
    COALESCE(
      (NEW.raw_user_meta_data->>'country')::text,
      'USA'
    ),
    (NEW.raw_user_meta_data->>'referred_by')::text,
    public.generate_referral_code(),
    0,
    0
  );
  
  -- Log the insertion for debugging
  RAISE NOTICE 'Created user % with country: %', NEW.id, COALESCE((NEW.raw_user_meta_data->>'country')::text, 'USA');
  
  RETURN NEW;
END;
$function$;

-- Drop and recreate update_user_post_auth function with secure search_path
DROP FUNCTION IF EXISTS public.update_user_post_auth(uuid, text, text, text);

CREATE OR REPLACE FUNCTION public.update_user_post_auth(
  user_auth_id uuid, 
  user_name text DEFAULT NULL::text, 
  user_country text DEFAULT NULL::text, 
  user_referral_code text DEFAULT NULL::text
)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  -- Update user profile with post-auth data
  UPDATE public.users 
  SET 
    name = COALESCE(user_name, name),
    country = COALESCE(user_country, country),
    referred_by = COALESCE(user_referral_code, referred_by),
    updated_at = NOW()
  WHERE auth_id = user_auth_id;
  
  -- If user was referred, create referral relationship
  IF user_referral_code IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_id)
    SELECT 
      u1.id as referrer_id,
      u2.id as referred_id
    FROM public.users u1, public.users u2
    WHERE u1.referral_code = user_referral_code
    AND u2.auth_id = user_auth_id
    AND u1.id != u2.id
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- Log the update for debugging
  RAISE NOTICE 'Updated user % with country: %, name: %, referral: %', user_auth_id, user_country, user_name, user_referral_code;
END;
$function$;
