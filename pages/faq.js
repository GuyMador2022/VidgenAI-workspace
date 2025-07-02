import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const faqCategories = [
  {
    id: 'general',
    name: 'כללי',
    icon: '❓',
    questions: [
      {
        id: 1,
        question: 'מה זה VidGenAI ואיך זה עובד?',
        answer: 'VidGenAI היא פלטפורמה מתקדמת לייצור תוכן דיגיטלי באמצעות בינה מלאכותית. הפלטפורמה מאפשרת ליצור טקסטים, תמונות, סרטונים, אודיו ולנתח קהלי יעד באופן אוטומטי ומהיר.'
      },
      {
        id: 2,
        question: 'מה המשמעות של קרדיטים ואיך הם עובדים?',
        answer: 'קרדיטים הם יחידת המדידה שלנו לשימוש בפלטפורמה. כל פעולה צורכת מספר קרדיטים: יצירת טקסט (1 קרדיט), תמונה (3 קרדיטים), אודיו (5 קרדיטים), וידאו (10 קרדיטים), ניתוח קהל (2 קרדיטים). הקרדיטים מתחדשים כל חודש.'
      },
      {
        id: 3,
        question: 'איך אני מתחיל להשתמש בפלטפורמה?',
        answer: 'פשוט מאוד! הירשם לחשבון חינמי, קבל 10 קרדיטים לניסיון, והתחל ליצור. תוכל לבחור בין התחלת פרויקט חדש או שימוש בתבניות המוכנות שלנו.'
      }
    ]
  },
  {
    id: 'pricing',
    name: 'תמחור וחיוב',
    icon: '💰',
    questions: [
      {
        id: 4,
        question: 'מה קורה אם נגמרים לי הקרדיטים באמצע החודש?',
        answer: 'אם נגמרים לך הקרדיטים באמצע החודש, יש לך מספר אפשרויות: שדרג לחבילה גבוהה יותר (השינוי יכנס לתוקף מיידית), חכה לחידוש החודשי, או רכוש חבילת קרדיטים נוספת בתשלום חד-פעמי.'
      },
      {
        id: 5,
        question: 'איך אני יכול לשדרג או להוריד את החבילה שלי?',
        answer: 'תוכל לשנות את החבילה בכל עת דרך הגדרות החשבון. שדרוג ייכנס לתוקף מיידית, והורדת חבילה תחול במחזור החיוב הבא. תקבל זיכוי יחסי עבור התקופה שנותרה בחבילה הנוכחית.'
      },
      {
        id: 6,
        question: 'האם יש הנחות מיוחדות?',
        answer: 'כן! אנחנו מציעים הנחות לתלמידים (20%), מוסדות חינוך (30%), וארגונים ללא מטרות רווח (25%). בנוסף, חיוב שנתי חוסך עד 20% ביחס לחיוב חודשי.'
      },
      {
        id: 7,
        question: 'איך אני יכול לבטל את המנוי?',
        answer: 'ביטול המנוי קל ופשוט - פשוט לך להגדרות החשבון ולחץ על "בטל מנוי". החבילה תישאר פעילה עד סוף התקופה ששילמת עליה, וההארכה האוטומטית תבוטל.'
      }
    ]
  },
  {
    id: 'features',
    name: 'תכונות ויכולות',
    icon: '🎯',
    questions: [
      {
        id: 8,
        question: 'איזה סוגי תוכן אני יכול ליצור?',
        answer: 'הפלטפורמה מאפשרת יצירת: פוסטים לרשתות חברתיות, מאמרים ובלוגים, כותרות ותיאורים, תמונות ועיצובים, סרטונים קצרים, אודיו ולחנים, ניתוחי קהל ממוקדים, ועוד הרבה סוגי תוכן.'
      },
      {
        id: 9,
        question: 'איך פועל ניתוח הקהל בפלטפורמה?',
        answer: 'מערכת ניתוח הקהל שלנו משתמשת בבינה מלאכותית מתקדמת לזיהוי דפוסי התנהגות, העדפות, ואינטרסים של הקהל שלך. היא מספקת המלצות מותאמות אישית לתוכן ולאסטרטגיות שיווק.'
      },
      {
        id: 10,
        question: 'האם אוכל לשמור ולערוך את התוכן שיצרתי?',
        answer: 'בהחלט! כל התוכן שאתה יוצר נשמר אוטומטיט בחשבון שלך. תוכל לערוך, לשכפל, לשתף ולייצא את התוכן בפורמטים שונים. החבילות הגבוהות יותר מאפשרות שמירת פרויקטים רבים יותר.'
      },
      {
        id: 11,
        question: 'איך פועלות ההצעות של הבינה המלאכותית?',
        answer: 'מערכת ה-AI שלנו לומדת מההעדפות שלך ומציעה רעיונות מותאמים לתחום שלך. היא מנתחת טרנדים נוכחיים, מילות מפתח פופולריות, ושעות פרסום אופטימליות כדי למקסם את הטווח וההשפעה.'
      }
    ]
  },
  {
    id: 'technical',
    name: 'תמיכה טכנית',
    icon: '🔧',
    questions: [
      {
        id: 12,
        question: 'איך אני יכול לראות כמה קרדיטים נשארו לי?',
        answer: 'בדף הבית של החשבון שלך תמצא מד קרדיטים מפורט שמציג: קרדיטים נותרים, שימוש החודש הנוכחי, היסטוריית שימוש, ותאריך החידוש הבא. תקבל גם התראות כשהקרדיטים מתקרבים לסיום.'
      },
      {
        id: 13,
        question: 'מה לעשות אם יש לי בעיה טכנית?',
        answer: 'אנחנו כאן לעזור! פנה אלינו דרך: צ\'אט החי באתר (זמין 24/7), אימייל לתמיכה עם מענה תוך 2 שעות, או דרך מרכז הלמידה המקוון שלנו עם מדריכים ושאלות נפוצות מפורטות.'
      },
      {
        id: 14,
        question: 'האם הפלטפורמה בטוחה ומוגנת?',
        answer: 'בהחלט! אנחנו משתמשים בהצפנת SSL 256-bit, גיבויים יומיים, שרתים מאובטחים בענן, והתאמה לתקנות GDPR. כל הנתונים שלך מוגנים ומאובטחים ברמה הגבוהה ביותר.'
      },
      {
        id: 15,
        question: 'האם אוכל לשלב את VidGenAI עם כלים אחרים?',
        answer: 'כן! אנחנו מציעים אינטגרציות עם פלטפורמות פופולריות כמו פייסבוק, אינסטגרם, לינקדאין, יוטיוב, ווורדפרס, ועוד. החבילות המתקדמות כוללות גם API לאינטגרציה מותאמת אישית.'
      }
    ]
  }
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openQuestion, setOpenQuestion] = useState(null)
  const router = useRouter()

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId)
  }

  return (
    <>
      <Head>
        <title>שאלות נפוצות - VidGenAI</title>
        <meta name="description" content="מצא תשובות לכל השאלות שלך על VidGenAI - תמחור, תכונות, תמיכה טכנית ועוד" />
        <link rel="icon" href="/favicon.ico" />
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          
          @keyframes slideDown {
            from { max-height: 0; opacity: 0; }
            to { max-height: 200px; opacity: 1; }
          }
          
          .slide-down {
            animation: slideDown 0.3s ease-out;
            overflow: hidden;
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              שאלות נפוצות
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
              מצא תשובות לכל השאלות שלך על VidGenAI - אנחנו כאן לעזור!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Navigation Tabs */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="bg-white rounded-xl shadow-lg p-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-xs sm:text-sm font-medium text-center">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className={`${activeCategory === category.id ? 'block fade-in' : 'hidden'}`}
              >
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    {category.name}
                  </h2>
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24"></div>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(faq.id)}
                        className="w-full p-4 sm:p-6 text-right hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`transform transition-transform duration-300 ${
                              openQuestion === faq.id ? 'rotate-180' : ''
                            }`}>
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-right flex-1 mr-4">
                            {faq.question}
                          </h3>
                        </div>
                      </button>
                      
                      {openQuestion === faq.id && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 slide-down">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-right">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                לא מצאת את התשובה שחיפשת?
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-6">
                הצוות שלנו כאן לעזור לך בכל שאלה או בעיה
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl mb-2">💬</div>
                  <h3 className="font-semibold mb-2">צ&apos;אט חי</h3>
                  <p className="text-sm opacity-80">זמין 24/7</p>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl mb-2">📧</div>
                  <h3 className="font-semibold mb-2">אימייל</h3>
                  <p className="text-sm opacity-80">מענה תוך 2 שעות</p>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="font-semibold mb-2">מרכז למידה</h3>
                  <p className="text-sm opacity-80">מדריכים ומשאבים</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/contact')}
                  className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  יצירת קשר
                </button>
                <button
                  onClick={() => router.push('/plans')}
                  className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
                >
                  עיין במחירים
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <li><Link href="#features" className="hover:text-white transition-colors">תכונות</Link></li>
                <li><Link href="/plans" className="hover:text-white transition-colors">תמחור</Link></li>
                <li><Link href="#campaigns" className="hover:text-white transition-colors">דוגמאות</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">תמיכה</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/faq" className="hover:text-white transition-colors">שאלות נפוצות</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">צור קשר</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">מרכז עזרה</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">קהילה</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">פורום</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">בלוג</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">עדכונים</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VidGenAI. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

