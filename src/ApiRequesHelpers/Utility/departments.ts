import axios from "axios";
import { ICurrentCompany, TDepartment } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { ISearchParams } from "../../AppTypes/Search";

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
      Authorization: `Bearer ${props.token}`,
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
export interface IUpdateDeptProps extends ICreateDepProps {
  id: number;
}
export const updateDepartment = async (props: IUpdateDeptProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  if (!props.departmentHeadId) delete data["departmentHeadId"];
  if (!props.parentDepartmentId) delete data["parentDepartmentId"];

  const response = await axios.put(url, data, config);
  return response;
};

interface IGetDepsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export interface IGetSingleDeptProps extends ICurrentCompany {
  departmentId: number;
}
export const getDepartments = async (
  props: IGetDepsProps
): Promise<{ data: TDepartment[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department?limit=${limit}&offset=${offset}`;
  if (props.searchParams?.name) {
    url += `&search=${props.searchParams.name}`;
  }

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TDepartment[] = result.map(
    (item: any): TDepartment => ({
      id: item.id,
      name: item.name,
      email: item.email,
      employeeCount: item.employeeCount ?? 0,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const getSingleDepartment = async (
  props: IGetSingleDeptProps
): Promise<TDepartment> => {
  const id = props.departmentId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TDepartment = {
    id: item.id,
    name: item.name,
    email: item.email,
    employeeCount: item.employeeCount ?? 0,
    departmentHeadId: item?.departmentHeadId,
    parentDepartmentId: item?.parentDepartmentId,
  };

  return data;
};
