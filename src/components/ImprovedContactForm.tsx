
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/lib/translations';

interface ImprovedContactFormProps {
  language: 'en' | 'es';
}

const ImprovedContactForm = ({ language }: ImprovedContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Hidden field to catch bots
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot field - if filled, it's likely a bot
    if (formData.honeypot) {
      return; // Silently reject bot submissions
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Professional Inquiry: ${formData.subject}`,
          message: `Professional inquiry from ${formData.name} (${formData.email}):\n\n${formData.message}`,
          _replyto: formData.email,
          _subject: `Professional Inquiry from ${formData.name}`,
          _format: 'plain',
          _language: language,
          _gotcha: formData.honeypot
        }),
      });

      if (response.ok) {
        toast({
          title: language === 'en' ? 'Message Sent Successfully!' : '¡Mensaje Enviado Exitosamente!',
          description: language === 'en' 
            ? 'Thank you for your professional inquiry. We will respond within 24 hours.' 
            : 'Gracias por su consulta profesional. Responderemos dentro de 24 horas.',
          duration: 5000,
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' 
          ? 'There was an error sending your message. Please try again.' 
          : 'Hubo un error al enviar su mensaje. Por favor intente de nuevo.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {t.contactFormTitle}
      </h2>
      <p className="text-gray-600 mb-6">
        {t.formInstructions}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t.fullName} *
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
              placeholder={language === 'en' ? 'Enter your full name' : 'Ingrese su nombre completo'}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t.email} *
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full"
              placeholder={language === 'en' ? 'Enter your email address' : 'Ingrese su correo electrónico'}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Subject' : 'Asunto'} *
          </label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full"
            placeholder={language === 'en' ? 'Brief subject of your inquiry' : 'Breve asunto de su consulta'}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Message' : 'Mensaje'} *
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full"
            placeholder={language === 'en' 
              ? 'Please describe your professional inquiry in detail...' 
              : 'Por favor describa su consulta profesional en detalle...'
            }
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            {language === 'en' 
              ? 'By submitting this form, you confirm this is a legitimate business inquiry. We respond to all professional requests within 24 hours during business days.'
              : 'Al enviar este formulario, confirma que esta es una consulta comercial legítima. Respondemos a todas las solicitudes profesionales dentro de 24 horas durante los días hábiles.'
            }
          </p>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-3 text-lg font-semibold"
        >
          {isSubmitting 
            ? (language === 'en' ? 'Sending...' : 'Enviando...') 
            : (language === 'en' ? 'Send Professional Inquiry' : 'Enviar Consulta Profesional')
          }
        </Button>
      </form>
    </div>
  );
};

export default ImprovedContactForm;
