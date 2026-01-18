const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",          // local dev
    "https://autoppt.vercel.app"      // vercel frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());



//------------------------------------------------------------------------Generate PPT----------------------------------------------

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate-presentation", async (req, res) => {
  try {
    const { designStyle, colors, outline, userPrompt } = req.body;

    if (!outline || !outline.length) {
      return res.status(400).json({ error: "Outline missing" });
    }

    const model = ai.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
// Generte image if needed using:
// 'https://ik.imagekit.io/m5tbjdhwo/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg'
    const prompt = `
You are a professional presentation + web designer.

Generate a presentation with EXACTLY ${outline.length} slides.
mack sure ppt size max-width=1200px and max-height=600px

Generate pure HTML with inline CSS only.
Do NOT use:
- Flowbite
- Swiper
- AOS
- External CSS
- External fonts

Rules:
- Output ONLY valid JSON
- Each slide must contain:
  - id
  - title
  - html (TailwindCSS + Flowbite)
- Do NOT include <html>, <head>, <body>
- Use 16:9 layout
- All slides same width & height
- Modern dark/light UI
- Consistent width & height for ALL slides
- Return ONLY valid JSON
- width = 1200px
- height = 600px 


Design style:
${designStyle}

Colors:
${JSON.stringify(colors)}

Slide outline:
${JSON.stringify(outline)}

JSON FORMAT:
{
  "slides": [
    {
      "id": 1,
      "title": "Slide title",
      "html": "<section>...</section>"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    function extractJSON(text) {
      const first = text.indexOf("{");
      const last = text.lastIndexOf("}");
      if (first === -1 || last === -1) {
        throw new Error("No JSON found in AI response");
      }
      return text.substring(first, last + 1);
    }

    const raw = result.response.text();
    const jsonString = extractJSON(raw);

    let json;
    try {
      json = JSON.parse(jsonString);
    } catch (e) {
      console.error("Invalid JSON from AI:", jsonString);
      throw e;
    }
    extractJSON(text);

    res.json(json);
  } catch (err) {
    console.error("Generation failed:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});






app.get("/", (_, res) => res.send("Backend running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
