import { DraggableNode } from "./draggableNode";
import { nodeTypes } from "./nodes/base/nodeConfig";

export const PipelineToolbar = () => {
  return (
    <div className="px-[25px] py-[10px] shadow-[1px_1px_6px_rgba(47,47,47,0.5)]">
      <div className="flex flex-wrap gap-[10px]">
        {nodeTypes.map((nodeConfig) => (
          <DraggableNode
            key={nodeConfig.type}
            type={nodeConfig.type}
            label={nodeConfig.label}
            icon={nodeConfig.icon}
          />
        ))}
      </div>
    </div>
  );
};
