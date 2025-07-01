# מדריך פרסום אפליקציית VidGenAI

## 🚀 אפשרויות פרסום

### 1. 🎯 Vercel (הכי מומלץ)

**יתרונות:**
- ✅ פרסום מהיר ופשוט
- ✅ אינטגרציה מושלמת עם Next.js
- ✅ SSL אוטומטי
- ✅ CDN עולמי
- ✅ חינם עד 100GB bandwidth

**שלבים:**
1. עלה את הקוד ל-GitHub
2. הרשם ל-Vercel: https://vercel.com
3. חבר את ה-GitHub repository
4. הגדר את המשתנים הסביבתיים (Environment Variables)
5. לחץ Deploy

**משתנים סביבתיים נדרשים:**
```
OPENAI_API_KEY=your_openai_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
RUNWAY_API_KEY=your_runway_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
STRIPE_SECRET_KEY=your_stripe_secret_key
WHATSAPP_API_KEY=your_whatsapp_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
ISRAELI_SMS_API_KEY=your_israeli_sms_api_key
```

### 🔐 אימות SMS

האפליקציה כוללת מערכת אימות SMS מתקדמת עם:

**✅ פיצ'רים:**
- אימות מספרי טלפון ישראליים
- קודי אימות של 6 ספרות
- הגבלת קצב (Rate Limiting)
- מספר ספקים לאמינות
- תמיכה בפיתוח ובייצור

**📱 ספקי SMS נתמכים:**
1. **Twilio** (ראשי) - עולמי, אמין
2. **AWS SNS** (גיבוי) - מובנה ב-AWS
3. **Israeli SMS Provider** - למספרים ישראליים

**🛡️ אבטחה:**
- מגבלת 3 SMS לשעה למספר
- מגבלת 10 SMS ליום למספר
- קודים תקפים ל-10 דקות
- מקסימום 3 ניסיונות לקוד

**⚙️ הגדרה:**
1. הרשם לספק SMS (Twilio מומלץ)
2. הוסף את ה-API Keys למשתנים סביבתיים
3. הגדר webhooks אם נדרש
4. בדוק שהמספרים מתקבלים

---

### 2. 🪣 AWS S3 + CloudFront

**יתרונות:**
- ✅ מהיר ברחבי העולם
- ✅ זול יחסית
- ✅ שליטה מלאה
- ✅ אמין ביותר

**שלבים:**

#### א. הכנת האפליקציה לפרסום סטטי:

1. **עדכון next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'oaidalleapiprodscus.blob.core.windows.net',
      'cdn.elevenlabs.io',
      'storage.googleapis.com'
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
    RUNWAY_API_KEY: process.env.RUNWAY_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    WHATSAPP_API_KEY: process.env.WHATSAPP_API_KEY,
  },
}

module.exports = nextConfig
```

2. **הוספת סקריפט לבנייה:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export",
    "deploy": "npm run export && aws s3 sync out/ s3://your-bucket-name --delete"
  }
}
```

#### ב. יצירת S3 Bucket:

1. היכנס ל-AWS Console
2. יצור S3 Bucket חדש
3. הפעל Static Website Hosting
4. הגדר Index Document: `index.html`
5. הגדר Error Document: `404.html`

#### ג. הגדרת CloudFront:

1. יצור CloudFront Distribution
2. הגדר Origin: S3 Bucket
3. הגדר Default Root Object: `index.html`
4. הגדר Custom Error Pages עבור 404

#### ד. פרסום:

```bash
# בנייה ויצוא
npm run build
npm run export

# העלאה ל-S3
aws s3 sync out/ s3://your-bucket-name --delete

# ניקיון Cache של CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

---

### 3. 🌟 Netlify

**יתרונות:**
- ✅ פשוט מאוד
- ✅ פרסום אוטומטי מ-Git
- ✅ Forms מובנים
- ✅ חינם עד 100GB

**שלבים:**
1. הרשם ל-Netlify: https://netlify.com
2. חבר את ה-GitHub repository
3. הגדר Build Command: `npm run build`
4. הגדר Publish Directory: `out`
5. הגדר Environment Variables

---

### 4. ☁️ AWS Amplify

**יתרונות:**
- ✅ אינטגרציה מלאה עם AWS
- ✅ CI/CD מובנה
- ✅ Backend services
- ✅ אותנטיקציה מובנית

**שלבים:**
1. היכנס ל-AWS Amplify Console
2. חבר את ה-GitHub repository
3. הגדר Build Settings
4. הגדר Environment Variables
5. פרסם

---

## 🔧 הכנה לפרסום

### 1. בדיקת הבנייה:
```bash
npm run build
```

### 2. בדיקת הפרויקט:
```bash
npm run start
```

### 3. בדיקת Linting:
```bash
npm run lint
```

---

## 🌍 הגדרת דומיין מותאם אישית

### עבור Vercel:
1. הוסף דומיין ב-Project Settings
2. הגדר DNS Records במפיץ הדומיין

### עבור AWS:
1. הוסף דומיין ב-CloudFront Distribution
2. הוסף SSL Certificate ב-ACM
3. הגדר DNS Records ב-Route 53 או במפיץ הדומיין

---

## 📊 מעקב ואנליטיקה

### Google Analytics:
הוסף את הקוד הבא ל-`_app.js`:

```javascript
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Google Analytics
const GA_TRACKING_ID = 'YOUR_GA_ID'

export const gtag = {
  pageview: (url) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  },
  event: ({ action, category, label, value }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  },
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
```

---

## 🔐 אבטחה

### 1. Environment Variables:
- אל תכלול API Keys בקוד
- השתמש ב-Environment Variables
- הגדר אותם בפלטפורמת הפרסום

### 2. HTTPS:
- ודא שהאתר נגיש רק דרך HTTPS
- הפעל HSTS Headers

### 3. CSP (Content Security Policy):
הוסף ל-`next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## 💡 המלצות

1. **התחל עם Vercel** - הכי פשוט וויעיל
2. **הגדר Custom Domain** - נראה יותר מקצועי
3. **הוסף Analytics** - לעקוב אחרי תנועה
4. **הגדר Error Monitoring** - כמו Sentry
5. **בצע בדיקות ביצועים** - עם Lighthouse

---

## 🆘 פתרון בעיות נפוצות

### בעיה: "Module not found"
**פתרון:** ודא שכל התלויות מותקנות:
```bash
npm install
```

### בעיה: "Build failed"
**פתרון:** בדוק שגיאות ESLint:
```bash
npm run lint
```

### בעיה: "Static export error"
**פתרון:** ודא שאין שימוש ב-API Routes או Image Optimization ללא הגדרה מתאימה.

---

## 📞 תמיכה

אם נתקלת בבעיות, ניתן לפנות אל:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [AWS Documentation](https://docs.aws.amazon.com/)
