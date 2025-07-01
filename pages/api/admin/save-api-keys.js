// API endpoint for saving API keys
import fs from 'fs'
import path from 'path'

const API_KEYS_FILE = path.join(process.cwd(), 'config', 'api-keys.json')

// Ensure config directory exists
const configDir = path.join(process.cwd(), 'config')
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { apiKeys } = req.body

    if (!apiKeys || typeof apiKeys !== 'object') {
      return res.status(400).json({ error: 'Invalid API keys data' })
    }

    // Basic validation
    const validKeys = [
      'openai', 'elevenlabs', 'runway', 'firebase', 
      'stripe', 'whatsapp', 'facebook', 'linkedin', 'instagram'
    ]

    const filteredKeys = {}
    for (const key of validKeys) {
      if (apiKeys[key]) {
        filteredKeys[key] = apiKeys[key]
      }
    }

    // Save to file with timestamp
    const dataToSave = {
      apiKeys: filteredKeys,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    }

    fs.writeFileSync(API_KEYS_FILE, JSON.stringify(dataToSave, null, 2))

    // Also update environment variables in memory (for current session)
    if (filteredKeys.openai) process.env.OPENAI_API_KEY = filteredKeys.openai
    if (filteredKeys.elevenlabs) process.env.ELEVENLABS_API_KEY = filteredKeys.elevenlabs
    if (filteredKeys.runway) process.env.RUNWAY_API_KEY = filteredKeys.runway
    if (filteredKeys.firebase) process.env.FIREBASE_PROJECT_ID = filteredKeys.firebase
    if (filteredKeys.stripe) process.env.STRIPE_SECRET_KEY = filteredKeys.stripe
    if (filteredKeys.whatsapp) process.env.WHATSAPP_API_KEY = filteredKeys.whatsapp

    console.log('✅ API Keys saved successfully:', Object.keys(filteredKeys))

    res.status(200).json({ 
      success: true, 
      message: 'API keys saved successfully',
      savedKeys: Object.keys(filteredKeys)
    })

  } catch (error) {
    console.error('❌ Error saving API keys:', error)
    res.status(500).json({ 
      error: 'Failed to save API keys',
      details: error.message 
    })
  }
}
