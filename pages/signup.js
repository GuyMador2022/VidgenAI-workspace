import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    agreeToTerms: false
  })
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (router.query.plan) {
      setSelectedPlan(router.query.plan)
    }
  }, [router.query])

  const plans = {
    free: { name: 'חשיפה', credits: 10, price: 0 },
    basic: { name: 'בסיסי', credits: 100, price: 48 },
    professional: { name: 'מקצועי', credits: 500, price: 168 },
    enterprise: { name: 'ארגוני', credits: 2000, price: 480 }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'שם מלא הוא שדה חובה'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין'
    }

    if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה'
    } else if (formData.password.length < 6) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'סיסמאות לא תואמות'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'יש להסכים לתנאי השימוש'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)
    
    try {
      // Create user account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // If free plan, redirect to dashboard
        if (selectedPlan === 'free') {
          router.push('/dashboard')
        } else {
          // If paid plan, redirect to checkout
          router.push(`/checkout?plan=${selectedPlan}&userId=${data.userId}`)
        }
      } else {
        setErrors({ general: data.error || 'שגיאה ביצירת החשבון' })
      }
    } catch (error) {
      setErrors({ general: 'שגיאה בחיבור לשרת' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>הרשמה - VidGenAI</title>
        <meta name="description" content="הרשם לפלטפורמת VidGenAI וצור תוכן מדהים בבינה מלאכותית" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">הרשמה לפלטפורמה</h2>
            <p className="text-gray-600">התחל ליצור תוכן מדהים עוד היום</p>
          </div>

          {/* Selected Plan Display */}
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-200">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">החבילה שנבחרה:</h3>
              <div className="mt-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {plans[selectedPlan]?.name} - {plans[selectedPlan]?.credits} קרדיטים
                </span>
              </div>
              {selectedPlan !== 'free' && (
                <p className="text-sm text-gray-600 mt-2">
                  {plans[selectedPlan]?.price}$ לשנה
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שם מלא *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="הכנס את שמך המלא"
                dir="rtl"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                אימייל *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
                dir="ltr"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                סיסמה *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="לפחות 6 תווים"
                dir="ltr"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                אימות סיסמה *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="הכנס את הסיסמה שוב"
                dir="ltr"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שם החברה (אופציונלי)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="שם החברה שלך"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                טלפון (אופציונלי)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="052-1234567"
                dir="ltr"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="mr-3 text-sm text-gray-700">
                אני מסכים ל
                <a href="/terms" className="text-blue-600 hover:text-blue-500 underline mx-1">
                  תנאי השימוש
                </a>
                ול
                <a href="/privacy" className="text-blue-600 hover:text-blue-500 underline mx-1">
                  מדיניות הפרטיות
                </a>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  יוצר חשבון...
                </div>
              ) : (
                `הרשם ${selectedPlan === 'free' ? 'חינם' : 'וגש לתשלום'}`
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              כבר יש לך חשבון?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                התחבר כאן
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
