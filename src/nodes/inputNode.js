import { useState } from "react";
import { BaseNode } from "./base/baseNode";

export const InputNode = ({ id, data, type }) => {
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Input"
      handles={data?.handles ?? []}
    >
      <label className="flex flex-col gap-1 text-sm">
        <span>Type</span>
        <select
          className="border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary-500"
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
