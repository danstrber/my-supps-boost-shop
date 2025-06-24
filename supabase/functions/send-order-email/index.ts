
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

    // Create order summary HTML with improved styling and anti-spam measures
    const itemsHtml = orderData.items.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 16px 12px; text-align: left; font-weight: 500;">${item.name}</td>
        <td style="padding: 16px 12px; text-align: center; color: #6b7280;">${item.quantity}</td>
        <td style="padding: 16px 12px; text-align: right; color: #6b7280;">$${item.price.toFixed(2)}</td>
        <td style="padding: 16px 12px; text-align: right; font-weight: 600; color: #059669;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order ${orderData.verificationStatus === 'verified' ? 'Confirmed' : 'Received'} - MySupps</title>
        <meta name="description" content="Your order confirmation from MySupps premium supplements store">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); margin-top: 20px; margin-bottom: 20px;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 40px 30px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
            <h1 style="margin: 0; font-size: 32px; font-weight: bold; line-height: 1.2;">
              Order ${orderData.verificationStatus === 'verified' ? 'Confirmed!' : 'Received!'}
            </h1>
            <p style="margin: 16px 0 0 0; font-size: 18px; opacity: 0.95;">
              Thank you for choosing MySupps, ${orderData.customerName}!
            </p>
            <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; margin-top: 24px; border: 2px solid rgba(255,255,255,0.2);">
              <p style="margin: 0; font-size: 16px; font-weight: 500; opacity: 0.9;">Order Number</p>
              <p style="margin: 8px 0 0 0; font-size: 24px; font-weight: bold; font-family: monospace; letter-spacing: 1px;">
                #${orderData.orderId}
              </p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <!-- Personal Message -->
            <div style="background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
              <p style="margin: 0; color: #0369a1; font-size: 16px; text-align: center;">
                We appreciate your trust in MySupps for your supplement needs. Your order has been received and we're preparing it with care.
              </p>
            </div>
            
            <!-- Order Summary Section -->
            <div style="margin-bottom: 32px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 32px; height: 32px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="color: white; font-size: 16px; font-weight: bold;">📦</span>
                </div>
                <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">Your Order Summary</h2>
              </div>
              
              <div style="background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #374151; color: white;">
                      <th style="padding: 16px 12px; text-align: left; font-weight: 600; font-size: 14px;">Product</th>
                      <th style="padding: 16px 12px; text-align: center; font-weight: 600; font-size: 14px;">Qty</th>
                      <th style="padding: 16px 12px; text-align: right; font-weight: 600; font-size: 14px;">Price</th>
                      <th style="padding: 16px 12px; text-align: right; font-weight: 600; font-size: 14px;">Total</th>
                    </tr>
                  </thead>
                  <tbody style="background: white;">
                    ${itemsHtml}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Payment Summary Section -->
            <div style="margin-bottom: 32px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 32px; height: 32px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="color: white; font-size: 16px; font-weight: bold;">💳</span>
                </div>
                <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">Payment Summary</h2>
              </div>
              
              <div style="background: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 12px; padding: 24px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px;">
                  <span style="color: #374151; font-size: 16px;">Subtotal:</span>
                  <span style="color: #374151; font-weight: 600; font-size: 16px;">$${orderData.originalTotal.toFixed(2)}</span>
                </div>
                ${orderData.discountAmount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px;">
                  <span style="color: #dc2626; font-size: 16px;">Discount Applied:</span>
                  <span style="color: #dc2626; font-weight: 600; font-size: 16px;">-$${orderData.discountAmount.toFixed(2)}</span>
                </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px;">
                  <span style="color: #374151; font-size: 16px;">Shipping:</span>
                  <span style="color: #374151; font-weight: 600; font-size: 16px;">${orderData.shippingFee === 0 ? 'Free Shipping' : `$${orderData.shippingFee.toFixed(2)}`}</span>
                </div>
                <hr style="border: none; border-top: 2px solid #bbf7d0; margin: 16px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #166534; font-size: 20px; font-weight: bold;">Total Amount:</span>
                  <span style="color: #166534; font-size: 24px; font-weight: bold;">$${orderData.finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <!-- Payment Information Section -->
            <div style="margin-bottom: 32px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 32px; height: 32px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="color: white; font-size: 16px; font-weight: bold;">💰</span>
                </div>
                <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">Payment Details</h2>
              </div>
              
              <div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 12px; padding: 24px;">
                <div style="margin-bottom: 16px;">
                  <span style="color: #1e40af; font-weight: 600; font-size: 18px;">Payment Method:</span>
                  <span style="color: #374151; font-size: 18px; margin-left: 8px; text-transform: capitalize;">${orderData.paymentMethod}</span>
                </div>
                ${orderData.paymentMethod === 'telegram' ? 
                  '<p style="color: #374151; margin: 12px 0 0 0; font-size: 16px;">Please complete your payment in our Telegram group as instructed by our support team.</p>' :
                  `<div>
                    <p style="color: #374151; margin: 0 0 12px 0; font-size: 16px;">
                      Payment Status: <strong style="color: ${orderData.verificationStatus === 'verified' ? '#059669' : '#f59e0b'};">${orderData.verificationStatus === 'verified' ? 'Payment Verified ✅' : 'Verification in Progress ⏳'}</strong>
                    </p>
                    ${orderData.txId ? `<p style="color: #6b7280; margin: 8px 0; font-size: 14px; font-family: monospace; word-break: break-all; background: #f3f4f6; padding: 8px; border-radius: 4px;">Transaction ID: ${orderData.txId}</p>` : ''}
                    ${orderData.bitcoinAmount ? `<p style="color: #6b7280; margin: 8px 0; font-size: 14px; background: #f3f4f6; padding: 8px; border-radius: 4px;">Bitcoin Amount: ${orderData.bitcoinAmount} BTC</p>` : ''}
                  </div>`
                }
              </div>
            </div>

            <!-- Shipping Information Section -->
            <div style="margin-bottom: 32px;">
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div style="width: 32px; height: 32px; background: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="color: white; font-size: 16px; font-weight: bold;">🚚</span>
                </div>
                <h2 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 700;">Shipping Information</h2>
              </div>
              
              <div style="background: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 24px;">
                <div style="margin-bottom: 16px;">
                  <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 16px; font-weight: 600;">Delivery Address:</h4>
                  <div style="color: #6b7280; font-size: 16px; line-height: 1.6; background: white; padding: 16px; border-radius: 8px; border: 1px solid #d1d5db;">
                    <p style="margin: 0; font-weight: 600; color: #374151;">${orderData.customerName}</p>
                    <p style="margin: 4px 0 8px 0;">${orderData.shippingAddress}</p>
                    <p style="margin: 0;"><strong>Contact:</strong> ${orderData.phone}</p>
                  </div>
                </div>
                
                <div style="background: #ecfdf5; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-top: 16px;">
                  <h4 style="margin: 0 0 12px 0; color: #166534; font-size: 16px; font-weight: 600;">📦 Expected Delivery Timeline:</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 14px; line-height: 1.6;">
                    <li><strong>Order Processing:</strong> 1-2 business days</li>
                    <li><strong>International Shipping:</strong> 7-14 business days</li>
                    <li><strong>Tracking Information:</strong> Provided within 24-48 hours of shipment</li>
                    <li><strong>Packaging:</strong> Discreet and secure packaging</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Customer Support Section -->
            <div style="text-align: center; padding: 32px 24px; background: #f9fafb; border-radius: 12px; border: 2px solid #e5e7eb;">
              <h3 style="margin: 0 0 16px 0; color: #374151; font-size: 20px; font-weight: 600;">Need Assistance?</h3>
              <p style="color: #6b7280; margin: 0 0 20px 0; font-size: 16px;">Our dedicated support team is ready to help you</p>
              
              <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
                <a href="mailto:christhomaso083@proton.me" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  📧 Email Support
                </a>
                <a href="https://t.me/DANSTRBER" style="display: inline-block; background: #0088cc; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                  💬 Telegram Support
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #374151; color: #d1d5db; text-align: center; padding: 24px;">
            <p style="margin: 0; font-size: 14px;">
              © 2024 MySupps - Premium Research Chemicals & Supplements
            </p>
            <p style="margin: 8px 0 0 0; font-size: 12px; opacity: 0.8;">
              This email was sent regarding your order #${orderData.orderId} placed on ${new Date(orderData.orderDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enhanced admin email with better formatting
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Alert - MySupps</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: 20px;">
          
          <!-- Alert Header -->
          <div style="background: ${orderData.verificationStatus === 'verified' ? '#dc2626' : '#f59e0b'}; color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">
              🚨 NEW ORDER ${orderData.verificationStatus === 'verified' ? 'CONFIRMED' : 'RECEIVED'}
            </h1>
            <p style="margin: 8px 0 0 0; font-size: 16px;">Order #${orderData.orderId}</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Total: $${orderData.finalTotal.toFixed(2)}</p>
          </div>
          
          <!-- Order Details -->
          <div style="padding: 24px;">
            
            <!-- Customer Information -->
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin: 0 0 16px 0; font-size: 18px;">👤 Customer Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 4px 0; font-weight: 600; width: 30%;">Name:</td><td style="padding: 4px 0;">${orderData.customerName}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600;">Email:</td><td style="padding: 4px 0;">${orderData.customerEmail}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600;">Phone:</td><td style="padding: 4px 0;">${orderData.phone}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600;">Order Date:</td><td style="padding: 4px 0;">${new Date(orderData.orderDate).toLocaleString()}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600;">Payment Method:</td><td style="padding: 4px 0; text-transform: capitalize;">${orderData.paymentMethod}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: 600;">Status:</td><td style="padding: 4px 0;"><strong style="color: ${orderData.verificationStatus === 'verified' ? '#059669' : '#f59e0b'};">${orderData.verificationStatus.toUpperCase()}</strong></td></tr>
                ${orderData.txId ? `<tr><td style="padding: 4px 0; font-weight: 600;">TX ID:</td><td style="padding: 4px 0; font-family: monospace; font-size: 12px; word-break: break-all; background: #f9fafb; padding: 4px; border-radius: 4px;">${orderData.txId}</td></tr>` : ''}
                ${orderData.bitcoinAmount ? `<tr><td style="padding: 4px 0; font-weight: 600;">BTC Amount:</td><td style="padding: 4px 0; font-family: monospace;">${orderData.bitcoinAmount} BTC</td></tr>` : ''}
              </table>
            </div>

            <!-- Shipping Address -->
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #166534; margin: 0 0 12px 0; font-size: 18px;">🚚 Shipping Address</h2>
              <div style="font-family: monospace; background: white; padding: 12px; border-radius: 6px; border: 1px solid #d1d5db;">
                <pre style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.4; color: #374151;">${orderData.shippingAddress}</pre>
              </div>
            </div>

            <!-- Order Items -->
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #166534; margin: 0 0 16px 0; font-size: 18px;">📦 Order Items</h2>
              <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background: #e5e7eb;">
                    <th style="padding: 12px; text-align: left; font-size: 14px;">Product</th>
                    <th style="padding: 12px; text-align: center; font-size: 14px;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px;">Price</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <!-- Payment Summary for Admin -->
            <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 20px; border-radius: 8px;">
              <h2 style="color: #92400e; margin: 0 0 16px 0; font-size: 18px;">💰 Payment Summary</h2>
              <table style="width: 100%; font-size: 16px;">
                <tr><td style="padding: 4px 0;">Subtotal:</td><td style="padding: 4px 0; text-align: right;">$${orderData.originalTotal.toFixed(2)}</td></tr>
                ${orderData.discountAmount > 0 ? `<tr><td style="padding: 4px 0; color: #dc2626;">Discount:</td><td style="padding: 4px 0; text-align: right; color: #dc2626;">-$${orderData.discountAmount.toFixed(2)}</td></tr>` : ''}
                <tr><td style="padding: 4px 0;">Shipping:</td><td style="padding: 4px 0; text-align: right;">${orderData.shippingFee === 0 ? 'Free' : `$${orderData.shippingFee.toFixed(2)}`}</td></tr>
                <tr style="border-top: 2px solid #fbbf24; font-weight: bold; font-size: 18px;">
                  <td style="padding: 12px 0 4px 0;">TOTAL:</td>
                  <td style="padding: 12px 0 4px 0; text-align: right; color: #92400e;">$${orderData.finalTotal.toFixed(2)}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send customer confirmation with improved headers to avoid spam filters
    const customerEmailResponse = await resend.emails.send({
      from: "MySupps Order Confirmation <christhomaso083@proton.me>",
      to: [orderData.customerEmail],
      replyTo: "christhomaso083@proton.me",
      subject: `Order ${orderData.verificationStatus === 'verified' ? 'Confirmed' : 'Received'} #${orderData.orderId} - MySupps Premium Supplements`,
      html: customerEmailHtml,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
        'List-Unsubscribe': '<mailto:christhomaso083@proton.me>',
      }
    });

    // Send admin notification
    const adminEmailResponse = await resend.emails.send({
      from: "MySupps Orders <christhomaso083@proton.me>", 
      to: ["einarstav4@gmail.com"],
      subject: `${orderData.verificationStatus === 'verified' ? '✅ CONFIRMED' : '🆕 NEW'} ORDER: ${orderData.customerName} - $${orderData.finalTotal.toFixed(2)} - #${orderData.orderId}`,
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
