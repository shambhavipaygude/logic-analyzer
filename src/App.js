import React, { useEffect, useState } from "react";
import { CodeInput } from "./components/codeInput";
import { generateSampleCode, explainCode, optimizeCode } from "./components/aiCall";
import TrueFocus from './components/trueFocus';

function App() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [optimization, setOptimization] = useState("");
  const [originalComplexity, setOriginalComplexity] = useState("");
  const [optimizedComplexity, setOptimizedComplexity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // Tracks which section is active (explanation or optimization)
  const [aiCallComplete, setAiCallComplete] = useState(false); // Tracks AI call completion

  const handleExplain = async (userCode) => {
    setIsLoading(true);
    setAiCallComplete(false);
    setCode(userCode);
    try {
      const [exp, opt] = await Promise.all([
        explainCode(userCode),
        optimizeCode(userCode),
      ]);

      // Extract time complexities from optimization response
      const originalMatch = opt.match(/time complexity of original code:\s*([^\n]*)/i);
      const optimizedMatch = opt.match(/time complexity of optimized code:\s*([^\n]*)/i);
      const optimizedCodeMatch = opt.match(/optimized code\s*:\s*([\s\S]*?)time complexity of original code:/i);

      setExplanation(exp);
      setOptimization(optimizedCodeMatch ? optimizedCodeMatch[1].trim() : "");
      setOriginalComplexity(originalMatch ? originalMatch[1].trim() : "");
      setOptimizedComplexity(optimizedMatch ? optimizedMatch[1].trim() : "");
      setAiCallComplete(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleCode = async () => {
    setIsLoading(true);
    try {
      const sampleCode = await generateSampleCode();
      setCode(sampleCode);
    } catch (error) {
      console.error("Error generating sample code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <TrueFocus
              sentence="Logic Analyzer"
              manualMode={false}
              blurAmount={3}
              borderColor="#3b82f6"
              animationDuration={0.8}
              pauseBetweenAnimations={2}
            />
          </div>
          <div className="header-actions">
            <button className="sample-btn" onClick={loadSampleCode}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
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

            {/* Creative Buttons for Explanation and Optimization */}
            <div className="analysis-buttons">
              <div
                className={`analysis-button explanation ${
                  activeSection === "explanation" ? "active" : ""
                }`}
                onMouseEnter={() => setActiveSection("explanation")}
                onMouseLeave={() => setActiveSection(null)}
              >
                {activeSection !== "explanation" && <h3>Code Explanation</h3>}
                {activeSection === "explanation" && (
                  <div className="analysis-content">
                    {isLoading ? (
                      <p>Loading explanation...</p>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{ __html: explanation }}
                        className="formatted-content"
                      />
                    )}
                  </div>
                )}
              </div>

              <div
                className={`analysis-button optimization ${
                  activeSection === "optimization" ? "active" : ""
                }`}
                onMouseEnter={() => setActiveSection("optimization")}
                onMouseLeave={() => setActiveSection(null)}
              >
                {activeSection !== "optimization" && <h3>Code Optimization</h3>}
                {activeSection === "optimization" && (
                  <div className="analysis-content">
                    {isLoading ? (
                      <p>Loading optimization...</p>
                    ) : (
                      <div className="formatted-content">
                        {/* Code Editor UI for Optimized Code */}
                        <div className="code-editor-container">
                          <div className="editor-header">
                            <div className="file-info">
                              <div className="file-icon"></div>
                              <span>optimized_code.py</span>
                            </div>
                          </div>
                          <div className="editor-body">
                            <div className="line-numbers">
                              {optimization.split("\n").map((_, i) => (
                                <div key={i} className="line-number">
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                            <textarea
                              className="scrollable-textarea"
                              value={optimization}
                              readOnly
                            />
                          </div>
                        </div>

                        {/* Time Complexity Comparison */}
                        <div className="time-complexity-comparison">
                          <div className="complexity original">
                            <h4>Original Complexity</h4>
                            <p>{originalComplexity}</p>
                          </div>
                          <div className="complexity optimized">
                            <h4>Optimized Complexity</h4>
                            <p>{optimizedComplexity}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>Built with ❤️ for Developers</p>
        </div>
      </footer>

      {/* AI Call Completion Indicator */}
      {aiCallComplete && (
        <div className="ai-call-indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="check-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Analysis Complete</span>
        </div>
      )}
    </div>
  );
}

export default App;