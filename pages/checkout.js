import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [billingCycle, setBillingCycle] = useState('yearly')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [isCreditsOnly, setIsCreditsOnly] = useState(false)
  const [creditsPackage, setCreditsPackage] = useState(null)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      zipCode: '',
      country: 'IL'
    }
  })
  const router = useRouter()

  const plans = {
    basic: {
      name: 'בסיסי',
      credits: 100,
      monthlyPrice: 5,
      yearlyPrice: 48,
      features: ['יצירת טקסט ותמונות', 'ניתוח קהל בסיסי', '25 פרויקטים', 'תמיכה באימייל']
    },
    professional: {
      name: 'מקצועי',
      credits: 500,
      monthlyPrice: 18,
      yearlyPrice: 168,
      features: ['יצירת טקסט, תמונות ווידאו', 'ניתוח קהל מתקדם', 'פרויקטים ללא הגבלה', 'תמיכה בצ\'אט']
    },
    enterprise: {
      name: 'ארגוני',
      credits: 2000,
      monthlyPrice: 48,
      yearlyPrice: 480,
      features: ['כל הפיצ\'רים', 'API מותאם', 'תמיכה VIP', 'ניהול צוות']
    }
  }

  useEffect(() => {
    // Check if this is a credits purchase
    if (router.query.credits && router.query.price) {
      setIsCreditsOnly(true)
      setCreditsPackage({
        credits: parseInt(router.query.credits),
        price: parseInt(router.query.price)
      })
    } else if (router.query.plan && plans[router.query.plan]) {
      setSelectedPlan(router.query.plan)
      setIsCreditsOnly(false)
    }
    if (router.query.billing) {
      setBillingCycle(router.query.billing)
    }
  }, [router.query])

  const getCurrentPrice = () => {
    if (isCreditsOnly && creditsPackage) {
      return creditsPackage.price
    }
    if (!selectedPlan) return 0
    return billingCycle === 'monthly' ? plans[selectedPlan].monthlyPrice : plans[selectedPlan].yearlyPrice
  }

  const getSavings = () => {
    if (!selectedPlan || billingCycle === 'monthly') return 0
    const monthlyTotal = plans[selectedPlan].monthlyPrice * 12
    return monthlyTotal - plans[selectedPlan].yearlyPrice
  }

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (value) => {
    handleInputChange('cardNumber', formatCardNumber(value))
  }

  const handleExpiryChange = (value) => {
    handleInputChange('expiryDate', formatExpiryDate(value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Process payment
      const paymentData = {
        plan: selectedPlan,
        billingCycle: billingCycle,
        paymentMethod: paymentMethod,
        paymentData: formData,
        userId: router.query.userId,
        // Add credits-specific data
        isCreditsOnly: isCreditsOnly,
        creditsPackage: creditsPackage
      }

      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })

      const data = await response.json()
      
      if (data.success) {
        router.push('/dashboard?welcome=true')
      } else {
        alert('שגיאה בעיבוד התשלום: ' + data.error)
      }
    } catch (error) {
      alert('שגיאה בחיבור לשרת')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedPlan && !(isCreditsOnly && creditsPackage)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">טוען...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>תשלום - VidGenAI</title>
        <meta name="description" content="השלם את ההרשמה ותתחיל ליצור תוכן מדהים" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">השלמת הרכישה</h1>
            <p className="text-gray-600">כמעט סיימנו! עוד רגע תוכל להתחיל ליצור תוכן מדהים</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">סיכום ההזמנה</h2>
              {isCreditsOnly && creditsPackage ? (
                <div className="border-2 border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">רכישת קרדיטים</h3>
                      <p className="text-sm text-gray-600">{creditsPackage.credits} קרדיטים חד פעמיים</p>
                    </div>
                    <div className="text-left">
                      <span className="text-2xl font-bold text-gray-900">
                        ₪{creditsPackage.price}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      שימוש גמיש בקרדיטים
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      תוקף של 6-12 חודשים (לפי החבילה)
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-purple-200 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{plans[selectedPlan]?.name}</h3>
                      <p className="text-sm text-gray-600">{plans[selectedPlan]?.credits} קרדיטים בחודש</p>
                    </div>
                    <div className="text-left">
                      <span className="text-2xl font-bold text-gray-900">
                        ${getCurrentPrice()}
                      </span>
                      <span className="text-gray-600 text-sm block">
                        ל{billingCycle === 'monthly' ? 'חודש' : 'שנה'}
                      </span>
                    </div>
                  </div>
                  {billingCycle === 'yearly' && getSavings() > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                      <p className="text-green-800 text-sm font-medium">
                        🎉 חוסך ${getSavings()} בשנה עם התשלום השנתי!
                      </p>
                    </div>
                  )}
                  <div className="space-y-2">
                    {plans[selectedPlan]?.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Billing Cycle Toggle - Only for subscription plans */}
              {!isCreditsOnly && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">מחזור חיוב</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        billingCycle === 'monthly'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">חודשי</div>
                      <div className="text-sm text-gray-600">${plans[selectedPlan]?.monthlyPrice}/חודש</div>
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`p-3 border-2 rounded-lg text-center transition-all relative ${
                        billingCycle === 'yearly'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {getSavings() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          חסוך ${getSavings()}
                        </span>
                      )}
                      <div className="font-medium">שנתי</div>
                      <div className="text-sm text-gray-600">${plans[selectedPlan]?.yearlyPrice}/שנה</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">אמצעי תשלום</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>כרטיס אשראי</span>
                    <div className="mr-auto flex space-x-2">
                      <img src="/visa.png" alt="Visa" className="h-6" />
                      <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">פרטי התשלום</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        מספר כרטיס אשראי
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        maxLength={19}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        dir="ltr"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          תוקף
                        </label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          maxLength={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YY"
                          dir="ltr"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123"
                          dir="ltr"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        שם בעל הכרטיס
                      </label>
                      <input
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="שם מלא כמו בכרטיס"
                        dir="rtl"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800">כתובת לחיוב</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          רחוב ומספר בית
                        </label>
                        <input
                          type="text"
                          value={formData.billingAddress.street}
                          onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="רחוב הרצל 123"
                          dir="rtl"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            עיר
                          </label>
                          <input
                            type="text"
                            value={formData.billingAddress.city}
                            onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="תל אביב"
                            dir="rtl"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            מיקוד
                          </label>
                          <input
                            type="text"
                            value={formData.billingAddress.zipCode}
                            onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="12345"
                            dir="ltr"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-medium text-blue-800 mb-2">תשלום דרך PayPal</h3>
                      <p className="text-blue-600 text-sm">תועבר לאתר PayPal להשלמת התשלום</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">סה"כ לתשלום:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {isCreditsOnly ? `₪${getCurrentPrice()}` : `$${getCurrentPrice()}`}
                    </span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        מעבד תשלום...
                      </div>
                    ) : (
                      isCreditsOnly ? `שלם ₪${getCurrentPrice()} והתחל` : `שלם $${getCurrentPrice()} והתחל`
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    התשלום מאובטח ומוצפן. תוכל לבטל בכל עת.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

