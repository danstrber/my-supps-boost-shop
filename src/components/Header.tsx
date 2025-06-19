
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onAuthAction: (action: 'login' | 'signup') => void;
  onCartClick: () => void;
  onMenuClick: () => void;
  cartItemCount: number;
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
}

const Header = ({ 
  onAuthAction, 
  onCartClick, 
  onMenuClick, 
  cartItemCount, 
  language, 
  onLanguageChange 
}: HeaderProps) => {
  const { userProfile, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 md:ml-0">
              <h1 className="text-2xl font-bold text-gray-900">SARMs Store</h1>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xl">
                {language === 'en' ? '🇺🇸' : '🇪🇸'}
              </span>
              <span className="hidden sm:inline">
                {language === 'en' ? 'English' : 'Español'}
              </span>
            </Button>

            {/* Cart */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Auth */}
            {userProfile ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 hidden sm:inline">
                  {userProfile.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAuthAction('login')}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
