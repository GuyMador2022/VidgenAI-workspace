
// example.js
// Demonstrates full flow using VidGenAI APIs

import { generateScript } from './text/generateScript.js'
import { generateImage } from './image/generateImage.js'
import { generateVoice } from './voice/generateVoice.js'
import { generateVideo } from './video/generateVideo.js'

async function generateMarketingVideo(topic) {
  try {
    console.log('🎬 Starting creative pipeline for:', topic)

    // Step 1: Generate a script
    const script = await generateScript(topic)
    console.log('📝 Script:', script)

    // Step 2: Generate an image
    const imagePrompt = `Create a cinematic visual for: ${topic}`
    const imageUrl = await generateImage(imagePrompt)
    console.log('🖼️ Image URL:', imageUrl)

    // Step 3: Generate voice narration
    const voiceUrl = await generateVoice(script, 'Rachel')
    console.log('🎤 Voice URL:', voiceUrl)

    // Step 4: Combine into a video
    const videoUrl = await generateVideo(imageUrl, voiceUrl, 10)
    console.log('🎞️ Video URL:', videoUrl)

  } catch (error) {
    console.error('🚨 Error in video generation pipeline:', error)
  }
}

generateMarketingVideo("Promoting your next real estate project")
