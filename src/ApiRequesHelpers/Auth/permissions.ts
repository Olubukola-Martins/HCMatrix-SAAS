import axios from "axios";
import { ICurrentCompany } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { ISearchParams } from "../../AppTypes/Search";

export interface ICreateRoleProps extends ICurrentCompany {
  name: string;
  permissionIds: number[];
}
export const createRole = async (props: ICreateRoleProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/role`;
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
    permissionIds: props.permissionIds,
  };

  const response = await axios.post(url, data, config);
  return response;
};
interface IGetPemProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getPermissions = async (props: IGetPemProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission?limit=${limit}&offset=${offset}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.get(url, config);
  return response;
};

interface IGetRolesProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getRoles = async (props: IGetRolesProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/role?limit=${limit}&offset=${offset}`;
  if (props.searchParams) {
    url += `&search=${props.searchParams.name}`;
  }
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
