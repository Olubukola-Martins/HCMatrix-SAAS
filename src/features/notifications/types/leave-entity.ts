export interface Leave {
  id: number;
  length: number;
  reason: string;
  status: string;
  endDate: string;
  employee: Employee;
  companyId: number;
  createdAt: string;
  leaveType: LeaveType;
  startDate: string;
  updatedAt: string;
  department: Department;
  employeeId: number;
  leaveTypeId: number;
  departmentId: number;
  documentUrls: any[];
  workAssignee: WorkAssignee;
  specificDates?: any;
  workAssigneeId: number;
  requestAllowance: boolean;
}

interface WorkAssignee {
  id: number;
  email: string;
  empUid: string;
  roleId: number;
  status: string;
  userId: number;
  lastName: string;
  avatarUrl?: any;
  companyId: number;
  createdAt: string;
  deletedAt?: any;
  firstName: string;
  updatedAt: string;
  designationId: number;
  hasSelfService: boolean;
}

interface Department {
  id: number;
  name: string;
  email: string;
  label: string;
  companyId: number;
  createdAt: string;
  deletedAt?: any;
  updatedAt: string;
  departmentHeadId?: any;
  parentDepartmentId?: any;
}

interface LeaveType {
  id: number;
  name: string;
  label: string;
  gender: string;
  length: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  calculation?: any;
  percentageAmount?: any;
  employeesGetAllowance: boolean;
}

interface Employee {
  id: number;
  email: string;
  empUid: string;
  roleId: number;
  status: string;
  userId: number;
  lastName: string;
  avatarUrl: string;
  companyId: number;
  createdAt: string;
  deletedAt?: any;
  firstName: string;
  updatedAt: string;
  designationId: number;
  hasSelfService: boolean;
}
