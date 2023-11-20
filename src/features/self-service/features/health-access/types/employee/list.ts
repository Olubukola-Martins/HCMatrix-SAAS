export type TEmployeeHealthAccess = {
  id: number;
  employeeId: number;
  hmoPlanId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  hmoPlan: HmoPlan;
  dependents: number;
};

interface HmoPlan {
  id: number;
  name: string;
  label: string;
  maxDependents: number;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  designation: Designation;
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
