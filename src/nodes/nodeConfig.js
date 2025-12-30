import { CgFormatText } from "react-icons/cg";
import { FiArrowRight, FiArrowLeft, FiZap } from "react-icons/fi";

export const nodeTypes = [
  {
    type: "text",
    label: "Text",
    icon: CgFormatText,
  },
  {
    type: "customInput",
    label: "Input",
    icon: FiArrowRight,
  },
  {
    type: "customOutput",
    label: "Output",
    icon: FiArrowLeft,
  },
  {
    type: "llm",
    label: "LLM",
    icon: FiZap,
  },
];

export const getNodeConfig = (nodeType) => {
  return nodeTypes.find((config) => config.type === nodeType) || nodeTypes[0];
};

