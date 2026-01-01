import { BaseNode } from "./base/baseNode";

export const LLMNode = ({ id, data, type }) => {
  return (
    <BaseNode id={id} nodeType={type} title="LLM" handles={data?.handles ?? []}>
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
