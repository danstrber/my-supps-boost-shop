
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
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia',
    'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
    'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
    'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada',
    'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
    'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
    'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
    'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
    'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
    'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
    'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
    'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
    'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
    'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
    'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
    'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
    'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
    'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
    'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
    'Zambia', 'Zimbabwe'
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
            <SelectTrigger id="shipping-country" name="country" className="bg-white z-50">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60">
              {countries.map((country) => (
                <SelectItem 
                  key={country} 
                  value={country}
                  className="hover:bg-gray-100 cursor-pointer py-2 px-3"
                >
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
          placeholder="+1 555-123-4567"
        />
        <p className="text-xs text-gray-500 mt-1">
          {language === 'en' 
            ? 'Please include the correct country code before your phone number'
            : 'Por favor incluye el código de país correcto antes de tu número de teléfono'
          }
        </p>
      </div>
    </div>
  );
};

export default ShippingForm;
