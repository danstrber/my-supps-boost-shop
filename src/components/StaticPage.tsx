
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/hooks/useAuth';
import AboutPage from './static/AboutPage';
import ContactPage from './static/ContactPage';
import DeliveryPage from './static/DeliveryPage';
import PaymentPage from './static/PaymentPage';
import LabTestingPage from './static/LabTestingPage';

interface StaticPageProps {
  language: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  cartItemCount: number;
  isAuthenticated: boolean;
  onAuthAction: (action: 'login' | 'signup' | 'logout') => void;
  onCartOpen: () => void;
  
  currentPage: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account';
  onPageChange: (page: 'home' | 'about' | 'contact' | 'delivery' | 'payment' | 'labtesting' | 'account') => void;
  
  
}

const StaticPage = ({
  language,
  onLanguageChange,
  cartItemCount,
  isAuthenticated,
  onAuthAction,
  onCartOpen,
  
  currentPage,
  onPageChange,
  
  
}: StaticPageProps) => {
  const { userProfile } = useAuth();

  const getPageContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage language={language} />;
      case 'contact':
        return <ContactPage language={language} />;
      case 'delivery':
        return <DeliveryPage language={language} />;
      case 'payment':
        return <PaymentPage language={language} />;
      case 'labtesting':
        return <LabTestingPage language={language} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={onLanguageChange}
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
        onCartOpen={onCartOpen}
        
        currentPage={currentPage}
        onPageChange={onPageChange}
        
      />


      <main className="pt-32 px-4">
        <div className="container mx-auto py-8">
          {getPageContent()}
        </div>
      </main>
    </div>
  );
};

export default StaticPage;
