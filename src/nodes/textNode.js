import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./base/baseNode";

export const TextNode = ({ id, data, type }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = [
    {
      id: `${id}-output`,
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Text" handles={handles}>
      <label>
        Text:
        <input
          type="text"
          value={currText}
          onChange={handleTextChange}
          className="border"
        />
      </label>
    </BaseNode>
  );
};
