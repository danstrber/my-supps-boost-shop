
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Menu, User, LogOut, MessageCircle } from 'lucide-react';
import CoachingModal from './CoachingModal';

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
  const [coachingModalOpen, setCoachingModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Mobile menu button (hamburger) */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
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
                className="h-10 md:h-14 w-auto"
              />
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex space-x-1">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => onPageChange('home')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'Home' : 'Inicio'}
              </Button>
              <Button
                variant={currentPage === 'about' ? 'default' : 'ghost'}
                onClick={() => onPageChange('about')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'About' : 'Acerca de'}
              </Button>
              <Button
                variant={currentPage === 'contact' ? 'default' : 'ghost'}
                onClick={() => onPageChange('contact')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'Contact' : 'Contacto'}
              </Button>
              <Button
                variant={currentPage === 'delivery' ? 'default' : 'ghost'}
                onClick={() => onPageChange('delivery')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'Delivery' : 'Entrega'}
              </Button>
              <Button
                variant={currentPage === 'payment' ? 'default' : 'ghost'}
                onClick={() => onPageChange('payment')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'Lab Testing' : 'Pruebas de Laboratorio'}
              </Button>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Premium Coaching Button - MUCH MORE OBVIOUS */}
              <Button
                onClick={() => setCoachingModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg border-2 border-blue-400 transform hover:scale-105 transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline text-sm md:text-base">🏆 PREMIUM COACHING</span>
                <span className="sm:hidden">🏆 COACH</span>
              </Button>

              {/* Language Selector */}
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-16 md:w-20 border border-gray-300 rounded-lg">
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
                  className="hidden sm:flex items-center border border-gray-300 hover:border-red-500 hover:text-red-600 rounded-lg px-3 py-2"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">{language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}</span>
                </Button>
              ) : (
                <div className="flex space-x-1 md:space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => onAuthAction('login')}
                    className="border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg px-3 py-2"
                  >
                    <User className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">{language === 'en' ? 'Sign In' : 'Iniciar Sesión'}</span>
                  </Button>
                  <Button
                    onClick={() => onAuthAction('signup')}
                    className="bg-green-600 hover:bg-green-700 text-white border border-green-600 rounded-lg px-3 py-2 font-medium"
                  >
                    <span className="hidden sm:inline">{language === 'en' ? 'Sign Up' : 'Registrarse'}</span>
                    <span className="sm:hidden">{language === 'en' ? 'Join' : 'Unirse'}</span>
                  </Button>
                </div>
              )}

              {/* Cart Button */}
              <Button
                variant="outline"
                onClick={onCartOpen}
                className="relative border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg p-2 md:px-3 md:py-2"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CoachingModal 
        isOpen={coachingModalOpen} 
        onClose={() => setCoachingModalOpen(false)} 
      />
    </>
  );
};

export default Header;
