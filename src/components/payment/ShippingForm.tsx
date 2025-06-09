
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  paymentMethod: 'telegram' | 'bitcoin' | 'solana' | 'email';
}

const ShippingForm = ({ customerInfo, onInfoChange, paymentMethod }: ShippingFormProps) => {
  if (paymentMethod === 'telegram') return null;

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold text-gray-900 mb-4">Shipping Information</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={customerInfo.fullName}
            onChange={(e) => onInfoChange({...customerInfo, fullName: e.target.value})}
            required
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => onInfoChange({...customerInfo, email: e.target.value})}
            required
            placeholder="your@email.com"
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={customerInfo.address}
            onChange={(e) => onInfoChange({...customerInfo, address: e.target.value})}
            required
            placeholder="Street address"
          />
        </div>
        
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={customerInfo.city}
            onChange={(e) => onInfoChange({...customerInfo, city: e.target.value})}
            required
            placeholder="City"
          />
        </div>
        
        <div>
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={customerInfo.country}
            onChange={(e) => onInfoChange({...customerInfo, country: e.target.value})}
            required
            placeholder="Country"
          />
        </div>
      </div>

      {/* Payment-specific fields */}
      {(paymentMethod === 'bitcoin' || paymentMethod === 'solana') && (
        <div className="mt-4">
          <Label htmlFor="txid">Transaction ID (TXID) *</Label>
          <Input
            id="txid"
            value={customerInfo.txid}
            onChange={(e) => onInfoChange({...customerInfo, txid: e.target.value})}
            required
            placeholder="Enter transaction ID after payment"
          />
          <p className="text-xs text-gray-600 mt-1">
            You can submit this after receiving payment instructions
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
