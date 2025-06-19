
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Calendar, DollarSign, ArrowUpDown, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrderHistory } from '@/hooks/useOrderHistory';

interface OrderHistoryProps {
  language: 'en' | 'es';
}

type SortField = 'order_date' | 'final_total' | 'verification_status' | 'order_id';
type SortDirection = 'asc' | 'desc';

const OrderHistory: React.FC<OrderHistoryProps> = ({ language }) => {
  const { orders, loading, refreshOrders } = useOrderHistory();
  const [sortField, setSortField] = useState<SortField>('order_date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const text = {
    en: {
      title: 'Order History',
      noOrders: 'No orders found',
      noOrdersDesc: 'You haven\'t placed any orders yet.',
      orderNumber: '# Order',
      status: 'Status',
      total: 'Total',
      date: 'Date',
      items: 'Items',
      pending: 'Pending Payment',
      verified: 'Payment Verified',
      failed: 'Payment Failed',
      refresh: 'Refresh'
    },
    es: {
      title: 'Historial de Pedidos',
      noOrders: 'No se encontraron pedidos',
      noOrdersDesc: 'Aún no has realizado ningún pedido.',
      orderNumber: '# Pedido',
      status: 'Estado',
      total: 'Total',
      date: 'Fecha',
      items: 'Artículos',
      pending: 'Pago Pendiente',
      verified: 'Pago Verificado',
      failed: 'Pago Fallido',
      refresh: 'Actualizar'
    }
  };

  const t = text[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'verified': return 'text-green-700 bg-green-100 border-green-200';
      case 'failed': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t.pending;
      case 'verified': return t.verified;
      case 'failed': return t.failed;
      default: return status;
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortField) {
      case 'order_date':
        aValue = new Date(a.order_date);
        bValue = new Date(b.order_date);
        break;
      case 'final_total':
        aValue = a.final_total;
        bValue = b.final_total;
        break;
      case 'verification_status':
        aValue = a.verification_status;
        bValue = b.verification_status;
        break;
      case 'order_id':
        aValue = a.order_id;
        bValue = b.order_id;
        break;
      default:
        return 0;
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading orders...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center justify-between text-xl">
          <div className="flex items-center">
            <Package className="h-6 w-6 mr-3 text-blue-600" />
            {t.title}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshOrders}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {t.refresh}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {orders.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.noOrders}</h3>
            <p className="text-gray-500 text-lg">{t.noOrdersDesc}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('order_id')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <span>{t.orderNumber}</span>
                      {getSortIcon('order_id')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('order_date')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{t.date}</span>
                      {getSortIcon('order_date')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('verification_status')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <span>{t.status}</span>
                      {getSortIcon('verification_status')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('final_total')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>{t.total}</span>
                      {getSortIcon('final_total')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">{t.items}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order, index) => (
                  <TableRow key={order.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <TableCell className="font-mono text-sm font-medium">
                      #{order.order_id}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.order_date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.verification_status)}`}>
                        {getStatusText(order.verification_status)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600 text-lg">
                      ${order.final_total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-xs">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-sm">
                            <div className="font-medium text-gray-900 truncate">{item.name}</div>
                            <div className="text-gray-500">
                              Qty: {item.quantity} × ${item.price} = ${item.total.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
