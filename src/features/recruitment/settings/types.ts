import { ICurrentCompany } from "types";

export interface ICandidateStatus {
  isActive: boolean;
  isDefault: boolean;
  id: number;
  name: string;
  label: string;
}
[];

export interface ICreateCandidateStatus extends ICurrentCompany {
  name: string[];
}


