import { BaseNode } from "./base/baseNode";

export const ValidatorNode = ({ id, data, type }) => {
  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Validator"
      handles={data?.handles ?? []}
    >
      <div>
        <span>Validate incoming data before letting the flow continue</span>
      </div>
    </BaseNode>
  );
};
