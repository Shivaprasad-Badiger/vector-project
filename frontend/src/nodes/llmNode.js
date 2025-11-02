import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { idSuffix: 'system', type: 'target', position: Position.Left, style: { top: `33%` } },
    { idSuffix: 'prompt', type: 'target', position: Position.Left, style: { top: `66%` } },
    { idSuffix: 'response', type: 'source', position: Position.Right },
  ];

  const children = (
    <div style={{marginBottom: 6}}>
      <div style={{fontSize: 12}}>This is a LLM.</div>
    </div>
  );

  return (
    <BaseNode id={id} data={data} title="LLM" handles={handles} children={children} />
  );
};

export default LLMNode;
