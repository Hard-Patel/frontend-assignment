import { useState } from "react";
import { BaseNode } from "./base/baseNode";

export const TransformNode = ({ id, data, type }) => {
  const [transformType, setTransformType] = useState(
    data.transformType || "stringify"
  );

  const handleTransformChange = (e) => {
    setTransformType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Transform"
      handles={data?.handles ?? []}
    >
      <label className="flex flex-col gap-1 text-sm">
        <span>Transform</span>
        <select
          className="border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary-500"
          value={transformType}
          onChange={handleTransformChange}
        >
          <option value="stringify">Stringify JSON</option>
          <option value="encode">Encode to Base64</option>
          <option value="decode">Decode from Base64</option>
        </select>
      </label>
    </BaseNode>
  );
};
