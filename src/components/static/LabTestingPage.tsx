
import React from 'react';

interface LabTestingPageProps {
  language: 'en' | 'es';
}

const LabTestingPage = ({ language }: LabTestingPageProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {language === 'en' ? 'Product Verification & Lab Testing' : 'Verificación de Productos y Pruebas de Laboratorio'}
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Quality Assurance Promise' : 'Promesa de Garantía de Calidad'}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'At MySupps, we believe in complete transparency. Every product undergoes rigorous third-party testing to ensure purity, potency, and safety. Our lab results are available for your review.'
              : 'En MySupps, creemos en la transparencia completa. Cada producto se somete a pruebas rigurosas de terceros para garantizar pureza, potencia y seguridad. Nuestros resultados de laboratorio están disponibles para su revisión.'}
          </p>
        </div>

        {/* Lab Test Images Section - Corrected assignments */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {language === 'en' ? 'Third-Party Lab Results' : 'Resultados de Laboratorio de Terceros'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/3ee24125-d9cb-413f-8d9f-91b07cd11134.png" 
                alt="Enclomiphene Lab Test"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-green-800 mb-2">Enclomiphene Citrate</h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Purity: 99.5% | PCT compound verification complete'
                  : 'Pureza: 99.5% | Verificación de compuesto PCT completa'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/561ffbe1-f890-47ce-a601-f590a96593e0.png" 
                alt="RAD-140 Lab Test"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-blue-800 mb-2">RAD-140 (Testolone)</h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Purity: 99.2% | Verified dosage and composition'
                  : 'Pureza: 99.2% | Dosificación y composición verificadas'}
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/7698b7f4-aef8-4e6a-a8da-ad22e5909715.png" 
                alt="MK-677 Lab Test"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-purple-800 mb-2">MK-677 (Ibutamoren)</h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Purity: 98.8% | Growth hormone secretagogue verified'
                  : 'Pureza: 98.8% | Secretagogo de hormona de crecimiento verificado'}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/096e40d17-f8c0-404b-af96-b7cadb9b096e.png" 
                alt="Clenbuterol Lab Test"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-orange-800 mb-2">Clenbuterol HCl</h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Purity: 99.1% | Thermogenic properties verified'
                  : 'Pureza: 99.1% | Propiedades termogénicas verificadas'}
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/b43000ed-31b9-4d86-926f-1640e6f0aa3c.png" 
                alt="Superdrol Lab Test"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-red-800 mb-2">Superdrol (Methasterone)</h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Purity: 98.9% | Anabolic compound verification'
                  : 'Pureza: 98.9% | Verificación de compuesto anabólico'}
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/dcea32d8-541f-45c9-b1bf-f74a0c97c0bb.png" 
                alt="Aromasin Product"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-indigo-800 mb-2">Aromasin (Exemestane)</h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Premium aromatase inhibitor for estrogen control'
                  : 'Inhibidor de aromatasa premium para control de estrógenos'}
              </p>
            </div>
          </div>
        </div>

        {/* Janoshik Lab Test Images Section - New additions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {language === 'en' ? 'Janoshik Analytical Lab Results' : 'Resultados de Laboratorio Analítico Janoshik'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/81518186-f1a6-4b15-a733-1307a6f1f474.png" 
                alt="Janoshik Lab Test 1"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Comprehensive Analysis' : 'Análisis Integral'}
              </h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Full spectrum analysis by Janoshik Analytical'
                  : 'Análisis de espectro completo por Janoshik Analytical'}
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/8453db63-04b8-4354-ad42-023eb4ca2627.png" 
                alt="Janoshik Lab Test 2"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-gray-800 mb-2">
                {language === 'en' ? 'Purity Verification' : 'Verificación de Pureza'}
              </h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Independent third-party purity confirmation'
                  : 'Confirmación independiente de pureza por terceros'}
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <img 
                src="/lovable-uploads/fd2ccebb-dc6a-47e5-96d7-e9ea40d4ecc5.png" 
                alt="Janoshik Lab Test 3"
                className="w-full rounded-lg mb-3 hover:scale-105 transition-transform cursor-pointer"
              />
              <h4 className="font-semibold text-gray-800 mb-2">
                {language

 === 'en' ? 'Quality Assurance' : 'Garantía de Calidad'}
              </h4>
              <p className="text-gray-700 text-sm">
                {language === 'en' 
                  ? 'Detailed quality assurance documentation'
                  : 'Documentación detallada de garantía de calidad'}
              </p>
            </div>
          </div>
        </div>

        {/* Testing Standards Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'en' ? 'Our Testing Standards' : 'Nuestros Estándares de Prueba'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Purity Analysis' : 'Análisis de Pureza'}
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === 'en' ? 'HPLC/UPLC analysis' : 'Análisis HPLC/UPLC'}</li>
                <li>• {language === 'en' ? 'Mass spectrometry confirmation' : 'Confirmación por espectrometría de masas'}</li>
                <li>• {language === 'en' ? 'Identity verification' : 'Verificación de identidad'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'Safety Testing' : 'Pruebas de Seguridad'}
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === 'en' ? 'Heavy metals screening' : 'Detección de metales pesados'}</li>
                <li>• {language === 'en' ? 'Microbiological testing' : 'Pruebas microbiológicas'}</li>
                <li>• {language === 'en' ? 'Residual solvents analysis' : 'Análisis de solventes residuales'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestingPage;
