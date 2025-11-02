export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="cursor-grab min-w-[120px] h-14 flex items-center rounded-lg bg-gradient-to-r from-purple-700/20 to-teal-400/5 justify-center p-2 text-white shadow-lg border border-white/5"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className="text-sm font-semibold">{label}</span>
      </div>
    );
  };
  