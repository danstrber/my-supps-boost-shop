
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, DollarSign, Calendar } from 'lucide-react';
import ReferralSection from '@/components/ReferralSection';
import TwoFactorSettings from '@/components/TwoFactorSettings';
import OrderHistory from '@/components/OrderHistory';
import CartModal from '@/components/CartModal';
import { products } from '@/lib/products';
import { useCart } from '@/hooks/useCart';

interface AccountProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account') => void;
  sidebarOpen: boolean;
}

const Account = ({ 
  language, 
  onLanguageChange, 
  cartItemCount, 
  isAuthenticated, 
  onAuthAction, 
  onCartOpen,
  onMenuToggle,
  onPageChange,
  sidebarOpen
}: AccountProps) => {
  const { userProfile, loading } = useAuth();
  const { cart, handleUpdateCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  // Calculate user discount based on the rules
  const calculateUserDiscount = () => {
    if (!userProfile) return 0;
    
    // Check if user has made referrals
    const referralCount = 0; // This would come from actual referral data
    const isReferrer = referralCount > 0;
    
    // First referral bonus
    const firstReferralBonus = userProfile.referred_by ? 10 : 0;
    
    // Referral discount: 2.5% per referral
    const referralDiscount = referralCount * 2.5;
    
    // Spending discount based on user type
    const spendingDiscount = isReferrer
      ? Math.floor(Math.ceil(userProfile.total_spending) / 50) * 5  // Referrers: 5% per $50
      : userProfile.referred_by 
        ? Math.min(Math.floor(Math.ceil(userProfile.total_spending) / 50) * 6.5, Math.floor(150 / 50) * 6.5)  // Referred users: 6.5% per $50 (max at $150)
        : Math.floor(Math.ceil(userProfile.total_spending) / 50) * 2.5; // Standard users: 2.5% per $50
    
    // Referred spending discount for referrers
    const referredSpendingDiscount = isReferrer
      ? Math.min(Math.floor(Math.ceil(userProfile.referred_spending) / 50) * 5, Math.floor(150 / 50) * 5)
      : 0;
    
    // Total discount capped at 32%
    return Math.min(referralDiscount + spendingDiscount + referredSpendingDiscount + firstReferralBonus, 32);
  };

  const userDiscount = calculateUserDiscount();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to access your account</h1>
          <Button onClick={() => onAuthAction('login')}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={onLanguageChange}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuToggle={onMenuToggle}
        currentPage="account"
        onPageChange={onPageChange}
        sidebarOpen={sidebarOpen}
      />

      <Sidebar
        language={language}
        isOpen={sidebarOpen}
        selectedCategory="all"
        onCategoryChange={() => {}}
        userProfile={userProfile}
        referralCount={0}
        onClose={() => {}}
      />

      <div className="pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {language === 'en' ? 'My Account' : 'Mi Cuenta'}
          </h1>

          {/* User Profile Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Profile Information' : 'Información del Perfil'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    {language === 'en' ? 'Name' : 'Nombre'}
                  </Label>
                  <Input
                    id="name"
                    value={userProfile.name || ''}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email' : 'Correo'}
                  </Label>
                  <Input
                    id="email"
                    value={userProfile.email || ''}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <div className="mb-6">
            <OrderHistory language={language} />
          </div>

          {/* Two-Factor Authentication Settings */}
          <div className="mb-6">
            <TwoFactorSettings language={language} userProfile={userProfile} />
          </div>

          {/* Referral Section */}
          <ReferralSection
            userProfile={userProfile}
            language={language}
            referralCount={0}
            onPageChange={onPageChange}
          />
          
          {/* Account Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{userDiscount}%</div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Current Discount' : 'Descuento Actual'}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">${userProfile.total_spending.toFixed(2)}</div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Total Spent' : 'Total Gastado'}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-lg font-bold">
                  {new Date(userProfile.created_at).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Member Since' : 'Miembro Desde'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        onUpdateCart={handleUpdateCart}
        userDiscount={userDiscount}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
      />
    </div>
  );
};

export default Account;
