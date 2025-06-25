import React, { useState } from "react";

export const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: "0.5rem",
        color: "#9ca3af",
        backgroundColor: "#27314a",
        borderRadius: "0.5rem",
        position: "relative",
      }}
      title="Copy to clipboard"
    >
      {copied ? (
        <svg
          style={{ width: "1rem", height: "1rem", color: "#34d399" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
       <svg           
  style={{ width: "1rem", height: "1rem" }}           
  fill="none"           
  stroke="white"           
  viewBox="0 0 24 24"         
>           
  <path             
    strokeLinecap="round"             
    strokeLinejoin="round"             
    strokeWidth={2.7}             
    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"           
  />         
</svg>
      )}

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "0.5rem",
          padding: "0.25rem 0.5rem",
          fontSize: "0.75rem",
          color: "#ffffff",
          backgroundColor: "#1f2937",
          borderRadius: "0.25rem",
          opacity: copied ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </div>
    </button>
  );
};