import React from "react";
import { OtherSettingsFormSwitch } from "./OtherSettingsFormSwitch";
import { ReorderableCardProps } from "../types";



export const ReorderableCard: React.FC<ReorderableCardProps> = ({
  label,
  name,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      >
      <OtherSettingsFormSwitch label={label} name={name} />
    </div>
  );
};
