
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

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">{t.shippingInformation}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            id="fullName"
            value={customerInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder={t.yourFullName}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={t.yourEmail}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="address">{t.address}</Label>
          <Input
            id="address"
            value={customerInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder={t.streetAddress}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="city">{t.city}</Label>
          <Input
            id="city"
            value={customerInfo.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t.city}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="country">{t.country}</Label>
          <Input
            id="country"
            value={customerInfo.country}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder={t.country}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">{t.phoneNumber}</Label>
          <Input
            id="phoneNumber"
            value={customerInfo.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder={t.yourPhoneNumber}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="postalCode">{t.postalCode}</Label>
          <Input
            id="postalCode"
            value={customerInfo.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder={t.yourPostalCode}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
