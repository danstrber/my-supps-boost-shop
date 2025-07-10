
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { translations } from '@/lib/translations';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  currentPage,
  onPageChange,
}: HeaderProps) => {
  const t = translations[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHomeClick = () => {
    onPageChange('home');
    window.dispatchEvent(new CustomEvent('resetCategory'));
    setIsMobileMenuOpen(false);
  };

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = (action: 'login' | 'signup' | 'logout') => {
    onAuthAction(action);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={handleHomeClick}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src="/lovable-uploads/4daaab9b-96d4-48f2-a2ee-59559ff09365.png"
                alt="MySupps"
                className="h-8 md:h-12 w-auto"
              />
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-4 lg:space-x-8">
            <button
              onClick={handleHomeClick}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'home' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => handlePageChange('about')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'about' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.about}
            </button>
            <button
              onClick={() => handlePageChange('contact')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'contact' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.contact}
            </button>
            <button
              onClick={() => handlePageChange('delivery')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'delivery' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.delivery}
            </button>
            <button
              onClick={() => handlePageChange('payment')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'payment' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.payment}
            </button>
            <button
              onClick={() => handlePageChange('labtesting')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'labtesting' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.labTesting}
            </button>
          </nav>

          {/* Right section - Desktop */}
          <div className="hidden lg:flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={onLanguageChange} 
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={onCartOpen}
              className="relative p-2 hover:bg-gray-100"
            >
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange('account')}
                  className="flex items-center space-x-2 p-2 px-3 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  <span>{t.account}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAuthAction('logout')}
                  className="p-2 hover:bg-gray-100 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAuthAction('login')}
                  className="text-sm"
                >
                  {t.login}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAuthAction('signup')}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4"
                >
                  {t.signup}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button and cart */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCartOpen}
              className="relative p-2 hover:bg-gray-100"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {/* Navigation Links */}
            <nav className="space-y-4">
              <button
                onClick={handleHomeClick}
                className={`block w-full text-left font-medium text-lg py-2 ${
                  currentPage === 'home' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                {t.home}
              </button>
              <button
                onClick={() => handlePageChange('about')}
                className={`block w-full text-left font-medium text-lg py-2 ${
                  currentPage === 'about' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                {t.about}
              </button>
              <button
                onClick={() => handlePageChange('contact')}
                className={`block w-full text-left font-medium text-lg py-2 ${
                  currentPage === 'contact' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                {t.contact}
              </button>
              <button
                onClick={() => handlePageChange('delivery')}
                className={`block w-full text-left font-medium text-lg py-2 ${
                  currentPage === 'delivery' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                {t.delivery}
              </button>
              <button
                onClick={() => handlePageChange('payment')}
                className={`block w-full text-left font-medium text-lg py-2 ${
                  currentPage === 'payment' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                {t.payment}
              </button>
              <button
                onClick={() => handlePageChange('labtesting')}
                className={`block w-full text-left font-medium text-lg py-2 ${
                  currentPage === 'labtesting' 
                    ? 'text-green-600' 
                    : 'text-gray-700'
                }`}
              >
                {t.labTesting}
              </button>
            </nav>

            {/* Language Switcher */}
            <div className="border-t pt-6">
              <LanguageSwitcher 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
            </div>

            {/* Auth Section */}
            <div className="border-t pt-6 space-y-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange('account')}
                    className="w-full flex items-center justify-center space-x-2 py-3"
                  >
                    <User className="h-4 w-4" />
                    <span>{t.account}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthAction('logout')}
                    className="w-full py-3 text-red-600 hover:text-red-700"
                  >
                    {t.logout || 'Logout'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => handleAuthAction('login')}
                    className="w-full py-3"
                  >
                    {t.login}
                  </Button>
                  <Button
                    onClick={() => handleAuthAction('signup')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  >
                    {t.signup}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
