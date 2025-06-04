
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
    <header className="bg-white border-b-2 border-[#4CAF50] px-4 py-3 fixed top-0 w-full z-50 shadow-sm">
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
              src="photos/logo.png" 
              alt="MySupps Logo" 
              className="h-10 w-10"
            />
            <h1 className="text-2xl font-bold text-[#4CAF50]">MySupps</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-[#333] hover:text-[#4CAF50] transition-colors font-medium">
            {t.home}
          </a>
          <a href="#" className="text-[#333] hover:text-[#4CAF50] transition-colors font-medium">
            {t.payment}
          </a>
          <a href="#" className="text-[#333] hover:text-[#4CAF50] transition-colors font-medium">
            {t.delivery}
          </a>
          <a href="#" className="text-[#333] hover:text-[#4CAF50] transition-colors font-medium">
            {t.about}
          </a>
          <a href="#" className="text-[#333] hover:text-[#4CAF50] transition-colors font-medium">
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
            className="relative border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF5722] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAuthAction('logout')}
              className="text-[#FF5722] border-[#FF5722] hover:bg-[#FF5722] hover:text-white"
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
                className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
              >
                <User className="h-4 w-4 mr-1" />
                {t.signIn}
              </Button>
              <Button
                size="sm"
                onClick={() => onAuthAction('signup')}
                className="bg-[#4CAF50] hover:bg-[#388E3C] text-white"
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
