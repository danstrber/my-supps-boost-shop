
import React from 'react';
import { translations } from '@/lib/translations';
import { UserProfile } from '@/lib/auth';
import ReferralSection from './ReferralSection';

interface SidebarProps {
  language: 'en' | 'es';
  isOpen: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  userProfile: UserProfile | null;
  referralCount: number;
}

const Sidebar = ({ language, isOpen, selectedCategory, onCategoryChange, userProfile, referralCount }: SidebarProps) => {
  const t = translations[language];
  
  const categories = [
    { id: 'all', label: t.allProducts, emoji: '🏠' },
    { id: 'sarms', label: t.sarms, emoji: '💊' },
    { id: 'muscleGrowth', label: t.muscleGrowth, emoji: '💪' },
    { id: 'fatLoss', label: t.fatLoss, emoji: '🔥' },
    { id: 'recovery', label: t.recovery, emoji: '⚡' },
    { id: 'testosteroneSupport', label: t.testosteroneSupport, emoji: '🚀' },
    { id: 'pctAi', label: t.pctAi, emoji: '🛡️' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white pt-16 px-4 pb-5 box-border transition-transform duration-300 ease-in-out overflow-y-auto z-[1000] transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mt-6 mb-5">
        <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-3 flex items-center">
          <span className="mr-2">📂</span>
          {t.categories}
        </h2>
        
        <ul className="list-none p-0 space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`
                  w-full text-left py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 flex items-center space-x-3 text-sm font-medium
                  ${selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'hover:bg-gray-700 hover:transform hover:scale-102'
                  }
                `}
              >
                <span className="text-lg">{category.emoji}</span>
                <span>{category.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {userProfile && (
          <div className="border-t border-gray-700 pt-6 mt-8">
            <ReferralSection
              userProfile={userProfile}
              language={language}
              referralCount={referralCount}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
