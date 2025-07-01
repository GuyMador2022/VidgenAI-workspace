// 📁 File: /api/userCampaignStats.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const mockStats = {
  budgetSpent: 480.00,
  conversions: 24
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    console.log(`Fetching stats for user: ${userId}`);
    return res.status(200).json(mockStats);
  }

  res.status(405).end();
}