
import React from 'react';
import { MessageCircle, Shield, Award, Users } from 'lucide-react';

interface AboutPageProps {
  language: 'en' | 'es';
}

const AboutPage = ({ language }: AboutPageProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          {language === 'en' ? 'Unlock Your Potential' : 'Desbloquea Tu Potencial'}
        </h1>
        <h2 className="text-2xl text-blue-600 mb-6">
          {language === 'en' 
            ? 'Science-Backed Performance Enhancers' 
            : 'Potenciadores de Rendimiento Respaldados por la Ciencia'}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          {language === 'en'
            ? 'Are you striving for more — in the gym, in the mirror, or in life? Whether you\'re chasing peak performance, accelerated recovery, or a sculpted physique, advanced peptides and medically-guided anabolic support may offer the edge you\'ve been looking for.'
            : '¿Estás luchando por más — en el gimnasio, en el espejo, o en la vida? Ya sea que busques el máximo rendimiento, recuperación acelerada, o un físico esculpido, los péptidos avanzados y el soporte anabólico médicamente guiado pueden ofrecerte la ventaja que has estado buscando.'
          }
        </p>

        {/* Need Expert Guidance Section - Moved to Top */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-12">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 mr-3" />
            <h3 className="text-2xl font-bold">
              {language === 'en' ? 'Need Expert Guidance?' : '¿Necesitas Orientación Experta?'}
            </h3>
          </div>
          <p className="text-xl mb-6 opacity-90">
            {language === 'en' 
              ? 'Get personalized coaching, custom cycles, and 24/7 support from our experts!'
              : '¡Obtén coaching personalizado, ciclos a medida y soporte 24/7 de nuestros expertos!'}
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg text-lg transition-colors">
            <MessageCircle className="h-5 w-5 mr-2 inline" />
            {language === 'en' ? 'Get Coaching' : 'Obtener Coaching'}
          </button>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {language === 'en' 
            ? 'Why Choose Peptides or Steroids (Under Medical Supervision)?' 
            : '¿Por Qué Elegir Péptidos o Esteroides (Bajo Supervisión Médica)?'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl mb-4">💪</div>
            <h4 className="text-xl font-semibold text-blue-800 mb-3">
              {language === 'en' ? 'Build Lean Muscle Faster' : 'Construir Músculo Magro Más Rápido'}
            </h4>
            <p className="text-gray-700">
              {language === 'en'
                ? 'Accelerate muscle growth and development with scientifically proven compounds.'
                : 'Acelera el crecimiento y desarrollo muscular con compuestos científicamente probados.'
              }
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h4 className="text-xl font-semibold text-green-800 mb-3">
              {language === 'en' ? 'Enhance Strength and Boost Endurance' : 'Mejorar Fuerza y Aumentar Resistencia'}
            </h4>
            <p className="text-gray-700">
              {language === 'en'
                ? 'Push beyond your limits with enhanced strength and stamina.'
                : 'Supera tus límites con fuerza y resistencia mejoradas.'
              }
            </p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl mb-4">🔄</div>
            <h4 className="text-xl font-semibold text-purple-800 mb-3">
              {language === 'en' ? 'Accelerate Recovery Between Workouts' : 'Acelerar Recuperación Entre Entrenamientos'}
            </h4>
            <p className="text-gray-700">
              {language === 'en'
                ? 'Reduce downtime and train more frequently with faster recovery.'
                : 'Reduce el tiempo de inactividad y entrena más frecuentemente con recuperación más rápida.'
              }
            </p>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <div className="text-3xl mb-4">🧬</div>
            <h4 className="text-xl font-semibold text-orange-800 mb-3">
              {language === 'en' ? 'Support Healthy Aging' : 'Apoyar Envejecimiento Saludable'}
            </h4>
            <p className="text-gray-700">
              {language === 'en'
                ? 'Hormone-optimizing solutions for maintaining vitality as you age.'
                : 'Soluciones de optimización hormonal para mantener la vitalidad mientras envejeces.'
              }
            </p>
          </div>

          <div className="text-center p-6 bg-red-50 rounded-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h4 className="text-xl font-semibold text-red-800 mb-3">
              {language === 'en' ? 'Fight Fatigue & Elevate Confidence' : 'Combatir Fatiga y Elevar Confianza'}
            </h4>
            <p className="text-gray-700">
              {language === 'en'
                ? 'Boost energy levels and self-confidence with proven treatments.'
                : 'Aumenta los niveles de energía y autoconfianza con tratamientos probados.'
              }
            </p>
          </div>

          <div className="text-center p-6 bg-indigo-50 rounded-lg">
            <div className="text-3xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold text-indigo-800 mb-3">
              {language === 'en' ? 'Tailored Solutions' : 'Soluciones Personalizadas'}
            </h4>
            <p className="text-gray-700">
              {language === 'en'
                ? 'Custom treatments designed around your specific goals and needs.'
                : 'Tratamientos personalizados diseñados en torno a tus objetivos y necesidades específicas.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-8 mb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">
            {language === 'en' 
              ? 'Trusted by Athletes, Professionals, and Wellness Enthusiasts' 
              : 'Confiado por Atletas, Profesionales y Entusiastas del Bienestar'}
          </h3>
          <p className="text-xl mb-6 opacity-90">
            {language === 'en'
              ? 'Today\'s treatments are tailored, safe, and built around your goals.'
              : 'Los tratamientos de hoy son personalizados, seguros y construidos en torno a tus objetivos.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h4 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Safety First' : 'Seguridad Primero'}
              </h4>
              <p className="opacity-80">
                {language === 'en'
                  ? 'All products are tested and verified for purity and potency.'
                  : 'Todos los productos son probados y verificados por pureza y potencia.'
                }
              </p>
            </div>

            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h4 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Premium Quality' : 'Calidad Premium'}
              </h4>
              <p className="opacity-80">
                {language === 'en'
                  ? 'Only the highest grade compounds from trusted manufacturers.'
                  : 'Solo compuestos del más alto grado de fabricantes confiables.'
                }
              </p>
            </div>

            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <h4 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Expert Support' : 'Soporte Experto'}
              </h4>
              <p className="opacity-80">
                {language === 'en'
                  ? '24/7 guidance from experienced professionals and coaches.'
                  : 'Orientación 24/7 de profesionales y entrenadores experimentados.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center bg-blue-50 rounded-xl p-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          {language === 'en' 
            ? 'Science meets performance. Results meet confidence.' 
            : 'La ciencia se encuentra con el rendimiento. Los resultados se encuentran con la confianza.'}
        </h3>
        <p className="text-xl text-gray-600 mb-6">
          {language === 'en'
            ? 'Ready to unlock your potential? Start your journey today.'
            : '¿Listo para desbloquear tu potencial? Comienza tu viaje hoy.'
          }
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors">
            {language === 'en' ? 'Shop Products' : 'Comprar Productos'}
          </button>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold text-lg transition-colors">
            <MessageCircle className="h-5 w-5 mr-2 inline" />
            {language === 'en' ? 'Get Expert Coaching' : 'Obtener Coaching Experto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
