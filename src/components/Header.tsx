
import React from 'react';
import { ShoppingCart, Globe } from 'lucide-react';
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
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onPageChange('home')}
              className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              SteroidShop
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`${
                currentPage === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-1 transition-colors font-medium`}
            >
              Products
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`${
                currentPage === 'about'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-1 transition-colors font-medium`}
            >
              About
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className={`${
                currentPage === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-1 transition-colors font-medium`}
            >
              Contact
            </button>
            <button
              onClick={() => onPageChange('delivery')}
              className={`${
                currentPage === 'delivery'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-1 transition-colors font-medium`}
            >
              Delivery
            </button>
            <button
              onClick={() => onPageChange('payment')}
              className={`${
                currentPage === 'payment'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-1 transition-colors font-medium`}
            >
              Payment
            </button>
            <button
              onClick={() => onPageChange('lab-testing')}
              className={`${
                currentPage === 'lab-testing'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              } pb-1 transition-colors font-medium`}
            >
              Lab Testing
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Enhanced Language Button */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg" role="img" aria-label="US flag">🇺🇸</span>
                <Globe className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">EN</span>
            </div>

            <button
              onClick={onCartOpen}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
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
                  } transition-colors font-medium`}
                >
                  Account
                </button>
                <button
                  onClick={signOut}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAuthAction('login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
