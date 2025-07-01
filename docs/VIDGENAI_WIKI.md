
# VidGenAI Developer Wiki

Welcome to the **VidGenAI** Developer Guide. This project allows developers to generate marketing videos automatically using AI services for script writing, image generation, voice synthesis, and video rendering.

---

## 🔧 Installation

```bash
git clone https://github.com/your-org/VidGenAI_Creative_API.git
cd VidGenAI_Creative_API
npm install
```

---

## 🔑 Environment Variables

Make sure to define the following API keys in your environment:

| API        | Variable Name           |
|------------|-------------------------|
| OpenAI     | `OPENAI_API_KEY`        |
| ElevenLabs | `ELEVENLABS_API_KEY`    |
| RunwayML   | `RUNWAY_API_KEY`        |

Set them in `.env` or your terminal session:
```bash
export OPENAI_API_KEY=your_openai_key
export ELEVENLABS_API_KEY=your_elevenlabs_key
export RUNWAY_API_KEY=your_runwayml_key
```

---

## 📚 Modules Overview

### `generateScript(topic, tone)`
Generates a short marketing script using GPT-4.
```js
const script = await generateScript("Luxury Real Estate", "energetic")
```

### `generateImage(prompt)`
Creates a high-quality image using OpenAI's DALL·E.
```js
const image = await generateImage("Isometric modern city with tall buildings")
```

### `generateVoice(scriptText, voiceId)`
Converts a script into voice using ElevenLabs.
```js
const audio = await generateVoice(script, "Rachel")
```

### `generateVideo(imageUrl, audioUrl, duration)`
Combines image and audio into a short video using RunwayML.
```js
const video = await generateVideo(imageUrl, audioUrl, 10)
```

---

## 🚀 Full Example

See [`example.js`](./example.js) to run a complete video generation pipeline.

---

## 🧪 Roadmap Ideas

- Subtitle & caption generation (via Whisper API)
- Multi-language voice support
- Custom video layout templates
- Integration with social sharing APIs (YouTube, LinkedIn)

---

## 👥 Contributors

Feel free to fork, clone, or contribute to this project on GitHub.

Made with ❤️ by [VidGenAI Team](https://vidgenai.com)
