
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
  
  if (paymentMethod === 'telegram') return null;

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold text-gray-900 mb-4">
        {t.shippingInformation}
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">
            {t.fullName} *
          </Label>
          <Input
            id="fullName"
            value={customerInfo.fullName}
            onChange={(e) => onInfoChange({...customerInfo, fullName: e.target.value})}
            required
            placeholder={t.yourFullName}
          />
        </div>
        
        <div>
          <Label htmlFor="email">
            {t.email} *
          </Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => onInfoChange({...customerInfo, email: e.target.value})}
            required
            placeholder={t.yourEmail}
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="address">
            {t.address} *
          </Label>
          <Input
            id="address"
            value={customerInfo.address}
            onChange={(e) => onInfoChange({...customerInfo, address: e.target.value})}
            required
            placeholder={t.streetAddress}
          />
        </div>
        
        <div>
          <Label htmlFor="city">
            {t.city} *
          </Label>
          <Input
            id="city"
            value={customerInfo.city}
            onChange={(e) => onInfoChange({...customerInfo, city: e.target.value})}
            required
            placeholder={t.city}
          />
        </div>
        
        <div>
          <Label htmlFor="country">
            {t.country} *
          </Label>
          <Input
            id="country"
            value={customerInfo.country}
            onChange={(e) => onInfoChange({...customerInfo, country: e.target.value})}
            required
            placeholder={t.country}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
