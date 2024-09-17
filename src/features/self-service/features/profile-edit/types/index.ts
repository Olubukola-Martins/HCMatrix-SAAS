import { TApprovalStatus } from "types/statuses";
import { CreateBankDetail } from "./bank-detail";
import { ITFData } from "./itf";
import { JobInfoData } from "./job-info";
import { NSITFData } from "./nsitf";
import { PersonalInfoData } from "./personal-info";
import { TaxData } from "./tax";

export type TProfileEditRequestType =
  | "bank-detail"
  | "pension"
  | "nsitf"
  | "itf"
  | "tax"
  | "personal-information"
  | "job-information";

export type ProfileEditRequest = {
  id: number;
  companyId: number;
  employeeId: number;
  status: TApprovalStatus;
  createdAt: string;
  updatedAt: string;
} & CreateProfileEditRequestInput;

export type CreateProfileEditRequestInput = (
  | CreateBankDetail
  | ITFData
  | JobInfoData
  | PersonalInfoData
  | ITFData
  | NSITFData
  | TaxData
) & {
  employeeId?: number;
};
