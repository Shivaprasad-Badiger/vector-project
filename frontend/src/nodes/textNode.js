import React, { useState, useMemo, useRef, useEffect } from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";
import { useStore } from "../store";

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
  const [text, setText] = useState((data && data.text) || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [cursorPosition, setCursorPosition] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const nodes = useStore(state => state.nodes);
  
  const availableNodes = useMemo(() => {
    return nodes
      .filter(node => node.id !== id)
      .map(node => ({
        id: node.id,
        label: node.data?.inputName || node.data?.outputName || node.id,
        type: node.type
      }));
  }, [nodes, id]);

  const filteredNodes = useMemo(() => {
    if (!searchTerm) return availableNodes;
    return availableNodes.filter(node => 
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableNodes, searchTerm]);

  const variables = useMemo(() => extractVariables(text), [text]);
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

  const width = 240;
  const maxInnerHeight = 220;
  const fields = [];

  const taRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
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
  const handleTextChange = (e) => {
    const newText = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    setText(newText);
    setCursorPosition(cursorPos);

    const beforeCursor = newText.substring(0, cursorPos);
    const openBraceMatch = beforeCursor.match(/\{\{([^}]*)$/);
    
    if (openBraceMatch) {
      setSearchTerm(openBraceMatch[1]);
      setShowDropdown(true);
      
      const textarea = e.target;
      const textBeforeCursor = beforeCursor;
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines.length - 1;
      const currentColumn = lines[lines.length - 1].length;
      
      const lineHeight = 20;
      const charWidth = 8;
      const top = currentLine * lineHeight + 30;
      const left = Math.min(currentColumn * charWidth, width - 150);
      
      setDropdownPosition({ top, left });
    } else {
      setShowDropdown(false);
      setSearchTerm("");
    }
  };

  const selectNode = (node) => {
    const textarea = taRef.current;
    if (!textarea) return;

    const beforeCursor = text.substring(0, cursorPosition);
    const afterCursor = text.substring(cursorPosition);
    
    const openBraceMatch = beforeCursor.match(/^(.*)\{\{([^}]*)$/);
    if (openBraceMatch) {
      const beforePattern = openBraceMatch[1];
      const newText = beforePattern + `{{${node.label}}}` + afterCursor;
      setText(newText);
      
      const newCursorPos = beforePattern.length + `{{${node.label}}}`.length;
      setTimeout(() => {
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    }
    
    setShowDropdown(false);
    setSearchTerm("");
  };
  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    
    if (e.key === 'Escape') {
      setShowDropdown(false);
      setSearchTerm("");
      e.preventDefault();
    } else if (e.key === 'Enter' && filteredNodes.length > 0) {
      selectNode(filteredNodes[0]);
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          taRef.current && !taRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <BaseNode
      id={id}
      data={{ ...data, text }}
      title="Text"
      fields={fields}
      handles={handles}
      style={{ width, position: 'relative' }}
    >
      <div style={{ position: 'relative' }}>
        <textarea
          ref={taRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
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
          placeholder="Type {{ to reference other nodes..."
        />

        {showDropdown && (
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              zIndex: 1000,
              minWidth: '150px',
              maxWidth: '200px',
              maxHeight: '200px',
              overflow: 'auto',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ padding: '8px 12px', fontSize: '12px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              Select Node
            </div>
            {filteredNodes.length > 0 ? (
              filteredNodes.map((node, index) => (
                <div
                  key={node.id}
                  onClick={() => selectNode(node)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: 'white',
                    borderBottom: index < filteredNodes.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    background: index === 0 ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(124, 58, 237, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = index === 0 ? 'rgba(124, 58, 237, 0.2)' : 'transparent';
                  }}
                >
                  <div style={{ fontWeight: '500' }}>{node.label}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {node.type} • {node.id}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '12px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
                No nodes found
              </div>
            )}
          </div>
        )}
      </div>

      {variables.length > 0 && (
        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {variables.map((v) => (
            <div key={v} style={{ 
              background: "rgba(124, 58, 237, 0.2)", 
              color: "white", 
              padding: "3px 8px", 
              borderRadius: 12, 
              fontSize: 11,
              border: "1px solid rgba(124, 58, 237, 0.3)"
            }}>
              {`{{${v}}}`}
            </div>
          ))}
        </div>
      )}
    </BaseNode>
  );
};

export default TextNode;
