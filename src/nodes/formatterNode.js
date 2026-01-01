import { useState } from "react";
import { BaseNode } from "./base/baseNode";

export const FormatterNode = ({ id, data, type }) => {
  const [formatType, setFormatType] = useState(data.formatType || "uppercase");

  const handleFormatChange = (e) => {
    setFormatType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Formatter"
      handles={data?.handles ?? []}
    >
      <label className="flex flex-col gap-1 text-sm">
        <span>Format</span>
        <select
          className="border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary-500"
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
