
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { translations } from '@/lib/translations';

interface AboutPageProps {
  language: 'en' | 'es';
}

const AboutPage = ({ language }: AboutPageProps) => {
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {t.aboutContent}
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          {t.aboutSubtitle}
        </p>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {t.aboutDescription}
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-12 border border-green-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t.whyChoose}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800 font-medium leading-relaxed">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          {t.trustedBy}
        </p>
        
        <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg">
          {t.tagline}
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🧬</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Science-Based' : 'Basado en Ciencia'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'All products backed by scientific research and clinical studies'
              : 'Todos los productos respaldados por investigación científica y estudios clínicos'
            }
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛡️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Safe & Tested' : 'Seguro y Probado'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Rigorous third-party testing ensures purity and potency'
              : 'Pruebas rigurosas de terceros garantizan pureza y potencia'
            }
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Results-Driven' : 'Orientado a Resultados'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Tailored solutions designed to meet your specific goals'
              : 'Soluciones personalizadas diseñadas para cumplir tus objetivos específicos'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
