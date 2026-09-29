// Telegram Bot API requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env
// WhatsApp requires TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER in .env

export async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram credentials missing, skipping notification.');
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML' // Allow some basic formatting
      })
    });
    
    if (!res.ok) {
      console.error('Failed to send Telegram notification:', await res.text());
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}

export async function sendWhatsAppNotification(message: string) {
  // Using CallMeBot Free API (No Twilio or Business Verification needed)
  const phone = process.env.WHATSAPP_PHONE_NUMBER; // Your WhatsApp number with country code (e.g. +91...)
  const apiKey = process.env.WHATSAPP_CALLMEBOT_API_KEY; // The free API key from CallMeBot

  if (!phone || !apiKey) {
    console.warn('CallMeBot WhatsApp credentials missing, skipping notification.');
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMessage}&apikey=${apiKey}`;
  
  try {
    const res = await fetch(url, { method: 'GET' });

    if (!res.ok) {
      console.error('Failed to send WhatsApp notification via CallMeBot:', await res.text());
    }
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
  }
}

export async function notifyNewContent(type: 'Note' | 'PYQ', subjectName: string, title: string, url: string) {
  const message = `📚 New ${type.toLowerCase()}s added: ${subjectName} - ${title} | ${url}`;
  
  // Fire and forget (don't await so we don't block the API response)
  sendTelegramNotification(message).catch(console.error);
  sendWhatsAppNotification(message).catch(console.error);
}
