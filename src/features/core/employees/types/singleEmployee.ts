export type TSingleEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  designation: Designation;
  personalInformation: PersonalInformation;
  jobInformation: JobInformation;
  emergencyContact: EmergencyContact;
  dependents: Dependent[];
  finance: Finance[];
  employmentHistory: EmploymentHistory[];
  educationDetails: EducationDetail[];
  skills: Skill[];
  managerHistory: ManagerHistory[];
  directReport: DirectReport[];
  userGroups: UserGroup[];
  onboarding?: any; // TO DO: udpate all the anys
  role: Role;
};

interface Role {
  id: number;
  name: string;
  label: string;
  companyId: number;
}

interface UserGroup {
  id: number;
  groupId: number;
  employeeId: number;
  isLead: boolean;
  createdAt: string;
  updatedAt: string;
  group: Group;
}

interface Group {
  id: number;
  name: string;
  label: string;
  description: string;
  email: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface DirectReport {
  id: number;
  employeeId: number;
  lineManagerId: number;
  from: string;
  to: string;
  currentManager: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: LineManager2;
}

interface ManagerHistory {
  id: number;
  employeeId: number;
  lineManagerId: number;
  from: string;
  to?: any;
  currentManager: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  lineManager: LineManager2;
}

interface LineManager2 {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Skill {
  id: number;
  employeeId: number;
  skill: string;
  competency: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface EducationDetail {
  id: number;
  employeeId: number;
  school: string;
  degree: string;
  specialization: string;
  startDate: string;
  endDate: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface EmploymentHistory {
  id: number;
  employeeId: number;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
export type Finance =
  | {
      id: number;
      employeeId: number;
      key: "wallet";
      value: TWalletValue;
      companyId: number;
      createdAt: string;
      updatedAt: string;
    }
  | {
      key: "bank";
      value: TBankValue;
    }
  | {
      key: "pension";
      value: TPensionValue;
    };
export interface TPensionValue {
  pensionType: string;
  accountNumber: string;
  fundAdministrator: string;
}
export interface TBankValue {
  bvn: string;
  bankName: string;
  accountNumber: string;
}

export interface TWalletValue {
  accountNumber: string;
  accountProvider?: string;
}

interface Dependent {
  id: number;
  employeeId: number;
  fullName: string;
  dob: string;
  phoneNumber: string;
  relationship: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  id: number;
  employeeId: number;
  fullName: string;
  address: string;
  relationship: string;
  phoneNumber: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface JobInformation {
  id: number;
  startDate: string;
  employmentType: string;
  workModel: string;
  numberOfDaysPerWeek: number;
  employeeId: number;
  companyId: number;
  hireDate: string;
  probationEndDate: string;
  confirmationDate: string;
  lineManagerId: number;
  branchId: number;
  payrollType: "direct-salary" | "office" | "wages";
  monthlyGross?: any;
  payGradeId: number;
  hourlyRate?: any;
  createdAt: string;
  updatedAt: string;
  lineManager: LineManager;
  branch: Branch;
  payGrade: PayGrade;
}

interface PayGrade {
  id: number;
  name: string;
  label: string;
  categoryId: number;
  grossPay: number;
  companyId: number;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  label: string;
  maxGrossPay: number;
  minGrossPay: number;
  companyId: number;
}

interface Branch {
  id: number;
  name: string;
  label: string;
  description: string;
  addressId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface LineManager {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

export interface PersonalInformation {
  id: number;
  dob: string;
  gender: string;
  phoneNumber: string;
  eligibility: string;
  exchangeRateId: number;
  maritalStatus: string;
  nationality: string;
  addressId: number;
  employeeId: number;
  companyId: number;
  passportExpirationDate: string;
  validDocumentUrl?: string;
  alternativeEmail?: string;
  alternativePhoneNumber?: string;
  nin?: string;
  taxId?: string;
  taxAuthority?: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  exchangeRate: ExchangeRate;
}

interface ExchangeRate {
  id: number;
  currency: string;
  label: string;
  rate: number;
  companyId: number;
}

interface Address {
  id: number;
  streetAddress: string;
  countryId: number;
  stateId: number;
  lgaId: number;
  timezone: string;
  createdAt: string;
  updatedAt: string;
  country: Country;
  state: State;
  lga: Lga;
}

interface Lga {
  id: number;
  name: string;
  stateId: number;
  createdAt: string;
  updatedAt: string;
}

interface State {
  id: number;
  name: string;
  countryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Country {
  id: number;
  name: string;
  sortName: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

interface Designation {
  id: number;
  name: string;
  label: string;
  departmentId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  department: Department;
}

interface Department {
  id: number;
  name: string;
  label: string;
  companyId: number;
  departmentHeadId?: any;
  email: string;
  parentDepartmentId?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
