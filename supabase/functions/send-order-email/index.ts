
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
      paypal_name?: string;
      txid?: string;
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

    // Payment details for admin
    let paymentInfo = `Payment Method: ${orderData.payment_method.charAt(0).toUpperCase() + orderData.payment_method.slice(1)}`;
    if (orderData.payment_details.paypal_name) {
      paymentInfo += `<br>PayPal Name: ${orderData.payment_details.paypal_name}`;
    }
    if (orderData.payment_details.txid) {
      paymentInfo += `<br>TXID: ${orderData.payment_details.txid}`;
    }

    // Customer confirmation email
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; margin: 0; font-size: 28px;">✅ Order Confirmed!</h1>
            <p style="color: #6b7280; margin: 10px 0;">Thank you for choosing MySupps</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 25px; border-radius: 10px; margin: 25px 0;">
            <h3 style="color: #374151; margin: 0 0 15px 0;">Order #${orderId.slice(0, 8)}</h3>
            <p style="margin: 8px 0;"><strong>Total:</strong> <span style="color: #16a34a; font-size: 18px;">$${orderData.final_total.toFixed(2)}</span></p>
            <p style="margin: 8px 0;"><strong>Payment Method:</strong> ${orderData.payment_method.charAt(0).toUpperCase() + orderData.payment_method.slice(1)}</p>
            
            <h4 style="color: #374151; margin: 20px 0 10px 0;">Items Ordered:</h4>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a;">
              ${itemsList}
            </div>
            
            <h4 style="color: #374151; margin: 20px 0 10px 0;">Shipping Address:</h4>
            <div style="background: white; padding: 15px; border-radius: 8px;">
              <strong>${orderData.payment_details.customer_info.fullName}</strong><br>
              ${orderData.payment_details.customer_info.address}<br>
              ${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.country}
            </div>
          </div>
          
          <div style="text-align: center; background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #065f46; font-weight: 500;">
              🚀 We'll send you payment instructions shortly.<br>
              Thank you for choosing MySupps for your research needs!
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              Questions? Contact us at <a href="mailto:christhomaso083@proton.me" style="color: #16a34a;">christhomaso083@proton.me</a><br>
              or on Telegram <a href="https://t.me/DANSTRBER" style="color: #16a34a;">@DANSTRBER</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Admin notification email
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fef2f2; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626; margin: 0; font-size: 28px;">🛒 NEW ORDER ALERT!</h1>
            <p style="color: #6b7280; margin: 10px 0;">Action required - Process this order</p>
          </div>
          
          <div style="background: #fef2f2; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #dc2626;">
            <h3 style="color: #dc2626; margin: 0 0 15px 0;">Order #${orderId.slice(0, 8)}</h3>
            <p style="margin: 8px 0;"><strong>Total:</strong> <span style="color: #dc2626; font-size: 20px; font-weight: bold;">$${orderData.final_total.toFixed(2)}</span></p>
            <div style="margin: 15px 0;">
              ${paymentInfo}
            </div>
            
            <h4 style="color: #374151; margin: 20px 0 10px 0;">Customer Information:</h4>
            <div style="background: white; padding: 15px; border-radius: 8px;">
              <strong>${orderData.payment_details.customer_info.fullName}</strong><br>
              📧 ${orderData.payment_details.customer_info.email}
            </div>
            
            <h4 style="color: #374151; margin: 20px 0 10px 0;">Shipping Address:</h4>
            <div style="background: white; padding: 15px; border-radius: 8px;">
              ${orderData.payment_details.customer_info.address}<br>
              ${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.country}
            </div>
            
            <h4 style="color: #374151; margin: 20px 0 10px 0;">Items to Ship:</h4>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
              ${itemsList}
            </div>
          </div>
          
          <div style="text-align: center; background: #dc2626; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; font-size: 16px;">
              ⚡ PROCESS THIS ORDER NOW!
            </p>
          </div>
        </div>
      </div>
    `;

    // Send customer confirmation
    const customerEmail = await resend.emails.send({
      from: "MySupps <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `✅ Order Confirmation #${orderId.slice(0, 8)} - $${orderData.final_total.toFixed(2)}`,
      html: customerEmailHtml,
    });

    // Send admin notification
    const adminEmail = await resend.emails.send({
      from: "MySupps Orders <onboarding@resend.dev>",
      to: ["christhomaso083@proton.me"],
      subject: `🛒 NEW ORDER #${orderId.slice(0, 8)} - $${orderData.final_total.toFixed(2)} - ${orderData.payment_method.toUpperCase()}`,
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
