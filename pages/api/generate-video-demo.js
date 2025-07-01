// Test demo API endpoint for video generation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { topic, productData } = req.body

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' })
  }

  try {
    console.log('🎬 Demo video generation for:', topic)
    
    // Simulate successful OpenAI responses
    const demoScript = `מצגת לקורס שיווק דיגיטלי מתקדם 

🎯 האם אתם מוכנים לקחת את העסק שלכם לשלב הבא?

הכירו את הקורס הכי מקיף בישראל לשיווק דיגיטלי!
✨ 8 מודולים עוצמתיים
⏰ 24 שעות של תוכן איכותי  
🏆 תעודה מוכרת
👨‍💼 תמיכה אישית לאורך כל הדרך

🚀 רק היום - מחיר מיוחד של 499₪ בלבד!

אל תפספסו את ההזדמנות לשדרג את הקריירה שלכם
👈 הירשמו עכשיו והתחילו לגדול!`

    const demoImagePrompt = `Professional marketing course illustration featuring a laptop displaying digital marketing graphs and analytics, modern office setup with charts, social media icons, and Israeli flag elements, bright blue and white color scheme, high-quality digital art style, professional and inspiring atmosphere`

    const demoImageUrl = "https://via.placeholder.com/1024x1024/3b82f6/ffffff?text=Demo+Marketing+Course+Image"

    const result = {
      success: true,
      videoId: `vid_${Date.now()}`,
      topic: topic,
      productData: productData,
      script: demoScript,
      imagePrompt: demoImagePrompt,
      imageUrl: demoImageUrl,
      status: 'completed',
      steps: [
        { step: 'script', status: 'completed', description: 'תסריט נוצר בהצלחה עם ChatGPT' },
        { step: 'image', status: 'completed', description: 'תמונה נוצרה בהצלחה עם DALL-E' },
        { step: 'voice', status: 'pending', description: 'דיבוב - ממתין להגדרת ElevenLabs' },
        { step: 'video', status: 'pending', description: 'עיבוד סרטון - ממתין להגדרת RunwayML' }
      ],
      message: 'תסריט ותמונה נוצרו בהצלחה! עבור לעמוד הניהול להגדיר APIs נוספים למאפיינים מתקדמים.',
      note: '🔥 זהו מצב דמו! עם מפתח OpenAI פעיל תקבל תוכן אמיתי מ-ChatGPT ו-DALL-E'
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error in demo:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'שגיאה במצב הדמו',
      details: error.toString()
    })
  }
}
