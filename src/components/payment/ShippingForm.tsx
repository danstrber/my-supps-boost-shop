
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { translations } from '@/lib/translations';

interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  postalCode: string;
  txid: string;
}

interface ShippingFormProps {
  customerInfo: CustomerInfo;
  onInfoChange: (info: CustomerInfo) => void;
  paymentMethod: 'telegram' | 'bitcoin';
  language: 'en' | 'es';
}

const ShippingForm = ({ customerInfo, onInfoChange, paymentMethod, language }: ShippingFormProps) => {
  const t = translations[language];

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    onInfoChange({ ...customerInfo, [field]: value });
  };

  const validatePostalCode = (code: string, country: string): boolean => {
    if (!code) return false;
    
    // Basic validation - at least 3 characters, alphanumeric
    const basicPattern = /^[A-Za-z0-9\s\-]{3,10}$/;
    return basicPattern.test(code);
  };

  const validateAddress = (address: string): boolean => {
    if (!address || address.length < 5) return false;
    // Should contain at least one number and some letters
    const hasNumber = /\d/.test(address);
    const hasLetters = /[A-Za-z]/.test(address);
    return hasNumber && hasLetters;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">{t.shippingInformation}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">{t.fullName} *</Label>
          <Input
            id="fullName"
            value={customerInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder={t.yourFullName}
            required
            className={!customerInfo.fullName ? 'border-red-300' : ''}
          />
        </div>
        
        <div>
          <Label htmlFor="email">{t.email} *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={t.yourEmail}
            required
            className={!customerInfo.email ? 'border-red-300' : ''}
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="address">{t.address} *</Label>
          <Input
            id="address"
            value={customerInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder={t.streetAddress}
            required
            className={!validateAddress(customerInfo.address) ? 'border-red-300' : ''}
          />
          {customerInfo.address && !validateAddress(customerInfo.address) && (
            <p className="text-red-500 text-xs mt-1">
              {language === 'en' ? 'Please enter a valid street address with house number' : 'Por favor ingresa una dirección válida con número de casa'}
            </p>
          )}
        </div>
        
        <div>
          <Label htmlFor="city">{t.city} *</Label>
          <Input
            id="city"
            value={customerInfo.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t.city}
            required
            className={!customerInfo.city ? 'border-red-300' : ''}
          />
        </div>
        
        <div>
          <Label htmlFor="country">{t.country} *</Label>
          <Input
            id="country"
            value={customerInfo.country}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder={t.country}
            required
            className={!customerInfo.country ? 'border-red-300' : ''}
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">{t.phoneNumber} *</Label>
          <Input
            id="phoneNumber"
            value={customerInfo.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder={t.yourPhoneNumber}
            required
            className={!customerInfo.phoneNumber ? 'border-red-300' : ''}
          />
        </div>
        
        <div>
          <Label htmlFor="postalCode">{t.postalCode} *</Label>
          <Input
            id="postalCode"
            value={customerInfo.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder={t.yourPostalCode}
            required
            className={!validatePostalCode(customerInfo.postalCode, customerInfo.country) ? 'border-red-300' : ''}
          />
          {customerInfo.postalCode && !validatePostalCode(customerInfo.postalCode, customerInfo.country) && (
            <p className="text-red-500 text-xs mt-1">
              {language === 'en' ? 'Please enter a valid postal code' : 'Por favor ingresa un código postal válido'}
            </p>
          )}
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        * {language === 'en' ? 'Required fields for shipping' : 'Campos requeridos para el envío'}
      </p>
    </div>
  );
};

export default ShippingForm;
