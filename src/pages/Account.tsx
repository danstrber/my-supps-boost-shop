
import React, { useState } from 'react';
import Header from '@/components/Header';
import ReferralSection from '@/components/ReferralSection';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Calendar, DollarSign } from 'lucide-react';

interface AccountPageProps {
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
}: AccountPageProps) => {
  const { userProfile, userDiscount, loading } = useAuth();
  const [referralCount] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          language={language}
          onLanguageChange={onLanguageChange}
          cartItemCount={cartItemCount}
          isAuthenticated={isAuthenticated}
          onAuthAction={onAuthAction}
          onCartOpen={onCartOpen}
          onMenuToggle={onMenuToggle}
          currentPage="account"
          onPageChange={onPageChange}
          sidebarOpen={sidebarOpen}
        />
        <div className="pt-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              {language === 'en' ? 'Please Sign In' : 'Por Favor Inicia Sesión'}
            </h1>
            <p className="text-gray-600 mb-8">
              {language === 'en' 
                ? 'You need to be signed in to view your account.' 
                : 'Necesitas iniciar sesión para ver tu cuenta.'}
            </p>
            <Button onClick={() => onAuthAction('login')} className="bg-green-600 hover:bg-green-700">
              {language === 'en' ? 'Sign In' : 'Iniciar Sesión'}
            </Button>
          </div>
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
        onCartOpen={onCartOpen}
        onMenuToggle={onMenuToggle}
        currentPage="account"
        onPageChange={onPageChange}
        sidebarOpen={sidebarOpen}
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

          {/* Referral Section - Moved up here */}
          <ReferralSection
            userProfile={userProfile}
            language={language}
            referralCount={referralCount}
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
    </div>
  );
};

export default Account;
