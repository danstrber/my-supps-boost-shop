
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  finalTotal: number;
  paymentMethod: string;
  shippingAddress: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📧 Processing order confirmation email request...');

    // Get the Resend API key from Supabase secrets
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const orderData: OrderEmailRequest = await req.json();
    console.log('📦 Order data received:', { orderId: orderData.orderId, customerEmail: orderData.customerEmail });

    // Import Resend dynamically to avoid import issues
    const { Resend } = await import("npm:resend@2.0.0");
    const resend = new Resend(resendApiKey);

    const itemsHtml = orderData.items.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.total.toFixed(2)}</td>
      </tr>`
    ).join('');

    const emailHtml = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Order Confirmation</h1>
          <p style="color: white; margin: 10px 0 0 0;">Thank you for your purchase!</p>
        </div>
        
        <div style="padding: 20px; background: white;">
          <h2 style="color: #333;">Hi ${orderData.customerName},</h2>
          <p>Your order has been confirmed and is being processed. Here are the details:</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Order #${orderData.orderId}</h3>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
            <p style="margin: 5px 0;"><strong>Total:</strong> $${orderData.finalTotal.toFixed(2)}</p>
          </div>
          
          <h3 style="color: #333;">Order Items:</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #2d5a2d;">Shipping Address:</h3>
            <p style="margin: 0; white-space: pre-line;">${orderData.shippingAddress}</p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="margin: 0 0 10px 0; color: #856404;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Your order will be processed within 24 hours</li>
              <li>You'll receive a tracking number once shipped</li>
              <li>Estimated delivery: 5-10 business days</li>
            </ul>
          </div>
          
          <p style="margin: 20px 0 0 0;">If you have any questions, please don't hesitate to contact our support team.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">Thank you for choosing MySupps!</p>
          </div>
        </div>
      </div>
    `;

    console.log('📤 Sending confirmation email to:', orderData.customerEmail);

    const emailResponse = await resend.emails.send({
      from: "MySupps <orders@resend.dev>", // You'll need to configure this domain
      to: [orderData.customerEmail],
      subject: `Order Confirmation #${orderData.orderId} - $${orderData.finalTotal.toFixed(2)}`,
      html: emailHtml,
    });

    console.log('✅ Email sent successfully:', emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("❌ Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
