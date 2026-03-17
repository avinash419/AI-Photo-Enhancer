import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Enhances an image using either an external API (like Clipdrop) if a key is provided,
 * or falls back to Gemini 2.5 Flash Image.
 */
export async function enhanceImage(base64Image: string, options: { faceHd: boolean; upscale: boolean; noiseReduction: boolean }) {
  const externalApiKey = process.env.ENHANCER_API_KEY;

  if (externalApiKey) {
    try {
      // Attempting to use a standard external enhancement API (Clipdrop style)
      // We use a proxy-like approach or direct fetch if allowed. 
      // Note: In a real production app, this should be done server-side to hide the key.
      const formData = new FormData();
      const blob = await (await fetch(base64Image)).blob();
      formData.append('image_file', blob);

      const response = await fetch('https://clipdrop-api.co/image-upscaling/v1', {
        method: 'POST',
        headers: {
          'x-api-key': externalApiKey,
        },
        body: formData,
      });

      if (response.ok) {
        const resultBlob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(resultBlob);
        });
      }
      console.warn("External API failed, falling back to Gemini...");
    } catch (e) {
      console.error("External API error:", e);
    }
  }

  // Fallback to Gemini
  const model = "gemini-2.5-flash-image";
  const prompt = `
    Enhance this image. 
    ${options.faceHd ? "Focus on recovering sharp facial details and skin texture." : ""}
    ${options.upscale ? "Increase the resolution and clarity significantly." : ""}
    ${options.noiseReduction ? "Remove digital noise, grain, and compression artifacts." : ""}
    Maintain the original subject, colors, and composition. 
    Return the enhanced image.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/png",
            data: base64Image.split(",")[1] || base64Image,
          },
        },
        { text: prompt },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image returned from AI");
}
