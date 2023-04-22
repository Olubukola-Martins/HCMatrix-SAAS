import { TBasicWorkflow } from "features/core/workflows/hooks/useCreateBasicWorkflow";

export interface TSingleConferenceRoom {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TSingleConferenceRoomBooking {
  id: number;
  conferenceRoomId: number;
  employeeId: number;
  departmentId: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  priority: string;
  status: string;
  workflowId?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  conferenceRoom: TSingleConferenceRoom;
  employee: Employee;
  department: Department;
  workflow?: TBasicWorkflow; // probably will be refactored
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
