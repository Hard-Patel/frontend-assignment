import { Position } from "reactflow";
import { BaseNode } from "./base/baseNode";

export const ValidatorNode = ({ id, data, type }) => {
  const handles = [
    {
      id: `${id}-input`,
      type: "target",
      position: Position.Left,
    },
    {
      id: `${id}-valid`,
      type: "source",
      position: Position.Right,
    },
    {
      id: `${id}-invalid`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Validator" handles={handles}>
      <div>
        <span>Validate incoming data before letting the flow continue</span>
      </div>
    </BaseNode>
  );
};

