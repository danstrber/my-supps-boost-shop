
-- Create function to increment user spending
CREATE OR REPLACE FUNCTION increment_user_spending(
  user_auth_id UUID,
  amount_to_add DECIMAL(10,2)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users 
  SET 
    total_spending = total_spending + amount_to_add,
    updated_at = NOW()
  WHERE auth_id = user_auth_id;
  
  IF FOUND THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;
