
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  txid: string;
}

interface ShippingFormProps {
  customerInfo: CustomerInfo;
  onInfoChange: (info: CustomerInfo) => void;
  paymentMethod: 'telegram' | 'bitcoin';
  language: 'en' | 'es';
}

const ShippingForm = ({ customerInfo, onInfoChange, paymentMethod, language }: ShippingFormProps) => {
  if (paymentMethod === 'telegram') return null;

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold text-gray-900 mb-4">
        {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">
            {language === 'en' ? 'Full Name *' : 'Nombre Completo *'}
          </Label>
          <Input
            id="fullName"
            value={customerInfo.fullName}
            onChange={(e) => onInfoChange({...customerInfo, fullName: e.target.value})}
            required
            placeholder={language === 'en' ? 'Your full name' : 'Tu nombre completo'}
          />
        </div>
        
        <div>
          <Label htmlFor="email">
            {language === 'en' ? 'Email *' : 'Correo Electrónico *'}
          </Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => onInfoChange({...customerInfo, email: e.target.value})}
            required
            placeholder={language === 'en' ? 'your@email.com' : 'tu@correo.com'}
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="address">
            {language === 'en' ? 'Address *' : 'Dirección *'}
          </Label>
          <Input
            id="address"
            value={customerInfo.address}
            onChange={(e) => onInfoChange({...customerInfo, address: e.target.value})}
            required
            placeholder={language === 'en' ? 'Street address' : 'Dirección de la calle'}
          />
        </div>
        
        <div>
          <Label htmlFor="city">
            {language === 'en' ? 'City *' : 'Ciudad *'}
          </Label>
          <Input
            id="city"
            value={customerInfo.city}
            onChange={(e) => onInfoChange({...customerInfo, city: e.target.value})}
            required
            placeholder={language === 'en' ? 'City' : 'Ciudad'}
          />
        </div>
        
        <div>
          <Label htmlFor="country">
            {language === 'en' ? 'Country *' : 'País *'}
          </Label>
          <Input
            id="country"
            value={customerInfo.country}
            onChange={(e) => onInfoChange({...customerInfo, country: e.target.value})}
            required
            placeholder={language === 'en' ? 'Country' : 'País'}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
