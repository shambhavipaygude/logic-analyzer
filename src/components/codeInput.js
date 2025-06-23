import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react"

export const CodeInput = ({ initialCode, onSubmit }) => {
  const [input, setInput] = useState(initialCode);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInput(initialCode);
  }, [initialCode]);

return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-3">Enter or modify code:</label>
        <div className="relative">
          <textarea
            className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm font-mono text-sm text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your code here..."
            spellCheck={false}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">{input.length} characters</div>
        </div>
      </div>

      <button
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        onClick={() => onSubmit(input)}
        disabled={isLoading || !input.trim()}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            
            <span>Analyze Code</span>
          </>
        )}
      </button>
    </div>
  )
}
