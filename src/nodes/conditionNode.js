import { BaseNode } from "./base/baseNode";

export const ConditionNode = ({ id, data, type }) => {
  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Condition"
      handles={data?.handles ?? []}
    >
      <div>
        <span>Branch logic based on a condition</span>
      </div>
    </BaseNode>
  );
};
