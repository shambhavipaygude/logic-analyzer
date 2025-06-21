import React, { useEffect, useState } from "react";
import { CodeInput } from "./components/codeInput";
import { CodeOutput } from "./components/codeOuput";
import { generateSampleCode, explainCode, visualizeCode } from "./components/aiCall";

function App() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [visualization, setVisualization] = useState("");

  useEffect(() => {
    generateSampleCode().then(setCode);
  }, []);

  const handleExplain = async (userCode) => {
    setCode(userCode);
    const [exp, viz] = await Promise.all([
      explainCode(userCode),
      visualizeCode(userCode),
    ]);
    setExplanation(exp);
    setVisualization(viz);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Code Explainer</h1>
      <div className="max-w-4xl mx-auto">
        <CodeInput initialCode={code} onSubmit={handleExplain} />
        <CodeOutput code={code} explanation={explanation} visualization={visualization} />
      </div>
    </div>
  );
}

export default App;