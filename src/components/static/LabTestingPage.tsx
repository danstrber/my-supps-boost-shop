
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestingPage;
