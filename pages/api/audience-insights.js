// Enhanced API to fetch audience insights and typical messages
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { targetAudience, campaignGoal, contentType, platforms } = req.body

    if (!targetAudience || !targetAudience.trim()) {
      return res.status(400).json({ error: 'Target audience is required' })
    }

    console.log(`🔍 Fetching enhanced audience insights for: ${targetAudience}`)

    // Enhanced insights generation with more context
    const insights = await generateAudienceInsights(targetAudience, campaignGoal, contentType, platforms)

    // Add confidence score and recommendations
    const confidenceScore = calculateConfidenceScore(targetAudience, insights)
    const recommendations = generateRecommendations(insights, campaignGoal, contentType)

    return res.status(200).json({
      success: true,
      audience: targetAudience,
      insights: insights,
      confidenceScore: confidenceScore,
      recommendations: recommendations,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching audience insights:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch audience insights',
      details: error.message 
    })
  }
}

async function generateAudienceInsights(targetAudience, campaignGoal, contentType, platforms) {
  // Enhanced simulation with more realistic API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000))

  const audienceLower = targetAudience.toLowerCase()
  
  let insights = {
    typicalMessages: [],
    commonLanguage: [],
    painPoints: [],
    interests: [],
    platforms: [],
    demographics: {}, // New: Age, gender, location data
    bestPostingTimes: [], // New: Optimal posting times
    contentPreferences: [], // New: What content works best
    competitors: [] // New: Similar brands/competitors
  }

  // Enhanced insights generation with more categories and detail
  // Analyze audience and generate relevant insights
  if (audienceLower.includes('אמהות') || audienceLower.includes('הורים') || audienceLower.includes('משפחה')) {
    insights = {
      typicalMessages: [
        "איך אפשר לעזור לילדים שלי להתמודד עם הלחץ בבית הספר?",
        "מחפשת פעילויות איכותיות לעשות עם הילדים בסוף השבוע",
        "איזה מוצרים באמת שווים את הכסף עבור הילדים?",
        "איך לאזן בין עבודה להורות בצורה בריאה?",
        "מה הדרך הטובה ביותר לחסוך כסף עבור העתיד של הילדים?"
      ],
      commonLanguage: [
        "מאמא לאמא", "חיסכון בתקציב", "איכות חיים", "בריאות הילדים", 
        "זמן איכות", "ביטחון", "חינוך", "נוחות"
      ],
      painPoints: [
        "חוסר זמן", "לחץ כלכלי", "איזון עבודה-משפחה", 
        "דאגה לעתיד הילדים", "בחירת מוצרים נכונים"
      ],
      interests: [
        "פעילויות משפחתיות", "בריאות וריפוי", "חינוך", 
        "בישול ותזונה", "DIY ויצירות", "טיולים"
      ],
      platforms: ["פייסבוק", "אינסטגרם", "ווטסאפ", "טיקטוק"],
      demographics: {
        age: "25-45",
        gender: "נשים",
        location: "ערים גדולות"
      },
      bestPostingTimes: ["שני-חמישי, 20:00-22:00"],
      contentPreferences: ["מאמרים", "וידאו", "פודקאסטים"],
      competitors: ["הורים מדברים", "אמאזון", "מדריך ההורים"]
    }
  } else if (audienceLower.includes('צעירים') || audienceLower.includes('סטודנטים') || audienceLower.includes('20-30')) {
    insights = {
      typicalMessages: [
        "איך לחסוך כסף בתור סטודנט?",
        "מחפש עבודה טובה שמשלמת הוגן",
        "איזה קורסים באמת שווים את הכסף?",
        "איך לבנות קריירה מוצלחת?",
        "מה הדרך הטובה ביותר להשקיע כסף?"
      ],
      commonLanguage: [
        "חיים", "קריירה", "הזדמנויות", "עצמאות", 
        "השקעה", "טכנולוגיה", "חדשנות", "חלומות"
      ],
      painPoints: [
        "חוסר ביטחון כלכלי", "אי ודאות בקריירה", "לחץ חברתי",
        "קושי בהחלטות", "תחרותיות בשוק העבודה"
      ],
      interests: [
        "טכנולוגיה", "סטרימינג", "משחקים", "ערוצי יוטיוב",
        "רשתות חברתיות", "אופנה", "נסיעות"
      ],
      platforms: ["אינסטגרם", "טיקטוק", "יוטיוב", "לינקדאין", "דיסקורד"],
      demographics: {
        age: "18-30",
        gender: "גברים ונשים",
        location: "ערים אוניברסיטאיות"
      },
      bestPostingTimes: ["שני-שישי, 18:00-20:00"],
      contentPreferences: ["וידאו קצר", "פוסטים באינסטגרם", "מאמרים מקצועיים"],
      competitors: ["סטודנטיאלה", "קריירה עכשיו", "הזדמנויות לסטודנטים"]
    }
  } else if (audienceLower.includes('עסקים') || audienceLower.includes('יזמים') || audienceLower.includes('מנהלים')) {
    insights = {
      typicalMessages: [
        "איך לגדל את העסק שלי ביעילות?",
        "מה הכלים הטובים ביותר לניהול עסק?",
        "איך למצוא לקוחות חדשים?",
        "מה האסטרטגיות הכי יעילות לשיווק?",
        "איך לחסוך עלויות מבלי לפגוע באיכות?"
      ],
      commonLanguage: [
        "ROI", "יעילות", "צמיחה", "רווחיות", 
        "אוטומציה", "קנה מידה", "תחרותיות", "חדשנות"
      ],
      painPoints: [
        "תחרות עזה", "עלויות גבוהות", "קושי בגיוס כספים",
        "ניהול זמן", "מציאת עובדים איכותיים"
      ],
      interests: [
        "כלים עסקיים", "שיווק דיגיטלי", "ניהול פרויקטים",
        "ניתוח נתונים", "רשתות מקצועיות", "כנסים"
      ],
      platforms: ["לינקדאין", "פייסבוק", "ווטסאפ", "אימייל"],
      demographics: {
        age: "30-55",
        gender: "גברים ונשים",
        location: "מרכזי עסקים"
      },
      bestPostingTimes: ["ראשון-חמישי, 9:00-11:00"],
      contentPreferences: ["מאמרים מקצועיים", "וידאו", "פודקאסטים"],
      competitors: ["עסקים מצליחים", "יזמות ישראלית", "מנהלי עסקים"]
    }
  } else if (audienceLower.includes('נדלן') || audienceLower.includes('דירה') || audienceLower.includes('בית')) {
    insights = {
      typicalMessages: [
        "איך לדעת שאני קונה דירה במחיר הוגן?",
        "מה האזורים הכי מבוקשים להשקעה?",
        "איזה בדיקות חשוב לעשות לפני קניית דירה?",
        "איך לקבל משכנתא בתנאים הטובים ביותר?",
        "מתי זה הזמן הנכון לקנות או למכור?"
      ],
      commonLanguage: [
        "השקעה", "מיקום", "מחיר למטר", "תשואה", 
        "משכנתא", "ביטחון", "פוטנציאל", "שווי"
      ],
      painPoints: [
        "מחירים גבוהים", "אי ודאות בשוק", "קושי בקבלת מימון",
        "חוסר ידע בתחום", "פחד מטעויות יקרות"
      ],
      interests: [
        "מחירי נדלן", "זכויות רוכשים", "אזורים מתפתחים",
        "עיצוב פנים", "שיפוצים", "השקעות"
      ],
      platforms: ["פייסבוק", "ווטסאפ", "מדיה", "לינקדאין"],
      demographics: {
        age: "28-60",
        gender: "גברים ונשים",
        location: "ערים עם פוטנציאל השקעה"
      },
      bestPostingTimes: ["שני-שישי, 10:00-12:00"],
      contentPreferences: ["מאמרים", "וידאו", "פודקאסטים"],
      competitors: ["נדלניסטים", "משקיעים נדלן", "מדריך המשקיע"]
    }
  } else {
    // Generic insights for other audiences
    insights = {
      typicalMessages: [
        "איך למצוא את המוצר הטוב ביותר עבורי?",
        "מה הדעות של אנשים על המוצר הזה?",
        "איך לדעת שאני מקבל יחס מחיר-איכות טוב?",
        "יש למישהו ניסיון עם החברה הזו?",
        "מה הדרך הכי חכמה לקנות את זה?"
      ],
      commonLanguage: [
        "איכות", "מחיר", "שירות", "מהימנות", 
        "ביקורות", "חוויה", "שביעות רצון", "המלצות"
      ],
      painPoints: [
        "חוסר ביטחון בקנייה", "פחד מהונאות", "קושי בבחירה",
        "זמן מוגבל", "מידע מוגבל"
      ],
      interests: [
        "ביקורות מוצרים", "השוואת מחירים", "טיפים לקנייה",
        "חדשות בתחום", "מבצעים והנחות"
      ],
      platforms: ["פייסבוק", "אינסטגרם", "גוגל", "ווטסאפ"],
      demographics: {
        age: "18-65",
        gender: "גברים ונשים",
        location: "כל הארץ"
      },
      bestPostingTimes: ["כל השבוע, 9:00-21:00"],
      contentPreferences: ["מאמרים", "וידאו", "פוסטים ברשתות החברתיות"],
      competitors: ["חנויות מקוונות", "מותגים פופולריים", "ביקורות מוצרי צריכה"]
    }
  }

  return insights
}

