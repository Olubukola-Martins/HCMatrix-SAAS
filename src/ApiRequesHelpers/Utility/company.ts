import { ICurrentCompany, TCompanyParameter } from "AppTypes/DataEntitities";
import { IPaginationProps } from "AppTypes/Pagination";
import { ISearchParams } from "AppTypes/Search";
import axios from "axios";

export interface ICreateCompSocialAuthProps {
  name: string;
  phoneNumber: string;
  industryId: number;
  token: string;
}
export const createCompanyFromSocialAuth = async (
  props: ICreateCompSocialAuthProps
) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/auth`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;
  delete data["token"];

  const response = await axios.post(url, data, config);
  return response;
};
export interface ICreateCompProps {
  name: string;
  email: string;
  phoneNumber: string;
  industryId: number;
  customerFullName: string;
  password: string;
  confirmPassword: string;
}
export const createCompany = async (props: ICreateCompProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company`;

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props;

  const response = await axios.post(url, data);
  return response;
};
export interface ICreateCompParamsProps
  extends ICurrentCompany,
    TCompanyParameter {}
export const saveCompanyParameter = async (props: ICreateCompParamsProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/parameter/setting`;
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

  const response = await axios.post(url, data, config);
  return response;
};

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const getCompanyParameters = async (props: IGetDataProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/parameter?limit=${limit}&offset=${offset}`;

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
