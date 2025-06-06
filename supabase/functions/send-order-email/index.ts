
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  orderId: string;
  orderData: {
    items: {
      products: Array<{
        name: string;
        price: number;
        quantity: number;
        total: number;
      }>;
    };
    original_total: number;
    discount_amount: number;
    shipping_fee: number;
    final_total: number;
    payment_method: string;
    payment_details: {
      customer_info: {
        fullName: string;
        email: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phone?: string;
        paypalName?: string;
        txid?: string;
      };
    };
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, orderData }: OrderEmailRequest = await req.json();
    const customerEmail = orderData.payment_details.customer_info.email;
    const customerName = orderData.payment_details.customer_info.fullName;

    // Generate items list HTML
    const itemsHtml = orderData.items.products.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.total.toFixed(2)}</td>
      </tr>
    `).join('');

    // Generate payment verification info
    const paymentVerification = orderData.payment_method === 'paypal' 
      ? `<p><strong>PayPal Name:</strong> ${orderData.payment_details.customer_info.paypalName || 'Not provided'}</p>`
      : (orderData.payment_method === 'bitcoin' || orderData.payment_method === 'solana')
      ? `<p><strong>Transaction ID:</strong> ${orderData.payment_details.customer_info.txid || 'Not provided'}</p>`
      : '';

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "MySupps <orders@mysupp.store>",
      to: [customerEmail],
      subject: `Order Confirmation #${orderId.slice(0, 8)} - MySupps`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Order Confirmation</h1>
          <p>Hi ${customerName},</p>
          <p>Thank you for your order! We've received your order and will process it shortly.</p>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${orderId.slice(0, 8)}</p>
            <p><strong>Payment Method:</strong> ${orderData.payment_method.charAt(0).toUpperCase() + orderData.payment_method.slice(1)}</p>
            ${paymentVerification}
          </div>

          <h3>Items Ordered</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #d1d5db;">Product</th>
                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #d1d5db;">Qty</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Price</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <div style="display: flex; justify-content: space-between; margin: 8px 0;">
              <span>Subtotal:</span>
              <span>$${orderData.original_total.toFixed(2)}</span>
            </div>
            ${orderData.discount_amount > 0 ? `
            <div style="display: flex; justify-content: space-between; margin: 8px 0; color: #16a34a;">
              <span>Discount:</span>
              <span>-$${orderData.discount_amount.toFixed(2)}</span>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin: 8px 0;">
              <span>Shipping:</span>
              <span>$${orderData.shipping_fee.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 8px 0; font-weight: bold; font-size: 18px; border-top: 2px solid #d1d5db; padding-top: 8px;">
              <span>Total:</span>
              <span style="color: #16a34a;">$${orderData.final_total.toFixed(2)}</span>
            </div>
          </div>

          <h3>Shipping Address</h3>
          <p>
            ${customerName}<br>
            ${orderData.payment_details.customer_info.address}<br>
            ${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.postalCode}<br>
            ${orderData.payment_details.customer_info.country}
          </p>

          <p style="margin-top: 30px;">
            We'll send you a shipping confirmation email when your order is on its way.
          </p>

          <p>Best regards,<br>The MySupps Team</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center; color: #6b7280;">
            <p>Questions? Contact us at christhomaso083@proton.me</p>
          </div>
        </div>
      `,
    });

    // Send detailed admin notification with all shipping info
    const adminEmailResponse = await resend.emails.send({
      from: "MySupps <orders@mysupp.store>",
      to: ["christhomaso083@proton.me"],
      subject: `🚨 NEW ORDER #${orderId.slice(0, 8)} - $${orderData.final_total.toFixed(2)} - ${orderData.payment_method.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h1 style="color: #dc2626; border-bottom: 3px solid #dc2626; padding-bottom: 10px;">🚨 NEW ORDER ALERT!</h1>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3>⚡ URGENT: Order Ready for Processing</h3>
            <div style="background: white; padding: 15px; border-radius: 6px; margin-top: 10px;">
              <p><strong>Order ID:</strong> #${orderId.slice(0, 8)}</p>
              <p><strong>Total Amount:</strong> <span style="color: #16a34a; font-size: 18px; font-weight: bold;">$${orderData.final_total.toFixed(2)}</span></p>
              <p><strong>Payment Method:</strong> <span style="background: #fbbf24; padding: 2px 6px; border-radius: 4px;">${orderData.payment_method.toUpperCase()}</span></p>
              ${paymentVerification}
            </div>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <h3>📦 SHIPPING INFORMATION (Copy This!)</h3>
            <div style="background: white; padding: 15px; border-radius: 6px; font-family: monospace;">
              <strong>SHIP TO:</strong><br>
              ${customerName}<br>
              ${orderData.payment_details.customer_info.address}<br>
              ${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.postalCode}<br>
              ${orderData.payment_details.customer_info.country}<br>
              <br>
              <strong>Contact:</strong><br>
              Email: ${customerEmail}<br>
              Phone: ${orderData.payment_details.customer_info.phone || 'Not provided'}
            </div>
          </div>

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3>📋 ITEMS TO SHIP</h3>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #d1d5db;">Product</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #d1d5db;">Qty</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Price</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #d1d5db;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr style="background: #f9fafb; font-weight: bold;">
                  <td style="padding: 12px;" colspan="3">TOTAL TO COLLECT:</td>
                  <td style="padding: 12px; text-align: right; color: #16a34a; font-size: 18px;">$${orderData.final_total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3>🎯 ACTION REQUIRED</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><strong>Verify Payment:</strong> ${orderData.payment_method === 'paypal' ? 'Check PayPal for payment from ' + (orderData.payment_details.customer_info.paypalName || 'customer') : 
                (orderData.payment_method === 'bitcoin' || orderData.payment_method === 'solana') ? 'Verify transaction ID: ' + (orderData.payment_details.customer_info.txid || 'pending') : 
                'Customer will complete payment via Telegram'}</li>
              <li><strong>Prepare Package:</strong> Gather all items listed above</li>
              <li><strong>Print Label:</strong> Use shipping address provided</li>
              <li><strong>Update Status:</strong> Mark as shipped in system</li>
              <li><strong>Send Tracking:</strong> Email customer with tracking info</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #1f2937; color: white; border-radius: 8px;">
            <h3 style="color: #fbbf24;">⏰ PROCESS THIS ORDER NOW!</h3>
            <p style="margin: 0;">Time received: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    console.log("Order emails sent:", { customerEmailResponse, adminEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      customerEmail: customerEmailResponse,
      adminEmail: adminEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
