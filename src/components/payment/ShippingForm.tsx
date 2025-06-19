
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';

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
  const [countrySearch, setCountrySearch] = useState('');

  const labels = {
    en: {
      fullName: 'Full Name',
      email: 'Email Address',
      address: 'Street Address',
      city: 'City',
      state: 'State/Province',
      zipCode: 'ZIP/Postal Code',
      country: 'Country',
      phone: 'Phone Number'
    },
    es: {
      fullName: 'Nombre Completo',
      email: 'Dirección de Correo',
      address: 'Dirección',
      city: 'Ciudad',
      state: 'Estado/Provincia',
      zipCode: 'Código Postal',
      country: 'País',
      phone: 'Número de Teléfono'
    }
  };

  const l = labels[language];

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="shipping-fullName" className="block text-sm font-medium text-gray-700 mb-2">
            {l.fullName}
          </label>
          <input
            id="shipping-fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => onInputChange('fullName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            autoComplete="name"
          />
        </div>
        
        <div>
          <label htmlFor="shipping-email" className="block text-sm font-medium text-gray-700 mb-2">
            {l.email}
          </label>
          <input
            id="shipping-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="shipping-address" className="block text-sm font-medium text-gray-700 mb-2">
          {l.address}
        </label>
        <input
          id="shipping-address"
          name="address"
          type="text"
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
          autoComplete="street-address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="shipping-city" className="block text-sm font-medium text-gray-700 mb-2">
            {l.city}
          </label>
          <input
            id="shipping-city"
            name="city"
            type="text"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            autoComplete="address-level2"
          />
        </div>
        
        <div>
          <label htmlFor="shipping-state" className="block text-sm font-medium text-gray-700 mb-2">
            {l.state}
          </label>
          <input
            id="shipping-state"
            name="state"
            type="text"
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            autoComplete="address-level1"
          />
        </div>
        
        <div>
          <label htmlFor="shipping-zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            {l.zipCode}
          </label>
          <input
            id="shipping-zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            autoComplete="postal-code"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="shipping-country" className="block text-sm font-medium text-gray-700 mb-2">
            {l.country}
          </label>
          <Select value={formData.country} onValueChange={(value) => onInputChange('country', value)}>
            <SelectTrigger id="shipping-country" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <input
                  id="country-search"
                  name="countrySearch"
                  type="text"
                  placeholder="Search countries..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
              {filteredCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="shipping-phone" className="block text-sm font-medium text-gray-700 mb-2">
            {l.phone}
          </label>
          <input
            id="shipping-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            autoComplete="tel"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
