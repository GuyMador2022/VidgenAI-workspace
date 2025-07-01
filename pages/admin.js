import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Admin() {
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

  // Load existing API keys on component mount
  useEffect(() => {
    loadApiKeys()
  }, [])

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
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2"
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔧 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">לוח בקרה אדמין</span>
          </h1>
          <p className="text-lg text-gray-600">
            ניהול מפתחות API עבור כל הפלטפורמות
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
