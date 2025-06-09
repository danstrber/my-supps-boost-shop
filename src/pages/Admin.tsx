
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { confirmPurchase } from '@/lib/purchase-tracking';
import Header from '@/components/Header';

interface Order {
  id: string;
  user_id: string;
  items: any;
  original_total: number;
  discount_amount: number;
  shipping_fee: number;
  final_total: number;
  payment_method: string;
  payment_details: any;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async (orderId: string) => {
    try {
      // Update order status in database
      const { error } = await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('id', orderId);

      if (error) throw error;

      // Confirm purchase (updates user spending)
      const success = await confirmPurchase(orderId);
      
      if (success) {
        toast({
          title: "Success",
          description: "Order confirmed and user spending updated!"
        });
        fetchOrders(); // Refresh the list
      } else {
        toast({
          title: "Warning",
          description: "Order status updated but spending tracking failed"
        });
      }
    } catch (error: any) {
      console.error('Error confirming order:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'rejected' })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Order rejected"
      });
      fetchOrders();
    } catch (error: any) {
      console.error('Error rejecting order:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          language="en"
          onLanguageChange={() => {}}
          cartItemCount={0}
          isAuthenticated={false}
          onAuthAction={() => {}}
          onCartOpen={() => {}}
          onMenuToggle={() => {}}
          currentPage="home"
          onPageChange={() => {}}
          sidebarOpen={false}
        />
        <div className="pt-32 px-4 flex items-center justify-center">
          <div className="text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language="en"
        onLanguageChange={() => {}}
        cartItemCount={0}
        isAuthenticated={false}
        onAuthAction={() => {}}
        onCartOpen={() => {}}
        onMenuToggle={() => {}}
        currentPage="home"
        onPageChange={() => {}}
        sidebarOpen={false}
      />
      
      <main className="pt-32 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order Management</h1>
        
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
                    <p className="text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()} at{' '}
                      {new Date(order.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Customer Info:</h4>
                    <p className="text-sm text-gray-600">
                      Email: {order.payment_details?.customer_info?.email || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Name: {order.payment_details?.customer_info?.fullName || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment: {order.payment_method}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Order Summary:</h4>
                    <p className="text-sm text-gray-600">
                      Subtotal: ${order.original_total.toFixed(2)}
                    </p>
                    {order.discount_amount > 0 && (
                      <p className="text-sm text-green-600">
                        Discount: -${order.discount_amount.toFixed(2)}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      Shipping: ${order.shipping_fee.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold">
                      Total: ${order.final_total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Items:</h4>
                  <div className="space-y-1">
                    {order.items?.products?.map((item: any, index: number) => (
                      <div key={index} className="text-sm text-gray-600 flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.status === 'pending' && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => handleConfirmOrder(order.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Confirm Order
                    </Button>
                    <Button
                      onClick={() => handleRejectOrder(order.id)}
                      variant="destructive"
                    >
                      Reject Order
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
