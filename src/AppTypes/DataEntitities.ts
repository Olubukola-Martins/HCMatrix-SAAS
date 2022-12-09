export type TIndustry = {
  id: number;
  name: string;
};
export type TCountry = {
  id: number;
  name: string;
  sortName: string;
  code: string;
};

export interface ICurrentCompany {
  companyId: string;
}

export type THoliday = {
  id: number;
  name: string;
  date: string;
};
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

export type TRole = {
  id: number;
  name: string;
  userCount: number;
};
export type TEmployee = {
  id: number;
  name: string;
  gender: "male" | "female";
  employeeID: string;
  designation: TDesignation | string;
  role: TRole | string;
  status: string;
  email: string;
  department: TDepartment | string;
};
