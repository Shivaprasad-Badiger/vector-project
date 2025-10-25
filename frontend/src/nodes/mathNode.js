import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const MathNode = ({ id, data }) => {
  const fields = [
    {
      key: "expression",
      label: "Expression",
      type: "text",
      default: (data && data.expression) || "a + b",
    },
  ];

  const handles = [
    {
      idSuffix: "a",
      type: "target",
      position: Position.Left,
      style: { top: "25%" },
    },
    {
      idSuffix: "b",
      type: "target",
      position: Position.Left,
      style: { top: "75%" },
    },
    { idSuffix: "result", type: "source", position: Position.Right },
  ];

  const children = (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 12 }}>
        Evaluates a simple expression using incoming values (a, b).
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      fields={fields}
      handles={handles}
      children={children}
    />
  );
};

export default MathNode;
