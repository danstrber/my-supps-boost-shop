
import React from 'react';

interface PaymentMethodInfoProps {
  paymentMethod: 'telegram' | 'bitcoin';
}

const PaymentMethodInfo = ({ paymentMethod }: PaymentMethodInfoProps) => {
  switch (paymentMethod) {
    case 'telegram':
      return (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">
            💬 Telegram Ordering (Recommended)
          </h4>
          <p className="text-blue-700 text-sm mb-3">
            Order directly through our secure Telegram channel for the fastest and most convenient experience.
          </p>
          <ul className="text-blue-700 text-sm space-y-1 mb-4">
            <li>✅ Easy order tracking</li>
            <li>✅ Anonymous ordering</li>
            <li>✅ Direct communication</li>
            <li>✅ 24/7 fast support</li>
            <li>✅ Personal consultation available</li>
            <li>✅ Instant order confirmation</li>
          </ul>
          
          <div className="bg-blue-100 border border-blue-300 p-3 rounded-lg mb-3">
            <h5 className="font-medium text-blue-800 mb-2">
              📋 How it works:
            </h5>
            <ol className="text-blue-700 text-sm space-y-1">
              <li>1. Join our Telegram channel below</li>
              <li>2. Send us your cart details and shipping address</li>
              <li>3. Get instant confirmation and payment instructions</li>
              <li>4. Track your order in real-time</li>
            </ol>
          </div>
          
          {/* Direct Telegram Link */}
          <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg text-center">
            <p className="text-blue-800 font-semibold mb-3">
              Join our Telegram channel to place your order instantly!
            </p>
            <a 
              href="https://t.me/+fDDZObF0zjI2M2Y0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              💬 Join Telegram Channel
            </a>
          </div>
          
          {/* Telegram Benefits Section */}
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">
              🚀 Why Choose Telegram?
            </h5>
            <p className="text-blue-700 text-sm">
              Telegram makes buying easier with instant communication, order tracking, and expert guidance all in one place. Get personalized recommendations and fast support directly from our team.
            </p>
          </div>
        </div>
      );
    case 'bitcoin':
      return (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">
            ₿ Bitcoin Payment
          </h4>
          <p className="text-orange-700 text-sm mb-3">
            Pay securely and anonymously with Bitcoin. Fast, private, and reliable.
          </p>
          <div className="bg-orange-100 border border-orange-300 p-3 rounded-lg mb-3">
            <p className="text-orange-800 font-medium mb-2">Benefits:</p>
            <ul className="text-orange-700 text-sm space-y-1">
              <li>✅ 100% anonymous transactions</li>
              <li>✅ No personal ID verification required</li>
              <li>✅ Secure blockchain verification</li>
              <li>✅ Global accessibility</li>
            </ul>
          </div>
          <p className="text-orange-600 text-xs">
            Complete privacy protection - no personal information required for Bitcoin payments.
          </p>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentMethodInfo;
