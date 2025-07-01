import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [isNewUser, setIsNewUser] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for welcome message
    if (router.query.welcome === 'true') {
      setShowWelcome(true)
      setIsNewUser(true)
      setShowOnboarding(true)
      // Clear the query param
      router.replace('/userdashboard', undefined, { shallow: true })
    }

    // Load user data (in real app, from authentication)
    loadUserData()
  }, [router.query])

  const loadUserData = async () => {
    try {
      // Mock user data - in real app, get from session/JWT
      const mockUser = {
        id: 'user_123',
        name: 'יוסי כהן',
        email: 'yossi@example.com',
        plan: 'professional',
        credits: 500,
        creditsUsed: 45,
        subscriptionStatus: 'active',
        nextBillingDate: '2025-07-30',
        joinDate: '2025-06-01'
      }
      
      setUser(mockUser)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPlanDetails = (planName) => {
    const plans = {
      free: { name: 'חינמי', color: 'gray', features: ['טקסט בלבד'] },
      basic: { name: 'בסיסי', color: 'blue', features: ['טקסט + תמונות'] },
      professional: { name: 'מקצועי', color: 'purple', features: ['טקסט + תמונות + וידאו'] },
      enterprise: { name: 'ארגוני', color: 'pink', features: ['כל הפיצ\'רים'] }
    }
    return plans[planName] || plans.free
  }

  const getCreditsPercentage = () => {
    if (!user) return 0
    return ((user.credits - user.creditsUsed) / user.credits) * 100
  }

  const onboardingSteps = [
    {
      title: "ברוך הבא ל-VidGenAI! 🎉",
      description: "אנחנו נעזור לך להתחיל ליצור קמפיינים מדהימים עם בינה מלאכותית",
      icon: "🚀",
      highlight: null
    },
    {
      title: "בדוק את הקרדיטים שלך 💰",
      description: "יש לך קרדיטים זמינים שתוכל להשתמש בהם ליצירת תוכן. הקרדיטים מתחדשים כל חודש",
      icon: "🪙",
      highlight: "credits"
    },
    {
      title: "צור את הקמפיין הראשון שלך 🎬",
      description: "לחץ על 'יצירת קמפיין' כדי להתחיל ליצור את הקמפיין הראשון שלך עם AI",
      icon: "🎯",
      highlight: "create-campaign"
    },
    {
      title: "הוסף את המוצרים שלך 📦",
      description: "הוסף את המוצרים או השירותים שלך כדי שה-AI יוכל ליצור תוכן רלוונטי",
      icon: "📋",
      highlight: "products"
    },
    {
      title: "עקוב אחר הביצועים 📊",
      description: "בדוק את האנליטיקות כדי לראות איך הקמפיינים שלך מתפקדים",
      icon: "📈",
      highlight: "analytics"
    }
  ]

  const nextOnboardingStep = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      setShowOnboarding(false)
    }
  }

  const skipOnboarding = () => {
    setShowOnboarding(false)
  }

  const OnboardingModal = () => {
    if (!showOnboarding) return null

    const currentStep = onboardingSteps[onboardingStep]

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{currentStep.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{currentStep.title}</h3>
            <p className="text-gray-600 leading-relaxed">{currentStep.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-center space-x-2">
              {onboardingSteps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === onboardingStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={skipOnboarding}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              דלג
            </button>
            
            <div className="flex space-x-3">
              {onboardingStep > 0 && (
                <button 
                  onClick={() => setOnboardingStep(onboardingStep - 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  קודם
                </button>
              )}
              <button 
                onClick={nextOnboardingStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {onboardingStep === onboardingSteps.length - 1 ? 'סיים' : 'הבא'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">טוען דשבורד...</h2>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>דשבורד - VidGenAI</title>
        <meta name="description" content="דשבורד האישי שלך בפלטפורמת VidGenAI" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Onboarding Modal */}
        <OnboardingModal />
        
        {/* Welcome Message */}
        {showWelcome && (
          <div className="bg-green-500 text-white p-4 text-center">
            <p className="font-medium">🎉 ברוך הבא! החשבון שלך הופעל בהצלחה</p>
            <button 
              onClick={() => setShowWelcome(false)}
              className="mt-2 text-green-100 hover:text-white underline"
            >
              סגור הודעה
            </button>
          </div>
        )}

        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">שלום, {user?.name}! 👋</h1>
                <p className="text-gray-600">ברוך הבא לדשבורד האישי שלך</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Plan Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">החבילה שלך</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getPlanDetails(user?.plan).color}-100 text-${getPlanDetails(user?.plan).color}-800`}>
                  {getPlanDetails(user?.plan).name}
                </span>
              </div>
              <div className="space-y-2">
                {getPlanDetails(user?.plan).features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
              {user?.plan !== 'enterprise' && (
                <div className="mt-4">
                  <a 
                    href="/pricing" 
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    שדרג את החבילה ← 
                  </a>
                </div>
              )}
            </div>

            {/* Credits Status */}
            <div className={`bg-white rounded-xl shadow-lg p-6 ${
              showOnboarding && onboardingSteps[onboardingStep]?.highlight === 'credits' ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">קרדיטים</h3>
                <span className="text-2xl">🪙</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>נותרו</span>
                  <span>{(user?.credits || 0) - (user?.creditsUsed || 0)} מתוך {user?.credits || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getCreditsPercentage()}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">הקרדיטים מתחדשים ב: {user?.nextBillingDate}</p>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">סטטוס חשבון</h3>
                <span className="text-2xl">👤</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">סטטוס:</span>
                  <span className="text-green-600 font-medium">פעיל</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">חבר מאז:</span>
                  <span className="text-gray-800">{user?.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">אימייל:</span>
                  <span className="text-gray-800 text-xs">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">פעולות מהירות</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <a 
                href="/create-campaign" 
                className={`bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-4 text-center transition-colors group ${
                  showOnboarding && onboardingSteps[onboardingStep]?.highlight === 'create-campaign' ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎬</div>
                <h4 className="font-medium text-gray-800">יצירת קמפיין</h4>
                <p className="text-sm text-gray-600">צור קמפיין חדש</p>
              </a>

              <a 
                href="/analytics" 
                className={`bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg p-4 text-center transition-colors group ${
                  showOnboarding && onboardingSteps[onboardingStep]?.highlight === 'analytics' ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">�</div>
                <h4 className="font-medium text-gray-800">אנליטיקס</h4>
                <p className="text-sm text-gray-600">נתונים ותובנות</p>
              </a>

              <a 
                href="/products" 
                className={`bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg p-4 text-center transition-colors group ${
                  showOnboarding && onboardingSteps[onboardingStep]?.highlight === 'products' ? 'ring-4 ring-green-500 ring-opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">�</div>
                <h4 className="font-medium text-gray-800">המוצרים שלי</h4>
                <p className="text-sm text-gray-600">נהל את המוצרים שלך</p>
              </a>

              <a 
                href="/pricing" 
                className="bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 rounded-lg p-4 text-center transition-colors group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💎</div>
                <h4 className="font-medium text-gray-800">שדרוג חבילה</h4>
                <p className="text-sm text-gray-600">יותר פיצ'רים</p>
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">פעילות אחרונה</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm">🎬</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">יצירת קמפיין וידאו</p>
                    <p className="text-sm text-gray-600">לפני 2 שעות</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">-10 קרדיטים</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm">📊</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">ניתוח קהל יעד</p>
                    <p className="text-sm text-gray-600">לפני 1 יום</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">-2 קרדיטים</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 text-sm">🖼️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">יצירת תמונות למדיה</p>
                    <p className="text-sm text-gray-600">לפני 3 ימים</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">-6 קרדיטים</span>
              </div>
            </div>
          </div>
        </div>

        <OnboardingModal />
      </div>
    </>
  )
}
