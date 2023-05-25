export type TTransferRequisition = {
  id: number;
  date: string;
  employeeId: number;
  proposedBranchId: number;
  proposedDesignationId: number;
  skillsAndQualifications: string;
  reason: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  proposedBranch: ProposedBranch;
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

interface ProposedBranch {
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
