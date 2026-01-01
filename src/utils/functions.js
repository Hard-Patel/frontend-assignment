import { Position } from "reactflow";

export const getInitHandlesByType = (type) => {
  switch (type) {
    case "customInput":
      return [
        {
          id: `value`,
          type: "source",
          position: Position.Right,
        },
      ];

    case "text":
      return [
        {
          id: `value`,
          type: "source",
          position: Position.Right,
        },
        {
          id: `input`,
          type: "target",
          position: Position.Left,
        },
      ];

    case "condition":
      return [
        {
          id: `value`,
          type: "target",
          position: Position.Left,
        },
        {
          id: `condition`,
          type: "target",
          position: Position.Left,
        },
        {
          id: `true`,
          type: "source",
          position: Position.Right,
        },
        {
          id: `false`,
          type: "source",
          position: Position.Right,
        },
      ];

    case "formatter":
      return [
        {
          id: `value`,
          type: "source",
          position: Position.Right,
        },
        {
          id: `input`,
          type: "target",
          position: Position.Left,
        },
      ];

    case "transform":
      return [
        {
          id: `value`,
          type: "source",
          position: Position.Right,
        },
        {
          id: `input`,
          type: "target",
          position: Position.Left,
        },
      ];

    case "webhook":
      return [
        {
          id: `url`,
          type: "target",
          position: Position.Left,
        },
        {
          id: `payload`,
          type: "target",
          position: Position.Left,
        },
        {
          id: `success`,
          type: "source",
          position: Position.Right,
        },
        {
          id: `error`,
          type: "source",
          position: Position.Right,
        },
      ];

    case "validator":
      return [
        {
          id: `input`,
          type: "target",
          position: Position.Left,
        },
        {
          id: `valid`,
          type: "source",
          position: Position.Right,
        },
        {
          id: `invalid`,
          type: "source",
          position: Position.Right,
        },
      ];

    case "llm":
      return [
        {
          id: `system`,
          type: "target",
          position: Position.Left,
        },
        {
          id: `prompt`,
          type: "target",
          position: Position.Left,
        },
        {
          id: `response`,
          type: "source",
          position: Position.Right,
        },
      ];

    case "customOutput":
      return [
        {
          id: `value`,
          type: "target",
          position: Position.Left,
        },
      ];

    default:
      return [];
  }
};
