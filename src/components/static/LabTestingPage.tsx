
import React from 'react';

interface LabTestingPageProps {
  language: 'en' | 'es';
}

const LabTestingPage = ({ language }: LabTestingPageProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {language === 'en' ? 'Product Verification' : 'Verificación de Productos'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Lab Test Images Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Lab Test Results' : 'Resultados de Laboratorio'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <img 
                src="/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png" 
                alt="Superdrol Lab Test"
                className="w-full rounded-lg mb-3"
              />
              <h4 className="font-semibold text-blue-800 mb-2">Superdrol Lab Analysis</h4>
              <p className="text-gray-700 text-sm">Detailed purity and composition analysis</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <img 
                src="/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png" 
                alt="Clenbuterol Lab Test"
                className="w-full rounded-lg mb-3"
              />
              <h4 className="font-semibold text-purple-800 mb-2">Clenbuterol Lab Testing</h4>
              <p className="text-gray-700 text-sm">Third-party verification and quality assurance</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <img 
                src="/lovable-uploads/6577b0a1-edaf-4c9f-9a40-7c5955455545.png" 
                alt="Exemestane Lab Test"
                className="w-full rounded-lg mb-3"
              />
              <h4 className="font-semibold text-green-800 mb-2">Exemestane 25mg Lab Analysis</h4>
              <p className="text-gray-700 text-sm">Purity verification: 25.49mg - 27.16mg per capsule</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <img 
                src="/lovable-uploads/f9bfd7ea-09fe-4f15-a7ef-f1e56dd7fb7c.png" 
                alt="Testosterone Cypionate Lab Test"
                className="w-full rounded-lg mb-3"
              />
              <h4 className="font-semibold text-orange-800 mb-2">Testosterone Cypionate 250mg/ml</h4>
              <p className="text-gray-700 text-sm">Lab verified concentration: 252.80mg/ml</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestingPage;
