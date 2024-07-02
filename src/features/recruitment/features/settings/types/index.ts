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
    candidateStatus?:string
}
