import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./base/baseNode";

export const TransformNode = ({ id, data, type }) => {
  const [transformType, setTransformType] = useState(
    data.transformType || "stringify"
  );

  const handleTransformChange = (e) => {
    setTransformType(e.target.value);
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
    <BaseNode id={id} nodeType={type} title="Transform" handles={handles}>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Transform
        <select
          className="border"
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

