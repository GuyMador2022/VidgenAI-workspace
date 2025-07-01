// Twilio SMS provider
import { Twilio } from 'twilio'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { to, message } = req.body

    // Initialize Twilio client
    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )

    // Send SMS
    const smsResult = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    })

    console.log('Twilio SMS sent:', smsResult.sid)

    res.status(200).json({
      success: true,
      messageId: smsResult.sid,
      provider: 'twilio'
    })

  } catch (error) {
    console.error('Twilio SMS error:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
