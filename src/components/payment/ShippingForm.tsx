
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { translations } from '@/lib/translations';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    // Auto-format phone number as US number
    if (field === 'phoneNumber') {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      
      // If it starts with 1, keep it, otherwise add +1
      let formattedNumber = '';
      if (digits.length > 0) {
        if (digits.startsWith('1')) {
          formattedNumber = `+${digits}`;
        } else {
          formattedNumber = `+1${digits}`;
        }
        
        // Format as +1 (XXX) XXX-XXXX
        if (formattedNumber.length >= 5) {
          const countryCode = formattedNumber.substring(0, 2);
          const remaining = formattedNumber.substring(2);
          
          if (remaining.length >= 3) {
            const areaCode = remaining.substring(0, 3);
            const rest = remaining.substring(3);
            
            if (rest.length >= 3) {
              const firstPart = rest.substring(0, 3);
              const lastPart = rest.substring(3, 7);
              formattedNumber = `${countryCode} (${areaCode}) ${firstPart}-${lastPart}`;
            } else if (rest.length > 0) {
              formattedNumber = `${countryCode} (${areaCode}) ${rest}`;
            } else {
              formattedNumber = `${countryCode} (${areaCode}`;
            }
          }
        }
      }
      
      onInfoChange({ ...customerInfo, [field]: formattedNumber });
    } else {
      onInfoChange({ ...customerInfo, [field]: value });
    }
  };

  const handleCountryChange = (value: string) => {
    if (value === 'other') {
      toast({
        title: language === 'en' ? 'International Shipping' : 'Envío Internacional',
        description: language === 'en' 
          ? 'We can only ship outside the US if you contact us through Telegram first to arrange international shipping'
          : 'Solo podemos enviar fuera de EE.UU. si nos contactas a través de Telegram primero para organizar el envío internacional',
        variant: "default"
      });
      // Open Telegram
      window.open('https://t.me/+fDDZObF0zjI2M2Y0', '_blank');
      return;
    }
    handleChange('country', value);
  };

  // Set default country to US if not set
  React.useEffect(() => {
    if (!customerInfo.country) {
      onInfoChange({ ...customerInfo, country: 'US' });
    }
  }, []);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">
        {t.shippingInformation}
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">{t.fullName} *</Label>
          <Input
            id="fullName"
            type="text"
            placeholder={t.yourFullName}
            value={customerInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">{t.email} *</Label>
          <Input
            id="email"
            type="email"
            placeholder={t.yourEmail}
            value={customerInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">{t.address} *</Label>
          <Input
            id="address"
            type="text"
            placeholder={t.streetAddress}
            value={customerInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="city">{t.city} *</Label>
          <Input
            id="city"
            type="text"
            placeholder={t.city}
            value={customerInfo.city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="country">{t.country} *</Label>
          <Select value={customerInfo.country || 'US'} onValueChange={handleCountryChange}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'en' ? 'Select country' : 'Seleccionar país'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">🇺🇸 United States</SelectItem>
              <SelectItem value="other">{language === 'en' ? 'Other (Contact Telegram)' : 'Otro (Contactar Telegram)'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="phoneNumber">{t.phoneNumber} *</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={customerInfo.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="postalCode">{t.postalCode} *</Label>
          <Input
            id="postalCode"
            type="text"
            placeholder={t.yourPostalCode}
            value={customerInfo.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
