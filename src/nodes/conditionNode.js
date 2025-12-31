import { Position } from "reactflow";
import { BaseNode } from "./base/baseNode";

export const ConditionNode = ({ id, data, type }) => {
  const handles = [
    {
      id: `${id}-value`,
      type: "target",
      position: Position.Left,
    },
    {
      id: `${id}-condition`,
      type: "target",
      position: Position.Left,
    },
    {
      id: `${id}-true`,
      type: "source",
      position: Position.Right,
    },
    {
      id: `${id}-false`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Condition" handles={handles}>
      <div>
        <span>Branch logic based on a condition</span>
      </div>
    </BaseNode>
  );
};

