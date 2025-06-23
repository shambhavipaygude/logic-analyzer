// src/components/codeOutput.js
import React from "react";
import Visualization from "./visualisation";
import CodeOptimization from "./optimization";
import { CopyButton } from "./copyButton"

export const CodeOutput = ({ code, explanation, visualization, optimization, isLoading }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Code Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h2 className="font-semibold text-lg text-gray-200 flex items-center space-x-2">

              <span>Source Code</span>
            </h2>
            <CopyButton text={code} />
          </div>
          <div className="relative">
            <pre className="p-4 overflow-auto max-h-60 text-sm">
              <code className="text-gray-300 font-mono">{code}</code>
            </pre>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h2 className="font-semibold text-lg text-gray-200 flex items-center space-x-2">
              <span>Explanation</span>
            </h2>
            <CopyButton text={explanation} />
          </div>
          <div className="p-4 max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span>Generating explanation...</span>
              </div>
            ) : (
              <div
                className="text-gray-300 text-sm leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: explanation }}
              />
            )}
          </div>
        </div>

        <CodeOptimization optimization={optimization} isLoading={isLoading} />
        <Visualization visualization={visualization} isLoading={isLoading} />
      </div>
    </div>
  )
}
