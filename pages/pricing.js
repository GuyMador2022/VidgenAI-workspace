import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminPricing() {
  const [plans, setPlans] = useState([
    {
      id: 'free',
      name: 'חשיפה',
      price: 0,
      priceMonthly: 0,
      credits: 10,
      features: [
        '10 קרדיטים בחודש',
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
      active: true
    },
    {
      id: 'basic',
      name: 'בסיסי',
      price: 48,
      priceMonthly: 5,
      credits: 100,
      features: [
        '100 קרדיטים בחודש',
        'יצירת טקסט ותמונות',
        'ניתוח קהל יעד בסיסי',
        'שמירת עד 25 פרויקטים',
        'תמיכה באימייל',
        'תבניות מוכנות'
      ],
      limitations: [
        'ללא יצירת וידאו',
        'ללא יצירת אודיו מתקדם'
      ],
      active: true
    },
    {
      id: 'professional',
      name: 'מקצועי',
      price: 168,
      priceMonthly: 18,
      credits: 500,
      features: [
        '500 קרדיטים בחודש',
        'יצירת טקסט, תמונות ווידאו',
        'ניתוח קהל מתקדם',
        'פרויקטים ללא הגבלה',
        'תמיכה בצ\'אט חי',
        'אינטגרציה עם רשתות חברתיות',
        'יצירת אודיו בסיסית',
        'תבניות פרימיום'
      ],
      limitations: [],
      active: true,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'ארגוני',
      price: 480,
      priceMonthly: 48,
      credits: 2000,
      features: [
        '2000 קרדיטים בחודש',
        'כל הפיצ\'רים ללא הגבלה',
        'ניתוח קהל מתקדם ו-AI insights',
        'אינטגרציה מלאה עם כל הפלטפורמות',
        'תמיכה VIP 24/7',
        'API מותאם אישית',
        'יצירת אודיו ווידאו ברמה מקצועית',
        'ניהול צוות ומשתמשים',
        'דוחות מתקדמים'
      ],
      limitations: [],
      active: true
    }
  ])

  const [creditUsage, setCreditUsage] = useState({
    textGeneration: 1,
    imageGeneration: 3,
    audioGeneration: 5,
    videoGeneration: 10,
    audienceAnalysis: 2,
    aiInsights: 3,
    socialIntegration: 2,
    customTemplates: 1
  })

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [showAddPlan, setShowAddPlan] = useState(false)

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: 0,
    priceMonthly: 0,
    credits: 0,
    features: [''],
    limitations: [''],
    active: true
  })

  const handleUpdatePlan = (planId, updatedPlan) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, ...updatedPlan } : plan
    ))
    setEditingPlan(null)
    setMessage('החבילה עודכנה בהצלחה!')
    setMessageType('success')
  }

  const handleTogglePlanStatus = (planId) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, active: !plan.active } : plan
    ))
  }

  const handleDeletePlan = (planId) => {
    if (confirm('האם אתה בטוח שברצונך למחוק חבילה זו?')) {
      setPlans(prev => prev.filter(plan => plan.id !== planId))
      setMessage('החבילה נמחקה בהצלחה!')
      setMessageType('success')
    }
  }

  const handleAddPlan = () => {
    const planId = 'plan_' + Date.now()
    const planToAdd = {
      ...newPlan,
      id: planId,
      features: newPlan.features.filter(f => f.trim() !== ''),
      limitations: newPlan.limitations.filter(l => l.trim() !== '')
    }
    setPlans(prev => [...prev, planToAdd])
    setNewPlan({
      name: '',
      price: 0,
      priceMonthly: 0,
      credits: 0,
      features: [''],
      limitations: [''],
      active: true
    })
    setShowAddPlan(false)
    setMessage('חבילה חדשה נוספה בהצלחה!')
    setMessageType('success')
  }

  const handleUpdateCreditUsage = (key, value) => {
    setCreditUsage(prev => ({
      ...prev,
      [key]: parseInt(value) || 0
    }))
  }

  const handleSaveChanges = async () => {
    setLoading(true)
    try {
      // In real app, save to database
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage('כל השינויים נשמרו בהצלחה!')
      setMessageType('success')
    } catch (error) {
      setMessage('שגיאה בשמירת השינויים')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Head>
        <title>ניהול תמחור - VidGenAI Admin</title>
        <meta name="description" content="ניהול חבילות התמחור והגדרות מחירים" />
      </Head>

      {/* Admin Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-4">
            <Link 
              href="/admin-users" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              👥 ניהול משתמשים
            </Link>
            <Link 
              href="/admin-analytics" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              📊 אנליטיקה
            </Link>
            <Link 
              href="/admin" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              🔑 API Keys
            </Link>
            <Link 
              href="/pricing" 
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2"
            >
              💎 עדכון תמחור
            </Link>
            <Link 
              href="/admin-campaigns" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              🎯 קמפיינים אדמין
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💎 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ניהול תמחור</span>
          </h1>
          <p className="text-lg text-gray-600">
            עדכון חבילות התמחור, מחירים והגדרות קרדיטים
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            messageType === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddPlan(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              ➕ הוסף חבילה חדשה
            </button>
            <Link
              href="/plans"
              target="_blank"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              👁️ צפה בדף הלקוחות
            </Link>
          </div>
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'שומר...' : '💾 שמור את כל השינויים'}
          </button>
        </div>

        {/* Plans Management */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-xl shadow-lg border-2 p-6 ${
              !plan.active ? 'opacity-60 border-gray-300' : 
              plan.popular ? 'border-purple-500' : 'border-gray-200'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      plan.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {plan.active ? 'פעיל' : 'לא פעיל'}
                    </span>
                    {plan.popular && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                        פופולרי
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="עריכה"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleTogglePlanStatus(plan.id)}
                    className={`p-2 ${plan.active ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                    title={plan.active ? 'השבת' : 'הפעל'}
                  >
                    {plan.active ? '⏸️' : '▶️'}
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="מחיקה"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₪{plan.price}</div>
                  <div className="text-sm text-blue-600">מחיר שנתי</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">₪{plan.priceMonthly}</div>
                  <div className="text-sm text-purple-600">מחיר חודשי</div>
                </div>
              </div>

              <div className="text-center p-3 bg-green-50 rounded-lg mb-4">
                <div className="text-xl font-bold text-green-600">{plan.credits.toLocaleString()}</div>
                <div className="text-sm text-green-600">קרדיטים בחודש</div>
              </div>

              <div className="space-y-2">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">תכונות ({plan.features.length}):</h4>
                  <div className="text-sm text-gray-600 max-h-20 overflow-y-auto">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div key={index}>• {feature}</div>
                    ))}
                    {plan.features.length > 3 && <div>... ועוד {plan.features.length - 3}</div>}
                  </div>
                </div>
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-1">מגבלות ({plan.limitations.length}):</h4>
                    <div className="text-sm text-gray-600 max-h-20 overflow-y-auto">
                      {plan.limitations.slice(0, 2).map((limitation, index) => (
                        <div key={index}>• {limitation}</div>
                      ))}
                      {plan.limitations.length > 2 && <div>... ועוד {plan.limitations.length - 2}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Credit Usage Settings */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🎯 הגדרות שימוש בקרדיטים
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(creditUsage).map(([key, value]) => {
              const labels = {
                textGeneration: '📝 יצירת טקסט',
                imageGeneration: '🖼️ יצירת תמונה',
                audioGeneration: '🎵 יצירת אודיו',
                videoGeneration: '🎬 יצירת וידאו',
                audienceAnalysis: '👥 ניתוח קהל יעד',
                aiInsights: '🧠 תובנות AI',
                socialIntegration: '🔗 אינטגרציה חברתית',
                customTemplates: '📋 תבניות מותאמות'
              }
              
              return (
                <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">{labels[key]}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={value}
                      onChange={(e) => handleUpdateCreditUsage(key, e.target.value)}
                      className="w-20 px-3 py-1 border border-gray-300 rounded text-center"
                    />
                    <span className="text-sm text-gray-600">קרדיטים</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            ← חזור לעמוד הבית
          </Link>
        </div>
      </div>
    </div>
  )
}

