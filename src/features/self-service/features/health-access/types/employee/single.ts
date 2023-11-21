export type TSingleEmployeeHealthAccess = {
  id: number;
  employeeId: number;
  hmoPlanId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  hmoPlan: HmoPlan;
  medicalInfo: MedicalInfo;
  dependents: Dependent[];
  medicalHistory: MedicalHistory[];
};

interface MedicalHistory {
  id: number;
  employeeId: number;
  type: string;
  condition: string;
  dateOfOnset: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Dependent {
  id: number;
  employeeId: number;
  fullName: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface MedicalInfo {
  id: number;
  employeeId: number;
  hmoId: string;
  genotype: string;
  bloodGroup: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface HmoPlan {
  id: number;
  name: string;
  label: string;
  maxDependents: number;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  designation: Designation;
  avatarUrl?:string;
  empUid?:string;
  personalInformation: PersonalInformation;
}

interface PersonalInformation {
  addressId: number;
  phoneNumber: string;
  address: Address;
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
