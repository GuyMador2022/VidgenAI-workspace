import Head from 'next/head'
import { useState } from 'react'

export default function LandingHe() {
  const [email, setEmail] = useState('')

  const handleGetStarted = () => {
    // Redirect to auth page for signup
    window.location.href = '/auth'
  }

  const handleSignUp = () => {
    // Redirect to auth page with email prefilled
    const emailParam = email ? `?email=${encodeURIComponent(email)}` : ''
    window.location.href = `/auth${emailParam}`
  }

  const handleLoginClick = () => {
    // Redirect to auth page in login mode
    window.location.href = '/auth?mode=login'
  }

  const handleRegisterClick = () => {
    // Redirect to auth page in register mode
    window.location.href = '/auth?mode=register'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800" dir="rtl">
      <Head>
        <title>VidGenAI - צור סרטוני שיווק עם בינה מלאכותית</title>
        <meta name="description" content="צור תסריטים, תמונות, דיבוב וסרטונים עם כלי AI מתקדמים" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-white text-2xl font-bold">
          VidGenAI
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 py-16 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
          צור סרטוני שיווק
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            עם בינה מלאכותית
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          צור תסריטים, תמונות, דיבוב וסרטונים עם כלי AI מתקדמים.
          <br />
          נהל את הקמפיינים שלך, עקוב אחר התקציב ונתח ביצועים.
        </p>

        <button 
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-xl text-lg transition duration-300 transform hover:scale-105 shadow-2xl"
        >
          התחל עכשיו
        </button>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: 'כתיבת תסריט',
              description: 'יצירת תסריטים עם בינה מלאכותית לסרטוני השיווק שלך'
            },
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              title: 'יצירת תמונות',
              description: 'צור ויזואלים מרהיבים עם DALL-E ו-Midjourney'
            },
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              ),
              title: 'דיבוב מקצועי',
              description: 'סינתזת קול מקצועית עם ElevenLabs'
            },
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              ),
              title: 'יצירת סרטונים',
              description: 'שלב הכל לסרטוני שיווק מקצועיים'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <div className="text-white mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            כל מה שצריך לשיווק בווידאו
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '🎯 ניהול קמפיינים',
                description: 'ארגן ונהל מספר קמפיינים מלוח בקרה אחד'
              },
              {
                title: '💰 מעקב תקציב',
                description: 'עקוב אחר הוצאות ו-ROI בכל קמפיינים השיווק שלך'
              },
              {
                title: '📊 אנליטיקס ביצועים',
                description: 'תובנות מפורטות ומדדים לאופטימיזציה של התוכן'
              },
              {
                title: '🔄 פרסום רב-פלטפורמי',
                description: 'פרסם לפייסבוק, אינסטגרם, לינקדאין ועוד'
              },
              {
                title: '🎨 תבניות מקצועיות',
                description: 'תבניות מעוצבות מראש לתעשיות ושימושים שונים'
              },
              {
                title: '⚡ מהיר כברק',
                description: 'צור סרטונים שלמים תוך דקות, לא שעות'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-8 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          מוכן לשנות את השיווק שלך?
        </h2>
        <p className="text-xl text-gray-200 mb-8">
          הצטרף לאלפי משווקים שכבר משתמשים ב-VidGenAI
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse max-w-md mx-auto">
          <input
            type="email"
            placeholder="הכנס את המייל שלך"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-right"
            dir="rtl"
          />
          <button 
            onClick={handleSignUp}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            התחל בחינם
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-8 text-center">
          <p className="text-gray-400">
            © 2025 VidGenAI. מופעל על ידי <span className="text-white">Skylens.ai</span>
          </p>
          <div className="mt-6">
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105"
            >
              התחל עכשיו
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

