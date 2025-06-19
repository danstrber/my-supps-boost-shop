
import React from 'react';
import { ShoppingCart, Flag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  onPageChange: (page: string) => void;
  currentPage: string;
  cartItemCount: number;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  sidebarOpen: boolean;
}

const Header = ({ 
  language,
  onLanguageChange,
  onPageChange, 
  currentPage, 
  cartItemCount, 
  onCartOpen,
  onMenuToggle,
  isAuthenticated,
  onAuthAction,
  sidebarOpen
}: HeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/9db98b42-91b1-4223-8f41-e3180fda882b.png" 
              alt="MySupps Logo" 
              className="h-12 w-auto"
            />
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`${
                currentPage === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-2 transition-colors font-medium`}
            >
              Products
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`${
                currentPage === 'about'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-2 transition-colors font-medium`}
            >
              About
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className={`${
                currentPage === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-2 transition-colors font-medium`}
            >
              Contact
            </button>
            <button
              onClick={() => onPageChange('delivery')}
              className={`${
                currentPage === 'delivery'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-2 transition-colors font-medium`}
            >
              Delivery
            </button>
            <button
              onClick={() => onPageChange('payment')}
              className={`${
                currentPage === 'payment'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-2 transition-colors font-medium`}
            >
              Payment
            </button>
            <button
              onClick={() => onPageChange('lab-testing')}
              className={`${
                currentPage === 'lab-testing'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-2 transition-colors font-medium`}
            >
              Lab Testing
            </button>
          </nav>

          <div className="flex items-center space-x-6">
            {/* Language Button with Real Flag Emojis */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl" role="img" aria-label={language === 'en' ? 'US flag' : 'Spanish flag'}>
                  {language === 'en' ? '🇺🇸' : '🇪🇸'}
                </span>
                <span className="text-sm font-semibold text-blue-700">
                  {language === 'en' ? 'EN' : 'ES'}
                </span>
              </div>
            </button>

            <button
              onClick={onCartOpen}
              className="relative p-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onPageChange('account')}
                  className={`${
                    currentPage === 'account'
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  } transition-colors font-medium px-3 py-2`}
                >
                  Account
                </button>
                <button
                  onClick={signOut}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium px-3 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onAuthAction('signup')}
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium px-4 py-2"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => onAuthAction('login')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
