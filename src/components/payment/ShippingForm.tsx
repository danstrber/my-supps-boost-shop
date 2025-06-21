
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { countries } from '@/lib/countries';

const shippingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province is required'),
  zipCode: z.string().min(1, 'ZIP/Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  isLoading?: boolean;
  language: 'en' | 'es';
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, isLoading, language }) => {
  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  const t = {
    en: {
      title: 'Shipping Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Street Address',
      city: 'City',
      state: 'State/Province',
      zipCode: 'ZIP/Postal Code',
      country: 'Country',
      selectCountry: 'Select a country',
      continue: 'Continue to Payment',
    },
    es: {
      title: 'Información de Envío',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      address: 'Dirección',
      city: 'Ciudad',
      state: 'Estado/Provincia',
      zipCode: 'Código Postal',
      country: 'País',
      selectCountry: 'Selecciona un país',
      continue: 'Continuar al Pago',
    },
  };

  const labels = t[language];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{labels.title}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">{labels.firstName}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      placeholder={labels.firstName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">{labels.lastName}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      placeholder={labels.lastName}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{labels.email}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={labels.email}
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
                  <FormLabel htmlFor="phone">{labels.phone}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={labels.phone}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="address">{labels.address}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    placeholder={labels.address}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="city">{labels.city}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      placeholder={labels.city}
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
                  <FormLabel htmlFor="state">{labels.state}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      placeholder={labels.state}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="zipCode">{labels.zipCode}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="zipCode"
                      name="zipCode"
                      autoComplete="postal-code"
                      placeholder={labels.zipCode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="country">{labels.country}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} name="country">
                  <FormControl>
                    <SelectTrigger id="country">
                      <SelectValue placeholder={labels.selectCountry} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : labels.continue}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShippingForm;
