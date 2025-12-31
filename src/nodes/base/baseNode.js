import { useMemo } from "react";
import { FiX } from "react-icons/fi";
import { Handle, Position } from "reactflow";
import { useStore } from "../../store";
import { getNodeConfig } from "../nodeConfig";

export const BaseNode = ({
  id,
  nodeType,
  title,
  width = 200,
  minHeight = 80,
  handles = [],
  showName = true,
  children,
}) => {
  const derivedType = nodeType || (id ? id.split("-")[0] : null);
  const nodeConfig = getNodeConfig(derivedType);
  const Icon = nodeConfig.icon;
  const { deleteNode, updateNodeField, getNodeName } = useStore(
    (state) => state
  );

  const handleDelete = (e) => {
    e.stopPropagation();
    if (id) {
      deleteNode(id);
    }
  };
  const positionedHandles = useMemo(() => {
    const handlesByPosition = {
      [Position.Left]: [],
      [Position.Right]: [],
      [Position.Top]: [],
      [Position.Bottom]: [],
    };

    handles.forEach((handle) => {
      const position = handle.position;
      if (handlesByPosition[position]) {
        handlesByPosition[position].push(handle);
      }
    });

    const result = [];

    Object.entries(handlesByPosition).forEach(([position, handleGroup]) => {
      if (handleGroup.length === 0) return;

      const isVertical =
        position === Position.Left || position === Position.Right;
      const totalHandles = handleGroup.length;

      handleGroup.forEach((handle, index) => {
        const calculatedStyle = {};

        if (isVertical) {
          const topPercent = ((index + 1) / (totalHandles + 1)) * 100;
          calculatedStyle.top = `${topPercent}%`;
        } else {
          const leftPercent = ((index + 1) / (totalHandles + 1)) * 100;
          calculatedStyle.left = `${leftPercent}%`;
        }

        result.push({
          ...handle,
          style: {
            ...calculatedStyle,
            ...(handle.style || {}),
          },
        });
      });
    });

    return result;
  }, [handles]);

  return (
    <div
      style={{
        width,
        minHeight,
        border: "1px solid #c0bacd",
        borderRadius: 4,
        padding: 2,
        background: "#fff",
        position: "relative",
      }}
    >
      {positionedHandles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={{
            ...handle.style,
            height: 8,
            width: 8,
            background: "#684f9e",
          }}
        />
      ))}

      {title && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            background: "#E8E4F0",
            borderRadius: 4,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon size={16} />
            <span style={{ fontWeight: 600, color: "#000" }}>{title}</span>
          </div>
          <FiX
            size={14}
            className="cursor-pointer hover:bg-danger-500/20 rounded-full hover:text-danger-500 text-primary-500"
            onClick={handleDelete}
          />
        </div>
      )}

      <div style={{ padding: 6, boxSizing: "border-box" }}>
        {showName && (
          <div
            className="nodrag"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={(e) =>
              updateNodeField(id, "name", e.currentTarget.textContent)
            }
            style={{
              background: "#E8E4F0",
              borderRadius: 4,
              padding: "4px 8px",
              marginBottom: 4,
              outline: "none",
              whiteSpace: "pre-wrap",
            }}
          >
            {getNodeName(id)}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
