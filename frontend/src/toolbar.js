// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="w-56 bg-slate-900/40 p-4 border-r border-white/5">
            <div className="text-sm text-slate-400 font-semibold mb-3">Nodes</div>
            <div className="flex flex-col gap-3">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};
