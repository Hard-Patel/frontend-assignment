import { useMemo } from "react";
import { FiX } from "react-icons/fi";
import { Handle, Position } from "reactflow";
import { useStore } from "../../store";
import { getNodeConfig } from "./nodeConfig";

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

  const sourceKeys = useMemo(() => {
    return handles.filter((h) => h.type === "source").map((h) => h.id);
  }, [handles]);

  return (
    <div
      className="relative p-[2px] border rounded w-[200px] min-h-[80px] bg-white"
      style={{ width, minHeight }}
    >
      {positionedHandles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={handle.style}
          className="h-2 w-2 bg-primary-400"
        />
      ))}

      {title && (
        <div className="flex items-center justify-between px-3 py-2 rounded bg-node-background">
          <div className="flex items-center gap-2">
            <Icon size={16} />
            <span className="font-semibold text-black">{title}</span>
          </div>
          <FiX
            size={14}
            onClick={handleDelete}
            className="cursor-pointer rounded-full text-primary-500 hover:bg-danger-500/20 hover:text-danger-500"
          />
        </div>
      )}

      <div className="p-[6px] box-border">
        {showName && (
          <div
            className="nodrag mb-1 rounded bg-node-background px-2 py-1 outline-none whitespace-pre-wrap"
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={(e) =>
              updateNodeField(id, "name", e.currentTarget.textContent)
            }
          >
            {getNodeName(id)}
          </div>
        )}

        {children}

        {sourceKeys.length > 0 && (
          <div className="mt-1.5 text-xs text-[#555]">
            Output: {sourceKeys.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};
