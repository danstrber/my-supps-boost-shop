
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

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "MySupps <orders@mysupp.store>",
      to: ["christhomaso083@proton.me"],
      subject: `New Order #${orderId.slice(0, 8)} - $${orderData.final_total.toFixed(2)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">New Order Received!</h1>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3>Order Summary</h3>
            <p><strong>Order ID:</strong> #${orderId.slice(0, 8)}</p>
            <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
            <p><strong>Total Amount:</strong> $${orderData.final_total.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> ${orderData.payment_method.charAt(0).toUpperCase() + orderData.payment_method.slice(1)}</p>
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

          <h3>Customer Information</h3>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${orderData.payment_details.customer_info.phone || 'Not provided'}</p>
            <p><strong>Address:</strong><br>
              ${orderData.payment_details.customer_info.address}<br>
              ${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.postalCode}<br>
              ${orderData.payment_details.customer_info.country}
            </p>
          </div>

          <p style="margin-top: 20px; padding: 15px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <strong>Action Required:</strong> Please process this order and update the status in your system.
          </p>
        </div>
      `,
    });

    console.log("Order confirmation emails sent:", { customerEmailResponse, adminEmailResponse });

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
