import { TLicenseType } from "features/authentication/types/auth-user";

export type TPositionChangeRequisition = {
  id: number;
  date: string;
  employeeId: number;
  proposedDesignationId: number;
  skillsAndQualifications: string;
  reason: string;
  justification: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  proposedDesignation: ProposedDesignation;
};

interface ProposedDesignation {
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