// New: Calculate confidence score based on audience specificity
function calculateConfidenceScore(targetAudience, insights) {
  let score = 50 // Base score
  
  // Add points for specific keywords
  const specificKeywords = ['גיל', 'מקום', 'מקצוע', 'תחום', 'בעלי', 'עם', 'שמחפשים']
  specificKeywords.forEach(keyword => {
    if (targetAudience.includes(keyword)) score += 10
  })
  
  // Add points for detailed insights
  if (insights.typicalMessages.length > 3) score += 10
  if (insights.painPoints.length > 2) score += 10
  if (insights.platforms.length > 1) score += 5
  
  return Math.min(100, score)
}

// New: Generate actionable recommendations
function generateRecommendations(insights, campaignGoal, contentType) {
  const recommendations = []
  
  // Content recommendations
  if (contentType === 'video' && insights.platforms.includes('TikTok')) {
    recommendations.push({
      type: 'content',
      title: 'המלצת תוכן',
      message: 'קהל היעד שלך פעיל ב-TikTok - שקול ליצור סרטונים קצרים ודינמיים',
      priority: 'high'
    })
  }
  
  // Timing recommendations
  if (insights.bestPostingTimes && insights.bestPostingTimes.length > 0) {
    recommendations.push({
      type: 'timing',
      title: 'זמני פרסום מומלצים',
      message: `על פי הניתוח, הזמנים הטובים ביותר: ${insights.bestPostingTimes[0]}`,
      priority: 'medium'
    })
  }
  
  // Language recommendations
  if (insights.commonLanguage.length > 0) {
    const topWords = insights.commonLanguage.slice(0, 3).join(', ')
    recommendations.push({
      type: 'language',
      title: 'שפה מומלצת',
      message: `השתמש במילים הבאות בתוכן: ${topWords}`,
      priority: 'medium'
    })
  }
  
  // Pain point recommendations
  if (insights.painPoints.length > 0) {
    recommendations.push({
      type: 'strategy',
      title: 'נקודות כאב לטיפול',
      message: `הקהל שלך מתמודד עם: ${insights.painPoints[0]}. בנה תוכן שנותן פתרון`,
      priority: 'high'
    })
  }
  
  return recommendations
}
