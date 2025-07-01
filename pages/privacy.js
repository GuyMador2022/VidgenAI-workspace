import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>מדיניות פרטיות - VidGenAI</title>
        <meta name="description" content="מדיניות הפרטיות של פלטפורמת VidGenAI" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">מדיניות פרטיות</h1>
            <p className="text-gray-600">עדכון אחרון: יוני 2025</p>
          </div>

          <div className="prose prose-lg max-w-none" dir="rtl">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. מבוא</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ב-VidGenAI, אנו מכבדים את הפרטיות שלכם ומחויבים להגן על המידע האישי שלכם. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מגנים ומשתפים מידע כאשר אתם משתמשים בשירותנו.
              </p>
              <p className="text-gray-700 leading-relaxed">
                על ידי שימוש בשירותנו, אתם מסכימים לאיסוף ולשימוש במידע בהתאם למדיניות זו. מדיניות זו חלה על כל המשתמשים בפלטפורמה שלנו.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. מידע שאנו אוספים</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 מידע שאתם מספקים לנו</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>פרטי חשבון:</strong> שם, כתובת אימייל, סיסמה</li>
                <li><strong>פרטי תשלום:</strong> מידע כרטיס אשראי (מוצפן ומאובטח)</li>
                <li><strong>פרטי פרופיל:</strong> שם חברה, טלפון (אופציונלי)</li>
                <li><strong>תוכן שיצרתם:</strong> טקסטים, תמונות, וידאו שנוצרו בפלטפורמה</li>
                <li><strong>העדפות:</strong> הגדרות חשבון והעדפות שיווק</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 מידע שנאסף אוטומטית</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה</li>
                <li><strong>נתוני שימוש:</strong> עמודים שביקרתם, זמן שהייה, פעולות שביצעתם</li>
                <li><strong>קובצי Cookie:</strong> לשיפור החוויה והפרסונליזציה</li>
                <li><strong>מיקום:</strong> מיקום כללי על בסיס כתובת IP (לא מדויק)</li>
                <li><strong>מידע על המכשיר:</strong> גודל מסך, רזולוציה, תמיכה בטכנולוגיות</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 מידע מצדדים שלישיים</h3>
              <p className="text-gray-700 leading-relaxed">
                אנו עשויים לקבל מידע על שירותי בינה מלאכותית חיצוניים (OpenAI, ElevenLabs וכו&apos;) בתיאום עם ההסכמים שלכם.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. כיצד אנו משתמשים במידע</h2>
              <p className="text-gray-700 leading-relaxed mb-4">אנו משתמשים במידע שלכם למטרות הבאות:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 מתן השירות</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>יצירת וניהול החשבון שלכם</li>
                <li>עיבוד תשלומים ובקשות החזר</li>
                <li>יצירת תוכן באמצעות בינה מלאכותית</li>
                <li>ניתוח קהל יעד והמלצות מותאמות אישית</li>
                <li>תמיכה טכנית ושירות לקוחות</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 שיפור השירות</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>ניתוח דפוסי שימוש לשיפור הפונקציונליות</li>
                <li>פיתוח תכונות חדשות</li>
                <li>זיהוי ותיקון באגים</li>
                <li>אופטימיזציה של ביצועים</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 תקשורת</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>שליחת הודעות חשובות על השירות</li>
                <li>עדכונים על תכונות חדשות</li>
                <li>תזכורות תשלום וחידוש מנוי</li>
                <li>תוכן שיווקי (ניתן לבטל)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.4 אבטחה ועמידה בחוק</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>זיהוי ומניעת פעילות חשודה או זדונית</li>
                <li>עמידה בדרישות חוקיות ורגולטוריות</li>
                <li>הגנה על זכויות המשתמשים שלנו</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו לא מוכרים, סוחרים או מעבירים מידע אישי לצדדים שלישיים, למעט במקרים הבאים:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 ספקי שירות</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>עיבוד תשלומים:</strong> Stripe, PayPal (בהתאם לבחירתכם)</li>
                <li><strong>שירותי בינה מלאכותית:</strong> OpenAI, ElevenLabs, RunwayML</li>
                <li><strong>אירוח ותשתית:</strong> Amazon AWS, Google Cloud</li>
                <li><strong>אנליטיקס:</strong> Google Analytics (מוגבל)</li>
                <li><strong>תמיכה:</strong> מערכות שירות לקוחות</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 דרישות חוקיות</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                עשויים לחשוף מידע אם נדרש על פי חוק, צו בית משפט, או כדי להגן על הזכויות והבטחון שלנו ושל המשתמשים.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 העברת עסק</h3>
              <p className="text-gray-700 leading-relaxed">
                במקרה של מיזוג, רכישה או מכירת נכסים, המידע שלכם עשוי להועבר. נודיע לכם מראש על כל שינוי כזה.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. אבטחת מידע</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו נוקטים באמצעי אבטחה מתקדמים להגנה על המידע שלכם:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>הצפנה:</strong> SSL/TLS להעברת נתונים, AES-256 לאחסון</li>
                <li><strong>גישה מוגבלת:</strong> רק עובדים מורשים יכולים לגשת למידע</li>
                <li><strong>אימות דו-שלבי:</strong> זמין עבור חשבונות רגישים</li>
                <li><strong>ניטור רציף:</strong> מערכות זיהוי חדירות ופעילות חשודה</li>
                <li><strong>גיבויים מוצפנים:</strong> במספר מיקומים גיאוגרפיים</li>
                <li><strong>עדכוני אבטחה:</strong> תמיכה שוטפת בכל המערכות</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                למרות מאמצינו, אף מערכת אינה בטוחה ב-100%. נודיע לכם על כל פרצת אבטחה תוך 72 שעות.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. השימוש בעוגיות (Cookies)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו משתמשים בעוגיות לשיפור החוויה שלכם:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 סוגי עוגיות</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>עוגיות חיוניות:</strong> נדרשות לתפקוד הבסיסי של האתר</li>
                <li><strong>עוגיות ביצועים:</strong> לניתוח שימוש ושיפור השירות</li>
                <li><strong>עוגיות פונקציונליות:</strong> לשמירת העדפות וניסיון אישי</li>
                <li><strong>עוגיות שיווק:</strong> להצגת תוכן רלוונטי (ניתן לביטול)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 ניהול עוגיות</h3>
              <p className="text-gray-700 leading-relaxed">
                תוכלו לנהל את העדפות העוגיות דרך הדפדפן שלכם או דרך הגדרות החשבון באתר.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. הזכויות שלכם</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                בהתאם לחוק הגנת הפרטיות הישראלי ותקנות ה-GDPR, יש לכם הזכויות הבאות:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 זכות עיון</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                תוכלו לבקש לראות איזה מידע אישי אנו מחזיקים עליכם.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 זכות תיקון</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                תוכלו לבקש לתקן או לעדכן מידע שגוי או לא מעודכן.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 זכות מחיקה</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                תוכלו לבקש למחוק את המידע האישי שלכם (כפוף להגבלות חוקיות).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.4 זכות הגבלת עיבוד</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                תוכלו לבקש להגביל את השימוש במידע שלכם בנסיבות מסוימות.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.5 זכות ניידות נתונים</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                תוכלו לבקש לקבל עותק של המידע שלכם בפורמט נוח להעברה.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.6 זכות התנגדות</h3>
              <p className="text-gray-700 leading-relaxed">
                תוכלו להתנגד לעיבוד המידע שלכם למטרות שיווק או אינטרסים לגיטימיים.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. שמירת מידע</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו שומרים את המידע שלכם כל עוד:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>החשבון שלכם פעיל</li>
                <li>נדרש לצורך מתן השירות</li>
                <li>נדרש עבור התחייבויות חוקיות או רגולטוריות</li>
                <li>נדרש לפתרון סכסוכים או אכיפת הסכמים</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                לאחר ביטול החשבון, נמחק את רוב המידע האישי תוך 30 יום, למעט מידע הנדרש על פי חוק.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. העברות מידע בינלאומיות</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                השירותים שלנו משתמשים בתשתיות ענן בינלאומיות:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>שרתים ראשיים: ישראל, אירופה, ארצות הברית</li>
                <li>שירותי AI: ארצות הברית (OpenAI, ElevenLabs)</li>
                <li>עיבוד תשלומים: ארצות הברית ואירופה</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                כל ההעברות מתבצעות עם הגנות מתאימות ובהתאם לסטנדרטים הבינלאומיים.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. קטינים</h2>
              <p className="text-gray-700 leading-relaxed">
                השירותים שלנו אינם מיועדים לקטינים מתחת לגיל 18. אנו לא אוספים במודע מידע אישי מקטינים. אם הבאתם לידיעתנו שקטין סיפק לנו מידע אישי, נפעל למחיקתו מיד.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. שינויים במדיניות</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>נודיע לכם על שינויים משמעותיים באימייל</li>
                <li>נפרסם הודעה באתר על עדכונים</li>
                <li>נספק זמן סביר להסתגלות לשינויים</li>
                <li>השימוש המתמשך בשירות מהווה הסכמה לעדכונים</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. יצירת קשר ותלונות</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אם יש לכם שאלות או חששות לגבי הפרטיות שלכם, אנא צרו קשר איתנו:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>ממונה הגנת פרטיות:</strong></p>
                <p className="text-gray-700"><strong>אימייל:</strong> privacy@vidgenai.com</p>
                <p className="text-gray-700"><strong>טלפון:</strong> 03-1234567</p>
                <p className="text-gray-700"><strong>כתובת:</strong> רחוב הטכנולוגיה 123, תל אביב</p>
                <p className="text-gray-700 mt-2"><strong>רשות הגנת הפרטיות:</strong> אם אינכם מרוצים מהטיפול שלנו, תוכלו לפנות לרשות הגנת הפרטיות בישראל.</p>
              </div>
            </section>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-green-800 font-medium">
                מדיניות פרטיות זו נכנסה לתוקף ביום 30 ביוני 2025 ומחליפה כל גרסה קודמת.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              חזור להרשמה
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

