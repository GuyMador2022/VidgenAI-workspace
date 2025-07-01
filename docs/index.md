# 📚 VidGenAI – Developer Portal Index

Welcome to the VidGenAI Developer Portal. Below you'll find key documentation and API files required to maintain and extend the platform.

---

## 📂 Contents

### ✅ Platform Overview
- [System Architecture Overview](./VidGenAI_Architecture_Overview.md)

### 🧠 API Endpoints
- [Campaign API Documentation](./README.md)

### 🔧 Source Files
- `saveCampaignToCRM.ts` – Save user marketing campaigns to CRM
- `publishCampaign.ts` – Publish social campaigns via API
- `saveSocialTokens.ts` – Securely save Facebook/LinkedIn tokens
- `userCampaignStats.ts` – Report on spend and conversion rate

---

## 📌 Notes
- All files follow RESTful conventions using Next.js API routes
- Be sure to secure tokens and apply validation logic before production
- Designed for integration with Firebase, Stripe, and AI APIs

---

Maintained by: `tech@vidgen.ai`