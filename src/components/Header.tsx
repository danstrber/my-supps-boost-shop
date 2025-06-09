
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, User, LogOut, MessageCircle, Home, UserCircle } from 'lucide-react';
import CoachingModal from './CoachingModal';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account') => void;
  sidebarOpen?: boolean;
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
  sidebarOpen = false
}: HeaderProps) => {
  const [coachingModalOpen, setCoachingModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Hamburger Menu */}
            <div 
              className="fixed top-4 left-4 w-8 h-6 cursor-pointer z-[1001] flex flex-col justify-between"
              onClick={onMenuToggle}
            >
              <div className="w-full h-1 bg-gray-800 rounded transition-all duration-300"></div>
              <div className="w-full h-1 bg-gray-800 rounded transition-all duration-300"></div>
              <div className="w-full h-1 bg-gray-800 rounded transition-all duration-300"></div>
            </div>

            {/* Logo - moved right to avoid hamburger */}
            <div 
              className="flex items-center cursor-pointer ml-16" 
              onClick={() => onPageChange('home')}
            >
              <img 
                src="/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png" 
                alt="MySupps Logo" 
                className="h-10 md:h-14 w-auto"
              />
            </div>

            {/* Navigation - Desktop Only */}
            <nav className="hidden lg:flex space-x-1">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => onPageChange('home')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <Home className="h-4 w-4 mr-1" />
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
            </nav>

            {/* Right side - responsive layout */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Premium Coaching Button - hidden on mobile */}
              <Button
                onClick={() => setCoachingModalOpen(true)}
                className="hidden sm:flex bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-3 md:px-6 py-2 md:py-3 rounded-lg shadow-lg border-2 border-orange-400 transform hover:scale-105 transition-all duration-200 text-xs md:text-base"
              >
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                <span className="hidden md:inline">🏆 PREMIUM COACHING</span>
                <span className="md:hidden">🏆 COACH</span>
              </Button>

              {/* Language Selector */}
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-14 md:w-20 border border-gray-300 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="es">ES</SelectItem>
                </SelectContent>
              </Select>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    onClick={() => onPageChange('account')}
                    className="border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg px-2 md:px-3 py-2"
                  >
                    <UserCircle className="h-4 w-4 md:mr-1" />
                    <span className="hidden lg:inline">{language === 'en' ? 'Account' : 'Cuenta'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onAuthAction('logout')}
                    className="hidden md:flex items-center border border-gray-300 hover:border-red-500 hover:text-red-600 rounded-lg px-2 md:px-3 py-2"
                  >
                    <LogOut className="h-4 w-4 md:mr-1" />
                    <span className="hidden lg:inline">{language === 'en' ? 'Sign Out' : 'Cerrar Sesión'}</span>
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    onClick={() => onAuthAction('login')}
                    className="border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg px-2 md:px-3 py-2"
                  >
                    <User className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">{language === 'en' ? 'Sign In' : 'Iniciar'}</span>
                  </Button>
                  <Button
                    onClick={() => onAuthAction('signup')}
                    className="bg-green-600 hover:bg-green-700 text-white border border-green-600 rounded-lg px-2 md:px-3 py-2 font-medium"
                  >
                    <span className="hidden sm:inline">{language === 'en' ? 'Sign Up' : 'Registro'}</span>
                    <span className="sm:hidden">{language === 'en' ? 'Join' : 'Unirse'}</span>
                  </Button>
                </div>
              )}

              {/* Cart Button */}
              <Button
                variant="outline"
                onClick={onCartOpen}
                className="relative border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg p-2"
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

        {/* GREEN SECTION - More compact on mobile */}
        <div className="bg-green-600 text-white py-1 md:py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center space-x-3 md:space-x-12 text-xs md:text-base font-medium overflow-x-auto">
              <button 
                onClick={() => onPageChange('labtesting')}
                className="flex items-center space-x-1 md:space-x-2 hover:bg-green-700 px-2 md:px-3 py-1 rounded transition-colors whitespace-nowrap"
              >
                <span>🔬</span>
                <span>{language === 'en' ? 'VERIFICATION' : 'VERIFICACIÓN'}</span>
              </button>
              <button 
                onClick={() => onPageChange('delivery')}
                className="flex items-center space-x-1 md:space-x-2 hover:bg-green-700 px-2 md:px-3 py-1 rounded transition-colors whitespace-nowrap"
              >
                <span>🚚</span>
                <span>{language === 'en' ? 'SHIPPING' : 'ENVÍO'}</span>
              </button>
              <button 
                onClick={() => onPageChange('payment')}
                className="flex items-center space-x-1 md:space-x-2 hover:bg-green-700 px-2 md:px-3 py-1 rounded transition-colors whitespace-nowrap"
              >
                <span>💳</span>
                <span>{language === 'en' ? 'CRYPTO' : 'CRIPTO'}</span>
              </button>
              <button 
                onClick={() => onPageChange('contact')}
                className="flex items-center space-x-1 md:space-x-2 hover:bg-green-700 px-2 md:px-3 py-1 rounded transition-colors whitespace-nowrap"
              >
                <span>📞</span>
                <span>{language === 'en' ? 'TELEGRAM' : 'TELEGRAM'}</span>
              </button>
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
