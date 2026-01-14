const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());



//-----------------------------------------------------------------------generating slide first time
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate-presentation", async (req, res) => {
  try {
    const { designStyle, colors, outline } = req.body;

    if (!outline || !outline.length) {
      return res.status(400).json({ error: "Outline missing" });
    }

    const model = ai.getGenerativeModel({
      model: "gemini-3-flash-preview", // ✅ STABLE
    });

    const prompt = `
You are a professional presentation + web designer.

Generate a presentation with EXACTLY ${outline.length} slides.

Rules:
- Output ONLY valid JSON
- Each slide must contain:
  - id
  - title
  - html (TailwindCSS + Flowbite)
- Do NOT include <html>, <head>, <body>
- Use 16:9 layout
- All slides same width & height
- Modern dark UI

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

    const clean = text.replace(/```json|```/g, "").trim();
    const json = JSON.parse(clean);

    res.json(json);
  } catch (err) {
    console.error("Generation failed:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});


//-------------------------------------------------------------------------------------- regenrate new selected slide---------------
app.post("/regenerate-slide", async (req, res) => {
  const { slideHtml, metadata, colors, designStyle } = req.body;

  const prompt = `
You are editing ONE slide of a presentation.

Existing HTML:
${slideHtml}

Slide metadata:
${JSON.stringify(metadata)}

Instructions:
- Improve layout & visuals
- Keep same structure
- 16:9 layout
- Return ONLY HTML body
`;

  const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" });
  const result = await model.generateContent(prompt);

  res.json({ html: result.response.text() });
})




app.get("/", (_, res) => res.send("Backend running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
