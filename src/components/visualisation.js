// src/components/Visualization.js
import React, { useState, useEffect } from 'react';
import { CopyButton } from "./copyButton"

const Visualization = ({ visualization, isLoading }) => {
  const [rawMermaid, setRawMermaid] = useState('');
  
  // Extract Mermaid code when visualization prop changes
  useEffect(() => {
    if (!visualization) {
      setRawMermaid('');
      return;
    }
    
    let mermaidCode = '';
    
    // Extract from code block if present
    if (visualization.includes('```mermaid')) {
      const match = visualization.match(/```mermaid([\s\S]*?)```/);
      mermaidCode = match ? match[1].trim() : visualization;
    } else {
      mermaidCode = visualization;
    }
    
    // Clean up any remaining backticks
    mermaidCode = mermaidCode.replace(/```/g, '').trim();
    setRawMermaid(mermaidCode);
  }, [visualization]);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h2 className="font-semibold text-lg text-gray-200 flex items-center space-x-2">
          <span>Flowchart Visualization</span>
        </h2>
        {rawMermaid && <CopyButton text={rawMermaid} />}
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
            <span>Generating visualization...</span>
          </div>
        ) : rawMermaid ? (
          <div className="space-y-4">
            <div className="bg-gray-900 rounded border border-gray-600">
              <pre className="p-3 text-xs overflow-auto max-h-60 text-gray-300 font-mono">{rawMermaid}</pre>
            </div>
            <div className="text-sm text-gray-400 bg-gray-900 p-3 rounded border border-gray-600">
              <p className="mb-2">This is the raw Mermaid code for the flowchart.</p>
              <p>
                You can copy it to{" "}
                <a
                  href="https://mermaid.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Mermaid Live Editor
                </a>{" "}
                to visualize it.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic p-8 text-center bg-gray-900 rounded border border-gray-600">
            <p>No visualization generated yet.</p>
            <p className="text-sm">Submit some code to see the flowchart.</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Visualization;