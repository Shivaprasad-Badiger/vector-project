// textNode.js

import React, { useState, useMemo, useRef, useEffect } from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";

function extractVariables(text) {
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const variables = new Set();
  let match;
  while ((match = regex.exec(text))) {
    variables.add(match[1]);
  }
  return Array.from(variables);
}

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState((data && data.text) || "{{input}}" );

  // Extract variables from text
  const variables = useMemo(() => extractVariables(text), [text]);

  // Handles: output on right, variable handles on left
  const handles = [
    ...variables.map((v, i) => ({
      idSuffix: `var-${v}`,
      type: "target",
      position: Position.Left,
      style: { top: 40 + i * 24 },
      label: v,
    })),
    { idSuffix: "output", type: "source", position: Position.Right },
  ];

  // Fixed width; let the node height be determined by content (auto-grow textarea)
  const width = 240;
  const maxInnerHeight = 220; // maximum inner textarea height in px

  // Use a standard field list (empty) and render a custom textarea as children
  const fields = [];

  const taRef = useRef(null);

  // Adjust textarea height to fit content, up to maxInnerHeight
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    // reset height to auto to correctly measure scrollHeight
    ta.style.height = "auto";
    const desired = ta.scrollHeight;
    if (desired > maxInnerHeight) {
      ta.style.height = `${maxInnerHeight}px`;
      ta.style.overflow = "auto";
    } else {
      ta.style.height = `${desired}px`;
      ta.style.overflow = "hidden";
    }
  }, [text]);

  return (
    <BaseNode
      id={id}
      data={{ ...data, text }}
      title="Text"
      fields={fields}
      handles={handles}
      style={{ width }}
    >
      <textarea
        ref={taRef}
        value={text}
        onChange={e => setText(e.target.value)}
        rows={1}
        style={{
          width: "100%",
          minHeight: "40px",
          maxHeight: `${maxInnerHeight}px`,
          resize: "none",
          background: "rgba(255,255,255,0.05)",
          color: "white",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: "8px",
          fontSize: "1rem",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      />
      {/* Debug / visual indicator for detected variables */}
      {variables.length > 0 && (
        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {variables.map((v) => (
            <div key={v} style={{ background: "rgba(255,255,255,0.06)", color: "white", padding: "2px 6px", borderRadius: 6, fontSize: 12 }}>
              {`{{${v}}}`}
            </div>
          ))}
        </div>
      )}
    </BaseNode>
  );
};

export default TextNode;
