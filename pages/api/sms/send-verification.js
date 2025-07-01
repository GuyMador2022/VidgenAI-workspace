// API endpoint for sending SMS verification codes
import { generateVerificationCode, validateIsraeliPhone, formatPhoneNumber, checkRateLimit } from '../../../utils/sms'

// In-memory storage for demo (in production, use database)
const verificationCodes = new Map()
const smsAttempts = new Map()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({ 
        error: 'MISSING_PHONE',
        message: 'מספר טלפון נדרש' 
      })
    }

    // Validate phone number
    if (!validateIsraeliPhone(phone)) {
      return res.status(400).json({ 
        error: 'INVALID_PHONE',
        message: 'מספר טלפון לא תקין. אנא הכנס מספר ישראלי תקין' 
      })
    }

    const formattedPhone = formatPhoneNumber(phone)

    // Check rate limiting
    const attempts = smsAttempts.get(formattedPhone) || []
    const rateLimitResult = checkRateLimit(formattedPhone, attempts)
    
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        error: rateLimitResult.error,
        message: rateLimitResult.message,
        waitTime: rateLimitResult.waitTime
      })
    }

    // Generate verification code
    const code = generateVerificationCode()
    
    // Store code with timestamp (in production, store in database)
    verificationCodes.set(formattedPhone, {
      code,
      timestamp: Date.now(),
      attempts: 0
    })

    // Update SMS attempts
    attempts.push(Date.now())
    smsAttempts.set(formattedPhone, attempts)

    // Simulate SMS sending (in production, use real SMS service)
    console.log(`SMS Verification Code for ${formattedPhone}: ${code}`)
    
    // For development, we'll simulate successful sending
    setTimeout(() => {
      // Simulate SMS delivery delay
    }, 1000)

    res.status(200).json({
      success: true,
      message: 'קוד אימות נשלח בהצלחה',
      phone: formattedPhone,
      // In development, return code for testing (remove in production)
      ...(process.env.NODE_ENV === 'development' && { code })
    })

  } catch (error) {
    console.error('SMS sending error:', error)
    res.status(500).json({ 
      error: 'SMS_FAILED',
      message: 'שגיאה בשליחת הודעת האימות. אנא נסה שוב' 
    })
  }
}
