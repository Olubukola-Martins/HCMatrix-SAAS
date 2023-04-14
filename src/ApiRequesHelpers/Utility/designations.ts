import axios from "axios";
import { ICurrentCompany, TDesignation } from "../../AppTypes/DataEntitities";
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

interface IGetDegsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getDesignations = async (
  props: IGetDegsProps
): Promise<{ data: TDesignation[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation?limit=${limit}&offset=${offset}`;
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

  const data: TDesignation[] = result.map(
    (item: any): TDesignation => ({
      id: item.id,
      name: item.name,
      department: {
        id: item.department.id ?? "",
        name: item.department.name ?? "",
      },
      employeeCount: item.employeeCount ?? 0,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const getSingleDesignation = async (
  props: IGetSingleDesgProps
): Promise<TDesignation> => {
  const id = props.designationId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TDesignation = {
    id: item.id,
    name: item.name,
    department: {
      id: item.department.id ?? "",
      name: item.department.name ?? "",
    },
    employeeCount: item.employeeCount ?? 0,
  };

  return data;
};
