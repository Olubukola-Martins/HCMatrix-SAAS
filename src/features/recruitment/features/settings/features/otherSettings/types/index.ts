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
