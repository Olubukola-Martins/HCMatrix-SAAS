import { TLicenseType } from "features/authentication/types/auth-user";

export type TProjectMember = {
  id: number;
  projectId: number;
  employeeId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
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
  deletedAt?: string;
  personalInformation: PersonalInformation;
}

interface PersonalInformation {
  eligibility: string;
  exchangeRateId: number;
  exchangeRate: ExchangeRate;
}

interface ExchangeRate {
  id: number;
  currency: string;
  label: string;
  rate: number;
  companyId: number;
}
