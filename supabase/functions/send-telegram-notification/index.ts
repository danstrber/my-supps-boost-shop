
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TelegramNotificationRequest {
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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, orderData }: TelegramNotificationRequest = await req.json();
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID"); // Your chat ID to receive notifications

    if (!botToken || !chatId) {
      console.log("Telegram bot token or chat ID not configured");
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Telegram not configured" 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Format items list
    const itemsList = orderData.items.products.map(item => 
      `• ${item.name} x${item.quantity} - $${item.total.toFixed(2)}`
    ).join('\n');

    // Create Telegram message
    const message = `
🛒 *NEW ORDER RECEIVED!*

📋 *Order ID:* #${orderId.slice(0, 8)}
💰 *Total:* $${orderData.final_total.toFixed(2)}
💳 *Payment:* ${orderData.payment_method.charAt(0).toUpperCase() + orderData.payment_method.slice(1)}

👤 *Customer:*
${orderData.payment_details.customer_info.fullName}
${orderData.payment_details.customer_info.email}

📍 *Shipping Address:*
${orderData.payment_details.customer_info.address}
${orderData.payment_details.customer_info.city}, ${orderData.payment_details.customer_info.country}

📦 *Items:*
${itemsList}

⚡ *Action Required:* Process this order in your system!
    `.trim();

    // Send message to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error(`Telegram API error: ${telegramResponse.statusText}`);
    }

    const telegramResult = await telegramResponse.json();
    console.log("Telegram notification sent:", telegramResult);

    return new Response(JSON.stringify({ 
      success: true, 
      telegramResult 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-telegram-notification function:", error);
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
