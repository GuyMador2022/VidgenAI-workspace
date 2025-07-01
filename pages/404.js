import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Head>
        <title>404 - Page Not Found | VidGenAI</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>

      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <div className="text-6xl mb-6">🎬</div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          הדף לא נמצא
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          הדף שחיפשת לא קיים. אולי הוא עדיין בתהליך יצירה או שהקישור שגוי.
        </p>
        
        <div className="space-x-4">
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 inline-block">
            🏠 חזור לבית
          </Link>
          <Link href="/landing" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 inline-block">
            🌍 English Version
          </Link>
        </div>
        
        <div className="mt-12 text-gray-500">
          <p>או בדוק את הקישורים הללו:</p>
          <div className="mt-4 space-x-4">
            <Link href="/admin" className="text-blue-600 hover:underline">
              לוח בקרה אדמין
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
