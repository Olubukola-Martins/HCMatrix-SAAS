import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";

export type TDesignation = {
  id: number;
  name: string;
  department: { id: number; name: string };
  employeeCount: number;
};

export interface IGetSingleDesgProps {
  designationId: number;
}

export interface ICreateDegProps {
  name: string;
  departmentId: string;
}
export interface IUpdateDegProps {
  id: number;
  data: ICreateDegProps;
}

export interface IGetDegsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export interface IFRQDesignationsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  onSuccess?: Function;
}
