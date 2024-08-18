import { useState } from "react";
import { ReorderableCard } from "./ReorderableCard";
import { INTERVIEW_STAGE_SETTINGS_ARRAY } from "../../constants/defaultOtherSettings";

export const InterviewStageReorderDivs = () => {
  const [items, setItems] = useState(INTERVIEW_STAGE_SETTINGS_ARRAY);

  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [isReorderMode, setIsReorderMode] = useState<boolean>(false);

  const handleDragStart = (index: number) => {
    if (!isReorderMode) return;
    setDraggedItemIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (
      !isReorderMode ||
      draggedItemIndex === null ||
      draggedItemIndex === index
    )
      return;

    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, movedItem);

    setDraggedItemIndex(index);
    setItems(newItems);
  };

  const handleDrop = () => {
    if (!isReorderMode) return;
    setDraggedItemIndex(null);
  };

  const handleDragEnd = () => {
    if (!isReorderMode) return;
    setDraggedItemIndex(null);
  };

  const toggleReorderMode = () => {
    setIsReorderMode(!isReorderMode);
  };

  return (
    <div>
      <button
        onClick={toggleReorderMode}
        className="border border-[#696969] p-2 rounded text-base"
      >
        {isReorderMode ? "Finish Reordering" : "Reorder "}{" "}
        <i className="ri-expand-height-line"></i>
      </button>

      <div className="p-3">
        {items.map(({ label, name }, index) => (
          <ReorderableCard
            key={index}
            label={label}
            name={name}
            draggable={isReorderMode}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            style={{
              cursor: isReorderMode ? "move" : "default",
            }}
          />
        ))}
      </div>
    </div>
  );
};
