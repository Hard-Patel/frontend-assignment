import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './base/baseNode';

export const OutputNode = ({ id, data, type }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-value`,
      type: 'target',
      position: Position.Left,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Output" handles={handles}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Type:
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
