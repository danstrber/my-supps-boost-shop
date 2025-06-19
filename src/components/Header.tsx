
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CoachingModal from './CoachingModal';

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
  const [isCoachingModalOpen, setIsCoachingModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    onAuthAction('logout');
  };

  return (
    <>
      {/* Expert Guidance Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold">
                {language === 'en' ? 'Need Expert Guidance?' : '¿Necesitas Orientación Experta?'}
              </span>
              <span className="text-sm opacity-90">
                {language === 'en' 
                  ? 'Get personalized coaching, custom cycles, and 24/7 support from our experts!'
                  : '¡Obtén coaching personalizado, ciclos a medida y soporte 24/7 de nuestros expertos!'}
              </span>
            </div>
            <Button
              onClick={() => setIsCoachingModalOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-2"
            >
              {language === 'en' ? 'Get Coaching' : 'Obtener Coaching'}
            </Button>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/9db98b42-91b1-4223-8f41-e3180fda882b.png" 
                alt="MySupps Logo" 
                className="h-10 w-auto"
              />
            </div>

            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => onPageChange('home')}
                className={`${
                  currentPage === 'home'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                } pb-2 transition-colors font-medium text-sm`}
              >
                Products
              </button>
              <button
                onClick={() => onPageChange('about')}
                className={`${
                  currentPage === 'about'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                } pb-2 transition-colors font-medium text-sm`}
              >
                About
              </button>
              <button
                onClick={() => onPageChange('contact')}
                className={`${
                  currentPage === 'contact'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                } pb-2 transition-colors font-medium text-sm`}
              >
                Contact
              </button>
              <button
                onClick={() => onPageChange('delivery')}
                className={`${
                  currentPage === 'delivery'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                } pb-2 transition-colors font-medium text-sm`}
              >
                Delivery
              </button>
              <button
                onClick={() => onPageChange('payment')}
                className={`${
                  currentPage === 'payment'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                } pb-2 transition-colors font-medium text-sm`}
              >
                Payment
              </button>
              <button
                onClick={() => onPageChange('lab-testing')}
                className={`${
                  currentPage === 'lab-testing'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                } pb-2 transition-colors font-medium text-sm`}
              >
                Lab Testing
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Language Button with Real Flag Emojis */}
              <button
                onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-lg">
                  {language === 'en' ? '🇺🇸' : '🇪🇸'}
                </span>
                <span className="text-sm font-semibold text-blue-700">
                  {language === 'en' ? 'EN' : 'ES'}
                </span>
              </button>

              <button
                onClick={onCartOpen}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onPageChange('account')}
                    className={`${
                      currentPage === 'account'
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    } transition-colors font-medium px-3 py-2 text-sm`}
                  >
                    Account
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-gray-700 hover:text-red-600 transition-colors font-medium px-3 py-2 text-sm">
                        Logout
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {language === 'en' ? 'Are you sure you want to logout?' : '¿Estás seguro de que quieres cerrar sesión?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {language === 'en' 
                            ? 'You will be signed out of your account and will need to login again to access your information.'
                            : 'Se cerrará tu sesión y necesitarás iniciar sesión nuevamente para acceder a tu información.'}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          {language === 'en' ? 'Cancel' : 'Cancelar'}
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                          {language === 'en' ? 'Logout' : 'Cerrar Sesión'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onAuthAction('signup')}
                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium px-3 py-2 text-sm"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => onAuthAction('login')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <CoachingModal
        isOpen={isCoachingModalOpen}
        onClose={() => setIsCoachingModalOpen(false)}
      />
    </>
  );
};

export default Header;
