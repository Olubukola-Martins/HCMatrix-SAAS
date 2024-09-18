import { TApprovalStatus } from "types/statuses";
import { CreateBankDetail } from "./bank-detail";
import { ITFData } from "./itf";
import { JobInfoData } from "./job-info";
import { NSITFData } from "./nsitf";
import { PersonalInfoData } from "./personal-info";
import { TaxData } from "./tax";
import { PensioData } from "./pension";
import { TLicenseType } from "features/authentication/types/auth-user";

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
  employee?: Employee;
} & CreateProfileEditRequestInput & {
    proposed?: CreateProfileEditRequestInput["content"];
  };
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type CreateProfileEditRequestInput = (
  | CreateBankDetail
  | ITFData
  | JobInfoData
  | PersonalInfoData
  | ITFData
  | NSITFData
  | TaxData
  | PensioData
) & {
  employeeId?: number;
};
