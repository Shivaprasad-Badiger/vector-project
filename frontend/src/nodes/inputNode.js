// inputNode.js

import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const fields = [
    { key: 'inputName', label: 'Name', type: 'text', default: id.replace('customInput-', 'input_') },
    { key: 'inputType', label: 'Type', type: 'select', default: (data && data.inputType) || 'Text', options: ['Text', 'File'] },
  ];

  const handles = [
    { idSuffix: 'value', type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode id={id} data={data} title="Input" fields={fields} handles={handles} />
  );
};

export default InputNode;
