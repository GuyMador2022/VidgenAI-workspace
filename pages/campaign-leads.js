import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function CampaignLeads() {
  const [formData, setFormData] = useState({
    channels: [],
    contentCreator: '',
    monthlyBudget: '',
    interested: '',
    importantFeatures: [],
    businessName: '',
    businessField: '',
    contactName: '',
    contactInfo: '',
    allowContact: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Here you would send the data to your backend
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('שגיאה בשליחת הטופס. אנא נסו שוב.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('שגיאה בשליחת הטופס. אנא נסו שוב.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>תודה על ההשתתfות - VidGenAI</title>
          <meta name="description" content="תודה על השתתפותכם בסקר. נהיה בקשר בקרוב!" />
        </Head>
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">תודה רבה!</h1>
            <p className="text-lg text-gray-600 mb-6">
              הטופס נשלח בהצלחה. נהיה בקשר בקרוב עם פרטים על השקת הפלטפורמה.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              חזור לאתר הראשי
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>עסקים חכמים בוחרים תוכן אוטומטי - VidGenAI</title>
        <meta name="description" content="פלטפורמה חדשה לייצור תוכן וקמפיינים חכמים לרשתות החברתיות - אוטומטי, בעברית, ובמהירות. הרשמו לגישה מוקדמת!" />
        <meta property="og:title" content="עסקים חכמים בוחרים תוכן אוטומטי - VidGenAI" />
        <meta property="og:description" content="פלטפורמה חדשה לייצור תוכן וקמפיינים חכמים לרשתות החברתיות - אוטומטי, בעברית, ובמהירות." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/vidgenai-campaign-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="עסקים חכמים בוחרים תוכן אוטומטי - VidGenAI" />
        <meta name="twitter:description" content="פלטפורמה חדשה לייצור תוכן וקמפיינים חכמים לרשתות החברתיות" />
        <meta name="twitter:image" content="/vidgenai-campaign-preview.jpg" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VidGenAI
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section with Video */}
            <div className="text-center mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  🚀 עסקים חכמים בוחרים תוכן אוטומטי
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-6">
                  פלטפורמה חדשה לייצור תוכן וקמפיינים חכמים לרשתות החברתיות
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-lg">
                  <span className="bg-white/20 px-4 py-2 rounded-full">✨ אוטומטי</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full">🇮🇱 בעברית</span>
                  <span className="bg-white/20 px-4 py-2 rounded-full">⚡ במהירות</span>
                </div>
              </div>

              {/* Video Placeholder */}
              <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-8 relative">
                <div className="aspect-video flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <h3 className="text-2xl font-semibold mb-2">סרטון השקה</h3>
                    <p className="text-gray-300 mb-4">ראו איך VidGenAI משנה את הגדרות המשחק</p>
                    <div className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold cursor-pointer transition-colors inline-flex items-center">
                      <span className="text-2xl mr-2">▶</span>
                      השמע סרטון
                    </div>
                  </div>
                </div>
                {/* Actual video embed would go here */}
                {/* <iframe 
                  src="YOUR_VIDEO_EMBED_URL" 
                  className="w-full h-full absolute top-0 left-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe> */}
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-yellow-800 mb-2">
                  🎯 עזרו לנו לבנות את הפלטפורמה המושלמת עבורכם!
                </h2>
                <p className="text-yellow-700 text-lg">
                  מלאו את השאלון הקצר ותקבלו גישה מוקדמת + הנחה של 50% על החודש הראשון
                </p>
              </div>
            </div>

            {/* Survey Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Question 1 */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    באילו ערוצים העסק שלך מפרסם תוכן כיום?
                  </h3>
                  <p className="text-gray-600 mb-4 mr-11">(ניתן לסמן יותר מתשובה אחת)</p>
                  <div className="space-y-3 mr-11">
                    {['פייסבוק', 'אינסטגרם', 'טיקטוק', 'לינקדאין', 'אין לי פעילות שיווקית קבועה'].map(channel => (
                      <label key={channel} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600 rounded"
                          checked={formData.channels.includes(channel)}
                          onChange={() => handleCheckboxChange('channels', channel)}
                        />
                        <span className="mr-3 text-gray-700 group-hover:text-blue-600 transition-colors">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                    מי מייצר לך את התוכן לרשתות?
                  </h3>
                  <div className="space-y-3 mr-11">
                    {['אני בעצמי', 'עובד/ת בעסק', 'פרילנסר/ית', 'סוכנות', 'אף אחד – לא מפרסם תוכן'].map(creator => (
                      <label key={creator} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="contentCreator"
                          className="form-radio h-5 w-5 text-purple-600"
                          checked={formData.contentCreator === creator}
                          onChange={() => handleRadioChange('contentCreator', creator)}
                        />
                        <span className="mr-3 text-gray-700 group-hover:text-purple-600 transition-colors">{creator}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 3 */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                    כמה אתה משלם בממוצע על תוכן לרשתות החברתיות בכל חודש?
                  </h3>
                  <div className="space-y-3 mr-11">
                    {['פחות מ-100 ₪', '100–300 ₪', '301–600 ₪', '601–1,000 ₪', 'מעל 1,000 ₪', 'לא משלם – עושה לבד'].map(budget => (
                      <label key={budget} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="monthlyBudget"
                          className="form-radio h-5 w-5 text-green-600"
                          checked={formData.monthlyBudget === budget}
                          onChange={() => handleRadioChange('monthlyBudget', budget)}
                        />
                        <span className="mr-3 text-gray-700 group-hover:text-green-600 transition-colors">{budget}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 4 */}
                <div className="bg-orange-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                    האם היית משתמש/ת בפלטפורמה שמייצרת לך אוטומטית:
                  </h3>
                  <div className="bg-white rounded-xl p-4 mb-4 mr-11 border-2 border-orange-200">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center"><span className="text-orange-500 mr-2">⚡</span> תוכן שיווקי בעברית (כולל תמונות, סרטונים וקריינות)</li>
                      <li className="flex items-center"><span className="text-orange-500 mr-2">🎯</span> לפי תחום העיסוק שלך</li>
                      <li className="flex items-center"><span className="text-orange-500 mr-2">📅</span> כולל תזמון לפייסבוק/אינסטגרם</li>
                      <li className="flex items-center"><span className="text-orange-500 mr-2">💰</span> במחיר של כ-149 ₪ לחודש</li>
                    </ul>
                  </div>
                  <div className="space-y-3 mr-11">
                    {['כן, לגמרי', 'אולי – תלוי באיכות ובחיסכון בזמן', 'כנראה לא', 'ממש לא מעניין אותי'].map(interest => (
                      <label key={interest} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="interested"
                          className="form-radio h-5 w-5 text-orange-600"
                          checked={formData.interested === interest}
                          onChange={() => handleRadioChange('interested', interest)}
                        />
                        <span className="mr-3 text-gray-700 group-hover:text-orange-600 transition-colors">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 5 */}
                <div className="bg-pink-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                    מה מהשירותים הבאים הכי חשוב לך בפלטפורמה כזו?
                  </h3>
                  <p className="text-gray-600 mb-4 mr-11">(בחר עד 3)</p>
                  <div className="space-y-3 mr-11">
                    {[
                      'כתיבת טקסטים שיווקיים',
                      'יצירת תמונות לפוסטים', 
                      'קריינות בעברית',
                      'תזמון פרסומים לרשתות',
                      'סרטוני וידאו קצרים',
                      'ניתוח ביצועים',
                      'חיבור לחנות מוצרים',
                      'תבניות מוכנות לפי תחום העיסוק שלי'
                    ].map(feature => (
                      <label key={feature} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-pink-600 rounded"
                          checked={formData.importantFeatures.includes(feature)}
                          onChange={() => handleCheckboxChange('importantFeatures', feature)}
                          disabled={formData.importantFeatures.length >= 3 && !formData.importantFeatures.includes(feature)}
                        />
                        <span className={`mr-3 transition-colors ${
                          formData.importantFeatures.length >= 3 && !formData.importantFeatures.includes(feature)
                            ? 'text-gray-400'
                            : 'text-gray-700 group-hover:text-pink-600'
                        }`}>
                          {feature}
                        </span>
                      </label>
                    ))}
                  </div>
                  {formData.importantFeatures.length >= 3 && (
                    <p className="text-pink-600 text-sm mt-2 mr-11">✓ בחרת 3 תכונות (מספר מקסימלי)</p>
                  )}
                </div>

                {/* Questions 6-7 */}
                <div className="bg-indigo-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                    פרטים אישיים
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mr-11">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        שם העסק
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="שם העסק שלכם"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        תחום העיסוק
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="למשל: מסעדה, חנות בגדים, שירותי יופי"
                        value={formData.businessField}
                        onChange={(e) => handleInputChange('businessField', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        השם שלך
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="השם המלא שלכם"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        required
                      />
                    </div>
                  
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        טלפון / אימייל
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="050-1234567 או email@example.com"
                        value={formData.contactInfo}
                        onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 mr-11">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded mt-1"
                        checked={formData.allowContact}
                        onChange={(e) => handleInputChange('allowContact', e.target.checked)}
                        required
                      />
                      <span className="mr-3 text-gray-700 leading-relaxed">
                        מותר לנו ליצור איתך קשר כשנשיק את הגרסה הראשונה? 
                        <span className="text-indigo-600 font-medium"> (נשלח לך הזמנה לגישה מוקדמת + הנחה של 50%)</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-2xl text-xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        שולח...
                      </div>
                    ) : (
                      <>
                        🚀 שלח את הטופס וקבל גישה מוקדמת!
                      </>
                    )}
                  </button>
                  
                  <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mt-6 inline-block">
                    <p className="text-yellow-800 font-semibold flex items-center justify-center">
                      <span className="text-2xl mr-2">🎁</span>
                      הנחה של 50% על החודש הראשון למשתתפים בסקר!
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer CTA */}
            <div className="text-center mt-12 bg-gray-900 text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">מוכנים לשנות את הגדרות המשחק?</h2>
              <p className="text-gray-300 text-lg mb-6">
                הצטרפו לעסקים חכמים שכבר חוסכים שעות עבודה ואלפי שקלים עם VidGenAI
              </p>
              <a 
                href="/home-new"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 inline-block"
              >
                גלו עוד על VidGenAI
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
