// API endpoint for getting campaign statistics
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // In a real app, this would fetch from database
    const campaigns = [
      {
        id: 1,
        name: 'קמפיין נדל״ן - פרויקט המרכז',
        status: 'active',
        spent: 2500,
        revenue: 15000,
        roi: 600,
        impressions: 125000,
        clicks: 3200,
        conversions: 45,
        platform: ['facebook', 'instagram'],
        createdAt: '2025-06-20',
        videoUrl: 'https://example.com/video1.mp4',
        dailyStats: [
          { date: '2025-06-20', spent: 100, revenue: 600, impressions: 5000 },
          { date: '2025-06-21', spent: 150, revenue: 900, impressions: 7500 },
          { date: '2025-06-22', spent: 120, revenue: 720, impressions: 6000 },
          { date: '2025-06-23', spent: 200, revenue: 1200, impressions: 10000 },
          { date: '2025-06-24', spent: 180, revenue: 1080, impressions: 9000 },
          { date: '2025-06-25', spent: 220, revenue: 1320, impressions: 11000 },
          { date: '2025-06-26', spent: 160, revenue: 960, impressions: 8000 }
        ]
      },
      {
        id: 2,
        name: 'קמפיין מוצרי יופי - השקת מותג',
        status: 'active',
        spent: 1800,
        revenue: 8500,
        roi: 472,
        impressions: 85000,
        clicks: 2100,
        conversions: 28,
        platform: ['instagram', 'tiktok'],
        createdAt: '2025-06-15',
        videoUrl: 'https://example.com/video2.mp4',
        dailyStats: [
          { date: '2025-06-15', spent: 80, revenue: 380, impressions: 3500 },
          { date: '2025-06-16', spent: 120, revenue: 570, impressions: 5000 },
          { date: '2025-06-17', spent: 100, revenue: 470, impressions: 4200 },
          { date: '2025-06-18', spent: 150, revenue: 710, impressions: 6300 },
          { date: '2025-06-19', spent: 140, revenue: 660, impressions: 5800 },
          { date: '2025-06-20', spent: 110, revenue: 520, impressions: 4600 },
          { date: '2025-06-21', spent: 90, revenue: 430, impressions: 3800 }
        ]
      },
      {
        id: 3,
        name: 'קמפיין שירותים משפטיים',
        status: 'completed',
        spent: 3200,
        revenue: 22000,
        roi: 687,
        impressions: 156000,
        clicks: 4800,
        conversions: 67,
        platform: ['linkedin', 'facebook'],
        createdAt: '2025-06-01',
        videoUrl: 'https://example.com/video3.mp4',
        dailyStats: [
          { date: '2025-06-01', spent: 200, revenue: 1400, impressions: 8000 },
          { date: '2025-06-02', spent: 250, revenue: 1750, impressions: 10000 },
          { date: '2025-06-03', spent: 180, revenue: 1260, impressions: 7200 },
          { date: '2025-06-04', spent: 300, revenue: 2100, impressions: 12000 },
          { date: '2025-06-05', spent: 220, revenue: 1540, impressions: 8800 },
          { date: '2025-06-06', spent: 280, revenue: 1960, impressions: 11200 },
          { date: '2025-06-07', spent: 160, revenue: 1120, impressions: 6400 }
        ]
      },
      {
        id: 4,
        name: 'קמפיין מסעדה - תפריט חדש',
        status: 'paused',
        spent: 950,
        revenue: 3200,
        roi: 337,
        impressions: 42000,
        clicks: 890,
        conversions: 12,
        platform: ['facebook', 'instagram'],
        createdAt: '2025-06-10',
        videoUrl: 'https://example.com/video4.mp4',
        dailyStats: [
          { date: '2025-06-10', spent: 60, revenue: 200, impressions: 2500 },
          { date: '2025-06-11', spent: 80, revenue: 270, impressions: 3200 },
          { date: '2025-06-12', spent: 70, revenue: 240, impressions: 2800 },
          { date: '2025-06-13', spent: 90, revenue: 300, impressions: 3600 },
          { date: '2025-06-14', spent: 85, revenue: 280, impressions: 3400 },
          { date: '2025-06-15', spent: 75, revenue: 250, impressions: 3000 },
          { date: '2025-06-16', spent: 65, revenue: 220, impressions: 2600 }
        ]
      }
    ]

    // Calculate aggregate statistics
    const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0)
    const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
    const totalROI = totalRevenue > 0 ? ((totalRevenue - totalSpent) / totalSpent * 100) : 0
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length
    const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0)
    const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)
    const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)

    // Find best and worst performing campaigns
    const bestCampaign = campaigns.reduce((best, current) => 
      current.roi > best.roi ? current : best
    )
    
    const worstCampaign = campaigns.reduce((worst, current) => 
      current.roi < worst.roi ? current : worst
    )

    const stats = {
      totalSpent,
      totalRevenue,
      totalROI: Math.round(totalROI * 10) / 10,
      activeCampaigns,
      totalImpressions,
      totalClicks,
      totalConversions,
      bestCampaign: {
        name: bestCampaign.name,
        roi: bestCampaign.roi,
        revenue: bestCampaign.revenue
      },
      worstCampaign: {
        name: worstCampaign.name,
        roi: worstCampaign.roi,
        status: worstCampaign.status
      }
    }

    res.status(200).json({
      success: true,
      campaigns,
      stats,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error fetching campaign stats:', error)
    res.status(500).json({ 
      error: 'Failed to fetch campaign statistics',
      details: error.message 
    })
  }
}
