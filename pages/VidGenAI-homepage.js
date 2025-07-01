import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [showCampaignModal, setShowCampaignModal] = useState(false)

  useEffect(() => {
    // Mock featured campaigns data
    const mockFeaturedCampaigns = [
      {
        id: 1,
        title: 'מותג אופנה - קולקציית סתיו',
        creator: 'שרה כהן',
        industry: 'אופנה',
        platform: ['Instagram', 'Facebook'],
        description: 'קמפיין מרהיב לקולקציית סתיו חדשה עם וידאו AI מקצועי',
        metrics: {
          impressions: 2500000,
          clicks: 85000,
          conversions: 1250,
          revenue: 180000,
          roi: 425,
          ctr: 3.4,
          cpm: 15.5
        },
        videoThumbnail: '/thumbnails/fashion-campaign.jpg',
        videoUrl: 'https://example.com/fashion-video.mp4',
        tags: ['בגדים', 'אופנה', 'קולקציה', 'סתיו'],
        budget: 42000,
        duration: '3 שבועות',
        targetAudience: 'נשים 25-45',
        createdAt: '2025-06-15',
        shared: true,
        likes: 347,
        views: 1250
      },
      {
        id: 2,
        title: 'סטארטאפ טכנולוגיה - השקת אפליקציה',
        creator: 'דוד לוי',
        industry: 'טכנולוגיה',
        platform: ['LinkedIn', 'YouTube'],
        description: 'קמפיין השקה מוצלח לאפליקציית פינטק חדשנית',
        metrics: {
          impressions: 1800000,
          clicks: 72000,
          conversions: 890,
          revenue: 125000,
          roi: 380,
          ctr: 4.0,
          cpm: 12.8
        },
        videoThumbnail: '/thumbnails/tech-startup.jpg',
        videoUrl: 'https://example.com/tech-video.mp4',
        tags: ['טכנולוגיה', 'סטארטאפ', 'פינטק', 'אפליקציה'],
        budget: 33000,
        duration: '4 שבועות',
        targetAudience: 'מקצועיים 28-50',
        createdAt: '2025-06-10',
        shared: true,
        likes: 289,
        views: 945
      },
      {
        id: 3,
        title: 'מותג מזון - פיצות ארטיזן',
        creator: 'רחל אברהם',
        industry: 'מזון ומשקאות',
        platform: ['Instagram', 'TikTok'],
        description: 'קמפיין ויראלי לרשת פיצריות עם תוכן וידאו מפתה',
        metrics: {
          impressions: 3200000,
          clicks: 128000,
          conversions: 2150,
          revenue: 95000,
          roi: 290,
          ctr: 4.0,
          cpm: 8.2
        },
        videoThumbnail: '/thumbnails/pizza-brand.jpg',
        videoUrl: 'https://example.com/pizza-video.mp4',
        tags: ['מזון', 'פיצה', 'מסעדה', 'ארטיזן'],
        budget: 32800,
        duration: '2 שבועות',
        targetAudience: 'צעירים 18-35',
        createdAt: '2025-06-08',
        shared: true,
        likes: 512,
        views: 1680
      },
      {
        id: 4,
        title: 'שירותי ביטוח - חבילה משפחתית',
        creator: 'יוסי מזרחי',
        industry: 'שירותים פיננסיים',
        platform: ['Facebook', 'Google Ads'],
        description: 'קמפיין משכנע לביטוח משפחתי עם סיפורים אמיתיים',
        metrics: {
          impressions: 1500000,
          clicks: 45000,
          conversions: 380,
          revenue: 285000,
          roi: 850,
          ctr: 3.0,
          cpm: 18.5
        },
        videoThumbnail: '/thumbnails/insurance-family.jpg',
        videoUrl: 'https://example.com/insurance-video.mp4',
        tags: ['ביטוח', 'משפחה', 'פיננסים', 'אמון'],
        budget: 33500,
        duration: '6 שבועות',
        targetAudience: 'הורים 30-55',
        createdAt: '2025-05-25',
        shared: true,
        likes: 178,
        views: 623
      },
      {
        id: 5,
        title: 'קורס אונליין - שיווק דיגיטלי',
        creator: 'מיכל גולד',
        industry: 'חינוך',
        platform: ['LinkedIn', 'Facebook'],
        description: 'קמפיין לקורס שיווק דיגיטלי עם המלצות וסיפורי הצלחה',
        metrics: {
          impressions: 980000,
          clicks: 39200,
          conversions: 485,
          revenue: 145500,
          roi: 520,
          ctr: 4.0,
          cpm: 14.2
        },
        videoThumbnail: '/thumbnails/digital-marketing-course.jpg',
        videoUrl: 'https://example.com/course-video.mp4',
        tags: ['חינוך', 'שיווק', 'קורס', 'דיגיטלי'],
        budget: 28000,
        duration: '5 שבועות',
        targetAudience: 'מקצועיים 25-45',
        createdAt: '2025-05-20',
        shared: true,
        likes: 234,
        views: 892
      },
      {
        id: 6,
        title: 'מרכז כושר - מחלקה חדשה',
        creator: 'עמית ספורט',
        industry: 'בריאות וכושר',
        platform: ['Instagram', 'YouTube'],
        description: 'קמפיין אנרגטי לפתיחת מחלקת CrossFit חדשה',
        metrics: {
          impressions: 1200000,
          clicks: 48000,
          conversions: 320,
          revenue: 48000,
          roi: 180,
          ctr: 4.0,
          cpm: 11.5
        },
        videoThumbnail: '/thumbnails/gym-crossfit.jpg',
        videoUrl: 'https://example.com/gym-video.mp4',
        tags: ['כושר', 'CrossFit', 'בריאות', 'ספורט'],
        budget: 26700,
        duration: '3 שבועות',
        targetAudience: 'ספורטאים 20-40',
        createdAt: '2025-05-15',
        shared: true,
        likes: 423,
        views: 1156
      }
    ]

    setFeaturedCampaigns(mockFeaturedCampaigns)
  }, [])

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign)
    setShowCampaignModal(true)
  }

  const getIndustryIcon = (industry) => {
    const icons = {
      'אופנה': '👗',
      'טכנולוגיה': '💻',
      'מזון ומשקאות': '🍕',
      'שירותים פיננסיים': '💼',
      'חינוך': '📚',
      'בריאות וכושר': '💪'
    }
    return icons[industry] || '🏢'
  }

  const getPlatformIcon = (platform) => {
    const icons = {
      'Instagram': '📸',
      'Facebook': '📘',
      'LinkedIn': '💼',
      'YouTube': '📺',
      'TikTok': '🎵',
      'Google Ads': '🔍'
    }
    return icons[platform] || '🌐'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      <Head>
        <title>VidGenAI - פלטפורמת יצירת קמפיינים מתקדמת עם בינה מלאכותית</title>
        <meta name="description" content="צור קמפיינים מרהיבים עם בינה מלאכותית. צפה בדוגמאות מוצלחות מהקהילה שלנו והשתמש בכלים המתקדמים ביותר." />
        <meta name="keywords" content="בינה מלאכותית, קמפיינים, שיווק דיגיטלי, וידאו AI, תוכן דיגיטלי" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VidGenAI
              </a>
            </div>
            <div className="flex items-center">
              <a href="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                התחברות
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            צור קמפיינים <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">מרהיבים</span>
            <br />עם בינה מלאכותית
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            הפלטפורמה המתקדמת ביותר ליצירת קמפיינים דיגיטליים. צפה איך משתמשים אחרים משיגים תוצאות מדהימות
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="/auth"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-200 transform hover:scale-105 shadow-lg"
            >
              התחל ליצור עכשיו 🚀
            </a>
            <a 
              href="#campaigns"
              className="bg-white text-gray-700 font-semibold py-4 px-8 rounded-xl border-2 border-gray-300 hover:border-blue-500 transition duration-200 transform hover:scale-105 shadow-lg"
            >
              צפה בדוגמאות 👁️
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">קמפיינים נוצרו</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">450%</div>
              <div className="text-gray-600">ROI ממוצע</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-gray-600">משתמשים פעילים</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">שביעות רצון</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section id="campaigns" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🏆 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">קמפיינים מובילים</span> מהקהילה
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              גלה איך משתמשים אחרים יוצרים קמפיינים מוצלחים והשיגו תוצאות מדהימות עם הכלים שלנו
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {featuredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {/* Campaign Thumbnail */}
                <div className="relative h-48 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-6xl">{getIndustryIcon(campaign.industry)}</div>
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {campaign.industry}
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {campaign.platform.map((platform, index) => (
                      <span key={index} className="bg-white rounded-full p-2 text-lg shadow-md">
                        {getPlatformIcon(platform)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">יוצר: {campaign.creator}</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{campaign.description}</p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{campaign.metrics.roi}%</div>
                      <div className="text-xs text-blue-600">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{(campaign.metrics.impressions / 1000000).toFixed(1)}M</div>
                      <div className="text-xs text-green-600">הצגות</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{campaign.metrics.conversions.toLocaleString()}</div>
                      <div className="text-xs text-purple-600">המרות</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">₪{(campaign.metrics.revenue / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-orange-600">הכנסות</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {campaign.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    {campaign.tags.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        +{campaign.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Social Stats */}
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span>👁️ {campaign.views.toLocaleString()} צפיות</span>
                      <span>❤️ {campaign.likes.toLocaleString()} לייקים</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewCampaign(campaign)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 transform hover:scale-105"
                  >
                    צפה בפרטים המלאים 📊
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/auth"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-200 transform hover:scale-105 shadow-lg"
            >
              התחל ליצור קמפיין משלך 🎯
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ⚡ <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">כלים מתקדמים</span> ליצירה
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              הכלים החדשניים ביותר בשוק ליצירת קמפיינים מקצועיים במינימום זמן
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">יצירת וידאו AI</h3>
              <p className="text-gray-600">צור סרטונים מקצועיים בתוך דקות עם טכנולוגיית בינה מלאכותית מתקדמת</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">ניתוח קהל יעד</h3>
              <p className="text-gray-600">זיהוי אוטומטי של קהל היעד האידיאלי לקמפיין שלך עם המלצות מותאמות</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">אנליטיקס מתקדם</h3>
              <p className="text-gray-600">מעקב בזמן אמת אחר ביצועי הקמפיין עם תובנות ומלצות לשיפור</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">אינטגרציה מלאה</h3>
              <p className="text-gray-600">התחברות ישירה לכל הפלטפורמות הפופולריות לפרסום אוטומטי</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">תבניות מקצועיות</h3>
              <p className="text-gray-600">מאות תבניות מעוצבות לכל תחום עסקי עם אפשרות התאמה אישית</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">מהירות יצירה</h3>
              <p className="text-gray-600">מקמפיין רעיון ועד לפרסום חי תוך מספר דקות בלבד</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Table Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              📈 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">החזר השקעה מדהים</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ראה כמה תחסוך בהשוואה לעבודה עם פרילנסרים וסוכנויות - חיסכון של עד 90%!
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-right font-semibold">חבילה</th>
                      <th className="px-6 py-4 text-center font-semibold">מחיר חודשי</th>
                      <th className="px-6 py-4 text-center font-semibold">מה אתה מקבל</th>
                      <th className="px-6 py-4 text-center font-semibold">ערך בשוק החופשי</th>
                      <th className="px-6 py-4 text-center font-semibold">החיסכון שלך</th>
                      <th className="px-6 py-4 text-center font-semibold">יתרון נוסף</th>
                    </tr>
                  </thead>
                  <tbody>                    <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-6 font-semibold text-blue-600">חבילה בסיסית</td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-2xl font-bold text-gray-800">₪99</div>
                        <div className="text-xs text-gray-500">חודשי</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-sm">
                          <div className="font-medium text-gray-800 mb-1">עד 5 פוסטים חודשיים</div>
                          <div className="text-gray-600">טקסט + תמונות + קריינות + תזמון</div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-lg font-bold text-red-600">₪400-₪600</div>
                        <div className="text-xs text-gray-500">עבודה עם פרילנסר</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg">
                          פי 4-6
                        </div>
                        <div className="text-xs text-green-600 mt-1">חיסכון: ₪301-501</div>
                      </td>
                      <td className="px-6 py-6 text-center text-sm text-gray-600">
                        זמינות 24/7<br/>איכות מקצועית
                      </td>
                    </tr>

                    <tr className="border-b border-gray-200 hover:bg-purple-50 transition-colors bg-purple-25 relative">
                      <td className="px-6 py-6 font-semibold text-purple-600 relative">
                        חבילה מתקדמת
                        <div className="absolute -top-2 -right-2">
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                            🔥 פופולרי
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-2xl font-bold text-gray-800">₪199</div>
                        <div className="text-xs text-gray-500">חודשי</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-sm">
                          <div className="font-medium text-gray-800 mb-1">עד 20 פוסטים + סרטוני AI</div>
                          <div className="text-gray-600">חיבור רשתות חברתיות + ניתוח ביצועים</div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-lg font-bold text-red-600">₪1,200-₪2,000</div>
                        <div className="text-xs text-gray-500">סושיאל מנג'ר מקצועי</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg">
                          פי 6-10
                        </div>
                        <div className="text-xs text-green-600 mt-1">חיסכון: ₪1,001-1,801</div>
                      </td>
                      <td className="px-6 py-6 text-center text-sm text-gray-600">
                        פתרון מלא לעסק<br/>אוטומציה מתקדמת
                      </td>
                    </tr>

                    <tr className="hover:bg-pink-50 transition-colors">
                      <td className="px-6 py-6 font-semibold text-pink-600">חבילת סוכנות</td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-2xl font-bold text-gray-800">₪499</div>
                        <div className="text-xs text-gray-500">חודשי</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-sm">
                          <div className="font-medium text-gray-800 mb-1">עד 10 לקוחות + White Label</div>
                          <div className="text-gray-600">API + גישה לצוותים + דוחות מפורטים</div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-lg font-bold text-red-600">₪4,000-₪8,000</div>
                        <div className="text-xs text-gray-500">סוכנות דיגיטלית מלאה</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg">
                          פי 8-16
                        </div>
                        <div className="text-xs text-green-600 mt-1">חיסכון: ₪3,501-7,501</div>
                      </td>
                      <td className="px-6 py-6 text-center text-sm text-gray-600">
                        פתרון לסוכנויות<br/>וחברות
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 inline-block shadow-lg">
                <div className="flex items-center justify-center gap-6 text-green-700">
                  <div className="text-4xl">💰</div>
                  <div>
                    <div className="font-bold text-2xl">חיסכון ממוצע של 80%-90%</div>
                    <div className="text-lg text-green-600">בהשוואה לעבודה עם פרילנסרים וסוכנויות</div>
                  </div>
                  <div className="text-4xl">📈</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a 
                href="/plans"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-200 transform hover:scale-105 shadow-lg inline-block"
              >
                בחר את החבילה שלך 🚀
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            מוכן להצטרף לקהילת היוצרים?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            הצטרף לאלפי יוצרים שכבר יוצרים קמפיינים מוצלחים עם הפלטפורמה שלנו
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/auth"
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition duration-200 transform hover:scale-105 shadow-lg"
            >
              התחל חינם עכשיו 🚀
            </a>
            <a 
              href="/plans"
              className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition duration-200 transform hover:scale-105"
            >
              צפה בחבילות התמחור 💎
            </a>
          </div>
        </div>
      </section>

      {/* Campaign Details Modal */}
      {showCampaignModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{selectedCampaign.title}</h2>
                <button
                  onClick={() => setShowCampaignModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Campaign Info */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">פרטי הקמפיין</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>יוצר:</strong> {selectedCampaign.creator}</div>
                      <div><strong>תחום:</strong> {selectedCampaign.industry}</div>
                      <div><strong>פלטפורמות:</strong> {selectedCampaign.platform.join(', ')}</div>
                      <div><strong>תקציב:</strong> ₪{selectedCampaign.budget.toLocaleString()}</div>
                      <div><strong>משך הקמפיין:</strong> {selectedCampaign.duration}</div>
                      <div><strong>קהל יעד:</strong> {selectedCampaign.targetAudience}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">תיאור</h3>
                    <p className="text-gray-700">{selectedCampaign.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">תגיות</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCampaign.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Campaign Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">ביצועי הקמפיין</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedCampaign.metrics.impressions.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">הצגות</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedCampaign.metrics.clicks.toLocaleString()}</div>
                      <div className="text-sm text-green-600">קליקים</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedCampaign.metrics.conversions.toLocaleString()}</div>
                      <div className="text-sm text-purple-600">המרות</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">₪{selectedCampaign.metrics.revenue.toLocaleString()}</div>
                      <div className="text-sm text-orange-600">הכנסות</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-600">{selectedCampaign.metrics.roi}%</div>
                      <div className="text-sm text-red-600">ROI</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600">{selectedCampaign.metrics.ctr}%</div>
                      <div className="text-sm text-yellow-600">CTR</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">סטטיסטיקות קהילה</h3>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>👁️ {selectedCampaign.views.toLocaleString()} צפיות בפרופיל</span>
                      <span>❤️ {selectedCampaign.likes.toLocaleString()} לייקים</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-center">
                <a
                  href="/auth"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 transform hover:scale-105"
                >
                  יצירת קמפיין דומה 🚀
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <li><a href="#features" className="hover:text-white transition-colors">תכונות</a></li>
                <li><a href="/plans" className="hover:text-white transition-colors">תמחור</a></li>
                <li><a href="#campaigns" className="hover:text-white transition-colors">דוגמאות</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">תמיכה</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/faq" className="hover:text-white transition-colors">שאלות נפוצות</a></li>
                <li><a href="#" className="hover:text-white transition-colors">צור קשר</a></li>
                <li><a href="#" className="hover:text-white transition-colors">מרכז עזרה</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">קהילה</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">פורום</a></li>
                <li><a href="#" className="hover:text-white transition-colors">בלוג</a></li>
                <li><a href="#" className="hover:text-white transition-colors">עדכונים</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VidGenAI. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
