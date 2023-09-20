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

