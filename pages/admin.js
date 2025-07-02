import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Admin() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('analytics')
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    elevenlabs: '',
    runway: '',
    firebase: '',
    stripe: '',
    whatsapp: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'
  
  // Analytics state
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    revenueData: [],
    apiUsageData: [],
    planDistribution: [],
    topUsers: []
  })
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [timeRange, setTimeRange] = useState('30days')

  // Load existing API keys on component mount
  useEffect(() => {
    loadApiKeys()
    
    // Check for tab parameter in URL
    if (router.query.tab) {
      setActiveTab(router.query.tab)
    }
  }, [router.query.tab])

  // Load analytics when tab changes
  useEffect(() => {
    if (activeTab === 'analytics') {
      loadAnalytics()
    }
  }, [activeTab, timeRange])

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true)
      // Mock analytics data - in real app, this would come from API
      const mockAnalytics = {
        userGrowth: [
          { date: '2025-05-01', newUsers: 12, totalUsers: 45 },
          { date: '2025-05-15', newUsers: 18, totalUsers: 63 },
          { date: '2025-06-01', newUsers: 25, totalUsers: 88 },
          { date: '2025-06-15', newUsers: 32, totalUsers: 120 },
          { date: '2025-06-29', newUsers: 28, totalUsers: 148 }
        ],
        revenueData: [
          { month: 'ינואר', revenue: 12500, profit: 8750 },
          { month: 'פברואר', revenue: 15200, profit: 10640 },
          { month: 'מרץ', revenue: 18900, profit: 13230 },
          { month: 'אפריל', revenue: 22100, profit: 15470 },
          { month: 'מאי', revenue: 28500, profit: 19950 },
          { month: 'יוני', revenue: 34200, profit: 23940 }
        ],
        apiUsageData: [
          { api: 'OpenAI', usage: 3250, cost: 162.5, limit: 5000 },
          { api: 'ElevenLabs', usage: 1890, cost: 94.5, limit: 3000 },
          { api: 'Runway', usage: 856, cost: 428, limit: 1500 },
          { api: 'DALL-E', usage: 2140, cost: 107, limit: 4000 }
        ],
        planDistribution: [
          { plan: 'Basic', users: 89, percentage: 60.1, revenue: 3471 },
          { plan: 'Premium', users: 45, percentage: 30.4, revenue: 13455 },
          { plan: 'Enterprise', users: 14, percentage: 9.5, revenue: 17274 }
        ],
        topUsers: [
          { name: 'יוסי כהן', email: 'yossi@example.com', plan: 'Enterprise', revenue: 1299, videos: 45 },
          { name: 'שרה לוי', email: 'sara@example.com', plan: 'Premium', revenue: 399, videos: 28 },
          { name: 'דני משה', email: 'danny@example.com', plan: 'Premium', revenue: 299, videos: 22 }
        ]
      }
      
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setAnalyticsLoading(false)
    }
  }

  const loadApiKeys = async () => {
    try {
      const response = await fetch('/api/admin/get-api-keys')
      if (response.ok) {
        const data = await response.json()
        setApiKeys(data.apiKeys || {})
      }
    } catch (error) {
      console.error('Error loading API keys:', error)
    }
  }

  const handleInputChange = (platform, value) => {
    setApiKeys(prev => ({
      ...prev,
      [platform]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/admin/save-api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKeys })
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage('מפתחות API נשמרו בהצלחה! 🎉')
        setMessageType('success')
      } else {
        setMessage(data.error || 'שגיאה בשמירת המפתחות')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('שגיאה בחיבור לשרת')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const testApiKey = async (platform) => {
    try {
      const response = await fetch('/api/admin/test-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform, apiKey: apiKeys[platform] })
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage(`מפתח ${platform} עובד בהצלחה! ✅`)
        setMessageType('success')
      } else {
        setMessage(`מפתח ${platform} לא תקין: ${data.error}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(`שגיאה בבדיקת מפתח ${platform}`)
      setMessageType('error')
    }
  }

  const platforms = [
    {
      key: 'openai',
      name: 'OpenAI',
      description: 'לכתיבת תסריטים ויצירת תמונות',
      icon: '🤖',
      placeholder: 'sk-...',
      docs: 'https://platform.openai.com/api-keys'
    },
    {
      key: 'elevenlabs',
      name: 'ElevenLabs',
      description: 'לדיבוב ויצירת קול',
      icon: '🗣️',
      placeholder: 'elevenlabs-api-key',
      docs: 'https://elevenlabs.io/docs/api-reference'
    },
    {
      key: 'runway',
      name: 'RunwayML',
      description: 'לעיבוד ויצירת סרטונים',
      icon: '🎬',
      placeholder: 'runway-api-key',
      docs: 'https://docs.runwayml.com'
    },
    {
      key: 'firebase',
      name: 'Firebase',
      description: 'לניהול משתמשים ואחסון',
      icon: '🔥',
      placeholder: 'firebase-project-id',
      docs: 'https://console.firebase.google.com'
    },
    {
      key: 'stripe',
      name: 'Stripe',
      description: 'לעיבוד תשלומים',
      icon: '💳',
      placeholder: 'sk_test_...',
      docs: 'https://dashboard.stripe.com/apikeys'
    },
    {
      key: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'לשליחת הודעות ושיתוף',
      icon: '📱',
      placeholder: 'whatsapp-token',
      docs: 'https://developers.facebook.com/docs/whatsapp'
    },
    {
      key: 'facebook',
      name: 'Facebook',
      description: 'לפרסום קמפיינים',
      icon: '📘',
      placeholder: 'facebook-app-token',
      docs: 'https://developers.facebook.com'
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      description: 'לפרסום מקצועי',
      icon: '💼',
      placeholder: 'linkedin-api-key',
      docs: 'https://developer.linkedin.com'
    },
    {
      key: 'instagram',
      name: 'Instagram',
      description: 'לפרסום תמונות וסרטונים',
      icon: '📸',
      placeholder: 'instagram-token',
      docs: 'https://developers.facebook.com/docs/instagram-api'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Head>
        <title>ניהול מפתחות API - VidGenAI Admin</title>
        <meta name="description" content="ניהול מפתחות API לכל הפלטפורמות" />
      </Head>

      {/* Admin Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-4">
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`pb-2 transition-colors ${
                activeTab === 'analytics' 
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              � אנליטיקה
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`pb-2 transition-colors ${
                activeTab === 'users' 
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              � ניהול משתמשים
            </button>
            <button 
              onClick={() => setActiveTab('api-keys')}
              className={`pb-2 transition-colors ${
                activeTab === 'api-keys' 
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🔑 API Keys
            </button>
            <button 
              onClick={() => setActiveTab('pricing')}
              className={`pb-2 transition-colors ${
                activeTab === 'pricing' 
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              💎 עדכון תמחור
            </button>
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`pb-2 transition-colors ${
                activeTab === 'campaigns' 
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🎯 קמפיינים של משתמשים
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔧 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">לוח בקרה אדמין</span>
          </h1>
          <p className="text-lg text-gray-600">
            {activeTab === 'api-keys' && 'ניהול מפתחות API עבור כל הפלטפורמות'}
            {activeTab === 'analytics' && 'מעקב אחר ביצועים ונתונים'}
            {activeTab === 'users' && 'ניהול משתמשים ופעילות'}
            {activeTab === 'pricing' && 'עדכון תמחור תוכניות וקרדיטים'}
            {activeTab === 'campaigns' && 'ניהול קמפיינים של משתמשים ופרסום'}
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

        {/* Tab Content */}
        {activeTab === 'api-keys' && (
          <>
            {/* API Keys Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {platforms.map((platform) => (
                <div key={platform.key} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{platform.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{platform.name}</h3>
                        <p className="text-sm text-gray-600">{platform.description}</p>
                      </div>
                    </div>
                    <a 
                      href={platform.docs} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-sm underline"
                    >
                      תיעוד
                    </a>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder={platform.placeholder}
                      value={apiKeys[platform.key]}
                      onChange={(e) => handleInputChange(platform.key, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <button
                      onClick={() => testApiKey(platform.key)}
                      disabled={!apiKeys[platform.key]}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      בדוק מפתח
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    שומר...
                  </div>
                ) : (
                  'שמור את כל המפתחות 💾'
                )}
              </button>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            {/* Time Range Selector */}
            <div className="mb-6 flex justify-center">
              <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                {[
                  { value: '7days', label: '7 ימים' },
                  { value: '30days', label: '30 ימים' },
                  { value: '90days', label: '90 ימים' },
                  { value: '1year', label: 'שנה' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      timeRange === option.value
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {analyticsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">טוען נתונים...</p>
              </div>
            ) : (
              <>
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">סה״כ משתמשים</p>
                        <p className="text-3xl font-bold text-gray-900">3,080</p>
                        <div className="flex items-center">
                          <p className="text-sm text-green-600">+300 (+10.8%)</p>
                          <span className="text-green-500 mr-1">📈</span>
                        </div>
                      </div>
                      <div className="text-3xl">👥</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">הכנסות חודשיות</p>
                        <p className="text-3xl font-bold text-gray-900">₪42,850</p>
                        <div className="flex items-center">
                          <p className="text-sm text-green-600">+₪8,650 (+25.3%)</p>
                          <span className="text-green-500 mr-1">💹</span>
                        </div>
                      </div>
                      <div className="text-3xl">💰</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">שימוש API</p>
                        <p className="text-3xl font-bold text-gray-900">8,136</p>
                        <p className="text-sm text-yellow-600">68% מהמכסה</p>
                      </div>
                      <div className="text-3xl">🔌</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">קמפיינים פעילים</p>
                        <p className="text-3xl font-bold text-gray-900">42</p>
                        <p className="text-sm text-blue-600">+5 השבוע</p>
                      </div>
                      <div className="text-3xl">🎯</div>
                    </div>
                  </div>
                </div>

                {/* User Growth Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      צמיחת משתמשים - 
                      {timeRange === '7days' && 'שבוע נוכחי לעומת הקודם'}
                      {timeRange === '30days' && 'חודש נוכחי לעומת הקודם'}
                      {timeRange === '90days' && 'רבעון נוכחי לעומת הקודם'}
                      {timeRange === '1year' && 'שנה נוכחית לעומת הקודמת'}
                    </h3>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>
                          {timeRange === '7days' && 'השבוע'}
                          {timeRange === '30days' && 'דצמבר 2024'}
                          {timeRange === '90days' && 'Q4 2024'}
                          {timeRange === '1year' && '2024'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>
                          {timeRange === '7days' && 'שבוע שעבר'}
                          {timeRange === '30days' && 'נובמבר 2024'}
                          {timeRange === '90days' && 'Q3 2024'}
                          {timeRange === '1year' && '2023'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart Container */}
                  <div className="relative h-80">
                    <div className="absolute inset-0 flex items-end justify-between px-4">
                      {/* Chart Data - December vs November */}
                      {[
                        { day: '1', nov: 2650, dec: 2847, label: 'שבוע 1' },
                        { day: '7', nov: 2680, dec: 2890, label: 'שבוע 2' },
                        { day: '14', nov: 2720, dec: 2950, label: 'שבוע 3' },
                        { day: '21', nov: 2750, dec: 3020, label: 'שבוע 4' },
                        { day: '28', nov: 2780, dec: 3080, label: 'סוף חודש' }
                      ].map((data, index) => {
                        const maxValue = 3200;
                        const novHeight = (data.nov / maxValue) * 100;
                        const decHeight = (data.dec / maxValue) * 100;
                        
                        return (
                          <div key={index} className="flex flex-col items-center group relative">
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-20 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-opacity z-10">
                              <div>דצמבר: {data.dec.toLocaleString()}</div>
                              <div>נובמבר: {data.nov.toLocaleString()}</div>
                              <div className="text-green-400">+{data.dec - data.nov} (+{(((data.dec - data.nov) / data.nov) * 100).toFixed(1)}%)</div>
                            </div>
                            
                            {/* Bars Container */}
                            <div className="flex gap-1 items-end h-64">
                              {/* November Bar */}
                              <div 
                                className="w-8 bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer"
                                style={{ height: `${novHeight}%` }}
                              ></div>
                              
                              {/* December Bar */}
                              <div 
                                className="w-8 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                                style={{ height: `${decHeight}%` }}
                              ></div>
                            </div>
                            
                            {/* Labels */}
                            <div className="mt-2 text-center">
                              <div className="text-xs text-gray-600">{data.label}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-12">
                      <span>3,200</span>
                      <span>2,400</span>
                      <span>1,600</span>
                      <span>800</span>
                      <span>0</span>
                    </div>
                  </div>
                  
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {timeRange === '7days' && '156'}
                        {timeRange === '30days' && '3,080'}
                        {timeRange === '90days' && '8,950'}
                        {timeRange === '1year' && '24,800'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {timeRange === '7days' && 'השבוע'}
                        {timeRange === '30days' && 'בדצמבר'}
                        {timeRange === '90days' && 'ברבעון נוכחי'}
                        {timeRange === '1year' && 'ב-2024'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {timeRange === '7days' && '142'}
                        {timeRange === '30days' && '2,780'}
                        {timeRange === '90days' && '7,650'}
                        {timeRange === '1year' && '18,200'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {timeRange === '7days' && 'שבוע שעבר'}
                        {timeRange === '30days' && 'בנובמבר'}
                        {timeRange === '90days' && 'ברבעון קודם'}
                        {timeRange === '1year' && 'ב-2023'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {timeRange === '7days' && '+14'}
                        {timeRange === '30days' && '+300'}
                        {timeRange === '90days' && '+1,300'}
                        {timeRange === '1year' && '+6,600'}
                      </div>
                      <div className="text-sm text-gray-600">
                        גידול (
                        {timeRange === '7days' && '+9.9%'}
                        {timeRange === '30days' && '+10.8%'}
                        {timeRange === '90days' && '+17.0%'}
                        {timeRange === '1year' && '+36.3%'}
                        )
                      </div>
                    </div>
                  </div>
                </div>

                {/* API Usage Table */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">שימוש API</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">API</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">שימוש</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">מכסה</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">עלות</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700">אחוז</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {analytics.apiUsageData.map((api, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{api.api}</td>
                            <td className="px-4 py-3 text-gray-600">{api.usage.toLocaleString()}</td>
                            <td className="px-4 py-3 text-gray-600">{api.limit.toLocaleString()}</td>
                            <td className="px-4 py-3 text-gray-600">${api.cost}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${(api.usage / api.limit) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">
                                  {Math.round((api.usage / api.limit) * 100)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Daily New Users Chart */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">משתמשים חדשים יומיים - 7 ימים אחרונים</h3>
                  
                  <div className="grid grid-cols-7 gap-4 h-48">
                    {[
                      { day: 'א׳', users: 23, date: '25/11' },
                      { day: 'ב׳', users: 31, date: '26/11' },
                      { day: 'ג׳', users: 28, date: '27/11' },
                      { day: 'ד׳', users: 35, date: '28/11' },
                      { day: 'ה׳', users: 42, date: '29/11' },
                      { day: 'ו׳', users: 38, date: '30/11' },
                      { day: 'ש׳', users: 29, date: '01/12' }
                    ].map((data, index) => {
                      const maxUsers = 50;
                      const height = (data.users / maxUsers) * 100;
                      const isToday = index === 6;
                      
                      return (
                        <div key={index} className="flex flex-col items-center">
                          {/* Bar */}
                          <div className="flex-1 flex flex-col justify-end relative group">
                            {/* Tooltip */}
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity z-10">
                              {data.users} משתמשים חדשים
                            </div>
                            
                            <div 
                              className={`w-full rounded-t transition-all cursor-pointer ${
                                isToday 
                                  ? 'bg-blue-500 hover:bg-blue-600' 
                                  : 'bg-gray-400 hover:bg-gray-500'
                              }`}
                              style={{ height: `${height}%` }}
                            ></div>
                          </div>
                          
                          {/* Day Label */}
                          <div className="text-center mt-2">
                            <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                              {data.day}
                            </div>
                            <div className="text-xs text-gray-500">{data.date}</div>
                            <div className="text-xs font-semibold text-gray-800">{data.users}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Weekly Summary */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">סה״כ השבוע: </span>
                        <span className="font-bold text-blue-600">226 משתמשים חדשים</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">ממוצע יומי: </span>
                        <span className="font-bold text-blue-600">32.3 משתמשים</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Users Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">סה&quot;כ משתמשים</p>
                    <p className="text-3xl font-bold text-gray-900">2,847</p>
                    <p className="text-sm text-green-600">+12% השבוע</p>
                  </div>
                  <div className="text-3xl">👥</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">משתמשים פעילים</p>
                    <p className="text-3xl font-bold text-gray-900">1,943</p>
                    <p className="text-sm text-blue-600">68% מכלל המשתמשים</p>
                  </div>
                  <div className="text-3xl">✅</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">חדשים השבוע</p>
                    <p className="text-3xl font-bold text-gray-900">156</p>
                    <p className="text-sm text-green-600">+8% מהשבוע שעבר</p>
                  </div>
                  <div className="text-3xl">🆕</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">משתמשים פרמיום</p>
                    <p className="text-3xl font-bold text-gray-900">423</p>
                    <p className="text-sm text-yellow-600">15% מכלל המשתמשים</p>
                  </div>
                  <div className="text-3xl">💎</div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">משתמשים אחרונים</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">שם</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">אימייל</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">תוכנית</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">הצטרפות</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">סטטוס</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">פעולות</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">דני כהן</td>
                      <td className="px-4 py-3 text-gray-600">danny@example.com</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">פרמיום</span></td>
                      <td className="px-4 py-3 text-gray-600">01/07/2025</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">פעיל</span></td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-xs mr-2">עריכה</button>
                        <button className="text-red-600 hover:text-red-800 text-xs">חסימה</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">שרה לוי</td>
                      <td className="px-4 py-3 text-gray-600">sara@example.com</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">בסיסי</span></td>
                      <td className="px-4 py-3 text-gray-600">30/06/2025</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">פעיל</span></td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-xs mr-2">עריכה</button>
                        <button className="text-red-600 hover:text-red-800 text-xs">חסימה</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {/* Credits Sales Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">קרדיטים שנמכרו השבוע</p>
                    <p className="text-3xl font-bold text-gray-900">127,450</p>
                    <p className="text-sm text-green-600">+18% מהשבוע שעבר</p>
                  </div>
                  <div className="text-3xl">💳</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">הכנסות מקרדיטים</p>
                    <p className="text-3xl font-bold text-gray-900">₪22,840</p>
                    <p className="text-sm text-blue-600">מתוך ₪42,850 סה&quot;כ</p>
                  </div>
                  <div className="text-3xl">💰</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">ממוצע קרדיטים למשתמש</p>
                    <p className="text-3xl font-bold text-gray-900">520</p>
                    <p className="text-sm text-yellow-600">יתרת קרדיטים</p>
                  </div>
                  <div className="text-3xl">📊</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">חבילה פופולרית</p>
                    <p className="text-3xl font-bold text-gray-900">500</p>
                    <p className="text-sm text-green-600">62% מהמכירות</p>
                  </div>
                  <div className="text-3xl">⭐</div>
                </div>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Basic Plan */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">תוכנית בסיסית</h3>
                  <div className="text-3xl font-bold text-blue-600 mt-2">₪49</div>
                  <div className="text-gray-500">לחודש</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    עד 10 סרטונים לחודש
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    רזולוציה HD
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    תמיכה בסיסית
                  </li>
                </ul>
                <div className="space-y-2">
                  <input type="number" defaultValue="49" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                    עדכן מחיר
                  </button>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400">
                <div className="text-center mb-6">
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2">
                    הכי פופולרי
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">תוכנית פרמיום</h3>
                  <div className="text-3xl font-bold text-yellow-600 mt-2">₪149</div>
                  <div className="text-gray-500">לחודש</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    עד 50 סרטונים לחודש
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    רזולוציה 4K
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    תמיכה מועדפת
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    אפקטים מתקדמים
                  </li>
                </ul>
                <div className="space-y-2">
                  <input type="number" defaultValue="149" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <button className="w-full bg-yellow-600 text-white py-2 rounded-lg text-sm hover:bg-yellow-700">
                    עדכן מחיר
                  </button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">תוכנית מקצועית</h3>
                  <div className="text-3xl font-bold text-purple-600 mt-2">₪299</div>
                  <div className="text-gray-500">לחודש</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    סרטונים ללא הגבלה
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    רזולוציה 8K
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    תמיכה VIP
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    API מלא
                  </li>
                </ul>
                <div className="space-y-2">
                  <input type="number" defaultValue="299" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700">
                    עדכן מחיר
                  </button>
                </div>
              </div>
            </div>

            {/* Credits Pricing System */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">💳 מערכת תמחור קרדיטים</h3>
              
              {/* Credits Packages */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Starter Credits */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="text-center mb-4">
                    <div className="text-blue-600 text-2xl mb-2">🎯</div>
                    <h4 className="font-bold text-gray-800">חבילת מתחילים</h4>
                    <div className="text-2xl font-bold text-blue-600 mt-2">100</div>
                    <div className="text-sm text-gray-600">קרדיטים</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>מחיר:</span>
                      <span className="font-semibold">₪25</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>לקרדיט:</span>
                      <span className="text-blue-600">₪0.25</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <input type="number" defaultValue="25" placeholder="מחיר בשקלים" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                      עדכן מחיר
                    </button>
                  </div>
                </div>

                {/* Popular Credits */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-400 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      הכי פופולרי
                    </span>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-green-600 text-2xl mb-2">⭐</div>
                    <h4 className="font-bold text-gray-800">חבילה פופולרית</h4>
                    <div className="text-2xl font-bold text-green-600 mt-2">500</div>
                    <div className="text-sm text-gray-600">קרדיטים</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>מחיר:</span>
                      <span className="font-semibold">₪100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>לקרדיט:</span>
                      <span className="text-green-600">₪0.20</span>
                    </div>
                    <div className="text-xs text-green-600 font-semibold">חיסכון של 20%!</div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <input type="number" defaultValue="100" placeholder="מחיר בשקלים" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">
                      עדכן מחיר
                    </button>
                  </div>
                </div>

                {/* Business Credits */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                  <div className="text-center mb-4">
                    <div className="text-purple-600 text-2xl mb-2">💼</div>
                    <h4 className="font-bold text-gray-800">חבילת עסקים</h4>
                    <div className="text-2xl font-bold text-purple-600 mt-2">1,000</div>
                    <div className="text-sm text-gray-600">קרדיטים</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>מחיר:</span>
                      <span className="font-semibold">₪180</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>לקרדיט:</span>
                      <span className="text-purple-600">₪0.18</span>
                    </div>
                    <div className="text-xs text-purple-600 font-semibold">חיסכון של 28%!</div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <input type="number" defaultValue="180" placeholder="מחיר בשקלים" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700">
                      עדכן מחיר
                    </button>
                  </div>
                </div>

                {/* Enterprise Credits */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="text-center mb-4">
                    <div className="text-orange-600 text-2xl mb-2">🏢</div>
                    <h4 className="font-bold text-gray-800">חבילת ארגונים</h4>
                    <div className="text-2xl font-bold text-orange-600 mt-2">5,000</div>
                    <div className="text-sm text-gray-600">קרדיטים</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>מחיר:</span>
                      <span className="font-semibold">₪750</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>לקרדיט:</span>
                      <span className="text-orange-600">₪0.15</span>
                    </div>
                    <div className="text-xs text-orange-600 font-semibold">חיסכון של 40%!</div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <input type="number" defaultValue="750" placeholder="מחיר בשקלים" className="w-full px-3 py-2 border rounded-lg text-sm" />
                    <button className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm hover:bg-orange-700">
                      עדכן מחיר
                    </button>
                  </div>
                </div>
              </div>

              {/* Credits Usage Rates */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-800 mb-4">תעריפי שימוש בקרדיטים</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🎬 יצירת סרטון בסיסי</span>
                      <span className="text-blue-600 font-bold">10 קרדיטים</span>
                    </div>
                    <input type="number" defaultValue="10" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">📺 סרטון HD</span>
                      <span className="text-green-600 font-bold">15 קרדיטים</span>
                    </div>
                    <input type="number" defaultValue="15" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🎯 סרטון 4K</span>
                      <span className="text-purple-600 font-bold">25 קרדיטים</span>
                    </div>
                    <input type="number" defaultValue="25" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">✨ אפקטים מתקדמים</span>
                      <span className="text-yellow-600 font-bold">5 קרדיטים</span>
                    </div>
                    <input type="number" defaultValue="5" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🎵 הוספת אודיו</span>
                      <span className="text-indigo-600 font-bold">3 קרדיטים</span>
                    </div>
                    <input type="number" defaultValue="3" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🔄 עיבוד מחדש</span>
                      <span className="text-red-600 font-bold">2 קרדיטים</span>
                    </div>
                    <input type="number" defaultValue="2" className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 text-sm">
                    שמור תעריפי שימוש
                  </button>
                  <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 text-sm">
                    שמור כל חבילות הקרדיטים
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">הגדרות תמחור נוספות</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">הנחה שנתית (%)</label>
                  <input type="number" defaultValue="20" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">תקופת ניסיון (ימים)</label>
                  <input type="number" defaultValue="7" className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                שמור הגדרות
              </button>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Campaigns Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">קמפיינים פעילים</p>
                    <p className="text-3xl font-bold text-gray-900">127</p>
                    <p className="text-sm text-green-600">+8 השבוע</p>
                  </div>
                  <div className="text-3xl">🎯</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">סה&quot;כ צפיות</p>
                    <p className="text-3xl font-bold text-gray-900">2.4M</p>
                    <p className="text-sm text-blue-600">+15% השבוע</p>
                  </div>
                  <div className="text-3xl">👁️</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CTR ממוצע</p>
                    <p className="text-3xl font-bold text-gray-900">3.2%</p>
                    <p className="text-sm text-yellow-600">-0.1% השבוע</p>
                  </div>
                  <div className="text-3xl">📈</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">הכנסות מקמפיינים</p>
                    <p className="text-3xl font-bold text-gray-900">₪18.5K</p>
                    <p className="text-sm text-green-600">+12% השבוע</p>
                  </div>
                  <div className="text-3xl">💰</div>
                </div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">קמפיינים אחרונים של משתמשים</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                  צפה בכל הקמפיינים
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">שם קמפיין</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">משתמש</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">פלטפורמה</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">צפיות</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">CTR</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">סטטוס</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">פעולות</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">קמפיין נעלי ספורט</td>
                      <td className="px-4 py-3 text-gray-600">דני כהן</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">פייסבוק</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">15.2K</td>
                      <td className="px-4 py-3 text-gray-600">4.1%</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">פעיל</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-xs mr-2">צפייה</button>
                        <button className="text-red-600 hover:text-red-800 text-xs">השהה</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">פרומו מסעדה</td>
                      <td className="px-4 py-3 text-gray-600">שרה לוי</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">אינסטגרם</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">8.7K</td>
                      <td className="px-4 py-3 text-gray-600">2.8%</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">פעיל</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-xs mr-2">צפייה</button>
                        <button className="text-red-600 hover:text-red-800 text-xs">השהה</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">מוצרי יופי</td>
                      <td className="px-4 py-3 text-gray-600">מיכל רוזן</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">לינקדאין</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">12.1K</td>
                      <td className="px-4 py-3 text-gray-600">3.5%</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">מושהה</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-xs mr-2">צפייה</button>
                        <button className="text-green-600 hover:text-green-800 text-xs">הפעל</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Campaign Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">קמפיינים לפי פלטפורמה</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">פייסבוק</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <span className="text-sm text-gray-600">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">אינסטגרם</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-pink-600 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-sm text-gray-600">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">לינקדאין</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-blue-800 h-2 rounded-full" style={{width: '10%'}}></div>
                      </div>
                      <span className="text-sm text-gray-600">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">ביצועים השבוע</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">קמפיינים חדשים</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">קמפיינים שהושלמו</span>
                    <span className="font-semibold">17</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ממוצע צפיות לקמפיין</span>
                    <span className="font-semibold">18.9K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">הכנסה לקמפיין</span>
                    <span className="font-semibold">₪146</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-8">
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
