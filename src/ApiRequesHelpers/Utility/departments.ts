import axios from "axios";
import { ICurrentCompany } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { ISearchParams } from "../../AppTypes/Search";

const token = localStorage.getItem("hcmatrix_app") as unknown as string;

export interface ICreateDepProps extends ICurrentCompany {
  name: string;
  email: string;
  departmentHeadId: string;
  parentDepartmentId: string;
}
export const createDepartment = async (props: ICreateDepProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    name: props.name,
    email: props.email,
  };

  if (props.departmentHeadId) data.departmentHeadId = props.departmentHeadId;
  if (props.parentDepartmentId)
    data.parentDepartmentId = props.parentDepartmentId;
    
  const response = await axios.post(url, data, config);
  return response;
};

interface IGetDepsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getDepartments = async (props: IGetDepsProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department?limit=${limit}&offset=${offset}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
