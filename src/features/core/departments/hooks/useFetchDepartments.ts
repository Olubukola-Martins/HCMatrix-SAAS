import axios from "axios";
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TDepartment } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const QUERY_KEY_FOR_DEPARTMENTS = "departments";

interface IGetDepsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
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

interface IFRQDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  companyId: number;
  onSuccess?: Function;
  token: string;
}

export interface IFRQDataReturnProps {
  data: TDepartment[];
  total: number;
}

export const useFetchDepartments = ({
  pagination,
  companyId,
  onSuccess,
  token,
  searchParams,
}: IFRQDataProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [QUERY_KEY_FOR_DEPARTMENTS, pagination?.limit, searchParams?.name],
    () =>
      getDepartments({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        searchParams,
        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};

// Get all departments without pagination

export const getAllDepartments = async (
  props: ICurrentCompany
): Promise<{ data: TDepartment[]; total: number }> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/department`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data;
  console.log("fetchData", fetchedData);
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

export const useFetchAllDepartments = (
  onSuccess: IFRQDataProps["onSuccess"]
) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_DEPARTMENTS],
    () =>
      getAllDepartments({
        companyId,
        token,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
