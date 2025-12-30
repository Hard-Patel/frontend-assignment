import { DraggableNode } from "./draggableNode";
import { nodeTypes } from "./nodes/nodeConfig";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          marginLeft: "20px",
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
