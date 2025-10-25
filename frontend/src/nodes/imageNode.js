import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const ImageNode = ({ id, data }) => {
  const fields = [
    {
      key: "imageUrl",
      label: "Image URL",
      type: "text",
      default: (data && data.imageUrl) || "",
    },
    {
      key: "fit",
      label: "Fit",
      type: "select",
      default: (data && data.fit) || "contain",
      options: ["contain", "cover", "fill"],
    },
  ];

  const handles = [
    { idSuffix: "in", type: "target", position: Position.Left },
    { idSuffix: "out", type: "source", position: Position.Right },
  ];

  const children = (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 12 }}>
        Renders an image URL to downstream nodes.
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Image"
      fields={fields}
      handles={handles}
      children={children}
    />
  );
};

export default ImageNode;
