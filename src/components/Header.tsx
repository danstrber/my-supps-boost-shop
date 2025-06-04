
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
    <header className="bg-white border-b border-[#2e7d32] px-4 py-3 fixed top-0 w-full z-50">
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
          
          <div className="flex items-center space-x-2">
            <img 
              src="/placeholder.svg" 
              alt="MySupps Logo" 
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold text-[#2e7d32]">MySupps</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-[#333] hover:text-[#2e7d32] transition-colors">
            {t.home}
          </a>
          <a href="#" className="text-[#333] hover:text-[#2e7d32] transition-colors">
            Payment & Lab Test
          </a>
          <a href="#" className="text-[#333] hover:text-[#2e7d32] transition-colors">
            Delivery
          </a>
          <a href="#" className="text-[#333] hover:text-[#2e7d32] transition-colors">
            About Us
          </a>
          <a href="#" className="text-[#333] hover:text-[#2e7d32] transition-colors">
            Contact Us
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
            className="relative"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d32f2f] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAuthAction('logout')}
              className="text-[#d32f2f] border-[#d32f2f] hover:bg-[#d32f2f] hover:text-white"
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
              >
                <User className="h-4 w-4 mr-1" />
                {t.signIn}
              </Button>
              <Button
                size="sm"
                onClick={() => onAuthAction('signup')}
                className="bg-[#2e7d32] hover:bg-[#1b5e20]"
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
