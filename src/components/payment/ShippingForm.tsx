
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';

interface ShippingFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ShippingFormProps {
  form: UseFormReturn<ShippingFormData>;
  language: 'en' | 'es';
}

const ShippingForm: React.FC<ShippingFormProps> = ({ form, language }) => {
  const labels = {
    en: {
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Street Address',
      city: 'City',
      state: 'State/Province',
      zipCode: 'ZIP/Postal Code',
      country: 'Country',
      selectCountry: 'Select a country'
    },
    es: {
      fullName: 'Nombre Completo',
      email: 'Dirección de Email',
      phone: 'Número de Teléfono',
      address: 'Dirección',
      city: 'Ciudad',
      state: 'Estado/Provincia',
      zipCode: 'Código Postal',
      country: 'País',
      selectCountry: 'Selecciona un país'
    }
  };

  const l = labels[language];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{l.fullName}</FormLabel>
            <FormControl>
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                placeholder={l.fullName}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{l.email}</FormLabel>
            <FormControl>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={l.email}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{l.phone}</FormLabel>
            <FormControl>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder={l.phone}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{l.address}</FormLabel>
            <FormControl>
              <Input
                id="address"
                name="address"
                autoComplete="street-address"
                placeholder={l.address}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{l.city}</FormLabel>
              <FormControl>
                <Input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  placeholder={l.city}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{l.state}</FormLabel>
              <FormControl>
                <Input
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  placeholder={l.state}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{l.zipCode}</FormLabel>
              <FormControl>
                <Input
                  id="zipCode"
                  name="zipCode"
                  autoComplete="postal-code"
                  placeholder={l.zipCode}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{l.country}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="country" name="country">
                    <SelectValue placeholder={l.selectCountry} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ShippingForm;
