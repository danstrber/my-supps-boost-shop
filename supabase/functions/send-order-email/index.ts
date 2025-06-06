
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
    final_total: number;
    payment_method: string;
    payment_details: {
      customer_info: {
        fullName: string;
        email: string;
        address: string;
        city: string;
        country: string;
      };
    };
  };
  customerEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, orderData, customerEmail }: OrderEmailRequest = await req.json();

    // Format items list
    const itemsList = orderData.items.products.map(item => 
      `${item.name} x${item.quantity} - $${item.total.toFixed(2)}`
    ).join('<br>');

    // Customer confirmation email
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #16a34a;">Order Confirmation</h1>
        <p>Thank you for your order! Here are the details:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order #${orderId.slice(0, 8)}</h3>
          <p><strong>Total:</strong> $${orderData.final_total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${orderData.payment_method.charAt(0).toUpperCase() + orderData.payment_method.slice(1)}</p>
          
          <h4>Items Ordered:</h4>
          <div style="margin: 10px 0;">
            ${itemsList}
          </div>
          
          <h4>Shipping Address:</h4>
          <p>
            ${orderData.payment_details.customer_info.fullName}<br>
            ${orderData.payment_details.customer_info.address}<br>
            ${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.country}
          </p>
        </div>
        
        <p>We'll send you payment instructions shortly. Thank you for choosing MySupps!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Questions? Contact us at christhomaso083@proton.me or on Telegram @DANSTRBER
          </p>
        </div>
      </div>
    `;

    // Admin notification email
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">🛒 NEW ORDER RECEIVED!</h1>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3>Order #${orderId.slice(0, 8)}</h3>
          <p><strong>Total:</strong> $${orderData.final_total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${orderData.payment_method.charAt(0).toUpperCase() + orderData.payment_method.slice(1)}</p>
          
          <h4>Customer:</h4>
          <p>
            ${orderData.payment_details.customer_info.fullName}<br>
            ${orderData.payment_details.customer_info.email}
          </p>
          
          <h4>Shipping Address:</h4>
          <p>
            ${orderData.payment_details.customer_info.address}<br>
            ${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.country}
          </p>
          
          <h4>Items:</h4>
          <div style="margin: 10px 0;">
            ${itemsList}
          </div>
        </div>
        
        <p style="color: #dc2626; font-weight: bold;">⚡ ACTION REQUIRED: Process this order!</p>
      </div>
    `;

    // Send customer confirmation
    const customerEmail = await resend.emails.send({
      from: "MySupps <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Order Confirmation #${orderId.slice(0, 8)}`,
      html: customerEmailHtml,
    });

    // Send admin notification
    const adminEmail = await resend.emails.send({
      from: "MySupps Orders <onboarding@resend.dev>",
      to: ["christhomaso083@proton.me"], // Your admin email
      subject: `🛒 NEW ORDER #${orderId.slice(0, 8)} - $${orderData.final_total.toFixed(2)}`,
      html: adminEmailHtml,
    });

    console.log("Emails sent:", { customerEmail, adminEmail });

    return new Response(JSON.stringify({ 
      success: true, 
      customerEmail, 
      adminEmail 
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
