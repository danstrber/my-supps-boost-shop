
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, User, Gift } from 'lucide-react';
import { UserProfile } from '@/lib/auth';

interface SidebarProps {
  language: 'en' | 'es';
  isOpen: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  userProfile: UserProfile | null;
  referralCount: number;
  onClose: () => void;
}

const Sidebar = ({
  language,
  isOpen,
  selectedCategory,
  onCategoryChange,
  userProfile,
  referralCount,
  onClose
}: SidebarProps) => {
  const categories = [
    { id: 'all', nameEn: 'All Products', nameEs: 'Todos los Productos' },
    { id: 'sarms', nameEn: 'SARMs', nameEs: 'SARMs' },
    { id: 'oral-steroids', nameEn: 'Oral Steroids', nameEs: 'Esteroides Orales' },
    { id: 'fat-burners', nameEn: 'Fat Burners', nameEs: 'Quemadores' },
    { id: 'pct', nameEn: 'PCT', nameEs: 'PCT' },
    { id: 'hormones', nameEn: 'Hormones', nameEs: 'Hormonas' },
    { id: 'growth', nameEn: 'Growth', nameEs: 'Crecimiento' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto"
        data-sidebar
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {language === 'en' ? 'Categories' : 'Categorías'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile Section */}
        {userProfile && (
          <div className="p-4 border-b border-gray-200 bg-green-50">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 rounded-full p-2">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{userProfile.name || 'User'}</p>
                <p className="text-sm text-gray-600">{userProfile.email}</p>
              </div>
            </div>
            
            {/* Referral info */}
            <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Referral Code:' : 'Código de Referido:'}
                </span>
              </div>
              <p className="text-green-600 font-mono text-sm mt-1">{userProfile.referral_code}</p>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'en' 
                  ? `${referralCount} people referred` 
                  : `${referralCount} personas referidas`}
              </p>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="p-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                className={`w-full justify-start text-left h-12 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  onCategoryChange(category.id);
                  onClose(); // Close sidebar on mobile after selection
                }}
              >
                <span className="flex-1">
                  {language === 'en' ? category.nameEn : category.nameEs}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
