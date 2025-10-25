// textNode.js

import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const fields = [
    {
      key: "text",
      label: "Text",
      type: "text",
      default: (data && data.text) || "{{input}}",
    },
  ];

  const handles = [
    { idSuffix: "output", type: "source", position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={fields}
      handles={handles}
    />
  );
};

export default TextNode;
