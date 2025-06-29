
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
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
  onPageChange: (page: string) => void;
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

  const handleHomeClick = () => {
    onPageChange('home');
    window.dispatchEvent(new CustomEvent('resetCategory'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
              data-hamburger
            >
              <Menu className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            
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
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <div className="hidden sm:block">
              <LanguageSwitcher 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
            </div>
            
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
                  onClick={() => onPageChange('account')}
                  className="hidden sm:flex items-center space-x-2 p-2 px-3 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">{t.account}</span>
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
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAuthAction('login')}
                  className="hidden md:block text-sm"
                >
                  {t.login}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAuthAction('signup')}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-2 md:px-4"
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
