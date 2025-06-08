
-- Create the missing generate_referral_code function
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
AS $$
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
$$;

-- Recreate the user creation trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  referrer_user_id UUID;
  new_user_id UUID;
BEGIN
  -- Insert new user with generated referral code
  INSERT INTO public.users (auth_id, email, referral_code, name)
  VALUES (
    NEW.id,
    NEW.email,
    generate_referral_code(),
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
$$;

-- Drop existing trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
