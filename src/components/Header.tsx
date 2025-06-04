
import React, { useState } from 'react';
import { Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  onMenuToggle
}) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b-2 border-[#2e7d32] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#2e7d32]">MySupps</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-[#333] hover:text-[#2e7d32] transition-colors">
              {t.home}
            </a>
            <a href="#payment" className="text-[#333] hover:text-[#2e7d32] transition-colors">
              {t.payment}
            </a>
            <a href="#delivery" className="text-[#333] hover:text-[#2e7d32] transition-colors">
              {t.delivery}
            </a>
            <a href="#about" className="text-[#333] hover:text-[#2e7d32] transition-colors">
              {t.about}
            </a>
            <a href="#contact" className="text-[#333] hover:text-[#2e7d32] transition-colors">
              {t.contact}
            </a>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as 'en' | 'es')}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            {/* Cart button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartOpen}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d32f2f] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5 mr-1" />
                  {t.account}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAuthAction('logout')}
                  className="text-[#d32f2f] hover:text-[#b71c1c]"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  {t.signout}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAuthAction('login')}
                >
                  {t.login}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onAuthAction('signup')}
                  className="bg-[#2e7d32] hover:bg-[#1b5e20]"
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
