
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
}

const LanguageSwitcher = ({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-2xl p-1.5 shadow-lg border-2 border-blue-200/50">
      <div className="flex items-center mr-2 text-blue-600">
        <Globe className="w-4 h-4" />
      </div>
      <Button
        variant={currentLanguage === 'en' ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className={`px-4 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl transform hover:scale-105 ${
          currentLanguage === 'en' 
            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg border-2 border-blue-300' 
            : 'text-blue-700 hover:text-blue-900 hover:bg-gradient-to-r hover:from-blue-100 hover:to-green-100'
        }`}
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={currentLanguage === 'es' ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange('es')}
        className={`px-4 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl transform hover:scale-105 ${
          currentLanguage === 'es' 
            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg border-2 border-blue-300' 
            : 'text-blue-700 hover:text-blue-900 hover:bg-gradient-to-r hover:from-blue-100 hover:to-green-100'
        }`}
      >
        🇪🇸 ES
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
