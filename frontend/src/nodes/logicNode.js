import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const LogicNode = ({ id, data }) => {
  const fields = [
    {
      key: "operation",
      label: "Operation",
      type: "select",
      default: (data && data.operation) || "AND",
      options: ["AND", "OR", "NOT"],
    },
  ];

  const handles = [
    {
      idSuffix: "a",
      type: "target",
      position: Position.Left,
      style: { top: "30%" },
    },
    {
      idSuffix: "b",
      type: "target",
      position: Position.Left,
      style: { top: "70%" },
    },
    { idSuffix: "out", type: "source", position: Position.Right },
  ];

  const children = (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 12 }}>
        Simple logical operation node between inputs a and b.
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Logic"
      fields={fields}
      handles={handles}
      children={children}
    />
  );
};

export default LogicNode;
