import axios from "axios";

const GEMINI_API_KEY = process.env.REACT_APP_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const geminiFlashCall = async (prompt) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  } catch (error) {
    const status = error.response?.status;
    if (status === 429) {
      return "⚠️ Rate limit exceeded. Please wait before trying again.";
    }
    console.error("Gemini API error:", error);
    return "⚠️ Error fetching response from Gemini API.";
  }
};