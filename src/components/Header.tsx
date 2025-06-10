
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { translations } from '@/lib/translations';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: string;
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account') => void;
  sidebarOpen: boolean;
}

const Header = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  onMenuToggle,
  currentPage,
  onPageChange,
  sidebarOpen
}: HeaderProps) => {
  const t = translations[language];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <button
              onClick={() => onPageChange('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png" 
                alt="SARMs Store" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl text-gray-900 hidden sm:block">
                SARMs Store
              </span>
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'about' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t.about}
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'contact' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t.contact}
            </button>
            <button
              onClick={() => onPageChange('delivery')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'delivery' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t.delivery}
            </button>
            <button
              onClick={() => onPageChange('payment')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'payment' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t.payment}
            </button>
            <button
              onClick={() => onPageChange('labtesting')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'labtesting' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t.labTesting}
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  language === 'en' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  language === 'es' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                ES
              </button>
            </div>

            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartOpen}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange('account')}
                  className="flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.account}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAuthAction('logout')}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.logout}</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAuthAction('login')}
                >
                  {t.login}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAuthAction('signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t.signup}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
