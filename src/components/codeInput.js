import React, { useState, useEffect } from "react";

export const CodeInput = ({ initialCode, onSubmit }) => {
  const [input, setInput] = useState(initialCode);

  useEffect(() => {
    setInput(initialCode);
  }, [initialCode]);

  return (
    <div className="mb-6">
      <label className="block font-medium mb-2">Enter or modify code:</label>
      <textarea
        className="w-full h-40 p-3 border rounded shadow-sm font-mono"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="mt-3 px-5 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700" onClick={() => onSubmit(input)}>
        Explain Code
      </button>
    </div>
  );
};