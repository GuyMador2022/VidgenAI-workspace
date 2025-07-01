// 📁 File: /api/saveCampaignToCRM.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Saving to CRM:', req.body)
    // Simulate saving to CRM
    return res.status(200).json({ success: true, message: 'Saved to CRM' })
  }
  res.status(405).end()
}