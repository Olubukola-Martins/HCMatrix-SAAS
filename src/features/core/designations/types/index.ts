import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";

export type TDesignation = {
  id: number;
  name: string;
  department: { id: number; name: string };
  employeeCount: number;
};

export interface IGetSingleDesgProps extends ICurrentCompany {
  designationId: number;
}

export interface ICreateDegProps extends ICurrentCompany {
  name: string;
  departmentId: string;
}
export interface IUpdateDegProps extends ICreateDegProps {
  id: number;
}

export interface IGetDegsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export interface IFRQDesignationsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  companyId: number;
  onSuccess?: Function;
  token: string;
}
