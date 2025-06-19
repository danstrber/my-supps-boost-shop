
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Calendar, DollarSign, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}

type SortField = 'date' | 'total' | 'status' | 'id';
type SortDirection = 'asc' | 'desc';

const OrderHistory: React.FC<OrderHistoryProps> = ({ language }) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Mock orders data that would come from Formspree webhooks or API
  const mockOrders: Order[] = [
    {
      id: 'ORD-1234567890-123',
      date: '2024-01-15',
      total: 142.50,
      status: 'delivered',
      items: [
        { name: 'MK-677 (Ibutamoren)', quantity: 1, price: 45 },
        { name: 'Clenbuterol', quantity: 2, price: 45 }
      ]
    },
    {
      id: 'ORD-1234567891-124',
      date: '2024-01-10',
      total: 97.50,
      status: 'pending',
      items: [
        { name: 'Aromasin (Exemestane)', quantity: 1, price: 45 },
        { name: 'MK-677 (Ibutamoren)', quantity: 1, price: 45 }
      ]
    }
  ];

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
      confirmed: 'Payment Confirmed',
      shipped: 'Shipped',
      delivered: 'Delivered'
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
      confirmed: 'Pago Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregado'
    }
  };

  const t = text[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'confirmed': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'shipped': return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'delivered': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
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

  const sortedOrders = [...mockOrders].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortField) {
      case 'date':
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case 'total':
        aValue = a.total;
        bValue = b.total;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'id':
        aValue = a.id;
        bValue = b.id;
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

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center text-xl">
          <Package className="h-6 w-6 mr-3 text-blue-600" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {mockOrders.length === 0 ? (
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
                      onClick={() => handleSort('id')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <span>{t.orderNumber}</span>
                      {getSortIcon('id')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('date')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>{t.date}</span>
                      {getSortIcon('date')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('status')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <span>{t.status}</span>
                      {getSortIcon('status')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('total')}
                      className="flex items-center space-x-1 hover:bg-gray-100"
                    >
                      <DollarSign className="h-4 w-4" />
                      <span>{t.total}</span>
                      {getSortIcon('total')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">{t.items}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order, index) => (
                  <TableRow key={order.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <TableCell className="font-mono text-sm font-medium">
                      #{order.id}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600 text-lg">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-xs">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-sm">
                            <div className="font-medium text-gray-900 truncate">{item.name}</div>
                            <div className="text-gray-500">
                              Qty: {item.quantity} × ${item.price} = ${(item.price * item.quantity).toFixed(2)}
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
