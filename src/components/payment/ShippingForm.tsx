
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { FormData } from './types';

interface ShippingFormProps {
  form: UseFormReturn<FormData>;
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
            <FormLabel htmlFor="shipping-fullName">{l.fullName}</FormLabel>
            <FormControl>
              <Input
                id="shipping-fullName"
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
            <FormLabel htmlFor="shipping-email">{l.email}</FormLabel>
            <FormControl>
              <Input
                id="shipping-email"
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
            <FormLabel htmlFor="shipping-phone">{l.phone}</FormLabel>
            <FormControl>
              <Input
                id="shipping-phone"
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
            <FormLabel htmlFor="shipping-address">{l.address}</FormLabel>
            <FormControl>
              <Input
                id="shipping-address"
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
              <FormLabel htmlFor="shipping-city">{l.city}</FormLabel>
              <FormControl>
                <Input
                  id="shipping-city"
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
              <FormLabel htmlFor="shipping-state">{l.state}</FormLabel>
              <FormControl>
                <Input
                  id="shipping-state"
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
              <FormLabel htmlFor="shipping-zipCode">{l.zipCode}</FormLabel>
              <FormControl>
                <Input
                  id="shipping-zipCode"
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
              <FormLabel htmlFor="shipping-country">{l.country}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id="shipping-country" name="country">
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
