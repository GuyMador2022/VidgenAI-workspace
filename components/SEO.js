import Head from 'next/head'

// SEO Component for easy meta tags management
export const SEOHead = ({ 
  title, 
  description, 
  canonical, 
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  noindex = false,
  structuredData = null 
}) => {
  const fullTitle = title ? `${title} | VidGenAI` : 'VidGenAI - צור סרטוני שיווק עם בינה מלאכותית'
  const siteUrl = 'https://vidgenai.com'
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="VidGenAI" />
      <meta property="og:locale" content="he_IL" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@vidgenai" />
      
      {/* Additional Meta */}
      <meta name="author" content="VidGenAI Team" />
      <meta name="generator" content="Next.js" />
      <meta name="theme-color" content="#3b82f6" />
      
      {/* Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="he" href={`${siteUrl}/landing-he`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/landing`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}

// Breadcrumb Component
export const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg className="w-6 h-6 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {item.url ? (
              <a href={item.url} className="text-blue-600 hover:text-blue-800">
                {item.name}
              </a>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Schema.org Structured Data Hook
export const useStructuredData = (data) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default SEOHead
