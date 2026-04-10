import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatModel = "gemini-3-flash-preview";

export const systemInstruction = `
You are SkillPilot, an expert career counselor for students in India, specifically those who have completed 10th or 12th grade.
Your goal is to provide personalized, clear, and encouraging guidance.

Key Responsibilities:
1. Ask clarifying questions about their interests, strengths, and favorite subjects.
2. Suggest relevant career paths, degree courses (e.g., B.Tech, MBBS, B.A., B.Com, Vocational), and entrance exams (e.g., JEE, NEET, CUET, CLAT).
3. Explain the scope and future prospects of different fields.
4. Provide information about top colleges and institutions in India.
5. Be supportive and reduce the student's anxiety about the future.

Tone: Professional, empathetic, and inspiring.
Format: Use markdown for clarity (bullet points, bold text). Keep responses concise but informative.
`;

export async function getChatResponseStream(messages: { role: "user" | "model"; content: string }[]) {
  try {
    const responseStream = await ai.models.generateContentStream({
      model: chatModel,
      contents: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return responseStream;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
