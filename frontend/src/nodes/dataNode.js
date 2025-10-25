import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const DataNode = ({ id, data }) => {
  const fields = [
    {
      key: "url",
      label: "URL",
      type: "text",
      default: (data && data.url) || "https://api.example.com/data",
    },
  ];

  const handles = [
    { idSuffix: "out", type: "source", position: Position.Right },
  ];

  const children = (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 12 }}>
        Fetches JSON from a URL (config-only in this demo).
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Data"
      fields={fields}
      handles={handles}
      children={children}
    />
  );
};

export default DataNode;
