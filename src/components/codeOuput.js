import React from "react";
import { Brain, Zap, CheckCircle } from "lucide-react";
import CodeOptimization from "./optimization";
import { CopyButton } from "./copyButton";

export const CodeOutput = ({ explanation, optimization, isLoading }) => {
  return (
    <div className="code-output-container">
      {/* Code Explanation Section */}
      <div className="analysis-section hover-expand">
        <div className="section-header">
          <div className="section-title">
            <Brain size={20} />
            <h3>Code Explanation</h3>
          </div>
          <div className="section-actions">
            <span className="section-badge">AI Generated</span>
            {explanation && <CopyButton text={explanation} />}
          </div>
        </div>

        <div className="section-content scrollable-content">
          {isLoading ? (
            <div className="loading-state">
              <div className="loading-animation">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="loading-info">
                <h4>Analyzing your code...</h4>
                <p>Our AI is breaking down your code into simple explanations</p>
              </div>
            </div>
          ) : explanation ? (
            <div className="explanation-content">
              <div
                dangerouslySetInnerHTML={{ __html: explanation }}
                className="formatted-content"
              />
            </div>
          ) : (
            <div className="empty-state">
              <Brain size={48} />
              <h4>Ready to analyze</h4>
              <p>Submit your code to get a detailed explanation</p>
            </div>
          )}
        </div>
      </div>

      {/* Optimization Section */}
      <div className="analysis-section hover-expand">
        <div className="section-header">
          <div className="section-title">
            <Zap size={20} />
            <h3>Code Optimization</h3>
          </div>
          <div className="section-actions">
            <span className="section-badge performance">Performance</span>
          </div>
        </div>
        <div className="section-content scrollable-content">
          <CodeOptimization optimization={optimization} isLoading={isLoading} />
        </div>
      </div>

      {/* Compact Pro Tips Footer */}
      <div className="output-footer compact">
        <div className="tips-section">
          <CheckCircle size={14} />
          <div className="tips-content">
            <span className="tips-text">
              <strong>Pro Tip</strong> Hover over sections to expand and scroll
              through detailed analysis.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};