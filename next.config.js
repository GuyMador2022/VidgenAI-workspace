/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
