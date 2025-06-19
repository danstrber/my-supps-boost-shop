
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Package, Bitcoin, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';

interface OrderHistoryProps {
  language: 'en' | 'es';
}

const OrderHistory = ({ language }: OrderHistoryProps) => {
  const { orders, loading, error } = useOrders();

  const text = {
    en: {
      title: 'Order History',
      noOrders: 'No orders found',
      noOrdersDesc: 'You haven\'t placed any orders yet. Start shopping to see your order history here.',
      loading: 'Loading your orders...',
      error: 'Failed to load orders',
      orderId: 'Order ID',
      date: 'Date',
      total: 'Total',
      status: 'Status',
      verification: 'Verification',
      items: 'Items',
      transactionId: 'Transaction ID',
      pending: 'Pending',
      confirmed: 'Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered',
      verified: 'Verified',
      failed: 'Failed'
    },
    es: {
      title: 'Historial de Pedidos',
      noOrders: 'No se encontraron pedidos',
      noOrdersDesc: 'Aún no has realizado ningún pedido. Comienza a comprar para ver tu historial de pedidos aquí.',
      loading: 'Cargando tus pedidos...',
      error: 'Error al cargar pedidos',
      orderId: 'ID del Pedido',
      date: 'Fecha',
      total: 'Total',
      status: 'Estado',
      verification: 'Verificación',
      items: 'Artículos',
      transactionId: 'ID de Transacción',
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregado',
      verified: 'Verificado',
      failed: 'Fallido'
    }
  };

  const t = text[language];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'shipped':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800'
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.pending}>
        {getStatusIcon(status)}
        <span className="ml-1">{t[status as keyof typeof t] || status}</span>
      </Badge>
    );
  };

  const getVerificationBadge = (status: string) => {
    const verificationColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={verificationColors[status as keyof typeof verificationColors] || verificationColors.pending}>
        {getVerificationIcon(status)}
        <span className="ml-1">{t[status as keyof typeof t] || status}</span>
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-2">{t.loading}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{t.error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noOrders}</h3>
            <p className="text-gray-500">{t.noOrdersDesc}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="h-5 w-5 mr-2" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                  <span className="font-medium text-sm text-gray-600">{t.orderId}:</span>
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {order.id.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">{t.total}:</span>
                  <div className="text-lg font-bold text-green-600">${order.total.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">{t.status}:</span>
                  <div className="mt-1">{getStatusBadge(order.status)}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">{t.verification}:</span>
                  <div className="mt-1">{getVerificationBadge(order.verification_status)}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">{t.items}:</span>
                  <div className="text-sm text-gray-800">{order.items.length} item(s)</div>
                </div>
              </div>

              {order.transaction_hash && (
                <div className="flex items-center space-x-2 text-sm">
                  <Bitcoin className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-600">{t.transactionId}:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border text-xs">
                    {order.transaction_hash.slice(0, 16)}...
                  </span>
                </div>
              )}

              <div className="mt-3 border-t pt-3">
                <div className="text-sm text-gray-600 mb-2">{t.items}:</div>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
