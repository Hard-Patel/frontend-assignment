import { CgFormatText } from "react-icons/cg";
import { FiArrowRight, FiArrowLeft, FiZap, FiGitBranch, FiType, FiRefreshCw, FiGlobe, FiShield } from "react-icons/fi";

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
  {
    type: "condition",
    label: "Condition",
    icon: FiGitBranch,
  },
  {
    type: "formatter",
    label: "Formatter",
    icon: FiType,
  },
  {
    type: "transform",
    label: "Transform",
    icon: FiRefreshCw,
  },
  {
    type: "webhook",
    label: "Webhook",
    icon: FiGlobe,
  },
  {
    type: "validator",
    label: "Validator",
    icon: FiShield,
  },
];

export const getNodeConfig = (nodeType) => {
  return nodeTypes.find((config) => config.type === nodeType) || nodeTypes[0];
};

