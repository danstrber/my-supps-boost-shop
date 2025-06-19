
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Shield, LogOut, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import OrderHistory from '@/components/OrderHistory';
import ReferralSection from '@/components/ReferralSection';
import Two

const AccountPage = ({ language }: AccountPageProps) => {
  const { userProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const text = {
    en: {
      title: 'My Account',
      profile: 'Profile',
      orders: 'Orders',
      referrals: 'Referrals',
      security: 'Security',
      personalInfo: 'Personal Information',
      email: 'Email',
      name: 'Full Name',
      updateProfile: 'Update Profile',
      logout: 'Logout',
      orderHistory: 'Order History',
      referralProgram: 'Referral Program',
      securitySettings: 'Security Settings'
    },
    es: {
      title: 'Mi Cuenta',
      profile: 'Perfil',
      orders: 'Pedidos',
      referrals: 'Referencias',
      security: 'Seguridad',
      personalInfo: 'Información Personal',
      email: 'Email',
      name: 'Nombre Completo',
      updateProfile: 'Actualizar Perfil',
      logout: 'Cerrar Sesión',
      orderHistory: 'Historial de Pedidos',
      referralProgram: 'Programa de Referencias',
      securitySettings: 'Configuración de Seguridad'
    }
  };

  const t = text[language];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const tabs = [
    { id: 'profile', label: t.profile, icon: User },
    { id: 'orders', label: t.orders, icon: Package },
    { id: 'referrals', label: t.referrals, icon: User },
    { id: 'security', label: t.security, icon: Shield }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{userProfile?.name || userProfile?.email}</p>
                    <p className="text-xs text-gray-500">{userProfile?.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className="w-full justify-start"
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t.logout}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.personalInfo}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">{t.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile?.email || ''}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">{t.name}</Label>
                      <Input
                        id="name"
                        type="text"
                        value={userProfile?.name || ''}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    {t.updateProfile}
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'orders' && (
              <OrderHistory language={language} />
            )}

            {activeTab === 'referrals' && (
              <ReferralSection 
                language={language} 
                userProfile={userProfile}
                referralCount={0}
              />
            )}

            {activeTab === 'security' && (
              <TwoFactorSettings 
                language={language}
                userProfile={userProfile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
