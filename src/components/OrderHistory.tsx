
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Calendar, DollarSign } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface OrderHistoryProps {
  language: 'en' | 'es';
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ language, orders }) => {
  const text = {
    en: {
      title: 'Order History',
      noOrders: 'No orders found',
      noOrdersDesc: 'You haven\'t placed any orders yet.',
      orderNumber: 'Order',
      status: 'Status',
      total: 'Total',
      date: 'Date',
      items: 'Items',
      pending: 'Pending Payment',
      confirmed: 'Payment Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered'
    },
    es: {
      title: 'Historial de Pedidos',
      noOrders: 'No se encontraron pedidos',
      noOrdersDesc: 'Aún no has realizado ningún pedido.',
      orderNumber: 'Pedido',
      status: 'Estado',
      total: 'Total',
      date: 'Fecha',
      items: 'Artículos',
      pending: 'Pago Pendiente',
      confirmed: 'Pago Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregado'
    }
  };

  const t = text[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t.pending;
      case 'confirmed': return t.confirmed;
      case 'shipped': return t.shipped;
      case 'delivered': return t.delivered;
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="h-5 w-5 mr-2" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noOrders}</h3>
            <p className="text-gray-500">{t.noOrdersDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <span className="font-mono text-sm font-medium">#{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {order.date}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">{t.items}:</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
