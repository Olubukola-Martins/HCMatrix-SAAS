import { ICurrentCompany, TBranch } from "AppTypes/DataEntitities";
import { IPaginationProps } from "AppTypes/Pagination";
import { ISearchParams } from "AppTypes/Search";
import axios from "axios";

export interface ICreateBranchProps extends ICurrentCompany {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    countryId: number;
    stateId: number;
    lgaId: number;
    timezone: string;
  };
}
export const createBranch = async (props: ICreateBranchProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch`;
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

export interface IUpdateBranchProps extends ICreateBranchProps {
  id: number;
}
export const updateBranch = async (props: IUpdateBranchProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch/${props.id}`;
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
export interface IGetSingleBranchProps extends ICurrentCompany {
  branchId: number;
}

export const getSingleBranch = async (
  props: IGetSingleBranchProps
): Promise<TBranch> => {
  const id = props.branchId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TBranch = {
    id: item.id,
    name: item.name,
    description: item.description,
    address: {
      streetAddress: item.address.streetAddress,
      countryId: item.address.countryId,
      stateId: item.address.stateId,
      lgaId: item.address.lgaId,
      timezone: item.address.timezone,
    },
    employeeCount: item?.employeeCount,
  };
  return data;
};

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const getBranches = async (
  props: IGetDataProps
): Promise<{ data: TBranch[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch?limit=${limit}&offset=${offset}`;

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

  const data: TBranch[] = result.map(
    (item: any): TBranch => ({
      id: item.id,
      name: item.name,
      description: item.description,
      address: {
        streetAddress: item.address.streetAddress,
        countryId: item.address.countryId,
        stateId: item.address.stateId,
        lgaId: item.address.lgaId,
        timezone: item.address.timezone,
      },
      employeeCount: item?.employeeCount,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
