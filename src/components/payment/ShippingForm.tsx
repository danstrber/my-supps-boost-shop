
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShippingFormProps {
  formData: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  onInputChange: (field: string, value: string) => void;
  language: 'en' | 'es';
}

const ShippingForm = ({ formData, onInputChange, language }: ShippingFormProps) => {
  const labels = {
    en: {
      fullName: 'Full Name',
      email: 'Email',
      address: 'Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code',
      country: 'Country',
      phone: 'Phone Number'
    },
    es: {
      fullName: 'Nombre Completo',
      email: 'Correo',
      address: 'Dirección',
      city: 'Ciudad',
      state: 'Estado',
      zipCode: 'Código Postal',
      country: 'País',
      phone: 'Teléfono'
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">{labels[language].fullName}</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div>
        <Label htmlFor="email">{labels[language].email}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="address">{labels[language].address}</Label>
        <Input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          required
          autoComplete="street-address"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">{labels[language].city}</Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            required
            autoComplete="address-level2"
          />
        </div>
        <div>
          <Label htmlFor="state">{labels[language].state}</Label>
          <Input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            required
            autoComplete="address-level1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">{labels[language].zipCode}</Label>
          <Input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            required
            autoComplete="postal-code"
          />
        </div>
        <div>
          <Label htmlFor="country">{labels[language].country}</Label>
          <Input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={(e) => onInputChange('country', e.target.value)}
            required
            autoComplete="country"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">{labels[language].phone}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          required
          autoComplete="tel"
        />
      </div>
    </div>
  );
};

export default ShippingForm;
