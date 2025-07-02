import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { countries } from '@/lib/countries';
import { UserProfile } from '@/lib/auth';

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
  userProfile: UserProfile;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, isLoading, language, userProfile }) => {
  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: userProfile.email || '',
      country: userProfile.country || '',
    }
  });

  // Set the country field to be readonly and match user's profile
  useEffect(() => {
    if (userProfile.country) {
      form.setValue('country', userProfile.country);
    }
  }, [userProfile.country, form]);

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
      continue: 'Continue to Payment',
      countryNote: 'Country matches your profile and cannot be changed here.',
      phoneNote: '⚠️ Please include your country code (e.g., +1 for US, +44 for UK)',
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
      continue: 'Continuar al Pago',
      countryNote: 'El país coincide con tu perfil y no se puede cambiar aquí.',
      phoneNote: '⚠️ Por favor incluye tu código de país (ej: +1 para US, +44 para UK)',
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
                      readOnly
                      className="bg-gray-100"
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
                      placeholder={language === 'en' ? "+1 234 567 8900" : "+1 234 567 8900"}
                    />
                  </FormControl>
                  <p className="text-sm text-orange-600 mt-1 font-medium">{labels.phoneNote}</p>
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
                <FormControl>
                  <Input
                    {...field}
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    placeholder={labels.country}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormControl>
                <p className="text-sm text-gray-600 mt-1">{labels.countryNote}</p>
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
