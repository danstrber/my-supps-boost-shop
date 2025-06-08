
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
  onClose: () => void;
}

const Sidebar = ({ language, isOpen, selectedCategory, onCategoryChange, userProfile, referralCount, onClose }: SidebarProps) => {
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

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    onClose(); // Close sidebar after selection on mobile
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[999] lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <nav 
        className={`fixed top-0 w-64 h-full bg-gray-900 text-white pt-16 px-5 pb-5 box-border transition-all duration-300 ease-in-out overflow-y-auto z-[1000] ${
          isOpen ? 'left-0' : '-left-64'
        }`}
      >
        <div className="mt-10 mb-5">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-3">
            {t.categories}
          </h2>
          
          <ul className="list-none p-0">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    w-full text-left py-3 px-3 border-b border-gray-700 cursor-pointer transition-colors
                    ${selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-gray-700'
                    }
                  `}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>

          {userProfile && (
            <div className="border-t border-gray-700 pt-4 mt-6">
              <ReferralSection
                userProfile={userProfile}
                language={language}
                referralCount={referralCount}
              />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
