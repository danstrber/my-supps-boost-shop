
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'es';
}

const TermsOfService = ({ isOpen, onClose, language }: TermsOfServiceProps) => {
  console.log('TermsOfService rendered with isOpen:', isOpen);

  const content = language === 'en' ? {
    title: "Terms of Service",
    sections: {
      acceptance: {
        title: "1. Acceptance of Terms",
        content: "By accessing and using MySupps, you accept and agree to be bound by the terms and provision of this agreement. These products are intended for research purposes only and are not for human consumption."
      },
      products: {
        title: "2. Product Information",
        content: "All products sold are for research purposes only. We do not make any claims about the safety, efficacy, or legality of these compounds for human consumption. Users are responsible for understanding the legal status of these substances in their jurisdiction."
      },
      age: {
        title: "3. Age Requirement",
        content: "You must be at least 18 years old to purchase from MySupps. By making a purchase, you confirm that you are of legal age in your jurisdiction."
      },
      referral: {
        title: "4. Referral Program",
        content: "Our referral program offers discounts based on successful referrals and spending. Referred users receive 6% discount per $50 spent. Referrers receive 2% per $50 of referred user spending. Additional referrals provide +4% each (maximum 25% for referrals). Total maximum discount is 30%."
      },
      shipping: {
        title: "5. Shipping and Delivery",
        content: "We ship worldwide with tracking provided. Delivery times vary by location. We are not responsible for packages lost by shipping carriers or seized by customs."
      },
      returns: {
        title: "6. Returns and Refunds",
        content: "Due to the nature of our products, we do not accept returns unless the product was damaged during shipping. All sales are final."
      },
      liability: {
        title: "7. Limitation of Liability",
        content: "MySupps shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products."
      },
      privacy: {
        title: "8. Privacy Policy",
        content: "We respect your privacy and protect your personal information. We do not share customer information with third parties except as required for order fulfillment."
      },
      changes: {
        title: "9. Changes to Terms",
        content: "We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms."
      }
    }
  } : {
    title: "Términos de Servicio",
    sections: {
      acceptance: {
        title: "1. Aceptación de Términos",
        content: "Al acceder y usar MySupps, acepta y está de acuerdo en cumplir con los términos y disposiciones de este acuerdo. Estos productos están destinados únicamente para fines de investigación y no para consumo humano."
      },
      products: {
        title: "2. Información del Producto",
        content: "Todos los productos vendidos son únicamente para fines de investigación. No hacemos ninguna afirmación sobre la seguridad, eficacia o legalidad de estos compuestos para consumo humano."
      },
      age: {
        title: "3. Requisito de Edad",
        content: "Debe tener al menos 18 años para comprar en MySupps. Al realizar una compra, confirma que tiene la edad legal en su jurisdicción."
      },
      referral: {
        title: "4. Programa de Referidos",
        content: "Nuestro programa de referidos ofrece descuentos basados en referidos exitosos y gastos. Los usuarios referidos reciben 6% de descuento por cada $50 gastados. Los referidores reciben 2% por cada $50 de gasto del usuario referido. Referidos adicionales proporcionan +4% cada uno (máximo 25% por referidos). Descuento total máximo es 30%."
      },
      shipping: {
        title: "5. Envío y Entrega",
        content: "Enviamos a todo el mundo con seguimiento proporcionado. Los tiempos de entrega varían según la ubicación."
      },
      returns: {
        title: "6. Devoluciones y Reembolsos",
        content: "Debido a la naturaleza de nuestros productos, no aceptamos devoluciones a menos que el producto haya sido dañado durante el envío."
      },
      liability: {
        title: "7. Limitación de Responsabilidad",
        content: "MySupps no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente resultante del uso o incapacidad de usar nuestros productos."
      },
      privacy: {
        title: "8. Política de Privacidad",
        content: "Respetamos su privacidad y protegemos su información personal. No compartimos información del cliente con terceros."
      },
      changes: {
        title: "9. Cambios en los Términos",
        content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado de nuestros servicios constituye la aceptación de los términos modificados."
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{content.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {Object.entries(content.sections).map(([key, section]) => (
              <div key={key} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium">
                {language === 'en' 
                  ? "IMPORTANT: These products are for research purposes only and not intended for human consumption. Please research the legal status of these compounds in your area before purchasing."
                  : "IMPORTANTE: Estos productos son únicamente para fines de investigación y no están destinados al consumo humano. Investigue el estado legal de estos compuestos en su área antes de comprar."
                }
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfService;
