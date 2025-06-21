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

export const visualizeCode = async (code) => {
  const prompt = `Generate a high-level flowchart for the following JavaScript code using Mermaid syntax.

Only return valid Mermaid code inside a \`\`\`mermaid code block. Do not add any explanation, introduction, or comments. The output must start and end with the \`\`\`mermaid code block and contain only Mermaid-compatible content.

Code:\n\n${code}`;
  return await geminiFlashCall(prompt);
};
