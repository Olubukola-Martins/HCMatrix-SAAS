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

export interface IInterviewScoreRatingProps {
  scoreTitle: string;
  score: number;
}

export interface IConfigureScoreFormProps {
  open: boolean;
  onCancel: () => void;
  handleScoreFormSubmit: (values: any) => void;
  initialValues: IInterviewScoreRatingProps[];
}

export interface ICriteriaField {
  key: number;
  name: number;
}

export interface IRatingSetUpDynamicFormProps {
  initialValues: {
    metric?: string;
    weight?: string;
    criteria?: string[];
    newRatingSetup?: {
      metric: string;
      weight: string;
      criteria: string[];
    }[];
  };
  onSubmit: (values: any) => void;
}