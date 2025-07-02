
-- Add discount banking columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS saved_discount_percentage numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS lifetime_earned_discount numeric DEFAULT 0;

-- Update the calculate_user_discount function to handle discount banking
CREATE OR REPLACE FUNCTION calculate_user_discount(user_auth_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_record record;
    referral_count integer;
    cart_total numeric;
    referral_discount numeric := 0;
    spending_discount numeric := 0;
    referred_spending_discount numeric := 0;
    first_referral_bonus numeric := 0;
    is_referrer boolean := false;
    total_earned_discount numeric := 0;
    final_discount numeric := 0;
    available_saved_discount numeric := 0;
    result json;
BEGIN
    -- Get user data
    SELECT * INTO user_record
    FROM users 
    WHERE auth_id = user_auth_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'total_discount', 0,
            'saved_discount', 0,
            'earned_discount', 0,
            'error', 'User not found'
        );
    END IF;
    
    -- Count referrals made by this user
    SELECT COUNT(*) INTO referral_count
    FROM referrals r
    JOIN users u ON r.referrer_id = u.id
    WHERE u.auth_id = user_auth_id;
    
    -- Calculate discounts based on current rules
    referral_discount := referral_count * 2.5;
    is_referrer := referral_count > 0;
    
    -- First referral bonus if user was referred
    IF user_record.referred_by IS NOT NULL THEN
        first_referral_bonus := 10;
    END IF;
    
    -- Note: spending_discount and referred_spending_discount will be calculated 
    -- in the frontend based on current cart amount, not stored total_spending
    
    -- Calculate total earned discount (permanent bonuses only)
    total_earned_discount := referral_discount + first_referral_bonus;
    
    -- Get available saved discount
    available_saved_discount := COALESCE(user_record.saved_discount_percentage, 0);
    
    -- Update lifetime earned discount if it increased
    IF total_earned_discount > COALESCE(user_record.lifetime_earned_discount, 0) THEN
        UPDATE users 
        SET lifetime_earned_discount = total_earned_discount
        WHERE auth_id = user_auth_id;
    END IF;
    
    RETURN json_build_object(
        'referral_discount', referral_discount,
        'first_referral_bonus', first_referral_bonus,
        'is_referrer', is_referrer,
        'saved_discount', available_saved_discount,
        'lifetime_earned', COALESCE(user_record.lifetime_earned_discount, 0)
    );
END;
$$;

-- Function to use discount and update saved amount
CREATE OR REPLACE FUNCTION use_discount_and_save_remainder(
    user_auth_id uuid,
    total_available_discount numeric,
    discount_used numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    remainder_to_save numeric;
BEGIN
    -- Calculate remainder to save
    remainder_to_save := total_available_discount - discount_used;
    
    -- Only save if there's a positive remainder
    IF remainder_to_save > 0 THEN
        UPDATE users 
        SET saved_discount_percentage = COALESCE(saved_discount_percentage, 0) + remainder_to_save
        WHERE auth_id = user_auth_id;
    END IF;
END;
$$;
