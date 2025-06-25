
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
}

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <div className="flex items-center space-x-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-1 shadow-sm border border-gray-200">
      <Button
        variant={currentLanguage === 'en' ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
          currentLanguage === 'en' 
            ? 'bg-white text-gray-900 shadow-md border border-gray-200' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/70'
        }`}
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={currentLanguage === 'es' ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange('es')}
        className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
          currentLanguage === 'es' 
            ? 'bg-white text-gray-900 shadow-md border border-gray-200' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/70'
        }`}
      >
        🇪🇸 ES
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
