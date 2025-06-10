
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'es';
}

const TermsOfService = ({ isOpen, onClose, language }: TermsOfServiceProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Terms of Service' : 'Términos de Servicio'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '1. Acceptance of Terms' : '1. Aceptación de Términos'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'
                  : 'Al acceder y usar este sitio web, aceptas y acuerdas estar sujeto a los términos y disposiciones de este acuerdo.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '2. Research Purposes Only' : '2. Solo para Fines de Investigación'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'All products sold on this website are strictly for research and laboratory use only. They are not intended for human consumption, veterinary use, or any other purpose.'
                  : 'Todos los productos vendidos en este sitio web son estrictamente para uso de investigación y laboratorio únicamente. No están destinados para consumo humano, uso veterinario o cualquier otro propósito.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '3. Age Requirement' : '3. Requisito de Edad'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'You must be at least 18 years old to purchase products from this website. By making a purchase, you confirm that you are of legal age.'
                  : 'Debes tener al menos 18 años para comprar productos de este sitio web. Al realizar una compra, confirmas que eres mayor de edad.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '4. Referral System' : '4. Sistema de Referidos'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Our referral program is designed to reward legitimate referrals. Do not abuse the referral system by creating fake accounts, using multiple identities, or engaging in fraudulent activities. Violations may result in account suspension, termination, and forfeiture of any earned rewards or discounts.'
                  : 'Nuestro programa de referidos está diseñado para recompensar referidos legítimos. No abuses del sistema de referidos creando cuentas falsas, usando múltiples identidades o participando en actividades fraudulentas. Las violaciones pueden resultar en suspensión de cuenta, terminación y pérdida de cualquier recompensa o descuento ganado.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '5. Account Security' : '5. Seguridad de Cuenta'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'You are responsible for maintaining the confidentiality of your account credentials. We implement security measures including email verification and optional two-factor authentication to protect your account.'
                  : 'Eres responsable de mantener la confidencialidad de las credenciales de tu cuenta. Implementamos medidas de seguridad incluyendo verificación de correo y autenticación de dos factores opcional para proteger tu cuenta.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '6. Privacy and Data Protection' : '6. Privacidad y Protección de Datos'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'We collect and process personal information in accordance with our Privacy Policy. This includes email addresses, names, and shipping information necessary to fulfill orders. We may also track IP addresses to prevent abuse and ensure security.'
                  : 'Recopilamos y procesamos información personal de acuerdo con nuestra Política de Privacidad. Esto incluye direcciones de correo, nombres e información de envío necesaria para cumplir pedidos. También podemos rastrear direcciones IP para prevenir abuso y garantizar seguridad.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '7. Account Limitations' : '7. Limitaciones de Cuenta'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'To prevent abuse, we limit the number of accounts that can be created from the same email address or IP address. Each person is allowed only one account. Multiple accounts may be subject to suspension or termination.'
                  : 'Para prevenir abuso, limitamos el número de cuentas que pueden crearse desde la misma dirección de correo o dirección IP. Cada persona tiene permitida solo una cuenta. Múltiples cuentas pueden estar sujetas a suspensión o terminación.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '8. Quality Assurance' : '8. Garantía de Calidad'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Our products undergo third-party testing for purity and quality. Lab test results are available for select products and can be viewed on individual product pages.'
                  : 'Nuestros productos pasan por pruebas de terceros para pureza y calidad. Los resultados de pruebas de laboratorio están disponibles para productos selectos y pueden verse en páginas individuales de productos.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '9. Limitation of Liability' : '9. Limitación de Responsabilidad'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'We are not liable for any misuse of products sold. Products are sold for research purposes only and buyers assume all responsibility for proper handling and use.'
                  : 'No somos responsables por el mal uso de productos vendidos. Los productos se venden solo para fines de investigación y los compradores asumen toda responsabilidad por el manejo y uso apropiado.'}
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? '10. Changes to Terms' : '10. Cambios a los Términos'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website.'
                  : 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente al publicarse en el sitio web.'}
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfService;
