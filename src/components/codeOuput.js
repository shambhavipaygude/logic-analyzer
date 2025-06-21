import React from "react";
import pako from "pako";

export const CodeOutput = ({ code, explanation, visualization }) => {
  const extractMermaidCode = (text) => {
    const match = text.match(/```mermaid[\s\S]*?```/);
    if (!match) return null;
    return match[0]
      .replace(/```mermaid/, "")
      .replace(/```/, "")
      .trim();
  };

  
  const getMermaidImageUrl = (code) => {
  const compressed = pako.deflate(code, { level: 9 });
  const binaryString = Array.from(compressed, (b) => String.fromCharCode(b)).join("");
  const base64 = btoa(binaryString).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `https://mermaid.ink/img/pako:${base64}`;
};


  const mermaidCode = extractMermaidCode(visualization);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg mb-2">Code:</h2>
        <pre className="bg-gray-100 p-4 rounded shadow relative overflow-auto">
          <code>{code}</code>
          <button
            className="absolute top-3 right-3 bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            Copy
          </button>
        </pre>
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2">Explanation:</h2>
        <div
          className="bg-white p-4 rounded shadow text-sm"
          dangerouslySetInnerHTML={{ __html: explanation }}
        />
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2">Visualization:</h2>
        <div className="bg-white p-4 rounded shadow text-sm">
          {mermaidCode ? (
            <img
              src={getMermaidImageUrl(mermaidCode)}
              alt="Mermaid Diagram"
              className="w-full rounded border"
            />
          ) : (
            <p className="text-red-600">Unable to generate Mermaid diagram.</p>
          )}
        </div>
      </div>
    </div>
  );
};