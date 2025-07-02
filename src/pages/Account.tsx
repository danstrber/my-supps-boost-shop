import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { countries } from '@/lib/countries';
import CartModal from '@/components/CartModal';
import { products } from '@/lib/products';
import ReferralSection from '@/components/ReferralSection';
import OrderHistory from '@/components/OrderHistory';
import TwoFactorSettings from '@/components/TwoFactorSettings';

interface AccountProps {
  language?: 'en' | 'es';
  onLanguageChange?: (lang: 'en' | 'es') => void;
  cartItemCount?: number;
  isAuthenticated?: boolean;
  onAuthAction?: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen?: () => void;
  onMenuToggle?: () => void;
  onPageChange?: (page: string) => void;
  sidebarOpen?: boolean;
}

const Account = ({
  language = 'en',
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  onMenuToggle,
  onPageChange,
  sidebarOpen
}: AccountProps) => {
  const { userProfile, handleAuthAction, isAuthenticated: authState, refreshProfile } = useAuth();
  const { cart, handleUpdateCart } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    country: userProfile?.country || ''
  });
  const { toast } = useToast();

  // Update formData when userProfile changes
  React.useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        country: userProfile.country || ''
      });
    }
  }, [userProfile]);

  const filteredCountries = countries.filter(countryName =>
    countryName.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleOrderSuccess = () => {
    console.log('Order successful');
  };

  const handleLogout = () => {
    handleAuthAction('logout');
  };

  const handleSaveProfile = async () => {
    if (!userProfile?.id) return;

    try {
      console.log('Updating profile with:', formData);
      
      const { data, error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          country: formData.country
        })
        .eq('id', userProfile.id)
        .select();

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error",
          description: `Failed to update profile: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      console.log('Profile update successful:', data);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      setEditMode(false);
      // Refresh the profile to get updated data and force re-render
      await refreshProfile();
      
    } catch (error) {
      console.error('Exception updating profile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (!authState || !userProfile) {
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
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="profile-name">Name</Label>
                        <Input
                          id="profile-name"
                          name="profileName"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="profile-country">Country</Label>
                        <Select 
                          value={formData.country} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                        >
                          <SelectTrigger id="profile-country">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <div className="p-2">
                              <Input
                                id="profile-country-search"
                                name="profileCountrySearch"
                                placeholder="Search countries..."
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                className="mb-2"
                              />
                            </div>
                            <SelectItem value="USA">United States</SelectItem>
                            {filteredCountries.filter(c => c !== 'United States').map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Name</label>
                          <p className="text-gray-900">{userProfile.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email</label>
                          <p className="text-gray-900">{userProfile.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Country</label>
                          <p className="text-gray-900">{userProfile.country || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Member Since</label>
                          <p className="text-gray-900">
                            {new Date(userProfile.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => {
                        setFormData({
                          name: userProfile.name || '',
                          country: userProfile.country || ''
                        });
                        setEditMode(true);
                      }}>
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <OrderHistory language={language} />
            </TabsContent>

            <TabsContent value="referrals">
              <ReferralSection 
                userProfile={userProfile}
                language={language}
                referralCount={0}
              />
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <TwoFactorSettings 
                  language={language}
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
