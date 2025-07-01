// API endpoint for video generation using OpenAI
import fs from 'fs'
import path from 'path'

const API_KEYS_FILE = path.join(process.cwd(), 'config', 'api-keys.json')

// Function to get API keys
function getApiKeys() {
  try {
    if (fs.existsSync(API_KEYS_FILE)) {
      const data = JSON.parse(fs.readFileSync(API_KEYS_FILE, 'utf8'))
      return data.apiKeys || {}
    }
  } catch (error) {
    console.error('Error reading API keys:', error)
  }
  return {}
}

// Function to generate script using ChatGPT
async function generateScript(topic, productData = null) {
  const apiKeys = getApiKeys()
  const openaiKey = apiKeys.openai
  
  if (!openaiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const prompt = productData 
    ? `צור תסריט שיווקי מקצועי ומשכנע באורך של 60-90 שניות עבור המוצר/שירות הבא:

שם המוצר: ${productData.name}
תיאור: ${productData.description}
מחיר: ${productData.price}₪
תכונות עיקריות: ${productData.features}

הנושא הכללי: ${topic}

התסריט צריך להיות:
- באורך של 60-90 שניות קריאה
- משכנע ומעניין
- מתאים לקהל הישראלי
- כולל קריאה לפעולה ברורה
- מדגיש את היתרונות העיקריים
- בעברית זורמת וטבעית

אנא כתב רק את התסריט ללא הסברים נוספים.`
    : `צור תסריט שיווקי מקצועי ומשכנע באורך של 60-90 שניות עבור הנושא הבא: ${topic}

התסריט צריך להיות:
- באורך של 60-90 שניות קריאה
- משכנע ומעניין
- מתאים לקהל הישראלי
- כולל קריאה לפעולה ברורה
- בעברית זורמת וטבעית

אנא כתב רק את התסריט ללא הסברים נוספים.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || 'שגיאה ביצירת תסריט'
  } catch (error) {
    console.error('Error generating script:', error)
    throw error
  }
}

// Function to generate image description using ChatGPT
async function generateImagePrompt(topic, script, productData = null) {
  const apiKeys = getApiKeys()
  const openaiKey = apiKeys.openai
  
  if (!openaiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const prompt = `בהתבסס על התסריט השיווקי הבא, צור תיאור מפורט באנגלית לתמונה שיווקית מקצועية שתתאים לסרטון:

תסריט: ${script}

נושא: ${topic}
${productData ? `מוצר: ${productData.name} - ${productData.description}` : ''}

התמונה צריכה להיות:
- מקצועית ואיכותית
- מתאימה לשיווק
- מושכת ומעוררת עניין
- מתאימה לקהל הישראלי/עולמי

אנא כתב תיאור באנגלית עבור DALL-E, עד 200 מילים, מפורט ויצירתי.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || 'Professional marketing image'
  } catch (error) {
    console.error('Error generating image prompt:', error)
    throw error
  }
}

// Function to generate image using DALL-E
async function generateImage(imagePrompt) {
  const apiKeys = getApiKeys()
  const openaiKey = apiKeys.openai
  
  if (!openaiKey) {
    throw new Error('OpenAI API key not configured')
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`DALL-E API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    return data.data[0]?.url || null
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { topic, productData } = req.body

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' })
  }

  try {
    console.log('🎬 Starting video generation for:', topic)
    
    // Step 1: Generate script using ChatGPT
    console.log('📝 Generating script...')
    const script = await generateScript(topic, productData)
    
    // Step 2: Generate image prompt
    console.log('🎨 Generating image prompt...')
    const imagePrompt = await generateImagePrompt(topic, script, productData)
    
    // Step 3: Generate image using DALL-E
    console.log('🖼️ Generating image...')
    const imageUrl = await generateImage(imagePrompt)

    const result = {
      success: true,
      videoId: `vid_${Date.now()}`,
      topic: topic,
      productData: productData,
      script: script,
      imagePrompt: imagePrompt,
      imageUrl: imageUrl,
      status: 'completed',
      steps: [
        { step: 'script', status: 'completed', description: 'תסריט נוצר בהצלחה עם ChatGPT' },
        { step: 'image', status: 'completed', description: 'תמונה נוצרה בהצלחה עם DALL-E' },
        { step: 'voice', status: 'pending', description: 'דיבוב - ממתין להגדרת ElevenLabs' },
        { step: 'video', status: 'pending', description: 'עיבוד סרטון - ממתין להגדרת RunwayML' }
      ],
      message: 'תסריט ותמונה נוצרו בהצלחה! עבור לעמוד הניהול להגדיר APIs נוספים למאפיינים מתקדמים.'
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error generating video:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message || 'שגיאה ביצירת הסרטון. נסה שוב מאוחר יותר.',
      details: error.toString()
    })
  }
}
