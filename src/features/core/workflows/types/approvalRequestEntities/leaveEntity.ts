import { TLicenseType } from "features/authentication/types/auth-user";

// leave
export interface LeaveEntity {
  id: number;
  employeeId: number;
  departmentId: number;
  startDate: string;
  endDate: string;
  specificDates?: any;
  length: number;
  leaveTypeId: number;
  reason: string;
  requestAllowance: boolean;
  workAssigneeId: number;
  documentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  department: Department;
  leaveType: LeaveType;
  workAssignee: Employee;
}

interface LeaveType {
  id: number;
  name: string;
  label: string;
  length: number;
  employeesGetAllowance: boolean;
  calculation: string;
  percentageAmount: number;
  gender: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
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
  deletedAt?: any;
}
