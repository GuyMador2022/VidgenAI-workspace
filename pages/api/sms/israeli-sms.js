// Israeli SMS provider (example for local providers)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { to, message } = req.body

    // Example for Israeli SMS providers like:
    // - ISMS (https://www.isms.co.il/)
    // - SMS4Free (https://www.sms4free.co.il/)
    // - Or other local providers

    const smsData = {
      username: process.env.ISRAELI_SMS_USERNAME,
      password: process.env.ISRAELI_SMS_PASSWORD,
      sender: process.env.ISRAELI_SMS_SENDER || 'VidGenAI',
      phone: to.replace('+972', '0'), // Convert to local format
      message: message
    }

    // Example API call (adjust according to your provider)
    const response = await fetch('https://api.your-israeli-sms-provider.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ISRAELI_SMS_API_KEY}`
      },
      body: JSON.stringify(smsData)
    })

    const result = await response.json()

    if (result.success || result.status === 'sent') {
      console.log('Israeli SMS sent:', result.messageId || result.id)
      
      res.status(200).json({
        success: true,
        messageId: result.messageId || result.id,
        provider: 'israeli-sms'
      })
    } else {
      throw new Error(result.error || 'SMS sending failed')
    }

  } catch (error) {
    console.error('Israeli SMS provider error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
