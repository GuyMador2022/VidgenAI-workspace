// API endpoint for verifying SMS codes
import { validateIsraeliPhone, formatPhoneNumber, verifyCode } from '../../../utils/sms'

// In-memory storage for demo (in production, use database)
const verificationCodes = new Map()
const verifiedPhones = new Set()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { phone, code } = req.body

    if (!phone || !code) {
      return res.status(400).json({ 
        error: 'MISSING_DATA',
        message: 'מספר טלפון וקוד אימות נדרשים' 
      })
    }

    // Validate phone number
    if (!validateIsraeliPhone(phone)) {
      return res.status(400).json({ 
        error: 'INVALID_PHONE',
        message: 'מספר טלפון לא תקין' 
      })
    }

    const formattedPhone = formatPhoneNumber(phone)

    // Get stored verification data
    const storedData = verificationCodes.get(formattedPhone)
    
    if (!storedData) {
      return res.status(400).json({
        error: 'NO_CODE',
        message: 'לא נמצא קוד אימות עבור מספר זה. אנא בקש קוד חדש'
      })
    }

    // Check verification attempts (max 3 attempts per code)
    if (storedData.attempts >= 3) {
      verificationCodes.delete(formattedPhone)
      return res.status(400).json({
        error: 'MAX_ATTEMPTS',
        message: 'חרגת ממספר הניסיונות המותר. אנא בקש קוד חדש'
      })
    }

    // Increment attempts
    storedData.attempts += 1

    // Verify the code
    const verificationResult = verifyCode(
      formattedPhone, 
      code, 
      storedData.code, 
      storedData.timestamp
    )

    if (!verificationResult.success) {
      // Update attempts in storage
      verificationCodes.set(formattedPhone, storedData)
      
      return res.status(400).json({
        error: verificationResult.error,
        message: verificationResult.message,
        attemptsLeft: 3 - storedData.attempts
      })
    }

    // Verification successful
    verificationCodes.delete(formattedPhone) // Clean up used code
    verifiedPhones.add(formattedPhone) // Mark phone as verified

    res.status(200).json({
      success: true,
      message: 'הטלפון אומת בהצלחה!',
      phone: formattedPhone,
      verified: true
    })

  } catch (error) {
    console.error('SMS verification error:', error)
    res.status(500).json({ 
      error: 'VERIFICATION_FAILED',
      message: 'שגיאה באימות הקוד. אנא נסה שוב' 
    })
  }
}
