import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const plans = [
  {
    id: 'trial',
    name: 'ניסיון 7 ימים',
    price: 0,
    priceMonthly: 0,
    credits: 10,
    features: [
      '10 קרדיטים חינם',
      'יצירת טקסט בלבד',
      'תמיכה בסיסית',
      'שמירת עד 5 פרויקטים',
      'ללא תמיכת API חיצוניים'
    ],
    limitations: [
      'ללא יצירת וידאו',
      'ללא יצירת אודיו',
      'ללא ניתוח קהל מתקדם'
    ],
    buttonText: 'התחל ניסיון חינם',
    buttonColor: 'bg-gray-600 hover:bg-gray-700',
    popular: false,
    trial: true
  },
  {
    id: 'basic',
    name: 'חבילה בסיסית',
    price: 1188,
    priceMonthly: 99,
    credits: 50,
    features: [
      'עד 5 פוסטים בחודש',
      'טקסט + תמונות + קריינות',
      'תזמון אוטומטי',
      'תבניות מוכנות',
      'תמיכה באימייל',
      'ניתוח ביצועים בסיסי'
    ],
    limitations: [
      'ללא סרטוני AI',
      'ללא חיבור רשתות חברתיות'
    ],
    buttonText: 'התחל עכשיו',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    popular: false
  },
  {
    id: 'advanced',
    name: 'חבילה מתקדמת',
    price: 2388,
    priceMonthly: 199,
    credits: 100,
    features: [
      'עד 20 פוסטים בחודש',
      'כולל סרטוני AI',
      'חיבור לפייסבוק/אינסטגרם',
      'ניתוח ביצועים מתקדם',
      'תמיכה בצ\'אט חי',
      'אינטגרציה עם רשתות חברתיות',
      'יצירת אודיו מתקדמת',
      'תבניות פרימיום'
    ],
    limitations: [],
    buttonText: 'שדרג למתקדמת',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    popular: true
  },
  {
    id: 'agency',
    name: 'חבילת סוכנות',
    price: 5988,
    priceMonthly: 499,
    credits: 500,
    features: [
      'עד 10 לקוחות',
      'White Label מלא',
      'API מותאם אישית',
      'גישה לצוותים',
      'ניהול משתמשים מתקדם',
      'דוחות מפורטים',
      'תמיכה VIP 24/7',
      'אינטגרציה מלאה עם כל הפלטפורמות',
      'יצירת אודיו ווידאו ברמה מקצועית'
    ],
    limitations: [],
    buttonText: 'יצירת קשר',
    buttonColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    popular: false
  }
]

const creditUsage = {
  textGeneration: 1,
  imageGeneration: 3,
  audioGeneration: 5,
  videoGeneration: 10,
  audienceAnalysis: 2,
  aiInsights: 3,
  socialIntegration: 2,
  customTemplates: 1
}

