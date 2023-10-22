export interface TLeave {
  id: number;
  specificDates?: string[];
  employeeId: number;
  departmentId: number;
  startDate: string;
  endDate: string;
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
  leaveType: TLeaveType;
  workAssignee: WorkAssignee;
}

interface WorkAssignee {
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
}

interface TLeaveType {
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
  email?: any;
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
