
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
}

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <Button
        variant={currentLanguage === 'en' ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-1 text-sm font-medium transition-all ${
          currentLanguage === 'en' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={currentLanguage === 'es' ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange('es')}
        className={`px-2 py-1 text-sm font-medium transition-all ${
          currentLanguage === 'es' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`}
      >
        🇪🇸 ES
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
