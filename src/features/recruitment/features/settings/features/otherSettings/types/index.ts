// Types for Recruitment Other Settings
export interface IOtherSettingsMenuComponent {
  title: string;
  menuComponent?: React.ReactNode;
  children?: IOtherSettingsSubMenuComponent[];
}

export interface IOtherSettingsSubMenuComponent {
  title: string;
  childrenComponent: React.ReactNode;
}
export interface ReorderableCardProps {
  label: string;
  name: string;
  draggable: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  style: React.CSSProperties;
}