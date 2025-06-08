
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, User, LogOut, MessageCircle } from 'lucide-react';
import CoachingModal from './CoachingModal';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting') => void;
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
            {/* Hamburger Menu - More prominent */}
            <div 
              className="flex items-center justify-center w-10 h-10 cursor-pointer z-[1001] rounded-lg hover:bg-gray-100 transition-colors"
              onClick={onMenuToggle}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <div className={`w-full h-0.5 bg-gray-800 rounded transition-all duration-300 ${sidebarOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-full h-0.5 bg-gray-800 rounded transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-full h-0.5 bg-gray-800 rounded transition-all duration-300 ${sidebarOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </div>

            {/* Logo - centered on mobile */}
            <div 
              className="flex items-center cursor-pointer flex-1 justify-center md:justify-start md:ml-4" 
              onClick={() => onPageChange('home')}
            >
              <img 
                src="/lovable-uploads/0310946f-b30b-43c8-bd2a-cd7e11e4aa7e.png" 
                alt="MySupps Logo" 
                className="h-8 md:h-12 w-auto"
              />
            </div>

            {/* Navigation - Desktop only */}
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
                variant={currentPage === 'labtesting' ? 'default' : 'ghost'}
                onClick={() => onPageChange('labtesting')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'Lab Testing' : 'Pruebas de Laboratorio'}
              </Button>
              <Button
                variant={currentPage === 'payment' ? 'default' : 'ghost'}
                onClick={() => onPageChange('payment')}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium"
              >
                {language === 'en' ? 'Payment' : 'Pago'}
              </Button>
            </nav>

            {/* Right side - Compact on mobile */}
            <div className="flex items-center space-x-1 md:space-x-3">
              {/* Premium Coaching Button - Smaller on mobile */}
              <Button
                onClick={() => setCoachingModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-2 md:px-4 py-1 md:py-2 rounded-lg shadow-lg border-2 border-orange-400 transform hover:scale-105 transition-all duration-200 text-xs md:text-sm"
              >
                <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="hidden sm:inline">🏆 COACH</span>
                <span className="sm:hidden">🏆</span>
              </Button>

              {/* Language Selector - Smaller */}
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-12 md:w-16 h-8 md:h-10 border border-gray-300 rounded-lg text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="es">ES</SelectItem>
                </SelectContent>
              </Select>

              {/* Auth Buttons - Compact */}
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={() => onAuthAction('logout')}
                  className="hidden sm:flex items-center border border-gray-300 hover:border-red-500 hover:text-red-600 rounded-lg px-2 py-1 text-xs"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  <span className="hidden md:inline">{language === 'en' ? 'Out' : 'Salir'}</span>
                </Button>
              ) : (
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    onClick={() => onAuthAction('login')}
                    className="border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg px-2 py-1 text-xs"
                  >
                    <User className="h-3 w-3 md:mr-1" />
                    <span className="hidden md:inline">{language === 'en' ? 'In' : 'Entrar'}</span>
                  </Button>
                  <Button
                    onClick={() => onAuthAction('signup')}
                    className="bg-green-600 hover:bg-green-700 text-white border border-green-600 rounded-lg px-2 py-1 font-medium text-xs"
                  >
                    <span>{language === 'en' ? 'Join' : 'Unirse'}</span>
                  </Button>
                </div>
              )}

              {/* Cart Button */}
              <Button
                variant="outline"
                onClick={onCartOpen}
                className="relative border border-gray-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg p-2"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* GREEN SECTION - More compact on mobile */}
        <div className="bg-green-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center space-x-4 md:space-x-8 text-xs md:text-sm font-medium">
              <button 
                onClick={() => onPageChange('labtesting')}
                className="flex items-center space-x-1 hover:bg-green-700 px-2 py-1 rounded transition-colors"
              >
                <span>🔬</span>
                <span className="hidden sm:inline">{language === 'en' ? 'LAB TESTING' : 'PRUEBAS DE LAB'}</span>
                <span className="sm:hidden">{language === 'en' ? 'LAB' : 'LAB'}</span>
              </button>
              <button 
                onClick={() => onPageChange('delivery')}
                className="flex items-center space-x-1 hover:bg-green-700 px-2 py-1 rounded transition-colors"
              >
                <span>🚚</span>
                <span className="hidden sm:inline">{language === 'en' ? 'DELIVERY' : 'ENTREGA'}</span>
                <span className="sm:hidden">{language === 'en' ? 'SHIP' : 'ENVÍO'}</span>
              </button>
              <button 
                onClick={() => onPageChange('payment')}
                className="flex items-center space-x-1 hover:bg-green-700 px-2 py-1 rounded transition-colors"
              >
                <span>💳</span>
                <span className="hidden sm:inline">{language === 'en' ? 'PAYMENT' : 'PAGO'}</span>
                <span className="sm:hidden">{language === 'en' ? 'PAY' : 'PAGO'}</span>
              </button>
              <button 
                onClick={() => onPageChange('contact')}
                className="flex items-center space-x-1 hover:bg-green-700 px-2 py-1 rounded transition-colors"
              >
                <span>📞</span>
                <span className="hidden sm:inline">{language === 'en' ? 'CONTACT' : 'CONTACTO'}</span>
                <span className="sm:hidden">{language === 'en' ? 'HELP' : 'AYUDA'}</span>
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
