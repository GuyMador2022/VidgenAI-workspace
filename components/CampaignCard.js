import { useState } from 'react'

export default function CampaignCard({ campaign, onEdit, onDelete, onView }) {
  const [showDetails, setShowDetails] = useState(false)

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

  const getRoiColor = (roi) => {
    if (roi > 500) return 'text-green-600'
    if (roi > 300) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{campaign.name}</h3>
            <p className="text-sm text-gray-500">נוצר: {campaign.createdAt}</p>
            <div className="mt-2">
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(campaign.status)}`}>
                {getStatusText(campaign.status)}
              </span>
            </div>
          </div>
          <div className="text-2xl">
            {getPlatformEmoji(campaign.platform)}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">הוצאות</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(campaign.spent)}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">הכנסות</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(campaign.revenue)}</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">ROI</p>
            <p className={`text-lg font-bold ${getRoiColor(campaign.roi)}`}>{campaign.roi}%</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">המרות</p>
            <p className="text-lg font-bold text-orange-600">{campaign.conversions}</p>
          </div>
        </div>

        {/* Performance Metrics */}
        {showDetails && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">מדדי ביצועים מפורטים</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-500">הצגות</p>
                <p className="text-sm font-semibold">{campaign.impressions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">קליקים</p>
                <p className="text-sm font-semibold">{campaign.clicks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CTR</p>
                <p className="text-sm font-semibold">{((campaign.clicks / campaign.impressions) * 100).toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-800 transition duration-200"
          >
            {showDetails ? 'הסתר פרטים' : 'הצג פרטים'} {showDetails ? '▲' : '▼'}
          </button>
          
          <div className="space-x-2 space-x-reverse">
            <button
              onClick={() => onView(campaign)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs transition duration-200"
            >
              צפה
            </button>
            <button
              onClick={() => onEdit(campaign)}
              className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs transition duration-200"
            >
              ערוך
            </button>
            <button
              onClick={() => onDelete(campaign)}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs transition duration-200"
            >
              מחק
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
