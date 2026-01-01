export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} flex flex-col items-center justify-center gap-2 min-w-[80px] h-[60px] rounded-lg cursor-grab bg-[#1C2536]`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      {Icon && <Icon size={20} className="text-white" />}
      <span className="text-white text-sm">{label}</span>
    </div>
  );
};
