
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Australia',
    'Japan',
    'Brazil',
    'Mexico',
    'India',
    'China',
    'Russia',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
    'Finland',
    'Switzerland',
    'Austria',
    'Belgium',
    'Portugal',
    'Poland',
    'Czech Republic'
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="shipping-fullName">{labels[language].fullName}</Label>
        <Input
          id="shipping-fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div>
        <Label htmlFor="shipping-email">{labels[language].email}</Label>
        <Input
          id="shipping-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="shipping-address">{labels[language].address}</Label>
        <Input
          id="shipping-address"
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
          <Label htmlFor="shipping-city">{labels[language].city}</Label>
          <Input
            id="shipping-city"
            name="city"
            type="text"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            required
            autoComplete="address-level2"
          />
        </div>
        <div>
          <Label htmlFor="shipping-state">{labels[language].state}</Label>
          <Input
            id="shipping-state"
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
          <Label htmlFor="shipping-zipCode">{labels[language].zipCode}</Label>
          <Input
            id="shipping-zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            required
            autoComplete="postal-code"
          />
        </div>
        <div>
          <Label htmlFor="shipping-country">{labels[language].country}</Label>
          <Select value={formData.country} onValueChange={(value) => onInputChange('country', value)}>
            <SelectTrigger id="shipping-country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="shipping-phone">{labels[language].phone}</Label>
        <Input
          id="shipping-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          required
          autoComplete="tel"
          placeholder="+1 (555) 123-4567"
        />
        <p className="text-xs text-gray-500 mt-1">
          {language === 'en' 
            ? 'Phone number will be auto-formatted with country code'
            : 'El número de teléfono será formateado automáticamente con código de país'
          }
        </p>
      </div>
    </div>
  );
};

export default ShippingForm;
