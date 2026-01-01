import { useEffect, useMemo, useState } from "react";
import { Position } from "reactflow";
import { useStore } from "../store";
import { BaseNode } from "./base/baseNode";
import { MustacheTextarea } from "../components/MustacheTextarea";

const extractVariables = (text) =>
  (text.match(/\{\{(.*?)\}\}/g) || []).map((v) => v.replace(/[{}]/g, ""));

export const TextNode = ({ id, data, type }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const { syncVariableEdges } = useStore((state) => state);

  const variables = useMemo(() => {
    return extractVariables(currText);
  }, [currText]);

  const handleTextChange = (text) => {
    setCurrText(text);
  };

  const handles = [
    ...variables.map((v) => ({
      id: `${id}-${v}`, // target handle id
      type: "target",
      position: Position.Left,
    })),
    {
      id: `${id}-output`,
      type: "source",
      position: Position.Right,
    },
  ];

  useEffect(() => {
    syncVariableEdges(id, variables);
  }, [variables]);

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
