import axios from "axios";
import { ICurrentCompany, TGroup } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { ISearchParams } from "../../AppTypes/Search";

export interface ISaveDataProps extends ICurrentCompany, TGroup {}
export const saveGroup = async (props: ISaveDataProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group`;
  if (props.id) {
    url += `/${props.id}`;
  }
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  if (props.id) {
    delete data["employees"];

    //update group
    const response = await axios.put(url, data, config);
    return response;
  }
  delete data["id"]; //create group
  const response = await axios.post(url, data, config);
  return response;
};

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export interface IGetSingleGroupProps extends ICurrentCompany {
  id: number;
}
export const getGroups = async (props: IGetDataProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group?limit=${limit}&offset=${offset}`;
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

  const response = await axios.get(url, config);
  return response;
};
export const getSingleGroup = async (props: IGetSingleGroupProps) => {
  const id = props.id;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}`;

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
export const deleteSingleGroup = async (props: IGetSingleGroupProps) => {
  const id = props.id;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export interface IAddMemberToGroupProps extends IGetSingleGroupProps {
  employeeId: number;
}
// managementId is same as memberId
export const addMemberToGroup = async (props: IAddMemberToGroupProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.id}/management`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["employeeId"];

  const response = await axios.post(url, data, config);
  return response;
};

export interface IUpdateMemberToGroupProps extends IAddMemberToGroupProps {
  managementId: number;
  isLead?: boolean;
}
export const updateMemberToGroup = async (props: IUpdateMemberToGroupProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.id}/management/${props.managementId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["managementId"];

  const response = await axios.put(url, data, config);
  return response;
};
export const removeMemberFromGroup = async (
  props: IUpdateMemberToGroupProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.id}/management/${props.managementId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  const response = await axios.delete(url, config);
  return response;
};
interface IGetSingleGroupMembersProps
  extends IGetSingleGroupProps,
    IGetDataProps {}
export const getSingleGroupMembers = async (
  props: IGetSingleGroupMembersProps
) => {
  const id = props.id;
  const { pagination, searchParams } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const search = searchParams?.name;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}/management`;
  if (pagination || search) {
    url += `?`;
  }
  if (pagination) {
    url += `limit=${limit}&offset=${offset}&`;
  }
  if (search) {
    url += `limit=${limit}&offset=${offset}`;
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
