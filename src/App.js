import React, { useEffect, useState } from "react";
import { CodeInput } from "./components/codeInput";
import { CodeOutput } from "./components/codeOuput";
import { generateSampleCode, explainCode, visualizeCode, optimizeCode } from "./components/aiCall";

function App() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [optimization, setOptimization] = useState("");
  const [visualization, setVisualization] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // ?generateSampleCode().then(setCode);
  }, []);

  const handleExplain = async (userCode) => {
    setIsLoading(true)
    setCode(userCode)
    try {
      const [exp, opt, viz] = await Promise.all([
        explainCode(userCode),
        optimizeCode(userCode),
        visualizeCode(userCode),
      ])
      setExplanation(exp)
      setOptimization(opt)
      setVisualization(viz)
    } finally {
      setIsLoading(false)
    }
  }

return (
    <div className="h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Code Analyzer
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-73px)] flex">
        {/* Left Panel - Input */}
        <div className="w-1/3 border-r border-gray-800 flex flex-col">
          <div className="p-6 flex-1 overflow-hidden">
            <CodeInput initialCode={code} onSubmit={handleExplain} isLoading={isLoading} />
          </div>
        </div>

        {/* Right Panel - Output */}
        <div className="flex-1 overflow-hidden">
          <CodeOutput
            code={code}
            explanation={explanation}
            optimization={optimization}
            visualization={visualization}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}


export default App;