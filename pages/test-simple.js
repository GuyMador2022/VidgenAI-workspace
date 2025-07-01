import Head from 'next/head'
import Link from 'next/link'

export default function TestSimple() {
  return (
    <>
      <Head>
        <title>Test Simple Page</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Test Simple Page</h1>
          <p className="text-center">This is a simple test page to verify basic functionality.</p>
          <div className="mt-8 text-center">
            <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
