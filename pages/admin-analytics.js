import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    revenueData: [],
    apiUsageData: [],
    planDistribution: [],
    topUsers: []
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30days') // 7days, 30days, 90days, 1year

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
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
          { name: 'יוסי אברהם', email: 'yossi@example.com', spent: 1990, projects: 15 },
          { name: 'שרה לוי', email: 'sarah@example.com', spent: 2380, projects: 22 },
          { name: 'דני כהן', email: 'danny@example.com', spent: 890, projects: 8 },
          { name: 'מיכל רוזן', email: 'michal@example.com', spent: 650, projects: 5 },
          { name: 'עמית ברק', email: 'amit@example.com', spent: 1250, projects: 12 }
        ]
      }

      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error loading analytics:', error)
    }
    setLoading(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(amount)
  }

  const calculateGrowthRate = (current, previous) => {
    if (!previous) return 0
    return ((current - previous) / previous * 100).toFixed(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען נתוני אנליטיקה...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Head>
        <title>אנליטיקה מתקדמת - VidGenAI Admin</title>
        <meta name="description" content="ניתוח מתקדם של נתוני המערכת" />
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
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2"
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
              href="/admin-pricing" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
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
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">אנליטיקה מתקדמת</h1>
              <p className="text-gray-600">ניתוח מפורט של ביצועי המערכת, הכנסות ושימוש</p>
            </div>
            
            <div className="flex gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">7 ימים אחרונים</option>
                <option value="30days">30 ימים אחרונים</option>
                <option value="90days">90 ימים אחרונים</option>
                <option value="1year">שנה אחרונה</option>
              </select>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                רענן נתונים
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">משתמשים פעילים</p>
                <p className="text-3xl font-bold text-blue-600">148</p>
                <p className="text-xs text-green-600">↑ 23.5% מהחודש הקודם</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">הכנסות החודש</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(34200)}</p>
                <p className="text-xs text-green-600">↑ 20.1% מהחודש הקודם</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">פרויקטים חדשים</p>
                <p className="text-3xl font-bold text-purple-600">87</p>
                <p className="text-xs text-red-600">↓ 5.3% מהחודש הקודם</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">שימוש API</p>
                <p className="text-3xl font-bold text-orange-600">8,136</p>
                <p className="text-xs text-green-600">↑ 12.8% מהחודש הקודם</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">מגמת הכנסות</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.revenueData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '200px' }}>
                    <div 
                      className="w-full bg-green-500 rounded-t absolute bottom-0"
                      style={{ height: `${(item.revenue / 35000) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">{item.month}</p>
                  <p className="text-xs font-bold text-green-600">{formatCurrency(item.revenue)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">גידול במשתמשים</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.userGrowth.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '200px' }}>
                    <div 
                      className="w-full bg-blue-500 rounded-t absolute bottom-0"
                      style={{ height: `${(item.totalUsers / 150) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">{new Date(item.date).toLocaleDateString('he-IL')}</p>
                  <p className="text-xs font-bold text-blue-600">{item.totalUsers}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* API Usage Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">שימוש ב-API</h3>
            <div className="space-y-4">
              {analytics.apiUsageData.map((api, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{api.api}</span>
                    <span className="text-sm text-gray-600">{api.usage}/{api.limit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                      style={{ width: `${(api.usage / api.limit) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">עלות: {formatCurrency(api.cost)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">התפלגות תוכניות</h3>
            <div className="space-y-4">
              {analytics.planDistribution.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      plan.plan === 'Enterprise' ? 'bg-purple-500' : 
                      plan.plan === 'Premium' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-800">{plan.plan}</p>
                      <p className="text-sm text-gray-600">{plan.users} משתמשים ({plan.percentage}%)</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800">{formatCurrency(plan.revenue)}</p>
                    <p className="text-xs text-gray-500">הכנסה</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Users Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">משתמשים מובילים</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">#</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">שם</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">אימייל</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">סה\"כ הוצאה</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">פרויקטים</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topUsers.map((user, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 font-bold text-green-600">{formatCurrency(user.spent)}</td>
                    <td className="py-3 px-4 text-gray-600">{user.projects}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        צפה בפרטים
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export and Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            יצא דוח מלא
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            שלח דוח למייל
          </button>
        </div>
      </div>
    </div>
  )
}

