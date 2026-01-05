import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate-slide", async (req, res) => {
  const { designStyle, colors, metadata } = req.body;

  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Generate HTML (TailwindCSS + Flowbite UI + Lucide Icons)
for a 16:9 modern dark style: ${designStyle}.
Use Tailwind colors: ${JSON.stringify(colors)}.
Metadata: ${JSON.stringify(metadata)}

Use image URLs like:
${process.env.IMAGEKIT_URL}/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg

Return only the HTML body content.
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```html/g, "").replace(/```/g, "").trim();
    res.json({ html: text });
  } catch (e) {
    console.error("AI generation failed", e);
    res.status(500).json({ error: "AI generation failed" });
  }
});

// health-check
app.get("/", (req, res) => res.send("Backend is running"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
