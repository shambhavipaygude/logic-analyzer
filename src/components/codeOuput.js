// src/components/codeOutput.js
import React from "react";
import Visualization from "./visualisation";

export const CodeOutput = ({ code, explanation, visualization }) => {
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
      
      <Visualization visualization={visualization} />
    </div>
  );
};