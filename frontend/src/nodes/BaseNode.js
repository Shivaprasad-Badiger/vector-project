import React, { useMemo } from "react";
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  data = {},
  title = "Node",
  fields = [],
  handles = [],
  style = {},
  children,
}) => {
  const fieldValues = useMemo(() => {
    const vals = {};
    for (const f of fields) {
      vals[f.key] = data && f.key in data ? data[f.key] : f.default ?? "";
    }
    return vals;
  }, [data, fields]);

  const containerStyle = {
    width: 220,
    minHeight: 80,
    padding: 8,
    border: "1px solid #222",
    borderRadius: 6,
    background: "#fff",
    fontFamily: "Arial, sans-serif",
    fontSize: 13,
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div style={containerStyle}>
      {handles.map((h, idx) => (
        <Handle
          key={idx}
          type={h.type}
          position={h.position || Position.Left}
          id={`${id}-${h.idSuffix}`}
          style={h.style}
        />
      ))}

      <div style={{ fontWeight: "700", marginBottom: 6 }}>{title}</div>

      {children}

      {fields.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {fields.map((f) => (
            <label
              key={f.key}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <span style={{ fontSize: 11, color: "#333" }}>{f.label}</span>
              {f.type === "select" ? (
                <select
                  defaultValue={fieldValues[f.key]}
                  style={{ padding: 4 }}
                >
                  {(f.options || []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type === "number" ? "number" : "text"}
                  defaultValue={fieldValues[f.key]}
                  style={{ padding: 6 }}
                />
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseNode;
