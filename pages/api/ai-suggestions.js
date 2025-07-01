// API for AI-powered campaign suggestions
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { field, currentValue, context } = req.body

    if (!field) {
      return res.status(400).json({ error: 'Field is required' })
    }

    console.log(`🤖 Generating AI suggestions for field: ${field}`)

    const suggestions = await generateSuggestions(field, currentValue, context)

    return res.status(200).json({
      success: true,
      field: field,
      suggestions: suggestions,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error generating AI suggestions:', error)
    return res.status(500).json({ 
      error: 'Failed to generate suggestions',
      details: error.message 
    })
  }
}

async function generateSuggestions(field, currentValue, context) {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800))

  const suggestions = []

  switch (field) {
    case 'campaignName':
      if (context.productData) {
        suggestions.push(
          `קמפיין ${context.productData.name} 2024`,
          `השקת ${context.productData.name}`,
          `${context.productData.name} - הפתרון שחיפשתם`,
          `גלו את ${context.productData.name}`,
          `מבצע חורף - ${context.productData.name}`
        )
      } else if (context.campaignGoal === 'awareness') {
        suggestions.push(
          'בואו להכיר אותנו',
          'המותג החדש שלכם',
          'סיפור המותג שלנו',
          'למה אנחנו שונים',
          'הכירו את הצוות'
        )
      } else if (context.campaignGoal === 'sales') {
        suggestions.push(
          'מבצע השקה מיוחד',
          'הצעה שלא תחזור',
          'עכשיו או אף פעם',
          'מבצע סוף שנה',
          'הנחה בלעדית ללקוחות חדשים'
        )
      }
      break

    case 'topic':
      // Enhanced topic suggestions based on selected insights
      if (context.selectedInsights) {
        const { painPoints, typicalMessages } = context.selectedInsights
        
        if (painPoints && painPoints.length > 0) {
          painPoints.forEach(pain => {
            suggestions.push(
              `פתרון ל${pain} - המדריך המלא`,
              `איך להתמודד עם ${pain}`,
              `${pain}? הנה הפתרון!`,
              `למה ${pain} קורה ואיך למנוע את זה`
            )
          })
        }
        
        if (typicalMessages && typicalMessages.length > 0) {
          typicalMessages.forEach(message => {
            suggestions.push(
              `התשובה ל"${message}"`,
              `המדריך המלא: ${message}`,
              `כל מה שצריך לדעת על "${message.substring(0, 30)}..."`
            )
          })
        }
      }
      
      if (context.targetAudience) {
        const audience = context.targetAudience.toLowerCase()
        if (audience.includes('הורים') || audience.includes('ילדים')) {
          suggestions.push(
            'כיצד לחסוך זמן ולהיות הורה טוב יותר',
            'המוצרים הבטוחים ביותר לילדים',
            '5 טיפים לגידול ילדים מאושרים',
            'איך לאזן בין קריירה להורות',
            'המדריך המלא לרכישות חכמות למשפחה'
          )
        } else if (audience.includes('עסק') || audience.includes('יזמ')) {
          suggestions.push(
            'כיצד להגדיל את הרווחיות של העסק',
            '10 אסטרטגיות לצמיחה מהירה',
            'הטעויות הנפוצות של יזמים חדשים',
            'איך לבנות צוות חזק ומוצלח',
            'המדריך לשיווק דיגיטלי יעיל'
          )
        } else if (audience.includes('נדלן')) {
          suggestions.push(
            'המדריך המלא לרכישת דירה ראשונה',
            'איך לבחור נכס להשקעה מנצח',
            'טעויות נפוצות בקניית דירה',
            'המגמות החמות בשוק הנדלן',
            'איך לקבל משכנתא בתנאים הטובים'
          )
        }
      }

      if (context.campaignGoal === 'leads') {
        suggestions.push(
          'הורדת המדריך החינמי שלנו',
          'קבלו ייעוץ חינם עכשיו',
          'בדיקת מחיר מהירה וחינמית',
          'הרשמה לניוזלטר השבועי',
          'בואו לייעוץ אישי ללא התחייבות'
        )
      }
      break

    case 'targetAudience':
      if (context.productData) {
        const product = context.productData.description.toLowerCase()
        if (product.includes('בית') || product.includes('משפחה')) {
          suggestions.push(
            'משפחות צעירות עם ילדים קטנים',
            'זוגות בגילאי 25-40 המחפשים פתרונות לבית',
            'הורים עובדים שמחפשים נוחות ויעילות',
            'בעלי בתים שרוצים לשדרג ולחסוך',
            'משפחות בפרברים המעוניינות באיכות חיים'
          )
        } else if (product.includes('עסק') || product.includes('שירות')) {
          suggestions.push(
            'בעלי עסקים קטנים ובינוניים',
            'יזמים בתחילת הדרך',
            'מנהלי שיווק בחברות הייטק',
            'עצמאיים ופרילנסרים',
            'מנכ"לים של חברות סטארט-אפ'
          )
        }
      }
      break

    case 'postingTimes':
      if (context.targetAudience) {
        const audience = context.targetAudience.toLowerCase()
        if (audience.includes('הורים') || audience.includes('אמהות') || audience.includes('משפחה')) {
          suggestions.push(
            'ימים א-ה, 20:00-22:00 (אחרי שהילדים הולכים לישון)',
            'שבת, 9:00-11:00 (בזמן ארוחת הבוקר)',
            'יום ה, 18:00-20:00 (הכנות לסוף השבוע)',
            'ימים א-ב, 8:00-9:00 (בדרך לעבודה)',
            'יום ו, 14:00-16:00 (הכנות לשבת)'
          )
        } else if (audience.includes('צעירים') || audience.includes('סטודנטים') || audience.includes('20-30')) {
          suggestions.push(
            'ימים א-ה, 18:00-20:00 (אחרי הלימודים/עבודה)',
            'שבת-א, 22:00-24:00 (זמן פנוי בסוף השבוע)',
            'יום ה, 20:00-22:00 (התחלת סוף השבוע)',
            'ימים ב-ד, 12:00-14:00 (הפסקת צהריים)',
            'יום ו, 10:00-12:00 (בוקר סוף השבוע)'
          )
        } else if (audience.includes('עסקים') || audience.includes('יזמים') || audience.includes('מנהלים')) {
          suggestions.push(
            'ימים א-ה, 9:00-11:00 (שעות עבודה פעילות)',
            'ימים ב-ד, 14:00-16:00 (אחרי הצהריים בעבודה)',
            'יום א, 8:00-10:00 (תחילת שבוע עבודה)',
            'יום ה, 16:00-18:00 (סוף השבוע)',
            'ימים א-ה, 7:00-9:00 (בדרך לעבודה)'
          )
        } else if (audience.includes('נדלן') || audience.includes('דירה') || audience.includes('בית')) {
          suggestions.push(
            'ימים ה-ו, 19:00-21:00 (זמן לחפש דירות)',
            'יום ו, 10:00-14:00 (יום צפייה בדירות)',
            'ימים א-ה, 20:00-22:00 (אחרי העבודה)',
            'יום ד, 18:00-20:00 (אמצע השבוע)',
            'ימים ב-ג, 21:00-23:00 (זמן לקריאה וחיפוש)'
          )
        } else {
          suggestions.push(
            'ימים א-ה, 19:00-21:00 (שעות הערב)',
            'יום ו, 10:00-12:00 (בוקר סוף השבוע)',
            'ימים ב-ד, 12:00-14:00 (הפסקת צהריים)',
            'יום ה, 17:00-19:00 (סוף השבוע)',
            'ימים א-ה, 8:00-9:00 (בדרך לעבודה)'
          )
        }
      }
      break

    case 'keywords':
      if (context.targetAudience) {
        const audience = context.targetAudience.toLowerCase()
        if (audience.includes('הורים') || audience.includes('אמהות') || audience.includes('משפחה')) {
          suggestions.push(
            'ילדים, חינוך, בריאות, בטיחות, משפחה',
            'הורות, גידול ילדים, זמן איכות, חיסכון',
            'בית, משפחה, נוחות, איכות חיים',
            'ילדים קטנים, פעילויות, למידה, יצירתיות',
            'אמא, אבא, משפחה, אהבה, דאגה'
          )
        } else if (audience.includes('צעירים') || audience.includes('סטודנטים') || audience.includes('20-30')) {
          suggestions.push(
            'קריירה, הזדמנויות, השתלמות, הצלחה',
            'כסף, חיסכון, השקעות, עצמאות כלכלית',
            'טכנולוגיה, חדשנות, סטארט-אפ, הייטק',
            'נסיעות, חוויות, חברים, בילויים',
            'עבודה, משכורת, קידום, פיתוח אישי'
          )
        } else if (audience.includes('עסקים') || audience.includes('יזמים') || audience.includes('מנהלים')) {
          suggestions.push(
            'עסק, רווחיות, צמיחה, הצלחה עסקית',
            'שיווק, מכירות, לקוחות, רווחים',
            'ניהול, אסטרטגיה, תכנון, יעילות',
            'חדשנות, טכנולוגיה, אוטומציה, דיגיטל',
            'מנהיגות, צוות, פרודוקטיביות, תוצאות'
          )
        } else if (audience.includes('נדלן') || audience.includes('דירה') || audience.includes('בית')) {
          suggestions.push(
            'נדלן, דירה, בית, קניה, מכירה',
            'השקעה, רווחיות, מיקום, שווי',
            'משכנתא, מימון, בנק, הלוואה',
            'שיפוצים, עיצוב, בנייה, שדרוג',
            'מחיר, מטר, שטח, חדרים, מרפסת'
          )
        } else {
          suggestions.push(
            'איכות, מחיר, שירות, אמינות',
            'חדש, מיוחד, בלעדי, מוגבל',
            'פתרון, עזרה, תמיכה, ייעוץ',
            'מבצע, הנחה, הצעה, חיסכון',
            'מקצועי, איכותי, מומלץ, מנוסה'
          )
        }
      }
      break

    case 'platforms':
      if (context.targetAudience) {
        const audience = context.targetAudience.toLowerCase()
        if (audience.includes('צעיר') || audience.includes('דור ה')) {
          suggestions.push('TikTok', 'Instagram', 'Snapchat')
        } else if (audience.includes('עסק') || audience.includes('מקצוע')) {
          suggestions.push('LinkedIn', 'Facebook', 'YouTube')
        } else if (audience.includes('משפחה') || audience.includes('הורים')) {
          suggestions.push('Facebook', 'Instagram', 'YouTube')
        }
      }
      break
  }

  // Add some general suggestions if no specific ones were generated
  if (suggestions.length === 0) {
    switch (field) {
      case 'campaignName':
        suggestions.push('קמפיין חדש', 'השקה מיוחדת', 'מבצע מוגבל')
        break
      case 'topic':
        suggestions.push('המוצר החדש שלנו', 'למה כדאי לבחור בנו', 'סיפור הלקוחות שלנו')
        break
      case 'targetAudience':
        suggestions.push('לקוחות פוטנציאליים בגיל 25-45', 'אנשים המתעניינים בתחום', 'קהל רחב')
        break
    }
  }

  return suggestions.slice(0, 5) // Return max 5 suggestions
}
