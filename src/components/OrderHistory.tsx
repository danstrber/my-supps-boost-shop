
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Calendar, DollarSign, ArrowUpDown, ArrowUp, ArrowDown, RefreshCw, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';

interface OrderHistoryProps {
  language: 'en' | 'es';
}

type SortField = 'date' | 'total' | 'status' | 'id';
type SortDirection = 'asc' | 'desc';

const OrderHistory: React.FC<OrderHistoryProps> = ({ language }) => {
  const { orders, loading, error, refetch } = useOrders();
  const { toast } = useToast();
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const text = {
    en: {
      title: 'Order History',
      noOrders: 'No orders found',
      noOrdersDesc: 'You haven\'t placed any orders yet.',
      orderNumber: 'Order #',
      status: 'Status',
      total: 'Total',
      date: 'Date',
      items: 'Items',
      verification: 'Verification',
      transaction: 'Transaction',
      refresh: 'Refresh',
      copy: 'Copy',
      copied: 'Copied!',
      viewTransaction: 'View on Blockchain',
      // Status translations
      pending: 'Pending Payment',
      confirmed: 'Payment Confirmed', 
      shipped: 'Shipped',
      delivered: 'Delivered',
      // Verification status
      verified: 'Verified',
      failed: 'Failed',
      pendingVerification: 'Pending'
    },
    es: {
      title: 'Historial de Pedidos',
      noOrders: 'No se encontraron pedidos',
      noOrdersDesc: 'Aún no has realizado ningún pedido.',
      orderNumber: 'Pedido #',
      status: 'Estado',
      total: 'Total',
      date: 'Fecha',
      items: 'Artículos',
      verification: 'Verificación',
      transaction: 'Transacción',
      refresh: 'Actualizar',
      copy: 'Copiar',
      copied: '¡Copiado!',
      viewTransaction: 'Ver en Blockchain',
      // Status translations
      pending: 'Pago Pendiente',
      confirmed: 'Pago Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregado',
      // Verification status
      verified: 'Verificado',
      failed: 'Fallido',
      pendingVerification: 'Pendiente'
    }
  };

  const t = text[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getVerificationText = (status: string) => {
    switch (status) {
      case 'verified': return t.verified;
      case 'failed': return t.failed;
      case 'pending': return t.pendingVerification;
      default: return status;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: t.copied,
        description: text,
        duration: 2000,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
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

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Package className="h-6 w-6 mr-3 text-blue-600" />
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl">
            <Package className="h-6 w-6 mr-3 text-blue-600" />
            {t.title}
          </CardTitle>
          <Button
            onClick={refetch}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t.refresh}
          </Button>
        </div>
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
                  <TableHead className="font-semibold min-w-[120px]">
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
                  <TableHead className="font-semibold min-w-[120px]">
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
                  <TableHead className="font-semibold min-w-[120px]">
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
                  <TableHead className="font-semibold min-w-[100px]">{t.verification}</TableHead>
                  <TableHead className="font-semibold min-w-[100px]">
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
                  <TableHead className="font-semibold min-w-[200px]">{t.items}</TableHead>
                  <TableHead className="font-semibold min-w-[150px]">{t.transaction}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order, index) => (
                  <TableRow key={order.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <TableCell className="font-mono text-sm font-medium">
                      #{order.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(order.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} border`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getVerificationColor(order.verification_status)} border`}>
                        {getVerificationText(order.verification_status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600 text-lg">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-xs">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-sm">
                            <div className="font-medium text-gray-900 truncate">{item.product.name}</div>
                            <div className="text-gray-500">
                              Qty: {item.quantity} × ${item.product.price} = ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.transaction_hash ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                              {order.transaction_hash.slice(0, 12)}...
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(order.transaction_hash!)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`https://blockstream.info/tx/${order.transaction_hash}`, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {t.viewTransaction}
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
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
