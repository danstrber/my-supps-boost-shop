
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend("re_8N1vbEdv_BvWtpRZNdzipkMUBviCtNh6w");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderEmailRequest {
  customerEmail: string;
  customerName: string;
  orderId: string;
  items: OrderItem[];
  originalTotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  paymentMethod: string;
  txId?: string;
  bitcoinAmount?: string;
  shippingAddress: string;
  phone: string;
  orderDate: string;
  verificationStatus: string;
  paymentDetails?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderEmailRequest = await req.json();
    console.log("Processing order email for:", orderData.customerEmail);

    // Create order summary HTML
    const itemsHtml = orderData.items.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; text-align: left;">${item.name}</td>
        <td style="padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 12px; text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Order ${orderData.verificationStatus === 'verified' ? 'Confirmed' : 'Received'}! 🎉</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for your order, ${orderData.customerName}!</p>
          <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-size: 18px; font-weight: bold;">Order ID: #${orderData.orderId}</p>
          </div>
        </div>
        
        <div style="padding: 30px;">
          <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 20px;">Order Summary</h2>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151;">Product</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151;">Qty</th>
                  <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151;">Price</th>
                  <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 18px;">Payment Summary</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #374151;">Subtotal:</span>
              <span style="color: #374151; font-weight: 600;">$${orderData.originalTotal.toFixed(2)}</span>
            </div>
            ${orderData.discountAmount > 0 ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #dc2626;">Discount:</span>
              <span style="color: #dc2626; font-weight: 600;">-$${orderData.discountAmount.toFixed(2)}</span>
            </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #374151;">Shipping:</span>
              <span style="color: #374151; font-weight: 600;">${orderData.shippingFee === 0 ? 'Free' : `$${orderData.shippingFee.toFixed(2)}`}</span>
            </div>
            <hr style="border: none; border-top: 2px solid #bbf7d0; margin: 15px 0;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #166534; font-size: 18px; font-weight: bold;">Final Total:</span>
              <span style="color: #166534; font-size: 18px; font-weight: bold;">$${orderData.finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Payment Method: ${orderData.paymentMethod}</h3>
            ${orderData.paymentMethod === 'telegram' ? 
              '<p style="color: #374151; margin: 0;">Complete your payment in our Telegram group as instructed.</p>' :
              `<p style="color: #374151; margin: 0 0 10px 0;">Your ${orderData.verificationStatus === 'verified' ? 'payment has been verified and processed successfully' : 'payment is being verified'}.</p>
               ${orderData.txId ? `<p style="color: #6b7280; margin: 0; font-size: 14px; font-family: monospace;">Transaction ID: ${orderData.txId}</p>` : ''}
               ${orderData.bitcoinAmount ? `<p style="color: #6b7280; margin: 0; font-size: 14px;">Bitcoin Amount: ${orderData.bitcoinAmount} BTC</p>` : ''}`
            }
          </div>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Shipping Address</h3>
            <p style="color: #6b7280; margin: 0 0 5px 0;">${orderData.customerName}</p>
            <p style="color: #6b7280; margin: 0 0 5px 0;">${orderData.shippingAddress}</p>
            <p style="color: #6b7280; margin: 0;">Phone: ${orderData.phone}</p>
          </div>

          <div style="text-center; padding: 20px; background: #f9fafb; border-radius: 8px;">
            <p style="color: #6b7280; margin: 0 0 15px 0;">Questions about your order?</p>
            <p style="color: #374151; margin: 0;">
              Email: <a href="mailto:christhomaso083@proton.me" style="color: #059669; text-decoration: none;">christhomaso083@proton.me</a><br>
              Telegram: <a href="https://t.me/DANSTRBER" style="color: #059669; text-decoration: none;">@DANSTRBER</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626; font-size: 24px;">🚨 NEW ORDER ${orderData.verificationStatus === 'verified' ? 'CONFIRMED' : 'RECEIVED'}</h1>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin: 0 0 15px 0;">Customer Information</h2>
          <p><strong>Order ID:</strong> #${orderData.orderId}</p>
          <p><strong>Name:</strong> ${orderData.customerName}</p>
          <p><strong>Email:</strong> ${orderData.customerEmail}</p>
          <p><strong>Phone:</strong> ${orderData.phone}</p>
          <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
          <p><strong>Order Date:</strong> ${orderData.orderDate}</p>
          <p><strong>Verification Status:</strong> ${orderData.verificationStatus}</p>
          ${orderData.txId ? `<p><strong>Transaction ID:</strong> ${orderData.txId}</p>` : ''}
          ${orderData.bitcoinAmount ? `<p><strong>Bitcoin Amount:</strong> ${orderData.bitcoinAmount} BTC</p>` : ''}
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #166534; margin: 0 0 15px 0;">Shipping Address</h2>
          <p style="margin: 0; white-space: pre-line;">${orderData.shippingAddress}</p>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #166534; margin: 0 0 15px 0;">Order Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #e5e7eb;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px; text-align: center;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px;">
          <h2 style="color: #92400e; margin: 0 0 15px 0;">Payment Summary</h2>
          <p>Subtotal: $${orderData.originalTotal.toFixed(2)}</p>
          ${orderData.discountAmount > 0 ? `<p>Discount: -$${orderData.discountAmount.toFixed(2)}</p>` : ''}
          <p>Shipping: ${orderData.shippingFee === 0 ? 'Free' : `$${orderData.shippingFee.toFixed(2)}`}</p>
          <p><strong>Final Total: $${orderData.finalTotal.toFixed(2)}</strong></p>
        </div>
      </div>
    `;

    // Send customer confirmation
    const customerEmailResponse = await resend.emails.send({
      from: "MySupps <onboarding@resend.dev>",
      to: [orderData.customerEmail],
      subject: `Order ${orderData.verificationStatus === 'verified' ? 'Confirmed' : 'Received'} #${orderData.orderId} - MySupps`,
      html: customerEmailHtml,
    });

    // Send admin notification
    const adminEmailResponse = await resend.emails.send({
      from: "MySupps Orders <onboarding@resend.dev>", 
      to: ["einarstav4@gmail.com"],
      subject: `${orderData.verificationStatus === 'verified' ? 'CONFIRMED' : 'NEW'} ORDER: ${orderData.customerName} - $${orderData.finalTotal.toFixed(2)} - #${orderData.orderId}`,
      html: adminEmailHtml,
    });

    console.log("Customer email sent:", customerEmailResponse);
    console.log("Admin email sent:", adminEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      customerEmail: customerEmailResponse,
      adminEmail: adminEmailResponse 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending order emails:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
