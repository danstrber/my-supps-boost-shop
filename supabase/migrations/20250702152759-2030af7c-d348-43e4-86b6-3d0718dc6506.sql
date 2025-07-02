-- Drop and recreate update_user_post_auth function to fix ambiguous referral_code reference
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