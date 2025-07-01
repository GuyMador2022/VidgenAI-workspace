import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function TestCampaign() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Head>
        <title>Test Campaign Page</title>
      </Head>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          🎯 דף יצירת קמפיין - מבחן
        </h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="text-green-800">✅ העמוד נטען בהצלחה!</p>
          </div>
          
          <div className="p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800">
              📍 כתובת נוכחית: <code>/test-campaign</code>
            </p>
          </div>
          
          <div className="p-4 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800">
              🔗 קישורים לבדיקה:
            </p>
            <div className="mt-2 space-y-2">
              <Link href="/create-campaign" className="block text-blue-600 hover:underline">
                → דף יצירת קמפיין מלא
              </Link>
              <Link href="/" className="block text-blue-600 hover:underline">
                → חזרה לדשבורד
              </Link>
            </div>
          </div>
          
          <div className="p-4 bg-purple-100 rounded-lg">
            <p className="text-purple-800">
              🕒 זמן נוכחי: {new Date().toLocaleString('he-IL')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

