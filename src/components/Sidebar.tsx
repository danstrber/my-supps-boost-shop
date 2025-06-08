
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
    <>
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:shadow-none`}
        style={{ paddingTop: '120px' }}
      >
        <div className="p-4">
          <div className="sticky top-0 bg-white pb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-3">
              {t.categories}
            </h3>
          </div>
          
          <ul className="space-y-1 mb-6">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => onCategoryChange(category.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium
                    ${selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700 hover:shadow-sm'
                    }
                  `}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>

          {userProfile && (
            <div className="border-t border-gray-200 pt-4">
              <ReferralSection
                userProfile={userProfile}
                language={language}
                referralCount={referralCount}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
