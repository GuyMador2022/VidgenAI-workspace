# 🏗️ VidGenAI – System Architecture Overview

This document provides a high-level architectural overview of the VidGenAI platform, for developers responsible for maintenance and expansion.

---

## 🧩 System Summary

VidGenAI is a platform that allows users to generate AI-powered marketing videos, landing pages, and social campaigns in Hebrew, using credit-based access and a modern web interface.

---

## ⚙️ Tech Stack

- **Frontend:** React (Next.js 14), TailwindCSS, TypeScript
- **Backend:** Next.js API routes
- **Database/Storage:** Firebase (Auth, Firestore, Cloud Functions), local JSON (dev only)
- **Payments:** Stripe (via embedded UI + webhook)
- **AI Services:** Connected via API:
  - Text generation (e.g., OpenAI, Cohere)
  - Image generation (e.g., Stability AI, Midjourney Proxy)
  - Video synthesis (e.g., D-ID, RunwayML)
  - Voice narration (e.g., Play.ht, ElevenLabs)

---

## 🔑 Key Components

### 1. `Dashboard.jsx`
- Displays user’s active projects, credit usage, and video generation history

### 2. `CampaignBuilder.jsx`
- Builds CTA, headline, captions, and sends to social campaign APIs
- Integrated with CRM + publishing flow

### 3. `BudgetConversionPanel.jsx`
- Shows user performance: investment vs. conversions
- Uses `/api/userCampaignStats`

### 4. `SocialAPITokensSettings.jsx`
- Users can paste their Facebook/LinkedIn tokens
- Saved securely via `/api/saveSocialTokens`

---

## 🔐 Authentication & Billing

- Users authenticate via **Firebase Auth**
- Projects and usage stored in **Firestore**
- Monthly plans and per-credit billing via **Stripe**
- Admin sees Stripe usage via Stripe dashboard

---

## 🌐 API Folder (`/api/`)

Handles backend logic:
- Saving campaigns to CRM
- Publishing campaigns to Facebook / LinkedIn
- Saving social tokens
- Returning user campaign statistics

See: `VidGenAI_Campaign_API/README.md`

---

## 🔄 Deployment

Recommended via:
- **Vercel** (preferred)
- **Firebase Hosting** (if using full Firebase backend)

---

## 🧠 Dev Notes

- Use `.env.local` for sensitive API keys
- Create logs for all outgoing API interactions
- Add server-side validation to avoid abuse

---

Need help? Email `tech@vidgen.ai`