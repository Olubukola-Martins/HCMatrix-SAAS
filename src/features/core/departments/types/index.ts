import { ICurrentCompany } from "types";

export type TDepartment = {
  id: number;
  name: string;
  email: string;
  departmentHeadId?: number;
  parentDepartmentId?: number;
  employeeCount: number;
};

export interface ICreateDepProps extends ICurrentCompany {
  name: string;
  email: string;
  departmentHeadId: string;
  parentDepartmentId: string;
}

export interface IUpdateDeptProps extends ICreateDepProps {
  id: number;
}

export interface IGetSingleDeptProps extends ICurrentCompany {
  departmentId: number;
}
