
import React from 'react';

interface LanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onLanguageChange('en')}
        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <span className="text-lg">🇺🇸</span>
        <span className="text-sm font-medium">EN</span>
      </button>
      <button
        onClick={() => onLanguageChange('es')}
        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
          currentLanguage === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <span className="text-lg">🇪🇸</span>
        <span className="text-sm font-medium">ES</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
