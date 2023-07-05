export type TFileAccessListItem = AccessDepartment | AccessGroup | AccessRole;

interface AccessGroup {
  id: number;
  fileId: number;
  type: "group";
  entityId: number;
  createdAt: string;
  updatedAt: string;

  group: Group;
}
interface AccessRole {
  id: number;
  fileId: number;
  type: "role";
  entityId: number;
  createdAt: string;
  updatedAt: string;
  role: Role;
}
interface AccessDepartment {
  id: number;
  fileId: number;
  type: "department";
  entityId: number;
  createdAt: string;
  updatedAt: string;
  department?: Department;
}

interface Group {
  id: number;
  name: string;
  label: string;
  description?: any;
  email: string;
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

interface Role {
  id: number;
  name: string;
  label: string;
  companyId: number;
}
