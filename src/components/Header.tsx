
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { translations } from '@/lib/translations';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage?: string;
  onPageChange?: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment') => void;
}

const Header = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  onMenuToggle,
  currentPage = 'home',
  onPageChange
}: HeaderProps) => {
  const t = translations[language];

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b-4 border-gray-300 px-6 py-4 fixed top-0 w-full z-50 shadow-xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png" 
              alt="MySupps Logo" 
              className="h-12 w-auto cursor-pointer"
              onClick={() => onPageChange?.('home')}
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => onPageChange?.('home')}
            className={`font-semibold transition-colors hover:text-gray-900 ${
              currentPage === 'home' ? 'text-gray-900 border-b-2 border-gray-700 pb-1' : 'text-gray-700'
            }`}
          >
            {t.home}
          </button>
          <button 
            onClick={() => onPageChange?.('payment')}
            className={`font-semibold transition-colors hover:text-gray-900 ${
              currentPage === 'payment' ? 'text-gray-900 border-b-2 border-gray-700 pb-1' : 'text-gray-700'
            }`}
          >
            {t.payment}
          </button>
          <button 
            onClick={() => onPageChange?.('delivery')}
            className={`font-semibold transition-colors hover:text-gray-900 ${
              currentPage === 'delivery' ? 'text-gray-900 border-b-2 border-gray-700 pb-1' : 'text-gray-700'
            }`}
          >
            {t.delivery}
          </button>
          <button 
            onClick={() => onPageChange?.('about')}
            className={`font-semibold transition-colors hover:text-gray-900 ${
              currentPage === 'about' ? 'text-gray-900 border-b-2 border-gray-700 pb-1' : 'text-gray-700'
            }`}
          >
            {t.about}
          </button>
          <button 
            onClick={() => onPageChange?.('contact')}
            className={`font-semibold transition-colors hover:text-gray-900 ${
              currentPage === 'contact' ? 'text-gray-900 border-b-2 border-gray-700 pb-1' : 'text-gray-700'
            }`}
          >
            {t.contact}
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-24 border-2 border-gray-300 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="es">ES</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={onCartOpen}
            className="relative border-2 border-gray-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
          >
            <ShoppingCart className="h-5 w-5 mr-1" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Button>

          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAuthAction('logout')}
              className="text-red-600 border-2 border-red-500 hover:bg-red-50 hover:text-red-700 font-semibold"
            >
              <LogOut className="h-4 w-4 mr-1" />
              {t.signOut}
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAuthAction('login')}
                className="border-2 border-gray-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold"
              >
                <User className="h-4 w-4 mr-1" />
                {t.signIn}
              </Button>
              <Button
                size="sm"
                onClick={() => onAuthAction('signup')}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold"
              >
                {t.signUp}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
