import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [isNewUser, setIsNewUser] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
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
  }, [router.query, router])

  const loadUserData = async () => {
    try {
      console.log('Loading user data...')
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
      console.log('User data loaded:', mockUser)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      console.log('Setting loading to false')
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

  const OnboardingTooltip = () => {
    if (!showOnboarding) return null

    const currentStep = onboardingSteps[onboardingStep]
    
    // Don't show tooltip for steps without highlight
    if (!currentStep.highlight) {
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

    // Position tooltip based on highlight target
    const getTooltipPosition = () => {
      switch (currentStep.highlight) {
        case 'credits':
          return 'fixed top-32 left-8 transform'
        case 'create-campaign':
          return 'fixed top-96 right-8 transform'
        case 'products':
          return 'fixed top-96 left-8 transform'
        case 'analytics':
          return 'fixed bottom-40 left-8 transform'
        default:
          return 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      }
    }

    return (
      <>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />
        
        {/* Tooltip */}
        <div className={`${getTooltipPosition()} z-50 max-w-sm`}>
          <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-xl shadow-2xl p-6 border-2 border-blue-500 relative">
            
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{currentStep.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{currentStep.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{currentStep.description}</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-center space-x-1">
                {onboardingSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === onboardingStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button 
                onClick={skipOnboarding}
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                דלג
              </button>
              
              <div className="flex space-x-2">
                {onboardingStep > 0 && (
                  <button 
                    onClick={() => setOnboardingStep(onboardingStep - 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg transition-colors text-sm"
                  >
                    קודם
                  </button>
                )}
                <button 
                  onClick={nextOnboardingStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition-colors text-sm"
                >
                  {onboardingStep === onboardingSteps.length - 1 ? 'סיים' : 'הבא'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">טוען דשבורד...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">שגיאה בטעינת המשתמש</h2>
          <p className="text-gray-600">אנא נסה לרענן את הדף</p>
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
        {/* Onboarding Tooltip */}
        <OnboardingTooltip />
        
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
                  <Link 
                    href="/plans" 
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    שדרג את החבילה ← 
                  </Link>
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
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              <Link 
                href="/products" 
                className={`bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg p-4 text-center transition-colors group ${
                  showOnboarding && onboardingSteps[onboardingStep]?.highlight === 'products' ? 'ring-4 ring-green-500 ring-opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📦</div>
                <h4 className="font-medium text-gray-800">המוצרים שלי</h4>
                <p className="text-sm text-gray-600">נהל את המוצרים שלך</p>
              </Link>

              <Link 
                href="/create-campaign" 
                className={`bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-4 text-center transition-colors group ${
                  showOnboarding && onboardingSteps[onboardingStep]?.highlight === 'create-campaign' ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎬</div>
                <h4 className="font-medium text-gray-800">יצירת קמפיין</h4>
                <p className="text-sm text-gray-600">צור קמפיין חדש</p>
              </Link>

              <Link 
                href="/analytics" 
                className={`bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg p-4 text-center transition-colors group ${
                  showOnboarding && onboardingSteps[onboardingStep]?.highlight === 'analytics' ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                <h4 className="font-medium text-gray-800">אנליטיקס</h4>
                <p className="text-sm text-gray-600">נתונים ותובנות</p>
              </Link>

              <Link 
                href="/plans" 
                className="bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 rounded-lg p-4 text-center transition-colors group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💎</div>
                <h4 className="font-medium text-gray-800">שדרוג חבילה</h4>
                <p className="text-sm text-gray-600">יותר פיצ&apos;רים</p>
              </Link>
              </div>
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

        <OnboardingTooltip />
        <ShareCampaignModal 
          show={showShareModal}
          onClose={() => setShowShareModal(false)}
        />

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">VidGenAI</h3>
                <p className="text-gray-400">
                  הפלטפורמה המתקדמת ביותר ליצירת קמפיינים דיגיטליים עם בינה מלאכותית
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">מוצר</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#features" className="hover:text-white transition-colors">תכונות</Link></li>
                  <li><Link href="/plans" className="hover:text-white transition-colors">תמחור</Link></li>
                  <li><Link href="#campaigns" className="hover:text-white transition-colors">דוגמאות</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">תמיכה</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/faq" className="hover:text-white transition-colors">שאלות נפוצות</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">צור קשר</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">מרכז עזרה</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">קהילה</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#" className="hover:text-white transition-colors">פורום</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">בלוג</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">עדכונים</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 VidGenAI. כל הזכויות שמורות.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Share Campaign Modal Component
function ShareCampaignModal({ show, onClose }) {
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [shareDescription, setShareDescription] = useState('')
  const [shareSettings, setShareSettings] = useState({
    showMetrics: true,
    showBudget: false,
    allowComments: true,
    showCreator: true
  })

  const mockCampaigns = [
    { id: 1, name: 'קמפיין נדל״ן - פרויקט המרכז', status: 'completed' },
    { id: 2, name: 'קמפיין מוצרי יופי - השקת מותג', status: 'active' },
    { id: 3, name: 'קמפיין שירותים משפטיים', status: 'completed' }
  ]

  const handleShare = () => {
    // In real app, this would send to API
    alert('הקמפיין שותף בהצלחה! יופיע בגלריית הקמפיינים הציבורית')
    onClose()
    setSelectedCampaign('')
    setShareDescription('')
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">🌟 שתף קמפיין עם הקהילה</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">בחר קמפיין לשיתוף</label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">בחר קמפיין...</option>
                {mockCampaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name} ({campaign.status === 'completed' ? 'הושלם' : 'פעיל'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">תיאור לשיתוף (אופציונלי)</label>
              <textarea
                value={shareDescription}
                onChange={(e) => setShareDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ספר לקהילה על הקמפיין, האתגרים שפתרת והתוצאות שהשגת..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">הגדרות פרטיות</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareSettings.showMetrics}
                    onChange={(e) => setShareSettings(prev => ({ ...prev, showMetrics: e.target.checked }))}
                    className="ml-2"
                  />
                  הצג מדדי ביצועים (הצגות, קליקים, המרות)
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareSettings.showBudget}
                    onChange={(e) => setShareSettings(prev => ({ ...prev, showBudget: e.target.checked }))}
                    className="ml-2"
                  />
                  הצג תקציב וחיות הקמפיין
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareSettings.allowComments}
                    onChange={(e) => setShareSettings(prev => ({ ...prev, allowComments: e.target.checked }))}
                    className="ml-2"
                  />
                  אפשר תגובות ושאלות מהקהילה
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareSettings.showCreator}
                    onChange={(e) => setShareSettings(prev => ({ ...prev, showCreator: e.target.checked }))}
                    className="ml-2"
                  />
                  הצג את שמי כיוצר הקמפיין
                </label>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">💡 למה לשתף?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• עזור לאחרים ללמוד מהניסיון שלך</li>
                <li>• קבל משוב ועצות מיוצרים מנוסים</li>
                <li>• הצג את הכישורים שלך</li>
                <li>• בנה מוניטין בקהילה</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ביטול
            </button>
            <button
              onClick={handleShare}
              disabled={!selectedCampaign}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🌟 שתף עם הקהילה
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

