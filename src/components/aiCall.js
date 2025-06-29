import { geminiFlashCall } from "./gemini";

export const generateSampleCode = async () => {
  const topics = [
    "array operations", "string processing", "game logic",
    "data structures and algorithms", "math utilities", "bitwise hacks", "random number generation", "sorting tricks",
     "number theory", "geometry", "text encoding", "pattern generation"
  ];
  
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const randomSeed = Math.floor(Math.random() * 100000); // adds uniqueness to avoid repetition

  const prompt = `
  Generate a new and unique function related to "${randomTopic}". 
  The function must be useful.
  Do not repeat previously generated functions. Seed: ${randomSeed}.
  Only return the raw code with no markdown formatting, no comments, and no explanation.
  Do not wrap it in code blocks.
  `;

  const response = await geminiFlashCall(prompt.trim());
  return response;
};


export const explainCode = async (code) => {
  const prompt = `You are a helpful programming teacher for beginners.

Explain the following code step-by-step in easy and concise points. Use bullet points (•), each on a new line. Focus on what each part does. Do not include any introductory or closing statements—just the explanation bullets.

Code:
\n\n${code}`;
  const response = await geminiFlashCall(prompt);

  // Normalize and convert to HTML list
  const items = response
    .split("•")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, idx) => ({ __html: `<li>${line}</li>` }))  // formatted for innerHTML
    .map((obj) => obj.__html) // extract raw HTML strings
    .join("");

  return `<ul>${items}</ul>`;

};

export const optimizeCode= async(code)=>{
  const prompt = `You will be given a code snippet.
Your task is to:

1. Optimize the code to improve performance without changing its functionality.
2. Identify and state the time complexity of the original code.
3. Identify and state the time complexity of the optimized code.

⚠️ IMPORTANT: Do NOT wrap your response in markdown formatting like triple backticks or "python". Just give the raw code and text.

Format your response exactly as follows (no extra text):

optimized code :
<optimized code here>
time complexity of original code:
<original time complexity>
time complexity of optimized code:
<optimized time complexity>
explanation:
<brief explanation here>

Code:

${code}`;
return await geminiFlashCall(prompt);
}