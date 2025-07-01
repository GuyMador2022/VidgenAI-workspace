import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CampaignCard from '../components/CampaignCard'

export default function Home() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, active, completed, paused
  const [sortBy, setSortBy] = useState('roi') // roi, spent, revenue, date
  const [viewMode, setViewMode] = useState('grid') // grid, table
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalRevenue: 0,
    totalROI: 0,
    activeCampaigns: 0
  })

  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = async () => {
    try {
      // Mock data - in real app this would come from API
      const mockCampaigns = [
        {
          id: 1,
          name: 'קמפיין נדל״ן - פרויקט המרכז',
          status: 'active',
          spent: 2500,
          revenue: 15000,
          roi: 600,
          impressions: 125000,
          clicks: 3200,
          conversions: 45,
          platform: ['facebook', 'instagram'],
          createdAt: '2025-06-20',
          videoUrl: 'https://example.com/video1.mp4'
        },
        {
          id: 2,
          name: 'קמפיין מוצרי יופי - השקת מותג',
          status: 'active',
          spent: 1800,
          revenue: 8500,
          roi: 472,
          impressions: 85000,
          clicks: 2100,
          conversions: 28,
          platform: ['instagram', 'tiktok'],
          createdAt: '2025-06-15',
          videoUrl: 'https://example.com/video2.mp4'
        },
        {
          id: 3,
          name: 'קמפיין שירותים משפטיים',
          status: 'completed',
          spent: 3200,
          revenue: 22000,
          roi: 688,
          impressions: 156000,
          clicks: 4800,
          conversions: 67,
          platform: ['facebook', 'linkedin'],
          createdAt: '2025-06-10',
          videoUrl: 'https://example.com/video3.mp4'
        },
        {
          id: 4,
          name: 'קמפיין מסעדות - פתיחת סניף',
          status: 'paused',
          spent: 1200,
          revenue: 3600,
          roi: 300,
          impressions: 45000,
          clicks: 1200,
          conversions: 18,
          platform: ['instagram', 'facebook'],
          createdAt: '2025-06-05',
          videoUrl: 'https://example.com/video4.mp4'
        },
        {
          id: 5,
          name: 'קמפיין מוצרי טכנולוגיה',
          status: 'active',
          spent: 4500,
          revenue: 28000,
          roi: 622,
          impressions: 200000,
          clicks: 6500,
          conversions: 89,
          platform: ['youtube', 'facebook'],
          createdAt: '2025-05-28',
          videoUrl: 'https://example.com/video5.mp4'
        }
      ]

      setCampaigns(mockCampaigns)
      
      // Calculate stats
      const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0)
      const totalRevenue = mockCampaigns.reduce((sum, c) => sum + c.revenue, 0)
      const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length
      const totalROI = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent * 100) : 0
      
      setStats({
        totalSpent,
        totalRevenue,
        totalROI: Math.round(totalROI),
        activeCampaigns
      })
    } catch (error) {
      console.error('Error loading campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true
    return campaign.status === filter
  })

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'roi':
        return b.roi - a.roi
      case 'spent':
        return b.spent - a.spent
      case 'revenue':
        return b.revenue - a.revenue
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt)
      default:
        return 0
    }
  })

  const handleView = (campaign) => {
    console.log('View campaign:', campaign.name)
    // Navigate to detailed campaign view
  }

  const handleEdit = (campaign) => {
    console.log('Edit campaign:', campaign.name)
    // Navigate to campaign edit page
  }

  const handleDelete = (campaign) => {
    if (confirm(`האם אתה בטוח שברצונך למחוק את הקמפיין "${campaign.name}"?`)) {
      console.log('Delete campaign:', campaign.name)
      // Handle delete logic
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'פעיל'
      case 'completed': return 'הושלם'
      case 'paused': return 'מושהה'
      default: return 'לא ידוע'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS'
    }).format(amount)
  }

  const getPlatformEmoji = (platforms) => {
    const platformEmojis = {
      facebook: '📘',
      instagram: '📸',
      linkedin: '💼',
      tiktok: '🎵',
      youtube: '📺'
    }
    return platforms.map(p => platformEmojis[p] || '🌐').join(' ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען קמפיינים...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>דשבורד קמפיינים - VidGenAI</title>
        <meta name="description" content="דשבורד מקיף לניהול ומעקב אחר קמפיינים" />
      </Head>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">דשבורד קמפיינים VidGenAI</h1>
              <p className="text-gray-600">ניהול ומעקב מקיף אחר כל הקמפיינים שלך</p>
            </div>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="/create-campaign" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                <span>➕</span>
                קמפיין חדש
              </Link>
              <Link href="/products" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                <span>📦</span>
                סל מוצרים
              </Link>
              <Link href="/plans" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                <span>💎</span>
                תמחור
              </Link>
              <Link href="/admin" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                <span>⚙️</span>
                ניהול
              </Link>
              <Link href="/landing-he" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2">
                <span>🏠</span>
                דף הבית
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">סה״כ הוצאות</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSpent)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">סה״כ הכנסות</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ROI כולל</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalROI}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-r-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">קמפיינים פעילים</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">סטטיסטיקות מהירות</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{campaigns.length}</p>
              <p className="text-sm text-gray-600">סה״כ קמפיינים</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{campaigns.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-gray-600">פעילים</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{campaigns.filter(c => c.status === 'completed').length}</p>
              <p className="text-sm text-gray-600">הושלמו</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{campaigns.filter(c => c.status === 'paused').length}</p>
              <p className="text-sm text-gray-600">מושהים</p>
            </div>
          </div>
        </div>

        {/* ROI Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">גרף ROI לאורך זמן</h2>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <p className="font-medium">גרף ROI יוצג כאן</p>
              <p className="text-sm">ניתן להטמיע Chart.js או Recharts</p>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">סקירת ביצועים</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Campaigns */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-4">🏆 קמפיינים מובילים (לפי ROI)</h4>
              <div className="space-y-3">
                {sortedCampaigns.slice(0, 3).map((campaign, index) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{campaign.name}</p>
                        <p className="text-xs text-gray-500">{getPlatformEmoji(campaign.platform)}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-green-600">{campaign.roi}%</p>
                      <p className="text-xs text-gray-500">{formatCurrency(campaign.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Distribution */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-4">📊 פילוח לפי פלטפורמות</h4>
              <div className="space-y-3">
                {['facebook', 'instagram', 'youtube', 'tiktok', 'linkedin'].map(platform => {
                  const platformCampaigns = campaigns.filter(c => c.platform.includes(platform))
                  const platformRevenue = platformCampaigns.reduce((sum, c) => sum + c.revenue, 0)
                  const platformEmoji = {'facebook': '📘', 'instagram': '📸', 'youtube': '📺', 'tiktok': '🎵', 'linkedin': '💼'}[platform]
                  
                  if (platformCampaigns.length === 0) return null
                  
                  return (
                    <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <span className="text-xl">{platformEmoji}</span>
                        <div>
                          <p className="font-medium text-gray-800 text-sm capitalize">{platform}</p>
                          <p className="text-xs text-gray-500">{platformCampaigns.length} קמפיינים</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-blue-600">{formatCurrency(platformRevenue)}</p>
                        <p className="text-xs text-gray-500">הכנסות</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">סינון לפי סטטוס:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">כל הקמפיינים</option>
                  <option value="active">פעילים</option>
                  <option value="completed">הושלמו</option>
                  <option value="paused">מושהים</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">מיין לפי:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="roi">ROI (גבוה לנמוך)</option>
                  <option value="revenue">הכנסות (גבוה לנמוך)</option>
                  <option value="spent">הוצאות (גבוה לנמוך)</option>
                  <option value="date">תאריך יצירה (חדש לישן)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                מציג {sortedCampaigns.length} מתוך {campaigns.length} קמפיינים
              </div>
              
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  🔳 רשת
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📋 טבלה
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Display */}
        {sortedCampaigns.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">אין קמפיינים להצגה</h3>
            <p className="text-gray-600 mb-6">לא נמצאו קמפיינים בפילטר הנוכחי</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200">
              צור קמפיין ראשון
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">שם הקמפיין</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">סטטוס</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">פלטפורמות</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">הוצאות</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">הכנסות</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">ROI</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">המרות</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">פעולות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div>
                            <p className="font-medium text-gray-900">{campaign.name}</p>
                            <p className="text-xs text-gray-500">{new Date(campaign.createdAt).toLocaleDateString('he-IL')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(campaign.status)}`}>
                          {getStatusText(campaign.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {campaign.platform.map(p => (
                            <span key={p} className="text-lg">
                              {{'facebook': '📘', 'instagram': '📸', 'youtube': '📺', 'tiktok': '🎵', 'linkedin': '💼'}[p]}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {formatCurrency(campaign.spent)}
                      </td>
                      <td className="px-6 py-4 font-medium text-green-600">
                        {formatCurrency(campaign.revenue)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${campaign.roi > 300 ? 'text-green-600' : campaign.roi > 100 ? 'text-blue-600' : 'text-red-600'}`}>
                          {campaign.roi}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        <div>
                          <p className="font-medium">{campaign.conversions}</p>
                          <p className="text-xs text-gray-500">{((campaign.conversions / campaign.clicks) * 100).toFixed(1)}% CVR</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleView(campaign)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            title="צפה בקמפיין"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleEdit(campaign)}
                            className="text-yellow-600 hover:text-yellow-800 font-medium text-sm"
                            title="ערוך קמפיין"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(campaign)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                            title="מחק קמפיין"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

