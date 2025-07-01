import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    campaigns: [],
    totalViews: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    topPerformingCampaigns: [],
    recentActivity: [],
    platformStats: []
  })
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const [selectedCampaign, setSelectedCampaign] = useState('all')
  const router = useRouter()

  useEffect(() => {
    loadAnalytics()
  }, [selectedPeriod, selectedCampaign])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      // Mock analytics data - in real app, this would come from API
      const mockAnalytics = {
        campaigns: [
          {
            id: 'campaign_1',
            name: 'קמפיין קיץ 2025',
            status: 'active',
            platform: 'facebook',
            budget: 2500,
            spent: 1850,
            impressions: 45230,
            clicks: 1890,
            conversions: 89,
            revenue: 4250,
            ctr: 4.18,
            cpc: 0.98,
            roas: 2.3,
            startDate: '2025-06-01',
            endDate: '2025-06-30'
          },
          {
            id: 'campaign_2',
            name: 'מבצע חזרה לבית ספר',
            status: 'active',
            platform: 'instagram',
            budget: 1800,
            spent: 1650,
            impressions: 32100,
            clicks: 1456,
            conversions: 67,
            revenue: 3120,
            ctr: 4.53,
            cpc: 1.13,
            roas: 1.89,
            startDate: '2025-06-15',
            endDate: '2025-07-15'
          },
          {
            id: 'campaign_3',
            name: 'קמפיין Brand Awareness',
            status: 'paused',
            platform: 'google',
            budget: 3200,
            spent: 2890,
            impressions: 78400,
            clicks: 2340,
            conversions: 156,
            revenue: 7800,
            ctr: 2.98,
            cpc: 1.24,
            roas: 2.7,
            startDate: '2025-05-01',
            endDate: '2025-06-01'
          }
        ],
        totalViews: 155730,
        totalClicks: 5686,
        totalConversions: 312,
        totalRevenue: 15170,
        topPerformingCampaigns: [
          { name: 'קמפיין Brand Awareness', metric: 'ROAS', value: '2.7x' },
          { name: 'קמפיין קיץ 2025', metric: 'CTR', value: '4.18%' },
          { name: 'מבצע חזרה לבית ספר', metric: 'Conversions', value: '67' }
        ],
        recentActivity: [
          { type: 'campaign_created', message: 'נוצר קמפיין חדש: "מבצע חזרה לבית ספר"', time: '2 שעות' },
          { type: 'campaign_paused', message: 'קמפיין "Brand Awareness" הושהה', time: '1 יום' },
          { type: 'budget_alert', message: 'תקציב קמפיין "קיץ 2025" מתקרב לסיום', time: '2 ימים' },
          { type: 'conversion', message: 'הושגו 5 המרות חדשות בקמפיין "קיץ 2025"', time: '3 ימים' }
        ],
        platformStats: [
          { platform: 'Facebook', campaigns: 1, spent: 1850, revenue: 4250, color: 'blue' },
          { platform: 'Instagram', campaigns: 1, spent: 1650, revenue: 3120, color: 'pink' },
          { platform: 'Google Ads', campaigns: 1, spent: 2890, revenue: 7800, color: 'red' }
        ]
      }
      
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: '📘',
      instagram: '📷',
      google: '🔍',
      tiktok: '🎵',
      youtube: '📺'
    }
    return icons[platform] || '📊'
  }

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-green-600 bg-green-100',
      paused: 'text-yellow-600 bg-yellow-100',
      completed: 'text-blue-600 bg-blue-100',
      draft: 'text-gray-600 bg-gray-100'
    }
    return colors[status] || 'text-gray-600 bg-gray-100'
  }

  const getStatusText = (status) => {
    const texts = {
      active: 'פעיל',
      paused: 'מושהה',
      completed: 'הושלם',
      draft: 'טיוטה'
    }
    return texts[status] || status
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('he-IL').format(num)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען נתוני אנליטיקות...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>אנליטיקות קמפיינים - VidGenAI</title>
        <meta name="description" content="צפה בנתוני האנליטיקות של הקמפיינים שלך" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">אנליטיקות קמפיינים</h1>
                <p className="text-gray-600 mt-1">נתוני ביצועים מפורטים של הקמפיינים שלך</p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Period Selector */}
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7days">7 ימים אחרונים</option>
                  <option value="30days">30 ימים אחרונים</option>
                  <option value="90days">90 ימים אחרונים</option>
                  <option value="6months">6 חודשים אחרונים</option>
                </select>
                
                {/* Campaign Filter */}
                <select 
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">כל הקמפיינים</option>
                  {analytics.campaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                  ))}
                </select>
                
                <button 
                  onClick={() => router.push('/create-campaign')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  קמפיין חדש
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">סך צפיות</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalViews)}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👁️</span>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-600 font-medium">+12.5%</span>
                <span className="text-gray-500 text-sm mr-2">מהחודש הקודם</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">סך קליקים</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalClicks)}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🖱️</span>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-600 font-medium">+8.2%</span>
                <span className="text-gray-500 text-sm mr-2">מהחודש הקודם</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">סך המרות</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalConversions)}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-600 font-medium">+15.8%</span>
                <span className="text-gray-500 text-sm mr-2">מהחודש הקודם</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">סך הכנסות</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalRevenue)}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-green-600 font-medium">+22.3%</span>
                <span className="text-gray-500 text-sm mr-2">מהחודש הקודם</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Campaign Performance Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">ביצועי קמפיינים</h3>
                  <p className="text-sm text-gray-600 mt-1">סקירה מפורטת של כל הקמפיינים</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          קמפיין
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          פלטפורמה
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          סטטוס
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          הוצאה
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          המרות
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ROAS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {analytics.campaigns.map((campaign) => (
                        <tr key={campaign.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {campaign.name.charAt(0)}
                              </div>
                              <div className="mr-4">
                                <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                                <div className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-lg ml-2">{getPlatformIcon(campaign.platform)}</span>
                              <span className="text-sm text-gray-900 capitalize">{campaign.platform}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                              {getStatusText(campaign.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>
                              <div className="font-medium">{formatCurrency(campaign.spent)}</div>
                              <div className="text-gray-500">מתוך {formatCurrency(campaign.budget)}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="font-medium">{campaign.conversions}</div>
                            <div className="text-gray-500">CTR: {campaign.ctr}%</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${campaign.roas >= 2 ? 'text-green-600' : campaign.roas >= 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {campaign.roas}x
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Platform Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">התפלגות לפי פלטפורמה</h3>
                <div className="space-y-4">
                  {analytics.platformStats.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full bg-${platform.color}-500 ml-3`}></div>
                        <span className="text-sm text-gray-900">{platform.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(platform.revenue)}</div>
                        <div className="text-xs text-gray-500">{platform.campaigns} קמפיינים</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Performing Campaigns */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">קמפיינים מובילים</h3>
                <div className="space-y-4">
                  {analytics.topPerformingCampaigns.map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-xs text-gray-500">{campaign.metric}</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-gray-900">{campaign.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">פעילות אחרונה</h3>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 ml-3"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900">{activity.message}</div>
                        <div className="text-xs text-gray-500 mt-1">{activity.time} ago</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
