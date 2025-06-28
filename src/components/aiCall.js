import { geminiFlashCall } from "./gemini";

export const generateSampleCode = async () => {
  const prompt = "Generate a function as code snippet less than 10 lines. Only return the raw code with no markdown formatting, no comments, and no explanation. Do not wrap the code inside a code block or include anything else..";
  const response = await geminiFlashCall(prompt);
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

4. Provide a brief 3-4 line explanation of the key differences that led to the improvement.

Format your response exactly as follows (no extra text):

optimized code :
<optimized code here>
time complexity of original code:
<original time complexity>
time complexity of optimized code:
<optimized time complexity>
explanation:
<brief explanation here>
Do not include any additional commentary or greetings.
Code:
\n\n${code}`
return await geminiFlashCall(prompt);
}