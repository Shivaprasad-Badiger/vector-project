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

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-md p-3 border border-white/5 text-white shadow-md" style={style}>
      {handles.map((h, idx) => (
        <Handle
          key={idx}
          type={h.type}
          position={h.position || Position.Left}
          id={`${id}-${h.idSuffix}`}
          style={h.style}
        />
      ))}

      <div className="flex items-center gap-2 mb-2">
        <div className="font-semibold text-sm">{title}</div>
      </div>

      {children && <div className="text-slate-400 text-sm mb-2">{children}</div>}

      {fields.length > 0 && (
        <div className="flex flex-col gap-2">
          {fields.map((f) => (
            <label key={f.key} className="text-sm text-slate-400">
              <div className="mb-1">{f.label}</div>
              {f.type === "select" ? (
                <select defaultValue={fieldValues[f.key]} className="w-full p-2 rounded bg-white/5 border border-white/6 text-white text-sm">
                  {(f.options || []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input type={f.type === "number" ? "number" : "text"} defaultValue={fieldValues[f.key]} className="w-full p-2 rounded bg-white/5 border border-white/6 text-white text-sm" />
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseNode;
