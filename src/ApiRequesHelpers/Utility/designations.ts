import axios from "axios";
import { ICurrentCompany } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { ISearchParams } from "../../AppTypes/Search";

const token = localStorage.getItem("hcmatrix_app") as unknown as string;

export interface ICreateDegProps extends ICurrentCompany {
  name: string;
  departmentId: string;
}
export const createDesignation = async (props: ICreateDegProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation`;
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
    departmentId: props.departmentId,
  };

  const response = await axios.post(url, data, config);
  return response;
};

interface IGetDegsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getDesignations = async (props: IGetDegsProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation?limit=${limit}&offset=${offset}`;

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
