
import React from 'react';

interface AboutPageProps {
  language: 'en' | 'es';
}

const AboutPage = ({ language }: AboutPageProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {language === 'en' ? 'About Us' : 'Acerca de Nosotros'}
      </h1>
      <div className="prose prose-lg text-gray-600">
        <p>
          {language === 'en' 
            ? 'We are dedicated to providing high-quality research compounds with complete transparency and testing.' 
            : 'Nos dedicamos a proporcionar compuestos de investigación de alta calidad con total transparencia y pruebas.'}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
