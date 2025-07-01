# 🎬 VidGenAI – AI-Powered Marketing Video Generator

VidGenAI is an all-in-one platform that empowers users to create complete marketing videos in Hebrew using cutting-edge AI tools – without needing any editing experience.

## 🚀 What It Does

VidGenAI enables you to:
- ✍️ Generate engaging scripts with GPT-4
- 🎨 Create high-quality visuals with DALL·E or Stable Diffusion
- 🗣️ Produce lifelike voiceovers with ElevenLabs
- 🎞️ Render videos automatically using RunwayML
- 📢 Manage multichannel campaigns for Facebook, Instagram, and LinkedIn
- 📈 Track ad performance, ROI, and CRM activity
- 🔄 Share planning stages via WhatsApp + survey
- 🧠 Analyze competitors’ posts for strategic guidance

## 🧱 Architecture

The project includes two main modules:
- **Creative API** – handles content generation (scripts, images, audio, video)
- **Campaign API** – manages users, credits, billing, campaign funnels, and analytics

Additional integrations:
- Firebase (auth, storage, Firestore)
- Stripe (subscription billing)
- Power BI (user dashboards)
- WhatsApp API (sharing)
- Social APIs (Meta, LinkedIn)

## 💼 Business Model

VidGenAI is designed for a SaaS subscription model:
- Monthly plan includes usage credits
- Admin dashboard to manage API costs, usage, and customer performance

## 📁 Folder Structure

```
/
├── campaign/         # Campaign logic, funnels, analytics
├── creative/         # Media generation logic
├── public/           # UI assets
├── firebase/         # Functions, auth & Firestore rules
├── stripe/           # Billing logic & webhook handling
├── docs/             # Business & technical documentation
└── README.md         # You are here :)
```

## 🔐 Environment Variables

Define the following keys in your `.env.local`:

```
OPENAI_API_KEY=
ELEVENLABS_API_KEY=
RUNWAY_API_KEY=
FIREBASE_PROJECT_ID=
STRIPE_SECRET_KEY=
WHATSAPP_API_KEY=
```

## 🛠️ Getting Started

```bash
git clone https://github.com/your-org/VidGenAI.git
cd VidGenAI
npm install
npm run dev
```

## 📊 Demo

Want to try it out? Contact us for demo access and white-label licensing opportunities.

---

Made with ❤️ by [Skylens.ai](https://skylens.ai) | © 2025 VidGenAI
