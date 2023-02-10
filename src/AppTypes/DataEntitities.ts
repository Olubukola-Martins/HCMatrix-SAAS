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
  address: {
    streetAddress: string;
    countryId: number;
    stateId: number;
    lgaId: number;
    timezone: string;
  };
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
