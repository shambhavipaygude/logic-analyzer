import React from "react";
import { CopyButton } from "./copyButton"

const CodeOptimization = ({ optimization, isLoading }) => {
  if (!optimization && !isLoading) return null;

  // Extract segments using regex
  const optimizedCodeMatch = optimization.match(/optimized code\s*:\s*([\s\S]*?)time complexity of original code:/i);
  const originalTimeMatch = optimization.match(/time complexity of original code:\s*([^\n]*)/i);
  const optimizedTimeMatch = optimization.match(/time complexity of optimized code:\s*([^\n]*)/i);
  const explanationMatch = optimization.match(/explanation:\s*([\s\S]*)/i);

  const optimizedCode = optimizedCodeMatch ? optimizedCodeMatch[1].trim() : "";
  const originalTime = originalTimeMatch ? originalTimeMatch[1].trim() : "";
  const optimizedTime = optimizedTimeMatch ? optimizedTimeMatch[1].trim() : "";
  const explanationText = explanationMatch ? explanationMatch[1].trim() : "";

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h2 className="font-semibold text-lg text-gray-200 flex items-center space-x-2">
          <span>Optimization</span>
        </h2>
        {optimizedCode && <CopyButton text={optimizedCode} />}
      </div>
      <div className="p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
            <span>Optimizing code...</span>
          </div>
        ) : (
          <>
            {optimizedCode && (
              <div>
                <h3 className="font-medium text-gray-300 mb-2">Optimized Code:</h3>
                <div className="bg-gray-900 rounded border border-gray-600">
                  <pre className="p-3 overflow-auto max-h-48 text-sm">
                    <code className="text-gray-300 font-mono">{optimizedCode}</code>
                  </pre>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {originalTime && (
                <div className="bg-gray-900 p-3 rounded border border-gray-600">
                  <div className="text-xs text-gray-400 mb-1">Original Complexity</div>
                  <div className="text-red-400 font-mono">{originalTime}</div>
                </div>
              )}
              {optimizedTime && (
                <div className="bg-gray-900 p-3 rounded border border-gray-600">
                  <div className="text-xs text-gray-400 mb-1">Optimized Complexity</div>
                  <div className="text-green-400 font-mono">{optimizedTime}</div>
                </div>
              )}
            </div>

            {explanationText && (
              <div>
                <h3 className="font-medium text-gray-300 mb-2">Explanation:</h3>
                <div className="text-gray-400 text-sm leading-relaxed bg-gray-900 p-3 rounded border border-gray-600">
                  {explanationText}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default CodeOptimization;