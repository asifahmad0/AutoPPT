import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);

export async function generateSlideHTML(data={
  designStyle,
  colors,
  metadata
}) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Generate HTML (TailwindCSS + Flowbite UI + Lucide Icons)
for a 16:9 modern dark style.

Design Style:
${data.designStyle}

Colors:
${JSON.stringify(data.colors)}

Metadata:
${JSON.stringify(data.metadata)}

Use images like:
${process.env.IMAGEKIT_URL}/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg

Replace placeholders properly.
Return ONLY body HTML.
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  return text
    .replace(/```html/g, "")
    .replace(/```/g, "")
    .trim();
}
