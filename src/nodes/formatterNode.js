import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./base/baseNode";

export const FormatterNode = ({ id, data, type }) => {
  const [formatType, setFormatType] = useState(data.formatType || "uppercase");

  const handleFormatChange = (e) => {
    setFormatType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-input`,
      type: "target",
      position: Position.Left,
    },
    {
      id: `${id}-output`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Formatter" handles={handles}>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Format
        <select
          className="border"
          value={formatType}
          onChange={handleFormatChange}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="pascalcase">PascalCase</option>
          <option value="snake_case">snake_case</option>
        </select>
      </label>
    </BaseNode>
  );
};
