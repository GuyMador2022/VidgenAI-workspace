// SMS Verification Service
// Using multiple providers for reliability

const SMS_PROVIDERS = {
  TWILIO: 'twilio',
  AWS_SNS: 'aws_sns',
  ISRAELI_SMS: 'israeli_sms' // For Israeli numbers
}

// Generate 6-digit verification code
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Validate Israeli phone number
export const validateIsraeliPhone = (phone) => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, '')
  
  // Israeli mobile numbers: 05x-xxx-xxxx (10 digits total)
  // International format: +972-5x-xxx-xxxx
  const israeliMobileRegex = /^(972|0)?5[0-9]{8}$/
  
  return israeliMobileRegex.test(cleanPhone)
}

// Format phone number for SMS sending
export const formatPhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '')
  
  // If starts with 0, replace with +972
  if (cleanPhone.startsWith('0')) {
    return '+972' + cleanPhone.substring(1)
  }
  
  // If starts with 972, add +
  if (cleanPhone.startsWith('972')) {
    return '+' + cleanPhone
  }
  
  // If already formatted
  if (cleanPhone.startsWith('+972')) {
    return cleanPhone
  }
  
  return '+972' + cleanPhone
}

// Send SMS via Twilio (primary provider)
const sendSMSViaTwilio = async (phone, message) => {
  try {
    const response = await fetch('/api/sms/twilio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phone,
        message: message
      })
    })
    
    return response.json()
  } catch (error) {
    console.error('Twilio SMS failed:', error)
    throw error
  }
}

// Send SMS via AWS SNS (backup provider)
const sendSMSViaAWS = async (phone, message) => {
  try {
    const response = await fetch('/api/sms/aws-sns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phone,
        message: message
      })
    })
    
    return response.json()
  } catch (error) {
    console.error('AWS SNS SMS failed:', error)
    throw error
  }
}

// Send SMS via Israeli SMS provider (for local numbers)
const sendSMSViaIsraeliProvider = async (phone, message) => {
  try {
    const response = await fetch('/api/sms/israeli-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phone,
        message: message
      })
    })
    
    return response.json()
  } catch (error) {
    console.error('Israeli SMS provider failed:', error)
    throw error
  }
}

// Main SMS sending function with fallback providers
export const sendVerificationSMS = async (phone, code) => {
  const formattedPhone = formatPhoneNumber(phone)
  const message = `קוד האימות שלך ב-VidGenAI: ${code}\nהקוד תקף ל-10 דקות.\nאל תשתף קוד זה עם אחרים.`
  
  const providers = [
    { name: SMS_PROVIDERS.TWILIO, func: sendSMSViaTwilio },
    { name: SMS_PROVIDERS.AWS_SNS, func: sendSMSViaAWS },
    { name: SMS_PROVIDERS.ISRAELI_SMS, func: sendSMSViaIsraeliProvider }
  ]
  
  for (const provider of providers) {
    try {
      console.log(`Attempting SMS via ${provider.name} to ${formattedPhone}`)
      const result = await provider.func(formattedPhone, message)
      
      if (result.success) {
        console.log(`SMS sent successfully via ${provider.name}`)
        return {
          success: true,
          provider: provider.name,
          messageId: result.messageId
        }
      }
    } catch (error) {
      console.error(`${provider.name} failed:`, error)
      continue
    }
  }
  
  throw new Error('All SMS providers failed')
}

// Verify code (this would typically check against database)
export const verifyCode = (phone, code, storedCode, timestamp) => {
  const now = Date.now()
  const codeAge = now - timestamp
  const TEN_MINUTES = 10 * 60 * 1000 // 10 minutes in milliseconds
  
  // Debug/Test code - always accept 123456
  if (code === '123456') {
    return {
      success: true,
      message: 'הטלפון אומת בהצלחה! (קוד בדיקה)'
    }
  }
  
  // Check if code is expired
  if (codeAge > TEN_MINUTES) {
    return {
      success: false,
      error: 'EXPIRED',
      message: 'קוד האימות פג תוקף. אנא בקש קוד חדש.'
    }
  }
  
  // Check if code matches
  if (code !== storedCode) {
    return {
      success: false,
      error: 'INVALID',
      message: 'קוד האימות שגוי. אנא נסה שוב.'
    }
  }
  
  return {
    success: true,
    message: 'הטלפון אומת בהצלחה!'
  }
}

// Rate limiting for SMS sending
export const checkRateLimit = (phone, attempts = []) => {
  const now = Date.now()
  const oneHour = 60 * 60 * 1000 // 1 hour
  const oneDay = 24 * 60 * 60 * 1000 // 24 hours
  
  // Remove old attempts
  const recentAttempts = attempts.filter(attempt => now - attempt < oneDay)
  
  // Check hourly limit (max 3 SMS per hour)
  const hourlyAttempts = recentAttempts.filter(attempt => now - attempt < oneHour)
  if (hourlyAttempts.length >= 3) {
    return {
      allowed: false,
      error: 'HOURLY_LIMIT',
      message: 'חרגת מהמגבלה השעתית. נסה שוב בעוד שעה.',
      waitTime: oneHour - (now - Math.min(...hourlyAttempts))
    }
  }
  
  // Check daily limit (max 10 SMS per day)
  if (recentAttempts.length >= 10) {
    return {
      allowed: false,
      error: 'DAILY_LIMIT',
      message: 'חרגת מהמגבלה היומית. נסה שוב מחר.',
      waitTime: oneDay - (now - Math.min(...recentAttempts))
    }
  }
  
  return {
    allowed: true,
    remaining: {
      hourly: 3 - hourlyAttempts.length,
      daily: 10 - recentAttempts.length
    }
  }
}
