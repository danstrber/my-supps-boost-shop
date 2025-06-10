
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
        <img 
          src="/lovable-uploads/6c2dcc9f-c88a-4d00-9ab5-1572b72da530.png" 
          alt="Product Verification"
          className="w-full max-w-3xl mx-auto mb-8 rounded-lg shadow-md"
        />
        
        {/* Main Lab Testing Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            🧪 {language === 'en' ? 'Product Authentication' : 'Autenticación de Productos'}
          </h2>
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
            <p className="text-green-800 font-semibold text-lg mb-2">
              ✅ {language === 'en' ? 'Proof of Authenticity for All Products' : 'Prueba de Autenticidad para Todos los Productos'}
            </p>
            <p className="text-gray-700">
              {language === 'en' 
                ? 'We provide proof of authenticity for all our products. You can verify the contents and quality of your supplements through our verification images.' 
                : 'Proporcionamos prueba de autenticidad para todos nuestros productos. Puedes verificar el contenido y calidad de tus suplementos a través de nuestras imágenes de verificación.'}
            </p>
          </div>
        </div>

        {/* Lab Test Images Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Lab Test Results' : 'Resultados de Laboratorio'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <img 
                src="/lovable-uploads/71047aaf-1d52-4f01-bdb1-f051dac4a70a.png" 
                alt="Lab Test Result 1"
                className="w-full rounded-lg mb-3"
              />
              <h4 className="font-semibold text-blue-800 mb-2">Superdrol Lab Analysis</h4>
              <p className="text-gray-700 text-sm">Detailed purity and composition analysis</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <img 
                src="/lovable-uploads/74e5658e-425e-497b-aef1-34644cbb54f1.png" 
                alt="Lab Test Result 2"
                className="w-full rounded-lg mb-3"
              />
              <h4 className="font-semibold text-purple-800 mb-2">Additional Product Testing</h4>
              <p className="text-gray-700 text-sm">Third-party verification and quality assurance</p>
            </div>
          </div>
        </div>

        {/* Testing Standards */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Our Testing Standards' : 'Nuestros Estándares de Prueba'}
          </h3>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Third-party laboratory testing</li>
                <li>Purity verification (minimum 98%)</li>
                <li>Heavy metals contamination testing</li>
                <li>Microbial safety analysis</li>
              </ul>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>HPLC chromatography analysis</li>
                <li>Mass spectrometry verification</li>
                <li>Certificate of Analysis (COA) available</li>
                <li>ISO certified laboratory standards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestingPage;
