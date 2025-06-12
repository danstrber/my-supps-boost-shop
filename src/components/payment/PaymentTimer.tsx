
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface PaymentTimerProps {
  onExpired: () => void;
  language: 'en' | 'es';
}

const PaymentTimer = ({ onExpired, language }: PaymentTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpired]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getWarningColor = () => {
    if (timeLeft < 300) return 'text-red-600'; // Less than 5 minutes
    if (timeLeft < 900) return 'text-orange-600'; // Less than 15 minutes
    return 'text-blue-600';
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
      <div className="flex items-center justify-center space-x-2">
        <Clock className={`h-5 w-5 ${getWarningColor()}`} />
        <span className="font-medium text-gray-700">
          {language === 'en' ? 'Payment expires in:' : 'El pago expira en:'}
        </span>
        <span className={`text-xl font-bold ${getWarningColor()}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        {language === 'en' 
          ? 'Complete your Bitcoin payment within this time to secure your order'
          : 'Completa tu pago de Bitcoin dentro de este tiempo para asegurar tu pedido'
        }
      </p>
    </div>
  );
};

export default PaymentTimer;
