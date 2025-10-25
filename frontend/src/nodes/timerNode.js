import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const TimerNode = ({ id, data }) => {
  const fields = [
    {
      key: "interval",
      label: "Interval (ms)",
      type: "number",
      default: (data && data.interval) || 1000,
    },
  ];

  const handles = [
    { idSuffix: "tick", type: "source", position: Position.Right },
  ];

  const children = (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 12 }}>
        Emits a tick at the configured interval (simulated).
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      data={data}
      title="Timer"
      fields={fields}
      handles={handles}
      children={children}
    />
  );
};

export default TimerNode;
