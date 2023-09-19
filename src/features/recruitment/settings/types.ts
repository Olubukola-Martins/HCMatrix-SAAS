import { ICurrentCompany } from "types";

export interface ICandidateStatus {
  //   companyId: number;
  //   createdAt: string;
  isActive: boolean;
  isDefault: boolean;
  id: number;
  name: string;
  label: string;
  //   updatedAt: string;
}
[];

export interface ICreateCandidateStatus extends ICurrentCompany {
  name: string[];
}


