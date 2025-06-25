import React from "react";
import { CopyButton } from "./copyButton";

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
    <div
      style={{
        backgroundColor: "#1f2937",
        borderRadius: "0.5rem",
        border: "1px solid #374151",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid #374151",
        }}
      >
        <h2
          style={{
            fontWeight: "600",
            fontSize: "1.125rem",
            color: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>Optimization</span>
        </h2>
        {optimizedCode && <CopyButton text={optimizedCode} />}
      </div>
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {isLoading ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af" }}>
            <div
              style={{
                width: "1rem",
                height: "1rem",
                borderRadius: "50%",
                border: "2px solid #7c3aed",
                borderTopColor: "transparent",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <span>Optimizing code...</span>
          </div>
        ) : (
          <>
            {optimizedCode && (
              <div>
                <h3 style={{ fontWeight: "500", color: "#d1d5db", marginBottom: "0.5rem" }}>
                  Optimized Code:
                </h3>
                <div
                  style={{
                    backgroundColor: "#111827",
                    borderRadius: "0.25rem",
                    border: "1px solid #4b5563",
                  }}
                >
                  <pre
                    style={{
                      padding: "0.75rem",
                      overflow: "auto",
                      maxHeight: "12rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <code style={{ color: "#d1d5db", fontFamily: "monospace" }}>{optimizedCode}</code>
                  </pre>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {originalTime && (
                <div
                  style={{
                    backgroundColor: "#111827",
                    padding: "0.75rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #4b5563",
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.25rem" }}>
                    Original Complexity
                  </div>
                  <div style={{ color: "#f87171", fontFamily: "monospace" }}>{originalTime}</div>
                </div>
              )}
              {optimizedTime && (
                <div
                  style={{
                    backgroundColor: "#111827",
                    padding: "0.75rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #4b5563",
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.25rem" }}>
                    Optimized Complexity
                  </div>
                  <div style={{ color: "#34d399", fontFamily: "monospace" }}>{optimizedTime}</div>
                </div>
              )}
            </div>

            {explanationText && (
              <div>
                <h3 style={{ fontWeight: "500", color: "#d1d5db", marginBottom: "0.5rem" }}>
                  Explanation:
                </h3>
                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.875rem",
                    lineHeight: "1.625",
                    backgroundColor: "#111827",
                    padding: "0.75rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #4b5563",
                  }}
                >
                  {explanationText}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CodeOptimization;