export interface IRecruitmentSettingsSwitchFormProps {
  name: string;
  label: string;
  onChange: (val: boolean) => void;
}

export interface IMappedVariableProps {
  open: boolean;
  handleClose: () => void;
  showPanelistName?: boolean;
}

export interface IEmailTemplateDescriptionProps {
  emailSubject: string;
  emailMessage: string;
  candidateStatus?: string;
  email: string
  body: string
  linkUrl:string
}

export interface IEmailFormPageProps {
  templateLabel: string;
  candidateStatusLabel?: string;
  panelistSwitch?: boolean;
  handleSubmit: (val: any) => void;
  pageDescription: string;
  pageTitle: string;
}

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