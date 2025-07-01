import { useState, useEffect } from 'react'

const PhoneVerification = ({ onVerificationComplete, onPhoneChange }) => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'code'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const [attemptsLeft, setAttemptsLeft] = useState(3)

  // Countdown timer for resend
  useEffect(() => {
    let interval = null
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(timer => timer - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  // Format phone number as user types
  const formatPhoneInput = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 10) {
      // Format as 0XX-XXX-XXXX
      if (cleaned.length >= 7) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      } else if (cleaned.length >= 4) {
        return cleaned.replace(/(\d{3})(\d{3})/, '$1-$2')
      }
    }
    return cleaned
  }

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/sms/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(data.message)
        setStep('code')
        setResendTimer(60) // 60 seconds before allowing resend
        if (onPhoneChange) onPhoneChange(phone)
        
        // In development, show the code in console
        if (data.code) {
          console.log('Development SMS Code:', data.code)
        }
      } else {
        setError(data.message)
        if (data.waitTime) {
          const minutes = Math.ceil(data.waitTime / 60000)
          setError(`${data.message} (נסה שוב בעוד ${minutes} דקות)`)
        }
      }
    } catch (error) {
      setError('שגיאה בשליחת קוד האימות. אנא נסה שוב')
    } finally {
      setLoading(false)
    }
  }

  const handleCodeSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/sms/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(data.message)
        if (onVerificationComplete) {
          onVerificationComplete({ phone, verified: true })
        }
      } else {
        setError(data.message)
        if (data.attemptsLeft !== undefined) {
          setAttemptsLeft(data.attemptsLeft)
        }
        if (data.attemptsLeft === 0) {
          setStep('phone')
          setCode('')
        }
      }
    } catch (error) {
      setError('שגיאה באימות הקוד. אנא נסה שוב')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = () => {
    if (resendTimer === 0) {
      setCode('')
      setError('')
      setSuccess('')
      setStep('phone')
    }
  }

  const handleEditPhone = () => {
    setStep('phone')
    setCode('')
    setError('')
    setSuccess('')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📱</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {step === 'phone' ? 'אימות מספר טלפון' : 'הכנס קוד אימות'}
        </h2>
        <p className="text-gray-600 text-sm">
          {step === 'phone' 
            ? 'נשלח לך קוד אימות בהודעת SMS'
            : `קוד אימות נשלח ל-${phone}`
          }
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מספר טלפון נייד
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              placeholder="050-123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              required
              disabled={loading}
              dir="ltr"
            />
            <p className="text-xs text-gray-500 mt-1">
              הכנס מספר טלפון ישראלי (05X-XXX-XXXX)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !phone}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                שולח קוד...
              </>
            ) : (
              <>
                <span>📤</span>
                שלח קוד אימות
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleCodeSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                קוד אימות (6 ספרות)
              </label>
              <button
                type="button"
                onClick={handleEditPhone}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                ✏️ ערוך טלפון
              </button>
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono text-lg tracking-widest"
              required
              disabled={loading}
              maxLength={6}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                {attemptsLeft > 0 ? `נותרו ${attemptsLeft} ניסיונות` : 'אין ניסיונות נוספים'}
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              >
                {resendTimer > 0 ? `שלח שוב בעוד ${resendTimer}s` : 'שלח קוד חדש'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                מאמת...
              </>
            ) : (
              <>
                <span>✅</span>
                אמת קוד
              </>
            )}
          </button>

          {/* Development helper */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-700 text-xs">
                <strong>מצב פיתוח:</strong> בדוק בקונסול את קוד האימות
              </p>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default PhoneVerification
