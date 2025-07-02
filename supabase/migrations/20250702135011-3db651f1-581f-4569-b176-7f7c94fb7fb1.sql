-- Update the handle_new_user function to better process user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
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
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update user data post-authentication
CREATE OR REPLACE FUNCTION public.update_user_post_auth(
  user_auth_id UUID,
  user_name TEXT DEFAULT NULL,
  user_country TEXT DEFAULT NULL,
  referral_code TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Update user profile with post-auth data
  UPDATE public.users 
  SET 
    name = COALESCE(user_name, name),
    country = COALESCE(user_country, country),
    referred_by = COALESCE(referral_code, referred_by),
    updated_at = NOW()
  WHERE auth_id = user_auth_id;
  
  -- If user was referred, create referral relationship
  IF referral_code IS NOT NULL THEN
    INSERT INTO public.referrals (referrer_id, referred_id)
    SELECT 
      u1.id as referrer_id,
      u2.id as referred_id
    FROM public.users u1, public.users u2
    WHERE u1.referral_code = referral_code
    AND u2.auth_id = user_auth_id
    AND u1.id != u2.id
    ON CONFLICT DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;