export default function PricingPublic() {
  const [isYearly, setIsYearly] = useState(false) // Changed to false for monthly default
  const [selectedPlan, setSelectedPlan] = useState(null)
  const router = useRouter()

  const handlePlanSelect = (planId) => {
    // Navigate to signup page with selected plan
    router.push(`/signup?plan=${planId}`)
  }

  const calculateSavings = (monthlyPrice) => {
    const yearlyPrice = monthlyPrice * 12 * 0.86 // ~14% discount
    const monthlySavings = monthlyPrice * 12 - yearlyPrice
    return Math.round(monthlySavings)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      <Head>
        <title>תמחור - VidGenAI | בחר את החבילה המתאימה לך</title>
        <meta name="description" content="בחר מבין חבילות התמחור שלנו והתחל ליצור תוכן מדהים עם בינה מלאכותית. תמחור שקוף וללא הפתעות." />
        <meta name="keywords" content="תמחור, חבילות, מנוי, בינה מלאכותית, יצירת תוכן" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VidGenAI
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                התחברות
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            בחר את <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">החבילה המתאימה</span> לך
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            צור תוכן מדהים עם בינה מלאכותית. תמחור שקוף, ללא התחייבות, ואפשרות לביטול בכל עת
          </p>
          
          {/* Yearly/Monthly Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`text-lg font-medium ml-3 ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              חיוב חודשי
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isYearly ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium mr-3 ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              חיוב שנתי
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mr-2">
                חסכון של 14%! 💰
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-20">
          {plans.map((plan) => {
            const displayPrice = isYearly ? plan.price : plan.priceMonthly
            const yearlyPrice = plan.priceMonthly * 12
            const savings = isYearly && plan.priceMonthly > 0 ? yearlyPrice - plan.price : 0
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 h-full flex flex-col ${
                  plan.popular 
                    ? 'border-purple-500 transform scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                } ${selectedPlan === plan.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      🔥 הכי פופולרי
                    </span>
                  </div>
                )}
                
                {plan.trial && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      🎁 ניסיון חינם
                    </span>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 min-h-[3rem] flex items-center justify-center">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">₪{displayPrice.toLocaleString()}</span>
                      <span className="text-gray-600 mr-2 text-lg">/{isYearly ? 'שנה' : 'חודש'}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="text-green-600 text-sm font-semibold mb-3">
                        חסכון של ₪{savings.toLocaleString()} בשנה! 🎉
                      </div>
                    )}
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4">
                      <span className="text-blue-800 text-lg font-semibold">{plan.credits.toLocaleString()} {plan.credits === 10 ? 'קרדיטים' : plan.credits <= 100 ? 'פוסטים' : 'קרדיטים'}</span>
                      <div className="text-blue-600 text-sm">{plan.trial ? 'לניסיון' : 'בחודש'}</div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        ✅ <span className="mr-2">כלול בחבילה:</span>
                      </h4>
                      <ul className="space-y-2 min-h-[12rem]">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <span className="text-green-500 font-bold ml-3 mt-0.5">•</span>
                            <span className="text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          ❌ <span className="mr-2">מגבלות:</span>
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start text-gray-600">
                              <span className="text-red-500 font-bold ml-3 mt-0.5">•</span>
                              <span className="text-sm leading-relaxed">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full ${plan.buttonColor} text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg text-lg`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Credit Packages Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              🪙 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">חבילות קרדיטים</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              מודל גמיש - קנה קרדיטים והשתמש בהם כרצונך
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 inline-block shadow-sm">
              <p className="text-blue-800 font-semibold text-lg">
                💡 <strong>1 קרדיט = 1 פוסט מלא</strong> (כולל טקסט + תמונה/וידאו)
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 50 Credits Package */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 transition-all duration-300 hover:shadow-2xl hover:scale-105 p-8 h-full flex flex-col">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">חבילת התחלה</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-blue-600">₪149</span>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6">
                  <span className="text-blue-800 text-2xl font-bold">50 קרדיטים</span>
                  <div className="text-blue-600 text-sm mt-1">₪2.98 לקרדיט</div>
                </div>
              </div>
              
              <div className="flex-1 space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">50 פוסטים מלאים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">שימוש גמיש בקרדיטים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">תוקף של 6 חודשים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">מושלם לעסקים קטנים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 font-bold ml-3 text-lg">🎯</span>
                  <span className="text-blue-700 font-medium">ללא התחייבות חודשית</span>
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/checkout?credits=50&price=149')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg text-lg"
              >
                קנה 50 קרדיטים
              </button>
            </div>

            {/* 100 Credits Package */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-500 transition-all duration-300 hover:shadow-2xl hover:scale-105 p-8 transform scale-105 relative h-full flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg">
                  🔥 הכי משתלם
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">חבילת פרו</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-purple-600">₪249</span>
                  <div className="text-sm text-gray-500 mt-2">
                    <span className="line-through">₪298</span> <span className="text-green-600 font-semibold">חיסכון של ₪49!</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                  <span className="text-purple-800 text-2xl font-bold">100 קרדיטים</span>
                  <div className="text-purple-600 text-sm mt-1">₪2.49 לקרדיט</div>
                </div>
              </div>
              
              <div className="flex-1 space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">100 פוסטים מלאים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">שימוש גמיש בקרדיטים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">תוקף של 12 חודשים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold ml-3 text-lg">✓</span>
                  <span className="text-gray-700 font-medium">אידאלי לעסקים בינוניים</span>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-600 font-bold ml-3 text-lg">🎁</span>
                  <span className="text-purple-700 font-semibold">בונוס: 20% חיסכון</span>
                </div>
              </div>
              
              <button 
                onClick={() => router.push('/checkout?credits=100&price=249')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg text-lg"
              >
                קנה 100 קרדיטים
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 inline-block shadow-sm">
              <div className="flex items-center justify-center gap-6 text-orange-700">
                <span className="text-3xl">💰</span>
                <div>
                  <div className="font-bold text-xl">גמישות מלאה</div>
                  <div className="text-lg mt-2">השתמש בקרדיטים איך שנוח לך - פוסטים, וידאו, אודיו או קריינות</div>
                </div>
                <span className="text-3xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Usage Guide */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
              🎯 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">מדריך שימוש בקרדיטים</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">📝 יצירת טקסט</span>
                  <span className="font-bold text-blue-600 text-xl">{creditUsage.textGeneration} קרדיט</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">🖼️ יצירת תמונה</span>
                  <span className="font-bold text-purple-600 text-xl">{creditUsage.imageGeneration} קרדיטים</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">🎵 יצירת אודיו</span>
                  <span className="font-bold text-green-600 text-xl">{creditUsage.audioGeneration} קרדיטים</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">🎬 יצירת וידאו</span>
                  <span className="font-bold text-red-600 text-xl">{creditUsage.videoGeneration} קרדיטים</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">👥 ניתוח קהל יעד</span>
                  <span className="font-bold text-yellow-600 text-xl">{creditUsage.audienceAnalysis} קרדיטים</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">🧠 תובנות AI</span>
                  <span className="font-bold text-indigo-600 text-xl">{creditUsage.aiInsights} קרדיטים</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">🔗 אינטגרציה חברתית</span>
                  <span className="font-bold text-pink-600 text-xl">{creditUsage.socialIntegration} קרדיטים</span>
                </div>
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-sm">
                  <span className="font-semibold text-gray-800 text-lg">📋 תבניות מותאמות</span>
                  <span className="font-bold text-gray-600 text-xl">{creditUsage.customTemplates} קרדיט</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 inline-block">
                <p className="text-blue-800 font-semibold text-lg">
                  💡 <strong>טיפ:</strong> פוסט מלא (טקסט + תמונה + קריינות) = כ-5 קרדיטים בסך הכל
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Table Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            📈 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">טבלת החזר השקעה (ROI)</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            ראה כמה תחסוך בהשוואה לעבודה עם פרילנסרים וסוכנויות
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-right font-semibold">חבילה</th>
                    <th className="px-6 py-4 text-center font-semibold">מחיר חודשי</th>
                    <th className="px-6 py-4 text-center font-semibold">מה הלקוח מקבל בפועל</th>
                    <th className="px-6 py-4 text-center font-semibold">ערך מקביל בשוק</th>
                    <th className="px-6 py-4 text-center font-semibold">ROI משוער</th>
                    <th className="px-6 py-4 text-center font-semibold">הסבר</th>
                  </tr>
                </thead>
                <tbody>                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-6 font-semibold text-blue-600">חבילה בסיסית</td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-2xl font-bold text-gray-800">₪99</div>
                      <div className="text-xs text-gray-500">חודשי</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-sm">
                        <div className="font-medium mb-1">עד 5 פוסטים חודשיים</div>
                        <div className="text-gray-600">טקסט + תמונות + קריינות + תזמון</div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-lg font-bold text-orange-600">₪400-₪600</div>
                      <div className="text-xs text-gray-500">עבודה עם פרילנסר</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full font-bold">
                        פי 4-6
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center text-sm text-gray-600">
                      חיסכון זמן עצום + איכות מקצועית
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200 hover:bg-purple-50 transition-colors bg-purple-25">
                    <td className="px-6 py-6 font-semibold text-purple-600">
                      חבילה מתקדמת
                      <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full inline-block mr-2">פופולרי</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-2xl font-bold text-gray-800">₪199</div>
                      <div className="text-xs text-gray-500">חודשי</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-sm">
                        <div className="font-medium mb-1">עד 20 פוסטים + סרטוני AI</div>
                        <div className="text-gray-600">חיבור רשתות חברתיות + ניתוח ביצועים</div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-lg font-bold text-orange-600">₪1,200-₪2,000</div>
                      <div className="text-xs text-gray-500">סושיאל מנג'ר מקצועי</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full font-bold">
                        פי 6-10
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center text-sm text-gray-600">
                      פתרון מלא לעסק בינוני
                    </td>
                  </tr>

                  <tr className="hover:bg-pink-50 transition-colors">
                    <td className="px-6 py-6 font-semibold text-pink-600">חבילת סוכנות</td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-2xl font-bold text-gray-800">₪499</div>
                      <div className="text-xs text-gray-500">חודשי</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-sm">
                        <div className="font-medium mb-1">עד 10 לקוחות + White Label</div>
                        <div className="text-gray-600">API + גישה לצוותים + דוחות מפורטים</div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="text-lg font-bold text-orange-600">₪4,000-₪8,000</div>
                      <div className="text-xs text-gray-500">סוכנות דיגיטלית מלאה</div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full font-bold">
                        פי 8-16
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center text-sm text-gray-600">
                      פתרון לסוכנויות וחברות
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 inline-block">
              <div className="flex items-center justify-center gap-4 text-green-700">
                <span className="text-2xl">💰</span>
                <div>
                  <div className="font-bold text-lg">חיסכון ממוצע של 80%-90%</div>
                  <div className="text-sm">בהשוואה לעבודה עם פרילנסרים וסוכנויות</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            ❓ <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">שאלות נפוצות על התמחור</span>
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">האם אוכל לשנות חבילה במהלך החודש?</h3>
              <p className="text-gray-600 leading-relaxed">כן! תוכל לשדרג או לשנמך חבילה בכל עת. השינויים ייכנסו לתוקף מיד והחיוב יתואם בהתאם.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">מה קורה לקרדיטים שלא השתמשתי בהם?</h3>
              <p className="text-gray-600 leading-relaxed">קרדיטים מתחדשים כל חודש ולא נשארים מחודש לחודש. אנו ממליצים להשתמש בכל הקרדיטים שלך במהלך החודש.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">האם יש התחייבות לתקופה מסוימת?</h3>
              <p className="text-gray-600 leading-relaxed">לא! כל החבילות שלנו ללא התחייבות ותוכל לבטל בכל עת דרך הדשבורד האישי שלך.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">האם המחירים כוללים מע"ם?</h3>
              <p className="text-gray-600 leading-relaxed">כל המחירים באתר כוללים מע"ם. אין עלויות נסתרות או הפתעות בחיוב.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">מה ההבדל בין חבילות מנוי לחבילות קרדיטים?</h3>
              <p className="text-gray-600 leading-relaxed">חבילות המנוי מספקות כמות קבועה של תוכן כל חודש, בעוד חבילות הקרדיטים מאפשרות גמישות מלאה בשימוש לפי הצורך שלך.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">מוכן להתחיל?</h2>
            <p className="text-xl mb-8 opacity-90">בחר חבילה והתחל ליצור תוכן מדהים עוד היום</p>
            <Link
              href="/auth"
              className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition duration-200 inline-block text-lg shadow-lg transform hover:scale-105"
            >
              התחל עכשיו חינם 🚀
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

