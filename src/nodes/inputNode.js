import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './base/baseNode';

export const InputNode = ({ id, data, type }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-value`,
      type: 'source',
      position: Position.Right,
    },
  ];

  return (
    <BaseNode id={id} nodeType={type} title="Input" handles={handles}>
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
            value={inputType} 
            onChange={handleTypeChange}
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
