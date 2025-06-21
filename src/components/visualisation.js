// src/components/Visualization.js
import React, { useState, useEffect } from 'react';

const Visualization = ({ visualization }) => {
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
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-2">Flowchart Visualization:</h2>
      <div className="bg-white p-4 rounded shadow">
        {rawMermaid ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded">
              <pre className="text-xs overflow-auto max-h-[60vh]">
                {rawMermaid}
              </pre>
            </div>
            <div className="text-sm text-gray-600">
              <p>This is the raw Mermaid code for the flowchart.</p>
              <p>You can copy it to <a 
                href="https://mermaid.live" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >Mermaid Live Editor</a> to visualize it.</p>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic p-4 text-center">
            No Mermaid code generated yet. Submit some code to see the visualization.
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualization;