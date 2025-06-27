import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

export const CodeInput = ({ initialCode, onSubmit, isLoading }) => {
  const [input, setInput] = useState(initialCode || "");
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const lineCountRef = useRef(null);

  useEffect(() => {
    setInput(initialCode || "");
  }, [initialCode]);

  const updateLineNumbers = () => {
    if (!textareaRef.current || !lineNumbersRef.current) return;

    const lines = textareaRef.current.value.split("\n").length;
    const numbers = [];
    for (let i = 1; i <= lines; i++) {
      numbers.push(i);
    }

    // Clear existing line numbers
    lineNumbersRef.current.innerHTML = "";

    // Add each line number as a separate div
    numbers.forEach((num) => {
      const lineDiv = document.createElement("div");
      lineDiv.textContent = num;
      lineDiv.className = "line-number";
      lineNumbersRef.current.appendChild(lineDiv);
    });
  };

  const updateCursorPosition = () => {
    if (!textareaRef.current || !lineCountRef.current) return;

    const text = textareaRef.current.value;
    const cursorPos = textareaRef.current.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPos);
    const line = textBeforeCursor.split("\n").length;
    const col = textBeforeCursor.split("\n").pop().length + 1;
    lineCountRef.current.textContent = `Ln ${line}, Col ${col}`;
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    updateLineNumbers();
    updateCursorPosition();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue =
        e.target.value.substring(0, start) +
        "    " +
        e.target.value.substring(end);
      setInput(newValue);

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
        updateLineNumbers();
        updateCursorPosition();
      }, 0);
    }
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    updateLineNumbers();
    updateCursorPosition();
  }, []);

  useEffect(() => {
    updateLineNumbers();
  }, [input]);

  return (
    <div className="code-input-container">
      {/* Code Editor */}
      <div className="code-editor-container">
        <div className="editor-header">
          <div className="window-controls">
            <button className="control-btn close"></button>
            <button className="control-btn minimize"></button>
            <button className="control-btn maximize"></button>
          </div>
          <div className="file-info">
            <div className="file-icon"></div>
            <span>main.py</span>
          </div>
        </div>

        <div className="editor-body">
          <div className="line-numbers" ref={lineNumbersRef}></div>
          <textarea
            ref={textareaRef}
            className="scrollable-textarea"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorPosition}
            onClick={updateCursorPosition}
            onScroll={handleScroll}
            placeholder="# Paste your code here or start typing..."
            spellCheck="false"
          />
        </div>

        
      </div>

      {/* Action Button */}
      <div className="action-section">
        <button
          className="analyze-button"
          onClick={() => onSubmit(input)}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="loading-spinner" size={20} />
              <span className="loading-text">Analyzing Code...</span>
            </>
          ) : (
            <>
              <span>Analyze Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};