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



export type EmployeeDataType = {
  key: React.Key;
  name: string;
  EmployeeID: string;
  department: string;
  Role: string;
  Email: string;
  Status:
    | "confirmed"
    | "probation"
    | "on-leave"
    | "suspended"
    | "dismissed"
    | "resigned"
    | "on-contract"
    | "off-contract";
  gender: "male" | "female";
  paygrade?: string;
  designation: string;
}