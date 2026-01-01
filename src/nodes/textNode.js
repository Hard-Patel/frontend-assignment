import { useEffect, useMemo } from "react";
import { MustacheTextarea } from "../components/MustacheTextarea";
import { useStore } from "../store";
import { BaseNode } from "./base/baseNode";

const extractVariables = (text) =>
  (text.match(/\{\{(.*?)\}\}/g) || []).map((v) => v.replace(/[{}]/g, ""));

export const TextNode = ({ id, data, type }) => {
  const { updateNodeField, syncVariableEdges, nodes } = useStore(
    (state) => state
  );
  const currText = nodes.find((n) => n.id === id)?.data?.text ?? "";

  const variables = useMemo(() => {
    return extractVariables(currText ?? "");
  }, [currText]);

  const handleTextChange = (text) => {
    updateNodeField(id, "text", text);
  };

  useEffect(() => {
    syncVariableEdges(id, variables);
  }, [id, syncVariableEdges, variables]);

  return (
    <BaseNode
      id={id}
      nodeType={type}
      title="Text"
      handles={data?.handles ?? []}
    >
      <label className="flex flex-col gap-1 text-sm">
        <span>Text</span>
        <MustacheTextarea
          value={currText}
          onChange={handleTextChange}
          className="w-full"
        />
      </label>
    </BaseNode>
  );
};
