import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./base/baseNode";
import { MustacheTextarea } from "../components/MustacheTextarea";

export const TextNode = ({ id, data, type }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (text) => {
    setCurrText(text);
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
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        Text:
        <MustacheTextarea
          value={currText}
          onChange={handleTextChange}
          className="w-full"
        />
      </label>
    </BaseNode>
  );
};
