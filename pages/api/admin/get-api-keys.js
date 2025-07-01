// API endpoint for getting saved API keys
import fs from 'fs'
import path from 'path'

const API_KEYS_FILE = path.join(process.cwd(), 'config', 'api-keys.json')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check if file exists
    if (!fs.existsSync(API_KEYS_FILE)) {
      return res.status(200).json({ 
        apiKeys: {},
        message: 'No API keys found'
      })
    }

    // Read and parse the file
    const fileContent = fs.readFileSync(API_KEYS_FILE, 'utf8')
    const data = JSON.parse(fileContent)

    // Mask sensitive information (show only first and last 4 characters)
    const maskedKeys = {}
    if (data.apiKeys) {
      for (const [key, value] of Object.entries(data.apiKeys)) {
        if (value && value.length > 8) {
          maskedKeys[key] = value.substring(0, 4) + '...' + value.substring(value.length - 4)
        } else if (value) {
          maskedKeys[key] = '***'
        } else {
          maskedKeys[key] = ''
        }
      }
    }

    res.status(200).json({
      apiKeys: data.apiKeys || {}, // Return full keys for editing
      maskedKeys: maskedKeys,
      lastUpdated: data.lastUpdated,
      updatedBy: data.updatedBy
    })

  } catch (error) {
    console.error('❌ Error loading API keys:', error)
    res.status(500).json({ 
      error: 'Failed to load API keys',
      details: error.message 
    })
  }
}
