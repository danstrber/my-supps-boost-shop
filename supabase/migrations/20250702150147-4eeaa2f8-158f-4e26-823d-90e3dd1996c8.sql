-- Fix the handle_new_user trigger to properly handle country from signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
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