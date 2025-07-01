/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://vidgenai.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/admin*',
    '/admin-analytics',
    '/admin-users',
    '/userdashboard',
    '/analytics',
    '/checkout',
    '/test-campaign'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin-analytics', 
          '/admin-users',
          '/userdashboard',
          '/analytics',
          '/checkout'
        ],
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
    ],
    additionalSitemaps: [
      'https://vidgenai.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    const customConfig = {
      loc: path,
      lastmod: new Date().toISOString(),
    }

    // Set priorities and change frequencies
    if (path === '/') {
      customConfig.priority = 1.0
      customConfig.changefreq = 'daily'
    } else if (path.includes('/pricing')) {
      customConfig.priority = 0.9
      customConfig.changefreq = 'weekly'
    } else if (path.includes('/landing')) {
      customConfig.priority = 0.9
      customConfig.changefreq = 'weekly'
    } else if (path.includes('/auth') || path.includes('/signup')) {
      customConfig.priority = 0.8
      customConfig.changefreq = 'monthly'
    } else if (path.includes('/create-campaign')) {
      customConfig.priority = 0.8
      customConfig.changefreq = 'weekly'
    } else if (path.includes('/faq')) {
      customConfig.priority = 0.7
      customConfig.changefreq = 'monthly'
    } else if (path.includes('/products')) {
      customConfig.priority = 0.7
      customConfig.changefreq = 'weekly'
    } else if (path.includes('/terms') || path.includes('/privacy')) {
      customConfig.priority = 0.4
      customConfig.changefreq = 'yearly'
    } else {
      customConfig.priority = 0.5
      customConfig.changefreq = 'monthly'
    }

    return customConfig
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/landing-he'),
    await config.transform(config, '/landing'),
    await config.transform(config, '/pricing'),
    await config.transform(config, '/faq'),
    await config.transform(config, '/auth'),
    await config.transform(config, '/signup'),
    await config.transform(config, '/create-campaign'),
    await config.transform(config, '/products'),
    await config.transform(config, '/terms'),
    await config.transform(config, '/privacy'),
  ]
}
