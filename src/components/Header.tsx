
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

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left section - Logo */}
          <div className="flex items-center">
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

          {/* Center navigation - hidden on mobile */}
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
              onClick={() => onPageChange('about')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'about' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.about}
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'contact' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.contact}
            </button>
            <button
              onClick={() => onPageChange('delivery')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'delivery' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.delivery}
            </button>
            <button
              onClick={() => onPageChange('payment')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'payment' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.payment}
            </button>
            <button
              onClick={() => onPageChange('labtesting')}
              className={`font-medium transition-colors text-sm lg:text-base ${
                currentPage === 'labtesting' 
                  ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {t.labTesting}
            </button>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Language switcher - hidden on mobile */}
            <div className="hidden lg:block">
              <LanguageSwitcher 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
            </div>
            
            {/* Cart button */}
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

            {/* Auth buttons - hidden on mobile */}
            {isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange('account')}
                  className="flex items-center space-x-2 p-2 px-3 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  <span>{t.account}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAuthAction('logout')}
                  className="p-2 hover:bg-gray-100 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAuthAction('login')}
                  className="text-sm"
                >
                  {t.login}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAuthAction('signup')}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4"
                >
                  {t.signup}
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 ml-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Full screen overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile menu content */}
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Navigation links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Navigation
                </h3>
                <button
                  onClick={handleHomeClick}
                  className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                    currentPage === 'home' 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {t.home}
                </button>
                <button
                  onClick={() => handlePageChange('about')}
                  className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                    currentPage === 'about' 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {t.about}
                </button>
                <button
                  onClick={() => handlePageChange('contact')}
                  className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                    currentPage === 'contact' 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {t.contact}
                </button>
                <button
                  onClick={() => handlePageChange('delivery')}
                  className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                    currentPage === 'delivery' 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {t.delivery}
                </button>
                <button
                  onClick={() => handlePageChange('payment')}
                  className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                    currentPage === 'payment' 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {t.payment}
                </button>
                <button
                  onClick={() => handlePageChange('labtesting')}
                  className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-colors text-lg ${
                    currentPage === 'labtesting' 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  {t.labTesting}
                </button>
              </div>

              {/* Language switcher */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Language
                </h3>
                <div className="flex justify-center">
                  <LanguageSwitcher 
                    currentLanguage={language} 
                    onLanguageChange={onLanguageChange} 
                  />
                </div>
              </div>

              {/* Account/Auth section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Account
                </h3>
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handlePageChange('account')}
                      className="w-full flex items-center justify-center space-x-2 py-4 text-lg"
                    >
                      <User className="h-5 w-5" />
                      <span>{t.account}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        onAuthAction('logout');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 py-4 text-lg"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      {t.logout || 'Logout'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        onAuthAction('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-4 text-lg"
                    >
                      {t.login}
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => {
                        onAuthAction('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
                    >
                      {t.signup}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
