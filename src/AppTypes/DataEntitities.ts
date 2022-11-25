export type TIndustry = {
  id: number;
  name: string;
};

export interface ICurrentCompany {
  companyId: string;
}

export type TDepartment = {
  id: number;
  name: string;
  email: string;
  departmentHeadId?: number;
  parentDepartmentId?: number;
  employeeCount: number;
};
export type TDesignation = {
  id: number;
  name: string;
  department: { id: number; name: string };
  employeeCount: number;
};
export type TPermission = {
  id: number;
  name: string;
  label: string;
  categoryId: number;
  description?: string;
};
export type TPermissionCategory = {
  id: number;
  name: string;

  description?: string;
};
