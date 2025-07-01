import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Terms() {
  return (
    <>
      <Head>
        <title>תנאי השימוש - VidGenAI</title>
        <meta name="description" content="תנאי השימוש של פלטפורמת VidGenAI" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">תנאי השימוש</h1>
            <p className="text-gray-600">עדכון אחרון: דצמבר 2024</p>
            <p className="text-sm text-gray-500 mt-1">גרסה 2.0 - מעודכן בהתאם לתקנות הגנת הפרטיות הישראליות ו-GDPR</p>
          </div>

          <div className="prose prose-lg max-w-none" dir="rtl">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. הסכמה לתנאים</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ברוכים הבאים ל-VidGenAI (&quot;השירות&quot;, &quot;הפלטפורמה&quot;, &quot;אנו&quot;, &quot;שלנו&quot;). על ידי גישה לשירותנו, הרשמה לחשבון, או שימוש בכל חלק מהפלטפורמה, אתם מסכימים להיות קשורים בתנאי השימוש הללו (&quot;התנאים&quot;, &quot;ההסכם&quot;). אם אינכם מסכימים לכל התנאים במלואם, אנא הפסיקו את השימוש בשירותנו מיד.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                השירותים שלנו מיועדים למשתמשים בני 18 ומעלה. אם אתם מתחת לגיל 18, תוכלו להשתמש בשירותנו רק תחת פיקוח והסכמה מלאה של הורה או אפוטרופוס חוקי.
              </p>
              <p className="text-gray-700 leading-relaxed">
                הסכם זה מהווה חוזה משפטי מחייב ביניכם לבין VidGenAI. שימור עותק של תנאים אלה מומלץ לעיון עתידי.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. תיאור השירות</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                VidGenAI היא פלטפורמה טכנולוגית המספקת כלים ליצירת תוכן שיווקי באמצעות בינה מלאכותית, לרבות:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>יצירת תסריטים ותוכן טקסטואלי</li>
                <li>יצירת תמונות ותוכן ויזואלי</li>
                <li>יצירת וידאו ואודיו</li>
                <li>ניתוח קהל יעד והמלצות שיווקיות</li>
                <li>כלי ניהול קמפיינים</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                אנו שומרים לעצמנו את הזכות לשנות, להשעות או להפסיק כל חלק מהשירות בכל עת, עם או ללא הודעה מוקדמת.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. חשבון משתמש</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                כדי להשתמש בחלק מהשירותים שלנו, תצטרכו ליצור חשבון. אתם מתחייבים:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>לספק מידע מדויק, עדכני ומלא</li>
                <li>לשמור על אבטחת הסיסמה שלכם</li>
                <li>להודיע לנו מיד על כל שימוש לא מורשה בחשבונכם</li>
                <li>לא לשתף את פרטי הגישה שלכם עם אחרים</li>
                <li>לעדכן את פרטיכם כשצריך</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                אתם אחראים לכל הפעילות המתרחשת תחת החשבון שלכם.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. מערכת קרדיטים ותשלומים</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                השירותים שלנו פועלים במערכת קרדיטים המאפשרת גמישות בצריכה:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>הקרדיטים מתחדשים מדי חודשי חיוב בהתאם לחבילה שנבחרה</li>
                <li>קרדיטים שלא נוצלו לא עוברים לתקופת החיוב הבאה</li>
                <li>התשלומים מתבצעים מראש עבור תקופת המנוי הנבחרת</li>
                <li>חיוב שנתי זוכה להנחה של עד 20% לעומת חיוב חודשי</li>
                <li>המחירים כוללים מס ערך מוסף כנדרש בחוק</li>
                <li>שינויי מחירים יכנסו לתוקף עם הודעה של 30 יום לפחות</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">ביטול והחזרים</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>ביטול המנוי יחול מסוף תקופת החיוב הנוכחית</li>
                <li>החזר מלא עד 14 יום מתחילת המנוי (כנדרש בחוק הגנת הצרכן)</li>
                <li>החזר יחסי במקרים מיוחדים לפי שיקול דעתנו הבלעדי</li>
                <li>קרדיטים שנוצלו לא יוחזרו במקרה של ביטול</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. שימוש מותר והתחייבויות המשתמש</h2>
              <p className="text-gray-700 leading-relaxed mb-4">אתם מתחייבים להשתמש בשירותנו באופן חוקי ואתי בלבד. אסור להשתמש בשירותנו לצורך:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">פעילות אסורה</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>יצירת תוכן פוגעני, מזיק, מעליב, גזעני, מיני או אלים</li>
                <li>הפרת זכויות יוצרים, מדגמים או קניין רוחני אחר</li>
                <li>הטעיית משתמשים, פרסום מידע כוזב או מטעה</li>
                <li>יצירת תוכן המפר פרטיות או כבוד האדם</li>
                <li>פעילות פלילית או תמיכה בפעילות כזו</li>
                <li>ניסיון לפרוץ, לפגוע או לשבש את המערכות שלנו</li>
                <li>שימוש אוטומטי או בוטים ללא אישור מפורש</li>
                <li>מכירה, השכרה או העברת הגישה לשירות לצד שלישי</li>
                <li>יצירת תוכן שמחקה או מתחזה לאנשים אמיתיים (deepfakes)</li>
                <li>פעילות המתמרדת או מפירה את החוק הישראלי או הבינלאומי</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">התחייבויות נוספות</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>לוודא שהתוכן שלכם לא מפר זכויות צד שלישי</li>
                <li>לקבל אישור מראש לפרסום דמויות של אנשים זרים</li>
                <li>לא לחלוק תוכן מזיק או וירוסים</li>
                <li>לכבד את זכויות המשתמשים האחרים</li>
                <li>לדווח על שימוש פסול שזיהיתם</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed bg-yellow-50 p-4 rounded-lg">
                <strong>אזהרה:</strong> אנו שומרים לעצמנו את הזכות להשעות, להגביל או לסגור חשבונות המפרים תנאים אלה, ללא הודעה מוקדמת ועל פי שיקול דעתנו הבלעדי. במקרים חמורים, נעביר מידע לרשויות החוק.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. זכויות יוצרים ובעלות על תוכן</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 תוכן שנוצר על ידכם</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                התוכן שנוצר באמצעות הפלטפורמה שלנו (&quot;תוכן משתמש&quot;) כפוף לתנאים הבאים:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>בעלות:</strong> זכויות היוצרים על התוכן הסופי שלכם שייכות לכם</li>
                <li><strong>אחריות:</strong> אתם לבדכם אחראים לוודא שהתוכן חוקי, אתי ואינו מפר זכויות צד שלישי</li>
                <li><strong>רישיון לנו:</strong> אתם מעניקים לנו רישיון לא בלעדי לשימוש בתוכן לצורך מתן השירות ושיפורו</li>
                <li><strong>חשיפה:</strong> אנו לא נשתף את התוכן שלכם עם צדדים שלישיים ללא הסכמתכם</li>
                <li><strong>גיבוי:</strong> אתם אחראים לגבות את התוכן שלכם - איננו מתחייבים לשמירה לטווח ארוך</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 תוכן ואמצעים טכנולוגיים שלנו</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>הפלטפורמה, האלגוריתמים והטכנולוגיה שלנו מוגנים בזכויות יוצרים</li>
                <li>אסור לעתק, להנדס לאחור או לחקות את הטכנולוגיה שלנו</li>
                <li>שירותי הבינה המלאכותית המשולבים כפופים לתנאי ספקיהם (OpenAI, וכו&apos;)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 הליך DMCA ודיווח על הפרות</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                אם אתם סבורים שהתוכן בפלטפורמה מפר את זכויות היוצרים שלכם, אנא פנו אלינו עם הפרטים הבאים:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>זיהוי הרכוש הרוחני שנפגע</li>
                <li>מיקום התוכן המפר בפלטפורמה</li>
                <li>פרטי יצירת קשר וחתימה</li>
                <li>הצהרה על תום הלב של הטענה</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">דוא&quot;ל לדיווח הפרות: copyright@vidgenai.com</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. שימוש בבינה מלאכותית ומגבלות</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 טבע השירות</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                השירותים שלנו מבוססים על טכנולוגיות בינה מלאכותית מתקדמות. חשוב להבין:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>התוצאות עשויות להשתנות ואינן מובטחות להיות מושלמות</li>
                <li>הבינה המלאכותית עלולה ליצור תוכן לא מדויק או לא רלווטי</li>
                <li>התוכן שנוצר עשוי להיות דומה לתוכן קיים באינטרנט</li>
                <li>אנו לא אחראים לשגיאות או אי דיוקים בתוכן שנוצר</li>
                <li>השירות תלוי בספקי בינה מלאכותית חיצוניים</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 שימוש במידע לשיפור השירות</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>אנו עשויים להשתמש בנתוני שימוש אנונימיים לשיפור השירות</li>
                <li>לא נשתמש בתוכן הפרטי שלכם לאימון מודלים</li>
                <li>ניתוח דפוסי שימוש מסייע לנו לפתח תכונות חדשות</li>
                <li>מידע זה לא יקושר לזהות האישית שלכם</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.3 מגבלות ואחריות</h3>
              <p className="text-gray-700 leading-relaxed bg-amber-50 p-4 rounded-lg">
                <strong>חשוב:</strong> תמיד בדקו ואמתו את התוכן שנוצר לפני השימוש המסחרי. אנו ממליצים להוסיף ביקורת אנושית לכל תוכן חשוב.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. פרטיות ואבטחת מידע</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו מחויבים להגנה על הפרטיות שלכם והמידע שלכם:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>נשמור על המידע האישי שלכם בהתאם למדיניות הפרטיות שלנו</li>
                <li>לא נמכור או נשתף מידע אישי ללא הסכמתכם המפורשת</li>
                <li>נשתמש בטכנולוגיות הצפנה ואבטחה מתקדמות</li>
                <li>נודיע לכם במקרה של פרצת אבטחה בהתאם לחוק</li>
                <li>תוכלו לבקש מחיקת המידע שלכם בכל עת</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                למידע מפורט, עיינו ב<Link href="/privacy" className="text-blue-600 hover:underline">מדיניות הפרטיות</Link> שלנו.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. זמינות השירות וביצועים</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו פועלים לשמור על זמינות גבוהה של השירות ושיפור מתמיד, אך:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>אנו שואפים לזמינות של 99.5% אך איננו מתחייבים לזמינות מוחלטת</li>
                <li>עשויות להיות הפסקות לתחזוקה מתוכננת (בדרך כלל בלילות)</li>
                <li>שירותי צד שלישי (OpenAI, שירותי תשלום) עלולים להשפיע על הפעילות</li>
                <li>נעדכן אתכם מראש על הפסקות מתוכננות באמצעות האתר או האימייל</li>
                <li>במקרה של תקלות משמעותיות, נשקול החזר יחסי של קרדיטים</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">הגבלות שימוש</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>מספר בקשות מוגבל ל-100 בקשות לדקה למשתמש</li>
                <li>קבצים מוגבלים לגודל של 100MB לקובץ</li>
                <li>אחסון מוגבל לפי החבילה שנבחרה</li>
                <li>אנו שומרים את הזכות להגביל שימוש חריג</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. הגבלת אחריות</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                השירות ניתן &quot;כמו שהוא&quot; וללא אחריות מפורשת או משתמעת:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>איננו אחראים לנזקים ישירים או עקיפים</li>
                <li>איננו מתחייבים לאיכות או דיוק התוכן שנוצר</li>
                <li>אחריותנו מוגבלת לסכום ששילמתם עבור השירות</li>
                <li>איננו אחראים לפעילות של שירותי צד שלישי</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. שינויים בתנאים</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו רשאים לעדכן תנאים אלה מעת לעת:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>נודיע לכם על שינויים משמעותיים</li>
                <li>השימוש המתמשך בשירות מהווה הסכמה לתנאים החדשים</li>
                <li>תוכלו לבטל את החשבון אם אינכם מסכימים לשינויים</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. דין החל ופתרון סכסוכים</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                תנאים אלה כפופים לחוקי מדינת ישראל:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>בתי המשפט בישראל יהיו בעלי סמכות השיפוט הבלעדית</li>
                <li>נעדיף פתרון סכסוכים בדרך של גישור</li>
                <li>נפעל בתום לב לפתרון כל בעיה שתתעורר</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. יצירת קשר</h2>
              <p className="text-gray-700 leading-relaxed">
                אם יש לכם שאלות לגבי תנאי השימוש הללו, אנא צרו קשר איתנו:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700"><strong>אימייל:</strong> support@vidgenai.com</p>
                <p className="text-gray-700"><strong>טלפון:</strong> 03-1234567</p>
                <p className="text-gray-700"><strong>כתובת:</strong> רחוב הטכנולוגיה 123, תל אביב</p>
              </div>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-blue-800 font-medium">
                תנאי השימוש האלה נכנסו לתוקף ביום 30 ביוני 2025 ומחליפים כל גרסה קודמת.
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

