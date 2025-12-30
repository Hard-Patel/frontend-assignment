import { DraggableNode } from "./draggableNode";
import { nodeTypes } from "./nodes/nodeConfig";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px 25px", boxShadow: '1px 1px 6px rgba(47, 47, 47, 0.5)' }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
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
