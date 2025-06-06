
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: 'home' | 'about' | 'contact' | 'delivery' | 'payment';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment') => void;
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
  onPageChange
}: HeaderProps) => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-lg z-50 border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onPageChange('home')}
          >
            <img 
              src="/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png" 
              alt="MySupps Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onPageChange('home')}
              className="text-gray-700 hover:text-green-600"
            >
              Home
            </Button>
            <Button
              variant={currentPage === 'about' ? 'default' : 'ghost'}
              onClick={() => onPageChange('about')}
              className="text-gray-700 hover:text-green-600"
            >
              About
            </Button>
            <Button
              variant={currentPage === 'contact' ? 'default' : 'ghost'}
              onClick={() => onPageChange('contact')}
              className="text-gray-700 hover:text-green-600"
            >
              Contact
            </Button>
            <Button
              variant={currentPage === 'delivery' ? 'default' : 'ghost'}
              onClick={() => onPageChange('delivery')}
              className="text-gray-700 hover:text-green-600"
            >
              Delivery
            </Button>
            <Button
              variant={currentPage === 'payment' ? 'default' : 'ghost'}
              onClick={() => onPageChange('payment')}
              className="text-gray-700 hover:text-green-600"
            >
              Payment & Lab Testing
            </Button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-20 border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
              </SelectContent>
            </Select>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => onAuthAction('logout')}
                className="flex items-center border-2 border-gray-300 hover:border-red-500 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onAuthAction('login')}
                  className="border-2 border-gray-300 hover:border-green-500 hover:text-green-600"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  onClick={() => onAuthAction('signup')}
                  className="bg-green-600 hover:bg-green-700 text-white border-2 border-green-600"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={onCartOpen}
              className="relative border-2 border-gray-300 hover:border-green-500 hover:text-green-600"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
