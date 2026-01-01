import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from "reactflow";
import { create } from "zustand";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  syncVariableEdges: (targetNodeId, variables) => {
    set((state) => {
      const nodesById = new Map(state.nodes.map((n) => [n.id, n]));
      variables = [...new Set(variables)];

      const targetNode = nodesById.get(targetNodeId);

      const generatedVariableIds = variables.map((v) => {
        const [source = "", sourceHandleKey = ""] = v.split(".");
        return `reactflow__edge-${source}-${sourceHandleKey}-${targetNodeId}`;
      });

      const existingEdges = state.edges?.filter((e) => {
        return (
          e?.target !== targetNodeId ||
          (e?.target === targetNodeId && generatedVariableIds.includes(e?.id))
        );
      });

      const existingEdgeIds = existingEdges.map((e) => e.id);

      const newEdges = variables
        .map((v) => {
          const [source = "", sourceHandleKey = ""] = v.split(".");

          const sourceNode = nodesById.get(source);
          if (!sourceNode || !sourceHandleKey || !targetNode) return null;

          const sourceHandleId = sourceHandleKey;
          const targetHandleId = "input";

          const sourceHandles = sourceNode.data?.handles || [];
          const targetHandles = targetNode.data?.handles || [];

          const hasSourceHandle = sourceHandles.some(
            (h) => h.id === sourceHandleId
          );
          const hasTargetHandle = targetHandles.some(
            (h) => h.id === targetHandleId
          );

          if (!hasSourceHandle || !hasTargetHandle) return null;

          const newId = `reactflow__edge-${source}-${sourceHandleId}-${targetNodeId}`;
          if (existingEdgeIds.includes(newId)) return null;

          return {
            id: newId,
            source,
            sourceHandle: sourceHandleId,
            target: targetNodeId,
            targetHandle: targetHandleId,
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              height: "20px",
              width: "20px",
            },
            data: { isVariableEdge: true },
          };
        })
        .filter(Boolean);

      return {
        edges: [...existingEdges, ...newEdges],
      };
    });
  },

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}_${newIDs[type]}`;
  },
  getNodeName: (nodeID) => {
    const node = get().nodes.find((node) => node.id === nodeID);
    return node?.data?.name;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set((state) => {
      const edges = addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: "20px",
            width: "20px",
          },
        },
        state.edges
      );

      const { source, sourceHandle, target } = connection;
      if (!source || !sourceHandle || !target) {
        return { edges };
      }

      const targetNode = state.nodes.find((n) => n.id === target);
      if (!targetNode || targetNode.type !== "text") {
        return { edges };
      }

      const variable = `{{${source}.${sourceHandle}}}`;
      const currentText = targetNode.data?.text || "";

      if (currentText.includes(variable)) {
        return { edges };
      }

      const updatedNodes = state.nodes.map((n) => {
        if (n.id !== target) return n;

        return {
          ...n,
          data: {
            ...n.data,
            text: currentText ? `${currentText} ${variable}`.trim() : variable,
          },
        };
      });

      return {
        edges,
        nodes: updatedNodes,
      };
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },
}));
