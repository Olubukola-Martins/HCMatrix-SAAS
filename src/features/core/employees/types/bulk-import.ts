import { TLicenseType } from "features/authentication/types/auth-user";
import { TEmergencyContact, TJobInfo, TPersonalInfo } from ".";

export type TBulkImportEmployeeProp = {
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
  empUid: string;
  personalInformation?: TPersonalInfo;
  jobInformation?: TJobInfo;
  emergencyContact?: TEmergencyContact;
};

export enum EmployeeMappingSectionEnum {
  COMPULSORY_SECTION = "Employee Information",
  PERSONAL_INFORMATION = "Personal Information",
  JOB_INFORMATION = "Job Information",

  EMERGENCY_CONTACT = "Emergency Contact",
}

export type TEmployeeMappingSectionInput = {
  name: string;
  label: string;
  optional: boolean;
  children?: TEmployeeMappingSectionInput[];
};
export type EmployeeMappingSectionKeyType =
  | "personalInformation"
  | "jobInformation"
  | "emergencyContact"
  | "employeeInformation";
export type TBulkEmployeeImportMappingSection = {
  title: EmployeeMappingSectionEnum;
  key: EmployeeMappingSectionKeyType;
  inputs: TEmployeeMappingSectionInput[];
};
