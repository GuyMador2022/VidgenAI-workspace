# מערכת ניהול API - VidGenAI

## דפי ניהול זמינים:

### 🎛️ דף ניהול ראשי - `/admin`
- ניהול מפתחות API עבור כל הפלטפורמות
- בדיקת תקינות מפתחות
- שמירה ועריכה של הגדרות

### 👥 ניהול משתמשים - `/admin-users`
- רשימת כל המשתמשים במערכת
- פעולות ניהול משתמשים
- סטטיסטיקות משתמשים

### 📊 אנליטיקה מתקדמת - `/admin` (טאב אנליטיקה)
- נתונים ודוחות מפורטים
- גרפים וסטטיסטיקות
- ניתוח ביצועים

## API Endpoints זמינים:

### Admin APIs:
- `GET /api/admin/get-api-keys` - קבלת מפתחות API
- `POST /api/admin/save-api-keys` - שמירת מפתחות API
- `POST /api/admin/test-api-key` - בדיקת תקינות מפתח
- `GET /api/admin/users` - רשימת משתמשים
- `POST /api/admin/user-actions` - פעולות על משתמשים
- `GET /api/admin/export-users` - ייצוא נתוני משתמשים

### SMS APIs:
- `POST /api/sms/send-verification` - שליחת קוד אימות SMS
- `POST /api/sms/verify-code` - אימות קוד SMS
- `POST /api/sms/twilio` - שירות Twilio SMS
- `POST /api/sms/aws-sns` - שירות AWS SNS
- `POST /api/sms/israeli-sms` - שירותי SMS ישראליים

### Campaign APIs:
- `GET /api/campaigns/stats` - סטטיסטיקות קמפיינים

### Video Generation:
- `POST /api/generate-video` - יצירת סרטונים

## פלטפורמות API נתמכות:

1. **OpenAI** 🤖 - לכתיבת תסריטים ויצירת תמונות
2. **ElevenLabs** 🗣️ - לדיבוב ויצירת קול
3. **RunwayML** 🎬 - לעיבוד ויצירת סרטונים
4. **Firebase** 🔥 - לניהול משתמשים ואחסון
5. **Stripe** 💳 - לעיבוד תשלומים
6. **WhatsApp Business** 📱 - לשליחת הודעות ושיתוף
7. **Facebook** 📘 - לפרסום ושיתוף תוכן
8. **LinkedIn** 💼 - לפרסום עסקי
9. **Instagram** 📸 - לשיתוף תוכן ויזואלי

## קישורי גישה:

- דשבורד ראשי: `/`
- סל מוצרים: `/products`
- עמוד ניהול: `/admin`
- ניהול משתמשים: `/admin-users`
- אנליטיקה: `/admin?tab=analytics`
- יצירת תוכן לקמפיין: `/create-campaign`
- אימות: `/auth`

## הגדרות:

- קובץ API Keys: `config/api-keys.json`
- קבצי API: `pages/api/`
- רכיבי UI: `components/`

כל המערכת זמינה ופועלת על פורט 3001.
