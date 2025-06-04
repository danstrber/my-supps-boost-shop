
import React from 'react';
import { translations } from '@/lib/translations';

interface SidebarProps {
  language: 'en' | 'es';
  isOpen: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  referralCode?: string;
  referralStats?: {
    totalReferrals: number;
    totalSpent: number;
    currentDiscount: number;
  };
}

const Sidebar: React.FC<SidebarProps> = ({
  language,
  isOpen,
  selectedCategory,
  onCategoryChange,
  referralCode,
  referralStats
}) => {
  const t = translations[language];

  const categories = [
    { key: 'all', label: t.allProducts },
    { key: 'muscleGrowth', label: t.muscleGrowth },
    { key: 'fatLoss', label: t.fatLoss },
    { key: 'recovery', label: t.recovery },
    { key: 'testosteroneSupport', label: t.testosteroneSupport },
    { key: 'sarms', label: t.sarms },
    { key: 'pctAi', label: t.pctAi }
  ];

  return (
    <aside className={`bg-white border-r border-[#ddd] transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed md:relative md:translate-x-0 left-0 top-16 md:top-0 h-screen md:h-auto w-64 z-40 overflow-y-auto`}>
      <div className="p-4">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#2e7d32] mb-3">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.key}>
                <button
                  onClick={() => onCategoryChange(category.key)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-[#e8f5e9] text-[#2e7d32] font-medium'
                      : 'text-[#333] hover:bg-[#e0e0e0]'
                  }`}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Referral Section */}
        {referralCode && (
          <div className="border-t border-[#ddd] pt-4">
            <h3 className="text-lg font-semibold text-[#2e7d32] mb-3">{t.referrals}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-[#333]">{t.yourCode}:</label>
                <div className="mt-1 p-2 bg-[#e8f5e9] rounded text-[#2e7d32] font-mono text-sm">
                  {referralCode}
                </div>
              </div>
              
              {referralStats && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[#333]">{t.referralStats}:</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>{t.totalReferrals}:</span>
                      <span className="font-medium">{referralStats.totalReferrals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.totalSpent}:</span>
                      <span className="font-medium">${referralStats.totalSpent.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.currentDiscount}:</span>
                      <span className="font-medium text-[#2e7d32]">{referralStats.currentDiscount}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
