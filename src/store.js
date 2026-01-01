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
      const existingVariableEdges = state.edges.filter(
        (e) => e.target === targetNodeId && e.data?.isVariableEdge
      );

      const desiredKeys = new Set(
        variables.map(
          (v) => `${v}|${v}-value|${targetNodeId}|${targetNodeId}-${v}`
        )
      );

      const keptEdges = existingVariableEdges.filter((e) =>
        desiredKeys.has(
          `${e.source}|${e.sourceHandle}|${e.target}|${e.targetHandle}`
        )
      );

      const existingKeys = new Set(
        keptEdges.map(
          (e) => `${e.source}|${e.sourceHandle}|${e.target}|${e.targetHandle}`
        )
      );

      const newEdges = variables
        .filter(
          (v) =>
            !existingKeys.has(
              `${v}|${v}-value|${targetNodeId}|${targetNodeId}-${v}`
            )
        )
        .map((v) => {
          const [source = '', sourceHandle = ''] = v.split(".");
          return {
            id: `reactflow__edge-${v}-${targetNodeId}-${v}`,
            source: source,
            sourceHandle: `${source}-${sourceHandle}`,
            target: targetNodeId,
            targetHandle: `${targetNodeId}-${v}`,
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              height: "20px",
              width: "20px",
            },
            data: { isVariableEdge: true },
          };
        });

      const nonVariableEdges = state.edges.filter(
        (e) => e.target !== targetNodeId || !e.data?.isVariableEdge
      );

      console.log('newEdges: ', newEdges);
      return {
        edges: [...nonVariableEdges, ...keptEdges, ...newEdges],
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
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
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
