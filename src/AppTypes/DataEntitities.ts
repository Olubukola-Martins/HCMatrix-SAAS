export type TIndustry = {
  id: number;
  name: string;
};
export type TCountry = {
  id: number;
  name: string;
  sortName: string;
  code: string;
};
export type TAddress = {
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone: string;
};

export type TState = {
  id: number;
  name: string;
  countryId: number;
};

export type TLga = {
  id: number;
  name: string;
  stateId: number;
};

export interface ICurrentCompany {
  companyId: string;
  token: string;
}

export type THoliday = {
  id: number;
  name: string;
  date: string;
};
export type TDepartment = {
  id: number;
  name: string;
  email: string;
  departmentHeadId?: number;
  parentDepartmentId?: number;
  employeeCount: number;
};
export type TDesignation = {
  id: number;
  name: string;
  department: { id: number; name: string };
  employeeCount: number;
};
export type TBranch = {
  id: number;
  name: string;
  description: string;
  address: TAddress;
  employeeCount: number;
};
export type TPermission = {
  id: number;
  name: string;
  label: string;
  categoryId: number;
  description?: string;
};
export type TPermissionCategory = {
  id: number;
  name: string;

  description?: string;
};

export type TRole = {
  id: number;
  name: string;
  userCount: number;
};

export type TPersonalInfo = {
  dob: string;
  gender: string;
  phoneNumber: string;
  eligibility: string;
  maritalStatus: string;
  nationality: string;
  address: TAddress;
  passportExpirationDate?: string;
  validDocumentUrl: string;
};

export type TJobInfo = {
  startDate: string;
  monthlyGross: number;
  employmentType: string;
  workModel: string;
  numberOfDaysPerWeek: number;
  hireDate: string;
  probationEndDate: string;
  confirmationDate: string;
  lineManagerId?: number;
};

export type TWallet = {
  accountNumber: string;
  accountProvider: string;
};
export type TBank = {
  bvn: string;
  bankName: string;
  accountNumber: string;
};
export type TPension = {
  fundAdministrator: string;
  accountNumber: string;
  pensionType: string;
};
export type TSkill = {
  id?: number;
  skill: string;
  competency: string;
};
export type TEducationDetail = {
  id?: number;

  school: string;
  degree: string;
  specialization: string;
  startDate: string;
  endDate: string;
};
export type TEmployementHistory = {
  id?: number;

  organization: string;
  position: string;
  startDate: string;
  endDate: string;
};

export type TEmployee = {
  companyId: number;
  avatarUrl?: string;

  createdAt: string;
  deletedAt?: string;
  designation?: TDesignation;
  designationId?: string;
  email: string;
  empUid: string;
  firstName: string;
  hasSelfService: boolean;
  id: number;
  jobInformation?: TJobInfo;
  lastName: string;
  personalInformation?: TPersonalInfo;
  role: TRole;
  roleId: number;
  status: TEmployeeStatus;
  updatedAt: string;
  userId: number;
  // --------------
  finance?: {
    wallet: TWallet;
    bank: TBank;
    pension: TPension;
  };
  skills?: TSkill[];
  employmentHistory?: TEmployementHistory[];
  educationDetails?: TEducationDetail[];
};
export type TInvitedEmployee = {
  id: number;
  lastSent: string;
  email: string;
};

export type TEmployeeStatus =
  | "confirmed"
  | "terminated"
  | "suspended"
  | "probation";
