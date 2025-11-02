import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const fields = [
    {
      key: "outputName",
      label: "Name",
      type: "text",
      default: id.replace("customOutput-", "output_"),
    },
    {
      key: "outputType",
      label: "Type",
      type: "select",
      default: (data && data.outputType) || "Text",
      options: ["Text", "Image"],
    },
  ];

  const handles = [
    { idSuffix: "value", type: "target", position: Position.Left },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={fields}
      handles={handles}
    />
  );
};

export default OutputNode;
