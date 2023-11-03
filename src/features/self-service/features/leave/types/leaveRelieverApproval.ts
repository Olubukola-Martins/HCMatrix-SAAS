import { TApprovalStatus } from "types/statuses";

export type TLeaveRelieverApproval = {
  id: number;
  leaveId: number;
  status: TApprovalStatus;
  comment?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  leave: Leave;
};

interface Leave {
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
  status: TApprovalStatus;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  reliever: Reliever;
}

interface Reliever {
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
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
