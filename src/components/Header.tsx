
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
}

const Header = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  onMenuToggle
}: HeaderProps) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b-2 border-gray-300 px-4 py-3 fixed top-0 w-full z-50 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/e0ca2430-18d6-4293-903c-843dd951ee96.png" 
              alt="MySupps Logo" 
              className="h-10 w-auto"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            {t.home}
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            {t.payment}
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            {t.delivery}
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            {t.about}
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            {t.contact}
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-20">
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
            className="relative border-gray-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAuthAction('logout')}
              className="text-red-600 border-red-500 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4 mr-1" />
              {t.signOut}
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAuthAction('login')}
                className="border-gray-600 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <User className="h-4 w-4 mr-1" />
                {t.signIn}
              </Button>
              <Button
                size="sm"
                onClick={() => onAuthAction('signup')}
                className="bg-gray-700 hover:bg-gray-800 text-white"
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
