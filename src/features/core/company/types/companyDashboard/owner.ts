import { TLicenseType } from "features/authentication/types/auth-user";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";

export type TCompanyOwnerDashboard = {
  employee: Employee;
  employeesBreakdown: EmployeesBreakdown;
  assets: Assets;
  pendingApprovals: PendingApprovals;
  outToday: OutToday;
  celebrationsAndHolidays: CelebrationsAndHolidays;
};

interface CelebrationsAndHolidays {
  birthdays: Birthdays;
  workAnniversaries: WorkAnniversary[];
  holidays: Holiday[];
}

interface Holiday {
  title: string;
  date: string;
}

interface WorkAnniversary {
  startDate: string;
  employee: Employee3;
}

interface Birthdays {
  today: Today[];
  upcoming: Today[];
}

interface Today {
  dob: string;
  employee: Employee3;
}

interface Employee3 {
  firstName: string;
  lastName: string;
}

interface OutToday {
  leave: Leave;
  remoteWork: RemoteWork;
}

interface RemoteWork {
  result: Result4[];
  totalCount: number;
}

interface Result4 {
  id: number;
  firstName: string;
  lastName: string;
  empUid: string;
  status: string;
  designation: Designation;
  jobInformation: JobInformation2;
}

interface JobInformation2 {
  id: number;
  workModel: string;
  branch: Department2;
}

interface Leave {
  result: Result3[];
  totalCount: number;
}

interface Result3 {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  specificDates?: any;
  length: number;
  leaveTypeId: number;
  reason: string;
  relieverId: number;
  documentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee2;
  recall: Recall;
}

interface Recall {
  id: number;
  leaveId: number;
  recalledById: number;
  length: number;
  specificDates?: any;
  newEndDate: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Employee2 {
  id: number;
  firstName: string;
  lastName: string;
  empUid: string;
  status: string;
  designation: Designation;
  jobInformation: JobInformation;
}

interface JobInformation {
  id: number;
  branch: Department2;
}

interface Designation {
  id: number;
  name: string;
  department: Department2;
}

interface Department2 {
  id: number;
  name: string;
}

interface PendingApprovals {
  result: TApprovalRequest[];
  totalCount: number;
}

interface Assets {
  result: Result[];
  totalCount: number;
}

interface Result {
  id: number;
  assetId: number;
  assigneeId: number;
  dateAssigned: string;
  dateReturned?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  asset: Asset;
  assignee: Assignee;
}

interface Assignee {
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
  deletedAt?: any;
}

interface Asset {
  id: number;
  name: string;
  typeId: number;
  status: string;
  imageUrl?: any;
  uid: string;
  serialNumber: string;
  brand: string;
  model: string;
  cost: string;
  vendor: string;
  purchaseDate: string;
  color: string;
  description: string;
  assigneeId: number;
  dateAssigned: string;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  type: Type;
}

interface Type {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface EmployeesBreakdown {
  totalActiveEmployees: TotalActiveEmployees;
  employeesPerDepartment: EmployeesPerDepartment;
}

interface EmployeesPerDepartment {
  Engineering: number;
}

interface TotalActiveEmployees {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

interface Employee {
  total: number;
  male: number;
  female: number;
}
