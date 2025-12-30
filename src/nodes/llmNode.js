import { Position } from 'reactflow';
import { BaseNode } from './base/baseNode';

export const LLMNode = ({ id, data, type }) => {
  const handles = [
    {
      id: `${id}-system`,
      type: 'target',
      position: Position.Left,
    },
    {
      id: `${id}-prompt`,
      type: 'target',
      position: Position.Left,
    },
    {
      id: `${id}-response`,
      type: 'source',
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="LLM" handles={handles}>
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
