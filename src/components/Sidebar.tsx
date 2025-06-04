
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
    { id: 'all', label: t.allProducts },
    { id: 'sarms', label: t.sarms },
    { id: 'muscleGrowth', label: t.muscleGrowth },
    { id: 'fatLoss', label: t.fatLoss },
    { id: 'recovery', label: t.recovery },
    { id: 'testosteroneSupport', label: t.testosteroneSupport },
    { id: 'pctAi', label: t.pctAi }
  ];

  return (
    <aside className={`
      ${isOpen ? 'block' : 'hidden'} 
      md:block w-64 bg-white border-r-2 border-[#4CAF50] p-4 
      fixed md:relative z-40 h-full md:h-auto overflow-y-auto
    `}>
      <h3 className="text-lg font-semibold text-[#4CAF50] mb-4 border-b border-[#E8F5E9] pb-2">
        {t.categories}
      </h3>
      
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              className={`
                w-full text-left px-3 py-2 rounded-lg transition-all duration-200
                ${selectedCategory === category.id
                  ? 'bg-[#4CAF50] text-white shadow-md'
                  : 'text-[#333] hover:bg-[#E8F5E9] hover:text-[#4CAF50]'
                }
              `}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>

      {userProfile && (
        <ReferralSection
          userProfile={userProfile}
          language={language}
          referralCount={referralCount}
        />
      )}
    </aside>
  );
};

export default Sidebar;
