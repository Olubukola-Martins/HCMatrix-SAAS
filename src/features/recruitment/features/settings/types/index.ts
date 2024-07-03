export interface IRecruitmentSettingsSwitchFormProps {
  name: string;
  label: string;
  onChange: (val: boolean) => void;
}

export interface IMappedVariableProps {
  open: boolean;
  handleClose: () => void;
}

export interface IEmailTemplateDescriptionProps {
  emailSubject: string;
  emailMessage: string;
  candidateStatus?: string;
  email: string
  body:string
}

export interface IEmailFormPageProps {
  templateLabel: string;
  candidateStatusLabel?: string;
  panelistSwitch?: boolean;
  handleSubmit: (val: any) => void;
  pageDescription: string;
  pageTitle: string;
}
