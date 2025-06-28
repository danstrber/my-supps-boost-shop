
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import CartModal from '@/components/CartModal';
import { products } from '@/lib/products';
import ReferralSection from '@/components/ReferralSection';
import OrderHistory from '@/components/OrderHistory';
import TwoFactorSettings from '@/components/TwoFactorSettings';

const Account = () => {
  const { userProfile, handleAuthAction, isAuthenticated } = useAuth();
  const { cart, handleUpdateCart } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleOrderSuccess = (orderDetails: any) => {
    console.log('Order successful:', orderDetails);
    // Handle order success - maybe show a toast or redirect
  };

  const handleLogout = () => {
    handleAuthAction('logout');
  };

  if (!isAuthenticated || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to access your account</h2>
          <p className="text-gray-600">You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Account Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {userProfile.name || userProfile.email}!
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your account details and information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">{userProfile.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{userProfile.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Member Since</label>
                    <p className="text-gray-900">
                      {new Date(userProfile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <OrderHistory language="en" />
            </TabsContent>

            <TabsContent value="referrals">
              <ReferralSection 
                userProfile={userProfile}
                language="en"
                referralCount={0}
              />
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <TwoFactorSettings 
                  language="en"
                  userProfile={userProfile}
                />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>
                      Actions that will affect your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        products={products}
        onUpdateCart={handleUpdateCart}
        userDiscount={0}
        isAuthenticated={true}
        userProfile={userProfile}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
};

export default Account;
