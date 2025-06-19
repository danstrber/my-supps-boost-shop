
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
}

const LanguageSwitcher = ({ language, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className="flex items-center gap-2 px-3 py-2"
      >
        <span className="text-lg">🇺🇸</span>
        <span className="text-sm font-medium">EN</span>
      </Button>
      <Button
        variant={language === 'es' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('es')}
        className="flex items-center gap-2 px-3 py-2"
      >
        <span className="text-lg">🇪🇸</span>
        <span className="text-sm font-medium">ES</span>
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
