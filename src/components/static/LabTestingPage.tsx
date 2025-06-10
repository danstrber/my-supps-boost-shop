
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

        {/* Verification Images Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Verification Images' : 'Imágenes de Verificación'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
              <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-500">Product verification 1</span>
              </div>
              <h4 className="font-semibold text-blue-800 mb-2">Product Content Verification</h4>
              <p className="text-gray-700 text-sm">Detailed analysis of product composition and purity levels</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
              <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-500">Product verification 2</span>
              </div>
              <h4 className="font-semibold text-purple-800 mb-2">Quality Assurance Documentation</h4>
              <p className="text-gray-700 text-sm">Third-party testing results and safety certificates</p>
            </div>
          </div>
        </div>

        {/* Contact for Additional Documentation */}
        <div className="mb-8">
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">📋</span>
              <h4 className="font-semibold text-yellow-800 text-lg">
                {language === 'en' ? 'Contact us for additional product verification documentation' : 'Contáctanos para documentación adicional de verificación de productos'}
              </h4>
            </div>
            <p className="text-yellow-700">
              {language === 'en' 
                ? 'Contact us for additional product verification documentation or if you have specific questions about any product.'
                : 'Contáctanos para documentación adicional de verificación de productos o si tienes preguntas específicas sobre algún producto.'}
            </p>
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
