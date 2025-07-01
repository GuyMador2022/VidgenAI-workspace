import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for demonstration - replace with API calls
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        name: 'קמפיין רכב חדש - מרצדס',
        user: 'יוסי כהן',
        userEmail: 'yossi@example.com',
        status: 'active',
        platform: 'Facebook',
        budget: 5000,
        spent: 3200,
        impressions: 125000,
        clicks: 2500,
        conversions: 45,
        createdAt: '2024-01-15',
        lastModified: '2024-01-20',
        description: 'קמפיין פרסום לרכב מרצדס חדש עם דמו וידאו AI'
      },
      {
        id: 2,
        name: 'מותג אופנה - קולקציית קיץ',
        user: 'שרה לוי',
        userEmail: 'sarah@fashion.com',
        status: 'paused',
        platform: 'Instagram',
        budget: 3000,
        spent: 1800,
        impressions: 85000,
        clicks: 1200,
        conversions: 28,
        createdAt: '2024-01-10',
        lastModified: '2024-01-18',
        description: 'קמפיין לקולקציית קיץ עם סרטוני AI'
      },
      {
        id: 3,
        name: 'טכנולוgia - אפליקציה חדשה',
        user: 'דוד מזרחי',
        userEmail: 'david@tech.com',
        status: 'completed',
        platform: 'LinkedIn',
        budget: 8000,
        spent: 7500,
        impressions: 200000,
        clicks: 4200,
        conversions: 85,
        createdAt: '2024-01-05',
        lastModified: '2024-01-25',
        description: 'השקת אפליקציית טכנולוגיה חדשה'
      },
      {
        id: 4,
        name: 'מסעדה - תפריט חורף',
        user: 'רחל אברהם',
        userEmail: 'rachel@restaurant.com',
        status: 'draft',
        platform: 'WhatsApp',
        budget: 2000,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        createdAt: '2024-01-22',
        lastModified: '2024-01-22',
        description: 'קמפיין לתפריט חורף חדש'
      }
    ]
    
    setTimeout(() => {
      setCampaigns(mockCampaigns)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'פעיל'
      case 'paused': return 'מושהה'
      case 'completed': return 'הושלם'
      case 'draft': return 'טיוטה'
      default: return status
    }
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Facebook': return '📘'
      case 'Instagram': return '📸'
      case 'LinkedIn': return '💼'
      case 'WhatsApp': return '📱'
      default: return '🌐'
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.user.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleCampaignAction = (campaignId, action) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: action, lastModified: new Date().toISOString().split('T')[0] }
        : campaign
    ))
  }

  const viewCampaignDetails = (campaign) => {
    setSelectedCampaign(campaign)
    setShowDetails(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען קמפיינים...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Head>
        <title>ניהול קמפיינים - VidGenAI Admin</title>
        <meta name="description" content="ניהול וניטור קמפיינים של כל המשתמשים" />
      </Head>

      {/* Admin Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-4">
            <a 
              href="/admin-users" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              👥 ניהול משתמשים
            </a>
            <a 
              href="/admin-analytics" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              📊 אנליטיקה
            </a>
            <a 
              href="/admin" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              🔑 API Keys
            </a>
            <a 
              href="/admin-pricing" 
              className="text-gray-600 hover:text-blue-600 pb-2 transition-colors"
            >
              💎 עדכון תמחור
            </a>
            <a 
              href="/admin-campaigns" 
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2"
            >
              🎯 קמפיינים אדמין
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ניהול קמפיינים</span>
          </h1>
          <p className="text-lg text-gray-600">
            ניטור וניהול קמפיינים של כל המשתמשים בפלטפורמה
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl text-green-600 mb-2">📈</div>
            <div className="text-2xl font-bold text-gray-800">{campaigns.filter(c => c.status === 'active').length}</div>
            <div className="text-gray-600">קמפיינים פעילים</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl text-yellow-600 mb-2">⏸️</div>
            <div className="text-2xl font-bold text-gray-800">{campaigns.filter(c => c.status === 'paused').length}</div>
            <div className="text-gray-600">קמפיינים מושהים</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl text-blue-600 mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-800">{campaigns.filter(c => c.status === 'completed').length}</div>
            <div className="text-gray-600">קמפיינים הושלמו</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl text-purple-600 mb-2">💰</div>
            <div className="text-2xl font-bold text-gray-800">₪{campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}</div>
            <div className="text-gray-600">סה"כ הוצאות</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="חיפוש לפי שם קמפיין או משתמש..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">כל הסטטוסים</option>
                <option value="active">פעיל</option>
                <option value="paused">מושהה</option>
                <option value="completed">הושלם</option>
                <option value="draft">טיוטה</option>
              </select>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">קמפיין</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">משתמש</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">פלטפורמה</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">סטטוס</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">תקציב</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">הוצאות</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">ביצועים</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">פעולות</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.user}</div>
                        <div className="text-sm text-gray-500">{campaign.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-xl ml-2">{getPlatformIcon(campaign.platform)}</span>
                        <span className="text-sm text-gray-900">{campaign.platform}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ₪{campaign.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">₪{campaign.spent.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0}% מהתקציב
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div>{campaign.impressions.toLocaleString()} הצגות</div>
                        <div>{campaign.clicks.toLocaleString()} קליקים</div>
                        <div>{campaign.conversions} המרות</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewCampaignDetails(campaign)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          הצג
                        </button>
                        {campaign.status === 'active' && (
                          <button
                            onClick={() => handleCampaignAction(campaign.id, 'paused')}
                            className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                          >
                            השהה
                          </button>
                        )}
                        {campaign.status === 'paused' && (
                          <button
                            onClick={() => handleCampaignAction(campaign.id, 'active')}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            הפעל
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Details Modal */}
        {showDetails && selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">פרטי קמפיין</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">שם הקמפיין</label>
                      <p className="text-gray-900">{selectedCampaign.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">משתמש</label>
                      <p className="text-gray-900">{selectedCampaign.user}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">פלטפורמה</label>
                      <p className="text-gray-900">{getPlatformIcon(selectedCampaign.platform)} {selectedCampaign.platform}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">סטטוס</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCampaign.status)}`}>
                        {getStatusText(selectedCampaign.status)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">תקציב</label>
                      <p className="text-gray-900">₪{selectedCampaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">הוצאות</label>
                      <p className="text-gray-900">₪{selectedCampaign.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">תאריך יצירה</label>
                      <p className="text-gray-900">{selectedCampaign.createdAt}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">עודכן לאחרונה</label>
                      <p className="text-gray-900">{selectedCampaign.lastModified}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
                    <p className="text-gray-900">{selectedCampaign.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedCampaign.impressions.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">הצגות</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedCampaign.clicks.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">קליקים</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedCampaign.conversions}</div>
                      <div className="text-sm text-gray-600">המרות</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    סגור
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            ← חזור לעמוד הבית
          </a>
        </div>
      </div>
    </div>
  )
}
