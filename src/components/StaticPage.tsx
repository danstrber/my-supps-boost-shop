
import React from 'react';
import Header from '@/components/Header';
import { UserProfile } from '@/lib/auth';

interface StaticPageProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  onMenuToggle: () => void;
  currentPage: 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting') => void;
  sidebarOpen: boolean;
}

const StaticPage = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  onMenuToggle,
  currentPage,
  onPageChange,
  sidebarOpen
}: StaticPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={onLanguageChange}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
        onCartOpen={onCartOpen}
        onMenuToggle={onMenuToggle}
        currentPage={currentPage}
        onPageChange={onPageChange}
        sidebarOpen={sidebarOpen}
      />
      <div className="pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {currentPage === 'about' && (language === 'en' ? 'About Us' : 'Acerca de Nosotros')}
            {currentPage === 'contact' && (language === 'en' ? 'Contact Us' : 'Contáctanos')}
            {currentPage === 'delivery' && (language === 'en' ? 'Delivery Information' : 'Información de Entrega')}
            {currentPage === 'payment' && (language === 'en' ? 'Payment Methods' : 'Métodos de Pago')}
            {currentPage === 'labtesting' && (language === 'en' ? 'Lab Testing' : 'Pruebas de Laboratorio')}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'This page is under construction.' : 'Esta página está en construcción.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
