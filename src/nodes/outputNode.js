import { useState } from "react";
import { BaseNode } from "./base/baseNode";

export const OutputNode = ({ id, data, type }) => {
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Output"
      handles={data?.handles ?? []}
    >
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-sm">
          <span>Type</span>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
