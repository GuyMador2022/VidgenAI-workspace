// API endpoint for testing API keys
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { platform, apiKey } = req.body

  if (!platform || !apiKey) {
    return res.status(400).json({ error: 'Platform and API key are required' })
  }

  try {
    let testResult = false
    let errorMessage = ''

    switch (platform) {
      case 'openai':
        testResult = await testOpenAI(apiKey)
        break
      case 'elevenlabs':
        testResult = await testElevenLabs(apiKey)
        break
      case 'runway':
        testResult = await testRunway(apiKey)
        break
      case 'stripe':
        testResult = await testStripe(apiKey)
        break
      case 'firebase':
        testResult = await testFirebase(apiKey)
        break
      default:
        // For social media APIs, we'll do basic format validation
        testResult = await testSocialMedia(platform, apiKey)
    }

    if (testResult) {
      res.status(200).json({ 
        success: true, 
        message: `${platform} API key is valid`,
        platform 
      })
    } else {
      res.status(400).json({ 
        error: `${platform} API key is invalid or expired`,
        platform 
      })
    }

  } catch (error) {
    console.error(`❌ Error testing ${platform} API:`, error)
    res.status(500).json({ 
      error: `Failed to test ${platform} API key`,
      details: error.message 
    })
  }
}

// Test functions for each platform
async function testOpenAI(apiKey) {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    return response.ok
  } catch (error) {
    return false
  }
}

async function testElevenLabs(apiKey) {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey
      }
    })
    return response.ok
  } catch (error) {
    return false
  }
}

async function testRunway(apiKey) {
  // Runway API test - this is a placeholder since their API structure may vary
  try {
    // Basic validation - check if key has expected format
    return apiKey && apiKey.length > 10
  } catch (error) {
    return false
  }
}

async function testStripe(apiKey) {
  try {
    const response = await fetch('https://api.stripe.com/v1/account', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    return response.ok
  } catch (error) {
    return false
  }
}

async function testFirebase(projectId) {
  try {
    // Basic validation for Firebase project ID format
    return projectId && /^[a-z0-9-]+$/.test(projectId)
  } catch (error) {
    return false
  }
}

async function testSocialMedia(platform, apiKey) {
  try {
    // Basic format validation for social media tokens
    switch (platform) {
      case 'facebook':
      case 'instagram':
        return apiKey && apiKey.length > 20
      case 'linkedin':
        return apiKey && apiKey.length > 15
      case 'whatsapp':
        return apiKey && apiKey.length > 10
      default:
        return apiKey && apiKey.length > 5
    }
  } catch (error) {
    return false
  }
}
