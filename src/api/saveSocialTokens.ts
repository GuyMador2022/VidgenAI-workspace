// 📁 File: /api/saveSocialTokens.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const TOKENS_PATH = path.resolve('./data/social_tokens.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { facebookToken, linkedinToken } = req.body

    const data = {
      facebookToken,
      linkedinToken,
      updatedAt: new Date().toISOString()
    }

    fs.mkdirSync(path.dirname(TOKENS_PATH), { recursive: true })
    fs.writeFileSync(TOKENS_PATH, JSON.stringify(data, null, 2))
    return res.status(200).json({ success: true, message: 'Tokens saved.' })
  }

  res.status(405).end()
}