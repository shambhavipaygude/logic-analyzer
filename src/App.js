import React, { useEffect, useState } from "react";
import { CodeInput } from "./components/codeInput";
import { CodeOutput } from "./components/codeOuput";
import { generateSampleCode, explainCode, visualizeCode, optimizeCode } from "./components/aiCall";
import TrueFocus from './components/trueFocus';
import Silk from './components/silk';

function App() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [optimization, setOptimization] = useState("");
  const [visualization, setVisualization] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sampleCodes] = useState([
    "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
    "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1",
    "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr"
  ]);

  const handleExplain = async (userCode) => {
    setIsLoading(true);
    setCode(userCode);
    try {
      const [exp, opt, viz] = await Promise.all([
        explainCode(userCode),
        optimizeCode(userCode),
        visualizeCode(userCode),
      ]);
      setExplanation(exp);
      setOptimization(opt);
      setVisualization(viz);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleCode = async () => {
    const randomSample = sampleCodes[Math.floor(Math.random() * sampleCodes.length)];
    setCode(randomSample);
  };

  return (
    <div className="app-container">
      {/* Animated Background */}
      <div className="background-layer">
        <Silk
          speed={0.5}
          scale={2}
          color="#1a1a2e"
          noiseIntensity={0.8}
          rotation={0}
        />
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            
            <TrueFocus 
              sentence="LOGIC FOCUS"
              manualMode={false}
              blurAmount={3}
              borderColor="#3b82f6"
              animationDuration={1}
              pauseBetweenAnimations={2}
            />
          </div>
          <div className="header-actions">
            <button className="sample-btn" onClick={loadSampleCode}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Load Sample
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Input Panel */}
          <section className="input-panel">
            <div className="panel-header">
              <h2>Code Input</h2>
              <div className="panel-badge">Editor</div>
            </div>
            <CodeInput 
              initialCode={code} 
              onSubmit={handleExplain} 
              isLoading={isLoading} 
            />
          </section>

          {/* Output Panel */}
          <section className="output-panel">
            <div className="panel-header">
              <h2>Analysis Results</h2>
              <div className="panel-badge">AI Powered</div>
            </div>
            <CodeOutput
              code={code}
              explanation={explanation}
              optimization={optimization}
              visualization={visualization}
              isLoading={isLoading}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>Built with ❤️ for Developers</p>
        </div>
      </footer>
    </div>
  );
}

export default App;