import { ICurrentCompany } from "types";
// ISettingsSwitchData
// IPostSwitch
export interface ISettingsSwitchData {
  isActive: boolean;
  isDefault: boolean;
  id: number;
  name: string;
  label: string;
}

export interface IPostSwitch extends ICurrentCompany {
  name: string[];
}

export interface ITemplateData extends ISettingsSwitchData {
  subject: string;
  body: string;
  file: string;
  name: string;
  label: string;
  title?: string;
  department?: string;
  description?: string;
}
