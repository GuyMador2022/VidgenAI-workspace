import Head from 'next/head'
import { useState } from 'react'

export default function Landing() {
  const [email, setEmail] = useState('')

  const handleGetStarted = () => {
    // Redirect to main app or signup
    window.location.href = '/'
  }

  const handleSignUp = () => {
    console.log('Sign up with email:', email)
    // Handle signup logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <Head>
        <title>VidGenAI - Create Marketing Videos with AI</title>
        <meta name="description" content="Generate scripts, images, voiceovers, and videos with powerful AI tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6">
        <div className="text-white text-2xl font-bold">
          VidGenAI
        </div>
        <div className="space-x-6">
          <button className="text-white hover:text-gray-200 transition duration-200">
            Sign Up
          </button>
          <button className="text-white hover:text-gray-200 transition duration-200">
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 py-16 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Create Marketing Videos
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            with AI
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          Generate scripts, images, voiceovers, and videos with powerful AI tools.
          <br />
          Manage your campaigns, track budget, and analyze performance.
        </p>

        <button 
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-xl text-lg transition duration-300 transform hover:scale-105 shadow-2xl"
        >
          Get Started
        </button>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: 'Generate Script',
              description: 'AI-powered script generation for your marketing videos'
            },
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              title: 'Create Image',
              description: 'Generate stunning visuals with DALL-E and Midjourney'
            },
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              ),
              title: 'Produce Voiceover',
              description: 'Professional voice synthesis with ElevenLabs'
            },
            {
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              ),
              title: 'Generate Video',
              description: 'Combine everything into professional marketing videos'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <div className="text-white mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Everything You Need for Video Marketing
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '🎯 Campaign Management',
                description: 'Organize and manage multiple video campaigns from one dashboard'
              },
              {
                title: '💰 Budget Tracking',
                description: 'Monitor spending and ROI across all your marketing campaigns'
              },
              {
                title: '📊 Performance Analytics',
                description: 'Detailed insights and metrics to optimize your video content'
              },
              {
                title: '🔄 Multi-Platform Publishing',
                description: 'Publish to Facebook, Instagram, LinkedIn, and more'
              },
              {
                title: '🎨 Professional Templates',
                description: 'Pre-designed templates for different industries and use cases'
              },
              {
                title: '⚡ Lightning Fast',
                description: 'Generate complete videos in minutes, not hours'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-8 py-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Marketing?
        </h2>
        <p className="text-xl text-gray-200 mb-8">
          Join thousands of marketers already using VidGenAI
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          />
          <button 
            onClick={handleSignUp}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-8 text-center">
          <p className="text-gray-400">
            © 2025 VidGenAI. Powered by <span className="text-white">Skylens.ai</span>
          </p>
          <div className="mt-4 space-x-6">
            <a href="/" className="text-blue-400 hover:text-blue-300 transition duration-200">
              🏠 Hebrew Version
            </a>
            <a href="/admin" className="text-purple-400 hover:text-purple-300 transition duration-200">
              🔧 Admin Panel
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
