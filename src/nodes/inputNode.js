import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./base/baseNode";

export const InputNode = ({ id, data, type }) => {
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-value`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Text" handles={handles}>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Type
        <select
          className="border"
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
