import axios from "axios";
import { ICurrentCompany } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { ISearchParams } from "../../AppTypes/Search";

export interface ICreateDegProps extends ICurrentCompany {
  name: string;
  departmentId: string;
}
export interface IUpdateDegProps extends ICreateDegProps {
  id: number;
}
export const updateDesignation = async (props: IUpdateDegProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation/${props.id}`;
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

  const response = await axios.put(url, data, config);
  return response;
};
export const createDesignation = async (props: ICreateDegProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation`;
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
    departmentId: props.departmentId,
  };

  const response = await axios.post(url, data, config);
  return response;
};

interface IGetDegsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export interface IGetSingleDesgProps extends ICurrentCompany {
  designationId: number;
}
export const getDesignations = async (props: IGetDegsProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation?limit=${limit}&offset=${offset}`;

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

export const getSingleDesignation = async (props: IGetSingleDesgProps) => {
  const id = props.designationId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation/${id}`;

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
