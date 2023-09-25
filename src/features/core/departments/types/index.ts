import { ICurrentCompany } from "types";

export type TDepartment = {
  id: number;
  name: string;
  email: string;
  departmentHeadId?: number;
  parentDepartmentId?: number;
  parentDepartment?: {
    id: number;
    name: string;
    label: string;
    companyId: number;
    departmentHeadId?: number;
    email: string;
    parentDepartmentId?: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  };

  employeeCount: number;

  departmentHead?: {
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
    deletedAt?: string;
  };
};

export interface ICreateDepProps extends ICurrentCompany {
  name: string;
  email: string;
  departmentHeadId?: number;
  parentDepartmentId?: number;
}

export interface IUpdateDeptProps extends ICreateDepProps {
  id: number;
}

export interface IGetSingleDeptProps extends ICurrentCompany {
  departmentId: number;
}
