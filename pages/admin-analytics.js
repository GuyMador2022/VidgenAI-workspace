import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminAnalyticsRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to admin with analytics tab after 3 seconds
    const timer = setTimeout(() => {
      router.push('/admin?tab=analytics')
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <Head>
        <title>מפנה לאנליטיקה - VidGenAI</title>
        <meta name="description" content="מפנה לדף האנליטיקה החדש" />
      </Head>
      
      <div className="text-center max-w-md mx-auto p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🔄 מעביר לאנליטיקה החדשה
        </h1>
        
        <p className="text-gray-600 mb-6">
          דף האנליטיקה עבר לתוך ממשק האדמין הראשי.<br/>
          מעביר אותך אוטומטית...
        </p>
        
        <div className="space-y-3">
          <Link 
            href="/admin?tab=analytics"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            📊 עבור לאנליטיקה עכשיו
          </Link>
          
          <Link 
            href="/admin"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
          >
            🏠 חזור לאדמין
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          דף זה ימחק בעדכון הבא
        </p>
      </div>
    </div>
  )
}

