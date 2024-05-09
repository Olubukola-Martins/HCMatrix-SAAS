import { TLicenseType } from "features/authentication/types/auth-user";
import { TLeaveRecall } from "./leaveRecall";

export interface TLeave {
  id: number;
  employeeId: number;
  startDate?: string | null;
  endDate?: string | null;
  specificDates?: string[] | null;
  length: number;
  leaveTypeId: number;
  reason: string;
  relieverId?: number | null;
  documentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  leaveType: LeaveType;
  reliever?: Reliever | null;
  recall?: null | TLeaveRecall;
}

interface Reliever {
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
  avatarUrl?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface LeaveType {
  id: number;
  name: string;
  label: string;
  length: number;
  requireReliever: boolean;
  employeesGetAllowance: boolean;
  applicableToCertainGroup: boolean;
  groupId?: any;
  gender?: any;
  maritalStatus?: any;
  employeeStatus?: any;
  isActive: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
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
  designation?: Designation;
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
